# Plan: Template V2 con Datos Reales — Cross Construction Services

## Context

Ya tenemos el template v2 optimizado en `/v2/[slug]/`. Ahora queremos probarlo con datos reales de un contratista de la base de datos de scraping para ver cómo se ve el proceso completo de crear una página con datos reales.

**Negocio elegido:** Cross Construction Services (ID 1918)
- Owner: Parker
- Houston, TX — 33 años en el negocio
- 5.0 rating, 84 Google reviews (49 reales en DB)
- Domain: ccsconcretedriveways.com
- Services: driveways, driveway repair, patios
- Selling points: 24/7, free estimates

## Qué vamos a hacer

Crear `demo-cross.ts` con datos reales de Cross Construction y una ruta `/v2/cross-construction` que muestre el template v2 con esos datos.

**NO vamos a:**
- Tocar demo-v2.ts (Rodriguez Concrete demo)
- Tocar las páginas v2 existentes — reutilizamos la misma estructura
- Crear páginas nuevas — solo un nuevo data file

## El problema: las páginas v2 importan de demo-v2.ts hardcoded

Las páginas actuales hacen `import { ... } from '../../../data/demo-v2'`. Para que `/v2/cross-construction` muestre datos de Cross Construction, necesitamos que el data source sea dinámico basado en el slug.

**Solución:** Crear un archivo `data/contractors.ts` que exporte una función `getContractor(slug)` que retorna los datos del contratista. Las páginas v2 se actualizan para usar esta función en vez del import estático.

```
Flujo:
1. URL: /v2/cross-construction
2. Astro extrae slug = "cross-construction"
3. Página llama getContractor("cross-construction")
4. Retorna datos de Cross Construction
5. Si slug no existe, retorna Rodriguez Concrete (demo default)
```

## Archivos a crear/modificar

| Archivo | Acción |
|---------|--------|
| `src/data/demo-cross.ts` | CREAR — datos reales de Cross Construction |
| `src/data/contractors.ts` | CREAR — función getContractor(slug) |
| `src/pages/v2/[slug]/index.astro` | MODIFICAR — usar getContractor en vez de import estático |
| `src/pages/v2/[slug]/services.astro` | MODIFICAR — idem |
| `src/pages/v2/[slug]/gallery.astro` | MODIFICAR — idem |
| `src/pages/v2/[slug]/contact.astro` | MODIFICAR — idem |

## Datos a extraer de la DB para Cross Construction

De la DB directamente:
- `business_name`: "Cross Construction Services"
- `owner_name`: "Parker"
- `phone`: "+1713-254-1703" → formatear a (713) 254-1703
- `rating`: 5.0
- `review_count`: 84
- `years_in_business`: 33
- `domain`: ccsconcretedriveways.com
- `selling_points`: 24/7, free_estimates
- `city`: Houston

De Google Reviews (top 3 con rating 4+):
- Reviews reales con nombre, texto, rating

Del website scrapeado:
- Servicios específicos (driveways, driveway repair, patios)
- Service areas

**Datos que NO tenemos y hay que fabricar/adaptar:**
- Imágenes (usaremos las mismas stock images de concrete del template)
- slug: "cross-construction"
- voicePhone (no hay — usaremos el phone normal)
- license_number (no tenemos — poner genérico o vacío)
- business_hours (no tenemos — poner estándar)
- FAQs por servicio (adaptar las de Rodriguez)
- Before/after pairs (usar stock)
- Gallery projects (usar stock)

## Problemas Potenciales y Soluciones

### P1: Las páginas v2 no usan Astro.params.slug para cargar datos
**Problema:** Las 4 páginas importan estáticamente de `demo-v2.ts`. No leen `Astro.params.slug`.
**Solución:** En el frontmatter de cada página, extraer el slug con `const { slug } = Astro.params` y hacer dynamic import basado en el slug. Ejemplo:
```ts
const { slug } = Astro.params;
const data = await import(`../../../data/contractors/${slug}.ts`).catch(() => import('../../../data/demo-v2'));
```
**Alternativa más simple:** Crear `contractors.ts` como registry que mapea slug → data. No necesita dynamic imports.

### P2: El Chat API no conoce a Cross Construction
**Problema:** InlineChat envía `contractorSlug: "cross-construction"` al API de spc-app. Pero spc-app NO tiene un contractor con ese slug en su DB. El chat puede fallar o dar respuestas genéricas.
**Solución:** El chat API de spc-app probablemente tiene un fallback genérico para slugs desconocidos. Verificar qué pasa cuando se envía un slug que no existe. Si falla, dos opciones:
- A) Crear el contractor en spc-app (más trabajo, pero correcto)
- B) Usar un slug genérico que sí exista (ej: "rodriguez-concrete") para el chat — menos correcto pero funciona para demo
**Decisión:** Verificar primero qué pasa. Si el chat falla, preguntar al usuario.

### P3: "AI picks up instantly" en las llamadas — pero Retell no está configurado para Cross Construction
**Problema:** Los CTAs de llamada dicen "AI picks up instantly" y linkan a `voicePhoneRaw`. Para Cross Construction, el teléfono real es (713) 254-1703. La IA de voz (Retell) NO está configurada para ese número. Si alguien llama, le contesta el dueño real, no la IA.
**Solución:** Para el demo, el CTA de llamada debe linkear al número real del contratista pero NO decir "AI picks up". En vez: "Call (713) 254-1703". La IA de voz se configura cuando el contratista compra el servicio, no antes.
**Impacto:** Necesitamos que el template soporte CTAs de llamada con y sin AI voice.

### P4: Imágenes stock en vez de reales
**Problema:** No tenemos fotos reales de Cross Construction. Usaremos las mismas stock images de concrete.
**Solución:** Esto es aceptable para la demo. Las imágenes de concrete son genéricas (driveways, patios, etc.) y aplican a cualquier contratista de concreto. Cuando el contratista compra, se reemplazan con sus fotos reales.
**Nota:** Las before/after pairs y gallery projects usarán títulos/ubicaciones de Houston para ser coherentes.

### P5: Slug no encontrado → ¿404 o fallback?
**Problema:** Si alguien visita `/v2/slug-que-no-existe`, ¿qué pasa?
**Solución:** Retornar 404. No mostrar Rodriguez Concrete como fallback porque sería confuso. En Astro SSR, retornar `Astro.redirect('/404')` o `new Response(null, { status: 404 })`.

### P6: Reviews reales con nombres reales — ¿privacidad?
**Problema:** Usamos reviews de Google con nombres reales de personas.
**Solución:** Las reviews de Google son públicas. Truncar a "FirstName L." como ya hace el script de generación (ej: "Elaine W." en vez de "Elaine Wright"). Esto es más seguro.

### P7: TypeScript — los data files deben tener la misma forma
**Problema:** Si demo-cross.ts no exporta exactamente las mismas variables que demo-v2.ts, las páginas van a romper.
**Solución:** Definir un tipo/interfaz `ContractorSiteData` en contractors.ts que ambos data files deben cumplir. Verificar en build time.

### P8: Cross Construction en Google — ¿nos van a indexar?
**Problema:** Si Google indexa la página, Cross Construction podría encontrar una página suya que no autorizaron.
**Solución:** Agregar `<meta name="robots" content="noindex, nofollow">` a las páginas de demo con datos reales. Solo Rodriguez Concrete (demo genérico) puede ser indexado.

## Pasos de implementación

1. Extraer datos completos de Cross Construction de la DB (reviews, website content, servicios)
2. Crear interfaz `ContractorSiteData` en `contractors.ts`
3. Crear `demo-cross.ts` con datos reales formateados — misma interfaz que demo-v2
4. Actualizar `contractors.ts` como registry: slug → data
5. Actualizar las 4 páginas v2 para:
   - Leer `Astro.params.slug`
   - Llamar `getContractor(slug)`
   - Si no existe → 404
   - Si tiene flag `noindex` → agregar meta robots noindex
6. Manejar el CTA de llamada: si no hay voicePhone, NO decir "AI picks up"
7. Build + test en local
8. Verificar que el chat funciona con slug desconocido
9. Deploy + verificar en producción

## Verificación

1. `/v2/rodriguez-concrete` sigue funcionando con datos de Rodriguez
2. `/v2/cross-construction` muestra datos REALES de Cross Construction
3. Reviews truncados a "FirstName L." (privacidad)
4. Nombre, teléfono, rating, años son reales
5. CTA de llamada NO dice "AI picks up" para Cross (no tiene Retell)
6. La página tiene `noindex` meta tag
7. `/v2/slug-random` retorna 404
8. Chat funciona (verificar qué pasa con slug desconocido)
9. Todas las sub-páginas funcionan
10. Build pasa sin errores de tipos
