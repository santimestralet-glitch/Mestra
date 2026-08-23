# Victoria — Moda Circular

Landing page de la feria de ropa circular. Sitio estático, sin build, sin dependencias.

## Archivos

| Archivo | Qué es | ¿Se toca? |
|---|---|---|
| `index.html` | El diseño y toda la lógica | No |
| `datos.json` | El catálogo, los datos de contacto, reseñas y preguntas | Sí, lo genera el panel |
| `vercel.json` | Le dice a Vercel que no cachee el catálogo | No |

## Cómo actualizar el catálogo

1. Abrí el sitio y tocá **"Soy la organizadora"** abajo de todo.
2. Editá lo que quieras: prendas, fotos, información, reseñas, preguntas.
3. Pestaña **Publicar** → **Descargar datos.json**.
4. Subí ese archivo al repositorio, reemplazando el que está.
   - Por la web de GitHub: entrá al repo → clic en `datos.json` → ícono del lápiz →
     borrá el contenido, pegá el nuevo → **Commit changes**.
   - O arrastrá el archivo con **Add file → Upload files**.
5. Vercel redespliega solo en menos de un minuto.

Los cambios que hacés en el panel se guardan en tu navegador mientras trabajás,
pero **no llegan al sitio hasta que subís el `datos.json`**.

## Notas

- Las fotos se comprimen solas a 620 px de lado mayor. El panel te muestra el peso
  total del catálogo; conviene mantenerlo por debajo de 3000 KB.
- Abrir `index.html` con doble clic muestra un catálogo de respaldo, no el `datos.json`:
  el navegador bloquea leer archivos vecinos desde `file://`. Es normal y no pasa online.
- No hay base de datos ni backend. Las ventas se coordinan por WhatsApp.
