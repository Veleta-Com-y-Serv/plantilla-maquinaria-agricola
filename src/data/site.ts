// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string; [campo: string]: unknown }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Marca (marcas.marcas): nombre, qué máquinas (`gama`), qué es el negocio para ella (`relacion`) y una línea. */
export interface Marca { nombre: string; gama: string; relacion: string; texto: string }
/**
 * Máquina de ocasión (ocasion.maquinas). Todo escalar y el precio como cadena. Con `detalle`, tiene página propia en
 * /ocasion/<slug>/. Se conserva el objeto original: src/lib/paginas.ts lo reconoce por identidad (enlaceDe).
 */
export interface Maquina {
  nombre: string; categoria?: string; marca?: string; anio?: string; horas_motor?: string; potencia?: string; carga?: string;
  precio?: string; estado?: string; texto?: string; imagen?: string; [campo: string]: unknown;
}

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace | null;
  cta_secundario?: Enlace | null;
  nota?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  /** marcas */
  marcas: Marca[];
  /** ocasion */
  maquinas: Maquina[];
  /** zonas: la tarjeta de avería ({titulo, texto}) */
  aviso: { titulo: string; texto: string };
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
export function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
const enlaceDe = (v: unknown): Enlace | null => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : null;
};
const esObjeto = (x: unknown): x is Crudo => !!x && typeof x === 'object' && !Array.isArray(x);

function normalizar(s: Crudo = {}): Seccion {
  const aviso = esObjeto(s.aviso) ? s.aviso : {};
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    nota: texto(s.nota),
    cta: enlaceDe(s.cta),
    cta_secundario: enlaceDe(s.cta_secundario),
    // Los elementos de `items` conservan su objeto (las zonas se enlazan a su página por identidad).
    items: lista<unknown>(s.items).filter((i): i is Crudo => esObjeto(i) && !!(texto(i.titulo) || texto(i.texto))) as Item[],
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)).map((t) => ({ texto: texto(t.texto), autor: texto(t.autor) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).filter((h) => texto(h.dia) || texto(h.horas)).map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Crudo>(s.preguntas).filter((p) => texto(p.pregunta)).map((p) => ({ pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })),
    marcas: lista<Crudo>(s.marcas)
      .filter((m) => texto(m.nombre))
      .map((m) => ({ nombre: texto(m.nombre), gama: texto(m.gama), relacion: texto(m.relacion), texto: texto(m.texto) })),
    maquinas: lista<unknown>(s.maquinas).filter((m): m is Crudo => esObjeto(m) && !!texto(m.nombre)) as Maquina[],
    aviso: { titulo: texto(aviso.titulo), texto: texto(aviso.texto) },
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#2e4733', acento: '#f26a2d', fondo: '#f4efe5', texto: '#1d1b18', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'AutomotiveBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** ¿El enlace sale de la web? (abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** Atributos para un enlace que puede salir de la web. */
export const fuera = (u?: string): Record<string, string> => (externo(u) ? { rel: 'noopener', target: '_blank' } : {});
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);

/** Primera sección activa con ese id o con `tipo:` igual. Devuelve su id y sus datos. */
export function buscarSeccion(diseno: string): { id: string; s: Seccion } | null {
  const id = Object.keys(site.secciones).find((k) => site.secciones[k].activa && (k === diseno || site.secciones[k].tipo === diseno));
  return id ? { id, s: site.secciones[id] } : null;
}

/** Semilla numérica estable a partir de un texto (el mapa sale siempre igual con los mismos datos). */
export function semilla(t = ''): number {
  let h = 2166136261;
  for (const c of t) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}
