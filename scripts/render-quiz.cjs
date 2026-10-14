// Genera el HTML estático del cuestionario dentro de asesor.html y mi-ficha.html (evita saltos de diseño al cargar).
// Uso: node scripts/render-quiz.cjs
const fs = require('fs');
const path = require('path');
const A = require('../assets/js/asesor-engine.js');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const total = A.PREGUNTAS.length;
let html = `<div class="quiz-progress"><span><strong>0 de ${total}</strong> respondidas</span><span class="quiz-meter" aria-hidden="true"><i style="width:0%"></i></span></div>`;
A.PREGUNTAS.forEach((q, i) => {
  const n = String(i + 1).padStart(2, '0');
  const help = q.ayuda ? ` aria-describedby="help-${q.id}"` : '';
  html += `<fieldset class="q"><legend><span class="q-n" aria-hidden="true">${n}</span>${esc(q.titulo)}</legend>`;
  if (q.ayuda) html += `<p class="q-help" id="help-${q.id}">${esc(q.ayuda)}</p>`;
  html += '<div class="choices">';
  q.opciones.forEach(([v, t, d]) => {
    const id = `q-${q.id}-${v}`;
    html += `<div class="choice"><input type="radio" name="${q.id}" id="${id}" value="${v}"${help}><label for="${id}">${esc(t)}${d ? `<small>${esc(d)}</small>` : ''}</label></div>`;
  });
  html += '</div></fieldset>';
});
for (const file of ['asesor.html', 'mi-ficha.html']) {
  const p = path.join(__dirname, '..', file);
  const src = fs.readFileSync(p, 'utf8');
  const out = src.replace(/(<form id="quiz"[^>]*>)[\s\S]*?(<\/form>)/, `$1${html}$2`);
  fs.writeFileSync(p, out);
}
console.log('Cuestionario renderizado');
