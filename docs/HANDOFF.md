# HANDOFF — Barbería Imperio

Fecha: 14 de octubre de 2026, America/Santiago. Destinatario: Claude u otro agente continuador.

Este documento describe el código inspeccionado en `rediseno-urbano` @ `63647b8`, antes del commit documental que añade este archivo. Se contrastaron archivos, ramas, git log, PR y producción. No se modificó código para preparar este traspaso. Los resultados de QA citados son los de la Fase 6; no se ejecutó una nueva auditoría completa para este documento.

## 1. Resumen del proyecto

Sitio de demostración para Barbería Imperio, dirigido a personas de Llolleo/San Antonio que quieren conocer trabajos y consultar una hora por Instagram. La visión futura incluye agenda, perfiles y administración; eso no está activo en la web estática.

- Repo: https://github.com/gotita-tech/barberia-imperio
- Producción: https://barberia-imperio-demo.vercel.app/
- Preview urbana verificada: https://barberia-imperio-demo-1zcv3fptj-gotech2.vercel.app/ (requiere sesión Vercel).
- Vercel: `barberia-imperio-demo`, equipo Gotech, slug `gotech2`.
- Project ID: `prj_3Ld8gNluFn6vY7XEd2AKPOvzl2hQ`; team ID: `team_lDMpm98CsyrHw4OqwBtVgrZB`.
- Carpeta local: `C:/Users/Acer/Documents/Codex/2026-10-07/referenced-chatgpt-conversation-this-is-an/work/site/barberia-imperio`.

### Real, referencial y pendiente

| Elemento | Estado |
|---|---|
| Marca/logo | Logo aportado por el usuario; blanco y negro, intacto. SVG/original vectorial: desconocido. |
| Localidad/dirección | Usuario indicó José Miguel Carrera 315, Llolleo, San Antonio, Chile. Pin/geocodificación exacta: desconocido. Maps usa búsqueda por dirección. |
| Instagram | Perfil proporcionado: https://www.instagram.com/barberia._imperio/ |
| Fotografías | Trabajos aportados mediante capturas; no son fotos generadas. Originales de alta resolución y permisos de publicación: pendientes. |
| Servicios | Corte de cabello, Degradado/Fade y Diseño personalizado son categorías referenciales; no constituyen catálogo oficial. |
| Precios/duración | Desconocidos. Se muestra PRECIO POR CONFIRMAR; no hay valores oficiales. |
| Barberos | Nombres, especialidades, fotos de perfil y horarios: desconocidos. Bloque Equipo conservado, oculto. |
| Horario | La captura histórica indicaba lunes–sábado 10:00–19:30, sin confirmación actual. Las franjas del formulario son referenciales. |
| Reservas | Inactivas. El formulario prepara texto; no verifica disponibilidad, registra reservas ni confirma horas. |
| Asesor | Reglas fijas sobre preferencias; no IA, análisis de fotografías ni historial persistente. |
| Reseñas/teléfono/WhatsApp | Desconocidos; no hay testimonios, estrellas, número ni CTA WhatsApp inventados. |
| Persistencia/notificaciones | No hay base de datos, cuentas, almacenamiento de consultas ni envío automático en esta rama. |

### Stack actual y ejecución

**Framework: ninguno; versión no aplicable.** HTML5, CSS y JavaScript nativo con IIFE y modo estricto. No React, Next.js, Tailwind ni `next/image` en `rediseno-urbano`. No `package.json`, lockfile, servidor de aplicación, CMS o API en esta rama.

Orden de estilos en `index.html`: `styles.css` → `design-system.css` → `urban.css`. Este último define la composición urbana y sobrescribe reglas anteriores. `app.js` carga con `defer`.

```sh
git switch rediseno-urbano
python -m http.server 8000
# Abrir http://localhost:8000/
```

- Install: no requerido para servir el sitio.
- Dev: el servidor estático anterior. Abrir el HTML directamente es posible, pero el portapapeles puede quedar restringido.
- Build: no existe comando de compilación; Vercel empaqueta archivos estáticos.
- Comprobación de sintaxis: `node --check app.js` (no equivale a lint).
- `vercel.json`: framework/build/install nulos, salida raíz `.` y cabecera `X-Robots-Tag: noindex, nofollow`.
- `.vercelignore`: excluye `node_modules`, `docs`, `public`, `CLAUDE.md` y `CHANGELOG.md`.
- Herramientas observadas localmente: Node `26.7.0`, npm `11.19.0`, Python `3.13.15`, Vercel CLI `64.0.2`. Proyecto Vercel: Node `24.x`; no hay funciones Node activas.
- Utilidad `scripts/prepare-images.cjs`: Sharp `0.35.5` disponible localmente, sin dependencia declarada en Git. Solo para regenerar activos, no para ejecutar la página. Ejecución: `node scripts/prepare-images.cjs`, con Sharp instalado y autorización para regenerar.

**Variables necesarias para la web estática: ninguna.** `VERCEL_OIDC_TOKEN` aparece en `.env.local` local para pruebas de previews protegidas; no es configuración del navegador. Nunca subir `.env*`, credenciales, tokens o backups privados. Este documento no contiene valores de variables.

### Stack alternativo, separado del rediseño

Solo en ramas locales `fase-1-mvp` y `fase-2-reservas`: Next.js App Router `16.4.0`, React/React DOM `19.3.0`, Zod `4.6.7`, Tailwind `4.3.3`, TypeScript `5.9.3`, Playwright Test `1.64.0` (versiones resueltas en sus lockfiles). Fase 2 añade Supabase SSR `0.12.7`, Supabase JS `2.117.3` y PGlite `0.5.9`.

Esas ramas tienen `npm ci`, `npm run dev`, `npm run build`, `npm run start`, `npm run typecheck`, `npm run test:e2e`; Fase 2 añade `npm run test:db`. No ejecutar estos comandos suponiendo que existen en `rediseno-urbano`.

Variables de `.env.example` de Fase 2, **solo nombres**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `IMPERIO_TENANT_ID`
- `IMPERIO_BOOKING_ENABLED`

Reservas bloqueadas por configuración del servidor y del tenant. No hay proyecto Supabase exclusivo de Imperio confirmado ni migración remota aplicada. No usar una conexión de otro proyecto por proximidad o nombre.

## 2. Historial de lo hecho

Todos los commits indicados están fechados el 14 de octubre de 2026. Las etapas Next.js y rediseño urbano son líneas de trabajo diferentes.

| Etapa | Commits relevantes | Resultado |
|---|---|---|
| Base | `9a34eec` | Auditoría inicial, documentación y activos importados. |
| Demo estática | `88e3ccf` | HTML/CSS/JS promovidos a raíz, Vercel estático/noindex. El usuario autorizó reemplazar la versión anterior publicada. |
| Next.js local | `71ebbd4`, `0d42bf4` | MVP alternativo, compilación y 12 pruebas de navegador documentadas. No fusionado/publicado. |
| Reservas local | `1033e38` | Supabase preparado: auth por correo, agenda, RLS, reservas/cancelaciones y cola. 13 pruebas DB y 16 de navegador documentadas. Sin servicio remoto activo. |
| Urbano Fase 0 | `bf20fc4` | Rama desde main, inventario de imágenes y propuesta de secciones; sin cambios de código. |
| Urbano Fase 1 | `4ebe0eb`, `80b028a` | Copiar visible/accesible, piso 12 px, contraste, localidad y retiro de Estilo IA del menú. |
| Urbano Fase 2 | `664975e`, `ed26aab` | Tokens, Archivo/Archivo Black locales, escala y estados de controles. |
| Urbano Fase 3 | `4bf1e93`, `805308f` | Cabecera, hero polaroid, banda, galería, cierre/pie; integración de secciones. |
| Urbano Fase 4 | `1c9d987`, `48c7ef7`, `a2e1dc4` | Recortes reales, variantes/srcset, originales archivados y límites de tamaño. |
| Urbano Fase 5 | `d9f13e4`, `6426c70` | Servicios/sugerencias al formulario, tarjetas a Instagram y CTA móvil condicional. |
| Conexiones | `7131e0c` | Plugin y CLI Vercel verificados; MCP manual duplicado desactivado por 403. |
| Urbano Fase 6 | `3d16942`, `36c2687`, `20eb810`, `5ca7fa2`, `63647b8` | QA final, metadatos, errores por campo, robots, capturas, métricas y PR. |

### Decisiones de diseño y motivo

- Se compararon propuestas editorial, urbana y minimalista. El usuario eligió la **dirección urbana de sus capturas**: titulares sans pesados, composición editorial y acentos bronce. No volver a la serif general del brief inicial.
- Foto real pequeña en polaroid: evita prometer calidad que las capturas no tienen. No ampliar ni generar cortes/barberos ficticios.
- Banda bronce: ubicación/contacto visible y cambio de ritmo frente al carbón.
- Servicios conservado como referencia; Equipo oculto hasta tener datos. Asesor/formulario plegables: conservan utilidad sin dominar la portada.
- Instagram principal, formulario alternativo: la barbería confirma directamente; el sitio no simula una reserva exitosa.
- Sin zoom de galería: la resolución no lo soporta. Sin iconos incrustados ni fotos repetidas.
- Noindex y avisos demo: no presentar un prototipo como plataforma oficial.

### Ramas y PR

| Rama | Estado inspeccionado |
|---|---|
| `main` / `origin/main` | `88e3ccf`; demo anterior, serif y collage. Producción devuelve HTTP 200, título El detalle hace la diferencia y noindex. |
| `rediseno-urbano` / origin | `63647b8` antes de este handoff; seis fases terminadas, previews y cambios enviados. |
| `fase-1-mvp` | Local `0d42bf4`; no aparece entre las ramas remotas. |
| `fase-2-reservas` | Local `1033e38`; no aparece entre las ramas remotas. |

PR **#1**: https://github.com/gotita-tech/barberia-imperio/pull/1, abierto hacia `main`, no fusionado, sin conflictos y chequeo Vercel aprobado al inspeccionarlo. Incluye capturas antes/después. Falta **aprobación explícita del usuario para fusionar y publicar producción**, según el encargo original; no activar auto-merge por iniciativa propia.

Para Claude que solo clone GitHub: las ramas Next.js/Supabase **no estarán disponibles**. Pedir su transferencia si se decide continuar ese backend; no reconstruirlo suponiendo que pertenece al home urbano.

## 3. Sistema de diseño: conservar

### Colores y cascada

Fuente de tokens vigente: `design-system.css`, `:root`. No existe Tailwind config en esta rama. `styles.css` mantiene tokens antiguos sobrescritos: no tomarlos como autoridad visual.

| Variable | Valor |
|---|---|
| `--bg` | `#0C0C0E` |
| `--surface` | `#1A1A1D` |
| `--surface2` | `#2A2A2C` |
| `--cream`, `--text` | `#F2EEE7` |
| `--gold` | `#C4A676` |
| `--gold2` | `#D7BB90` |
| `--bronze-dark` | `#7A5A35` |
| `--muted` | `#AAA39A` |
| `--line` | `#625A50` |
| `--focus` | Marfil; la banda bronce lo cambia a carbón. |

Valores locales en `urban.css`: barra demo `#141416`; labels sobre banda `#443219`; hover de enlace en banda `#33240F`; errores `#FFE1D8`; borde inválido `#EAB7A9`.

Mantener carbón/grafito, marfil y bronce; logo original blanco/negro sin recolorear, deformar o redibujar. Archivo original: `assets/logo-imperio.png`, 255×258. Aesthetic: editorial premium con **dirección urbana ya aprobada**, no una nueva propuesta estética.

### Tipografía

- Archivo variable, pesos 100–900: `assets/fonts/archivo-variable.woff2`, 130800 bytes.
- Archivo Black, peso propio 400: `assets/fonts/archivo-black.woff2`, 26052 bytes. No confundir peso 400 de la familia con un titular liviano.
- `@font-face` en `design-system.css`, preload en `index.html`, `font-display: swap`; fallback Arial/Helvetica/sans-serif.
- Georgia/Times New Roman solo para `.footer-signature` del home. No fuentes remotas durante la visita. Licencias OFL y origen en `assets/fonts/`.

Tokens de escala: label `.75rem`, small `.875rem`, body `1rem`; title `clamp(1.5rem,2.5vw,2rem)`, section `clamp(1.875rem,4vw,3.5rem)`, hero `clamp(2rem,5.4vw,5rem)`.

**Tamaños efectivos del home sobrescritos en `urban.css`:**

- Hero: escritorio >1000 px `clamp(52px,6.5vw,88px)`; 841–1000 `clamp(48px,6vw,68px)`; 581–840 `clamp(40px,8vw,64px)`; ≤580 `clamp(36px,11.1vw,52px)`.
- Hero line-height `.99` desktop/`1.02` móvil, tracking `-.045em`.
- Galería: título `clamp(32px,4vw,48px)`, 36 px móvil; cierre `clamp(30px,3.6vw,44px)`, 30 px móvil.
- Servicios: título `clamp(28px,3vw,36px)`, 30 px móvil; nombres 20/18 px.
- Body 16 px, texto secundario y CTA 14 px, notas/eyebrows 12 px. Piso visible: 12 px.

### Composición, espaciados y estados

No hay tokens globales de spacing/radius/shadow; valores concretos en CSS:

- `.shell`: máximo 1160 px; márgenes 32 px por lado desktop, 20 px ≤840.
- Breakpoints: 1100 en CSS heredado; 1000, 840 y 580 en composición urbana. Revisar cascada antes de ajustar.
- Header: 106 px desktop, 78 px tableta y 70 px móvil; posición relativa, no sticky en el home final.
- Hero desktop: columnas `minmax(0,1fr) 340px`, gap 100 px, padding 58/64 px; móvil padding 32/44 y gap 28.
- Secciones: padding vertical 66 px desktop y 44 px móvil.
- Polaroid: 240 px desktop, 230 px intermedio y 220 px móvil; giro 3°; sombra sólida bronce 13×13 px, 10×10 móvil; proporción foto 3:4.
- Galería: tres columnas hasta 240 px, gap 28; tarjeta par desplazada 30 px. Móvil dos columnas, gap 24/16, desplazamiento 20 px.
- Botones: cuadrados, min-height 50 px en home; padding 15×22 px. Controles base mínimos 44×44. Panel summary 56 px. Sin radios redondeados en componentes urbanos visibles.
- Paneles: bordes 1 px; contenido 24 px desktop/16 móvil; formulario 28/18 px.
- Estados hover/focus/active/disabled en `design-system.css`; foco de 2 px, offset 4 px.
- Transiciones de controles `.16s`; CSS heredado contiene otras transiciones. No hay video, parallax ni animación continua. Reduced motion desactiva transición/animación y scroll suave.
- CTA fijo móvil ≤580: solo después del hero, fuera de la consulta y con menú cerrado; body reserva `84px + safe-area-inset-bottom`.

### Secciones/componentes en orden

Todos son HTML en **`index.html`**, no componentes React. Estilos: tres CSS; comportamiento: `app.js`.

1. `.skip-link` → `#contenido`.
2. `.announcement`: Propuesta de diseño · Demostración · Sin reservas activas.
3. `.site-header#arriba`, `.brand`, `.menu-toggle`, `#main-nav`.
4. `.hero`: `#hero-title`, `.hero-actions`, `.hero-note`, `.polaroid`, `.vertical-caption`.
5. `.location-band#ubicacion`: dirección, Maps, Instagram y Conoce Imperio.
6. `.gallery-section#estilos`: `#gallery-title`, `.filters`, tres `.gallery-card/.gallery-link`.
7. `.services-section#servicios`: tres `.service-row[data-service]`; dentro, `.advisor-panel#estilo-ia` plegable y `.ai-widget`.
8. `.booking-section#reservar`: `#booking-title`, `.closing-action`, `.consultation-panel`, `#booking-form`, `#booking-output`.
9. `.site-footer`, `.footer-signature`, `.footer-bottom`.
10. `template#equipo-pendiente`: conserva `#equipo`, inerte y fuera de la portada.
11. `.mobile-bar`: acceso fijo condicional. Oculto por defecto.

## 4. Mapa del código

```text
index.html                 Página única, metadatos, secciones y formularios.
app.js                     Menú, filtros, asesor, preselección, validación, mensaje/copia, observer y año.
styles.css                 Estilos base heredados; incluye reglas ya sin uso visible.
design-system.css          Tokens, fuentes, escala y estados de componentes.
urban.css                  Composición urbana y ajustes responsive efectivos.
robots.txt                 User-agent * / Disallow /, demo bloqueada.
vercel.json                Sitio estático raíz y header noindex.
.vercelignore              Exclusiones del deployment.
.gitignore                 Dependencias, .next, .env y .vercel fuera de Git.
README.md                  Ejecución y requisitos de fotografía.
CLAUDE.md                  Reglas, marca, estado y conexiones del agente.
CHANGELOG.md               Historial resumido.
scripts/prepare-images.cjs Recortes y variantes reproducibles con Sharp.
assets/logo-imperio.png    Logo original, también favicon/OG.
assets/fonts/             Dos WOFF2, README y licencias OFL.
assets/images/            Doce derivados WebP; manifest.json con crop, dimensiones y hashes.
assets/_archivo/          README y originales/ con las 12 fotografías intactas.
public/brand/             Copias históricas de logo/fachada; no usadas por esta web, excluidas del deploy.
public/gallery/           Copias históricas de cortes; no usadas por esta web, excluidas del deploy.
docs/ESPECIFICACION-IMPERIO.md Brief original y visión futura; ciertos datos/diseño son históricos.
docs/DIAGNOSTICO.md        Diagnóstico inicial; no describe el despliegue actual completo.
docs/ROADMAP.md            Roadmap de producto y avance urbano.
docs/CONEXION-VERCEL.md    Acceso operativo y MCP duplicado desactivado.
docs/REDISENO-URBANO-FASE-0.md ... -6.md  Decisiones, previews, verificaciones y límites por fase.
docs/revision/            Cuatro JPEG antes/después y README de procedencia.
docs/HANDOFF.md           Este traspaso.
```

**Rutas actuales:** `/` (también `/index.html` como archivo); navegación por `#arriba`, `#contenido`, `#estilos`, `#ubicacion`, `#servicios`, `#estilo-ia`, `#reservar`. No páginas `/reservar`, `/admin`, `/ingresar` ni endpoints de reserva en esta rama. `#equipo` existe solo dentro del template inerte, sin enlace de navegación activo.

**Solo en Next.js local:** Fase 1: `/`, `/servicios`, `/barberos`, `/contacto`; Fase 2 añade `/reservar`, `/ingresar`, `/mis-reservas`, `/admin` y `/api/reservas`. Sus archivos están en `src/app/`; componentes `Header`, `Footer`, `Galeria`, `ConsultaForm`, `ReservaForm` en `src/components/`. Supabase: `src/lib/supabase/`, `src/lib/reservas.ts`, `src/proxy.ts`, `supabase/migrations/202610140001_reservas.sql`. No pertenecen a este checkout.

**Residuos locales, no versión actual:** `.next/`, `node_modules/`, `test-results/`, `tsconfig.tsbuildinfo`; no asumir framework por su presencia. `docs/CRITICA-DISENO.md` y `docs/HANDOFF-CODEX.md` estaban sin seguimiento: no se incorporan con este commit. `legacy/demo-zip/` es citado por documentación antigua, pero no aparece en el árbol actual inspeccionado.

## 5. Insumos para auditoría

### Rendimiento

- Cuatro fotos WebP, cada una con 120×160, 160×213 y 240×320. Hero `fade-perfil`; galería `fade-lineas`, `diseno-ondas`, `corte-frontal`.
- Pesos en bytes:

| Foto | 120 px | 160 px | 240 px |
|---|---:|---:|---:|
| fade-perfil | 4442 | 6652 | 12098 |
| fade-lineas | 4798 | 6844 | 11820 |
| diseno-ondas | 4380 | 6460 | 12712 |
| corte-frontal | 4922 | 7072 | 12096 |

- Hero con `fetchpriority=high`, sin lazy; galería `loading=lazy`. Todas con `srcset`, `sizes`, dimensiones 240×320 y aspect-ratio. Sin `next/image`. Recortes de 24 px superiores en las tres fotos con iconos; `diseno-ondas` top 14; ver manifest para posiciones exactas.
- Logo PNG: 35623 bytes. Fonts: 156852 bytes en total, autoalojadas/preload/swap.
- Tamaños sin compresión HTTP del checkout: HTML 16394 bytes; JS 11326; CSS base 19851, sistema 5897, urbano 12576. No confundir con transferencia comprimida medida.
- No runtime de framework, carrusel pesado, tracking, SDK IA ni petición API al preparar consulta. IntersectionObserver y listeners nativos. Peso de compresión/cache de cada recurso: no inventar; revisar Network.
- Lighthouse **12.8.2**, móvil, preview `6y1gyby3k`, código `3d16942`: rendimiento **95**, accesibilidad **100**, buenas prácticas **100**, SEO **58**, LCP **2,3 s**, CLS **0**. Laboratorio, no Core Web Vitals de usuarios reales; métricas de campo: desconocidas.
- Preview final `1zcv3fptj` @ `36c2687`: HTTP 200 y nueve archivos cotejados por hash; mismo HTML/CSS/JS de la medición. Se añadió robots y documentación. No atribuir una nueva medición Lighthouse a ese URL.
- Oportunidades Lighthouse: CSS bloqueante/duplicado, entrega de imágenes y logo PNG. Los objetivos ≥85 rendimiento/≥95 accesibilidad se cumplieron; no degradar resolución para perseguir una cifra.

### SEO

- Metadatos escritos directamente en `index.html`; no generación por ruta.
- Title: `Barbería Imperio | Tu estilo. Nuestro Imperio.`
- Description: `Barbería Imperio en Llolleo, San Antonio. Explora nuestros trabajos y prepara una consulta por Instagram. Sitio de demostración, sin reservas activas.`
- OG: website, es_CL, site_name, title, description, URL pública; `og:image` apunta al logo original público con width/height/alt. Favicon mismo PNG. Logo/OG público comprobado HTTP 200/hash intacto.
- Meta robots y cabecera Vercel: noindex, nofollow; `robots.txt`: Disallow `/`.
- Sitemap: no existe. Canonical: no existe; `og:url` no lo sustituye. JSON-LD LocalBusiness/HairSalon: no existe en esta rama. No copiar propuestas o implementación de Next.js como si ya estuvieran activas.
- SEO local: Llolleo/San Antonio en hero, descripción y banda; dirección visible y Maps por búsqueda. Pin, Google Business Profile, teléfono y datos oficiales adicionales: desconocidos.
- SEO 58 de Lighthouse refleja noindex intencional y un fetch de robots que recibió HTML de autenticación Vercel. El robots real se comprobó autorizado y válido; no desactivar protección/indexar la demo para elevar esa nota.

### Accesibilidad

- `lang=es-CL`, skip link, alt descriptivo, etiquetas `for`/`id`, `aria-expanded`, filtros `aria-pressed`, foco visible y Enter/Esc.
- `#booking-form` usa validación propia (`novalidate`), errores con `aria-describedby`/`aria-invalid` y foco al primer campo incorrecto. Avisos de copia/selección con `aria-live` y `role=status`.
- `prefers-reduced-motion` en CSS y scroll de JavaScript. Controles de al menos 44 px en los escenarios verificados.
- Contrastes calculados entre colores sólidos: bronce/carbón **8,43:1**; marfil/carbón **16,90:1**; gris/carbón **7,83:1**; bronce oscuro/marfil **5,43:1**; label banda/bronce **5,28:1**.
- **Bronce claro sobre marfil: 2,00:1, no cumple AA.** Usar `--bronze-dark`, no `--gold`, para ese texto. Las ratios no sustituyen una auditoría de transparencias/estados reales.
- Fase 6: Playwright/Chromium `1.64.0`, axe-core `4.14.0`; 360/390/768/1024/1440, sin infracciones WCAG 2 A/AA y 2.1 AA detectadas, overflow, errores JS, fotos rotas o texto visible <12 px. Se probaron teclado, menú, formularios, copia real y rechazo del portapapeles.
- Lector de pantalla humano, Safari/iOS, Firefox y usuarios reales: desconocido/no probado en ese QA. No afirmar certificación de accesibilidad total.

### Calidad de código y evidencia disponible

- ESLint `9.39.5` ejecutado desde herramientas externas al repo: no-undef, no-unused-vars, no-unreachable, no-dupe-keys, valid-typeof; sin errores. npm avisó que esa versión de ESLint ya no tiene soporte. No hay comando lint/config portable o suite QA urbana versionada en la rama.
- Sintaxis `node --check app.js` y script Sharp aprobada. Build de framework: no aplicable; deployment estático READY. No warnings de aplicación registrados. Auditoría general de seguridad/dependencias: desconocida, no confundir con axe.
- `git diff --check` de entrega sin problemas en archivos revisados; licencias OFL originales mantienen whitespace del proveedor y se excluyeron de esa comprobación.
- Deuda: CSS minificado/heredado con reglas muertas y overrides; duplicación `.service-row` y tokens viejos; HTML con líneas largas, contenido hardcoded repetido; manejo DOM centralizado en una IIFE.
- Código preservado/inactivo: template Equipo; copias `public/`; clases antiguas hero-tile, ticker, intro, team, footer-grid, etc. No borrarlas/limpiarlas a ciegas ni perder originales.
- No se encontraron TODO/FIXME/HACK en los archivos activos inspeccionados; pendientes están en docs. Documentos iniciales contienen propuestas o estados vencidos.
- Capturas portables: `docs/revision/{antes,despues}-{360,1440}.jpg`.
- Evidencia externa al repo en esta máquina: `C:/Users/Acer/Documents/Codex/2026-10-14/files-mentioned-by-the-user-especificacion/outputs/` contiene `LIGHTHOUSE-FASE-6.html/.json`, informe de Fase 6 y capturas PNG a cinco anchos. Scripts QA en la carpeta hermana `work/urban-phase0/`. No estarán en un clone; transferirlos si se necesitan. Informes guardados con autorización redactada.

### Copy y UX

Flujo actual: elegir categoría o sugerencia → abrir formulario → fecha/franja/comentario → preparar mensaje → **1 Copiar mensaje → 2 Abrir Instagram** → enviar manualmente y esperar confirmación de la barbería.

- La sugerencia conserva el comentario, evita duplicados y avisa si supera 250 caracteres. Cambiar preferencias invalida el texto preparado.
- Fecha mínima en America/Santiago; no se bloquean domingos por política desconocida.
- Instagram directo en cierre/banda; Conoce Imperio y tres tarjetas llevan al perfil, no a publicaciones individuales (URLs específicas: desconocidas). `rel=noopener noreferrer`.
- Maps usa URL de búsqueda con dirección. No se comprobó una ficha/pin exacto.
- No WhatsApp, pago ni navegación a un panel real. No enlaces internos rotos detectados en los recorridos; disponibilidad futura del perfil externo: desconocida.
- Avisos demo, categorías/precios pendientes, horarios referenciales y fotografía sujeta a originales/permisos siguen visibles deliberadamente.

## 6. Problemas y pendientes conocidos

1. **Fotos:** resolución fuente ~260×350. Ya no se amplían ni muestran iconos, pero no hay detalle suficiente para fotos grandes o Retina. Pedir originales ≥1600 px de ancho, ideal retrato 1600×2133 o mayor, y permisos. Logo vectorial pendiente.
2. **Negocio:** catálogo, precios, duración, equipo, horarios/políticas, WhatsApp y reseñas verificadas siguen desconocidos. No reemplazar placeholders con datos inventados.
3. **Publicación:** PR #1 requiere aprobación; producción todavía es main antiguo. El handoff no fusiona ni despliega.
4. **Backend:** preparación solo local; faltan Supabase exclusivo, datos reales, OTP remoto y carreras de transacciones en conexiones independientes. PGlite no prueba concurrencia remota real. Cola de notificaciones preparada sin worker, proveedor ni cron; no se envían correos.
5. **Automatización:** falta trasladar QA urbana externa a una suite reproducible en Git/CI. Las pruebas de ramas Next.js no verifican este sitio estático.
6. **Histórico de auditoría:** crítica local no seguida por Git reportó tres fotos rotas; no se reprodujo en Fase 0 ni fases posteriores. La captura del informe de Claude mencionaba design-critique y 18 hallazgos; solo se vio una parte, informe completo desconocido. No mezclarlo con `docs/CRITICA-DISENO.md`, que declara crítica manual sin esa skill.
7. **Accesos:** MCP manual Vercel devolvió 403 para Gotech incluso tras OAuth exitoso; se desactivó en configuración local. Usar plugin Vercel y CLI comprobados. Git inicialmente no escogía la credencial; se resolvió con `credential.username=gotita-tech` local. No pedir el mismo login por fase ni solicitar tokens al usuario.
8. **Windows:** el wrapper `vercel.ps1` perdió el separador de comandos anidados; usar `vercel.cmd`. `vercel curl` llegó a reenviar flags globales a curl; las pruebas protegidas usaron OIDC corto, sin cambiar protección. Playwright utilizó `channel: chromium` ante fallos del headless-shell.
9. **SEO:** canonical/sitemap/schema y OG panorámico pendientes de evaluar para lanzamiento oficial. Noindex actual es intencional, no un bug a corregir ahora.
10. **Mantenimiento:** especificación/diagnóstico antiguos citan otra paleta, serif y carpetas/estados previos. Prioridad para diseño actual: CSS vigente, referencias aprobadas, informes urbanos y este snapshot; para acciones futuras, la instrucción actual del usuario.

## 7. Recomendaciones sin alterar la estética

1. Obtener originales/permisos y datos oficiales. Sustituir imágenes dentro del mismo polaroid/grid, conservar encuadre, dimensiones y paleta; preparar 240/480/720/960/1600 sin ampliar.
2. Confirmar dirección/pin, horario y contacto; mantener CTA de consulta hasta existir agenda real. Obtener URLs de publicaciones para que las tarjetas lleven al trabajo indicado.
3. Versionar pruebas/lint y evidencias portables; probar también Safari/iOS, lector de pantalla y alta densidad. No rebajar comprobaciones para ahorrar tiempo.
4. Consolidar CSS y contenido repetido con capturas de regresión. Mantener exactamente composición, fuentes, escala, estados y textos aprobados; no migrar a un framework solo por limpiar archivos.
5. Preparar SEO oficial (canonical, sitemap, HairSalon con datos verificados y OG de tamaño apropiado con logo intacto). Retirar noindex solo con autorización de lanzamiento, no durante la demo.
6. Tras aprobación del PR, fusionar y verificar producción. Reservas/Supabase son otra entrega: transferir primero las ramas locales y definir alcance, permisos y datos antes de integrarlas.

**Reglas operativas:** no nuevos repos/proyectos por iniciativa propia; no tocar Ryiori u otros negocios; no borrar originales; no subir secretos; no activar costos, bases de datos o publicación definitiva por inferencia. Consultar `CLAUDE.md` y `docs/CONEXION-VERCEL.md`. Las credenciales son locales y no forman parte del traspaso.
