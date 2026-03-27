# Plan: WOW Factor — Página del Futuro que WordPress No Puede Tocar

## Problema
La página actual funciona bien en copy y CRO, pero visualmente no hace que el contratista diga "wow." Parece un template dark bonito, no una página del futuro. Necesitamos que al abrirla, el contratista sienta que su WordPress es del pasado.

## Principio
No estamos compitiendo en colores ni layout — estamos compitiendo en EXPERIENCIA. Cosas que el contratista NUNCA ha visto en una página web. Cosas que su WordPress no puede hacer ni con 50 plugins.

## TOP 5 Features — Máximo WOW por hora de trabajo

### 1. Cursor Spotlight (1-2 horas) — "¿Por qué la página responde a mi mouse?"
Un gradiente radial sutil sigue el cursor por las secciones dark. Como una linterna suave. El contratista mueve el mouse y la página RESPONDE. Nunca vio esto en ningún sitio.
- **Técnico:** Un `<div>` con `radial-gradient` que sigue `--cursor-x`, `--cursor-y` via `mousemove`
- **Archivos:** `BaseLayout.astro` (div + script), `global.css` (estilos)
- **Mobile:** Deshabilitado (no hay cursor). Sin impacto negativo.

### 2. Hero Cinematic Entrance (2-3 horas) — "Esto parece una película"
En vez de fade-in básico, la página abre como una escena de cine:
- 0ms: Pantalla oscura
- 0-800ms: Imagen de fondo aparece con zoom-OUT (cámara retrocede revelando la escena)
- 400-1200ms: Texto entra con efecto blur→sharp (como cámara enfocando)
- 1000-1400ms: Botones CTA aparecen con bounce de spring
- **Técnico:** CSS `@keyframes` puro. Extender las animaciones `hero-text-*` existentes con `filter: blur()`
- **Archivos:** `global.css` (keyframes), `v2/[slug]/index.astro` (clases en hero)
- **Mobile:** Funciona perfecto. CSS puro.

### 3. Animated Mesh Gradient Background (2-3 horas) — "La página está VIVA"
En vez de fondo plano #0a0e17, un gradiente orgánico lento se mueve como nubes. Blobs del accent color del contratista se mueven despacio. Sutil — no distrae pero se SIENTE. Como el sitio de Apple Vision Pro.
- **Técnico:** CSS puro. 3-4 `radial-gradient` con `@keyframes` moviendo positions. GPU-accelerated.
- **Archivos:** `global.css` (keyframes), `BaseLayout.astro` (div de fondo), colores dinámicos del contractor
- **Mobile:** Funciona. Usar `prefers-reduced-motion` para accesibilidad.

### 4. 3D Card Tilt + Glare (3-4 horas) — "Las tarjetas son FÍSICAS"
Cada glass-card se inclina 3D hacia el cursor al hacer hover. Un reflejo de luz sigue el cursor por la superficie como una tarjeta holográfica. Los fear defusers, reviews, stats, servicios — todo se siente tangible.
- **Técnico:** Script inline o componente React. `transform: perspective(800px) rotateX() rotateY()` + pseudo-element `::before` con gradiente radial que sigue cursor.
- **Archivos:** Nuevo `<script>` en `BaseLayout.astro` o componente `TiltCard`, `global.css`
- **Mobile:** Sin tilt (no hay cursor), mantiene hover-lift existente.

### 5. Paleta completa de colores por contractor (2-3 horas) — "Se ve como MI negocio"
Expandir de 1 variable (accent) a 5: accent, primary, surface, bg, accentLight. El mesh gradient usa SUS colores. Los cards tienen tinte de SU marca. El hero gradient usa SU primary. Cada página se siente diferente.
- **Técnico:** Expandir `<style define:vars>` existente. Reemplazar ~22 colores hardcoded con `var()`.
- **Archivos:** `demo-v2.ts`, `demo-cross.ts` (agregar theme), `v2/[slug]/index.astro` (reemplazar colores)
- **Mobile:** Sin impacto — solo CSS variables.

## Total: ~10-15 horas de trabajo

## Orden de implementación

1. **Paleta de colores** primero (base para mesh gradient)
2. **Mesh gradient background** (usa colores del contractor)
3. **Cursor spotlight** (rápido, impacto inmediato)
4. **Hero cinematic entrance** (primera impresión)
5. **3D card tilt + glare** (interactividad en todo el sitio)

## Archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/styles/global.css` | Mesh gradient keyframes, hero cinema keyframes, tilt/glare styles, spotlight styles |
| `src/layouts/BaseLayout.astro` | Mesh gradient div, cursor spotlight div + script, tilt script |
| `src/pages/v2/[slug]/index.astro` | Paleta de colores expandida, clases de hero cinema, reemplazo de colores hardcoded |
| `src/data/demo-v2.ts` | Theme object con 5 colores |
| `src/data/demo-cross.ts` | Theme object con 5 colores de Cross |
| `src/pages/v2/[slug]/services.astro` | Reemplazo de colores hardcoded |
| `src/pages/v2/[slug]/gallery.astro` | Reemplazo de colores hardcoded |
| `src/pages/v2/[slug]/contact.astro` | Reemplazo de colores hardcoded |

## Lo que el contratista ve vs su WordPress

| Elemento | Su WordPress | Nuestra página |
|----------|-------------|----------------|
| Abrir la página | Carga y aparece | Entrada CINEMÁTICA (blur→sharp, zoom-out) |
| Fondo | Blanco o gris plano | Gradiente orgánico VIVO que se mueve |
| Mover el mouse | Nada pasa | SPOTLIGHT sigue el cursor |
| Hover en una card | Nada o sombra básica | Card se INCLINA en 3D con reflejo holográfico |
| Colores | Genéricos o template | SUS colores de marca por toda la página |
| Scrollear | Contenido estático | Animaciones fluidas (ya existentes) |
| Chat | Formulario de contacto | IA que da precios EN VIVO |

## Verificación
1. Abrir `/v2/cross-construction` — ¿la entrada es cinemática?
2. Mover el mouse — ¿hay spotlight?
3. Hover en fear defuser card — ¿tilt 3D con glare?
4. ¿El fondo se mueve sutilmente?
5. ¿Los colores son de Cross Construction (azul/naranja)?
6. Comparar con `ccsconcretedriveways.com` — ¿nuestra se ve de otro mundo?
7. Mobile: ¿funciona sin tilt/spotlight? ¿Animaciones fluidas?
8. Rodriguez sigue funcionando con sus colores
9. Build pasa sin errores

## Problemas Potenciales y Soluciones

### P1: BaseLayout.astro es COMPARTIDO entre v1 y v2
**Problema:** Si agrego mesh gradient, spotlight, y tilt script en BaseLayout, TODAS las páginas los reciben — incluyendo v1 que no debería cambiar.
**Solución:** NO tocar BaseLayout. Agregar el mesh gradient div, spotlight div, y tilt script DIRECTAMENTE en las páginas v2 (index.astro, services.astro, etc.). Cada página v2 incluye sus propios efectos.
**Impacto:** Un poco más de código duplicado entre páginas v2, pero v1 queda intacta.

### P2: Hero cinema — pantalla oscura 800ms puede sentirse "lento"
**Problema:** El usuario ve negro por 800ms antes de que aparezca la imagen. Puede pensar que la página no cargó.
**Solución:** Reducir a 500ms máximo. El blur→sharp del texto empieza a los 200ms (no 400ms). El usuario ve movimiento inmediato.
**Alternativa:** Mostrar el gradient overlay inmediatamente (sin imagen), luego la imagen aparece. Así nunca hay "pantalla negra".

### P3: Mesh gradient — colores CSS variables en @keyframes
**Problema:** CSS `@keyframes` NO puede usar `var()` para colores del gradiente en todos los browsers. Si defino el mesh gradient con `var(--accent)` dentro de un `@keyframes`, podría no funcionar en Safari.
**Solución:** No usar @keyframes para los colores. En vez: usar `background-position` animation (que SÍ funciona en todos) con colores fijos en inline style (inyectados por Astro con los valores del contractor).
**Ejemplo:** El `<div>` del mesh tiene su `background` con colores inline de Astro, y solo la `background-position` se anima via CSS.

### P4: 3D Tilt — rendimiento con muchas cards
**Problema:** Si hay 15+ cards en la página y cada una tiene su propio mousemove listener, puede lagear.
**Solución:** UN solo listener global en `document`. Detecta qué card está bajo el cursor con `elementFromPoint()` o delegación de eventos. Solo la card activa recibe transform.

### P5: 3D Tilt + glassmorphism = rendering bugs
**Problema:** `backdrop-filter: blur()` + `transform: perspective() rotateX() rotateY()` puede causar glitches en algunos browsers (Chrome compositor issues).
**Solución:** Durante el tilt, usar `will-change: transform` en la card. Testear en Chrome y Safari. Si hay glitches, desactivar `backdrop-filter` durante el tilt con una transición.

### P6: Cursor spotlight en mobile activa por touch
**Problema:** En mobile, `mousemove` puede dispararse en algunos browsers cuando el usuario hace touch, creando un spotlight fantasma.
**Solución:** Verificar `window.matchMedia('(hover: hover)')` antes de activar. Si no hay hover device (mobile), no agregar el listener.

### P7: Demasiados efectos juntos = sobreestimulación
**Problema:** Mesh gradient + spotlight + tilt + cinema entrance + scroll animations — podría sentirse como "demasiado" y parecer una demo de CSS, no una página profesional.
**Solución:** TODO debe ser SUTIL:
- Mesh gradient: 6-8% opacidad máximo
- Spotlight: 4-6% opacidad
- Tilt: máximo 5 grados (no 15)
- Cinema entrance: solo en la primera visita (sessionStorage)
- Regla: si un efecto DISTRAE del contenido, baja su intensidad o quítalo

### P8: prefers-reduced-motion (accesibilidad)
**Problema:** Usuarios con sensibilidad al movimiento pueden tener problemas con mesh gradient, cinema entrance, tilt.
**Solución:** Respetar `@media (prefers-reduced-motion: reduce)` — desactivar mesh animation, cinema blur, y tilt rotation. Mantener solo colores estáticos y fade-in básico.

### P9: Opacity modifiers con CSS variables en Tailwind v4
**Problema:** `bg-[var(--accent)]/20` (opacity modifier) podría no funcionar con CSS variables en Tailwind v4.
**Solución:** Ya probamos que `var(--accent)` funciona sin opacity. Para transparencias, usar la variable `--accentLight` (con alpha incluido) o `color-mix(in srgb, var(--accent) 20%, transparent)`.

## Paso 0
Guardar plan en `contractor-sites/docs/Plan_WowFactor_2026-03-26.md`
