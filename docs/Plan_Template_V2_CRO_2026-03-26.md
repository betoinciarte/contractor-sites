# Plan: Contractor Sites Template V2 — CRO & Copy Optimization

## Context

El negocio vende sistemas (webapp + website) a contratistas via cold email. Se enviarán ~12K emails diciendo "te creé una página web." La página se genera bajo demanda cuando el contratista dice "sí, muéstramela." El template actual (`contractor-sites/`) funciona y se ve bien, pero no fue diseñado con frameworks de CRO/copywriting/psicología. Ahora tenemos 77 skills de marketing en `C:\Users\GodHeir\Skills Marketing\output` que podemos usar para optimizar la conversión.

**Audiencia de la página:** Homeowners buscando servicios de contratista
**Objetivo de conversión:** Homeowner solicita cotización (via AI chat O llamada)
**Decisiones del usuario:**
- Mantener tema DARK
- Mantener lenguaje "AI" visible
- Agregar: Social proof bar + Meet the team
- Alcance: Todas las 16 mejoras identificadas
- Template v2 vive en URL `/rodriguez-concrete-v2` (sin borrar el actual)

---

## Organización del Template V2

⚠️ **NOTA**: `[slug]-v2/` NO funciona como ruta dinámica en Astro. Astro requiere que `[param]` sea el segmento completo. Usar `v2/[slug]/` en su lugar.

```
src/pages/
├── [slug]/              ← v1 actual (NO TOCAR)
│   ├── index.astro
│   ├── services.astro
│   ├── gallery.astro
│   └── contact.astro
├── v2/[slug]/           ← v2 nuevo (ruta: /v2/rodriguez-concrete)
│   ├── index.astro      (home optimizada)
│   ├── services.astro   (si hay cambios)
│   ├── gallery.astro    (si hay cambios)
│   └── contact.astro    (si hay cambios)
```

Data file nuevo:
```
src/data/
├── demo.ts              ← v1 actual (NO TOCAR)
└── demo-v2.ts           ← v2 con datos mejorados
```

URL resultante: `https://sites.sistemasparacontratistas.com/v2/rodriguez-concrete`

---

## Problemas Potenciales Identificados y Soluciones

### P1: Import paths cambian por nivel extra de directorio
**Problema:** v1 usa `import ... from '../../data/demo'` (pages/[slug]/ → data/). v2 está un nivel más profundo (pages/v2/[slug]/ → data/) así que necesita `'../../../data/demo-v2'`.
**Solución:** Al copiar archivos de v1 a v2, ajustar TODOS los imports agregando un `../` extra. Esto aplica a: data, layouts, components.
**Archivos afectados:** Los 4 archivos .astro de v2.

### P2: Nav links apuntan a rutas de v1
**Problema:** Nav.astro genera links como `/${contractor.slug}/services`. En v2, los links deben ser `/v2/${contractor.slug}/services`.
**Solución:** Crear `Nav-v2.astro` que acepte un prop `basePath` (default `/` para v1, `/v2` para v2) o hardcodear `/v2/` en la copia. El Nav-v2 es más limpio.
**Riesgo si no se resuelve:** Links internos de la v2 llevarían a v1.

### P3: CSS para secciones nuevas puede afectar v1
**Problema:** Si agregamos estilos en global.css para social proof bar, meet team, etc., podrían afectar v1 si hay colisión de nombres de clase.
**Solución:** Usar clases con prefijo `v2-` para todo lo nuevo (ej: `.v2-proof-bar`, `.v2-meet-team`). O mejor: usar `<style>` scoped de Astro dentro de los archivos v2 (no contamina global.css).
**Decisión:** Preferir `<style>` scoped de Astro. Solo tocar global.css si es estrictamente necesario.

### P4: Scroll-driven animations pueden romperse al reordenar secciones (Fase 3)
**Problema:** Before/After y Process usan `IntersectionObserver` y cálculos de scroll basados en posición absoluta en la página. Mover estas secciones cambia las posiciones.
**Solución:** Los IntersectionObservers son relativos al viewport, no a la posición en página, así que DEBERÍAN funcionar. Pero la height del sticky process (300vh→200vh) necesita testing manual en mobile.
**Mitigación:** Testear scroll en mobile (375px) después de Fase 3 antes de commit.

### P5: MobileCTA y ChatWidget dependen de anchors
**Problema:** MobileCTA usa `#quoter`, ChatWidget es global via BaseLayout. Si v2 usa el mismo BaseLayout, funciona. Pero el anchor `#quoter` debe existir en v2.
**Solución:** Mantener `id="quoter"` en la sección del AI chat en v2. Ya que copiamos v1, esto viene incluido.

### P6: Images — todas verificadas ✓
- `crew.webp` → existe: `public/images/concrete/b2-crew-concrete.webp` (178 KB)
- `badges/` → 5 archivos .webp confirmados
- `concrete/` → hero, before/after (6), portfolio (5), process (3), etc. — todos existen
- **No hay imágenes faltantes.**

### P7: Footer "Powered by SPC" visible a homeowners
**Problema menor:** El footer dice "Powered by Sistemas Para Contratistas." Para el demo está bien, pero en producción con datos reales podría confundir al homeowner.
**Solución:** No tocar ahora. Es un tema de la Fase de datos reales (futuro plan), no de este plan de template v2.

### P8: El slug no carga datos dinámicos
**Problema conocido:** Tanto v1 como v2 importan datos estáticos de demo.ts/demo-v2.ts. El parámetro `[slug]` NO se usa para buscar datos. Esto es intencional — es un template.
**Impacto en v2:** Ninguno. La fase de "datos reales" es un plan futuro separado.

---

## Cambios por Implementar (16 items, priorizados)

### TIER 1: Quick Wins (alto impacto, bajo esfuerzo)

#### 1. Social Proof Bar debajo del Hero (NUEVA SECCIÓN)
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Barra compacta entre hero y quoter con badges existentes (5-star, licensed, satisfaction, free estimates, locally owned) + estrellas Google + "4.9 on Google"
**Por qué:** Page CRO dice que trust signals deben aparecer ANTES de pedir acción. Actualmente el visitante va del hero directo al chat sin ver credenciales.
**Data:** Ya existe en `demo.ts` como `badges[]` — nunca se renderizan. Usarlos.
**Referencia skill:** `page-cro/SKILL.md` — "Trust Signals & Social Proof" (punto 5 del framework)

#### 2. Fix Stats Section
**Archivo:** `src/pages/v2/[slug]/index.astro` + `src/data/demo-v2.ts`
**Qué:** Reemplazar stats confusos:
- ~~"52% Recommend Us"~~ → "750+ Reviews" (52% suena como que 48% NO recomiendan)
- ~~"50+ Projects"~~ → "15 Years in Dallas" (50 proyectos en 15 años suena poco)
- Mantener: "42% Name Our Crew" (único y diferenciador)
- Mantener: "4.9 Google Rating"
**Por qué:** Marketing Psychology — Social Proof mal ejecutado puede DAÑAR la conversión
**Referencia skill:** `marketing-psychology/SKILL.md` — "Social Proof / Bandwagon Effect"

#### 3. Mid-Page CTA después de Fear Defusers
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Agregar CTA después de la sección de fear defusers: "Still not sure? Ask us anything — our AI is online right now and gives you real pricing, not a sales pitch. [Chat With Us] [Call — We Pick Up]"
**Por qué:** Después de resolver las 4 objeciones principales, el visitante está en su punto más alto de confianza. Sin CTA, tiene que seguir scrolleando y esa confianza se diluye.
**Referencia skill:** `page-cro/SKILL.md` — "CTA repeated at key decision points"

#### 4. Fix #reviews Anchor (Bug)
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Agregar `id="reviews"` a la sección de social proof. El nav link a #reviews está roto.
**Referencia:** Bug encontrado durante evaluación

#### 5. Agregar Google Reviews Link
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Debajo de los reviews, agregar "Read all 750+ reviews on Google →" con link a `contractor.google_reviews_link`
**Por qué:** Reviews sin verificación de terceros pueden parecer fabricados. El link a Google da credibilidad verificable.
**Referencia skill:** `page-cro/SKILL.md` — "Unverifiable claims"

#### 6. Renderizar Badges
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Los `badges[]` en demo.ts (5-star, licensed-insured, satisfaction, free-estimates, locally-owned) existen pero NUNCA se muestran. Renderizarlos en la social proof bar y en el footer.
**Referencia skill:** `page-cro/SKILL.md` — "Trust Signals" ranking

---

### TIER 2: Cambios de Alto Impacto (esfuerzo medio)

#### 7. Reescribir Hero (headline + subheadline)
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Aplicar fórmula de value proposition: `[End Result] + [Specific Period] + [Address Objection]`

**Headline actual:** "Your property deserves concrete you can trust"
**Problemas:** Genérico, sin outcome específico, sin timeline, sin objeción resuelta

**Opciones de headline para implementar (testear cuál funciona mejor):**
- A: "Beautiful concrete that lasts — with a price you know before we start."
- B: "Dallas trusts Rodriguez Concrete. 4.9 stars and 15 years of keeping our word."
- C: "Stop worrying about your driveway. Start enjoying it."

**Subheadline actual:** "We never sell you work you don't need. That's not marketing — it's what 9.5% of our reviews say."
**Subheadline nueva:** "Licensed, insured, and rated 4.9 on Google. We show up when we say we will, charge what we quoted, and clean up when we're done."

**Referencia skill:** `copywriting/SKILL.md` — Value Proposition Formula, `copywriting/references/frameworks.md` — 20+ headline formulas

#### 8. Reescribir Final CTA Section
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:**
- ~~"Ready to start?"~~ → "Get your free estimate. Zero obligation. Zero pressure."
- Hacer un CTA visualmente primario (chat/estimate online) y los otros secundarios
- Agregar name field al callback form (actualmente solo pide phone)
- Agregar risk reversal: "Free estimate — No obligation — 5-year warranty — Licensed & insured"
- Agregar urgencia: "Spring schedules fill up 3-4 weeks out. Book your spot now."
**Por qué:** "Ready to start?" asume que el visitante ya decidió. La mayoría NO ha decidido — necesitan un empujón final con garantía y urgencia.
**Referencia skill:** `page-cro/SKILL.md` — "Objection Handling", `marketing-psychology/SKILL.md` — "Loss Aversion"

#### 9. Nueva Sección: "Meet Your Contractor"
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Ubicación:** Entre Process y Reviews
**Qué:** Sección con `crewImage` (ya existe en demo.ts pero nunca se usa), nombre del owner, y 2-3 frases sobre la historia. Ej: "Carlos Rodriguez started Rodriguez Concrete 15 years ago with one truck and a promise: treat every driveway like it was his own."
**Por qué:** Los servicios de contratista son un negocio de relaciones. El homeowner quiere saber quién va a entrar a su propiedad. Una cara y una historia construyen confianza más que cualquier badge.
**Referencia skill:** `marketing-psychology/SKILL.md` — "Pratfall Effect" + "Liking", `copywriting/SKILL.md` — "Story Lead"

#### 10. Reestructurar Process Section
**Archivo:** `src/pages/v2/[slug]/index.astro`
**Qué:** Los 3 pasos actuales no reflejan el journey real del homeowner:
- ~~Step 1: "You Call. AI Answers."~~ → "Call or Chat. Get a Price in Minutes."
- ~~Step 2: "We Pour. You Watch."~~ → "Free On-Site Estimate. No Surprises." (el paso actual SALTA la visita al sitio)
- ~~Step 3: "Spotless. Guaranteed."~~ → "We Build. You Relax." (mencionar daily updates, on-schedule, cleanup)
- Reducir scroll height de 300vh a 200vh (300vh es excesivo en mobile)
- Agregar timeline: "Most projects: 2-5 days from estimate to completion"
**Referencia skill:** `industry-marketing/SKILL.md` — "Speak their language"

#### 11. Agregar Urgencia Estacional
**Archivos:** `src/pages/v2/[slug]/index.astro` (hero o quoter section)
**Qué:** Un elemento sutil de urgencia genuina: "Spring schedules fill 3-4 weeks out. Get your free estimate now to lock in your spot."
**Por qué:** Cero urgencia en toda la página. Para servicios de contratista existe urgencia natural (clima, agenda, precios de materiales).
**Referencia skill:** `marketing-psychology/SKILL.md` — "Scarcity/Urgency" (solo cuando es genuino)

#### 12. Precios Amigables para Homeowners
**Archivo:** `src/data/demo-v2.ts` + `src/pages/v2/[slug]/index.astro`
**Qué:** Convertir precios por sqft a rangos de proyecto:
- ~~"$3.50/sqft"~~ → "Typical driveway: $3,500 - $7,000"
- ~~"$8/sqft"~~ → "Standard patio: $4,000 - $8,000"
**Por qué:** El homeowner no sabe cuántos sqft tiene su driveway. Precio por sqft es lenguaje de contratista, no de homeowner.
**Referencia skill:** `industry-marketing/SKILL.md` — "Speak Their Language, Not Yours"

---

### TIER 3: Ideas de Testing / Refinamiento

#### 13. Variaciones de Headline para Testing
**Archivo:** Comentarios en `src/pages/v2/[slug]/index.astro`
**Qué:** Documentar 3 variaciones de headline para futuro A/B testing (outcome-focused, trust-focused, problem-focused)
**Referencia skill:** `copywriting/references/frameworks.md` — "Write 20+ variations, test top 3-5"

#### 14. Tab UI: Chat vs Quick Form en Quoter
**Archivo:** Nuevo componente o modificación de la sección quoter
**Qué:** Algunos homeowners prefieren un formulario simple sobre un chat. Considerar UI con tabs: "Chat" | "Quick Form" — ambos llevan al mismo resultado (lead).
**Referencia skill:** `form-cro/SKILL.md` — "Progressive commitment"

#### 15. Test: Página Corta vs Larga
**Qué:** Evaluar si eliminar Process + Services Grid (ir directo de fear defusers a reviews a CTA) convierte mejor. Menos scroll = menos abandono, pero también menos información.
**Referencia skill:** `page-cro/references/experiments.md` — "Page length experiments"

#### 16. Mejoras en Páginas Secundarias
**Archivos:** `src/pages/v2/[slug]/services.astro`, `gallery.astro`, `contact.astro`
**Qué:**
- **Services:** Cambiar copy de features a outcomes ("driveway that looks beautiful for 20 years and adds $15K to your home value")
- **Gallery:** Agregar project cost range, timeline, y mini-review por proyecto
- **Contact:** Considerar multi-step form (step 1: name+phone, step 2: service+details)
- **Services:** Agregar heading específico "Concrete Services in Dallas. Fixed Pricing, No Surprises." en vez de genérico "What We Do"
**Referencia skills:** `copywriting/SKILL.md` — "Benefits Over Features, Outcomes Over Benefits", `form-cro/SKILL.md` — "Progressive commitment"

---

## Orden de Secciones Propuesto (Home v2)

**Actual:**
1. Hero → 2. AI Quoter → 3. Before/After → 4. Fear Defusers → 5. Process → 6. Stats+Reviews → 7. Services → 8. Final CTA

**V2 (Conversion Narrative Framework: Resonance → Enlightenment → Conviction → Decision):**
1. **Hero** (hook + value proposition) — RESONANCE
2. **Social Proof Bar** (badges + Google stars) — TRUST ← NUEVA
3. **AI Quoter** (para hot visitors listos para actuar) — DECISION SHORTCUT
4. **Fear Defusers** (resolver objeciones temprano) — RESONANCE
5. **Mid-Page CTA** ← NUEVO
6. **Before/After** (prueba visual de transformación) — CONVICTION
7. **Process** (cómo funciona, reducir incertidumbre) — ENLIGHTENMENT
8. **Meet Your Contractor** (cara + historia) — TRUST ← NUEVA
9. **Stats + Reviews** (testimonios + link Google) — CONVICTION
10. **Services Grid** (qué pueden elegir) — ENLIGHTENMENT
11. **Final CTA** (cierre con garantía y risk reversal) — DECISION

---

## Archivos Críticos a Crear/Modificar

| Archivo | Acción | Fase | Items |
|---------|--------|------|-------|
| `src/data/demo-v2.ts` | CREAR (copia de demo.ts + mejoras) | 1 | #2, #12 |
| `src/pages/v2/[slug]/index.astro` | CREAR (copia de v1 + mejoras incrementales) | 1-4 | #1-15 |
| `src/pages/v2/[slug]/services.astro` | CREAR (copia + mejoras) | 1, 4 | #16 |
| `src/pages/v2/[slug]/gallery.astro` | CREAR (copia + mejoras) | 1, 4 | #16 |
| `src/pages/v2/[slug]/contact.astro` | CREAR (copia + mejoras) | 1, 4 | #16 |
| `src/components/Nav-v2.astro` | CREAR (copia con links a /v2/) | 1 | P2 |
| `src/components/InlineChat.tsx` | NO TOCAR | — | reutilizar |
| `src/components/ContactForm.tsx` | NO TOCAR (o clonar si Fase 4 lo requiere) | 4? | #14 |
| `src/components/Nav.astro` | NO TOCAR | — | v1 intacto |
| `src/components/MobileCTA.astro` | NO TOCAR | — | funciona |
| `src/styles/global.css` | PREFERIR NO TOCAR — usar `<style>` scoped en v2 | — | P3 |

**Regla:** Todo archivo de v1 marcado "NO TOCAR" se reutiliza sin modificar. Si v2 necesita una variación, se crea copia con sufijo `-v2`.

---

## Skills de Marketing a Usar (Referencia)

| Skill | Archivo | Se usa en |
|-------|---------|-----------|
| Page CRO | `Skills Marketing/output/skills/page-cro/SKILL.md` | Todo: trust signals, CTAs, objeciones |
| Copywriting | `Skills Marketing/output/skills/copywriting/SKILL.md` | Headlines, subheadlines, CTAs, stories |
| Copywriting Frameworks | `Skills Marketing/output/skills/copywriting/references/frameworks.md` | Fórmulas de headline, PAS, AIDA |
| Marketing Psychology | `Skills Marketing/output/skills/marketing-psychology/SKILL.md` | Urgencia, social proof, loss aversion |
| Web Design | `Skills Marketing/output/skills/web-design/SKILL.md` | Layout, tipografía, spacing |
| Form CRO | `Skills Marketing/output/skills/form-cro/SKILL.md` | Forms, submit buttons, trust near forms |
| Industry Marketing | `Skills Marketing/output/skills/industry-marketing/SKILL.md` | Lenguaje homeowner vs contratista |
| CRO Experiments | `Skills Marketing/output/skills/page-cro/references/experiments.md` | Ideas de A/B testing |

---

## Verificación (End-to-End)

1. **Build:** `cd contractor-sites && npm run build` — debe compilar sin errores
2. **Dev server:** `npm run dev` — navegar a `http://localhost:4321/rodriguez-concrete-v2`
3. **Comparar:** Abrir v1 (`/rodriguez-concrete`) y v2 (`/rodriguez-concrete-v2`) lado a lado
4. **Mobile:** Verificar en viewport 375px que MobileCTA funciona, scroll no es excesivo, CTAs son clickeables
5. **Links:** Verificar que `#reviews` anchor funciona, Google Reviews link funciona, nav links apuntan a v2 pages
6. **Chat:** Verificar que InlineChat funciona en v2 (mismo componente, misma API)
7. **Forms:** Verificar que ContactForm y callback form envían correctamente

---

## Ejecución por Fases

Cada fase se ejecuta, se revisa visualmente comparando con v1, y se aprueba antes de continuar. Git commit por fase para poder revertir si algo no funciona.

### Fase 1: Foundation (crear v2 + fixes + trust signals existentes)
**Objetivo:** v2 se ve igual que v1 pero con bugs arreglados y elementos que ya existían en los datos pero nunca se mostraban.

**Items:** #4 (fix anchor), #5 (Google Reviews link), #6 (render badges), #2 (fix stats)

**Trabajo:**
1. Crear `src/data/demo-v2.ts` (copia de demo.ts con stats corregidos)
2. Crear `src/pages/v2/[slug]/index.astro` (copia de v1 con imports ajustados: `../../../` en vez de `../../`)
3. Copiar services.astro, gallery.astro, contact.astro a `v2/[slug]/` (ajustar imports)
4. Crear `src/components/Nav-v2.astro` (copia de Nav.astro con links a `/v2/${slug}/...`)
5. Fix `id="reviews"` anchor en index.astro
6. Renderizar badges[] que ya existen en data (mostrar en home page)
7. Agregar link "Read all reviews on Google"
8. Reemplazar stats confusos por mejores métricas

**Checklist pre-commit:**
- [ ] Todos los imports usan `../../../` (3 niveles, no 2)
- [ ] Nav-v2 links apuntan a `/v2/slug/...` no `/slug/...`
- [ ] `id="quoter"` existe para que MobileCTA funcione
- [ ] `id="reviews"` existe para que Nav funcione
- [ ] Build pasa sin errores
- [ ] v1 (`/rodriguez-concrete`) sigue funcionando igual

**Verificación:** Abrir `/rodriguez-concrete` y `/v2/rodriguez-concrete` lado a lado. v2 debe verse igual + badges visibles + stats mejorados + reviews link. v1 NO debe haber cambiado.
**Git commit:** "feat: contractor-sites v2 foundation — fix stats, render badges, add Google link"

---

### Fase 2: Copy & CRO (reescribir textos con frameworks de marketing)
**Objetivo:** Mismo layout/diseño que Fase 1, pero copy completamente reescrito basado en skills de marketing.

**Items:** #7 (hero rewrite), #8 (final CTA rewrite), #10 (process rewrite), #3 (mid-page CTA), #11 (urgencia), #12 (precios homeowner-friendly)

**Trabajo:**
1. Reescribir hero headline + subheadline (fórmula: outcome + specificity + objection)
2. Reescribir Process section (3 pasos del journey real del homeowner)
3. Reescribir Final CTA (headline fuerte + risk reversal + name field en callback)
4. Agregar mid-page CTA después de fear defusers
5. Agregar urgencia estacional en hero o quoter
6. Convertir precios de $/sqft a rangos de proyecto en demo-v2.ts
7. Reducir scroll height del process de 300vh a 200vh

**Verificación:** Comparar v2-fase1 (git anterior) vs v2-fase2. Layout igual, copy diferente. ¿Se siente más convincente? ¿Los CTAs son más claros?
**Git commit:** "feat: contractor-sites v2 copy rewrite — hero, CTA, process, pricing"

---

### Fase 3: Nuevas Secciones + Reorden (agregar sections y cambiar flujo)
**Objetivo:** La página ahora tiene secciones nuevas y un orden optimizado para el flujo de persuasión.

**Items:** #1 (social proof bar), #9 (meet your contractor), + reordenar secciones

**Trabajo:**
1. Crear Social Proof Bar entre hero y quoter (badges + Google stars compact)
2. Crear "Meet Your Contractor" section (crewImage + owner name + historia)
3. Reordenar secciones al Conversion Narrative Framework:
   Hero → Social Proof Bar → AI Quoter → Fear Defusers → Mid-CTA → Before/After → Process → Meet Team → Reviews → Services → Final CTA

**Verificación:** Comparar v2-fase2 vs v2-fase3. ¿La nueva estructura fluye mejor? ¿El social proof bar da confianza antes del quoter? ¿La sección "Meet" humaniza la experiencia?
**Git commit:** "feat: contractor-sites v2 new sections — social proof bar, meet team, reorder"

---

### Fase 4: Refinamientos + Páginas Secundarias
**Objetivo:** Pulir detalles y mejorar páginas secundarias.

**Items:** #13 (headline variations), #14 (tab UI chat/form), #15 (evaluar largo), #16 (pages secundarias)

**Trabajo:**
1. Documentar 3 variaciones de headline en comentarios HTML para futuro A/B testing
2. Evaluar si agregar tabs "Chat | Quick Form" en quoter (solo si se ve claro que mejora)
3. Mejorar services.astro: copy de outcomes, heading específico
4. Mejorar gallery.astro: project details (cost, timeline, mini-review)
5. Mejorar contact.astro: evaluar multi-step form

**Verificación:** Comparación final v1 vs v2 completa. Revisar en desktop y mobile (375px).
**Git commit:** "feat: contractor-sites v2 refinements — secondary pages, headline variations"

---

## Paso 0 (SIEMPRE): Guardar Plan como Archivo Físico

Antes de ejecutar cualquier fase, guardar este plan como archivo permanente en:
`contractor-sites/docs/Plan_Template_V2_CRO_2026-03-26.md`

Esto aplica a TODOS los planes futuros — ver regla en memoria de Claude.
