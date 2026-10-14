/* Panel de la barbería — DEMOSTRACIÓN con datos ficticios generados en el navegador.
 * Muestra lo que verá el personal cuando las cuentas de cliente estén activas en Supabase.
 * Requiere asesor-engine.js (catálogo de cortes y resumen de historial). */
(() => {
  'use strict';
  const A = window.ImperioAsesor;
  const $ = s => document.querySelector(s);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v; else if (k === 'style') n.style.cssText = v; else n.setAttribute(k, v);
    }
    kids.flat().forEach(c => c != null && n.append(c.nodeType ? c : document.createTextNode(String(c))));
    return n;
  };

  // Generador con semilla: los mismos datos en cada visita del día.
  let semilla = Number(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date()).replace(/-/g, '')) % 100000;
  const azar = () => { semilla |= 0; semilla = semilla + 0x6D2B79F5 | 0; let t = Math.imul(semilla ^ semilla >>> 15, 1 | semilla); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const elegir = (lista, pesos) => { const total = pesos.reduce((a, b) => a + b, 0); let r = azar() * total; for (let i = 0; i < lista.length; i++) { r -= pesos[i]; if (r <= 0) return lista[i]; } return lista[lista.length - 1]; };

  const hoy = new Date(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date()) + 'T12:00:00');
  const iso = d => d.toISOString().slice(0, 10);
  const masDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const dias = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);

  const cortes = A.CORTES.map(c => c.id);
  const popularidad = { 'low-fade-textura': 9, 'mid-fade-crop': 8, 'taper-clasico': 7, 'diseno-lineas': 6, 'twists-taper': 4, 'burst-fade': 4, 'buzz-cut': 4, 'side-part': 3, 'quiff': 3, 'tijera-flow': 2, 'high-fade-pompadour': 2, 'slick-undercut': 1 };
  const pesos = cortes.map(c => popularidad[c] || 1);

  const clientes = Array.from({ length: 48 }, (_, i) => {
    const ritmo = elegir([18, 28, 35, 50], [3, 4, 3, 1]);
    const n = 1 + Math.floor(azar() * 7);
    let fecha = masDias(hoy, -Math.floor(azar() * 40) - ritmo * (n - 1));
    const favorito = elegir(cortes, pesos);
    const visitas = [];
    for (let v = 0; v < n; v++) {
      if (fecha > hoy) break;
      const corte = azar() < 0.7 ? favorito : elegir(cortes, pesos);
      visitas.push({ fecha: iso(fecha), corte, satisfaccion: corte === favorito ? elegir([3, 4, 5], [1, 3, 4]) : elegir([2, 3, 4, 5], [1, 2, 3, 2]) });
      fecha = masDias(fecha, ritmo + Math.round((azar() - 0.5) * 8));
    }
    return { id: 'Cliente ' + String(i + 1).padStart(3, '0'), visitas, resumen: A.resumenHistorial(visitas) };
  }).filter(c => c.resumen);

  const todas = clientes.flatMap(c => c.visitas);
  const hoyIso = iso(hoy);
  const ultimos30 = todas.filter(v => dias(v.fecha, hoyIso) <= 30);
  const notas = todas.filter(v => v.satisfaccion);
  const media = notas.reduce((a, v) => a + v.satisfaccion, 0) / notas.length;
  const porVolver = clientes.map(c => ({ ...c, faltan: dias(hoyIso, c.resumen.proximaVisita) }))
    .filter(c => c.faltan <= 7).sort((a, b) => a.faltan - b.faltan);
  const atrasados = porVolver.filter(c => c.faltan < -14).length;

  /* KPIs */
  const kpi = (label, valor, nota) => el('div', { class: 'kpi' }, el('dt', {}, label), el('dd', {}, valor), nota ? el('dd', { class: 'kpi-note' }, nota) : null);
  $('#kpis').replaceChildren(
    kpi('Clientes con ficha', String(clientes.length), 'Con al menos una visita registrada'),
    kpi('Visitas últimos 30 días', String(ultimos30.length), ''),
    kpi('Nota media', media.toFixed(1).replace('.', ',') + '/5', `${notas.length} visitas calificadas`),
    kpi('Por volver esta semana', String(porVolver.length), atrasados ? `${atrasados} con más de 2 semanas de atraso` : '')
  );

  /* Barras horizontales: cortes más pedidos (90 días) */
  const conteo = {};
  todas.filter(v => dias(v.fecha, hoyIso) <= 90).forEach(v => { conteo[v.corte] = (conteo[v.corte] || 0) + 1; });
  const filas = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = filas[0][1];
  $('#chart-cortes').replaceChildren(el('ol', { class: 'hbars' }, filas.map(([id, n]) => {
    const nombre = A.nombreCorte(id);
    return el('li', { title: `${nombre}: ${n} visitas en 90 días` },
      el('span', { class: 'hbar-label' }, nombre),
      el('span', { class: 'hbar-track', 'aria-hidden': 'true' }, el('i', { style: `width:${(n / max * 100).toFixed(1)}%` })),
      el('span', { class: 'hbar-value' }, String(n)));
  })));

  /* Columnas: visitas por semana (8 semanas) */
  const semanas = Array.from({ length: 8 }, (_, i) => {
    const fin = masDias(hoy, -7 * (7 - i)), ini = masDias(fin, -6);
    const n = todas.filter(v => v.fecha >= iso(ini) && v.fecha <= iso(fin)).length;
    return { etiqueta: new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' }).format(ini), n };
  });
  const maxS = Math.max(...semanas.map(s => s.n), 1);
  $('#chart-semanas').replaceChildren(el('ol', { class: 'cols' }, semanas.map((s, i) =>
    el('li', { title: `Semana del ${s.etiqueta}: ${s.n} visitas` },
      el('span', { class: 'col-value' + (i === semanas.length - 1 ? ' is-last' : '') }, String(s.n)),
      el('span', { class: 'col-bar', style: `height:${(s.n / maxS * 100).toFixed(1)}%`, 'aria-hidden': 'true' }),
      el('span', { class: 'col-label' }, s.etiqueta)))));

  /* Tabla: por volver */
  const fmt = isoD => new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' }).format(new Date(isoD + 'T12:00:00'));
  const estado = f => f < -14 ? ['Atrasado', 'is-late'] : f < 0 ? `Hace ${-f} días` : f === 0 ? 'Hoy' : `En ${f} días`;
  $('#tabla-volver').replaceChildren(...porVolver.slice(0, 10).map(c => {
    const e = estado(c.faltan);
    const [texto, clase] = Array.isArray(e) ? e : [e, ''];
    return el('tr', {},
      el('th', { scope: 'row' }, c.id),
      el('td', {}, c.resumen.favorito || '—'),
      el('td', {}, fmt(c.resumen.ultima)),
      el('td', {}, c.resumen.intervaloPromedio ? `${c.resumen.intervaloPromedio} días` : '—'),
      el('td', {}, el('span', { class: 'estado ' + clase }, texto)),
      el('td', {}, el('button', { type: 'button', class: 'btn btn-outline btn-sm', 'aria-disabled': 'true', title: 'Disponible cuando se active WhatsApp' }, 'Recordar')));
  }));

  /* Satisfacción por corte */
  const sat = {};
  notas.forEach(v => { (sat[v.corte] = sat[v.corte] || []).push(v.satisfaccion); });
  const filasSat = Object.entries(sat).filter(([, l]) => l.length >= 4)
    .map(([id, l]) => [A.nombreCorte(id), l.reduce((a, b) => a + b, 0) / l.length, l.length]).sort((a, b) => b[1] - a[1]);
  $('#tabla-sat').replaceChildren(...filasSat.map(([n, m, k]) => el('tr', {},
    el('th', { scope: 'row' }, n), el('td', {}, m.toFixed(1).replace('.', ',')), el('td', {}, String(k)))));

  document.addEventListener('click', e => { if (e.target.closest('[aria-disabled="true"]')) e.preventDefault(); }, true);
})();
