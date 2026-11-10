# Maquinaria agrícola y taller: brief de diseño

Plantilla `maquinaria-agricola` creada el 10/11/2026 a partir de `catalogo-productos` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Furrow** de la skill Hallmark (género modern-minimal). De la base solo queda la estructura
técnica (carga de `site.yaml`, formulario, ficheros comunes). Este fichero se queda en el repo: es lo que lee quien
(persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: concesionarios y talleres de maquinaria agrícola, forestal y de jardín de comarca (sectores
  `maquinaria-agricola`, `taller-agricola`, `maquinaria-jardin`, `suministros-agricolas`, `maquinaria`): tractores, aperos
  y remolques nuevos y de ocasión, motosierras, desbrozadoras y cortacéspedes, recambios, taller propio, servicio en el
  campo en campaña, riego y suministros ganaderos. Su cliente (agricultores, ganaderos, ayuntamientos, particulares con
  huerto) quiere ver qué marcas llevan, la ocasión con foto y precio, si le reparan la suya y llamar o pedir precio.
- **Qué tiene que conseguir la web**: que **llamen al taller** o **pidan precio**. El teléfono va en la cabecera, en
  grande en la libreta de la portada y en la de avería; «Pedir precio» en la cabecera, la portada y el formulario; en
  móvil, barra fija con «Llamar» y «WhatsApp».
- **Tono**: de libreta de campo, práctico, con unidades (110 CV, 6.200 h, 8.000 kg). Sí: el cuaderno impermeable del
  tractorista y el plano de la finca. No: el concesionario de lujo con fotos de atardecer ni la tienda online genérica.

## Tema Hallmark y cómo se ha traducido

Furrow (`references/themes/furrow.md`): papel manila, tinta casi negra en filetes, un plano de curvas de nivel generado,
Red Hat Display 600 sobre Red Hat Text con Red Hat Mono para las cifras, teclas moldeadas de 6 px, la libreta
impermeable, una señal mandarina (siempre relleno con tinta encima, nunca letra) y un verde para «lo que está en fecha»
(aquí, «Disponible» y «oficial»).

- **Cuatro colores** → `fondo` = papel manila (`#f4efe5`), `texto` = tinta (`#1d1b18`), `acento` = mandarina (`#f26a2d`:
  tecla principal, foco, borde del área de servicio, banda de recambios), `primario` = verde de campo (`#2e4733`: banda del
  taller y el verde de «Disponible»).
- **Derivados** (`src/styles/global.css`): `--papel-2` (hoja blanca y libreta), `--papel-3`, `--apagado`, `--filete`,
  `--rejilla` (cuadrícula de 8 px), `--curva`/`--curva-fuerte` (siena: mezcla de acento y tinta sobre el papel), `--seto`
  (del primario), `--agua` (pizarra con `oklch(from …)`), `--verde`/`--verde-suave`, `--acento-suave`, `--foco`, y
  `--sobre-primario`/`--sobre-acento` (claro u oscuro según la luminosidad del color del cliente). Probado con primario
  azul claro, acento morado, papel blanco y tinta azul marino: todo legible (texto oscuro sobre el primario claro, blanco
  sobre el morado, la tecla de la banda de acento pasa a tinta).
- **Material**: cabeza de sección con filete de tinta de 1 px a todo el ancho; la hoja blanca con sombra para el índice de
  marcas; la libreta (radio 14, anillo de tinta, sombra alta, cabeza de tinta, celdas sobre cuadrícula partidas por
  filetes de tinta, teclas de 56 px al pie) en la portada, en cada máquina de ocasión, en la avería y en el formulario;
  campos con la etiqueta dentro de la caja; fotos con radio 10 y tratamiento natural por CSS (contraste +8, saturación
  -6). Movimiento quieto: solo los cambios de color de las teclas y el signo de las preguntas.
- **Firma**: «la comarca en el plano» (Range «el día en el plano»): un plano de curvas de nivel generado en canvas
  (marching squares sobre ruido con semilla del nombre y las zonas) con río, camino, setos punteados, dos pliegues y grano
  de papel, las zonas como chinchetas con etiqueta de tinta, el pueblo del taller como rombo mandarina, el área de
  servicio filetada en mandarina como una finca en un plano de registro, la ruta de la furgoneta discontinua y la libreta
  de avería encima. Las curvas también salen, suaves, detrás del texto de la portada y, del color del texto, en la banda
  mandarina («la cuenta sobre la tierra»). Sin JavaScript, las chinchetas y la libreta se ven igual sobre el papel.

## Tipografías y licencias

Red Hat Display 600, Red Hat Text 400 y 500 y Red Hat Mono 400 (Red Hat, diseño de MCKL), todas **OFL-1.1**, woff2
`latin` de Fontsource en `public/fuentes/` (54 KB en total), `font-display: swap`, respaldo del sistema de la misma clase
y `preload` solo de Red Hat Display. Las tres son la superfamilia que declara el tema (Mono solo para cifras que se copian:
años, horas de motor, potencia, carga y el teléfono de la cabecera). Detalle en `public/fuentes/LICENCIAS.md`.

Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`. En Red Hat Display 600 con el interletrado
del tema, «Impermeabilizaciones» mide 9,2 em: el `h1` de la portada va con `clamp()` en móvil (≈34 px a 375) y con `cqi`
en escritorio (10,4 % de su columna); los `h2` llevan `min(clamp(…), 10,5cqi)` con su titular como contenedor, así caben
en cualquier columna.

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | papel | Stage: texto sobre curvas de nivel, foto a sangre a la derecha, la libreta del taller montada encima |
| 2 | `marcas` | papel | índice con filetes en la hoja blanca (material) |
| 3 | `maquinaria` | papel | mosaico de fotos, la primera a media anchura y dos filas |
| 4 | `recambios` | mandarina | filas con filetes y un trozo de plano detrás (material) |
| 5 | `ocasion` | papel | libretas sobre un tablero de cuadrícula (foto dentro de cada una) |
| 6 | `taller` | primario | foto a sangre a la izquierda y trabajos en filas |
| 7 | `zonas` | manila oscuro | la comarca en el plano (firma) y la lista de pueblos |
| 8 | `preguntas` | papel | filas `details` con titular fijo |
| 9 | `contacto` | papel | vías, horario en tabla y el formulario en una libreta |
| — | pie | tinta | nombre como mástil, cuatro columnas, barra móvil |

Se alternan bandas guiadas por foto (portada, maquinaria, taller) con bandas que solo hace el material (índice, campo
mandarina, libretas, plano, filas).

## Listas propias y páginas

- `marcas.marcas` {nombre, gama, relacion, texto}, `ocasion.maquinas` {nombre, categoria, marca, anio, horas_motor,
  potencia, carga, precio, estado, texto, imagen, detalle}, `zonas.items` {titulo, texto} con `zonas.aviso` {titulo, texto},
  `contacto.horario` {dia, horas}; `maquinaria`, `recambios` y `taller` usan `items`.
- Fichas: cada máquina de ocasión con `detalle` en `/ocasion/<slug>/` (`Product`, con oferta si el precio es un importe).
  Zonas: cada pueblo con `texto` en `/zonas/<slug>/` («Taller de maquinaria agrícola en {zona}»): es un oficio que sale al
  campo. La demo pública tiene que ir en Ejea de los Caballeros para enseñar las páginas por zona.
- Varias páginas recomendadas: Maquinaria (maquinaria, recambios), Ocasión, Taller (taller, zonas), Contacto (preguntas,
  contacto); Inicio con la portada y las marcas.

## Fotos

11 fotos generadas con IA (nanobanana) a partir de `fotos.json`: tractor gris delante de la nave (portada), fila de
tractores nuevos, grada de discos, remolque basculante nuevo, desbrozadora en un olivar, aspersor sobre maíz, tractor rojo,
rotoempacadora y remolque azul de ocasión, interior del taller (vertical) y furgoneta taller en el campo. Sin texto
legible, sin logotipos, sin caras (el mecánico, de espaldas). El generador da 1024 × 1024: se recortan al aspecto y se
amplían como mucho ×1,5 (portada a 1536 px), así que conviene que el cliente ponga las suyas. Algunas máquinas recuerdan
por color a marcas conocidas (el tractor verde con llantas amarillas de la fila); no llevan logotipos.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como etiqueta de Red Hat Text en caja normal (Hallmark prohíbe el antetítulo).
- Los `items` de la portada la plataforma los trata como cifras: salen como celdas de la libreta y no van en el guion.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera) y `comun.css` (común a
  todas las plantillas) trae colores literales y etiquetas en mayúsculas que aquí se anulan; el guion «—» que ve sloplint
  es la opción vacía del desplegable del formulario, cuyo marcado es contrato.
- La segunda tecla de la portada es la tecla blanca moldeada del tema; sloplint la cuenta como segundo relleno (F4).
- Hallmark pide 450 palabras por página; esta pasa de 900 con marcas, ocasión, zonas y preguntas. Se queda así porque es
  contenido que el cliente necesita.
- Furrow numera las curvas de nivel cada cinco; aquí no llevan cota (sería una cifra inventada).
