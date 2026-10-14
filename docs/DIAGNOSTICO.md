# Diagnóstico Fase 0 (2026-10-14)

## Recursos
| Recurso | Estado |
|---|---|
| ZIP demo | Presente. Importado en `legacy/demo-zip/` (index, styles, app.js, 12 webp + logo). |
| ESPECIFICACION-IMPERIO.md | Presente dentro del ZIP → `docs/`. |
| Logo | `public/brand/logo-imperio.png` (PNG 35 KB; pedir SVG/original). |
| Fachada | `public/brand/fachada-imperio.webp` (Google Maps, baja resolución). |
| Captura Instagram | Adjunta en chat; ya recortada en `public/gallery/*.webp`. |

## Demo del ZIP (funciones)
Landing responsive, menú móvil, galería filtrable, recomendador por reglas (no IA), formulario que genera mensaje para Instagram (valida fecha/domingo), sin backend ni datos guardados.

## Hallazgo importante: Vercel ≠ ZIP
`barberia-imperio-demo.vercel.app` sirve una versión **distinta y más extensa** que el ZIP: servicios con valores ilustrativos, barberos ilustrativos, Club Imperio, panel de fidelidad local, laboratorio de estilo, reserva demo; se declara demo no oficial. Su código fuente NO está en el ZIP. No sobrescribir hasta obtener ese código o decidir reemplazarla en Fase 1. No pude confirmar `noindex` (revisar cabecera/head).

## Ryiori (referencia)
Sitio estático sin package.json: `assets/`, `carta/`, `data/*.json` (negocio, config), `docs/` (DISENO, LANZAMIENTO, QA por fase), `comun.css/js`, `.vercelignore`, `.claude/launch.json`. Patrón a reutilizar: datos del negocio en JSON, docs por fase con QA, aviso de demo. No se modificó.

## Entorno / permisos
Sin `gh` ni `vercel` CLI, sin autenticación → no se creó repo remoto ni se tocó Vercel (ID prj_3Ld8gNluFn6vY7XEd2AKPOvzl2hQ). Git local inicializado.

## Riesgos
- Derechos de fotos de clientes (Instagram) y fachada (Google Maps) sin verificar.
- Imágenes de ~12–23 KB: resolución baja; pedir originales.
- Comuna: el brief indica Llolleo; la demo decía «por confirmar». Verificar pin de Maps.
- Horario (lun–sáb 10:00–19:30) de Instagram; confirmar.
- Datos ilustrativos en Vercel pueden confundirse con reales.

## Datos pendientes
Precios, servicios oficiales, duración, nombres/fotos de barberos, teléfono/WhatsApp, dominio, política de cancelación, logo vectorial.

## Plan Fase 1 (propuesto)
Next.js App Router + TS + Tailwind en este repo, rama `fase-1-mvp`; tokens de la paleta, fuentes display+sans, páginas /, /servicios, /barberos, galería filtrable, consulta (demo) vía Instagram, JSON-LD LocalBusiness, `noindex`, pruebas Playwright, deploy al proyecto Vercel existente.
