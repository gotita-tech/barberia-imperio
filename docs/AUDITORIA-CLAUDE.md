# Auditoría Claude — 14 de octubre de 2026

Rama `auditoria-claude`, creada desde `rediseno-urbano` @ `47c0926`. PR hacia `rediseno-urbano`, no hacia `main`: producción no cambia hasta que el usuario apruebe el PR #1.

**Regla de este encargo:** no cambiar la estética del home. Composición, tipografía, escala, paleta, textos aprobados y logo quedan iguales. La comparación de capturas antes/después a 360, 390, 768, 1024 y 1440 px dio la misma altura de página en los cinco anchos; solo cambian unos ~300 px por captura, que corresponden al logo reescalado del header y footer, y al borde del botón de menú en móvil.

## Skills usadas y qué encontraron

| Área | Skill | Resultado |
|---|---|---|
| Código | code-review | PR #1 sin problemas bloqueantes (comentario publicado en el PR). Dos hallazgos menores corregidos aquí. |
| Rendimiento | perf-profiler | Lighthouse móvil, mediana de 3 corridas, servidor local sin compresión. |
| SEO | seo-code-audit | Faltaban canonical, datos estructurados, página 404 e imagen para compartir. |
| Accesibilidad | a11y-enforcer + contrast | Borde de campos bajo 3:1; flechas decorativas leídas en voz alta; enlaces externos sin aviso de nueva pestaña. |
| Diseño | design-system, frontend-design | Colores escritos a mano convertidos en tokens; 404 y OG en el lenguaje urbano aprobado. |
| Textos | ux-copy | Solo sugerencias (ver abajo); no se cambió texto visible aprobado. |

## Cambios aplicados

**Calidad de código (app.js)**
- Al elegir un servicio desde la lista o el asesor, el campo se rellena por código y no disparaba `input`: si antes había un error de validación, quedaba visible aunque el campo ya tuviera valor. Ahora se limpia.
- El botón "Consultar este estilo" marca la flecha como decorativa.

**Rendimiento**
- Logo del header y footer: de un PNG de 35 KB (255×258) a WebP de 2 KB a 96 px (2× para pantallas retina), con PNG de 5 KB como respaldo. El original sigue intacto para OG y `apple-touch-icon`.
- `vercel.json`: caché larga para fuentes (1 año, inmutable) y una semana para imágenes. Antes Vercel servía todo con `max-age=0`.
- Se probó quitar el preload de la fuente variable: el LCP mejora apenas y el primer pintado empeora (de 1,4 s a 2,0 s), así que se mantuvo.

| Lighthouse móvil (mediana de 3) | Antes | Después |
|---|---:|---:|
| Rendimiento | 96 | 97 |
| LCP | 2,80 s | 2,57 s |
| CLS | 0 | 0 |
| Peso total | 302 KB | 277 KB |
| Accesibilidad | 100 | 100 |

Medido en local sin compresión HTTP; en Vercel (con Brotli y la nueva caché) los números deberían ser mejores, pero no los afirmo hasta medirlos sobre la preview.

**SEO** (sin retirar `noindex`: la demo sigue fuera de Google a propósito)
- `<link rel="canonical">` al dominio de la demo.
- JSON-LD `HairSalon` solo con datos verificados: nombre, lema, dirección, logo e Instagram. Sin horario, teléfono, precios ni reseñas, porque no están confirmados.
- Imagen para compartir de 1200×630 (`assets/og-imperio.jpg`) con el logo original intacto, enmarcado como el polaroid del home. Antes se compartía el logo de 255 px, que WhatsApp e Instagram recortan mal.
- `404.html` con la misma cabecera, tipografía y botones del home.
- `theme-color` corregido a `#0c0c0e` (era `#0c0c0d`).

**Accesibilidad**
- Borde de los campos del formulario y del botón de menú: `#625a50` daba 2,88:1 sobre carbón, bajo el 3:1 exigido para controles (WCAG 1.4.11). Nuevo token `--control-border: #71685c` (3,57:1 sobre carbón, 3,17:1 sobre grafito). `--line` sigue igual para los divisores.
- Las filas de servicios tenían un `aria-label` que repetía todo el texto e incluía "↗", que el lector de pantalla leía como "flecha". Ahora el nombre sale del texto visible.
- Flechas y "✦" decorativos marcados con `aria-hidden`.
- Enlaces a Instagram y Maps anuncian que abren otra pestaña (texto solo para lector de pantalla).
- `scroll-padding-top` heredado de 94 px (de cuando la cabecera era sticky) bajado a 16 px; en móvil se reserva espacio inferior para que la barra fija no tape el elemento con foco (WCAG 2.4.11).
- axe-core (WCAG 2.0/2.1/2.2 A y AA): 0 infracciones en 360, 390, 768, 1024 y 1440 px, y en la 404. Sin desbordamiento horizontal ni errores JavaScript.

**Sistema de diseño**
- Colores escritos a mano en `urban.css` y `design-system.css` pasan a tokens en `:root` con el mismo valor: `--announce-bg`, `--on-bronze-label`, `--on-bronze-hover`, `--error-text`, `--error-border`, `--disabled-text`.
- Clase `.sr-only` compartida.

**Despliegue**
- `.vercelignore` excluye `assets/_archivo` (12 fotografías originales con permisos de publicación pendientes, que se servían públicamente aunque la página no las usara) y `scripts/`. Los archivos siguen en Git; solo dejan de publicarse. El `template` oculto de Equipo apunta a una imagen de esa carpeta: si se reactiva, hay que mover esa foto a `assets/images`.

## Sugerencias de texto, no aplicadas (requieren tu ok)

- Pie: aplicado el 14-10-2026, ahora muestra "José Miguel Carrera 315, Llolleo".
- Aplicado el 14-10-2026: todas las llamadas dicen "Consultar una hora".
- Aplicado el 14-10-2026: el asesor dice "VISTA PREVIA 01 / 01".

## Pendiente para el lanzamiento oficial (sin cambios ahora)

- Retirar a la vez `noindex` (meta y cabecera) y `Disallow: /` de `robots.txt`. Con `Disallow`, Google no lee el `noindex`: hay que quitar ambos juntos.
- Añadir `sitemap.xml` y cambiar canonical/OG/JSON-LD al dominio definitivo.
- Completar el JSON-LD con horario, teléfono y coordenadas cuando estén confirmados.
- Fotografías originales en alta resolución y permisos (sigue siendo la mejora visual de mayor impacto).
