# Rediseño urbano — Fase 4

14 de octubre de 2026. Autorización del usuario: «sigue con la siguiente fase entonces». Rama rediseno-urbano.

- Recortes reales con Sharp, sin overlays ni generación de píxeles. Excluyen los iconos superiores de fade-perfil, fade-lineas y corte-frontal; diseno-ondas se adapta al mismo formato vertical 3:4.
- Cuatro fotos distintas en portada/galería. Derivados 120, 160 y 240 px, sin ampliación, con script reproducible scripts/prepare-images.cjs y manifest de recortes, SHA256 y dimensiones.
- Srcset/sizes en las cuatro imágenes. Hero prioritario sin lazy; galería lazy. Width/height 240×320 y aspect-ratio consistente para reservar espacio.
- Polaroid y tarjetas de escritorio limitados a 240 px de ancho, sin superar el recorte disponible. Se mantienen 220 px para polaroid móvil y 230 px en tamaños intermedios.
- Las 12 fotos originales archivadas en assets/_archivo/originales; ningún byte modificado. Logo original intacto en su ubicación. Referencia del Equipo oculto actualizada.
- README documenta límites actuales, tamaños requeridos para reemplazos y permisos pendientes.

No es posible recuperar detalle inexistente: las fotografías aportadas siguen siendo capturas de baja resolución. Se evita ampliarlas y se retiran los iconos, sin afirmar calidad equivalente a originales de cámara, especialmente en pantallas de alta densidad.

## Verificación

Revisión visual de los cuatro recortes sin iconos y conservando el corte. SHA256 de las 12 fotografías archivadas igual al de sus originales. Sharp verifica las dimensiones de cada variante. Playwright a 360/768/1440 verifica selección srcset, ancho mostrado menor o igual al archivo seleccionado, prioridad/lazy, dimensiones explícitas y ausencia de duplicados. Se reutilizan verificaciones del menú, filtros, consulta, copia y fuentes, lint y axe.

No se modifican variables, dominios ni ajustes Vercel. Sin producción ni PR. Fase 5 requiere nuevo ok/sigue para implementar el recorrido de consulta.

## Preview verificada
https://barberia-imperio-demo-ls4qkouyb-gotech2.vercel.app/ — READY, deployment dpl_Cm9bzzRVDEVwbrC79wjjJ3uTczVa, código 1c9d987. Conserva autenticación Vercel.
Lint de app.js y script de fotografía sin errores. Pruebas del despliegue a 360/768/1440 aprobadas; axe sin infracciones detectadas, sin overflow, imágenes rotas, errores JS ni textos bajo 12 px. En móvil se seleccionan 160 px para galería de 152 px; en escritorio, 240 px para tarjetas de 240 px. Capturas en outputs del chat. Revisión visual de recortes y portada realizada.

## Estado GitHub
Push completado a rediseno-urbano. El primer intento no seleccionaba la credencial existente; se resolvió especificando la cuenta gotita-tech. No fue necesaria una autorización nueva. Selección de cuenta registrada en la configuración Git local del repositorio para futuros envíos.
