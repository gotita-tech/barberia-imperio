# Rediseño urbano — Fase 5

14 de octubre de 2026. Autorización: «Sigue». Rama rediseno-urbano.

- Cada fila de servicio es un enlace completo con texto Consultar hora y etiqueta accesible específica. Abre el formulario, preselecciona la categoría, mueve el foco al campo y anuncia la selección.
- Consultar este estilo lleva la sugerencia al comentario y preselecciona su categoría. Conserva el texto del usuario, evita duplicaciones y reemplaza solo la sugerencia importada anterior. Si se exceden 250 caracteres, conserva el comentario y explica cómo acortarlo.
- Al cambiar preferencias del Asesor, se oculta la sugerencia anterior hasta generar una nueva. Al editar el formulario o cambiar categoría desde otro acceso se retira el mensaje previamente preparado, para no copiar una consulta desactualizada.
- Barra fija a anchos móviles de hasta 580 px, solo tras pasar completamente el hero y mientras el cierre de consulta no esté visible. IntersectionObserver; se oculta con el menú abierto y en escritorio. Espacio inferior reservado y área táctil mínima. Abre el formulario al pulsarla.
- Tres tarjetas de galería enlazan al Instagram oficial, con destino externo anunciado y rel=noopener noreferrer. No se incorpora zoom por la baja resolución disponible; no hay URLs confirmadas de publicaciones individuales.
- Se conserva el flujo 1 Copiar / 2 Abrir Instagram y los avisos de que no se registra ni confirma una reserva. No se envía ningún mensaje automáticamente ni se guardan datos.

## Validación local

ESLint y sintaxis aprobados; sitio estático sin compilación de framework. Playwright a 360/768/1440: filas completas/preselección, comentarios conservados, aplicación repetida sin duplicar, sustitución de sugerencia anterior, comentario lleno sin truncarlo, regeneración de mensaje tras editar, enlaces de galería, barra móvil al pasar hero/consulta visible/menú abierto, menú Esc y foco, filtros, copia real y fallback. Fuentes/fotos responsive intactas. Axe WCAG 2 A/AA y 2.1 AA sin infracciones detectadas en los escenarios probados; sin errores JS, textos bajo 12 px, imágenes rotas ni desbordamiento horizontal.

## Pendiente

Fase 6: QA a cinco anchos, teclado completo, Lighthouse móvil, metadatos y PR a main. Fotos originales de alta resolución y datos reales siguen pendientes. Producción solo tras aprobación explícita del PR. No se cambiaron variables, dominios ni configuración de Vercel.

## Preview verificada
https://barberia-imperio-demo-7x9mft9hu-gotech2.vercel.app/ — READY, deployment dpl_8pQKRRHKEkCX6YLBySpF58KEH1bK, código d9f13e4. Autenticación Vercel conservada.
Las pruebas del recorrido descritas pasaron también en la preview a 360/768/1440 px: axe sin infracciones detectadas, sin overflow, errores JS, fotos rotas ni textos menores a 12 px. Capturas completas y consulta en outputs del chat; revisión visual del mensaje y copia realizada. No se envió ningún mensaje a Instagram.
