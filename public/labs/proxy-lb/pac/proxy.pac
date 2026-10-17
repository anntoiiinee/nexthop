// Fichier PAC du lab proxy-lb (chapitre « Le proxy sortant »).
// Le navigateur appelle FindProxyForURL() pour chaque requête et suit la réponse :
// "DIRECT" (sans proxy) ou "PROXY adresse:port".
// À publier sur un serveur web interne, avec le type MIME application/x-ns-proxy-autoconfig.

function FindProxyForURL(url, host) {
  // Noms courts (intranet, imprimantes) : en direct
  if (isPlainHostName(host)) {
    return "DIRECT";
  }

  // Applications internes publiées dans la DMZ : en direct
  if (dnsDomainIs(host, "app.example.com") || dnsDomainIs(host, "admin.example.com")) {
    return "DIRECT";
  }

  // Adresses privées et réseaux de l'entreprise : en direct
  if (isInNet(host, "192.0.2.0", "255.255.255.192") ||
      isInNet(host, "198.51.100.0", "255.255.255.0") ||
      isInNet(host, "10.0.0.0", "255.0.0.0")) {
    return "DIRECT";
  }

  // Tout le reste passe par le proxy. Pas de "; DIRECT" en secours :
  // si le proxy tombe, le poste ne contourne pas le filtrage.
  return "PROXY 192.0.2.20:3128";
}
