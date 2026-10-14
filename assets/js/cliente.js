/* Experiencia de cliente: menú, asesor de estilo, Mi ficha y equipo. Requiere asesor-engine.js. */
(() => {
  'use strict';
  const A = window.ImperioAsesor;
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) if (c != null && c !== false) node.append(c.nodeType ? c : document.createTextNode(String(c)));
    return node;
  };

  /* ---------- Menú ---------- */
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  const setMenu = open => {
    if (!menu) return;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  };
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  window.matchMedia('(min-width: 841px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  const year = $('#current-year'); if (year) year.textContent = new Date().getFullYear();

  /* ---------- Almacenamiento en el dispositivo ---------- */
  const KEY = 'imperio.cliente.v1';
  const vacio = () => ({ nombre: '', perfil: {}, visitas: [], actualizado: null });

  // Modo ejemplo (/mi-ficha?ejemplo): datos ficticios solo en memoria; nunca toca la ficha real del visitante.
  const EJEMPLO = document.body.dataset.page === 'ficha' && new URLSearchParams(location.search).has('ejemplo');
  const haceDias = n => {
    const d = new Date(); d.setDate(d.getDate() - n);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(d);
  };
  let memoria = EJEMPLO ? {
    nombre: 'Cliente de ejemplo',
    perfil: { rostro: 'cuadrado', tipo: 'ondulado', grosor: 'medio', densidad: 'alta', entradas: 'leves', remolino: 'coronilla', barba: 'corta', mantencion: 'media', frecuencia: 'mensual', contexto: 'mixto', estilo: 'actual' },
    visitas: [
      { id: 'e1', fecha: haceDias(150), corte: 'taper-clasico', barbero: '', satisfaccion: 4, nota: 'Dejar un poco más largo arriba.' },
      { id: 'e2', fecha: haceDias(118), corte: 'low-fade-textura', barbero: '', satisfaccion: 5, nota: '' },
      { id: 'e3', fecha: haceDias(86), corte: 'low-fade-textura', barbero: '', satisfaccion: 5, nota: 'Repetir igual.' },
      { id: 'e4', fecha: haceDias(55), corte: 'buzz-cut', barbero: '', satisfaccion: 2, nota: 'Muy corto para el trabajo.' },
      { id: 'e5', fecha: haceDias(24), corte: 'low-fade-textura', barbero: '', satisfaccion: 4, nota: '' }
    ], actualizado: null
  } : null;

  const leer = () => {
    if (EJEMPLO) return JSON.parse(JSON.stringify(memoria));
    try { const d = JSON.parse(localStorage.getItem(KEY)); return d && typeof d === 'object' ? Object.assign(vacio(), d) : vacio(); }
    catch { return vacio(); }
  };
  let guardable = true;
  const guardar = datos => {
    datos.actualizado = new Date().toISOString();
    if (EJEMPLO) { memoria = JSON.parse(JSON.stringify(datos)); return true; }
    try { localStorage.setItem(KEY, JSON.stringify(datos)); return true; } catch { guardable = false; return false; }
  };
  const borrar = () => { if (EJEMPLO) { memoria = vacio(); return; } try { localStorage.removeItem(KEY); } catch { /* sin acceso */ } };

  const hoyChile = () => {
    const p = new Intl.DateTimeFormat('en', { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    return ['year', 'month', 'day'].map(t => p.find(x => x.type === t).value).join('-');
  };
  const fechaLarga = iso => {
    if (!iso) return '';
    const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(y, m - 1, d));
  };
  const fechaCorta = iso => {
    const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(y, m - 1, d));
  };

  /* ---------- Cuestionario ---------- */
  // El cuestionario viene renderizado en el HTML (scripts/render-quiz.cjs); aquí solo se conecta.
  function renderQuiz(form, perfil, onChange) {
    const total = A.PREGUNTAS.length;
    const progressText = form.querySelector('.quiz-progress > span');
    const meter = form.querySelector('.quiz-meter i');
    A.PREGUNTAS.forEach(q => {
      const input = perfil[q.id] && form.querySelector(`input[name="${q.id}"][value="${perfil[q.id]}"]`);
      if (input) input.checked = true;
    });
    const actualizar = () => {
      const datos = {};
      A.PREGUNTAS.forEach(q => { const c = form.querySelector(`input[name="${q.id}"]:checked`); if (c) datos[q.id] = c.value; });
      const n = Object.keys(datos).length;
      progressText.replaceChildren(el('strong', {}, `${n} de ${total}`), ' respondidas');
      meter.style.width = (n / total * 100) + '%';
      onChange?.(datos, n === total);
      return datos;
    };
    form.addEventListener('change', actualizar);
    actualizar();
    return actualizar;
  }

  /* ---------- Ficha (informe) ---------- */
  function fichaPerfil(perfil) {
    const dl = el('dl', { class: 'ficha-profile' });
    A.PREGUNTAS.forEach(q => { if (perfil[q.id]) dl.append(el('div', {}, el('dt', {}, q.titulo), el('dd', {}, A.etiqueta(q.id, perfil[q.id])))); });
    return dl;
  }

  function fichaRecomendaciones(res, ia) {
    const extra = new Map((ia?.recomendaciones || []).map(r => [r.id, r.explicacion]));
    const vistos = new Set(); // cada corte muestra solo los motivos que no se dijeron antes
    return res.recomendaciones.map(r => {
      const razones = r.razones.filter(t => !vistos.has(t));
      r.razones.forEach(t => vistos.add(t));
      const sec = el('section', { class: 'rec', 'aria-labelledby': 'rec-' + r.id });
      sec.append(
        el('div', { class: 'rec-top' }, el('span', { class: 'rec-role' }, r.rol), el('span', { class: 'rec-score' }, `Afinidad ${r.afinidad}%`)),
        el('div', { class: 'rec-bar', role: 'presentation' }, el('i', { style: `width:${r.afinidad}%` })),
        el('h3', { id: 'rec-' + r.id }, r.nombre),
        el('p', {}, extra.get(r.id) || r.resumen)
      );
      if (razones.length) sec.append(el('span', { class: 'label' }, r.rol === 'Recomendación principal' ? 'Por qué te conviene' : 'Además'), el('ul', {}, razones.map(t => el('li', {}, t))));
      if (r.alertas.length) sec.append(el('p', { class: 'warn' }, 'Ojo: ' + r.alertas.join(' ')));
      sec.append(
        el('p', { class: 'ask' }, el('strong', {}, 'CÓMO PEDIRLO'), r.pedir),
        el('div', { class: 'rec-meta' },
          el('div', {}, el('span', { class: 'label' }, 'Mantención'), el('p', {}, 'Repasar ' + r.mantencion + '.')),
          el('div', {}, el('span', { class: 'label' }, 'Para peinarlo'), el('p', {}, r.productos))),
        el('p', {}, el('span', { class: 'label' }, 'A tener en cuenta'), r.evitar)
      );
      return sec;
    });
  }

  function textoResumen(res, nombre, hist) {
    const top = res.recomendaciones[0];
    const lineas = [
      '¡Hola, Barbería Imperio! Hice mi ficha de estilo en la web.' + (nombre ? ' Soy ' + nombre + '.' : ''),
      'Me recomendó: ' + res.recomendaciones.map(r => r.nombre).join(', ') + '.',
      'Me interesa: ' + top.nombre + '. ' + top.pedir
    ];
    if (hist) lineas.push(`Llevo ${hist.total} visita${hist.total === 1 ? '' : 's'} registrada${hist.total === 1 ? '' : 's'}; la última fue el ${fechaLarga(hist.ultima)}.`);
    lineas.push('¿Qué disponibilidad tienen? Gracias.');
    return lineas.join('\n');
  }

  async function copiar(texto, status) {
    try { await navigator.clipboard.writeText(texto); status.textContent = 'Resumen copiado. Pégalo en un mensaje a @barberia._imperio.'; }
    catch { status.textContent = 'No se pudo copiar automáticamente. Usa «Imprimir o guardar PDF» y comparte el archivo.'; }
  }

  async function pedirIA(perfil, visitas) {
    try {
      const r = await fetch('/api/asesor', { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ perfil, historial: visitas.map(v => ({ corte: v.corte, satisfaccion: v.satisfaccion })) }) });
      if (!r.ok) return null;
      const data = await r.json();
      return data.ia ? data.informe : null;
    } catch { return null; }
  }

  function renderFicha(contenedor, { perfil, visitas = [], nombre = '', titulo, conHistorial, onGuardar, ia }) {
    const res = A.recomendar(perfil, visitas);
    const hist = conHistorial ? A.resumenHistorial(visitas) : null;
    const ficha = el('article', { class: 'ficha', 'aria-labelledby': 'ficha-title' });
    ficha.append(
      el('div', { class: 'ficha-head' }, el('span', {}, 'FICHA DE ESTILO · IMPERIO'), el('span', {}, fechaCorta(hoyChile()).toUpperCase())),
      el('h2', { id: 'ficha-title' }, titulo || (nombre ? 'Informe de ' + nombre : 'Tu informe de estilo'))
    );
    if (ia?.resumen) ficha.append(el('div', { class: 'ficha-ai' }, el('span', { class: 'label' }, 'RESUMEN REDACTADO CON IA'), el('p', {}, ia.resumen)));
    if (hist) {
      ficha.append(el('dl', { class: 'stats' },
        el('div', {}, el('dt', {}, 'Visitas'), el('dd', {}, String(hist.total))),
        el('div', {}, el('dt', {}, 'Cada'), el('dd', {}, hist.intervaloPromedio ? hist.intervaloPromedio + ' días' : '—')),
        el('div', {}, el('dt', {}, 'Nota media'), el('dd', {}, hist.satisfaccionPromedio ? hist.satisfaccionPromedio + '/5' : '—'))
      ));
      const p = [`Primera visita registrada el ${fechaLarga(hist.primera)} y la última el ${fechaLarga(hist.ultima)}.`];
      if (hist.favorito) p.push(`Tu corte más repetido es ${hist.favorito} (${hist.vecesFavorito} ${hist.vecesFavorito === 1 ? 'vez' : 'veces'}).`);
      p.push(`Según tu ritmo, tu próxima visita ideal es cerca del ${fechaLarga(hist.proximaVisita)}.`);
      ficha.append(el('p', {}, p.join(' ')));
    }
    ficha.append(el('span', { class: 'label', style: 'margin-top:18px' }, 'TU PERFIL'), fichaPerfil(res.perfil));
    if (!res.completo) ficha.append(el('p', {}, 'Completa todas las preguntas para un informe más preciso.'));
    ficha.append(...fichaRecomendaciones(res, ia));
    ficha.append(el('section', { class: 'rec' }, el('span', { class: 'label' }, 'BARBA'), el('p', {}, res.barba)));
    ficha.append(el('section', { class: 'rec' }, el('span', { class: 'label' }, 'MENOS RECOMENDADOS PARA TI'),
      el('ul', {}, res.descartados.map(d => el('li', {}, el('strong', {}, d.nombre + ': '), d.motivo)))));
    if (ia?.consejo) ficha.append(el('p', { class: 'ficha-ai' }, el('span', { class: 'label' }, 'CONSEJO'), ia.consejo));
    ficha.append(el('p', { class: 'ficha-foot' }, ia
      ? 'Selección hecha por el sistema de recomendación de Imperio; textos personalizados redactados con IA. Tu barbero confirma el corte en persona.'
      : 'Recomendación orientativa generada por reglas a partir de tus respuestas. No analiza fotografías. Tu barbero confirma el corte en persona.'));

    const status = el('p', { class: 'status', role: 'status', 'aria-live': 'polite' });
    const acciones = el('div', { class: 'ficha-actions' });
    const btnPrint = el('button', { type: 'button', class: 'btn btn-ink' }, 'Imprimir o guardar PDF');
    btnPrint.addEventListener('click', () => window.print());
    const btnCopy = el('button', { type: 'button', class: 'btn btn-line-ink' }, 'Copiar para Instagram');
    btnCopy.addEventListener('click', () => copiar(textoResumen(res, nombre, hist), status));
    acciones.append(btnPrint, btnCopy);
    if (onGuardar) {
      const btnSave = el('button', { type: 'button', class: 'btn btn-line-ink' }, 'Guardar en Mi ficha');
      btnSave.addEventListener('click', () => { status.textContent = onGuardar() ? 'Guardado en este dispositivo. Encuéntralo en Mi ficha.' : 'Tu navegador no permite guardar datos. Usa «Imprimir o guardar PDF».'; });
      acciones.append(btnSave);
    }
    const ig = el('a', { class: 'btn btn-line-ink', href: 'https://www.instagram.com/barberia._imperio/', target: '_blank', rel: 'noopener noreferrer' },
      'Abrir Instagram ', el('span', { 'aria-hidden': 'true' }, '↗'), el('span', { class: 'sr-only' }, ' (abre en otra pestaña)'));
    acciones.append(ig);
    ficha.append(acciones, status);
    contenedor.replaceChildren(ficha);
    return res;
  }

  function vacioFicha(contenedor, titulo, texto) {
    contenedor.replaceChildren(el('div', { class: 'ficha-empty' }, el('strong', {}, titulo), texto));
  }

  /* ---------- Página: asesor ---------- */
  function paginaAsesor() {
    const form = $('#quiz');
    const salida = $('#resultado');
    const status = $('#quiz-status');
    const datos = leer();
    const actualizar = renderQuiz(form, datos.perfil || {}, () => { status.textContent = ''; });
    vacioFicha(salida, 'Tu informe aparecerá aquí', 'Responde las preguntas y presiona «Ver mi informe». Mientras más completes, más preciso será.');
    $('#quiz-submit').addEventListener('click', async () => {
      const perfil = actualizar();
      const n = Object.keys(perfil).length;
      if (n < 4) { status.textContent = 'Responde al menos 4 preguntas (tipo de cabello, rostro, mantención y estilo ayudan más).'; return; }
      status.textContent = 'Preparando tu informe…';
      const pintar = ia => renderFicha(salida, { perfil, visitas: datos.visitas, nombre: datos.nombre, ia,
        onGuardar: () => { const d = leer(); d.perfil = perfil; return guardar(d); } });
      pintar(null);
      salida.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      salida.querySelector('h2')?.setAttribute('tabindex', '-1');
      salida.querySelector('h2')?.focus({ preventScroll: true });
      const ia = await pedirIA(perfil, datos.visitas);
      if (ia) { pintar(ia); status.textContent = 'Informe listo, con textos personalizados por IA.'; }
      else status.textContent = 'Informe listo.';
    });
  }

  /* ---------- Página: Mi ficha ---------- */
  function paginaFicha() {
    const banda = $('#ejemplo-banda');
    if (EJEMPLO) {
      banda.hidden = false;
      $('#ver-ejemplo').hidden = true;
    }
    const datos = leer();
    const salida = $('#resultado');
    const nombre = $('#cliente-nombre');
    nombre.value = datos.nombre || '';
    const quizForm = $('#quiz');
    const actualizarPerfil = renderQuiz(quizForm, datos.perfil || {});
    const status = $('#ficha-status');

    // Selector de cortes del catálogo para el historial
    const selCorte = $('#visita-corte');
    A.CORTES.forEach(c => selCorte.append(el('option', { value: c.id }, c.nombre)));
    selCorte.append(el('option', { value: 'otro' }, 'Otro / no sé el nombre'));
    $('#visita-fecha').max = hoyChile();
    $('#visita-fecha').value = hoyChile();

    // Barberos publicados (si hay); si no, el campo queda libre
    fetch('/data/equipo.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : []).then(lista => {
      const publicados = (Array.isArray(lista) ? lista : []).filter(b => b && b.nombre && b.publicado);
      if (!publicados.length) return;
      const sel = el('select', { id: 'visita-barbero' }, el('option', { value: '' }, 'Sin preferencia'), publicados.map(b => el('option', { value: b.nombre }, b.nombre)));
      $('#visita-barbero').replaceWith(sel);
    }).catch(() => {});

    const panelPerfil = $('#panel-perfil');
    const panelVisita = $('#visita-form').closest('section');
    const pintarPerfil = () => {
      const d = leer();
      const perfil = A.limpiarPerfil(d.perfil);
      const listo = Object.keys(perfil).length >= 4;
      const resumen = $('#perfil-resumen');
      if (listo) {
        resumen.replaceChildren(el('ul', { class: 'perfil-chips', 'aria-label': 'Tu perfil guardado' },
          ['tipo', 'rostro', 'densidad', 'mantencion', 'estilo'].filter(k => perfil[k]).map(k => el('li', {}, A.etiqueta(k, perfil[k])))));
        $('#perfil-details').open = false;
        // Cliente que vuelve: registrar un corte va primero
        if (panelPerfil.previousElementSibling !== panelVisita) panelVisita.after(panelPerfil);
      } else {
        resumen.textContent = 'Respóndelo una vez; se usa para todas tus recomendaciones.';
        $('#perfil-details').open = true;
        if (panelPerfil.nextElementSibling !== panelVisita) panelVisita.before(panelPerfil);
      }
      $('#ir-informe').hidden = !(listo || d.visitas.length);
    };

    const pintar = (ia = null) => {
      pintarPerfil();
      const d = leer();
      $('#historial-lista').replaceChildren(...historialItems(d.visitas));
      $('#historial-vacio').hidden = d.visitas.length > 0;
      if (Object.keys(d.perfil || {}).length < 4 && !d.visitas.length) {
        vacioFicha(salida, 'Tu informe aparecerá aquí', 'Completa tu perfil de estilo y registra tus visitas. El informe se actualiza con cada corte.');
        return;
      }
      renderFicha(salida, { perfil: d.perfil, visitas: d.visitas, nombre: d.nombre, conHistorial: d.visitas.length > 0, ia,
        titulo: d.nombre ? 'Ficha de ' + d.nombre : 'Tu ficha de cliente' });
    };

    const historialItems = visitas => visitas.slice().sort((a, b) => a.fecha < b.fecha ? 1 : -1).map(v => {
      const quitar = el('button', { type: 'button', 'aria-label': `Quitar visita del ${fechaLarga(v.fecha)}` }, 'Quitar');
      quitar.addEventListener('click', () => {
        const d = leer(); d.visitas = d.visitas.filter(x => x.id !== v.id); guardar(d); pintar();
        status.textContent = 'Visita quitada.';
      });
      const estrellas = v.satisfaccion ? '★'.repeat(v.satisfaccion) + '☆'.repeat(5 - v.satisfaccion) : '';
      return el('li', {},
        el('time', { datetime: v.fecha }, fechaCorta(v.fecha)),
        el('div', {}, el('strong', {}, v.corte === 'otro' ? 'Otro corte' : A.nombreCorte(v.corte)),
          v.barbero ? el('p', {}, 'Con ' + v.barbero) : null, v.nota ? el('p', {}, v.nota) : null),
        el('div', {}, estrellas ? el('span', { class: 'stars', 'aria-label': `Nota ${v.satisfaccion} de 5` }, estrellas) : null, quitar));
    });

    $('#perfil-guardar').addEventListener('click', () => {
      const d = leer();
      d.perfil = actualizarPerfil();
      d.nombre = nombre.value.trim().slice(0, 40);
      status.textContent = guardar(d) ? 'Perfil guardado en este dispositivo.' : 'Tu navegador no permite guardar datos en este dispositivo.';
      pintar();
      $('#perfil-details > summary').focus();
    });

    $('#visita-form').addEventListener('submit', async e => {
      e.preventDefault();
      const fecha = $('#visita-fecha').value;
      const err = $('#visita-fecha-error');
      const valido = fecha && fecha <= hoyChile();
      $('#visita-fecha').setAttribute('aria-invalid', String(!valido));
      err.hidden = valido;
      err.textContent = valido ? '' : 'Indica la fecha del corte (hoy o antes).';
      if (!valido) { $('#visita-fecha').focus(); return; }
      const sat = Number(($('#visita-form').querySelector('input[name="satisfaccion"]:checked') || {}).value || 0);
      const d = leer();
      d.visitas.push({ id: String(Date.now()), fecha, corte: selCorte.value, barbero: ($('#visita-barbero').value || '').trim().slice(0, 40),
        nota: $('#visita-nota').value.trim().slice(0, 200), satisfaccion: sat });
      d.visitas = d.visitas.slice(-60);
      status.textContent = guardar(d) ? 'Visita registrada. Tu informe se actualizó.' : 'Tu navegador no permite guardar datos en este dispositivo.';
      $('#visita-nota').value = '';
      $('#visita-form').querySelectorAll('input[name="satisfaccion"]').forEach(i => { i.checked = false; });
      pintar();
      const ia = await pedirIA(d.perfil, d.visitas);
      if (ia) pintar(ia);
    });

    $('#borrar-todo').addEventListener('click', () => {
      if (!window.confirm('¿Borrar tu perfil y todo tu historial de este dispositivo? No se puede deshacer.')) return;
      borrar();
      nombre.value = '';
      quizForm.querySelectorAll('input').forEach(i => { i.checked = false; });
      quizForm.dispatchEvent(new Event('change'));
      status.textContent = 'Tus datos se borraron de este dispositivo.';
      pintar();
    });

    if (!guardable) status.textContent = 'Tu navegador no permite guardar datos en este dispositivo.';
    pintar();
    if (leer().visitas.length || Object.keys(leer().perfil).length >= 4) pedirIA(leer().perfil, leer().visitas).then(ia => { if (ia) pintar(ia); });
  }

  /* ---------- Página: equipo ---------- */
  function paginaEquipo() {
    const cont = $('#equipo-lista');
    fetch('/data/equipo.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : []).catch(() => []).then(lista => {
      const publicados = (Array.isArray(lista) ? lista : []).filter(b => b && b.nombre && b.publicado);
      if (!publicados.length) { cont.replaceChildren(perfilMuestra()); return; }
      cont.replaceChildren(...publicados.map(perfilCard));
    });
  }

  function fila(dt, dd) { return el('div', {}, el('dt', {}, dt), el('dd', {}, dd)); }

  function perfilCard(b) {
    const foto = el('div', { class: 'profile-photo' }, b.foto
      ? el('img', { src: b.foto, alt: 'Retrato de ' + b.nombre, loading: 'lazy', width: 300, height: 400 })
      : el('span', { class: 'pending', 'aria-hidden': 'true' }, b.nombre.slice(0, 1)));
    const card = el('article', { class: 'profile-card', id: b.id || null, 'aria-labelledby': 'b-' + (b.id || b.nombre) },
      foto, el('div', {}, el('h2', { id: 'b-' + (b.id || b.nombre) }, b.nombre), b.rol ? el('p', { class: 'role' }, b.rol) : null));
    if (b.bio) card.append(el('p', { class: 'lead', style: 'color:var(--muted);font-size:14px' }, b.bio));
    const dl = el('dl');
    if (b.especialidades?.length) dl.append(fila('Especialidades', b.especialidades.join(' · ')));
    if (b.desde) dl.append(fila('En Imperio desde', String(b.desde)));
    if (b.horario) dl.append(fila('Horario', b.horario));
    card.append(dl);
    if (b.trabajos?.length) card.append(el('div', { class: 'profile-work' }, b.trabajos.slice(0, 3).map((t, i) => el('img', { src: t, alt: `Trabajo ${i + 1} de ${b.nombre}`, loading: 'lazy', width: 160, height: 213 }))));
    card.append(el('a', { class: 'btn btn-gold', href: b.instagram || 'https://www.instagram.com/barberia._imperio/', target: '_blank', rel: 'noopener noreferrer' },
      'Consultar con ' + b.nombre.split(' ')[0] + ' ', el('span', { 'aria-hidden': 'true' }, '↗'), el('span', { class: 'sr-only' }, ' (abre Instagram en otra pestaña)')));
    return card;
  }

  function perfilMuestra() {
    const card = el('article', { class: 'profile-card', 'aria-labelledby': 'b-muestra' },
      el('div', { class: 'profile-photo' }, el('span', { class: 'profile-tag' }, 'Perfil de muestra'), el('span', { class: 'pending', 'aria-hidden': 'true' }, 'IMP')),
      el('div', {}, el('h2', { id: 'b-muestra' }, 'Nombre por confirmar'), el('p', { class: 'role' }, 'Barbero de Imperio')));
    const dl = el('dl');
    dl.append(fila('Especialidades', 'Se publican cuando el barbero las confirme'), fila('Trabajos', 'Galería propia con fotos autorizadas'), fila('Horario', 'Días y franjas de atención'), fila('Consulta', 'Directo por Instagram'));
    card.append(dl, el('p', { class: 'privacy' }, 'Así se verá cada perfil. No publicamos nombres, retratos ni especialidades sin la autorización de cada barbero.'));
    return card;
  }

  const pagina = document.body.dataset.page;
  if (pagina === 'asesor') paginaAsesor();
  if (pagina === 'ficha') paginaFicha();
  if (pagina === 'equipo') paginaEquipo();
})();
