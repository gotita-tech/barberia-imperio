# Changelog
## 2026-10-14 — Fase 0
- Inicialización del repositorio local, importación de la demo ZIP, activos de marca, documentación base.

## 2026-10-14 — Rediseño urbano / Fase 0
- Rama rediseno-urbano creada desde main y publicada; reconocimiento del stack estático, inventario de imágenes y propuesta de secciones/tipografía.
- Preview de referencia READY en el proyecto Vercel existente; capturas a 360, 768 y 1440 px sin errores JavaScript ni desbordamiento.
- Sin cambios de código, fotografías o configuración del proyecto; Fase 1 pendiente de autorización. Ver docs/REDISENO-URBANO-FASE-0.md.

## 2026-10-14 — Rediseño urbano / Fase 1
- Copia de consulta accesible y pasos ordenados, piso de 12 px y contraste corregido.
- Ubicación Llolleo/San Antonio, enlace Maps y Asesor de estilo sin Estilo IA en el menú.
- Lint y pruebas locales a 360/768/1440 con axe sin violaciones; preview READY verificada con las mismas pruebas.

## 2026-10-14 — Rediseño urbano / Fase 2
- Sistema visual carbón/marfil/bronce, fuentes locales Archivo/Archivo Black y escala fluida.
- Estados de controles, pestañas subrayadas, foco contrastado y enlaces deshabilitados protegidos.
- Licencias y origen de fuentes documentados; estructura urbana pendiente de Fase 3.

## 2026-10-14 — Rediseño urbano / Fase 3
- Cabecera, hero polaroid, banda de ubicación, galería escalonada, cierre Instagram y pie urbano.
- Servicios integrado; Asesor y formulario plegables; Equipo preservado y oculto.
- Menú móvil accesible y retiro de recursos genéricos; fotografías originales conservadas.
- Lint y pruebas locales 360/768/1440 aprobadas con axe sin infracciones.

## 2026-10-14 — Rediseño urbano / Fase 4
- Recortes reales sin iconos, variantes 120/160/240 y srcset/sizes con dimensiones reservadas.
- Tarjetas limitadas a 240 px; 12 originales archivados sin alterar, logo intacto.
- Script y manifest reproducibles; requisitos de fotografía original documentados.

## 2026-10-14 — Rediseño urbano / Fase 5
- Filas completas con categoría preseleccionada; sugerencia al comentario sin borrar texto ni duplicarla.
- CTA móvil condicional y galería a Instagram; mensaje preparado se invalida al editar preferencias.
- Pruebas locales 360/768/1440, lint y axe aprobados.

## 2026-10-14 — Rediseño urbano / Fase 6
- Metadatos y Open Graph con logo original, errores accesibles por campo y fecha del negocio en Chile.
- Consulta dominical permitida hasta confirmar política; nombres accesibles coherentes y controles de 44 px.
- QA local a 360/390/768/1024/1440, teclado, lint y axe aprobados. Preparación de PR y validación final Vercel.

## 2026-10-14 — Auditoría Claude
- Rama auditoria-claude desde rediseno-urbano; estética del home sin cambios (capturas comparadas a cinco anchos).
- Logo WebP 96 px, caché de fuentes/imágenes en Vercel, canonical, JSON-LD HairSalon con datos verificados, OG 1200×630 y página 404.
- Accesibilidad: borde de controles a 3:1, flechas decorativas ocultas al lector, aviso de nueva pestaña, scroll-padding corregido; axe 0 infracciones.
- Tokens de color sin valores escritos a mano; originales archivados fuera del deploy. Ver docs/AUDITORIA-CLAUDE.md.

## 2026-10-14 — Experiencia de cliente
- Asesor de estilo (/asesor): 11 preguntas, motor de 12 cortes y ficha con tres recomendaciones, cómo pedirlas, mantención y barba; imprimir, copiar para Instagram y guardar.
- Endpoint /api/asesor con Claude, apagado hasta configurar ANTHROPIC_API_KEY y ASESOR_IA_ENABLED en Vercel.
- Mi ficha (/mi-ficha): perfil, registro de cortes con nota, informe con visitas, intervalo, próxima visita y recomendaciones según historial; guardado solo en el dispositivo.
- Equipo (/equipo): perfiles desde data/equipo.json; perfil de muestra sin datos inventados.
- axe 0 infracciones y CLS 0 en las páginas nuevas. Ver docs/EXPERIENCIA-CLIENTE.md.
