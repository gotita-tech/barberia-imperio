# BARBERÍA IMPERIO — Especificación del producto

**Versión:** propuesta 0.1 · 14 de octubre de 2026  
**Concepto:** Fusión premium — oficio clásico, carácter urbano y tecnología discreta.  
**Tipo de entrega:** demo privada navegable + arquitectura de producto propuesta.

---

## 1. Base real de la marca: observaciones y pendientes

### Observado directamente en los recursos que aportó el usuario

- Logotipo histórico blanco y negro: emblema central ornamentado, texto «BARBERÍA IMPERIO», formas de heráldica y remate decorativo.
- Fachada real con revestimiento oscuro, rótulo y postes de barbería tradicionales.
- Trabajos visibles en Instagram: fades/degradados, transiciones limpias, flequillos cortos, diseños lineales y geométricos, además de cortes con tijera.
- Perfil de Instagram visible en la captura: `barberia._imperio`; biografía con `José Miguel Carrera 315`, `lunes a sábado de 10:00 a 19:30` y reserva por mensajes.

### No validado

- Comuna y geocodificación exacta de la dirección; existen otros negocios con nombres similares en Chile.
- Nombres de barberos, disponibilidad, precios, duración y lista oficial de servicios.
- Propiedad/licencias y permisos de reutilización de fotografías de clientes, capturas de Instagram y fotografía procedente de Google Maps.
- Logo vectorial/original, links oficiales adicionales, número de WhatsApp, dominio y redes sociales secundarias.

**Regla editorial:** nada de testimonios, seguidores, estrellas, descuentos, promociones, premios, experiencia profesional o precios inventados.

## 2. Objetivo del producto

### Cliente final

Descubrir el estilo de Imperio, entender qué servicio le sirve, elegir un profesional (cuando esté definido), consultar disponibilidad y reservar con pocos pasos. En la versión premium, conservar recomendaciones e historial personal consentidos.

### Barbero

Mostrar sus trabajos con su propia identidad, gestionar horarios, consultar referencias de corte que el cliente voluntariamente compartió y añadir notas autorizadas para la próxima visita.

### Administración

Gestionar agenda, servicios, equipo, reservas, galerías, roles y estadísticas operativas. La futura plataforma se diseña para poder venderse a otras barberías sin mezclar sus datos.

### KPI recomendados cuando exista plataforma real

Conversión de visita a reserva confirmada, tasa de no asistencia, tasa de repetición, reserva por profesional, ocupación de horarios, satisfacción voluntaria y adopción de perfil premium.

## 3. Dirección de arte: «Fusión premium»

### Concepto emocional

**«El detalle hace la diferencia.»** La identidad no debe parecer un club de lujo genérico: combina la autenticidad de la barbería real con una interfaz editorial de alto contraste. La IA acompaña, pero nunca es más importante que el trabajo del barbero.

### Sistema de color

| Token | HEX | Uso |
|---|---|---|
| `--bg` | `#0B0B0D` | Fondo principal oscuro |
| `--surface` | `#151518` | Tarjetas y paneles |
| `--surface2` | `#1B1C1E` | Superficies elevadas |
| `--cream` | `#F1EDE6` | Encabezados y contraste cálido |
| `--gold` | `#C7A878` | Llamados a la acción, índices, microdetalles |
| `--gold2` | `#AE8C5C` | Estados hover y bordes |
| `--muted` | `#999590` | Texto secundario |

El logo se conserva en **blanco y negro**: el bronce es un acento de interfaz, no una recolorización del sello original.

### Tipografía y composición

- Titulares de corte editorial: serif contrastada (en la demo, `Georgia` sin dependencia externa; en producción puede evaluarse una licencia de Cormorant/Instrument Serif).
- Interfaz y contenidos: sans serif moderna, con `Inter` o tipografía de sistema y tamaños legibles.
- Sistema de espaciado de 8 px; contenedor máximo ~1160 px; aire generoso, bordes finos y pocos radios.
- Fotografía de corte **real** por delante de ilustraciones genéricas. Acentos tipográficos y ornamentales mínimos.
- Transiciones cortas (~200 ms), respetando `prefers-reduced-motion`.

### Fotografía y contenido

- Hero: un corte con línea distintiva + dos detalles complementarios.
- Portafolio: filtros por categorías **editoriales**; no atribuir un autor/barbero sin confirmarlo.
- Local: la fachada que proporcionó el usuario, presentada como contexto real, nunca como imagen ficticia de un local de lujo.
- En producción obtener originales a mejor resolución, consentimientos de aparición y permiso de uso web.

## 4. Arquitectura UX: mapa de navegación

```text
Barbería Imperio
├── /                 Inicio y marca
├── /estilos          Portafolio de cortes y filtros
│   └── /estilos/[id] Detalle del corte, profesional (si se valida)
├── /servicios        Catálogo con precio y duración confirmados
├── /barberos         Listado de profesionales
│   └── /barberos/[slug] Portafolio, presentación y disponibilidad
├── /reservar         Servicio > profesional > día/hora > confirmación
├── /style-lab        Asesoría y simulaciones IA (fase 2)
├── /mi-imperio       Perfil, favoritos e historial con consentimiento
├── /visitanos        Dirección, mapa, horario y contacto
└── /admin            Panel protegido para negocio y profesionales
```

**Implementado hoy:** una landing responsive con navegación por anclas (`#estilos`, `#servicios`, `#equipo`, `#estilo-ia`, `#reservar`, `#ubicacion`), que prueba la jerarquía y tono visual antes de comprometer infraestructura. Las rutas enumeradas son la **arquitectura futura**.

## 5. Home: estructura priorizada

1. Barra superior de advertencia de demo (suprimible al lanzar producto real).
2. Menú responsive con logo original y CTA de consulta/reserva visible.
3. Hero: promesa, obra real, CTA primario «Solicitar una hora» y secundario «Ver nuestros trabajos».
4. Manifiesto de marca breve; sin historia inventada.
5. Portafolio real filtrable, vinculado a Instagram.
6. Servicios: descripciones breves y datos pendientes señalados.
7. Barberos: sección editorial y placeholder honesto hasta obtener nombres/portafolios validados.
8. Style Lab: cuestionario orientativo; la futura IA queda separada claramente.
9. Consulta de hora: captura de preferencias sin afirmar disponibilidad.
10. Información local + fachada y enlace de contacto.
11. Pie con navegación y aviso de demo.

El móvil debe ofrecer un CTA de reserva persistente sin tapar contenido crítico.

## 6. Flujos UX detallados

### A. Cliente nuevo (demo implementada)

`Inicio → Portafolio → Servicios → Formulario de consulta → Mensaje copiable → Instagram → Confirmación humana externa`

**Estado final correcto:** «Consulta preparada» y **nunca** «Reserva confirmada» hasta integrar el backend. Validar servicio, fecha futura/no domingo y ventana horaria; permitir notas optativas. No se guardan datos en servidor.

### B. Cliente nuevo (MVP real)

`Servicio → Profesional / cualquiera → Horario realmente libre → Contacto e información necesaria → Consentimientos pertinentes → Confirmación → Resumen y recordatorio`

- Mostrar precio, duración, ubicación, políticas de cancelación y costes antes de confirmar.
- Consultar disponibilidad transaccionalmente; bloquear dobles reservas.
- Alternativa manual o asistencia del local para personas sin correo.
- Aclarar horario de negocio frente a horario disponible del profesional.
- Guardar horarios en UTC y presentar siempre como `America/Santiago`, contemplando cambio de hora.

### C. Cliente recurrente (fase 2)

`Entrar a Mi Imperio → Mis estilos / historial autorizado → Elegir corte habitual → Reservar mismo barbero → Confirmar`

La persona controla sus fotos, notas y borrado; las notas no deben incluir diagnósticos personales.

### D. Profesional (fase 2)

`Panel → Mi agenda → Atención → Notas permitidas del servicio → Portafolio aprobado → Siguiente cliente`

Visibilidad limitada a datos necesarios según rol, consentimiento y política de acceso.

### E. Administrador (fase 2)

`Dashboard → Turnos → Servicios/precios → Equipo → Galería → Métricas → Ajustes/privacidad`

Reglas claras de cancelaciones, cierre de jornadas, pausas y excepciones de disponibilidad.

## 7. Interacciones y estados de interfaz

| Módulo | Estado vacío | Acción | Resultado |
|---|---|---|---|
| Galería | Todos los cortes | Filtrar | Solo cortes de esa categoría; `aria-pressed` actualizada |
| Style Lab demo | Selecciones por defecto | Ver sugerencia | Título + razonamiento estático; advertencia «No es IA real» |
| Solicitud de hora | Formulario vacío | Enviar | Valida servicio/fecha/hora; genera texto para Instagram |
| Solicitud de domingo | Domingo elegido | Enviar | Error explícito; no se prepara solicitud |
| Navegación móvil | Menú cerrado | Abrir | Menú desplegable con `aria-expanded` |
| Reserva futura real | Sin profesional/hora | Elegir | Datos y slots solo si el servidor los confirma |

Requisitos de accesibilidad: navegación con teclado, etiquetas asociadas, foco visible, contraste suficiente, alt descriptivos, targets táctiles apropiados y pruebas con lector de pantalla.

## 8. Arquitectura técnica objetivo (no implementada todavía)

```text
Browser: Next.js + TypeScript + Tailwind
    ↓ HTTPS
API / Server Actions (autorización y validación)
    ├── Supabase Auth: identidades y roles
    ├── Postgres: servicios, horarios, reservas
    ├── Supabase Storage: fotos permitidas y objetos privados
    ├── Notificaciones: emails / mensajes con opt-in
    └── Motor IA (fase 2): análisis opcional + simulación autorizada
```

**Despliegue sugerido:** Vercel, con variables de entorno separadas para staging y producción. No exponer service-role keys de Supabase en cliente. Verificar repositorio existente antes de editar o implementar un proyecto nuevo.

### Modelo de datos inicial

- `tenants(id, name, slug, settings)` — cada barbería/negocio.
- `locations(id, tenant_id, name, address, timezone, published_hours)` — sucursales.
- `users(id, tenant_id, auth_user_id, role)` — relación entre cuenta y negocio.
- `barbers(id, tenant_id, user_id, display_name, bio, active)` — profesionales.
- `services(id, tenant_id, name, duration_minutes, price_clp, active)` — servicios oficiales.
- `barber_services(barber_id, service_id)` — especialidades permitidas.
- `working_hours(id, barber_id, weekday, start_local, end_local)` — turnos base.
- `time_off(id, barber_id, start_at, end_at)` — descansos, vacaciones y bloqueos.
- `appointments(id, tenant_id, location_id, barber_id, service_id, client_id, start_at, end_at, status)` — reservas transaccionales.
- `clients(id, tenant_id, auth_user_id, display_name, contact_preferences)` — clientes.
- `portfolio_items(id, tenant_id, barber_id, asset_id, visibility, consent_id)` — obra pública autorizada.
- `style_profiles(id, client_id, preferences, consent_id)` — preferencias opcionales.
- `style_assets(id, client_id, storage_path, retention_until, consent_id)` — fotografías privadas.
- `style_recommendations(id, client_id, generated_at, recommendation, provenance)` — sugerencias.
- `consent_events(id, subject_id, purpose, version, recorded_at, revoked_at)` — historial de permisos.
- `audit_events(id, tenant_id, actor_id, action, target_id, created_at)` — auditoría mínima.

Activar Row Level Security por `tenant_id` y por dueño de datos; probar denegación de acceso cruzado. Datos médicos, biométricos y atributos sensibles no deben inferirse ni almacenarse como parte de un simple asesor de cortes.

### Reglas críticas del motor de reservas

- Disponibilidad calculada como `horario del profesional - bloqueos - reservas existentes`.
- Duración por servicio + márgenes configurables.
- Confirmación atómica y protección contra carreras/dobles reservas; no confiar en los slots visibles en frontend.
- Políticas editables por negocio para anticipación mínima, máximo futuro y cancelación.
- Transiciones controladas: `pending → confirmed → completed | cancelled | no_show`.
- Recordatorios solo tras autorización y con proveedores configurados.

## 9. Estilo IA: alcance responsable

### MVP demostrativo (actual)

Cuestionario de preferencia visual y tiempo de mantenimiento, con sugerencias fijas. **No hay IA** ni carga de imágenes ni procesamiento personal.

### Fase premium real

1. Cliente concede consentimiento explícito y acotado para subir fotos.
2. Define objetivos: estilo que busca, tiempo de mantenimiento, largo, preferencias, experiencia con cortes anteriores.
3. Motor visual sugiere alternativas a partir de rasgos no sensibles relevantes para peluquería, sin diagnosticar ni inferir etnia, edad, condición clínica o identidad de la persona.
4. Muestra **por qué** recomienda cada estilo y su mantenimiento estimado.
5. Cuando exista herramienta de simulación, presenta resultados claramente rotulados «Simulación orientativa».
6. Barbero revisa factibilidad técnica y modera expectativas.
7. Usuario guarda o descarta voluntariamente cada resultado; controla acceso, conservación y borrado de fotos.

**Privacidad por diseño:** finalidad definida, mínima retención, enlaces privados de corta vida, consentimientos revocables, trazabilidad, revisión de permisos y política legal local antes de producción.

## 10. Criterios de aceptación del MVP

- La portada carga en móviles de 360 px sin scroll lateral ni elementos superpuestos.
- CTA de reserva disponible en menos de dos interacciones desde la portada.
- El catálogo muestra precios, duración y servicios reales aprobados.
- Solo se muestran horarios reservables, obtenidos desde servidor y no inventados.
- Una reserva concurrente no puede confirmarse dos veces para el mismo barbero y franja.
- Agenda administrable, profesional asignado, zona horaria de Chile bien aplicada.
- Fotos de clientes privadas por defecto; publicación explícitamente autorizada.
- Navegación por teclado, labels, estados de error y foco visible.
- Imagen optimizada; objetivo de Core Web Vitals: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 en percentil 75, medidos en dispositivos reales.
- Sin duplicación de clientes ni mezcla de datos entre negocios.
- Enlaces y dirección verificados, sitemap, metadatos sociales y marcado `LocalBusiness` con datos auténticos.

### Verificaciones hechas sobre esta entrega

- Archivos estáticos incluidos y referenciados.
- Revisión sintáctica de `app.js` y consistencia de referencias en `index.html`.
- **No** se logró una prueba end-to-end ni una captura real en Chromium debido a un bloqueo del navegador de este entorno. Verificar manualmente en desktop y móvil antes de presentarla como final.

## 11. Etapas de construcción

**Sprint 0 — demo privada (entrega presente):** identidad, sitio navegable, fotos reales recortadas, filtros, consulta sin reserva, Style Lab ilustrativo.

**Sprint 1 — MVP de agenda:** proyecto Next.js, roles, catálogos oficiales, profesionales, horarios/feriados, reservas transaccionales, panel y notificaciones básicas.

**Sprint 2 — personalización y CRM:** perfiles con consentimiento, estilos favoritos, notas del barbero, historial, permisos y eliminación.

**Sprint 3 — IA Premium:** carga segura, evaluación de estilo no diagnóstica, sugerencias explicadas, vistas previas visuales, revisión profesional y pago/membresías si el negocio valida el modelo.

**Sprint 4 — producto B2B:** configuración multi-barbería, dominios, branding por negocio, soporte, facturación, auditoría y analítica.

## 12. Decisiones necesarias antes de habilitar producción

1. Confirmar comuna de José Miguel Carrera 315 y pin de Maps correcto.
2. Obtener servicios, precios, duración y reglas de agenda verdaderos.
3. Confirmar nombres, biografías y fotos autorizadas de cada profesional.
4. Pedir logotipo original en SVG/PNG y fotos originales con permiso de publicación.
5. Definir propietario de dominio, cuentas de Vercel/Supabase e Instagram.
6. Elegir si el contacto inicial será Instagram/WhatsApp o un sistema de reservas 100% integrado.
7. Decidir esquema de membresías y consentimiento antes de activar IA.

---

**Nota:** esta es una especificación para desarrollo, no una auditoría legal ni una afirmación de que las funciones futuras estén implementadas.
