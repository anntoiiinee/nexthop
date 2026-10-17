// Schéma d'une topologie ContainerLab, partagé par le schéma des labs (au build) et le visualiseur (dans le navigateur).
// layoutClab() place les équipements à partir du YAML déjà analysé ; clabSvg() produit le SVG.

const COL = 180;
const ROW = 140;
const PAD = 30;
const NODE_W = 132;
const NODE_H = 54;

type Endpoint = { node: string; iface: string };
export type ClabNode = { name: string; kind: string; level: number; subtitle: string; x: number; y: number };
export interface ClabLayout {
  name?: string;
  width: number;
  height: number;
  rows: ClabNode[][];
  edges: { x1: number; y1: number; x2: number; y2: number; labels: { x: number; y: number; text: string }[] }[];
  /** Liens ignorés parce qu'un de leurs équipements n'est pas déclaré dans `nodes` */
  skippedLinks: string[];
}

const ceosKinds = ['arista_ceos', 'ceos'];
export const kindLabels: Record<string, string> = {
  arista_ceos: 'Arista cEOS',
  ceos: 'Arista cEOS',
  linux: 'Linux',
  nokia_srlinux: 'Nokia SR Linux',
  cisco_xrd: 'Cisco XRd',
  cisco_c8000v: 'Cisco 8000v',
  cisco_iol: 'Cisco IOL',
  juniper_crpd: 'Juniper cRPD',
  juniper_vjunosrouter: 'Juniper vJunos',
  bridge: 'Bridge',
};

// Niveau : label "graph-level" de ContainerLab s'il existe, sinon déduit du nom ou du type
const guessLevel = (nodeName: string, kind: string, labels: any) => {
  const level = Number(labels?.['graph-level']);
  if (Number.isFinite(level) && level > 0) return level;
  if (/spine|core|super/i.test(nodeName)) return 1;
  if (/leaf|border|tor|switch|router|fw|firewall/i.test(nodeName)) return 2;
  if (kind === 'linux' || /host|server|client|pc/i.test(nodeName)) return 3;
  return 2;
};

// Liens : format court "node:iface" ou format étendu { node, interface }
const toEndpoint = (ep: any): Endpoint =>
  typeof ep === 'string'
    ? { node: ep.split(':')[0], iface: ep.split(':')[1] ?? '' }
    : { node: ep?.node, iface: ep?.interface ?? '' };

export function layoutClab(doc: any): ClabLayout {
  const topo = doc?.topology ?? {};

  const nodes: ClabNode[] = Object.entries<any>(topo.nodes ?? {}).map(([nodeName, cfg]) => {
    const kind = cfg?.kind ?? topo.defaults?.kind ?? 'linux';
    const exec: string[] = Array.isArray(cfg?.exec) ? cfg.exec : [];
    const ip = exec.map((cmd) => String(cmd).match(/ip\s+(?:addr|address)\s+add\s+(\S+)/)?.[1]).find(Boolean);
    return {
      name: nodeName,
      kind,
      level: guessLevel(nodeName, kind, cfg?.labels),
      subtitle: ip ?? kindLabels[kind] ?? kind,
      x: 0,
      y: 0,
    };
  });
  const byName = new Map(nodes.map((n) => [n.name, n]));

  const skippedLinks: string[] = [];
  const links = (Array.isArray(topo.links) ? topo.links : [])
    .map((l: any) => (Array.isArray(l?.endpoints) ? l.endpoints : []).map(toEndpoint))
    .filter((eps: Endpoint[]) => {
      if (eps.length !== 2) return false;
      if (eps.every((e) => byName.has(e.node))) return true;
      skippedLinks.push(eps.map((e) => `${e.node}:${e.iface}`).join(' ↔ '));
      return false;
    }) as [Endpoint, Endpoint][];

  // Placement : une rangée par niveau, chaque équipement sous ses voisins du dessus
  const cmp = (a: ClabNode, b: ClabNode) => a.name.localeCompare(b.name, undefined, { numeric: true });
  const neighbors = (n: string) =>
    links.flatMap(([a, b]) => (a.node === n ? [b.node] : b.node === n ? [a.node] : []));
  const placed = new Set<string>();
  const barycenter = (n: ClabNode) => {
    const xs = neighbors(n.name).filter((m) => placed.has(m)).map((m) => byName.get(m)!.x);
    return xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : Number.POSITIVE_INFINITY;
  };

  const levels = [...new Set(nodes.map((n) => n.level))].sort((a, b) => a - b);
  const rows = levels.map((l) => nodes.filter((n) => n.level === l));
  const maxCols = Math.max(1, ...rows.map((r) => r.length));
  const width = Math.max(maxCols, 3) * COL + PAD * 2;
  const height = PAD * 2 + Math.max(rows.length - 1, 0) * ROW + NODE_H;

  rows.forEach((row, ri) => {
    row.sort((a, b) => (ri === 0 ? 0 : barycenter(a) - barycenter(b)) || cmp(a, b));
    const start = (width - row.length * COL) / 2 + COL / 2;
    row.forEach((n, i) => {
      n.x = start + i * COL;
      n.y = PAD + ri * ROW + NODE_H / 2;
    });
    row.forEach((n) => placed.add(n.name));
  });

  // Géométrie des liens et position des noms d'interfaces
  const ifaceLabel = (n: ClabNode, iface: string) =>
    ceosKinds.includes(n.kind) ? iface.replace(/^eth(\d+)/, 'Et$1') : iface;

  const edges = links.map(([a, b]) => {
    let p = byName.get(a.node)!;
    let q = byName.get(b.node)!;
    let ep = a;
    let eq = b;
    if (p.y > q.y || (p.y === q.y && p.x > q.x)) {
      [p, q] = [q, p];
      [ep, eq] = [eq, ep];
    }
    const sameRow = p.y === q.y;
    const x1 = sameRow ? p.x + NODE_W / 2 : p.x;
    const y1 = sameRow ? p.y : p.y + NODE_H / 2;
    const x2 = sameRow ? q.x - NODE_W / 2 : q.x;
    const y2 = sameRow ? q.y : q.y - NODE_H / 2;
    const at = (t: number) => ({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
    return {
      x1, y1, x2, y2,
      labels: [
        { ...at(0.2), text: ifaceLabel(p, ep.iface) },
        { ...at(0.8), text: ifaceLabel(q, eq.iface) },
      ],
    };
  });

  return { name: doc?.name, width, height, rows, edges, skippedLinks };
}

const palette = [
  { box: 'fill-violet-50 stroke-violet-400 dark:fill-violet-950 dark:stroke-violet-500', sub: 'fill-violet-700 dark:fill-violet-300' },
  { box: 'fill-sky-50 stroke-sky-400 dark:fill-sky-950 dark:stroke-sky-500', sub: 'fill-sky-700 dark:fill-sky-300' },
  { box: 'fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950 dark:stroke-emerald-500', sub: 'fill-emerald-700 dark:fill-emerald-300' },
  { box: 'fill-amber-50 stroke-amber-400 dark:fill-amber-950 dark:stroke-amber-500', sub: 'fill-amber-700 dark:fill-amber-300' },
];

/** Échappe un texte venant du YAML (le visualiseur affiche ce que colle le visiteur) */
const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function clabSvg(layout: ClabLayout, ariaLabel: string): string {
  const { width, height, rows, edges } = layout;
  const lines = edges
    .map((e) => `<line x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}" stroke-width="2" class="stroke-slate-300 dark:stroke-slate-600" />`)
    .join('');
  const boxes = rows
    .flatMap((row, ri) => {
      const c = palette[Math.min(ri, palette.length - 1)];
      return row.map(
        (n) => `<g>
          <rect x="${n.x - NODE_W / 2}" y="${n.y - NODE_H / 2}" width="${NODE_W}" height="${NODE_H}" rx="10" stroke-width="1.5" class="${c.box}" />
          <text x="${n.x}" y="${n.y - 6}" text-anchor="middle" font-size="14" font-weight="600" class="fill-slate-900 dark:fill-white">${esc(n.name)}</text>
          <text x="${n.x}" y="${n.y + 13}" text-anchor="middle" font-size="11" class="${c.sub}">${esc(n.subtitle)}</text>
        </g>`,
      );
    })
    .join('');
  // Noms d'interfaces, avec un halo pour rester lisibles sur les liens
  const labels = edges
    .flatMap((e) => e.labels)
    .map(
      (l) => `<text x="${l.x}" y="${l.y}" dy="0.35em" text-anchor="middle" font-size="11" stroke-width="4" stroke-linejoin="round" style="paint-order: stroke" class="fill-slate-500 stroke-white dark:fill-slate-400 dark:stroke-slate-950">${esc(l.text)}</text>`,
    )
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" class="mx-auto h-auto w-full font-mono" style="min-width: ${Math.min(width, 520)}px; max-width: ${width}px" role="img" aria-label="${esc(ariaLabel)}">${lines}${boxes}${labels}</svg>`;
}
