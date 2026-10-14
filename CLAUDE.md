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
Carbón `#0B0B0D` · Grafito `#151518` · Marfil `#F1EDE6` · Bronce `#C7A878` · Gris `#999590`.

## Estructura
- `legacy/demo-zip/` demo estática original (referencia; no editar).
- `public/brand/` logo y fachada · `public/gallery/` recortes de Instagram (baja resolución, derechos por verificar).
- `docs/` especificación, roadmap, decisiones, riesgos.

## Estado actual
Fase 0 cerrada (ver ROADMAP). Siguiente: Fase 1 (Next.js + sitio MVP).

## Entorno
Node 26, npm 11, git 2.55. **No hay `gh` ni `vercel` CLI instalados**, ni autenticación GitHub/Vercel → repo remoto y vínculo Vercel pendientes.
