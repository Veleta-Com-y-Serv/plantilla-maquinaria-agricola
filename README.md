# Plantilla NoExpertise · Maquinaria agrícola y taller

Para concesionarios y talleres de maquinaria agrícola, forestal y de jardín: marcas, maquinaria nueva y de ocasión con
precio, recambios y suministros, taller propio y servicio en el campo. Diseñada con el tema **Furrow** de Hallmark.

- Sectores: maquinaria agrícola, taller agrícola, maquinaria forestal y de jardín, suministros agrícolas y ganaderos, maquinaria. Estilo: furrow. Plan mínimo: gratis.
- Secciones: hero, marcas, maquinaria, recambios, ocasion, taller, zonas, preguntas, contacto (+ `texto` genérico).
- Campos propios: `marcas.marcas[]` (nombre, gama, relacion, texto), `ocasion.maquinas[]` (nombre, categoria, marca, anio, horas_motor, potencia, carga, precio, estado, texto, imagen, detalle), `zonas.aviso` {titulo, texto}, `contacto.horario[]`, `recambios.nota`.
- Páginas propias: cada máquina de ocasión con `detalle` en `/ocasion/<slug>/` y cada zona con `texto` en `/zonas/<slug>/`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (Maquinaria, Ocasión, Taller, Contacto). Sin la clave, una sola página larga.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio, de las fichas, de las zonas y de las preguntas, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Asistente de puesta en marcha: guion propio en `template.yaml → asistente` (13 pasos).
- Contenido editable en `site.yaml`; metadatos en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes
Red Hat (OFL-1.1) alojadas en `public/fuentes/` (`LICENCIAS.md`). Fotos de ejemplo generadas con IA para esta plantilla.
