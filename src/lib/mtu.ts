// Calcul de MTU à travers des encapsulations empilées.
// Chaque couche transforme la taille du paquet qu'elle transporte en taille du paquet qu'elle produit.
// Les tailles sont celles des paquets IP (ce que mesure la MTU), sans l'en-tête Ethernet du lien physique.

const align = (n: number, block: number) => Math.ceil(n / block) * block;

export interface Layer {
  id: string;
  /** Taille du paquet produit, pour un paquet transporté de `inner` octets */
  outer: (inner: number) => number;
  /** Détail des en-têtes ajoutés, pour l'affichage (le bourrage éventuel est calculé à part) */
  parts: { label: string; bytes: number }[];
  /** Taille variable (bourrage) : l'en-tête n'est pas constant */
  padded?: boolean;
}

export const layers: Record<string, Layer> = {
  vxlan4: {
    id: 'vxlan4',
    outer: (n) => n + 50,
    parts: [{ label: 'IPv4', bytes: 20 }, { label: 'UDP', bytes: 8 }, { label: 'VXLAN', bytes: 8 }, { label: 'Ethernet', bytes: 14 }],
  },
  vxlan6: {
    id: 'vxlan6',
    outer: (n) => n + 70,
    parts: [{ label: 'IPv6', bytes: 40 }, { label: 'UDP', bytes: 8 }, { label: 'VXLAN', bytes: 8 }, { label: 'Ethernet', bytes: 14 }],
  },
  gre: {
    id: 'gre',
    outer: (n) => n + 24,
    parts: [{ label: 'IPv4', bytes: 20 }, { label: 'GRE', bytes: 4 }],
  },
  ipip: {
    id: 'ipip',
    outer: (n) => n + 20,
    parts: [{ label: 'IPv4', bytes: 20 }],
  },
  mpls: {
    id: 'mpls',
    outer: (n) => n + 4,
    parts: [{ label: 'MPLS', bytes: 4 }],
  },
  // ESP en mode tunnel, AES-GCM : IV 8 octets, ICV 16, bourrage à 4 octets (RFC 4106)
  ipsecGcm: {
    id: 'ipsecGcm',
    outer: (n) => 20 + 8 + 8 + align(n + 2, 4) + 16,
    parts: [{ label: 'IPv4', bytes: 20 }, { label: 'ESP', bytes: 8 }, { label: 'IV', bytes: 8 }, { label: 'trailer', bytes: 2 }, { label: 'ICV', bytes: 16 }],
    padded: true,
  },
  // ESP en mode tunnel, AES-CBC + HMAC-SHA-256-128 : IV 16 octets, ICV 16, bourrage au bloc de 16 octets
  ipsecCbc: {
    id: 'ipsecCbc',
    outer: (n) => 20 + 8 + 16 + align(n + 2, 16) + 16,
    parts: [{ label: 'IPv4', bytes: 20 }, { label: 'ESP', bytes: 8 }, { label: 'IV', bytes: 16 }, { label: 'trailer', bytes: 2 }, { label: 'ICV', bytes: 16 }],
    padded: true,
  },
  natt: {
    id: 'natt',
    outer: (n) => n + 8,
    parts: [{ label: 'UDP 4500', bytes: 8 }],
  },
  // WireGuard : en-tête de données 16 octets, tag Poly1305 16, données bourrées à 16 octets
  wireguard4: {
    id: 'wireguard4',
    outer: (n) => 20 + 8 + 16 + align(n, 16) + 16,
    parts: [{ label: 'IPv4', bytes: 20 }, { label: 'UDP', bytes: 8 }, { label: 'WireGuard', bytes: 16 }, { label: 'tag', bytes: 16 }],
    padded: true,
  },
  pppoe: {
    id: 'pppoe',
    outer: (n) => n + 8,
    parts: [{ label: 'PPPoE', bytes: 6 }, { label: 'PPP', bytes: 2 }],
  },
};

/** Taille finale d'un paquet de `inner` octets après toutes les couches (la première est la plus intérieure) */
export const totalSize = (stack: Layer[], inner: number) => stack.reduce((size, layer) => layer.outer(size), inner);

/** Plus grand paquet intérieur qui tient dans `linkMtu` une fois encapsulé */
export function maxInner(stack: Layer[], linkMtu: number): number {
  for (let inner = linkMtu; inner > 0; inner--) {
    if (totalSize(stack, inner) <= linkMtu) return inner;
  }
  return 0;
}

/** MSS TCP correspondant à une MTU IP : en-têtes IP et TCP sans options */
export const mss = (mtu: number, ipv6 = false) => Math.max(0, mtu - (ipv6 ? 60 : 40));
