# Experiencia de cliente: asesor, Mi ficha y equipo

Publicado el 14 de octubre de 2026. Tres páginas nuevas comparten el diseño urbano del home: `/asesor`, `/mi-ficha` y `/equipo`.

## Asesor de estilo (`/asesor`)

- Once preguntas: rostro, tipo, grosor y cantidad de cabello, entradas, remolinos, barba, tiempo de peinado, frecuencia de visita, día a día y estilo buscado.
- El motor (`assets/js/asesor-engine.js`) puntúa un catálogo cerrado de 12 cortes y entrega una ficha con tres recomendaciones (principal, alternativa y una para variar), afinidad, por qué conviene, cómo pedirlo al barbero, mantención, productos genéricos, qué evitar, sugerencia de barba y los dos cortes menos recomendados.
- La ficha se imprime o guarda como PDF, se copia como mensaje para Instagram y se puede guardar en Mi ficha.

### IA (apagada hasta que la actives)

`/api/asesor` redacta el resumen y las explicaciones con Claude. Mientras no esté activa, responde `{ ia: false }` y la página muestra el informe del motor, rotulado como "generado por reglas".

Para activarla, en Vercel → proyecto `barberia-imperio-demo` → Settings → Environment Variables:

| Variable | Valor |
|---|---|
| `ANTHROPIC_API_KEY` | Tu clave de la consola de Anthropic (tiene costo por uso) |
| `ASESOR_IA_ENABLED` | `true` |
| `ASESOR_MODEL` | Opcional; por defecto `claude-haiku-5-5` |

Luego vuelve a desplegar. Límites de diseño: la IA solo explica los cortes que ya eligió el motor (no puede inventar otros), no recibe fotos, nombres ni texto libre del cliente, y su respuesta se valida antes de mostrarse. Hay un límite de 20 consultas por minuto por IP en cada instancia; si necesitas más control de costos, fija un tope de gasto en la consola de Anthropic.

## Mi ficha (`/mi-ficha`)

- Perfil de estilo (el mismo cuestionario), nombre opcional y registro de cada corte: fecha, corte del catálogo, barbero, nota de 1 a 5 y comentario.
- Informe detallado: número de visitas, intervalo promedio, nota media, corte más repetido, próxima visita sugerida y recomendaciones que suben lo que le gustó al cliente y bajan lo que calificó con 2 o menos.
- **Se guarda solo en el navegador del cliente** (`localStorage`, clave `imperio.cliente.v1`). No hay cuentas ni base de datos: si borra el navegador o cambia de teléfono, la ficha no se recupera. El cliente puede borrar todo con un botón.
- Para cuentas reales e historial visible para la barbería hace falta un backend con autenticación (la rama local `fase-2-reservas` ya tiene un diseño con Supabase) y una política de privacidad conforme a la Ley 19.628. No se activó: requiere tu autorización, un proyecto de base de datos y datos reales.

## Equipo (`/equipo`)

Los perfiles se cargan desde `data/equipo.json`. Hoy está vacío, así que la página muestra un **perfil de muestra** rotulado como tal, sin nombres ni fotos inventadas. Para publicar a un barbero, agrega un objeto y marca `publicado: true`:

```json
[
  {
    "id": "nombre-apellido",
    "publicado": true,
    "nombre": "Nombre Apellido",
    "rol": "Barbero",
    "bio": "Una o dos frases.",
    "especialidades": ["Degradados", "Diseños"],
    "desde": 2021,
    "horario": "Martes a sábado, tarde",
    "foto": "/assets/equipo/nombre-apellido.webp",
    "trabajos": ["/assets/equipo/nombre-apellido-1.webp"],
    "instagram": "https://www.instagram.com/usuario/"
  }
]
```

Al publicar barberos, el campo "Barbero" de Mi ficha pasa a ser una lista con sus nombres. Solo publica retratos y trabajos con autorización de cada persona.

## Verificación

- axe-core WCAG 2.0/2.1/2.2 A y AA: sin infracciones en las tres páginas y el home, a 390 y 1440 px. Sin desbordamiento horizontal.
- Recorrido probado: cuestionario completo → informe → guardar en Mi ficha → tres visitas → informe con estadísticas y recomendaciones ajustadas por historial.
