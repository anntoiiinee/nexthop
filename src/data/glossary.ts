import type { Lang } from '@/i18n/ui';

export interface GlossaryEntry {
  term: string;                       // texte affiché par défaut : <Term id="nat" /> → "NAT"
  expansion?: string;                 // forme développée de l'acronyme, en gras dans l'infobulle
  definition: Record<Lang, string>;   // une ou deux phrases, pas plus
}

// Clés en minuscules et en anglais, comme les slugs. Ordre alphabétique.
export const glossary = {
  arp: {
    term: 'ARP',
    expansion: 'Address Resolution Protocol',
    definition: {
      fr: "Protocole qui trouve l'adresse MAC correspondant à une adresse IPv4 sur le réseau local, par une requête diffusée en broadcast.",
      en: 'Protocol that finds the MAC address matching an IPv4 address on the local network, using a broadcast request.',
    },
  },
  bgp: {
    term: 'BGP',
    expansion: 'Border Gateway Protocol',
    definition: {
      fr: "Protocole de routage qui échange des préfixes entre systèmes autonomes (AS). C'est lui qui fait tenir Internet, et il sert aussi de plan de contrôle aux fabrics EVPN.",
      en: 'Routing protocol that exchanges prefixes between autonomous systems (AS). It holds the Internet together and also serves as the control plane of EVPN fabrics.',
    },
  },
  cidr: {
    term: 'CIDR',
    expansion: 'Classless Inter-Domain Routing',
    definition: {
      fr: "Notation qui indique la taille d'un réseau par le nombre de bits du préfixe, par exemple /24, au lieu des anciennes classes A, B et C.",
      en: 'Notation that gives the size of a network as the number of prefix bits, for example /24, instead of the old A, B and C classes.',
    },
  },
  evpn: {
    term: 'EVPN',
    expansion: 'Ethernet VPN',
    definition: {
      fr: 'Extension de BGP qui annonce les adresses MAC et IP des hôtes, pour construire des réseaux de niveau 2 et 3 étendus sans inondation excessive.',
      en: 'BGP extension that advertises host MAC and IP addresses, to build stretched layer 2 and layer 3 networks without excessive flooding.',
    },
  },
  mtu: {
    term: 'MTU',
    expansion: 'Maximum Transmission Unit',
    definition: {
      fr: 'Taille maximale, en octets, d’un paquet pouvant traverser un lien sans être fragmenté. 1500 octets par défaut en Ethernet.',
      en: 'Maximum size, in bytes, of a packet that can cross a link without being fragmented. 1500 bytes by default on Ethernet.',
    },
  },
  nat: {
    term: 'NAT',
    expansion: 'Network Address Translation',
    definition: {
      fr: "Traduction d'adresses IP par un routeur ou un firewall. Elle permet notamment à des machines en adressage privé de sortir sur Internet derrière une adresse publique.",
      en: 'IP address translation performed by a router or firewall. It notably lets hosts with private addresses reach the Internet behind a public address.',
    },
  },
  vlan: {
    term: 'VLAN',
    expansion: 'Virtual LAN',
    definition: {
      fr: 'Réseau local virtuel : découpe un switch en plusieurs domaines de broadcast isolés, identifiés par un numéro de 1 à 4094.',
      en: 'Virtual local network: splits a switch into several isolated broadcast domains, identified by a number from 1 to 4094.',
    },
  },
  vxlan: {
    term: 'VXLAN',
    expansion: 'Virtual Extensible LAN',
    definition: {
      fr: "Encapsulation de trames Ethernet dans de l'UDP, pour transporter des réseaux de niveau 2 au-dessus d'un réseau IP. Jusqu'à 16 millions de segments (VNI).",
      en: 'Encapsulation of Ethernet frames in UDP, to carry layer 2 networks over an IP network. Up to 16 million segments (VNIs).',
    },
  },
} satisfies Record<string, GlossaryEntry>;

export type TermId = keyof typeof glossary;
