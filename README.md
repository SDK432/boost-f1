# Boost F1

Medio editorial de demostración sobre Fórmula 1, en español. **Noticias y análisis de Fórmula 1.** Diseño oscuro con estética racing (negro / carbón + acento Ferrari `#E10600`).

> **Aviso:** No estamos afiliados a la FIA ni a Formula One Management. Los artículos, pilotos, equipos y clasificaciones son contenido ficticio de muestra.

## Requisitos

- Node.js 20.9+
- npm

## Arranque rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

| Comando           | Descripción                |
|-------------------|----------------------------|
| `npm run dev`     | Servidor de desarrollo     |
| `npm run build`   | Build de producción        |
| `npm run start`   | Servir el build            |
| `npm run lint`    | ESLint                     |

## Estructura

```
.                         # raíz del repo (SDK432/boost-f1)
├── content/articles/     # Artículos JSON (contenido demo)
├── src/
│   ├── app/              # Rutas App Router
│   ├── components/       # UI (Header, AdSlot, Hero…)
│   └── lib/              # Artículos, standings, tipos
├── railway.toml          # build y start para Railway
├── package.json
└── README.md
```

Marca visible del sitio: **Boost F1**.

### Páginas

| Ruta                         | Descripción                          |
|------------------------------|--------------------------------------|
| `/`                          | Home: hero, grid, standings, countdown, newsletter |
| `/articulo/[slug]`           | Detalle de artículo                  |
| `/categorias`                | Índice de categorías                 |
| `/categorias/[categoria]`    | Noticias / Análisis / Resultados / Opinión |
| `/quienes-somos`             | About honesto (sin afiliación oficial) |
| `/sitemap.xml`               | Sitemap generado                     |
| `/robots.txt`                | Robots                               |

## Cómo añadir un artículo

1. Crea un archivo JSON en `content/articles/`, por ejemplo `mi-articulo.json`.
2. Usa esta forma:

```json
{
  "slug": "mi-articulo",
  "title": "Título en español",
  "excerpt": "Resumen corto para tarjetas y SEO.",
  "category": "noticias",
  "author": "Tu Nombre",
  "date": "2026-09-25",
  "readingMinutes": 5,
  "featured": false,
  "coverGradient": "from-red-950 via-neutral-900 to-black",
  "coverPattern": "carbon",
  "body": [
    "Primer párrafo…",
    "Segundo párrafo…"
  ]
}
```

3. `category` debe ser una de: `noticias` | `analisis` | `resultados` | `opinion`.
4. `coverPattern`: `carbon` | `stripes` | `grid` | `chequered` | `speed` | `circuit`.
5. Pon `"featured": true` en un solo artículo para el hero de la home.
6. Reinicia o recarga `npm run dev`; el listado se lee del sistema de archivos.

## Placeholders de AdSense

Los componentes `AdSlot` muestran banners etiquetados **"Espacio publicitario"**.

- Ubicaciones: cabecera (layout), lateral (home / artículo), dentro del artículo, categoría.
- **No** incluyen IDs inventados de AdSense.
- Para activar anuncios reales:
  1. Crea/aprueba tu cuenta en [Google AdSense](https://www.google.com/adsense/).
  2. Sustituye el interior de `src/components/AdSlot.tsx` por el snippet oficial (`<ins class="adsbygoogle">…</ins>` + script).
  3. Añade el script de AdSense en `src/app/layout.tsx` (o con `next/script`).

## Datos demo estáticos

- Clasificación: `src/lib/standings.ts`
- Próxima carrera / countdown: `src/lib/races.ts` (fecha ISO de ejemplo 2026)

## Despliegue en Railway

El repositorio [SDK432/boost-f1](https://github.com/SDK432/boost-f1) está listo para Railway. `railway.toml` en la raíz define:

- build: `npm run build`
- start: `npm run start` (`next start` en `0.0.0.0`; Railway inyecta `PORT`)

Conecta el repo de GitHub en Railway (rama `main`, directorio raíz). Opcional: define `NEXT_PUBLIC_SITE_URL` con el dominio público (sitemap, Open Graph y robots).

## Próximos pasos

1. **Dominio + AdSense:** verificar el sitio y sustituir los placeholders. No hay IDs de AdSense inventados.
2. **Contenido real:** reemplazar JSON demo por CMS (Sanity, Contentlayer, MDX) o API propia.
3. **Automatización futura (opcional):** feeds oficiales, alertas de carrera, newsletter real (Mailchimp/Buttondown). Este proyecto no hace scraping de sitios de F1.
4. **Analytics:** Google Analytics 4 o Plausible cuando haya tráfico.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Contenido local en JSON (sin base de datos)

## Licencia del demo

Código del sitio libre para uso de Rick Aules. El contenido de muestra es original y ficticio; no copies textos de medios reales.
