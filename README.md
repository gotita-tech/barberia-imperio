# Barbería Imperio

Sitio demo de Barbería Imperio (José Miguel Carrera 315, Llolleo, San Antonio, Chile).

**URL pública:** https://barberia-imperio-demo.vercel.app/

## Estado actual

Demo estática: HTML único (`index.html`) + `styles.css` + `app.js` + `assets/`. Sin build ni backend; Vercel la sirve tal cual (`vercel.json`).

Qué hace: portada, galería filtrable con fotos del Instagram del negocio, navegación responsive, recomendador de estilos por reglas (no es IA) y un formulario que **prepara un mensaje de consulta** para enviar por Instagram.

Qué NO hace: no hay reservas reales ni confirmación de horas, no hay base de datos ni cuentas de cliente, no guarda datos. Precios, barberos, teléfono y servicios oficiales siguen pendientes de confirmar.

El desarrollo de la Fase 1 (sitio Next.js) está descrito en `docs/ROADMAP.md`.

## Ver en local

Abrir `index.html` o, en esta carpeta, `python -m http.server 8000`.

## Documentación

`CLAUDE.md` · `docs/ROADMAP.md` · `docs/DIAGNOSTICO.md` · `docs/ESPECIFICACION-IMPERIO.md`

Antes de publicar de forma definitiva: verificar derechos de las fotos (Instagram y Google Maps) y datos del negocio.

## Fotografía del rediseño urbano
La portada usa recortes 3:4 en assets/images, a 120/160/240 px de ancho mediante srcset/sizes. El máximo mostrado es 240 px, acorde a los archivos disponibles. Hero sin lazy y galería con carga diferida; dimensiones explícitas 240×320.
Los 12 originales se conservan sin cambios en assets/_archivo/originales. scripts/prepare-images.cjs reproduce los derivados con Sharp disponible; assets/images/manifest.json registra dimensiones, recortes y hashes. No se reconstruye detalle ni se amplían imágenes pequeñas.
Para producción se requieren fotografías originales, sin iconos, de al menos 1600 px de ancho (ideal retrato 1600×2133 px o mayor), con margen alrededor del cabello y permisos de publicación confirmados. Cuando lleguen, generar variantes de 240/480/720/960/1600 px sin ampliar, actualizar dimensiones/manifest/srcset y revisar sizes según el layout. Las variantes 480 px permiten mayor detalle a 2× para tarjetas de 240 px; no se ofrecen ahora porque el material disponible no lo soporta.
