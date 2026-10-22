# Boost F1

Medio independiente de noticias y análisis de Fórmula 1, en español. Diseño oscuro con estética racing (negro / carbón + acento `#E10600`).

Boost F1 no está afiliado a Formula 1®, Formula One Management (FOM), la FIA ni a ningún equipo.

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
├── content/articles/     # Artículos JSON
├── src/
│   ├── app/              # Rutas App Router
│   ├── components/       # UI (Header, Hero…)
│   └── lib/              # Artículos, standings, tipos
├── railway.toml          # build y start para Railway
├── wrangler.jsonc        # Worker de Cloudflare (OpenNext)
├── open-next.config.ts
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
| `/quienes-somos`             | Quiénes somos                            |
| `/sitemap.xml`               | Sitemap generado                     |
| `/robots.txt`                | Robots                               |

## Cómo añadir un artículo

1. Crea un archivo JSON en `content/articles/`, por ejemplo `mi-articulo.json`.
2. Usa esta forma:

```json
{
  "slug": "mi-articulo",
  "title": "Título en español",
  "excerpt": "Resumen corto para las tarjetas.",
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
6. Reinicia o recarga `npm run dev`. Los JSON se importan al compilar, así que el listado no depende del disco en el servidor.

## Datos del sitio

- Clasificación 2026 (tras el GP de Azerbaiyán): `src/lib/standings.ts`
- Próxima carrera / countdown: `src/lib/races.ts`

## Despliegue en Railway

El repositorio [SDK432/boost-f1](https://github.com/SDK432/boost-f1) sigue pudiendo desplegarse en Railway. `railway.toml` en la raíz define:

- build: `npm run build` (sin `WORKERS_CI`, ejecuta `next build`)
- start: `npm run start` (`next start` en `0.0.0.0`; Railway inyecta `PORT`)

Conecta el repo de GitHub en Railway (rama `main`, directorio raíz). Opcional: define `NEXT_PUBLIC_SITE_URL` con el dominio público (sitemap, Open Graph y robots).

## Despliegue en Cloudflare Workers

Workers Builds (proyecto `boost-f1`), directorio raíz, rama de producción `main`. El build de Cloudflare define `WORKERS_CI=1`, y `npm run build` ejecuta entonces `opennextjs-cloudflare build`.

| Campo del dashboard | Valor |
|---------------------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Root directory | vacío (raíz del repo) |

Variable de **build** (no basta con definirla solo en runtime; Next la incrusta al compilar):

- `NEXT_PUBLIC_SITE_URL` = `https://boostf1.com`

No hay más variables. El id de Google Analytics está en el código.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Contenido local en JSON (sin base de datos)
