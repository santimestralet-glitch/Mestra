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
3. Pestaña **Publicar** → botón **Publicar al sitio**.
4. En menos de un minuto lo ven tus clientas.

La primera vez te va a pedir una **clave para publicar**. Se escribe una sola vez
y queda guardada en ese navegador. **No es la misma** que usás para entrar al
panel: esa abre la puerta, esta escribe en el sitio.

**Publicar no sube las fotos**, sólo el catálogo. Si agregaste prendas con fotos
nuevas, bajá también el **fotos.zip** y pasáselo a Santino; hasta que no estén
arriba, esas prendas se ven con el rayado de "foto en camino". El panel te avisa
cuando quedan pendientes.

Si publicar falla por lo que sea, el camino viejo sigue entero: **Descargar
datos.json** y pasárselo a Santino.

### Cómo funciona, por si algún día hay que tocarlo

El botón manda el catálogo a `api/publicar.mjs`, que verifica la clave contra
una guardada en Vercel y escribe el `datos.json` en GitHub. El push dispara el
redespliegue. Los dos secretos (`CLAVE_PUBLICAR` y `GITHUB_TOKEN`) son variables
de entorno de Vercel: no están en el repo ni en el `datos.json`.

- Repo: `santimestralet-glitch/Mestra`
- Sitio: https://victoriamodacircular.com

## Las ventas

En el panel hay una pestaña **Ventas** con el total de hoy, de la semana, del mes y
el histórico.

No hace falta cargar nada aparte: **cuando marcás una prenda como "vendida" en la
pestaña Prendas, la venta se anota sola** con la fecha de hoy y el precio del
catálogo. El botón "Cargar venta a mano" es sólo para lo que vendiste y no estaba
publicado.

El botón **Descargar Excel** baja un `.xlsx` de verdad, con dos hojas: una con
todas las ventas y otra con los totales por período, por mes y por categoría.

**Bajate el Excel seguido.** Las ventas se guardan **sólo en tu navegador**: no
viajan al sitio, no están en el `datos.json` y no las ve nadie más que vos. Eso es
a propósito —el `datos.json` lo puede abrir cualquiera desde internet, así que la
plata no puede vivir ahí—, pero tiene una consecuencia: si borrás los datos del
navegador o cambiás de computadora, **lo único que queda es el Excel que
descargaste**.

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
