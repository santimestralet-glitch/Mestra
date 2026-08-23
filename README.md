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
4. Pasale los dos archivos a Claude. Los pone en la carpeta y los sube.
5. Vercel redespliega solo en menos de un minuto.

El repo está conectado: cada `git push` publica. Ya no hace falta subir nada
a mano por la web de GitHub.

Los cambios del panel se guardan en tu navegador mientras trabajás, pero **no llegan
al sitio hasta que los archivos están subidos**.

- Repo: `santimestralet-glitch/Mestra`
- Sitio: https://mestra-three.vercel.app

## La clave del panel

El botón "Soy la organizadora" pide una clave. En el `datos.json` no se guarda la
clave sino un resumen irreversible (SHA-256 pasado 25.000 veces), así que aunque
alguien lea el archivo no puede sacarla de ahí. Tras el tercer error fallido cada
intento nuevo espera el doble que el anterior, hasta 30 segundos.

Para cambiarla: panel → **Información** → **Cambiar la clave**. Empieza a valer en
el sitio recién cuando subís el `datos.json` nuevo.

Esto frena a un visitante curioso, no a alguien que sepa programar: como todo pasa
en el navegador, la puerta se puede saltear desde las herramientas de desarrollo.
No hace falta que aguante más que eso — el panel no toca el sitio, sólo arma los
archivos que después subís vos. **Lo que de verdad protege la página es tu cuenta
de GitHub.**

## Notas

- Las fotos se comprimen solas a 620 px de lado mayor (unos 20–30 KB cada una).
- Una prenda cuya foto todavía no subiste se ve con el rayado de "foto en camino";
  no queda rota.
- Abrir `index.html` con doble clic muestra un catálogo de respaldo, no el `datos.json`:
  el navegador bloquea leer archivos vecinos desde `file://`. Es normal y no pasa online.
- No hay base de datos ni backend. Las ventas se coordinan por WhatsApp.
