# Contractor Sites — Sitios Web de Contratistas
> sites.sistemasparacontratistas.com | Astro 6 SSR + React 19 | VPS Docker
> Última actualización: 2026-03-26

## Qué es
El producto "sitio web" que se le vende a cada contratista. Página premium con chat AI, estimaciones, galería, servicios. Es un template Astro que se clona y adapta por contratista.

## Qué NO es
NO es la webapp SaaS (eso es `spc-app/`). NO es el sitio de marketing (eso es `sistemasparacontratistas/`). NUNCA mezclar.

## Páginas por contratista
- `/[slug]/` — Home (hero, quoter, before/after, fear defusers, process, reviews, services, CTA)
- `/[slug]/services` — Todos los servicios + FAQs
- `/[slug]/gallery` — Before/after slider + grid de proyectos
- `/[slug]/contact` — 3 opciones de contacto (chat, form, llamada)

## Data actual
Hardcoded en `src/data/demo.ts` (Rodriguez Concrete). Para escalar a múltiples contratistas, necesita hacerse dinámico.

## Deploy
Docker multi-stage build. Port 4321.
```bash
# Build + run:
docker build -t contractor-sites .
docker run -p 4321:4321 contractor-sites
```

## Depende de
- **spc-app** APIs (cross-origin):
  - `POST app.sistemasparacontratistas.com/api/chat`
  - `POST app.sistemasparacontratistas.com/api/estimate-request`
  - `POST app.sistemasparacontratistas.com/api/contractor-site/[slug]/lead`

## Archivos clave
- `src/pages/[slug]/index.astro` — Página home (441 líneas, lo principal)
- `src/data/demo.ts` — Datos del contratista demo (135 líneas)
- `src/styles/global.css` — Design system completo (268 líneas)
- `src/components/InlineChat.tsx` — Chat inline (dark, home page)
- `src/components/ChatWidget.tsx` — Chat bubble (light, sub-páginas)
- `src/components/ContactForm.tsx` — Formulario de contacto
- `src/components/BeforeAfterSlider.tsx` — Slider interactivo
- `src/components/GalleryGrid.tsx` — Grid filtrable de proyectos
- `Dockerfile` — Build de producción
