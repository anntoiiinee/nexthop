// Fonctions IPv4 partagées par les outils côté client (quiz, VLSM).
// Les adresses sont des entiers non signés 32 bits ; les additions se font en arithmétique
// classique (pas de bitwise) pour éviter les débordements au-delà de 2^31.

export const toInt = (ip: string): number | null => {
  const parts = ip.trim().split('.');
  if (parts.length !== 4 || parts.some((p) => !/^\d{1,3}$/.test(p) || Number(p) > 255)) return null;
  return parts.reduce((acc, p) => acc * 256 + Number(p), 0);
};

export const toIp = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.');

export const prefixToMask = (p: number) => (p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0);
export const blockSize = (p: number) => 2 ** (32 - p);
export const networkOf = (ip: number, p: number) => (ip & prefixToMask(p)) >>> 0;
export const broadcastOf = (ip: number, p: number) => networkOf(ip, p) + blockSize(p) - 1;

/** Adresses utilisables : /31 = 2 (RFC 3021), /32 = 1, sinon taille - 2. */
export const usableHosts = (p: number) => (p === 32 ? 1 : p === 31 ? 2 : blockSize(p) - 2);

/** Plus petit préfixe pouvant accueillir `hosts` machines. */
export function prefixForHosts(hosts: number, allowP2p31 = false): number | null {
  if (hosts <= 2 && allowP2p31) return hosts === 1 ? 32 : 31;
  for (let p = 30; p >= 0; p--) if (usableHosts(p) >= hosts) return p;
  return null;
}

/** "192.168.10.0/24" → { ip, prefix } */
export function parseCidr(input: string) {
  const m = input.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\s*\/\s*(\d{1,2})$/);
  if (!m) return null;
  const ip = toInt(m[1]);
  const prefix = Number(m[2]);
  return ip === null || prefix > 32 ? null : { ip, prefix };
}

/** Découpe l'intervalle [start, end[ en blocs CIDR alignés les plus grands possibles. */
export function toCidrBlocks(start: number, end: number) {
  const blocks: { network: number; prefix: number }[] = [];
  let cur = start;
  while (cur < end) {
    let p = 32;
    while (p > 0 && cur % blockSize(p - 1) === 0 && cur + blockSize(p - 1) <= end) p--;
    blocks.push({ network: cur, prefix: p });
    cur += blockSize(p);
  }
  return blocks;
}

/** Représentation binaire HTML : bits réseau en bleu, bits hôte en gris. */
export function binaryHtml(ip: number, prefix: number) {
  const bits = ip.toString(2).padStart(32, '0');
  let html = '';
  for (let i = 0; i < 32; i++) {
    if (i > 0 && i % 8 === 0) html += '<span class="text-slate-400">.</span>';
    const cls = i < prefix ? 'font-semibold text-sky-600 dark:text-sky-400' : 'text-slate-400';
    html += `<span class="${cls}">${bits[i]}</span>`;
  }
  return html;
}

/** Remplace {cle} dans un gabarit de traduction. */
export const fmt = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
