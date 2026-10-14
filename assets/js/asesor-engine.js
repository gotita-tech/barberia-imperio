/*
 * Motor de recomendación de cortes de Barbería Imperio.
 * Sistema experto por reglas: puntúa un catálogo cerrado de cortes según el perfil del cliente
 * y su historial. No inventa cortes ni analiza fotografías. Lo usan el navegador (window.ImperioAsesor)
 * y la función /api/asesor (require), para que la IA solo pueda redactar sobre estos mismos resultados.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ImperioAsesor = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Preguntas del perfil. Las claves y opciones son la única entrada aceptada (también por la API).
  var PREGUNTAS = [
    { id: 'rostro', titulo: 'Forma de tu rostro', ayuda: 'Mírate de frente con el pelo hacia atrás. Si dudas, elige «No estoy seguro».', opciones: [
      ['ovalado', 'Ovalado', 'Frente y mentón proporcionados, algo más largo que ancho'],
      ['redondo', 'Redondo', 'Ancho y largo parecidos, mandíbula suave'],
      ['cuadrado', 'Cuadrado', 'Mandíbula marcada y frente ancha'],
      ['alargado', 'Alargado', 'Bastante más largo que ancho'],
      ['corazon', 'Triangular invertido', 'Frente ancha y mentón estrecho'],
      ['no_se', 'No estoy seguro', 'Lo vemos en la barbería']
    ]},
    { id: 'tipo', titulo: 'Tipo de cabello', opciones: [
      ['liso', 'Liso', 'Cae recto, sin forma propia'],
      ['ondulado', 'Ondulado', 'Forma ondas suaves al secarse'],
      ['rizado', 'Rizado', 'Rizos definidos'],
      ['afro', 'Afro / muy rizado', 'Rizo cerrado y con volumen']
    ]},
    { id: 'grosor', titulo: 'Grosor de cada pelo', opciones: [
      ['fino', 'Fino', 'Se aplasta con facilidad'], ['medio', 'Medio', 'Ni muy fino ni muy grueso'], ['grueso', 'Grueso', 'Firme, cuesta peinarlo']
    ]},
    { id: 'densidad', titulo: 'Cantidad de cabello', opciones: [
      ['baja', 'Poca', 'Se ve el cuero cabelludo con luz directa'], ['media', 'Normal', ''], ['alta', 'Abundante', 'Mucho volumen, cuesta controlarlo']
    ]},
    { id: 'entradas', titulo: 'Entradas', opciones: [
      ['no', 'Sin entradas', ''], ['leves', 'Leves', ''], ['marcadas', 'Marcadas', '']
    ]},
    { id: 'remolino', titulo: 'Remolinos', opciones: [
      ['no', 'No tengo', ''], ['coronilla', 'En la coronilla', ''], ['frente', 'En la frente', '']
    ]},
    { id: 'barba', titulo: 'Barba', opciones: [
      ['no', 'Sin barba', ''], ['corta', 'Corta o de pocos días', ''], ['larga', 'Larga', '']
    ]},
    { id: 'mantencion', titulo: 'Tiempo para peinarte cada día', opciones: [
      ['baja', 'Nada o casi nada', ''], ['media', 'Unos 5 minutos', ''], ['alta', 'Me gusta dedicarle tiempo', '']
    ]},
    { id: 'frecuencia', titulo: 'Cada cuánto puedes venir', opciones: [
      ['quincenal', 'Cada 2 semanas', ''], ['mensual', 'Una vez al mes', ''], ['bimensual', 'Cada 2 meses o más', '']
    ]},
    { id: 'contexto', titulo: 'Tu día a día', opciones: [
      ['formal', 'Trabajo formal', 'Oficina, atención de público'], ['creativo', 'Creativo o libre', ''], ['deportivo', 'Deporte o trabajo físico', ''], ['mixto', 'Un poco de todo', '']
    ]},
    { id: 'estilo', titulo: 'Qué buscas', opciones: [
      ['clasico', 'Clásico y prolijo', ''], ['actual', 'Actual pero sobrio', ''], ['llamativo', 'Que destaque', '']
    ]}
  ];

  var R = function (lista) { return lista.split(' '); };

  // Catálogo cerrado. pesos: dónde funciona bien (+), dónde no (evitar).
  var CORTES = [
    { id: 'taper-clasico', nombre: 'Taper clásico', servicio: 'Corte de cabello', familia: 'clasico',
      resumen: 'Laterales que se acortan de forma gradual, sin llegar a piel, y parte superior corta a media.',
      rostros: R('ovalado cuadrado alargado redondo corazon'), tipos: R('liso ondulado rizado afro'), mantencion: 'baja', frecuencia: 'mensual',
      contextos: R('formal mixto deportivo'), estilos: R('clasico actual'), entradas: 2, densidadMin: 'baja',
      pedir: 'Taper clásico: laterales degradados con máquina sin llegar a piel, nuca prolija y arriba entre 3 y 5 cm trabajado con tijera.',
      productos: 'Crema o cera de fijación suave y acabado natural.', evitar: 'Llevarlo demasiado largo arriba si tu cabello es muy fino: pierde forma rápido.' },
    { id: 'low-fade-textura', nombre: 'Low fade con textura', servicio: 'Degradado / Fade', familia: 'fade',
      resumen: 'Degradado bajo, cerca de la oreja y la nuca, con la parte superior texturizada y algo de movimiento.',
      rostros: R('ovalado cuadrado redondo corazon'), tipos: R('liso ondulado rizado'), mantencion: 'media', frecuencia: 'quincenal',
      contextos: R('formal mixto creativo'), estilos: R('actual clasico'), entradas: 1, densidadMin: 'media',
      pedir: 'Low fade: degradado que empieza bajo, sobre la oreja; arriba unos 4 a 6 cm texturizados con tijera para darle movimiento.',
      productos: 'Pasta o arcilla mate.', evitar: 'Dejar pasar más de 3 semanas: el degradado bajo se pierde primero.' },
    { id: 'mid-fade-crop', nombre: 'Mid fade con crop texturizado', servicio: 'Degradado / Fade', familia: 'fade',
      resumen: 'Degradado medio y flequillo corto recto o desfilado hacia adelante. Muy práctico.',
      rostros: R('ovalado redondo cuadrado corazon'), tipos: R('liso ondulado'), mantencion: 'baja', frecuencia: 'quincenal',
      contextos: R('mixto creativo deportivo'), estilos: R('actual llamativo'), entradas: 3, densidadMin: 'baja',
      pedir: 'Mid fade con crop: degradado desde la mitad del lateral y arriba corto y texturizado, con el flequillo hacia adelante.',
      productos: 'Polvo texturizador o arcilla mate.', evitar: 'Si tienes la frente muy alta y quieres despejarla, este corte la cubre: dilo al barbero.' },
    { id: 'high-fade-pompadour', nombre: 'High fade con pompadour', servicio: 'Degradado / Fade', familia: 'fade',
      resumen: 'Degradado alto y volumen peinado hacia atrás en la parte superior. Alto contraste.',
      rostros: R('ovalado redondo corazon'), tipos: R('liso ondulado'), mantencion: 'alta', frecuencia: 'quincenal',
      contextos: R('creativo mixto'), estilos: R('llamativo'), entradas: 0, densidadMin: 'alta',
      pedir: 'High fade con pompadour: degradado alto y arriba largo (7 a 10 cm) para peinarlo con volumen hacia atrás.',
      productos: 'Pomada de brillo medio y secador para dar volumen.', evitar: 'Con poca densidad o entradas marcadas se notan los huecos al peinarlo hacia atrás.' },
    { id: 'burst-fade', nombre: 'Burst fade', servicio: 'Degradado / Fade', familia: 'fade',
      resumen: 'Degradado en semicírculo alrededor de la oreja; la nuca conserva largo. Moderno y con carácter.',
      rostros: R('ovalado cuadrado alargado'), tipos: R('ondulado rizado afro'), mantencion: 'media', frecuencia: 'quincenal',
      contextos: R('creativo deportivo mixto'), estilos: R('llamativo actual'), entradas: 2, densidadMin: 'media',
      pedir: 'Burst fade: degradado en curva alrededor de la oreja, dejando largo en la nuca y en la parte superior.',
      productos: 'Crema para rizos o espuma ligera.', evitar: 'Ambientes muy formales: es un corte que llama la atención.' },
    { id: 'buzz-cut', nombre: 'Buzz cut', servicio: 'Corte de cabello', familia: 'corto',
      resumen: 'Todo corto a máquina, parejo o con un leve degradado. Cero mantención diaria.',
      rostros: R('ovalado cuadrado'), tipos: R('liso ondulado rizado afro'), mantencion: 'baja', frecuencia: 'quincenal',
      contextos: R('deportivo mixto formal'), estilos: R('clasico actual'), entradas: 3, densidadMin: 'baja',
      pedir: 'Buzz cut: máquina pareja (número 2 a 4 arriba) con laterales un número más corto y contornos marcados.',
      productos: 'Ninguno; protector solar en el cuero cabelludo si pasas tiempo al sol.', evitar: 'Rostros muy redondos o alargados: acentúa la forma.' },
    { id: 'side-part', nombre: 'Side part clásico', servicio: 'Corte de cabello', familia: 'clasico',
      resumen: 'Raya al costado, laterales cortos con tijera o máquina y la parte superior peinada hacia un lado.',
      rostros: R('ovalado cuadrado alargado redondo'), tipos: R('liso ondulado'), mantencion: 'media', frecuencia: 'mensual',
      contextos: R('formal mixto'), estilos: R('clasico'), entradas: 1, densidadMin: 'media',
      pedir: 'Side part: raya marcada al lado que te acomode, laterales cortos sin degradado agresivo y arriba 5 a 7 cm.',
      productos: 'Pomada de brillo suave o crema de peinado.', evitar: 'Un remolino en la frente puede pelear con la raya: el barbero debe ubicarla según él.' },
    { id: 'quiff', nombre: 'Quiff texturizado', servicio: 'Corte de cabello', familia: 'volumen',
      resumen: 'Flequillo con volumen hacia arriba y adelante, laterales cortos. Alarga visualmente el rostro.',
      rostros: R('redondo cuadrado ovalado'), tipos: R('liso ondulado'), mantencion: 'alta', frecuencia: 'mensual',
      contextos: R('creativo mixto formal'), estilos: R('actual llamativo'), entradas: 1, densidadMin: 'media',
      pedir: 'Quiff texturizado: laterales cortos o con degradado y arriba más largo hacia el frente (6 a 8 cm) para levantarlo.',
      productos: 'Arcilla o pomada mate y secador.', evitar: 'Rostros alargados: el volumen arriba lo alarga aún más.' },
    { id: 'tijera-flow', nombre: 'Corte a tijera con largo (flow)', servicio: 'Corte de cabello', familia: 'largo',
      resumen: 'Cabello medio largo trabajado entero con tijera, con capas para que caiga con forma propia.',
      rostros: R('ovalado alargado cuadrado corazon'), tipos: R('ondulado rizado liso'), mantencion: 'media', frecuencia: 'bimensual',
      contextos: R('creativo mixto'), estilos: R('actual llamativo'), entradas: 1, densidadMin: 'media',
      pedir: 'Corte a tijera con largo: mantener el largo general, quitar volumen con capas y limpiar contornos y nuca.',
      productos: 'Spray de sal marina o crema ligera para definir la onda.', evitar: 'Cabello muy fino y liso: tiende a verse plano.' },
    { id: 'twists-taper', nombre: 'Rizos definidos con taper', servicio: 'Degradado / Fade', familia: 'rizo',
      resumen: 'Taper bajo que limpia laterales y nuca, dejando los rizos o twists definidos arriba.',
      rostros: R('ovalado redondo cuadrado alargado corazon'), tipos: R('rizado afro'), mantencion: 'media', frecuencia: 'mensual',
      contextos: R('creativo mixto deportivo formal'), estilos: R('actual llamativo clasico'), entradas: 2, densidadMin: 'baja',
      pedir: 'Taper bajo con rizos arriba: limpiar laterales y nuca con degradado bajo y mantener el rizo arriba, solo dando forma.',
      productos: 'Crema de rizos o gel suave; esponja para twists si te gusta ese acabado.', evitar: 'Cepillar el rizo en seco: pierde definición.' },
    { id: 'diseno-lineas', nombre: 'Degradado con diseño de líneas', servicio: 'Diseño personalizado', familia: 'diseno',
      resumen: 'Degradado con líneas o figuras hechas a navaja en el lateral. La especialidad visual de Imperio.',
      rostros: R('ovalado cuadrado redondo alargado corazon'), tipos: R('liso ondulado rizado afro'), mantencion: 'baja', frecuencia: 'quincenal',
      contextos: R('creativo deportivo'), estilos: R('llamativo'), entradas: 2, densidadMin: 'baja',
      pedir: 'Degradado con diseño: elige una referencia de la galería y define con el barbero dónde va la línea y qué tan visible la quieres.',
      productos: 'Ninguno especial; el diseño dura 1 a 2 semanas y luego se repasa.', evitar: 'Esperar que dure un mes: las líneas se borran a medida que crece el pelo.' },
    { id: 'slick-undercut', nombre: 'Slick back con undercut', servicio: 'Corte de cabello', familia: 'volumen',
      resumen: 'Laterales muy cortos y parte superior larga peinada hacia atrás, con contraste marcado.',
      rostros: R('ovalado cuadrado'), tipos: R('liso ondulado'), mantencion: 'alta', frecuencia: 'mensual',
      contextos: R('formal creativo'), estilos: R('llamativo clasico'), entradas: 0, densidadMin: 'alta',
      pedir: 'Slick back con undercut: laterales cortos sin degradar hacia arriba y arriba largo (8 a 12 cm) para peinar hacia atrás.',
      productos: 'Pomada de brillo con fijación media.', evitar: 'Entradas marcadas o poca densidad: peinar hacia atrás las deja a la vista.' }
  ];

  var NIVEL = { baja: 0, media: 1, alta: 2 };
  var FREC = { quincenal: 0, mensual: 1, bimensual: 2 };
  var TEXTO_FREC = { quincenal: 'cada 2 a 3 semanas', mensual: 'cada 4 a 5 semanas', bimensual: 'cada 6 a 8 semanas' };
  var DIAS_FREC = { quincenal: 18, mensual: 32, bimensual: 50 };

  function etiqueta(preguntaId, valor) {
    var p = PREGUNTAS.find(function (q) { return q.id === preguntaId; });
    var o = p && p.opciones.find(function (x) { return x[0] === valor; });
    return o ? o[1] : valor;
  }

  // Devuelve solo las respuestas válidas; cualquier otra clave o valor se descarta.
  function limpiarPerfil(perfil) {
    var limpio = {};
    PREGUNTAS.forEach(function (p) {
      var v = perfil && perfil[p.id];
      if (p.opciones.some(function (o) { return o[0] === v; })) limpio[p.id] = v;
    });
    return limpio;
  }

  function puntuar(corte, p, historial) {
    var puntos = 50, razones = [], alertas = [];
    function suma(n, razon) { puntos += n; if (razon && n > 0) razones.push(razon); if (razon && n < 0) alertas.push(razon); }

    if (p.rostro && p.rostro !== 'no_se') {
      if (corte.rostros.indexOf(p.rostro) >= 0) suma(10, 'Equilibra un rostro ' + etiqueta('rostro', p.rostro).toLowerCase() + '.');
      else suma(-10, 'No es el que más favorece a un rostro ' + etiqueta('rostro', p.rostro).toLowerCase() + '.');
    }
    if (p.tipo) {
      if (corte.tipos.indexOf(p.tipo) >= 0) suma(12, 'Funciona con cabello ' + etiqueta('tipo', p.tipo).toLowerCase() + '.');
      else suma(-18, 'Tu cabello ' + etiqueta('tipo', p.tipo).toLowerCase() + ' no se presta bien para este corte.');
    }
    if (p.densidad) {
      var falta = NIVEL[corte.densidadMin] - NIVEL[p.densidad];
      if (falta > 0) suma(-12 * falta, 'Necesita más cantidad de cabello para verse bien.');
      else if (p.densidad === 'baja' && corte.densidadMin === 'baja') suma(6, 'Disimula bien cuando hay poca densidad.');
    }
    if (p.grosor === 'fino' && (corte.familia === 'largo' || corte.familia === 'volumen')) suma(-6, 'Con pelo fino cuesta mantener el volumen o el largo.');
    if (p.grosor === 'grueso' && corte.familia === 'fade') suma(4, 'El degradado aliviana el pelo grueso.');
    if (p.entradas === 'marcadas') {
      if (corte.entradas >= 2) suma(8, 'Disimula las entradas.'); else suma(-12, 'Deja a la vista las entradas marcadas.');
    } else if (p.entradas === 'leves' && corte.entradas === 0) suma(-4, 'Puede dejar a la vista las entradas.');
    if (p.remolino === 'frente' && (corte.id === 'side-part' || corte.id === 'slick-undercut')) suma(-6, 'Un remolino en la frente complica peinarlo así.');
    if (p.remolino === 'coronilla' && (corte.id === 'buzz-cut' || corte.familia === 'fade')) suma(3, 'Lo corto arriba controla el remolino de la coronilla.');
    if (p.mantencion) {
      var dif = NIVEL[corte.mantencion] - NIVEL[p.mantencion];
      if (dif === 0) suma(8, 'Calza con el tiempo que tienes para peinarte.');
      else if (dif < 0) suma(2);
      else suma(-9 * dif, 'Pide más tiempo de peinado del que quieres dedicar.');
    }
    if (p.frecuencia) {
      var d2 = FREC[p.frecuencia] - FREC[corte.frecuencia];
      if (d2 === 0) suma(6, 'Puedes mantenerlo con la frecuencia que indicaste.');
      else if (d2 < 0) suma(2);
      else suma(-7 * d2, 'Se ve mejor si vienes más seguido de lo que puedes.');
    }
    if (p.contexto) {
      if (corte.contextos.indexOf(p.contexto) >= 0) suma(6, 'Encaja en un día a día ' + etiqueta('contexto', p.contexto).toLowerCase() + '.');
      else suma(-6, 'Puede verse fuera de lugar en tu día a día.');
    }
    if (p.estilo) {
      if (corte.estilos.indexOf(p.estilo) >= 0) suma(10, 'Coincide con lo que buscas: ' + etiqueta('estilo', p.estilo).toLowerCase() + '.');
      else suma(-8, 'Es más ' + (corte.estilos[0] === 'llamativo' ? 'llamativo' : 'sobrio') + ' de lo que buscas.');
    }

    // Historial: lo que gustó suma, lo que no gustó resta.
    (historial || []).forEach(function (v) {
      if (v.corte !== corte.id || !v.satisfaccion) return;
      if (v.satisfaccion >= 4) suma(8, 'Ya lo probaste y te gustó.');
      if (v.satisfaccion <= 2) suma(-15, 'Ya lo probaste y no te convenció.');
    });

    // 125 es el máximo alcanzable sin historial; se expresa como afinidad 0–100.
    return { puntos: Math.max(0, Math.min(100, Math.round(puntos / 125 * 100))), bruto: puntos, razones: razones.slice(0, 4), alertas: alertas.slice(0, 2) };
  }

  function barbaSugerida(p, corte) {
    if (p.barba === 'no' || !p.barba) return 'Si quieres sumar barba, una de pocos días con contornos marcados acompaña bien este corte.';
    if (corte.familia === 'fade') return 'Une el degradado con la barba (fade continuo en la patilla) para que corte y barba se lean como un solo trabajo.';
    if (p.barba === 'larga') return 'Con barba larga, mantén los laterales algo más cortos para equilibrar el volumen de la cara.';
    return 'Perfila la barba con la misma línea del corte en patillas y nuca.';
  }

  function recomendar(perfilEntrada, historial) {
    var p = limpiarPerfil(perfilEntrada);
    var lista = CORTES.map(function (c) {
      var r = puntuar(c, p, historial);
      return { corte: c, puntos: r.puntos, bruto: r.bruto, razones: r.razones, alertas: r.alertas };
    }).sort(function (a, b) { return b.bruto - a.bruto; });

    // Variedad: si los tres primeros son de la misma familia, sube la mejor alternativa de otra familia.
    var top = lista.slice(0, 3);
    if (top.every(function (x) { return x.corte.familia === top[0].corte.familia; })) {
      var otra = lista.find(function (x) { return x.corte.familia !== top[0].corte.familia; });
      if (otra) top[2] = otra;
    }

    var principal = top[0].corte;
    return {
      perfil: p,
      completo: PREGUNTAS.every(function (q) { return p[q.id]; }),
      recomendaciones: top.map(function (x, i) {
        return {
          id: x.corte.id, nombre: x.corte.nombre, servicio: x.corte.servicio, afinidad: x.puntos,
          resumen: x.corte.resumen, razones: x.razones, alertas: x.alertas,
          pedir: x.corte.pedir, productos: x.corte.productos, evitar: x.corte.evitar,
          mantencion: TEXTO_FREC[x.corte.frecuencia], diasMantencion: DIAS_FREC[x.corte.frecuencia],
          rol: i === 0 ? 'Recomendación principal' : i === 1 ? 'Alternativa' : 'Para variar'
        };
      }),
      descartados: lista.slice(-2).map(function (x) { return { nombre: x.corte.nombre, motivo: x.alertas[0] || 'Es el que menos calza con tu perfil.' }; }),
      barba: barbaSugerida(p, principal)
    };
  }

  // Resumen del historial de visitas para el informe de Mi ficha.
  function resumenHistorial(visitas) {
    var v = (visitas || []).slice().filter(function (x) { return x.fecha; }).sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
    if (!v.length) return null;
    var dias = [];
    for (var i = 1; i < v.length; i++) dias.push((new Date(v[i].fecha) - new Date(v[i - 1].fecha)) / 86400000);
    var conteo = {};
    v.forEach(function (x) { if (x.corte) conteo[x.corte] = (conteo[x.corte] || 0) + 1; });
    var favorito = Object.keys(conteo).sort(function (a, b) { return conteo[b] - conteo[a]; })[0];
    var notas = v.filter(function (x) { return x.satisfaccion; }).map(function (x) { return Number(x.satisfaccion); });
    var ultima = v[v.length - 1];
    var corteUltimo = CORTES.find(function (c) { return c.id === ultima.corte; });
    var intervalo = dias.length ? Math.round(dias.reduce(function (a, b) { return a + b; }, 0) / dias.length) : null;
    var base = intervalo || (corteUltimo ? DIAS_FREC[corteUltimo.frecuencia] : 30);
    var proxima = new Date(new Date(ultima.fecha).getTime() + base * 86400000);
    return {
      total: v.length, primera: v[0].fecha, ultima: ultima.fecha, intervaloPromedio: intervalo,
      favorito: favorito ? nombreCorte(favorito) : null, vecesFavorito: favorito ? conteo[favorito] : 0,
      satisfaccionPromedio: notas.length ? Math.round(notas.reduce(function (a, b) { return a + b; }, 0) / notas.length * 10) / 10 : null,
      proximaVisita: proxima.toISOString().slice(0, 10), cortesDistintos: Object.keys(conteo).length
    };
  }

  function nombreCorte(id) { var c = CORTES.find(function (x) { return x.id === id; }); return c ? c.nombre : 'Otro'; }

  return { PREGUNTAS: PREGUNTAS, CORTES: CORTES.map(function (c) { return { id: c.id, nombre: c.nombre, servicio: c.servicio }; }),
    limpiarPerfil: limpiarPerfil, recomendar: recomendar, resumenHistorial: resumenHistorial, nombreCorte: nombreCorte, etiqueta: etiqueta };
});
