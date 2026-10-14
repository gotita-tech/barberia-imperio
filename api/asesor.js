// Función serverless de Vercel: redacta el informe del asesor con Claude.
// Queda APAGADA mientras no existan ASESOR_IA_ENABLED=true y ANTHROPIC_API_KEY en Vercel:
// en ese caso responde { ia: false } y el navegador muestra el informe del motor local.
// La IA solo puede explicar los cortes que eligió el motor (catálogo cerrado): no inventa cortes,
// no recibe texto libre del cliente ni fotografías, y no recibe nombres ni datos de contacto.
'use strict';

const Asesor = require('../assets/js/asesor-engine.js');

const MODEL = process.env.ASESOR_MODEL || 'claude-haiku-5-5';
const TIMEOUT_MS = 12000;
const MAX_POR_MINUTO = 20;
const ventana = new Map(); // límite simple por instancia y por IP

function limitar(ip) {
  const ahora = Date.now();
  const lista = (ventana.get(ip) || []).filter(t => ahora - t < 60000);
  lista.push(ahora);
  ventana.set(ip, lista);
  return lista.length > MAX_POR_MINUTO;
}

function historialSeguro(historial) {
  const ids = new Set(Asesor.CORTES.map(c => c.id));
  return (Array.isArray(historial) ? historial : []).slice(-20)
    .filter(v => v && ids.has(v.corte))
    .map(v => ({ corte: v.corte, satisfaccion: Math.max(0, Math.min(5, Number(v.satisfaccion) || 0)) }));
}

function prompt(resultado, historial) {
  const perfil = Object.entries(resultado.perfil)
    .map(([k, v]) => `- ${k}: ${Asesor.etiqueta(k, v)}`).join('\n');
  const cortes = resultado.recomendaciones.map(r =>
    `- id "${r.id}": ${r.nombre} (afinidad ${r.afinidad}). Motivos: ${r.razones.join(' ')} Cuidados: ${r.alertas.join(' ') || 'ninguno'}`).join('\n');
  const visitas = historial.length
    ? historial.map(v => `- ${Asesor.nombreCorte(v.corte)}: satisfacción ${v.satisfaccion || 'sin nota'}/5`).join('\n')
    : '- Sin visitas registradas';
  return `Eres el asesor de estilo de Barbería Imperio (Llolleo, San Antonio, Chile). Escribes en español de Chile, cercano y profesional, sin exagerar.

Perfil del cliente:
${perfil}

Historial:
${visitas}

El sistema de la barbería ya eligió estos tres cortes del catálogo. NO propongas otros cortes, NO cambies el orden, NO menciones precios, barberos, promociones ni productos de marca, NO diagnostiques problemas de salud del cuero cabelludo.
${cortes}

Devuelve SOLO un objeto JSON válido, sin texto antes ni después, con esta forma:
{"resumen": "2 o 3 frases sobre qué le conviene a este cliente y por qué", "recomendaciones": [{"id": "<id exacto>", "explicacion": "2 o 3 frases personalizadas"}], "consejo": "1 frase práctica para su próxima visita"}`;
}

function validar(json, resultado) {
  const permitidos = resultado.recomendaciones.map(r => r.id);
  const corta = (t, n) => String(t || '').replace(/\s+/g, ' ').trim().slice(0, n);
  if (!json || typeof json !== 'object') return null;
  const recs = (Array.isArray(json.recomendaciones) ? json.recomendaciones : [])
    .filter(r => r && permitidos.includes(r.id))
    .map(r => ({ id: r.id, explicacion: corta(r.explicacion, 420) }))
    .filter(r => r.explicacion);
  if (!recs.length) return null;
  return { resumen: corta(json.resumen, 480), recomendaciones: recs, consejo: corta(json.consejo, 240) };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Método no permitido' }); }

  const activa = process.env.ASESOR_IA_ENABLED === 'true' && Boolean(process.env.ANTHROPIC_API_KEY);
  if (!activa) return res.status(200).json({ ia: false, motivo: 'La asesoría con IA aún no está activada en esta demostración.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'desconocida';
  if (limitar(ip)) return res.status(429).json({ ia: false, motivo: 'Demasiadas consultas seguidas. Prueba en un minuto.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const historial = historialSeguro(body && body.historial);
  const resultado = Asesor.recomendar(body && body.perfil, historial);
  if (Object.keys(resultado.perfil).length < 4) return res.status(400).json({ ia: false, motivo: 'Faltan respuestas del perfil.' });

  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), TIMEOUT_MS);
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: control.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 700, messages: [{ role: 'user', content: prompt(resultado, historial) }] })
    });
    if (!r.ok) throw new Error('Anthropic ' + r.status);
    const data = await r.json();
    const texto = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const inicio = texto.indexOf('{'), fin = texto.lastIndexOf('}');
    const informe = validar(JSON.parse(texto.slice(inicio, fin + 1)), resultado);
    if (!informe) throw new Error('Respuesta no válida');
    return res.status(200).json({ ia: true, modelo: MODEL, informe });
  } catch (error) {
    console.error('asesor-ia', error.message);
    return res.status(200).json({ ia: false, motivo: 'La IA no respondió a tiempo; te mostramos el informe del sistema.' });
  } finally {
    clearTimeout(reloj);
  }
};
