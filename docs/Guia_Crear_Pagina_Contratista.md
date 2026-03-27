# Guía: Cómo Crear una Página Personalizada para un Contratista Nuevo

> Este documento es para que Claude siga en futuras sesiones. Contiene TODO lo necesario para duplicar el proceso que se hizo con Cross Construction Services.

## Contexto del Proyecto

**Negocio:** Vender sistemas (webapp + website) a contratistas en USA via cold email.
**El producto:** Website premium + AI chat cotizador + AI voice agent + dashboard de leads
**La estrategia:** Enviar cold email diciendo "mira la página que te creamos" → el contratista ve su página personalizada → queda impresionado → compra
**Pricing:** Website $497 / Webapp $997 / Combo $1,497 + $47-97/mes

**El template v3 ya existe** en `contractor-sites/src/pages/v3/[slug]/` con:
- Mesh gradient, cursor spotlight, 3D card tilt, AI orb, cinema hero
- Smooth scroll (Lenis), View Transitions (Astro ClientRouter)
- Word-by-word scroll reveal, review marquee, magnetic buttons
- Copy personalizado, fear defusers, meet your contractor, process steps

**Ejemplo funcionando:** https://sites.sistemasparacontratistas.com/v3/cross-construction

---

## Proceso Paso a Paso

### PASO 1: Elegir el contratista

**Base de datos:** Docker container `leadgen-postgres`, database `leads`, user `leadgen`

```sql
-- Buscar contratistas de concrete con buenos datos
SELECT b.id, b.business_name, b.city, b.phone, b.rating, b.review_count,
       b.years_in_business, b.owner_name, b.enrichment_quality, b.domain,
       (SELECT count(*) FROM google_reviews gr WHERE gr.business_id = b.id AND gr.rating >= 4) as good_reviews
FROM businesses b
WHERE (b.service_type ILIKE '%concret%' OR b.business_name ILIKE '%concret%')
  AND b.enrichment_quality IN ('A', 'B')
  AND b.rating >= 4.0
  AND b.review_count >= 10
ORDER BY good_reviews DESC, b.rating DESC
LIMIT 15;
```

**Criterios de selección:**
- enrichment_quality A o B
- rating >= 4.0
- Tiene reviews reales en google_reviews
- Tiene domain (website para extraer assets)
- Preferir: tiene owner_name, years_in_business, selling_points

---

### PASO 2: Extraer datos del negocio

Una vez elegido el negocio (ej: ID 1918), extraer TODO:

```sql
-- Datos del negocio
SELECT * FROM businesses WHERE id = 1918;

-- TODAS las reviews de Google (no solo top 5)
SELECT reviewer_name, rating, review_text, review_likes, owner_answer
FROM google_reviews WHERE business_id = 1918
ORDER BY review_likes DESC;

-- Contenido de su sitio web
SELECT page_path, clean_text FROM website_content WHERE business_id = 1918;
```

**También leer el language bank de concrete:**
`C:\Users\GodHeir\Leads Local Services\data\language_banks\Concrete_cheatsheet.md`

---

### PASO 3: Extraer assets visuales de su sitio web real

```bash
# Descargar HTML
curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" https://[domain]/ > C:/tmp/contractor.html

# Extraer con Python: logo, hero image, portfolio images, brand colors
python3 << 'PYEOF'
import re
from collections import Counter
with open('C:/tmp/contractor.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Logo
logos = list(set(re.findall(r'src="([^"]*logo[^"]*)"', html, re.I)))
print("LOGO:", logos[:3])

# Hero/background images
bgs = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', html)
print("BG IMAGES:", [b for b in bgs if any(e in b.lower() for e in ['.jpg','.png','.webp'])][:5])

# All images
imgs = re.findall(r'<img[^>]*src="([^"]*)"', html)
print("ALL IMAGES:", imgs[:20])

# Brand colors (non-grayscale hex)
hexc = re.findall(r'#([0-9a-fA-F]{6})\b', html)
skip = {'ffffff','000000','f5f5f5','e5e5e5','cccccc','333333','666666','999999','eeeeee'}
for c, n in Counter(hexc).most_common(10):
    if c.lower() not in skip:
        print(f"COLOR: #{c} ({n}x)")
PYEOF
```

**Resultado necesario:**
- `accent`: color principal de CTAs (usualmente naranja/rojo/verde)
- `primary`: color de marca (usualmente azul/gris oscuro)
- `logoUrl`: URL de su logo
- 8-15 URLs de fotos de sus proyectos reales

---

### PASO 4: Claude genera copy personalizado

**NO usar scripts.** Claude debe leer los datos y escribir el copy sección por sección.

**Input para Claude (todo junto en un prompt):**
1. Los datos del negocio (nombre, owner, años, rating, ciudad, servicios)
2. TODOS los reviews de Google (no solo 3 — Claude necesita leerlos todos para extraer patrones)
3. El contenido de su website (homepage + about page)
4. El language bank de concrete

**Claude debe generar:**

```typescript
export const personalizedCopy = {
  headline: '...', // Fórmula: [Outcome] + [Objection handled]
  subheadline: '...', // 3 promesas específicas basadas en reviews
  urgency: '...', // Urgencia estacional genuina

  fearDefusers: [
    // 4 miedos del homeowner + respuestas con datos de SUS reviews
    // Cada uno DEBE citar un reviewer real por nombre
    { fear: '"..."', answer: '...', detail: '...[ReviewerName] said: "..."...' },
  ],

  meetHeadline: '...', // "[Owner]. [X] years. [Something memorable]"
  meetText1: '...', // Historia basada en about page + reviews
  meetText2: '...', // Equipo, proceso, "not a call center"

  processSteps: [
    // 3 pasos del journey REAL del homeowner basado en cómo SUS reviews describen el proceso
    { num: '01', title: '...', desc: '...' },
    { num: '02', title: '...', desc: '...' },
    { num: '03', title: '...', desc: '...' },
  ],

  ctaHeadline: '...', // "See what your project will cost. [Risk reversal]."
  ctaSubtext: '...', // "Chat with us or call [Owner]. Straight answers."
  ctaTrust: '...', // "Free estimate · No obligation · [Warranty] · [License]"

  servicesHeading: '...', // "[Trade] Services in [City]. Free Estimates."
  servicesSubheading: '...', // Awards, years, BBB rating
  midCtaText: '...', // "Got questions? Get real pricing from [Owner]."
  quoterSubtext: '...', // "Trained on [X] years of [City] projects."
};
```

**Reglas de copy:**
- NUNCA inventar datos — solo usar lo que está en reviews y website
- NUNCA usar formularios como CTA — solo Chat + Llamar
- Reviews truncados a "FirstName L." (privacidad)
- Si no hay voiceAI: CTA de llamada dice "Call [phone]" no "AI picks up"
- Precios en rangos de proyecto, no por sqft
- Fear defusers deben citar reviewers reales con nombre

---

### PASO 5: Crear el data file

Crear `src/data/demo-[slug].ts` siguiendo la estructura exacta de `demo-cross.ts`:

```
contractor-sites/src/data/demo-[slug].ts
```

**Exports requeridos (TODOS):**
- `brandAccent`, `brandPrimary` — colores de su marca
- `theme` — { accent, accentLight, primary, surface, bg }
- `contractor` — info del negocio
- `services` — array de 4-6 servicios
- `reviews` — array de 3-5 reviews reales
- `stats` — { years, projects, rating, satisfaction }
- `statCards` — array de 4 stat cards
- `heroImage`, `crewImage` — URLs de imágenes
- `processImages` — array de 3 URLs
- `beforeAfterPairs` — array de 3 pares
- `galleryProjects` — array de 6-8 proyectos
- `badges` — array de 5 badges
- `personalizedCopy` — objeto con todo el copy personalizado

**Archivo de referencia completo:** `src/data/demo-cross.ts` (244 líneas)

---

### PASO 6: Registrar en contractors.ts

```typescript
// src/data/contractors.ts
import * as newContractor from './demo-[slug]';

const registry = {
  'rodriguez-concrete': rodriguez,
  'cross-construction': cross,
  '[new-slug]': newContractor,  // ← agregar aquí
};
```

---

### PASO 7: Build + verificar

```bash
cd contractor-sites
npx astro build  # debe pasar sin errores

# Verificar en dev server
npx astro dev --port 4360

# Test URLs
curl -s -o /dev/null -w "%{http_code}" http://localhost:4360/v3/[new-slug]  # debe ser 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:4360/v3/rodriguez-concrete  # debe seguir siendo 200
```

**Checklist de verificación:**
- [ ] Build pasa sin errores
- [ ] La nueva URL devuelve 200
- [ ] Rodriguez y Cross siguen funcionando
- [ ] Slugs falsos devuelven 404
- [ ] El nombre, teléfono y reviews son los correctos
- [ ] Los colores son los del contratista (no el naranja genérico)
- [ ] Las fotos son de SU sitio web
- [ ] "AI picks up" solo aparece si hasVoiceAI=true
- [ ] noindex meta tag presente
- [ ] No dice "750+" ni otros números de Rodriguez

---

### PASO 8: Deploy

```bash
git add -A
git commit -m "feat: Add [business_name] contractor page with real data"
git push origin main

# Deploy via Coolify
ssh root@46.225.142.135 "curl -s -X POST 'http://localhost:8000/api/v1/deploy?uuid=cgg8ksgcoggw8cg4c44occgk&force=true' -H 'Authorization: Bearer 2|Y9TCEFTgiHUmu9ULrfXYPDBzXfGQznYvV02udVWPd3b31fc0'"

# Esperar ~70 segundos, verificar status
ssh root@46.225.142.135 "curl -s 'http://localhost:8000/api/v1/deployments/[uuid]' -H 'Authorization: Bearer 2|Y9TCE...'"
```

---

---

## Situaciones Especiales

### Si el trade NO es concrete
El language bank (`Concrete_cheatsheet.md`) solo aplica a concrete. Para otros trades:
- **HVAC:** Los fear defusers cambian (no "cleanup" sino "will they fix it right the first time?" y "hidden diagnostic fees")
- **Painting:** Los fear defusers son "will the paint peel?" y "will they protect my furniture?"
- **Plumbing:** Urgencia es el diferenciador ("24/7 emergency")
- **Acción:** Claude debe leer TODOS los reviews del negocio y extraer los patrones de SU trade, no copiar los de concrete. Los reviews dicen qué le importa a los clientes de ESE trade.

### Si el contratista NO tiene website (sin domain)
28% de los negocios no tienen website o está roto.
- **Fotos:** Usar stock images de concrete (ya existen en `public/images/concrete/`)
- **Colores:** Usar defaults del trade: concrete = `#E87C3E`/`#1E3D5F`, HVAC = verde/azul, painting = azul/blanco
- **Logo:** No hay → Nav muestra texto del business_name

### Si el chat API no conoce el slug del contratista
InlineChat envía `contractorSlug` a spc-app. Si el contratista no existe en spc-app:
- El chat puede fallar o dar respuestas genéricas
- **Solución temporal:** En el data file, el chat puede usar un slug genérico que sí existe (ej: "rodriguez-concrete") mientras el contratista no sea cliente real
- **Solución real:** Crear el contractor en spc-app via POST a `/api/admin/pre-built`

### Si el sitio del contratista bloquea el scraping
Algunos sitios tienen Cloudflare o bloquean curl.
- **Intentar con User-Agent de Chrome:** `curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"`
- **Intentar con proxy:** Ver `C:\Users\GodHeir\Evluar COmpetencia\Usa proxie.txt` (proxies residenciales US)
- **Si nada funciona:** Usar stock images + colores default. El copy personalizado viene de los reviews (DB), no del sitio web.

### Si el contratista tiene muy pocos reviews (<5)
- Los fear defusers no pueden citar reviewers específicos
- **Solución:** Usar datos del language bank del trade + los pocos reviews que tenga
- El marquee con 2-3 reviews se ve vacío → duplicar 6x en vez de 4x

### Nota sobre array de categories en la DB
El campo `categories` es un array PostgreSQL. NO se puede usar ILIKE directo.
```sql
-- CORRECTO:
WHERE array_to_string(b.categories, ',') ILIKE '%concret%'

-- INCORRECTO (da error):
WHERE b.categories ILIKE '%concret%'
```

---

## Auditoría Post-Creación (OBLIGATORIA)

Después de crear la página y ANTES de deploy, Claude DEBE:

1. **Abrir la URL en el dev server** y extraer el texto completo renderizado
2. **Verificar que NINGÚN dato de Rodriguez/Cross aparece** — buscar "750", "Rodriguez", "Dallas", "Carlos" etc.
3. **Verificar que los números son del contratista real** — reviews count, years, rating
4. **Verificar que "AI picks up" no aparece** si hasVoiceAI es false
5. **Verificar que las imágenes cargan** — curl las URLs de imágenes, deben dar 200
6. **Verificar mobile** — hero no es demasiado alto, CTAs son touch-friendly
7. **Verificar que v1 y v2 siguen funcionando** — no romper versiones anteriores

---

## Errores Comunes (NO Repetir)

1. **NO usar formularios como CTA** — Solo Chat + Llamar. Ver `memory/feedback_no_forms.md`
2. **NO copiar stats de Rodriguez** — "750+ Reviews" es de Rodriguez, no del nuevo contratista
3. **NO decir "AI picks up" si el contratista no tiene voice AI**
4. **NO poner fotos como "before/after" si no son pares reales** — Usar galería de proyectos en su lugar
5. **NO inventar la historia del owner** — Solo usar datos de reviews + about page
6. **NO olvidar noindex** — Páginas con datos reales DEBEN tener noindex
7. **NO tocar BaseLayout.astro** — Efectos v3 van en BaseLayout-v3.astro o inline
8. **NO tocar global.css** — Estilos v3 van en `<style is:global>` dentro de las páginas
9. **NO poner "Trained on 750+ projects"** — Usar los números REALES del contratista
10. **NO mezclar colores de diferentes contratistas** — Cada data file tiene su propio theme

## Archivos Clave (Rutas Absolutas)

| Archivo | Propósito |
|---------|-----------|
| `contractor-sites/src/data/demo-cross.ts` | **EJEMPLO A COPIAR** — data file completo |
| `contractor-sites/src/data/contractors.ts` | Registry donde se registran nuevos contratistas |
| `contractor-sites/src/data/types.ts` | Tipos TypeScript — la interfaz que debe cumplir cada data file |
| `contractor-sites/src/pages/v3/[slug]/index.astro` | Template home — NO tocar, consume data dinámicamente |
| `Leads Local Services/data/language_banks/Concrete_cheatsheet.md` | Insights de 750+ reviews de concrete |

## Infraestructura

| Recurso | Valor |
|---------|-------|
| DB Leads | Docker `leadgen-postgres`, db `leads`, user `leadgen` |
| VPS | 46.225.142.135 |
| Coolify UUID (contractor-sites) | `cgg8ksgcoggw8cg4c44occgk` |
| Coolify API Token | `2\|Y9TCEFTgiHUmu9ULrfXYPDBzXfGQznYvV02udVWPd3b31fc0` |
| URL producción | sites.sistemasparacontratistas.com |
| URL v3 | sites.sistemasparacontratistas.com/v3/[slug] |
