// Fonctions IPv6 du calculateur. Une adresse est un BigInt de 128 bits.

const MAX = (1n << 128n) - 1n;

/** Analyse une adresse IPv6 (formes complète, compressée « :: », ou avec IPv4 finale) */
export function parseIpv6(input: string): bigint | null {
  let s = input.trim().toLowerCase();
  if (!s || /[^0-9a-f:.]/.test(s)) return null;

  // IPv4 en fin d'adresse (::ffff:192.0.2.1) : convertie en deux groupes hexadécimaux
  const v4 = s.match(/^(.*:)(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (v4) {
    const parts = v4[2].split('.').map(Number);
    if (parts.some((n) => n > 255)) return null;
    s = v4[1] + ((parts[0] << 8) | parts[1]).toString(16) + ':' + ((parts[2] << 8) | parts[3]).toString(16);
  } else if (s.includes('.')) return null;

  const halves = s.split('::');
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(':') : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  if ([...head, ...tail].some((g) => !/^[0-9a-f]{1,4}$/.test(g))) return null;

  let groups: string[];
  if (halves.length === 2) {
    const missing = 8 - head.length - tail.length;
    if (missing < 1) return null;
    groups = [...head, ...Array(missing).fill('0'), ...tail];
  } else {
    groups = head;
  }
  if (groups.length !== 8) return null;
  return groups.reduce((acc, g) => (acc << 16n) | BigInt(parseInt(g, 16)), 0n);
}

const groupsOf = (n: bigint) => Array.from({ length: 8 }, (_, i) => Number((n >> BigInt(112 - i * 16)) & 0xffffn));

/** Forme complète : 8 groupes de 4 chiffres */
export const fullForm = (n: bigint) => groupsOf(n).map((g) => g.toString(16).padStart(4, '0')).join(':');

/** Forme compressée recommandée (RFC 5952) : zéros de tête retirés, plus longue suite de groupes nuls (≥ 2) remplacée par « :: » */
export function compressedForm(n: bigint): string {
  const groups = groupsOf(n);
  let best = -1;
  let bestLen = 0;
  for (let i = 0; i < 8; ) {
    if (groups[i] !== 0) { i++; continue; }
    let j = i;
    while (j < 8 && groups[j] === 0) j++;
    if (j - i > bestLen) { best = i; bestLen = j - i; }
    i = j;
  }
  const hex = groups.map((g) => g.toString(16));
  if (bestLen < 2) return hex.join(':');
  return `${hex.slice(0, best).join(':')}::${hex.slice(best + bestLen).join(':')}`;
}

export const maskOf = (prefix: number) => (prefix === 0 ? 0n : (MAX << BigInt(128 - prefix)) & MAX);
export const networkOf = (n: bigint, prefix: number) => n & maskOf(prefix);
export const lastOf = (n: bigint, prefix: number) => networkOf(n, prefix) | (~maskOf(prefix) & MAX);

/** "2001:db8::1/64" → { address, prefix } ; sans préfixe, /128 */
export function parseCidr6(input: string) {
  const m = input.trim().match(/^([^/\s]+)\s*(?:\/\s*(\d{1,3}))?$/);
  if (!m) return null;
  const address = parseIpv6(m[1]);
  const prefix = m[2] === undefined ? 128 : Number(m[2]);
  if (address === null || prefix > 128) return null;
  return { address, prefix };
}

/** Plage spéciale à laquelle appartient l'adresse (la plus spécifique d'abord) */
const ranges: { cidr: string; key: string }[] = [
  { cidr: '::/128', key: 'unspecified' },
  { cidr: '::1/128', key: 'loopback' },
  { cidr: '::ffff:0:0/96', key: 'mapped' },
  { cidr: '64:ff9b::/96', key: 'nat64' },
  { cidr: '2001:db8::/32', key: 'documentation' },
  { cidr: '2002::/16', key: 'sixToFour' },
  { cidr: 'fe80::/10', key: 'linkLocal' },
  { cidr: 'fc00::/7', key: 'ula' },
  { cidr: 'ff00::/8', key: 'multicast' },
  { cidr: '2000::/3', key: 'global' },
];

export function addressType(n: bigint): string {
  for (const r of ranges) {
    const { address, prefix } = parseCidr6(r.cidr)!;
    if (networkOf(n, prefix) === address) return r.key;
  }
  return 'reserved';
}

/** Identifiant d'interface EUI-64 à partir d'une adresse MAC (bit U/L inversé, ff:fe inséré au milieu) */
export function eui64(mac: string): bigint | null {
  const hex = mac.trim().toLowerCase().replace(/[^0-9a-f]/g, '');
  if (hex.length !== 12 || !/^[0-9a-f:.\-\s]+$/i.test(mac.trim())) return null;
  const bytes = hex.match(/../g)!.map((b) => parseInt(b, 16));
  bytes[0] ^= 0x02;
  const id = [...bytes.slice(0, 3), 0xff, 0xfe, ...bytes.slice(3)];
  return id.reduce((acc, b) => (acc << 8n) | BigInt(b), 0n);
}

/** Zone DNS inverse (ip6.arpa) : un chiffre hexadécimal par label, à l'envers */
export const reverseDns = (n: bigint) =>
  fullForm(n).replace(/:/g, '').split('').reverse().join('.') + '.ip6.arpa';

const superscript = (n: number) => String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]);

/** 2^bits lisible : nombre exact jusqu'à 2^53, puis puissance de 2 et ordre de grandeur (2⁶⁴ ≈ 1,8 × 10¹⁹) */
export function powerOfTwo(bits: number, locale: string): string {
  if (bits <= 53) return (2 ** bits).toLocaleString(locale);
  const [mantissa, exponent] = (2 ** bits).toExponential(1).split('e');
  return `2${superscript(bits)} ≈ ${Number(mantissa).toLocaleString(locale)} × 10${superscript(Number(exponent))}`;
}
