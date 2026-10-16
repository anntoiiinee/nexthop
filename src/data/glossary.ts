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
  bpdu: {
    term: 'BPDU',
    expansion: 'Bridge Protocol Data Unit',
    definition: {
      fr: "Message échangé entre switches par le protocole Spanning Tree pour élire le root bridge et détecter les boucles.",
      en: "Message exchanged between switches by Spanning Tree to elect the root bridge and detect loops.",
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
  fcs: {
    term: 'FCS',
    expansion: 'Frame Check Sequence',
    definition: {
      fr: "Les 4 derniers octets d'une trame Ethernet : un code de contrôle (CRC-32) qui permet de détecter une trame abîmée pendant le transport.",
      en: "The last 4 bytes of an Ethernet frame: a check code (CRC-32) used to detect a frame damaged in transit.",
    },
  },
  icmp: {
    term: 'ICMP',
    expansion: 'Internet Control Message Protocol',
    definition: {
      fr: "Protocole de messages de contrôle et d'erreur d'IP. C'est lui qu'utilisent ping (echo request / echo reply) et traceroute.",
      en: "IP's control and error message protocol. It is what ping (echo request / echo reply) and traceroute rely on.",
    },
  },
  lan: {
    term: 'LAN',
    expansion: 'Local Area Network',
    definition: {
      fr: "Réseau local : les machines d'un même site (bureau, étage, salle serveur) reliées par des switches, en général en Ethernet.",
      en: "Local network: the machines of a single site (office, floor, server room) connected by switches, usually over Ethernet.",
    },
  },
  mac: {
    term: 'MAC',
    expansion: 'Media Access Control',
    definition: {
      fr: "Adresse physique de 48 bits gravée dans chaque carte réseau, notée par exemple 00:1c:73:aa:bb:cc. Elle sert à livrer les trames sur le réseau local.",
      en: "48-bit physical address burned into each network card, written for example 00:1c:73:aa:bb:cc. It is used to deliver frames on the local network.",
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
  oui: {
    term: 'OUI',
    expansion: 'Organizationally Unique Identifier',
    definition: {
      fr: "Les 3 premiers octets d'une adresse MAC, attribués par l'IEEE à chaque constructeur (par exemple 00:1c:73 pour Arista).",
      en: "The first 3 bytes of a MAC address, assigned by the IEEE to each vendor (for example 00:1c:73 for Arista).",
    },
  },
  pdu: {
    term: 'PDU',
    expansion: 'Protocol Data Unit',
    definition: {
      fr: "Le nom de l'unité de données à chaque couche : bit (couche 1), trame (2), paquet (3), segment ou datagramme (4).",
      en: "The name of the data unit at each layer: bit (layer 1), frame (2), packet (3), segment or datagram (4).",
    },
  },
  stp: {
    term: 'STP',
    expansion: 'Spanning Tree Protocol',
    definition: {
      fr: "Protocole de couche 2 (IEEE 802.1D) qui bloque certains liens redondants entre switches pour éviter les boucles, et les réactive en cas de panne.",
      en: "Layer 2 protocol (IEEE 802.1D) that blocks some redundant links between switches to prevent loops, and re-enables them on failure.",
    },
  },
  svi: {
    term: 'SVI',
    expansion: 'Switched Virtual Interface',
    definition: {
      fr: "Interface virtuelle d'un switch associée à un VLAN (interface Vlan10). Elle porte une adresse IP et sert de passerelle aux machines du VLAN.",
      en: "Virtual switch interface bound to a VLAN (interface Vlan10). It holds an IP address and acts as the gateway for the VLAN's hosts.",
    },
  },
  tcp: {
    term: 'TCP',
    expansion: 'Transmission Control Protocol',
    definition: {
      fr: "Protocole de transport fiable de la couche 4 : connexion établie au préalable, accusés de réception et retransmission des données perdues.",
      en: "Reliable layer 4 transport protocol: connection set up beforehand, acknowledgements and retransmission of lost data.",
    },
  },
  ttl: {
    term: 'TTL',
    expansion: 'Time To Live',
    definition: {
      fr: "Compteur de l'en-tête IP, décrémenté de 1 par chaque routeur. À 0, le paquet est détruit : une boucle de routage ne peut donc pas durer indéfiniment.",
      en: "Counter in the IP header, decremented by 1 by each router. At 0 the packet is dropped, so a routing loop cannot last forever.",
    },
  },
  udp: {
    term: 'UDP',
    expansion: 'User Datagram Protocol',
    definition: {
      fr: "Protocole de transport léger de la couche 4 : pas de connexion ni de retransmission. Utilisé par le DNS, la voix sur IP ou VXLAN.",
      en: "Lightweight layer 4 transport protocol: no connection and no retransmission. Used by DNS, voice over IP or VXLAN.",
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
