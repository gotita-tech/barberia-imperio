# Rediseño urbano — Fase 6

14 de octubre de 2026. Rama rediseno-urbano. Usuario autorizó ejecutar QA y preparar entrega completa. La fusión y producción siguen el paso de aprobación explícita del PR acordado en el encargo.

## Correcciones finales

- Título y descripción acordes a la portada urbana, localidad y consulta por Instagram. Meta robots y cabecera noindex conservados.
- Open Graph: título, descripción, sitio, idioma es_CL, URL pública y logo original (255×258) como og:image. Favicon conserva el archivo original. No se inventa una imagen de cámara de mayor resolución.
- Errores propios bajo categoría, fecha y horario, vinculados mediante aria-describedby/aria-invalid. Envío inválido lleva foco al primer campo. Fecha mínima calculada en America/Santiago.
- Se permite consultar por un domingo: no se bloquea por una política de atención todavía no confirmada. No implica disponibilidad ni reserva.
- Nombres accesibles de enlaces coherentes con sus textos visibles. Área de cabecera e Instagram en banda de al menos 44 px. Movimiento reducido también al mostrar el mensaje.

## QA local

Playwright/Chromium: 360, 390, 768, 1024 y 1440 px. Menu, Esc, filtros, servicios, sugerencias, conservación/límite de comentario, mensaje/copia/fallback, fuentes, srcset, carga diferida y CTA móvil. Teclado: skip link, Tab hasta servicios, activación con Enter, menú Enter/Esc y foco al primer campo inválido. Formularios vacíos, fecha pasada y consulta dominical probados. Sin overflow, errores JavaScript, fotos rotas ni textos visibles menores a 12 px. Axe WCAG 2 A/AA y 2.1 AA sin infracciones detectadas.

ESLint y sintaxis del JavaScript aprobados. Stack estático: sin compilación de framework; el empaquetado Vercel se verifica como READY. Lighthouse móvil local inicial: rendimiento 91, accesibilidad 100, buenas prácticas 100. SEO se penaliza por noindex intencional. La medición final del deployment se registrará aquí.

## Límites

- Las capturas aportadas siguen siendo de baja resolución; no hay ampliación ni iconos, pero falta el detalle de fotografías originales (mínimo 1600 px de ancho) y confirmar permisos.
- Servicios, precios, duración, equipo y reglas oficiales pendientes. Reservas reales, Supabase y notificaciones no se activan en este rediseño estático; su preparación está separada en fase-2-reservas.
- Lighthouse es una medición de laboratorio y puede variar. Noindex sigue intencional mientras sea demo; no se persigue puntuación SEO eliminándolo.
- Producción sin cambios hasta aprobación del PR. No variables, dominios ni ajustes del proyecto modificados.

## Preview y métricas
Preview del código 3d16942: https://barberia-imperio-demo-6y1gyby3k-gotech2.vercel.app/ — READY. QA del deployment a cinco anchos aprobado; axe cero infracciones detectadas. Lighthouse móvil: rendimiento 95, accesibilidad 100, buenas prácticas 100, LCP 2,3 s y CLS 0. Sin discrepancias entre etiquetas visibles y nombres accesibles.
robots.txt explícito con Disallow / agregado en la revisión final. Noindex es intencional. Las capturas antes/después se adjuntan en docs/revision; el informe Lighthouse del chat elimina la cabecera de autorización antes de guardarse.

## Entrega final
Preview: https://barberia-imperio-demo-1zcv3fptj-gotech2.vercel.app/ — READY, deployment dpl_GC7HVv3296DJM5LYdY6yceA1kQS2, código 36c2687. HTTP 200, noindex y robots.txt válidos verificados con autorización. Nueve archivos (HTML, tres CSS, JS, robots, logo y dos fuentes) idénticos byte a byte al checkout; las capturas y métricas corresponden al mismo contenido HTML/CSS/JS ya probado.
Lighthouse se ejecutó sobre la preview anterior 6y1gyby3k con contenido visual y funcional idéntico: rendimiento 95, accesibilidad 100, buenas prácticas 100. SEO 58: noindex deliberado y lectura de robots por Lighthouse recibió HTML de autenticación Vercel; el robots.txt real se comprobó directamente y es válido. No se modifica la protección para mejorar la puntuación.
Favicon y og:image públicos devuelven el logo original con hash idéntico. Informes Lighthouse y capturas en outputs del chat; antes/después comprimidos en docs/revision. PR a main pendiente de aprobación del usuario. Ningún mensaje de consulta enviado ni reserva activada.
