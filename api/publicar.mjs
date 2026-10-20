/* Publica el datos.json en GitHub, que es lo que hace que el sitio se
   actualice solo.

   Existe porque el panel guardaba nada más que en el navegador y nadie se
   enteraba de que el cambio no había salido: la organizadora marcaba una
   prenda vendida, lo veía en su pantalla, y el sitio la seguía mostrando
   disponible. Pasó tres veces antes de escribir esto.

   Dos secretos, los dos como variables de entorno en Vercel y ninguno en el
   repo:
     CLAVE_PUBLICAR  la que escribe la organizadora una sola vez
     GITHUB_TOKEN    token acotado al contenido de este repo

   La clave de publicar es distinta de la que abre el panel, a propósito: el
   hash de esa viaja dentro de datos.json y lo puede leer cualquiera desde
   internet. Si fueran la misma, romper una sería poder escribir el sitio.

   Esto NO sube fotos: solo el datos.json. Las fotos nuevas siguen yendo por
   el fotos.zip, y el panel avisa cuando quedan pendientes. */

const REPO = "santimestralet-glitch/Mestra";
const RAMA = "main";
const ARCHIVO = "datos.json";

/* Comparación en tiempo constante: no le regala a quien prueba claves la
   información de cuántos caracteres acertó. */
function mismaClave(a, b) {
  const A = new TextEncoder().encode(String(a ?? ""));
  const B = new TextEncoder().encode(String(b ?? ""));
  if (A.length !== B.length) return false;
  let dif = 0;
  for (let i = 0; i < A.length; i++) dif |= A[i] ^ B[i];
  return dif === 0;
}

/* Un datos.json roto deja el catálogo vacío para todo el mundo, así que no se
   publica nada que no tenga forma de catálogo. Es la última red antes de
   escribir en producción. */
function revisar(d) {
  if (!d || typeof d !== "object" || Array.isArray(d)) return "El cuerpo no es un objeto.";
  if (!Array.isArray(d.prendas)) return "Falta la lista de prendas.";
  if (!d.config || typeof d.config !== "object") return "Falta la configuración.";
  if (!d.config.whatsapp) return "Falta el WhatsApp en la configuración.";
  for (const p of d.prendas) {
    if (!p || typeof p !== "object") return "Hay una prenda que no es un objeto.";
    if (!p.ref || !p.nombre) return "Hay una prenda sin referencia o sin nombre.";
    if (typeof p.precio !== "number" || !Number.isFinite(p.precio) || p.precio < 0) {
      return `La prenda ${p.ref} no tiene un precio válido.`;
    }
  }
  const refs = d.prendas.map((p) => p.ref);
  if (new Set(refs).size !== refs.length) return "Hay dos prendas con la misma referencia.";
  return null;
}

/* btoa en vez de Buffer para no depender de en qué runtime corra esto. */
function aBase64(texto) {
  const bytes = new TextEncoder().encode(texto);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

const respuesta = (estado, cuerpo) =>
  new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export default {
  async fetch(request) {
    if (request.method !== "POST") return respuesta(405, { error: "Solo POST." });

    const token = process.env.GITHUB_TOKEN;
    const claveReal = process.env.CLAVE_PUBLICAR;
    if (!token || !claveReal) {
      return respuesta(500, {
        error: "Al sitio todavía le faltan las variables de entorno para publicar.",
      });
    }

    let cuerpo;
    try {
      cuerpo = await request.json();
    } catch {
      return respuesta(400, { error: "El cuerpo no es JSON." });
    }

    if (!mismaClave(cuerpo && cuerpo.clave, claveReal)) {
      return respuesta(401, { error: "La clave para publicar no es correcta." });
    }

    const problema = revisar(cuerpo.datos);
    if (problema) return respuesta(400, { error: problema });

    const api = `https://api.github.com/repos/${REPO}/contents/${ARCHIVO}`;
    const cabeceras = {
      authorization: `Bearer ${token}`,
      accept: "application/vnd.github+json",
      "user-agent": "victoria-moda-circular",
      "x-github-api-version": "2022-11-28",
    };

    /* GitHub pide el sha de lo que hay ahora para no dejar pisar a ciegas:
       si alguien publicó en el medio, el PUT falla en vez de borrarle el
       trabajo. */
    let sha;
    try {
      const actual = await fetch(`${api}?ref=${RAMA}`, { headers: cabeceras });
      if (!actual.ok) {
        return respuesta(502, {
          error: `GitHub no devolvió el catálogo actual (${actual.status}).`,
        });
      }
      sha = (await actual.json()).sha;
    } catch {
      return respuesta(502, { error: "No se pudo hablar con GitHub." });
    }

    const cuantas = cuerpo.datos.prendas.length;
    const vendidas = cuerpo.datos.prendas.filter((p) => p.venta === "vendida").length;
    const texto = JSON.stringify(cuerpo.datos, null, 2) + "\n";

    try {
      const puesto = await fetch(api, {
        method: "PUT",
        headers: { ...cabeceras, "content-type": "application/json" },
        body: JSON.stringify({
          message:
            `Catalogo actualizado desde el panel: ${cuantas} prendas, ${vendidas} vendidas\n\n` +
            `Publicado por la organizadora desde el sitio, sin pasar por la compu.`,
          content: aBase64(texto),
          sha,
          branch: RAMA,
        }),
      });
      if (!puesto.ok) {
        if (puesto.status === 409) {
          return respuesta(409, {
            error:
              "Alguien publicó un cambio mientras editabas. Recargá la página y volvé a marcar lo que falte.",
          });
        }
        return respuesta(502, { error: `GitHub rechazó el cambio (${puesto.status}).` });
      }
    } catch {
      return respuesta(502, { error: "No se pudo escribir en GitHub." });
    }

    return respuesta(200, { ok: true, prendas: cuantas, vendidas });
  },
};
