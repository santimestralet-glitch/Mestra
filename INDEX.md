# Índice del proyecto

Mapa de Victoria Moda Circular para ubicarse rápido. Los números de línea son
aproximados: si editaste `index.html`, verificá con `grep -n`.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Todo: diseño, lógica y panel. ~1660 líneas, una sola pieza |
| `datos.json` | Catálogo, contacto, reseñas, preguntas y el hash de la clave. Es lo que se edita |
| `fotos/` | Fotos de prendas (`v-1NN-*.jpg`) y del local (`local-*.jpg`) |
| `vercel.json` | Headers de no-cache para `datos.json` e `index.html` |
| `README.md` | Cómo actualizar el catálogo |
| `CLAUDE.md` | Reglas del proyecto (se cargan solas) |

Repo `santimestralet-glitch/Mestra` → Vercel → https://mestra-three.vercel.app
y https://victoria-moda-circular.vercel.app. `git push` publica solo.

## index.html — bloques CSS

| Línea | Bloque |
|---|---|
| 24 | TOKENS (paleta crema/oro en `:root`, dark en dos estados) |
| 60 | BASE (reset, tipografías, `.wrap`, `.label`) |
| 84 | MASTHEAD (nav, marca, toggle de tema) |
| 97 | HERO (título, etiqueta de percha, ficha de feria) |
| 150 | SECCIONES / 157 TOOLBAR (búsqueda, chips) |
| 171 | GRID / CARD (tarjeta de prenda, badges, precio) |
| 232 | PASOS / 239 RESEÑAS / 251 INFO |
| 257 | BANDA (`#dar`, recepción de ropa) |
| 268 | FAQ / 280 FOOTER + barra móvil |
| ~316 | `.local-strip` (fotos del local) y `.section.has-bg` (fondo tenue) |
| ~330 | `.clave` (puerta de contraseña) |

## index.html — secciones HTML

| Línea | id | Qué |
|---|---|---|
| 404 | — | `<header>` masthead |
| 425 | `#top` | hero |
| 458 | `#prendas` | catálogo + toolbar |
| 487 | `#como-comprar` | pasos |
| 510 | `#resenas` | reseñas (oculta si no hay) |
| 524 | `#local` | "Pasá por el local" (3 fotos) |
| 538 | `#donde` | datos + fondo tenue |
| 545 | `#dar` | compra directa / crédito a cuenta |
| 557 | `#faq` | preguntas |
| 566 | — | footer |
| 590 | `#clave` | puerta de la clave |
| 611 | `#panel` | panel de organizadora |

## index.html — JavaScript

- **Datos**: `DATOS_DEFECTO` (~605, respaldo offline), `cargarDatos`, `srcDe` (1302)
- **Clave**: `sha256` (722), `hashClave` (764), `claveGuardada`, `mismoHash` (780),
  `abrirClave` (1119), `enviarClave`, `entrarComoAdmin` (1196), `esperaPorIntentos` (1114)
- **Utilidades**: `money`, `esc`, `waLink`, `lineas` (799-802)
- **Render público**: `renderTag` (869), `renderFeria` (878), `tarjeta` (897),
  `render` (944), `renderResenas`, `renderInfo`, `renderFaq`, `renderFooter`,
  `renderTodo` (1051)
- **Acciones**: `comprar` (1056), `compartir`, `toggleFav`
- **Ventas**: `ventas[]` en localStorage (`victoria:ventas`, nunca en `datos.json`),
  `fechaISO`/`hoyISO`/`lunesDeEstaSemana` (fecha local, no UTC), `registrarVenta`,
  `tabVentas`; el Excel lo arman `colLetra`, `celdaXml`, `hojaXml`, `armarExcel` y
  `descargarExcel`, reusando `armarZip` porque un `.xlsx` es un ZIP de XMLs
- **Panel**: `pintarPanel` (1212), `listaPrendas`, `formPrenda` (1240),
  `formInfo` (1343), `listaResenas`, `listaFaqs`, `tabPublicar` (1420),
  `achicar` (1320, redimensiona fotos), `datosLimpios` (1524)
- **ZIP a mano**: `crc32` (1465), `armarZip` (1476), `descargarZip`
- **Eventos**: delegación de `click` (~1600), `keydown`, arranque (~1650)

## datos.json — forma

`build`, `config` {whatsapp, instagram, direccion, comoLlegar, horarios[],
pagos[], envios[], feria{fecha,lugar,nota}, clave{sal,hash}}, `prendas[]`
(ref, nombre, categoria, talle, estado, precio, desc, fotos[], venta, nueva),
`resenas[]`, `faqs[]`.

Estados válidos: Como nuevo(4) · Muy bueno(3) · Bueno(2) · Con detalles(1).
Venta: disponible · reservada · vendida.
