# Victoria — Moda Circular

Landing page de la feria de ropa circular. Sitio estático, sin build, sin dependencias.

## Archivos

| Archivo | Qué es | ¿Se toca? |
|---|---|---|
| `index.html` | El diseño y toda la lógica | No |
| `datos.json` | El catálogo, contacto, reseñas y preguntas | Sí, lo genera el panel |
| `fotos/` | Las fotos de las prendas | Sí, las genera el panel |
| `vercel.json` | Le dice a Vercel que no cachee el catálogo | No |

Las fotos **no** van dentro del `datos.json`: van como archivos sueltos en `fotos/`, y
el JSON guarda sólo la ruta (`"fotos/v-101-a3f9.jpg"`). Así el catálogo pesa unos pocos
KB, las imágenes las cachea el CDN y cargan en paralelo.

El campo `fotos` también acepta una URL completa, por si alguna imagen está alojada afuera.

## Cómo actualizar el catálogo

1. Abrí el sitio y tocá **"Soy la organizadora"** abajo de todo.
2. Editá lo que quieras: prendas, fotos, información, reseñas, preguntas.
3. Pestaña **Publicar**:
   - **Descargar fotos.zip** (si agregaste fotos nuevas) y descomprimilo.
   - **Descargar datos.json**.
4. En GitHub, **Add file → Upload files**: arrastrá el `datos.json` y la carpeta `fotos`.
   Confirmá con **Commit changes**.
5. Vercel redespliega solo en menos de un minuto.

Usá **Upload files**, no el ícono del lápiz: GitHub no deja editar archivos grandes
en el navegador, y nunca deja subir imágenes por esa vía.

Los cambios del panel se guardan en tu navegador mientras trabajás, pero **no llegan
al sitio hasta que subís los archivos**.

## Notas

- Las fotos se comprimen solas a 620 px de lado mayor (unos 20–30 KB cada una).
- Una prenda cuya foto todavía no subiste se ve con el rayado de "foto en camino";
  no queda rota.
- Abrir `index.html` con doble clic muestra un catálogo de respaldo, no el `datos.json`:
  el navegador bloquea leer archivos vecinos desde `file://`. Es normal y no pasa online.
- No hay base de datos ni backend. Las ventas se coordinan por WhatsApp.
