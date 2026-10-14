# Rediseño urbano — Fase 1

14 de octubre de 2026. Autorización del usuario: «continua con la otra fase». Rama: `rediseno-urbano`.

## Cambios

- Botón Copiar con fondo transparente, texto marfil y borde bronce; pasos «1 · Copiar mensaje» y «2 · Abrir Instagram».
- Confirmación independiente con `role=status`, `aria-live=polite` y texto «Mensaje copiado». Si falla el portapapeles, selecciona el mensaje y explica cómo copiarlo manualmente. Una nueva consulta limpia la confirmación anterior.
- Piso de 12 px en textos, incluidos los de móvil; ajustes de tamaño/espaciado del sello para contener sus etiquetas.
- Bronce oscuro `#7a5a35` sobre marfil y mayor contraste en etiquetas grises y firma del pie; leyendas de fotografías con sombra y numeración en marfil.
- Llolleo, San Antonio en cabecera, eyebrow del hero y dirección. Enlace Cómo llegar: búsqueda en Google Maps por dirección y localidad; no implica un pin validado.
- Retirado Estilo IA del menú principal. Módulo y enlace del pie llamados Asesor de estilo, conservando la aclaración de que funciona por reglas.

## Verificación local

ESLint 9 y axe-core 4 instalados en la carpeta de trabajo del chat, fuera del repositorio. Lint del JavaScript: sin errores (no-undef, no-unused-vars, no-unreachable, no-dupe-keys, valid-typeof). El checkout estático no tiene comando de compilación; Vercel empaqueta los archivos sin build de framework.

Playwright/Chromium a 360, 768 y 1440 px: portapapeles real y rechazo simulado probados; selección manual y reinicio del aviso comprobados; recomendador operativo. Sin texto visible menor a 12 px, overflow horizontal, imágenes rotas ni errores JavaScript. Axe WCAG 2 A/AA y 2.1 AA sin violaciones en los tres tamaños, incluido el formulario con mensaje generado. Esto no sustituye la revisión manual final de la Fase 6.

## Pendiente

La Fase 2 incorporará sistema visual y fuentes autoalojadas. Estructura urbana, fotografía, recorrido y QA final siguen en sus fases respectivas. La ampliación de imágenes, los iconos incrustados y la barra móvil fija pertenecen a esas fases; no se dan por resueltos aquí.

No se modificaron imágenes originales, variables, dominios ni configuración del proyecto Vercel. No se creó PR ni se publicó a producción. Detenerse tras entregar la preview y esperar autorización para Fase 2.

## Preview verificada
https://barberia-imperio-demo-5d3huirm0-gotech2.vercel.app/ — READY, deployment dpl_F6e9t9NbXazsdQkomU7hyfSbGzhi, código 4ebe0eb. Conserva autenticación Vercel. Las mismas pruebas locales pasaron en el despliegue real a 360/768/1440 px; capturas en outputs del chat. No se envió ninguna consulta a Instagram.
