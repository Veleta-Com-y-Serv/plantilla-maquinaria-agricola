# Plantilla «Maquinaria agrícola y taller» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Para concesionarios y talleres
de maquinaria agrícola, forestal y de jardín. Estilo: tema **Furrow** de Hallmark (papel manila, tinta casi negra, Red Hat
Display / Text / Mono, teclas moldeadas de 6 px, la «libreta» con cabeza de tinta y celdas sobre cuadrícula, el plano de
curvas de nivel generado y una señal mandarina). Brief completo en `DISEÑO.md`. Todo en castellano de España, frases
cortas, de tú.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (fondo = papel, texto = tinta, acento = mandarina de la tecla principal, el foco, el área del plano y la banda de recambios; primario = banda del taller y el verde de «Disponible»). `src/layouts/Base.astro` los convierte en `--c-primario`, `--c-acento`, `--c-fondo`, `--c-texto`. Todos los demás tonos se derivan en `src/styles/global.css` (`--papel-2`, `--papel-3`, `--apagado`, `--filete`, `--rejilla`, `--curva`, `--seto`, `--agua`, `--verde`, `--acento-suave`…) y el texto sobre primario y sobre acento se elige solo (`--sobre-primario`, `--sobre-acento`). No pongas colores fijos en los componentes.
- **Tipografías**: Red Hat Display 600 (titulares, precios, el teléfono grande), Red Hat Text 400/500 (texto, etiquetas, teclas) y Red Hat Mono 400 (solo cifras que se copian: años, horas de motor, potencia, el teléfono de la cabecera), alojadas en `public/fuentes/` (licencias en `public/fuentes/LICENCIAS.md`). No añadas fuentes externas.
- **Aspecto** (`src/styles/global.css`): `.btn` (tecla mandarina), `.btn-sec` (tecla blanca), `.libreta` + `.libreta-cabeza` + `.libreta-grande` + `.celdas` + `.teclas-pie`, `.cuadricula`, `.hoja`, `.indice`, `.chip` (`--verde` disponible/oficial, `--acento` reservada), `.foto`, `.plano`, bandas `.banda--papel|hoja|primaria|acento`.
- **El plano** (curvas de nivel): lo dibuja el script pequeño del final de `src/layouts/Base.astro` en cada `.plano[data-plano]` (`curvas` en la portada, `fragmento` en la banda de recambios, `completo` en el servicio en el campo, con río, camino, setos, el área de servicio en mandarina alrededor de las chinchetas y dos pliegues). Nunca se cambia por una foto ni por un mapa real.
- **Cabecera** (`src/components/Header.astro`): nombre, menú, teléfono (pantallas anchas) y `boton_cabecera` como tecla blanca. **Pie** (`src/components/Footer.astro`): banda de tinta con el nombre grande, horario, dirección, contacto, menú y redes, y en móvil la barra fija «Llamar» + «WhatsApp» (o `boton_cabecera`).
- **Imágenes**: fotos en `public/fotos/` (prompts en `fotos.json`); en `site.yaml` con ruta absoluta (`/fotos/taller.jpg`). Personas: `/placeholders/persona.svg`.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en texto.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (se oculta solo con `false`).

## Secciones (en el orden de `site.yaml`; solo se pintan con `activa: true`)
- `hero` → portada «Stage»: texto sobre el plano de curvas, foto a sangre a la derecha y la libreta del taller encima (teléfono en grande, `items` en celdas, teclas WhatsApp y Cómo llegar).
- `marcas` → índice con filetes en la hoja blanca.
- `maquinaria` → mosaico de fotos por familia de máquinas (la primera manda).
- `recambios` → banda mandarina con filas con filetes, `nota` y teclas (el `cta` y «Por WhatsApp»).
- `ocasion` → libretas de maquinaria de ocasión sobre un tablero de cuadrícula.
- `taller` → banda primaria partida: foto a sangre a la izquierda y trabajos en filas.
- `zonas` → la comarca en el plano (chinchetas, área de servicio, libreta de avería) y la lista de pueblos.
- `preguntas` → filas `details/summary` (no se pinta si está vacía).
- `contacto` → vías, horario en tabla y el formulario dentro de una libreta.
- `texto` → apartado genérico para secciones nuevas (`tipo: texto`).

## Campos propios de esta plantilla (además del esquema común)
- `hero.items[]`: `{ titulo, texto }` = dato y qué es (celdas de la libreta). La plataforma los trata como cifras: no los inventes.
- `marcas.marcas[]`: `{ nombre, gama, relacion, texto }`. `relacion` con «oficial» sale en verde. Solo marcas con las que el negocio trabaje; sin logotipos.
- `maquinaria.items[]`: `{ titulo, texto, imagen, url? }`. `maquinaria.cta`.
- `recambios.items[]`: `{ titulo, texto }`; `recambios.nota`, `recambios.cta`.
- `ocasion.maquinas[]`: `{ nombre, categoria, marca, anio, horas_motor, potencia, carga, precio, estado, texto, imagen, detalle?, slug?, imagenes? }`. `precio` **siempre cadena** («38.500 €»; vacío = no sale; nunca lo inventes). `estado`: «Disponible» (verde), «Reservada» (mandarina) u otro (neutro). Las celdas vacías no salen.
- `taller.items[]`: `{ titulo, texto }`; `taller.imagen`, `taller.cta`.
- `zonas.items[]`: `{ titulo, texto }` (la primera es el pueblo del taller: rombo mandarina en el plano; como mucho 8 chinchetas, la lista de debajo las lleva todas); `zonas.aviso`: `{ titulo, texto }` (la libreta de avería); `zonas.titulo_pagina` y `zonas.texto_pagina` (con `{zona}`); `zonas.imagen` (foto de las páginas de zona).
- `contacto.horario[]`: `{ dia, horas }`. Vacío = sale `contacto.horario` en una línea. `contacto.cta.texto` = texto del botón del formulario.
- `preguntas.preguntas[]`: `{ pregunta, respuesta }`.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, fotos, máquinas**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }` (también «1,20 m»), ponlo entre comillas.
4. **Listas planas**: ningún elemento de lista puede llevar otra lista dentro. Máximo 24 elementos por lista. Precios siempre como cadena.
5. **No inventes** precios, horas de motor, años, marcas oficiales, cifras ni opiniones: si el cliente no lo dice, el campo va vacío.
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
7. **Sección nueva**: mejor con `tipo:` (`tipo: texto`, `tipo: maquinaria`, `tipo: recambios`…) y un id propio en `site.yaml`. `src/pages/index.astro` la recoge sola.
8. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[...pagina].astro`, `tailwind.config.mjs`, `src/styles/comun.css`, `src/lib/*.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts` salvo orden explícita de diseño (son el SEO de base y los ficheros comunes a todas las plantillas). Los ids `hero` y `contacto` no se cambian. `seo.url` y `seo.indexable` los pone la plataforma.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro`, sin JavaScript nuevo salvo necesidad real (ya hay: el plano, el menú móvil y el asunto del formulario), titulares sin palabras partidas, sin scroll horizontal en móvil, `alt` sacado del contenido.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`; la plataforma lo conecta al publicar. No cambies su marcado.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas y zonas)
- Espejo de `fichas:` y `zonas:` de template.yaml en `src/data/fichas.ts`: `secciones.ocasion.maquinas` → `/ocasion/<slug>/` (Product) y `secciones.zonas.items` → `/zonas/<slug>/`.
- **Solo las máquinas con `detalle`** (párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) y **las zonas con `texto`** tienen página. `slug` (no lo pongas sin motivo) e `imagenes` («/fotos/a.jpg; /fotos/b.jpg») son opcionales.
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona) en site.yaml. Nunca crees a mano páginas en `src/pages/ocasion/` ni `src/pages/zonas/`: salen solas de `src/pages/[coleccion]/[slug].astro` y `src/pages/zonas/[slug].astro`.

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "maquinaria; recambios" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Reparto recomendado en `template.yaml → paginas` (Maquinaria, Ocasión, Taller, Contacto; Inicio con la portada y las marcas). Sin la clave, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
