// Décodage de certificats X.509 et de demandes de certificat (CSR, PKCS#10), 100 % côté navigateur.
// Petit lecteur ASN.1 DER sans dépendance : on ne lit que ce dont l'outil a besoin.

// ---------- ASN.1 DER ----------

interface Node {
  cls: number;          // 0 universel, 1 application, 2 contexte, 3 privé
  constructed: boolean;
  tag: number;
  start: number;        // début de l'en-tête
  header: number;       // taille de l'en-tête
  length: number;       // taille du contenu
}

function readNode(buf: Uint8Array, pos: number): Node {
  if (pos + 2 > buf.length) throw new Error('données tronquées');
  const first = buf[pos];
  let tag = first & 0x1f;
  let p = pos + 1;
  if (tag === 0x1f) {
    tag = 0;
    while (buf[p] & 0x80) tag = (tag << 7) | (buf[p++] & 0x7f);
    tag = (tag << 7) | (buf[p++] & 0x7f);
  }
  let length = buf[p++];
  if (length & 0x80) {
    const n = length & 0x7f;
    if (n === 0 || n > 4) throw new Error('longueur ASN.1 non supportée');
    length = 0;
    for (let i = 0; i < n; i++) length = length * 256 + buf[p++];
  }
  if (p + length > buf.length) throw new Error('données tronquées');
  return { cls: first >> 6, constructed: (first & 0x20) !== 0, tag, start: pos, header: p - pos, length };
}

const content = (buf: Uint8Array, n: Node) => buf.subarray(n.start + n.header, n.start + n.header + n.length);

function children(buf: Uint8Array, n: Node): Node[] {
  const out: Node[] = [];
  let pos = n.start + n.header;
  const end = pos + n.length;
  while (pos < end) {
    const child = readNode(buf, pos);
    out.push(child);
    pos = child.start + child.header + child.length;
  }
  return out;
}

const isUniversal = (n: Node, tag: number) => n.cls === 0 && n.tag === tag;
const isContext = (n: Node, tag: number) => n.cls === 2 && n.tag === tag;

function oid(bytes: Uint8Array): string {
  const parts: number[] = [];
  let value = 0;
  for (let i = 0; i < bytes.length; i++) {
    value = value * 128 + (bytes[i] & 0x7f);
    if (!(bytes[i] & 0x80)) {
      if (parts.length === 0) {
        const first = value < 80 ? Math.floor(value / 40) : 2;
        parts.push(first, value - first * 40);
      } else parts.push(value);
      value = 0;
    }
  }
  return parts.join('.');
}

const hex = (bytes: Uint8Array, sep = ':') => [...bytes].map((b) => b.toString(16).padStart(2, '0')).join(sep).toUpperCase();

function text(buf: Uint8Array, n: Node): string {
  const bytes = content(buf, n);
  switch (n.tag) {
    case 30: { // BMPString (UTF-16 BE)
      let s = '';
      for (let i = 0; i + 1 < bytes.length; i += 2) s += String.fromCharCode((bytes[i] << 8) | bytes[i + 1]);
      return s;
    }
    case 20: // T61String : traité comme latin-1
      return String.fromCharCode(...bytes);
    default: // UTF8String, PrintableString, IA5String…
      return new TextDecoder().decode(bytes);
  }
}

function time(buf: Uint8Array, n: Node): Date {
  const s = new TextDecoder().decode(content(buf, n));
  const m = n.tag === 23
    ? s.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?Z$/)
    : s.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?(?:\.\d+)?Z$/);
  if (!m) throw new Error(`date invalide : ${s}`);
  let year = Number(m[1]);
  if (n.tag === 23) year += year < 50 ? 2000 : 1900;
  return new Date(Date.UTC(year, Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6] ?? 0)));
}

// ---------- Tables d'OID ----------

const NAME_ATTRS: Record<string, string> = {
  '2.5.4.3': 'CN', '2.5.4.6': 'C', '2.5.4.7': 'L', '2.5.4.8': 'ST', '2.5.4.9': 'street', '2.5.4.10': 'O',
  '2.5.4.11': 'OU', '2.5.4.5': 'serialNumber', '2.5.4.12': 'title', '2.5.4.42': 'GN', '2.5.4.4': 'SN',
  '1.2.840.113549.1.9.1': 'emailAddress', '0.9.2342.19200300.100.1.25': 'DC', '0.9.2342.19200300.100.1.1': 'UID',
};

// Noms neutres (affichés tels quels en FR comme en EN)
const SIG_ALGS: Record<string, string> = {
  '1.2.840.113549.1.1.4': 'RSA · MD5', '1.2.840.113549.1.1.5': 'RSA · SHA-1',
  '1.2.840.113549.1.1.11': 'RSA · SHA-256', '1.2.840.113549.1.1.12': 'RSA · SHA-384',
  '1.2.840.113549.1.1.13': 'RSA · SHA-512', '1.2.840.113549.1.1.10': 'RSASSA-PSS',
  '1.2.840.10045.4.1': 'ECDSA · SHA-1', '1.2.840.10045.4.3.2': 'ECDSA · SHA-256',
  '1.2.840.10045.4.3.3': 'ECDSA · SHA-384', '1.2.840.10045.4.3.4': 'ECDSA · SHA-512',
  '1.3.101.112': 'Ed25519', '1.3.101.113': 'Ed448',
};

const CURVES: Record<string, string> = {
  '1.2.840.10045.3.1.7': 'P-256', '1.3.132.0.34': 'P-384', '1.3.132.0.35': 'P-521', '1.3.132.0.10': 'secp256k1',
};

const EKU: Record<string, string> = {
  '1.3.6.1.5.5.7.3.1': 'serverAuth', '1.3.6.1.5.5.7.3.2': 'clientAuth', '1.3.6.1.5.5.7.3.3': 'codeSigning',
  '1.3.6.1.5.5.7.3.4': 'emailProtection', '1.3.6.1.5.5.7.3.8': 'timeStamping', '1.3.6.1.5.5.7.3.9': 'OCSPSigning',
  '1.3.6.1.4.1.311.20.2.2': 'smartcardLogon',
};

const KEY_USAGE = [
  'digitalSignature', 'nonRepudiation', 'keyEncipherment', 'dataEncipherment',
  'keyAgreement', 'keyCertSign', 'cRLSign', 'encipherOnly', 'decipherOnly',
];

const OTHER_EXTENSIONS: Record<string, string> = {
  '2.5.29.32': 'certificatePolicies', '1.3.6.1.4.1.11129.2.4.2': 'SCT (Certificate Transparency)',
  '2.5.29.30': 'nameConstraints', '2.5.29.36': 'policyConstraints', '2.5.29.54': 'inhibitAnyPolicy',
  '1.3.6.1.5.5.7.1.24': 'TLS Feature (OCSP must-staple)',
};

// ---------- Structures X.509 ----------

export interface Rdn { type: string; value: string }

export interface PublicKeyInfo { algorithm: string; size?: number; curve?: string; summary: string }

export interface DecodedCert {
  kind: 'certificate' | 'csr';
  version: number;
  subject: Rdn[];
  issuer: Rdn[];
  serial?: string;
  notBefore?: Date;
  notAfter?: Date;
  signatureAlgorithm: string;
  publicKey: PublicKeyInfo;
  san: string[];
  keyUsage: string[];
  extKeyUsage: string[];
  basicConstraints?: { ca: boolean; pathLen?: number };
  subjectKeyId?: string;
  authorityKeyId?: string;
  ocsp: string[];
  caIssuers: string[];
  crl: string[];
  otherExtensions: string[];
  selfSigned: boolean;
  der: Uint8Array;
}

function name(buf: Uint8Array, n: Node): Rdn[] {
  const out: Rdn[] = [];
  for (const set of children(buf, n)) {
    for (const atv of children(buf, set)) {
      const [type, value] = children(buf, atv);
      const id = oid(content(buf, type));
      out.push({ type: NAME_ATTRS[id] ?? id, value: text(buf, value) });
    }
  }
  return out;
}

export const formatName = (rdns: Rdn[]) => rdns.map((r) => `${r.type}=${r.value}`).join(', ');
export const commonName = (rdns: Rdn[]) => rdns.find((r) => r.type === 'CN')?.value;

function publicKey(buf: Uint8Array, spki: Node): PublicKeyInfo {
  const [algId, bits] = children(buf, spki);
  const [algOid, params] = children(buf, algId);
  const alg = oid(content(buf, algOid));
  const keyBytes = content(buf, bits).subarray(1); // premier octet : bits inutilisés

  if (alg === '1.2.840.113549.1.1.1') {
    const rsa = readNode(keyBytes, 0);
    const [modulus, exponent] = children(keyBytes, rsa);
    let m = content(keyBytes, modulus);
    while (m.length > 1 && m[0] === 0) m = m.subarray(1);
    const size = (m.length - 1) * 8 + Math.floor(Math.log2(m[0])) + 1;
    const e = [...content(keyBytes, exponent)].reduce((acc, b) => acc * 256 + b, 0);
    return { algorithm: 'RSA', size, summary: `RSA ${size} bits · e=${e}` };
  }
  if (alg === '1.2.840.10045.2.1') {
    const curveOid = params && isUniversal(params, 6) ? oid(content(buf, params)) : '';
    const curve = CURVES[curveOid] ?? curveOid;
    const size = { 'P-256': 256, 'P-384': 384, 'P-521': 521, secp256k1: 256 }[curve];
    return { algorithm: 'EC', curve, size, summary: `ECDSA ${curve}` };
  }
  if (alg === '1.3.101.112') return { algorithm: 'Ed25519', size: 256, summary: 'Ed25519' };
  if (alg === '1.3.101.113') return { algorithm: 'Ed448', size: 456, summary: 'Ed448' };
  return { algorithm: alg, summary: alg };
}

/** Écriture courte d'une adresse IPv6 : la plus longue suite de groupes nuls devient « :: ». */
function ipv6(bytes: Uint8Array): string {
  const groups: number[] = [];
  for (let i = 0; i < 16; i += 2) groups.push((bytes[i] << 8) | bytes[i + 1]);
  let best = -1, bestLen = 0;
  for (let i = 0; i < 8; i++) {
    let j = i;
    while (j < 8 && groups[j] === 0) j++;
    if (j - i > bestLen && j - i > 1) { best = i; bestLen = j - i; }
    i = j > i ? j - 1 : i;
  }
  const h = groups.map((g) => g.toString(16));
  if (best < 0) return h.join(':');
  return `${h.slice(0, best).join(':')}::${h.slice(best + bestLen).join(':')}`;
}

function generalNames(buf: Uint8Array, seq: Node): string[] {
  return children(buf, seq).flatMap((gn) => {
    if (gn.cls !== 2) return [];
    const bytes = content(buf, gn);
    switch (gn.tag) {
      case 1: return [`email:${new TextDecoder().decode(bytes)}`];
      case 2: return [`DNS:${new TextDecoder().decode(bytes)}`];
      case 6: return [`URI:${new TextDecoder().decode(bytes)}`];
      case 7:
        if (bytes.length === 4) return [`IP:${[...bytes].join('.')}`];
        if (bytes.length === 16) return [`IP:${ipv6(bytes)}`];
        return [];
      case 4: return [`DirName:${formatName(name(buf, readNode(buf, gn.start + gn.header)))}`];
      default: return [];
    }
  });
}

/** Toutes les URI (GeneralName [6]) contenues dans une structure, à n'importe quelle profondeur. */
function uris(buf: Uint8Array, n: Node): string[] {
  if (isContext(n, 6) && !n.constructed) return [new TextDecoder().decode(content(buf, n))];
  if (!n.constructed) return [];
  return children(buf, n).flatMap((c) => uris(buf, c));
}

function applyExtensions(buf: Uint8Array, extensions: Node, out: DecodedCert) {
  for (const ext of children(buf, extensions)) {
    const parts = children(buf, ext);
    const id = oid(content(buf, parts[0]));
    const valueNode = parts[parts.length - 1];        // l'OCTET STRING, après le booléen « critical » optionnel
    const inner = content(buf, valueNode);
    const root = readNode(inner, 0);
    switch (id) {
      case '2.5.29.17': out.san = generalNames(inner, root); break;
      case '2.5.29.19': {
        const c = children(inner, root);
        const ca = c.length > 0 && isUniversal(c[0], 1) && content(inner, c[0])[0] !== 0;
        const pl = c.find((x) => isUniversal(x, 2));
        out.basicConstraints = { ca, pathLen: pl ? content(inner, pl).reduce((a, b) => a * 256 + b, 0) : undefined };
        break;
      }
      case '2.5.29.15': {
        const bits = content(inner, root);
        out.keyUsage = KEY_USAGE.filter((_, i) => {
          const byte = bits[1 + Math.floor(i / 8)];
          return byte !== undefined && (byte & (0x80 >> (i % 8))) !== 0;
        });
        break;
      }
      case '2.5.29.37':
        out.extKeyUsage = children(inner, root).map((o) => { const v = oid(content(inner, o)); return EKU[v] ?? v; });
        break;
      case '2.5.29.14': out.subjectKeyId = hex(content(inner, root)); break;
      case '2.5.29.35': {
        const keyId = children(inner, root).find((x) => isContext(x, 0));
        if (keyId) out.authorityKeyId = hex(content(inner, keyId));
        break;
      }
      case '1.3.6.1.5.5.7.1.1':
        for (const ad of children(inner, root)) {
          const [method, location] = children(inner, ad);
          const m = oid(content(inner, method));
          const found = uris(inner, location);
          if (m === '1.3.6.1.5.5.7.48.1') out.ocsp.push(...found);
          if (m === '1.3.6.1.5.5.7.48.2') out.caIssuers.push(...found);
        }
        break;
      case '2.5.29.31': out.crl = uris(inner, root); break;
      default: out.otherExtensions.push(OTHER_EXTENSIONS[id] ?? id);
    }
  }
}

export function decodeDer(der: Uint8Array, hint?: 'certificate' | 'csr'): DecodedCert {
  const root = readNode(der, 0);
  const [info, sigAlg] = children(der, root);
  const fields = children(der, info);

  // Un certificat commence par [0] version ou par le numéro de série suivi d'un AlgorithmIdentifier ;
  // une CSR par la version suivie du nom (un SET).
  const looksLikeCsr = hint === 'csr' || (hint !== 'certificate' && isUniversal(fields[0], 2)
    && fields[1] && isUniversal(fields[1], 16) && children(der, fields[1]).every((c) => isUniversal(c, 17)));

  const out: DecodedCert = {
    kind: looksLikeCsr ? 'csr' : 'certificate', version: 1, subject: [], issuer: [],
    signatureAlgorithm: '', publicKey: { algorithm: '', summary: '' },
    san: [], keyUsage: [], extKeyUsage: [], ocsp: [], caIssuers: [], crl: [], otherExtensions: [],
    selfSigned: false, der,
  };
  const sigOid = oid(content(der, children(der, sigAlg)[0]));
  out.signatureAlgorithm = SIG_ALGS[sigOid] ?? sigOid;

  if (looksLikeCsr) {
    const [version, subject, spki, attrs] = fields;
    out.version = content(der, version)[0] + 1;
    out.subject = name(der, subject);
    out.publicKey = publicKey(der, spki);
    if (attrs && isContext(attrs, 0)) {
      for (const attr of children(der, attrs)) {
        const [type, values] = children(der, attr);
        if (oid(content(der, type)) === '1.2.840.113549.1.9.14') {
          const extensions = children(der, values)[0];
          if (extensions) applyExtensions(der, extensions, out);
        }
      }
    }
    return out;
  }

  let i = 0;
  if (isContext(fields[0], 0)) {
    out.version = content(der, children(der, fields[0])[0])[0] + 1;
    i = 1;
  }
  const serial = content(der, fields[i]);
  out.serial = hex(serial[0] === 0 && serial.length > 1 ? serial.subarray(1) : serial);
  out.issuer = name(der, fields[i + 2]);
  const [nb, na] = children(der, fields[i + 3]);
  out.notBefore = time(der, nb);
  out.notAfter = time(der, na);
  out.subject = name(der, fields[i + 4]);
  out.publicKey = publicKey(der, fields[i + 5]);
  const extensions = fields.slice(i + 6).find((f) => isContext(f, 3));
  if (extensions) applyExtensions(der, children(der, extensions)[0], out);
  out.selfSigned = formatName(out.issuer) === formatName(out.subject)
    && (!out.authorityKeyId || out.authorityKeyId === out.subjectKeyId);
  return out;
}

// ---------- Entrées : PEM, Base64 ou DER ----------

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64.replace(/[^A-Za-z0-9+/=]/g, ''));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export interface DecodeResult { items: DecodedCert[]; errors: string[] }

/** Décode tous les certificats et CSR d'un texte PEM (une chaîne complète est acceptée). */
export function decodePem(input: string): DecodeResult {
  const items: DecodedCert[] = [];
  const errors: string[] = [];
  const blocks = [...input.matchAll(/-----BEGIN ([A-Z0-9 ]+)-----([\s\S]*?)-----END \1-----/g)];

  if (blocks.length === 0 && input.trim()) {
    try { items.push(decodeDer(base64ToBytes(input))); } // du Base64 sans en-tête
    catch { errors.push('no-pem'); }
    return { items, errors };
  }
  for (const [, label, body] of blocks) {
    if (/PRIVATE KEY/.test(label)) { errors.push('private-key'); continue; }
    const hint = /CERTIFICATE REQUEST/.test(label) ? 'csr' : /CERTIFICATE/.test(label) ? 'certificate' : undefined;
    if (!hint) { errors.push(`unsupported:${label}`); continue; }
    try { items.push(decodeDer(base64ToBytes(body), hint)); }
    catch (e) { errors.push(`invalid:${(e as Error).message}`); }
  }
  return { items, errors };
}

/** Décode un fichier : PEM (texte) ou DER (binaire). */
export function decodeFile(bytes: Uint8Array): DecodeResult {
  const asText = new TextDecoder().decode(bytes);
  if (asText.includes('-----BEGIN')) return decodePem(asText);
  try { return { items: [decodeDer(bytes)], errors: [] }; }
  catch (e) { return { items: [], errors: [`invalid:${(e as Error).message}`] }; }
}
