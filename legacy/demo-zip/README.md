# Barbería Imperio — Demo interactiva / Fusión Premium

**Qué contiene:** sitio estático responsive en español, fotografías recortadas desde la captura aportada de Instagram, logotipo original aportado, foto de fachada, catálogo filtrable, formulario para preparar una **consulta** de reserva, demo de sugerencias de estilo basadas en reglas y enlaces a Instagram.

## Ver el sitio

Abre `index.html` en tu navegador. Para desarrollo local con recarga y rutas estáticas, puedes ejecutar en esta carpeta `python -m http.server 8000` y entrar a `http://localhost:8000/`. No requiere cuentas ni API externas.

## Qué NO hace todavía

- No existe backend de reservas, agenda ni pago. No confirma horas. El formulario solo prepara un mensaje para copiar y enviar a Instagram.
- No utiliza inteligencia artificial real ni sube/guarda fotografías personales. El selector de estilos es únicamente demostrativo.
- Los nombres de los barberos y precios no están confirmados; se dejaron expresamente pendientes.
- No guarda datos de clientes ni crea perfiles de usuarios.
- No está desplegado públicamente.

## Fuentes de los activos

`logo-imperio.png`: logotipo aportado por el usuario.
`fachada-imperio.webp`: fotografía de fachada aportada por el usuario y procedente de Google Maps, baja resolución.
`fade-*.webp`, `corte-*.webp`, `diseno-*.webp`, `barbero-*.webp`: recortes fieles de la captura del Instagram de Barbería Imperio aportada por el usuario. No son fotografías originales descargadas individualmente; la resolución es limitada.

**Antes de publicar:** comprobar los derechos y permisos de publicación de las fotos de clientes y de Google Maps fuera de sus plataformas de origen. Pedir a Imperio su logotipo original y los archivos de foto/video con autorización de uso.

## Datos públicos visibles en la captura facilitada

- Instagram: `barberia._imperio` (enlace: `https://www.instagram.com/barberia._imperio/`).
- Dirección mostrada: José Miguel Carrera 315, **comuna por confirmar**.
- Horario mostrado: lunes a sábado, 10:00 a 19:30. Confirmar antes de producción.

## Roadmap técnico sugerido

1. **MVP comercial real:** Next.js (App Router), TypeScript, Tailwind CSS; agenda con disponibilidad real, backend Supabase/Postgres, perfiles de barberos, administración, validación server-side, notificaciones y reglas para dobles reservas.
2. **Fidelización:** registro de clientes (consentimiento y privacidad), fotos elegidas por el cliente, notas de cortes, estilos favoritos, acceso restringido.
3. **IA premium:** fotografías subidas con autorización explícita; recomendaciones explicadas como sugerencias y revisadas por barbero; simulación visual con etiquetas indicando resultados no garantizados; retención de imágenes configurable, borrado y medidas de seguridad.
4. **Producto escalable:** separación por barbería (multi-tenant), roles, controles de acceso a nivel de fila, auditoría y permisos específicos.

## A validar con el negocio

Comuna exacta, nombres y fotos de barberos, precios, servicios oficiales, duración, disponibilidad, mecanismo real de reservas, contacto telefónico/WhatsApp, permisos de contenido y nivel de participación en el programa premium.
