# Rediseño urbano — Fase 0

Fecha: 14 de octubre de 2026. Estado: reconocimiento completado; decisiones pendientes del usuario.

## Base y rama

- Rama `rediseno-urbano`, creada desde `main` en `88e3ccf`, que coincide con `origin/main`.
- Se mantienen separadas `fase-1-mvp` y `fase-2-reservas`; no se incorporó su backend al rediseño de la demo publicada.
- Sin cambios a HTML, CSS, JavaScript, fotografías o configuración de Vercel. Esta entrega modifica solo documentación.

## Stack y despliegue

La versión publicada usa `index.html`, `styles.css`, `app.js` y `assets/`. No tiene `package.json`, comando de build, compilación ni lint configurado. `vercel.json` sirve la raíz como sitio estático y declara `X-Robots-Tag: noindex, nofollow`. `.vercelignore` excluye documentación, dependencias y la copia `public/`.

Proyecto existente: `Gotech / barberia-imperio-demo`, ID `prj_3Ld8gNluFn6vY7XEd2AKPOvzl2hQ`. La rama se publicó mediante Git. No apareció un deployment automático de la rama durante el reconocimiento; el preview se preparó por CLI en ese mismo proyecto. No se cambiaron variables del proyecto, dominio, framework ni protección de despliegue.

Preview de referencia: https://barberia-imperio-demo-bvbuttj5x-gotech2.vercel.app/ — deployment `dpl_EZqzGCQZhfTT7dp6rzBPw9LqiLfd`, READY. Requiere autenticación Vercel; no se deshabilitó la protección.

`node --check app.js` aprobó la sintaxis. Eso no equivale a un lint completo. Lighthouse, axe y ESLint no están instalados en este checkout; prepararé esas herramientas para las fases de corrección/QA tras la autorización. No se atribuye ninguna puntuación de accesibilidad a esta fase.

## Inventario de imágenes

Las dimensiones se obtuvieron de los bytes de cada archivo con Sharp. `public/brand` y `public/gallery` contienen duplicados con las mismas dimensiones; el sitio estático usa `assets/`.

| Archivo en assets/ | Dimensiones naturales |
|---|---:|
| logo-imperio.png | 255 × 258 |
| fade-lineas.webp | 261 × 353 |
| fade-perfil.webp | 260 × 347 |
| corte-frontal.webp | 263 × 347 |
| diseno-geometrico.webp | 261 × 349 |
| diseno-ondas.webp | 263 × 349 |
| corte-texturizado.webp | 261 × 349 |
| corte-barba.webp | 261 × 346 |
| corte-espalda.webp | 260 × 349 |
| corte-espejo.webp | 261 × 346 |
| barbero-tijeras.webp | 261 × 349 |
| barbero-trabajando.webp | 261 × 349 |
| fachada-imperio.webp | 310 × 336 |

No se borró, recortó ni movió ninguna imagen. La Fase 4 preparará derivados de los originales, manteniendo estos intactos.

## Evidencia del preview

Playwright/Chromium recorrió todo el preview y cargó las imágenes diferidas a 360, 768 y 1440 px. En los tres tamaños: HTTP 200, sin errores JavaScript, respuestas HTTP fallidas, imágenes rotas ni desbordamiento horizontal.

La ampliación sí se reprodujo: a 1440 px, `fade-lineas` se muestra a 435 px en hero y 574 px en galería pese a medir 261 px; `barbero-tijeras` se muestra a 720 px pese a medir 261 px. Es el principal límite para la futura fotografía urbana.

Los anteriores avisos de tres imágenes que no cargaban no se reprodujeron en este preview después de recorrer la página y cargar los recursos diferidos. Se conservará esa distinción entre hallazgos históricos y comprobación actual.

Las capturas de referencia se entregan fuera del repositorio en `outputs/REDISENO-FASE-0-360.png`, `outputs/REDISENO-FASE-0-768.png` y `outputs/REDISENO-FASE-0-1440.png` del chat.

## Tipografía propuesta

La propuesta urbana anterior se construyó con Arial/Helvetica, peso 900. Para el sitio final propongo **Archivo Black** para titulares y **Archivo** para interfaz/texto, autoalojadas en `assets/fonts/` con `@font-face`, `font-display: swap` y fallback `Arial, Helvetica, sans-serif`. Mantener Georgia únicamente en la firma del pie. No se instalaron ni aplicaron fuentes en Fase 0.

Fuentes oficiales consultadas:
- https://fonts.google.com/specimen/Archivo+Black
- https://fonts.google.com/specimen/Archivo
- https://github.com/google/fonts/tree/main/ofl/archivoblack
- https://github.com/google/fonts/tree/main/ofl/archivo

## Decisiones propuestas para aprobación

| Sección | Propuesta | Razón |
|---|---|---|
| Servicios | Conservar e integrar al estilo urbano, como categorías referenciales después del portafolio. Cada fila permite consultar y preseleccionar la categoría. Precio y duración siguen por confirmar. | Mantiene una vía útil de consulta sin fabricar un catálogo oficial. |
| Equipo | Ocultar de la portada mientras falten datos. Conservar contenido e imágenes en el proyecto, sin borrarlos. | El bloque Próximamente no aporta información útil para elegir un profesional. |
| Style Lab | Conservar como módulo secundario plegable, llamado Asesor de estilo, con aclaración de recomendaciones por reglas. Vincular Consultar este estilo al formulario con el comentario. | Mantiene la función demostrativa y evita atribuir IA real. |
| Formulario | Conservar e integrar al cierre como Preparar una consulta; Instagram directo será la acción principal y el formulario una alternativa desplegable. | Preserva preferencias y referencias; exige corregir Copiar mensaje y ordenar 1 Copiar / 2 Abrir Instagram. |

`Conoce Imperio` apuntará al Instagram oficial proporcionado, al no contar con otra página confirmada. `Cómo llegar` usará una búsqueda por la dirección y localidad en Google Maps; no se afirmará que un pin geográfico esté validado.

## Siguiente fase, pendiente de autorización

Fase 1: botón Copiar mensaje y anuncio accesible de copia; piso tipográfico de 12 px y contraste; Llolleo/San Antonio en los textos; retirar Estilo IA de navegación y renombrar el módulo. Preview, verificaciones y nuevo resumen. No avanzar hasta ok/sigue o autorización equivalente del usuario.

Producción solo mediante PR en Fase 6 y aprobación explícita del usuario. No se creó ni fusionó ningún PR en Fase 0.
