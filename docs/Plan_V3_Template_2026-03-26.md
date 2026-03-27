# Plan: V3 — Template del Futuro

## Context
V2 ya tiene buen copy, datos reales, y 5 efectos wow (mesh gradient, spotlight, cinema hero, 3D tilt, paleta dinámica). V3 lleva esto al siguiente nivel con animaciones estilo Apple, smooth scroll, y elementos IA visuales. V2 no se toca.

## Estructura
```
src/pages/
├── [slug]/       ← v1 (NO TOCAR)
├── v2/[slug]/    ← v2 (NO TOCAR)
└── v3/[slug]/    ← v3 NUEVO
```

## Dependencias nuevas
```bash
npm install gsap lenis
```
- GSAP: 100% gratis (Webflow lo liberó). ScrollTrigger, SplitText incluidos.
- Lenis: smooth scroll. MIT license.

## Features v3 (ordenadas por implementación)

### Fase 1: Fundación (3-4 hrs)
**1A. Copiar v2 a v3** — copiar pages, ajustar imports
**1B. Instalar GSAP + Lenis**
**1C. Astro View Transitions** — 2 líneas en BaseLayout-v3
- `import { ViewTransitions } from 'astro:transitions'`
- `<ViewTransitions />` en el `<head>`
- `transition:name` en elementos compartidos (nav logo, page titles)
- Las 4 páginas se morphean entre sí como app nativa
**1D. Lenis smooth scroll** — inicializar en layout v3
- `new Lenis({ lerp: 0.1, smoothWheel: true })`
- Sync con GSAP ticker
- Reinicializar en `astro:page-load` (ViewTransitions lifecycle)

### Fase 2: Scroll Storytelling (6-8 hrs)
**2A. Word-by-word text reveal** — los fear defusers se iluminan palabra por palabra al scrollear
- Componente React `<ScrollRevealText>`
- CSS `animation-timeline: view()` (Chrome/Edge nativo)
- Fallback GSAP ScrollTrigger + SplitText para Safari
- Aplicar en: fear defusers detail text, meet contractor text, subheadlines

**2B. GSAP ScrollTrigger reemplaza JS scroll listeners**
- El before/after, process, counters — todos migran a GSAP ScrollTrigger
- `scrub: true` para animación continua ligada al scroll (no binary show/hide)
- Pin sections where needed
- Performance: GSAP maneja throttling y GPU compositing automáticamente

### Fase 3: AI Visual (6-8 hrs)
**3A. AI Orb** — reemplazar el badge "Online estimator" con un orb animado
- 3 divs con gradientes superpuestos + blur + mix-blend-mode
- Estados: `idle` (respira lento), `thinking` (pulsa rápido), `responding` (ondula)
- Colores del contractor's accent/primary
- Click en el orb abre el chat
- Componente React: `<AIOrb state={chatState} accent={accent} />`

**3B. Chat word-by-word fade-in** — cuando la IA responde, cada palabra aparece con fade suave
- Modificar InlineChat-v3 para wrappear cada palabra en `<span>` con staggered animation
- Crea la sensación de "la IA está pensando cada palabra"

### Fase 4: Polish (4-6 hrs)
**4A. Magnetic CTA buttons** (desktop)
- Botones se "atraen" hacia el cursor cuando se acerca (20px offset máximo)
- GSAP `gsap.to(btn, { x: dx*0.3, y: dy*0.3 })`

**4B. Page entrance curtain**
- Wipe del accent color al entrar (400ms)
- `clip-path: inset(0 0 0 0)` → `clip-path: inset(0 0 0 100%)`

**4C. Reviews marquee**
- Reviews scrollean horizontalmente en 2 filas (direcciones opuestas)
- Hover pausa el marquee
- Sensación de "pared de social proof"

**4D. Gallery lightbox con zoom**
- Click en foto → fullscreen con morph (ViewTransitions gratis)
- Swipe entre fotos en mobile

## Archivos a crear

| Archivo | Descripción |
|---------|-------------|
| `src/pages/v3/[slug]/index.astro` | Home v3 (copiado de v2 + GSAP + nuevos efectos) |
| `src/pages/v3/[slug]/services.astro` | Services v3 |
| `src/pages/v3/[slug]/gallery.astro` | Gallery v3 con lightbox |
| `src/pages/v3/[slug]/contact.astro` | Contact v3 |
| `src/layouts/BaseLayout-v3.astro` | Layout con ViewTransitions + Lenis |
| `src/components/Nav-v3.astro` | Nav con transition:name |
| `src/components/Footer-v3.astro` | Footer con transition:name |
| `src/components/InlineChat-v3.tsx` | Chat con word fade-in |
| `src/components/AIOrb.tsx` | Orb animado para el chat |
| `src/components/ScrollRevealText.tsx` | Word-by-word reveal |
| `src/components/ReviewMarquee.astro` | Marquee de reviews |

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `package.json` | Agregar gsap, lenis |
| `src/data/contractors.ts` | Agregar entradas para v3 slugs (o reusar v2 data) |

## Archivos que NO se tocan
- Todo en `src/pages/[slug]/` (v1)
- Todo en `src/pages/v2/[slug]/` (v2)
- `src/components/*` sin sufijo -v3
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css` (los estilos v3 van en BaseLayout-v3 o inline)

## Problemas potenciales

### P1: GSAP + Astro View Transitions
**Problema:** GSAP ScrollTrigger necesita reinicializarse cuando ViewTransitions hace client-side navigation.
**Solución:** Usar `astro:page-load` event para reinicializar ScrollTrigger y Lenis en cada navegación.

### P2: Lenis + mobile touch scroll
**Problema:** Lenis puede interferir con el scroll nativo en iOS.
**Solución:** `Lenis({ lerp: 0.1, smoothTouch: false })` — smooth en desktop, nativo en mobile.

### P3: GSAP ScrollTrigger + SSR
**Problema:** GSAP necesita el DOM. En SSR (Astro), no hay DOM durante build.
**Solución:** Solo importar GSAP en client-side scripts (`<script>` tags en Astro) o React islands con `client:load`. Nunca en frontmatter.

### P4: Bundle size
**Problema:** GSAP + Lenis agregan ~50KB gzipped al bundle.
**Solución:** Aceptable para el wow factor. GSAP se tree-shakes bien. Solo importar ScrollTrigger, no todo GSAP.

### P5: ViewTransitions + scroll-driven CSS animations
**Problema:** CSS `animation-timeline: view()` puede no persistir después de una View Transition.
**Solución:** Usar GSAP ScrollTrigger como primary, CSS scroll-timeline como progressive enhancement.

### P6: AI Orb performance en mobile
**Problema:** 3 blobs animados + blur = posible lag en mobile barato.
**Solución:** En mobile: reducir a 2 blobs, menos blur (8px vs 20px), o reemplazar con versión simplificada (solo pulso de color).

### P7: Reviews marquee accesibilidad
**Problema:** Contenido en movimiento constante puede ser problemático para usuarios con vestibular disorders.
**Solución:** `prefers-reduced-motion: reduce` → marquee estática (grid normal).

## Orden de ejecución por sesión

**Sesión actual (Fase 1 + 2):**
1. Paso 0: Guardar plan en docs/
2. Copiar v2 → v3 (ajustar imports, crear BaseLayout-v3)
3. npm install gsap lenis
4. ViewTransitions en BaseLayout-v3
5. Lenis en BaseLayout-v3
6. ScrollRevealText component
7. Migrar scroll animations a GSAP ScrollTrigger
8. Build + test + deploy

**Próxima sesión (Fase 3 + 4):**
9. AI Orb component
10. InlineChat-v3 con word fade-in
11. Magnetic buttons
12. Page curtain
13. Reviews marquee
14. Gallery lightbox
15. Auditoría final

## URLs resultantes
- v1: `/rodriguez-concrete` (no cambia)
- v2: `/v2/rodriguez-concrete` (no cambia)
- v3: `/v3/rodriguez-concrete` (nuevo)
- v3: `/v3/cross-construction` (nuevo)

## Verificación
1. v1 y v2 siguen funcionando idénticas
2. v3 tiene smooth scroll (Lenis)
3. Navegar entre páginas v3 morphea elementos (ViewTransitions)
4. Fear defusers text se ilumina palabra por palabra al scrollear
5. Scroll animations son fluidas y scrubbed (GSAP)
6. Build pasa sin errores
7. Mobile funciona sin Lenis smooth (nativo), sin magnetic buttons
8. `prefers-reduced-motion` respetado en todas las animaciones

### P8: GSAP SplitText puede no ser gratis
**Problema:** GSAP core + ScrollTrigger son gratis post-Webflow. Pero SplitText era un plugin de pago. No es seguro que esté incluido en el paquete npm gratis.
**Solución:** NO depender de SplitText. Hacer split manual: `text.split(' ').map(word => <span>)`. Es trivial en React y no necesita plugin.

### P9: Data compartida entre v2 y v3
**Problema:** ¿v3 usa los mismos data files o necesita nuevos?
**Solución:** v3 reutiliza exactamente los mismos data files (demo-v2.ts, demo-cross.ts) via `getContractor(slug)`. No hay cambio en el data layer. El slug es el mismo — solo cambia la ruta (`/v3/cross-construction` vs `/v2/cross-construction`).

### P10: Lenis necesita `window` — no existe en SSR
**Problema:** Astro renderiza en server. `new Lenis()` necesita DOM/window.
**Solución:** Inicializar Lenis SOLO dentro de `<script>` client-side en Astro, nunca en frontmatter. Verificar con `if (typeof window !== 'undefined')`.

### P11: GSAP ScrollTrigger + Lenis — memory leaks con ViewTransitions
**Problema:** Cada navegación con ViewTransitions ejecuta `astro:page-load`. Si ScrollTrigger y Lenis se re-crean sin limpiar los anteriores, se acumulan listeners y triggers fantasma.
**Solución:** En `astro:page-load`: primero `ScrollTrigger.getAll().forEach(t => t.kill())` y `lenis.destroy()`, luego re-crear todo. Pattern estándar documentado en GSAP forums.

### P12: Word fade-in en chat — 200 spans por respuesta
**Problema:** Cada palabra es un `<span>` animado. Una respuesta de 200 palabras = 200 DOM nodes con animación individual. Puede lagear en mobile.
**Solución:** Fade in por FRASE (split por `.` o `\n`), no por palabra. Máximo ~10-15 spans por respuesta. Si es streaming, animar cada chunk del SSE como unidad.

### P13: Reviews marquee con solo 3 reviews
**Problema:** Cross Construction tiene solo 3 reviews. El marquee se ve vacío con repetición obvia.
**Solución:** Duplicar reviews 4x para llenar el viewport (3 reviews × 4 = 12 items scrolleando). CSS `animation` con `translateX` en loop continuo. El usuario no nota la repetición si el scroll es suave y largo.

### P14: global.css @layer base (Tailwind v4)
**Problema:** CLAUDE.md dice que TODAS las reglas custom deben ir dentro de `@layer base`. CSS fuera de `@layer` siempre anula Tailwind.
**Solución:** Los estilos de v3 van en `<style is:global>` dentro de BaseLayout-v3.astro o inline en las páginas v3. NO tocar global.css. Los `@keyframes` se pueden definir fuera de `@layer` (son una excepción documentada).

### P15: AI Orb + InlineChat comunicación de estado
**Problema:** El Orb necesita saber si el chat está `idle`, `thinking`, o `responding`. Pero InlineChat es un React island independiente.
**Solución:** Usar custom DOM events. InlineChat-v3 emite `window.dispatchEvent(new CustomEvent('chat-state', { detail: 'thinking' }))`. El Orb escucha con `addEventListener('chat-state', ...)`. No necesitan estar en el mismo React tree.

### P16: 20 horas de trabajo en una sesión
**Problema:** Hacer las 4 fases en una sesión es mucho contexto acumulado. El riesgo de errores aumenta.
**Solución:** Commit + deploy después de cada fase. Si algo se rompe, podemos revertir a la fase anterior sin perder todo. Cada fase debe terminar con un estado funcional.

## Paso 0
Guardar plan en `contractor-sites/docs/Plan_V3_Template_2026-03-26.md`
