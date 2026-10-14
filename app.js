(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  // Los enlaces no admiten disabled nativo; aria-disabled conserva el foco sin activar la acción.
  document.addEventListener('click', event => {
    if (event.target.closest('[aria-disabled="true"]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  const menu = document.querySelector('.menu-toggle');
  const nav = $('main-nav');
  let updateMobileBar = () => {};
  const setMenu = opened => {
    menu.setAttribute('aria-expanded', String(opened));
    menu.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', opened);
    updateMobileBar();
  };
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  const desktopMenu = window.matchMedia('(min-width: 841px)');
  desktopMenu.addEventListener('change', event => { if (event.matches) setMenu(false); });

  const consultation = document.querySelector('.consultation-panel');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clearMessage = () => {
    $('booking-output').hidden = true;
    $('copy-status').textContent = '';
  };
  const openConsultation = (service, status, focusNotes = false) => {
    consultation.open = true;
    if (service) $('appointment-service').value = service;
    clearMessage();
    $('consultation-status').textContent = status || '';
    const field = focusNotes ? $('appointment-notes') : $('appointment-service');
    field.focus({preventScroll: true});
    consultation.scrollIntoView({behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start'});
  };
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    openConsultation(link.dataset.service, 'Categoría seleccionada: ' + link.dataset.service + '. Completa tus preferencias para preparar la consulta.');
  }));
  document.querySelector('.mobile-bar a')?.addEventListener('click', event => {
    event.preventDefault();
    openConsultation('', 'Completa tus preferencias para preparar una consulta por Instagram.');
  });
  const mobileBar = document.querySelector('.mobile-bar');
  const mobileScreen = window.matchMedia('(max-width: 580px)');
  let consultationVisible = false;
  updateMobileBar = () => {
    const pastHero = document.querySelector('.hero').getBoundingClientRect().bottom <= 0;
    mobileBar.hidden = !(mobileScreen.matches && pastHero && !consultationVisible && menu.getAttribute('aria-expanded') !== 'true');
  };
  if ('IntersectionObserver' in window) {
    const observer = new window.IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target.id === 'reservar') consultationVisible = entry.isIntersecting;
      }
      updateMobileBar();
    });
    observer.observe(document.querySelector('.hero'));
    observer.observe($('reservar'));
    mobileScreen.addEventListener('change', updateMobileBar);
    document.body.classList.add('mobile-cta-enabled');
    updateMobileBar();
  }

  const filters = [...document.querySelectorAll('.filter')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.hidden = category !== 'todos' && !card.dataset.category.split(' ').includes(category);
    });
  }));

  const suggestions = {
    fade: {
      low: ['Degradado bajo y parte superior corta', 'Una silueta pulida, con laterales controlados y poco tiempo de peinado. Pídele al barbero que adapte la altura del fade a tu cabello.'],
      medium: ['Degradado medio con textura', 'Permite llevar la parte superior con movimiento sin perder contornos nítidos. Un acabado mate puede ayudar a peinarlo.'],
      high: ['Fade alto con styling marcado', 'Una opción de mayor contraste visual. Requiere un poco más de atención para definir la parte superior.']
    },
    classic: {
      low: ['Corte corto versátil', 'Fácil de llevar y de mantener. Lo importante será acordar con el barbero cuánto largo conservar arriba.'],
      medium: ['Crop texturizado', 'Combina un acabado actual con flexibilidad para el día a día. La textura puede adaptarse a tu cabello.'],
      high: ['Corte con volumen trabajado', 'Una propuesta que permite jugar más con la dirección y el acabado del peinado.']
    },
    design: {
      low: ['Diseño de línea sutil', 'Un detalle limpio que suma personalidad sin exigir una rutina de peinado compleja.'],
      medium: ['Diseño geométrico lateral', 'Las líneas crean un punto focal. Consulta qué ubicación favorece el corte y cómo se verá al crecer el cabello.'],
      high: ['Freestyle con degradado', 'Más libertad creativa para combinar patrones y contrastes. El barbero debe revisar la viabilidad sobre tu corte.']
    }
  };
  let importedStyle = '';
  $('recommend-btn')?.addEventListener('click', () => {
    const style = $('style-choice').value;
    const care = $('maintenance-choice').value;
    const [title, detail] = suggestions[style][care];
    const output = $('recommend-result');
    output.innerHTML = '';
    const headline = document.createElement('strong');
    const para = document.createElement('p');
    headline.textContent = title;
    para.textContent = detail + ' Es una inspiración orientativa, no un análisis automatizado de tu imagen.';
    output.append(headline, para);
    const consult = document.createElement('button');
    consult.type = 'button';
    consult.className = 'btn btn-outline btn-full';
    consult.textContent = 'Consultar este estilo ↗';
    consult.addEventListener('click', () => {
      const notes = $('appointment-notes');
      const kept = notes.value.split('\n').filter(line => !importedStyle || line !== importedStyle).join('\n').trim();
      const line = 'Estilo de referencia: ' + title;
      const next = kept ? kept + '\n' + line : line;
      const service = {fade: 'Degradado / Fade', classic: 'Corte de cabello', design: 'Diseño personalizado'}[style];
      if (next.length > notes.maxLength) {
        openConsultation(service, 'Tu comentario no tiene espacio para agregar el estilo. Conservamos tu texto; puedes acortarlo y volver a consultar la sugerencia.', true);
        return;
      }
      notes.value = next;
      importedStyle = line;
      openConsultation(service, 'Agregamos el estilo sugerido a tu comentario. Revísalo antes de preparar la consulta.', true);
    });
    output.append(consult);
    output.hidden = false;
  });
  ['style-choice', 'maintenance-choice'].forEach(id => $(id).addEventListener('change', () => {
    $('recommend-result').hidden = true;
  }));

  const dateInput = $('appointment-date');
  // Fecha local (no UTC): evita bloquear fechas válidas por diferencia de zona horaria.
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
  dateInput.min = today;
  const form = $('booking-form');
  const error = $('booking-error');
  form?.addEventListener('input', clearMessage);
  form?.addEventListener('change', clearMessage);
  form?.addEventListener('submit', event => {
    event.preventDefault();
    error.hidden = true;
    $('copy-status').textContent = '';
    $('copy-booking').textContent = '1 · Copiar mensaje';
    const service = $('appointment-service').value;
    const dateStr = dateInput.value;
    const time = $('appointment-time').value;
    const notes = $('appointment-notes').value.trim();
    if (!service || !dateStr || !time || dateStr < today) {
      error.textContent = 'Selecciona un servicio, una fecha futura o de hoy y una franja de horario.';
      error.hidden = false;
      return;
    }
    const [year,month,day] = dateStr.split('-').map(Number);
    const date = new Date(year,month-1,day);
    if (date.getDay() === 0) {
      error.textContent = 'Según el horario mostrado por la barbería, los domingos no se atiende. Elige otro día.';
      error.hidden = false;
      return;
    }
    const readableDate = new Intl.DateTimeFormat('es-CL', {weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date);
    const lines = [
      '¡Hola, Barbería Imperio! Quisiera consultar disponibilidad para una hora.',
      'Servicio de interés: ' + service,
      'Fecha preferida: ' + readableDate,
      'Horario preferido: ' + time
    ];
    if (notes) lines.push('Comentario: ' + notes);
    lines.push('¿Tienen disponibilidad? Muchas gracias.');
    $('booking-message').textContent = lines.join('\n');
    $('booking-output').hidden = false;
    $('booking-output').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  $('copy-booking')?.addEventListener('click', async () => {
    const text = $('booking-message').textContent;
    try {
      await navigator.clipboard.writeText(text);
      $('copy-status').textContent = 'Mensaje copiado. Ahora abre Instagram y pégalo en tu consulta.';
    } catch {
      // Fallback para apertura local vía file://.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('booking-message'));
      selection.removeAllRanges();
      selection.addRange(range);
      $('copy-status').textContent = 'No se pudo copiar automáticamente. El mensaje está seleccionado: cópialo desde el menú de tu dispositivo o presiona Ctrl+C (⌘C en Mac).';
    }
  });
  $('current-year').textContent = new Date().getFullYear();
})();
