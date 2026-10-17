// Page « Aller plus loin » : événements, podcasts, communautés, blogs, livres, labs et formations.
//
// Une partie de cette sélection provient de la liste « awesome-network-automation » de Network to Code
// (https://github.com/networktocode/awesome-network-automation), publiée sous licence CC BY 4.0 :
// les entrées ont été traduites, triées et complétées (ressources francophones, réseau et sécurité).
//
// Événements : `start` et `end` au format AAAA-MM-JJ. Une fois `end` passée (à la date du build), l'événement
// n'affiche plus de date mais son rythme habituel (`recurring`). Sans date connue, seul `recurring` s'affiche.
// `attending: true` affiche le badge « J'y serai ! ».

type T = { fr: string; en: string };

export type EventFormat = 'onsite' | 'online' | 'hybrid';

export interface EventItem {
  name: string;
  url: string;
  format: EventFormat;
  location: T;
  start?: string;
  end?: string;
  recurring: T;
  description: T;
  attending?: boolean;
  french?: boolean;
}

export interface ResourceItem {
  name: string;
  url: string;
  description: T;
  author?: string;
  french?: boolean; // ressource en français
}

export const awesomeNetworkAutomation = {
  name: 'awesome-network-automation',
  url: 'https://github.com/networktocode/awesome-network-automation',
  author: 'Network to Code',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
};

export const events: EventItem[] = [
  {
    name: 'RIPE 93',
    url: 'https://ripe93.ripe.net/',
    format: 'hybrid',
    location: { fr: 'Sofia, Bulgarie, et en ligne', en: 'Sofia, Bulgaria, and online' },
    start: '2026-10-26',
    end: '2026-10-30',
    recurring: { fr: 'Deux fois par an, en Europe ou au Moyen-Orient, avec participation à distance', en: 'Twice a year, in Europe or the Middle East, with remote participation' },
    description: { fr: "La réunion de la communauté du RIPE NCC, le registre d'adresses de l'Europe : routage, DNS, IPv6, sécurité d'Internet. Les sessions sont retransmises et archivées.", en: "The meeting of the RIPE NCC community, Europe's address registry: routing, DNS, IPv6, Internet security. Sessions are streamed and archived." },
  },
  {
    name: 'Arista Cloud Builders Milan',
    url: 'https://events.arista.com/arista-cloud-builders-milan-2026',
    format: 'onsite',
    location: { fr: 'Milan, Italie', en: 'Milan, Italy' },
    start: '2026-11-05',
    end: '2026-11-05',
    recurring: { fr: "Une tournée d'une journée par ville, chaque automne en Europe", en: 'A one-day stop per city, every autumn across Europe' },
    description: { fr: "Une journée technique d'Arista : design de data center, automatisation, analytics et sécurité.", en: "A technical day by Arista: data center design, automation, analytics and security." },
  },
  {
    name: 'AutoCon 6',
    url: 'https://networkautomation.forum/autocon6',
    format: 'onsite',
    location: { fr: 'Tucson, États-Unis', en: 'Tucson, USA' },
    start: '2026-11-16',
    end: '2026-11-20',
    recurring: { fr: "Deux fois par an, une édition en Amérique du Nord et une en Europe", en: 'Twice a year, one edition in North America and one in Europe' },
    description: { fr: "La conférence du Network Automation Forum, entièrement consacrée à l'automatisation réseau : retours d'expérience, ateliers, outils libres.", en: 'The Network Automation Forum conference, entirely dedicated to network automation: case studies, workshops, open-source tools.' },
  },
  {
    name: 'Arista Cloud Builders Paris',
    url: 'https://events.arista.com/arista-cloud-builders-paris-2026',
    format: 'onsite',
    location: { fr: 'NewCap Event Center, Paris 15e', en: 'NewCap Event Center, Paris' },
    start: '2026-11-25',
    end: '2026-11-25',
    recurring: { fr: "Chaque automne, à Paris, dans la tournée européenne d'Arista", en: "Every autumn in Paris, as part of Arista's European tour" },
    description: { fr: "Une journée technique d'Arista, de 9 h à 17 h : design de data center, automatisation, analytics, sécurité, campus et détection des menaces réseau.", en: 'A technical day by Arista, 9 am to 5 pm: data center design, automation, analytics, security, campus and network threat detection.' },
    attending: true,
    french: true,
  },
  {
    name: 'Cisco Live EMEA',
    url: 'https://www.ciscolive.com/emea/cisco-live-2027.html',
    format: 'hybrid',
    location: { fr: 'ExCeL, Londres, Royaume-Uni', en: 'ExCeL, London, UK' },
    start: '2027-02-08',
    end: '2027-02-12',
    recurring: { fr: 'Chaque année en février, en Europe ; les sessions sont publiées en ligne', en: 'Every February in Europe; sessions are published online' },
    description: { fr: "La grande conférence européenne de Cisco : des centaines de sessions techniques, des labs et des certifications. Les présentations sont ensuite disponibles gratuitement en vidéo.", en: "Cisco's major European conference: hundreds of technical sessions, labs and certifications. Talks are then freely available on video." },
  },
  {
    name: 'Forum InCyber Europe',
    url: 'https://europe.forum-incyber.com/',
    format: 'onsite',
    location: { fr: 'Lille Grand Palais', en: 'Lille Grand Palais, France' },
    start: '2027-03-09',
    end: '2027-03-11',
    recurring: { fr: 'Chaque année au printemps, à Lille', en: 'Every spring in Lille, France' },
    description: { fr: "Le grand rendez-vous européen de la cybersécurité (anciennement FIC) : conférences, exposants, recrutement.", en: 'The major European cybersecurity gathering (formerly FIC): talks, exhibitors, recruiting.' },
    french: true,
  },
  {
    name: 'AutoCon 7',
    url: 'https://networkautomation.forum/autocon7',
    format: 'onsite',
    location: { fr: 'Europe (ville à confirmer)', en: 'Europe (city to be confirmed)' },
    recurring: { fr: 'Printemps 2027, en Europe ; date et ville à confirmer', en: 'Spring 2027, in Europe; date and city to be confirmed' },
    description: { fr: "L'édition européenne de la conférence du Network Automation Forum.", en: "The European edition of the Network Automation Forum conference." },
  },
  {
    name: 'FRnOG',
    url: 'https://www.frnog.org/',
    format: 'hybrid',
    location: { fr: 'Paris, et en vidéo', en: 'Paris, and on video' },
    recurring: { fr: 'Deux fois par an, à Paris ; les présentations sont publiées en vidéo', en: 'Twice a year in Paris; talks are published on video' },
    description: { fr: "Le rendez-vous des opérateurs et ingénieurs réseau francophones : peering, data centers, sécurité, retours d'expérience. Une demi-journée, gratuite, souvent complète : inscrivez-vous tôt.", en: 'The gathering of French-speaking network operators and engineers: peering, data centers, security, case studies. A free half-day, often full: register early.' },
    french: true,
  },
  {
    name: 'NANOG',
    url: 'https://www.nanog.org/',
    format: 'hybrid',
    location: { fr: 'Amérique du Nord, et en ligne', en: 'North America, and online' },
    recurring: { fr: 'Trois fois par an ; les sessions sont retransmises et publiées en vidéo', en: 'Three times a year; sessions are streamed and published on video' },
    description: { fr: "L'équivalent nord-américain du FRnOG, avec une large part de présentations sur l'automatisation et les opérations.", en: "North America's network operators group, with a large share of automation and operations talks." },
  },
  {
    name: 'Tech Field Day',
    url: 'https://techfieldday.com/',
    format: 'online',
    location: { fr: 'En ligne', en: 'Online' },
    recurring: { fr: 'Toute l\'année, en vidéo', en: 'All year round, on video' },
    description: { fr: "Des constructeurs présentent leurs produits devant des ingénieurs indépendants, qui posent les questions qui fâchent. Tout est filmé et publié.", en: 'Vendors present their products to independent engineers who ask the hard questions. Everything is filmed and published.' },
  },
];

export const podcasts: ResourceItem[] = [
  {
    name: 'Software Gone Wild',
    url: 'https://www.ipspace.net/Podcast/Software_Gone_Wild',
    author: 'Ivan Pepelnjak (ipSpace.net)',
    description: { fr: "Architectures, automatisation et technologies utilisées en production, avec des invités de terrain.", en: 'Architectures, automation and technologies used in production networks, with practitioner guests.' },
  },
  {
    name: 'Heavy Networking',
    url: 'https://packetpushers.net/podcasts/heavy-networking/',
    author: 'Packet Pushers',
    description: { fr: "Le podcast réseau de référence de Packet Pushers : data center, WAN, sécurité, retours d'expérience.", en: "Packet Pushers' flagship networking podcast: data center, WAN, security, field stories." },
  },
  {
    name: 'IPv6 Buzz',
    url: 'https://packetpushers.net/podcasts/ipv6-buzz/',
    author: 'Packet Pushers',
    description: { fr: "Tout sur IPv6, pour les ingénieurs qui préparent ou mènent la transition.", en: 'All about IPv6, for engineers preparing or running the transition.' },
  },
  {
    name: 'Cables2Clouds',
    url: 'https://www.cables2clouds.com/',
    description: { fr: "Le réseau entre data center et cloud public, et l'actualité de l'automatisation.", en: 'Networking between the data center and the public cloud, and automation news.' },
  },
  {
    name: 'NoLimitSecu',
    url: 'https://www.nolimitsecu.fr/',
    description: { fr: "Le podcast hebdomadaire francophone de la cybersécurité, avec des experts invités chaque semaine.", en: 'The weekly French-language cybersecurity podcast, with expert guests every week.' },
    french: true,
  },
];

export const communities: ResourceItem[] = [
  {
    name: 'FRnOG',
    url: 'https://www.frnog.org/',
    description: { fr: "La liste de diffusion des ingénieurs réseau francophones : questions techniques, incidents, annonces.", en: 'The mailing list of French-speaking network engineers: technical questions, incidents, announcements.' },
    french: true,
  },
  {
    name: 'Network Automation Forum',
    url: 'https://networkautomation.forum/',
    description: { fr: "La communauté de l'automatisation réseau, organisatrice des conférences AutoCon.", en: 'The network automation community, organiser of the AutoCon conferences.' },
  },
  {
    name: 'Network to Code Slack',
    url: 'http://slack.networktocode.com',
    description: { fr: "L'espace d'échange des projets libres d'automatisation : Nautobot, NAPALM, Netmiko, Nornir…", en: 'The chat space of open-source automation projects: Nautobot, NAPALM, Netmiko, Nornir…' },
  },
];

export const blogs: ResourceItem[] = [
  {
    name: 'ipSpace.net',
    url: 'https://blog.ipspace.net/',
    author: 'Ivan Pepelnjak',
    description: { fr: "Le blog de référence sur l'architecture réseau, sans langue de bois.", en: 'The reference blog on network architecture, with no marketing speak.' },
  },
  {
    name: 'Blog de Stéphane Bortzmeyer',
    url: 'https://www.bortzmeyer.org/',
    author: 'Stéphane Bortzmeyer',
    description: { fr: "Le DNS, les RFC et la gouvernance d'Internet, expliqués en français, depuis plus de vingt ans.", en: 'DNS, RFCs and Internet governance, explained in French for more than twenty years.' },
    french: true,
  },
  {
    name: 'Vincent Bernat',
    url: 'https://vincent.bernat.ch/en/blog',
    author: 'Vincent Bernat',
    description: { fr: "Réseau, Linux et automatisation, par un ingénieur français (articles en anglais et en français).", en: 'Networking, Linux and automation, by a French engineer (articles in English and French).' },
  },
  {
    name: 'Network to Code',
    url: 'https://blog.networktocode.com/',
    description: { fr: "Automatisation réseau : outils libres, méthodes, retours de projets.", en: 'Network automation: open-source tools, methods, project experience.' },
  },
  {
    name: 'Packet Coders',
    url: 'https://www.packetcoders.io/',
    author: 'Rick Donato',
    description: { fr: "Automatisation réseau pas à pas, avec Python, Nornir et les API.", en: 'Step-by-step network automation, with Python, Nornir and APIs.' },
  },
];

export const books: ResourceItem[] = [
  {
    name: 'Network Programmability and Automation',
    url: 'https://www.oreilly.com/library/view/network-programmability-and/9781098110826/',
    author: 'Matt Oswalt, Christian Adell, Scott S. Lowe, Jason Edelman (O’Reilly)',
    description: { fr: "Le livre de référence pour passer de la CLI à l'automatisation : Python, données structurées, API, CI/CD.", en: 'The reference book to move from CLI to automation: Python, structured data, APIs, CI/CD.' },
  },
  {
    name: 'Cloud Native Data Center Networking',
    url: 'https://www.oreilly.com/library/view/cloud-native-data/9781492045595/',
    author: 'Dinesh G. Dutt (O’Reilly)',
    description: { fr: "Concevoir une fabric spine/leaf moderne : routage, EVPN, automatisation, observabilité.", en: 'Designing a modern spine/leaf fabric: routing, EVPN, automation, observability.' },
  },
  {
    name: 'Network Programmability with YANG',
    url: 'https://www.oreilly.com/library/view/network-programmability-with/9780135180471/',
    author: 'Benoît Claise, Joe Clarke, Jan Lindblad (Addison-Wesley)',
    description: { fr: "YANG, NETCONF, RESTCONF et gNMI : les fondations de l'automatisation pilotée par les modèles.", en: 'YANG, NETCONF, RESTCONF and gNMI: the foundations of model-driven automation.' },
  },
  {
    name: 'Site Reliability Engineering',
    url: 'https://sre.google/books/',
    author: 'Google (gratuit en ligne)',
    description: { fr: "Comment Google exploite ses services : supervision, alertes, incidents. Gratuit en ligne.", en: 'How Google runs its services: monitoring, alerting, incidents. Free online.' },
  },
];

export const labs: ResourceItem[] = [
  {
    name: 'Containerlab',
    url: 'https://containerlab.dev/',
    description: { fr: "L'outil des labs de ce site : des topologies réseau en conteneurs, décrites en YAML.", en: "The tool behind this site's labs: network topologies in containers, described in YAML." },
  },
  {
    name: 'netlab',
    url: 'https://netlab.tools/',
    author: 'Ivan Pepelnjak',
    description: { fr: "Décrire un lab à haut niveau (protocoles, adressage) et le laisser générer topologie et configurations.", en: 'Describe a lab at a high level (protocols, addressing) and let it generate topology and configurations.' },
  },
  {
    name: 'Model-Driven Network Configuration Tutorial',
    url: 'https://martimy.github.io/model-driven-configuration-tutorial',
    description: { fr: "Un lab pratique gratuit : NETCONF, gNMI et YANG sur Arista cEOS et Nokia SR Linux, avec Containerlab.", en: 'A free hands-on lab: NETCONF, gNMI and YANG on Arista cEOS and Nokia SR Linux, with Containerlab.' },
  },
  {
    name: 'Cisco Networking Academy',
    url: 'https://www.netacad.com/',
    description: { fr: "Des cours en ligne gratuits, dont plusieurs en français, pour préparer les bases et la certification CCNA.", en: 'Free online courses, several in French, to learn the basics and prepare the CCNA certification.' },
    french: true,
  },
  {
    name: 'ipSpace.net',
    url: 'https://www.ipspace.net/Training',
    description: { fr: "Webinaires et formations approfondis : data center, automatisation, routage, sécurité.", en: 'In-depth webinars and courses: data center, automation, routing, security.' },
  },
];
