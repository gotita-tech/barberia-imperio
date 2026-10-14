# Rediseño urbano — Fase 3

14 de octubre de 2026. Autorización del usuario: «sigue». Rama `rediseno-urbano`.

## Cambios

- Estructura de las referencias urbanas: barra demo, cabecera con logo original, navegación Nuestros trabajos/Visítanos/Consultar una hora.
- Hero con Tu estilo. Nuestro Imperio., CTA, enlace al portafolio y polaroid con sombra bronce, pie marfil y texto vertical. Foto diferente a la galería, a 250 px en escritorio y 220 px en móvil, según la resolución disponible.
- Banda bronce con José Miguel Carrera 315, Llolleo/San Antonio, Google Maps por búsqueda y contacto Instagram. Conoce Imperio enlaza al Instagram confirmado, al no haber otra página oficial disponible.
- Galería Corte. Carácter. con tres tarjetas, numeración y desfase alternado, pestañas Todos/Degradados/Diseños y nota sobre originales/permisos. Todas las fotografías originales permanecen en assets.
- Servicios integrado tras portafolio, como categorías referenciales, sin precios/duraciones inventados. Asesor de estilo plegable con reglas sencillas declaradas.
- Cierre Hablemos de tu corte. con Instagram principal y formulario Preparar una consulta plegable. Copy/status de Fase 1 y fuentes/tokens de Fase 2 conservados.
- Equipo oculto en un template HTML inerte, preservando el bloque y sus recursos, según la propuesta de Fase 0. Pie con firma serif, logo original, aviso demo y Volver arriba. Retirados marquesina, Desliza y numeración de secciones sin secuencia.
- Menú móvil con icono cruz, aria-expanded y etiqueta sincronizada; cierre por Esc devuelve foco al botón, cierre al elegir enlace y reinicio al pasar a escritorio.

El CSS estructural está en urban.css. La barra fija móvil queda oculta hasta implementar sus condiciones de visibilidad en Fase 5; la consulta es accesible desde cabecera, hero y cierre.

## Validación local

ESLint del JavaScript y node --check aprobados. No hay compilación de framework: Vercel empaqueta archivos estáticos.

Playwright/Chromium a 360/768/1440: menú/Esc/foco/cierre, filtros (3/2/2 tarjetas), apertura de paneles, sugerencia, copia real y alternativa ante rechazo del portapapeles, fuentes y estados de controles. Axe WCAG 2 A/AA y 2.1 AA sin infracciones detectadas, sin texto visible menor a 12 px, sin errores JavaScript ni imágenes rotas y sin overflow horizontal. Se corrigió el contraste de las etiquetas de la banda bronce a #443219 antes de publicar.

Revisión visual de portada escritorio/móvil realizada. Las capturas finales muestran los paneles plegados; las pruebas también verifican el formulario y asesor desplegados.

## Pendiente

Fase 4: recorte de iconos de Instagram incrustados, derivados/srcset y documentación de originales requeridos. Los iconos existentes aún se ven: no se declaran corregidos. Fase 5: filas de servicios con preselección, transferencia de sugerencia al comentario, enlaces de tarjetas a Instagram y visibilidad condicional de CTA móvil. Fase 6: QA completo y PR a main para aprobación explícita.

No se cambiaron fotos originales, variables, dominios ni ajustes del proyecto Vercel. No se publica producción. Esperar autorización para Fase 4 tras entregar preview y capturas.

## Preview verificada
https://barberia-imperio-demo-pj648phnn-gotech2.vercel.app/ — READY, deployment dpl_3rDbSZwdrmukSsSPAeYqeXMhceRS, código 4bf1e93. Protegida por autenticación Vercel.
Pruebas del despliegue real a 360/768/1440 aprobadas con los mismos resultados locales: axe sin infracciones detectadas, cero overflow/imágenes rotas/errores JS/textos bajo 12 px. Capturas completas, de portada y de consulta en outputs del chat. Revisión visual realizada. Sin consultas enviadas a Instagram.
