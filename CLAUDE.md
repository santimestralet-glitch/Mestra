## Qué es esto

Landing de Victoria Moda Circular, una feria de ropa de segunda mano en Mar del
Plata. El único objetivo de la página es que alguien toque el botón de WhatsApp
por una prenda concreta.

Para el contexto completo —decisiones de diseño, trampas conocidas, qué quedó
pendiente— usá la skill `victoria`.

## Reglas de este proyecto

- Sitio estático: sin build, sin backend, sin dependencias. No agregues ninguna.
- El panel de organizadora no publica nada. Genera archivos que hay que subir a
  GitHub a mano. Avisá siempre que un cambio todavía no está publicado.
- El oro es estructura (filetes, marcas, números), nunca relleno grande.
- Las reglas de CSS nuevas van después de la que quieren pisar: un media query
  no suma especificidad.
- Si tocás colores, medí el contraste en el navegador. `.buy-btn` tiene
  transición, así que medir justo después de cambiar de tema da un valor falso.
- Los commits explican por qué, no sólo qué.
