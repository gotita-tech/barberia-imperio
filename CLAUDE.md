# CLAUDE.md — Barbería Imperio

Plataforma premium para Barbería Imperio (José Miguel Carrera 315, Llolleo, San Antonio, Chile) y futuro producto SaaS para barberías. Español de Chile. Concepto: **IMPERIO — Tu estilo. Nuestro Imperio.** (Fusión Premium).

## Reglas
- Trabajo por fases (ver `docs/ROADMAP.md`), una a la vez, en rama dedicada. No marcar nada como terminado sin comprobarlo.
- NO modificar Ryiori (`gotita-tech/ryiori`) ni otros proyectos. Solo referencia.
- No inventar precios, barberos, reseñas, promociones, teléfonos. Contenido provisional = rotulado «Demostración».
- Respetar el logo original (blanco/negro, no recolorear). Bronce solo como acento de UI.
- Mantener `noindex` mientras sea demo. Sin secretos en Git. Zona horaria `America/Santiago`.
- Pedir autorización antes de: crear repo remoto, publicar fotos de clientes, activar costos (IA, pagos), operaciones destructivas.
- Resúmenes breves; progreso se guarda aquí y en `docs/ROADMAP.md`.

## Paleta
Carbón `#0C0C0E` · Grafitos `#1A1A1D` / `#2A2A2C` · Marfil `#F2EEE7` · Bronce `#C4A676` · Bronce oscuro sobre marfil `#7A5A35`.

## Estructura
- `legacy/demo-zip/` demo estática original (referencia; no editar).
- `public/brand/` logo y fachada · `public/gallery/` recortes de Instagram (baja resolución, derechos por verificar).
- `docs/` especificación, roadmap, decisiones, riesgos.

## Estado actual
Demo estática publicada en main. Rediseño urbano fases 1–5 completadas; Fase 6 QA/PR en curso. Desarrollo Next.js/Supabase separado en fase-1-mvp y fase-2-reservas, sin integrar a producción.

## Entorno
Node 26, npm 11, git 2.55. GitHub y Vercel operativos mediante Git Credential Manager, plugin y CLI; ver docs/CONEXION-VERCEL.md. gh instalado, sin usar su token inválido.

## Encargo activo: rediseño urbano (2026-10-14)

Rama rediseno-urbano desde main estática 88e3ccf. Fase 0 completada sin cambios de código; ver docs/REDISENO-URBANO-FASE-0.md. Usuario exige detenerse tras cada fase y esperar ok/sigue. No editar variables, dominios o ajustes del proyecto Vercel sin preguntar. No eliminar secciones sin aprobación ni borrar imágenes originales. Producción solo en Fase 6 mediante PR que apruebe el usuario. CLI Vercel instalada y autenticada; Git Credential Manager permitió publicar la rama. gh está instalado pero su token local es inválido; usar Git/connector para acciones autorizadas.

Rediseño urbano: Fase 1 implementada y verificada localmente; ver docs/REDISENO-URBANO-FASE-1.md. Fase 2 requiere nuevo ok/sigue.

Rediseño urbano: Fase 2 incorpora tokens, Archivo/Archivo Black autoalojadas y estados accesibles. Ver docs/REDISENO-URBANO-FASE-2.md. Esperar autorización antes de Fase 3.

Rediseño urbano: Fase 3 estructura urbana aplicada. Servicios integrado, Equipo conservado en template oculto, Asesor y formulario plegables. Ver docs/REDISENO-URBANO-FASE-3.md. Esperar autorización de Fase 4.

Rediseño urbano: Fase 4 recortes sin iconos, srcset y máximo 240 px. Originales intactos en assets/_archivo/originales. Ver docs/REDISENO-URBANO-FASE-4.md. Esperar autorización antes de Fase 5.

Rediseño urbano: Fase 5 conecta categorías/sugerencias al formulario, tarjetas a Instagram y CTA móvil condicional. Ver docs/REDISENO-URBANO-FASE-5.md. Esperar autorización antes de Fase 6 y aprobación explícita del PR para producción.

Vercel: usar plugin mcp__codex_apps__vercel y CLI con scope gotech2 y global-config de work/vercel-auth. MCP manual duplicado desactivado en config.toml por 403 de equipo tras OAuth exitoso. No repetir ese login por fase. Ver docs/CONEXION-VERCEL.md. Git usa credential.username=gotita-tech en configuración local.

Rediseño urbano: Fase 6 QA completado. Cinco anchos sin fallos, axe cero, Lighthouse móvil 95 rendimiento/100 accesibilidad. Preview final 1zcv3fptj y comparativas en docs/revision. Preparar PR a main y esperar aprobación explícita antes de fusionar/producción; ver docs/REDISENO-URBANO-FASE-6.md.

Auditoría Claude (2026-10-14): rama auditoria-claude con mejoras de rendimiento, SEO, accesibilidad y tokens sin cambiar la estética del home. PR hacia rediseno-urbano; ver docs/AUDITORIA-CLAUDE.md. Producción sigue requiriendo aprobación explícita del PR #1.

Producción (2026-10-14): PR #2 fusionado en rediseno-urbano y PR #1 en main con aprobación explícita del usuario. Deploy de producción dpl_6j962iFwrwsMZZpCRLwCCbL4QYHw (commit 1a77fc1) verificado en navegador: título, canonical, OG, JSON-LD, noindex, logo WebP, 404 propia, caché de fuentes y _archivo fuera del deploy. Rollback disponible en Vercel.

Experiencia de cliente (2026-10-14): /asesor, /mi-ficha y /equipo publicados a pedido explícito del usuario. IA en /api/asesor apagada hasta que el usuario configure ANTHROPIC_API_KEY y ASESOR_IA_ENABLED=true (costo). Mi ficha guarda en localStorage, sin cuentas. Equipo vacío hasta datos autorizados en data/equipo.json. Cuestionario prerenderizado: si cambian las preguntas, ejecutar node scripts/render-quiz.cjs. Ver docs/EXPERIENCIA-CLIENTE.md.

Demo para el dueño (2026-10-14): /panel (datos ficticios, no enlazado en el menú), /mi-ficha?ejemplo y botones WhatsApp/Maps. WhatsApp se activa poniendo el número real en data/negocio.json (formato 569XXXXXXXX); no inventar número.
