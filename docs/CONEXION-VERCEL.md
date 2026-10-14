# Conexión Vercel — 14 de octubre de 2026

Conexiones comprobadas para Gotech (gotech2), proyecto barberia-imperio-demo:

- Plugin Vercel, namespace mcp__codex_apps__vercel: list_teams devuelve Gotech y get_project devuelve prj_3Ld8gNluFn6vY7XEd2AKPOvzl2hQ.
- CLI Vercel: project inspect confirma el proyecto y propietario Gotech. Usar vercel.cmd, --scope gotech2 y --global-config C:/Users/Acer/Documents/Codex/2026-10-14/files-mentioned-by-the-user-especificacion/work/vercel-auth. No mostrar archivos de credenciales ni tokens.
- MCP manual duplicado, namespace mcp__vercel: OAuth terminó correctamente, pero el acceso a Gotech continuó fallando con 403. Se desactivó de forma reversible mediante enabled=false en C:/Users/Acer/.codex/config.toml; no se eliminó configuración ni se cambió el proyecto Vercel.

Usar el plugin y la CLI comprobados; no iniciar una nueva autorización del MCP duplicado para cada fase. Solo solicitar intervención si una conexión utilizada falla y no existe alternativa autorizada que funcione. La app puede conservar herramientas del servidor desactivado hasta recargar su configuración; no usarlas.

Respaldo privado de configuración antes del cambio: C:/Users/Acer/.codex/config.before-vercel-dedup-20261014.toml. No subir ese respaldo ni archivos de autenticación al repositorio.

No se cambiaron variables, dominios, producción ni ajustes del proyecto. Fase 6 del rediseño aún requiere autorización del usuario.
