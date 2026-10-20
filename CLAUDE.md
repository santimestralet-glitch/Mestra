## Qué es esto

Landing de Victoria Moda Circular, una feria de ropa de segunda mano en Mar del
Plata. El único objetivo de la página es que alguien toque el botón de WhatsApp
por una prenda concreta.

Para el contexto completo —decisiones de diseño, trampas conocidas, qué quedó
pendiente— usá la skill `victoria`.

## Reglas de este proyecto

- Sitio estático: sin build y **sin una sola dependencia**. No agregues ninguna;
  si hace falta algo (un ZIP, un Excel), se escribe a mano.
- La única excepción es `api/publicar.mjs`, una función que escribe el
  `datos.json` en GitHub para que el panel pueda publicar solo. Se agregó porque
  la regla anterior —"el panel no publica"— hacía que la dueña marcara una prenda
  vendida, lo viera en su pantalla y el sitio siguiera mostrándola disponible.
  Pasó tres veces. La función no usa dependencias: `fetch` y nada más.
- El panel publica el `datos.json`, **pero no las fotos**. Las fotos nuevas
  siguen yendo por el `fotos.zip` a mano. Avisá siempre que queden pendientes.
- Los dos secretos (`CLAVE_PUBLICAR` y `GITHUB_TOKEN`) viven en las variables de
  entorno de Vercel. Nunca en el repo, nunca en el `datos.json` —ese archivo lo
  sirve el sitio y lo lee cualquiera— y nunca en un commit.
- El oro es estructura (filetes, marcas, números), nunca relleno grande.
- Las reglas de CSS nuevas van después de la que quieren pisar: un media query
  no suma especificidad.
- Si tocás colores, medí el contraste en el navegador. `.buy-btn` tiene
  transición, así que medir justo después de cambiar de tema da un valor falso.
- Los commits explican por qué, no sólo qué.
