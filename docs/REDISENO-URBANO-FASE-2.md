# Rediseño urbano — Fase 2

14 de octubre de 2026. Autorización del usuario: «sigue». Rama `rediseno-urbano`.

- Sistema visual en `design-system.css`, cargado después del CSS existente. Tokens carbón #0c0c0e, grafitos #1a1a1d/#2a2a2c, marfil #f2eee7, bronce #c4a676 y bronce oscuro #7a5a35 sobre marfil.
- Archivo Black en titulares y Archivo variable en cuerpo/interfaz, WOFF2 autoalojadas con preload, swap y fallback. Licencias OFL adjuntas y origen documentado en assets/fonts/README.md. Serif solo en firma del pie.
- Escala: etiquetas 12 px, texto secundario 14 px, cuerpo 16 px, títulos 24–32 px, secciones 30–56 px, hero 32–80 px. Escala fluida adaptada a los textos actuales.
- Botón bronce, contorno, enlace subrayado y pestañas con hover, focus-visible, active y disabled. Etiquetas eyebrow de 12 px con tracking 0,1 em. Pestañas subrayadas y aria-pressed existente.
- Controles base de al menos 44 px; foco marfil sobre carbón y bronce oscuro sobre marfil. Enlaces aria-disabled bloqueados por JavaScript sin perder su foco.
- Conservado logo original, estructura, avisos demo, funciones de consulta y selector. El cambio de estructura corresponde a Fase 3.

## Verificaciones

ESLint del JavaScript y comprobación de sintaxis. Sitio estático sin comando de build de framework; Vercel empaqueta HTML/CSS/JS.

Playwright a 360/768/1440 px: ambas familias realmente cargadas desde el sitio, sin solicitudes al proveedor de fuentes; hover, foco por teclado, active y bloqueo de enlace deshabilitado; copia real y rechazo del portapapeles; recomendador. Axe WCAG 2 A/AA y 2.1 AA, piso tipográfico, overflow, imágenes y errores JS. Resultado de preview se registra después del despliegue.

No se alteraron fotos, variables, dominios ni configuración del proyecto Vercel. No producción ni PR. Fase 3 requiere nuevo ok/sigue. Fotografía y comportamiento de barra fija móvil siguen pendientes de sus respectivas fases.

## Preview verificada
https://barberia-imperio-demo-fykqovfbb-gotech2.vercel.app/ — READY, deployment dpl_94qhxe5ho3LhDsdJgLs2AYiGo3B4, código 664975e. Conserva autenticación Vercel.
Lint y todas las pruebas descritas pasaron en local y en la preview a 360/768/1440 px. Axe: cero infracciones detectadas en esos escenarios. Sin texto visible menor a 12 px, errores JavaScript, imágenes rotas ni overflow horizontal. Capturas completas y de portada guardadas en outputs del chat; revisión visual de escritorio y móvil realizada. No se atribuyen puntuaciones Lighthouse a esta fase.
