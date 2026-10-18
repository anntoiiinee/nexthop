"""Client HashiCorp Vault des scripts du lab, construit sur hvac.

Regroupe la connexion (jeton, utilisateur, AppRole) et les opérations courantes sur un moteur KV v2 :
lire, écrire, modifier une clé, ou créer un secret s'il n'existe pas encore.

    from vault_client import VaultClient
    vault = VaultClient.from_env()                    # VAULT_ADDR + VAULT_TOKEN, ou AppRole
    password = vault.get("netops/service-account")["password"]

Les valeurs des secrets ne sont jamais écrites dans les journaux.
"""
import os
from collections.abc import Callable

import hvac
from hvac.exceptions import InvalidPath, VaultError as HvacError


class VaultError(Exception):
    """Erreur de connexion ou d'accès à Vault."""


class VaultClient:
    def __init__(self, url: str, mount_point: str = "secret", verify: bool | str = True):
        # verify : True (autorités du système), ou le chemin d'un certificat d'autorité interne.
        # Ne jamais désactiver la vérification TLS pour un coffre de secrets.
        self.client = hvac.Client(url=url, verify=verify)
        self.mount_point = mount_point

    @classmethod
    def from_env(cls, mount_point: str = "secret") -> "VaultClient":
        """Connexion à partir de l'environnement, comme la CLI vault :
        VAULT_ADDR, VAULT_CACERT (facultatif), puis VAULT_ROLE_ID et VAULT_SECRET_ID (AppRole) ou VAULT_TOKEN."""
        url = os.environ.get("VAULT_ADDR")
        if not url:
            raise VaultError("Définissez VAULT_ADDR (adresse de Vault).")
        vault = cls(url, mount_point, verify=os.environ.get("VAULT_CACERT", True))
        role_id, secret_id = os.environ.get("VAULT_ROLE_ID"), os.environ.get("VAULT_SECRET_ID")
        if role_id and secret_id:
            vault.login_approle(role_id, secret_id)
        elif os.environ.get("VAULT_TOKEN"):
            vault.login_token(os.environ["VAULT_TOKEN"])
        else:
            raise VaultError("Définissez VAULT_TOKEN, ou VAULT_ROLE_ID et VAULT_SECRET_ID.")
        return vault

    # --- Authentification -------------------------------------------------------------------

    def login_token(self, token: str) -> None:
        self.client.token = token
        self._check_authenticated()

    def login_userpass(self, username: str, password: str) -> None:
        try:
            self.client.auth.userpass.login(username=username, password=password)
        except HvacError as exc:
            raise VaultError(f"Connexion à Vault refusée pour {username}.") from exc
        self._check_authenticated()

    def login_approle(self, role_id: str, secret_id: str) -> None:
        try:
            self.client.auth.approle.login(role_id=role_id, secret_id=secret_id)
        except HvacError as exc:
            raise VaultError("Connexion AppRole refusée : vérifiez VAULT_ROLE_ID et VAULT_SECRET_ID.") from exc
        self._check_authenticated()

    def _check_authenticated(self) -> None:
        # Une seule vérification après la connexion, pas une requête de plus à chaque opération
        if not self.client.is_authenticated():
            raise VaultError("Vault refuse la connexion : jeton ou identifiants invalides.")

    # --- AppRole (opérations d'administration) ---------------------------------------------------

    def read_role_id(self, role_name: str) -> str:
        return self.client.auth.approle.read_role_id(role_name=role_name)["data"]["role_id"]

    def generate_secret_id(self, role_name: str) -> str:
        return self.client.auth.approle.generate_secret_id(role_name=role_name)["data"]["secret_id"]

    # --- Moteur KV v2 ------------------------------------------------------------------------------

    def get(self, path: str, version: int | None = None) -> dict:
        """Données d'un secret (la dernière version, ou une version précise)."""
        response = self.client.secrets.kv.v2.read_secret_version(
            path=path, version=version, mount_point=self.mount_point, raise_on_deleted_version=True
        )
        return response["data"]["data"]

    def put(self, path: str, data: dict) -> int:
        """Écrit une nouvelle version complète du secret (les clés absentes de data disparaissent)
        et renvoie son numéro de version."""
        response = self.client.secrets.kv.v2.create_or_update_secret(
            path=path, secret=data, mount_point=self.mount_point
        )
        return response["data"]["version"]

    def patch(self, path: str, data: dict) -> int:
        """Modifie seulement les clés données et garde les autres. Lecture puis écriture en « check-and-set » :
        si quelqu'un a modifié le secret entre-temps, Vault refuse l'écriture au lieu d'écraser sa version."""
        current = self.client.secrets.kv.v2.read_secret_version(
            path=path, mount_point=self.mount_point, raise_on_deleted_version=True
        )["data"]
        response = self.client.secrets.kv.v2.create_or_update_secret(
            path=path,
            secret={**current["data"], **data},
            cas=current["metadata"]["version"],
            mount_point=self.mount_point,
        )
        return response["data"]["version"]

    def get_or_create(self, path: str, key: str, generate: Callable[[], str]) -> str:
        """Renvoie la valeur de key dans le secret path. Si le secret ou la clé n'existe pas encore,
        crée la valeur avec generate() et l'enregistre, sans toucher aux autres clés du secret."""
        try:
            data = self.get(path)
        except InvalidPath:  # le secret n'existe pas
            value = generate()
            self.put(path, {key: value})
            return value
        if key not in data:  # le secret existe, mais pas cette clé : on l'ajoute sans toucher aux autres
            value = generate()
            self.patch(path, {key: value})
            return value
        return data[key]

    def read(self, path: str) -> dict:
        """Lecture brute d'un chemin, pour les autres moteurs (PKI, GitHub, bases de données…)."""
        response = self.client.read(path)
        if response is None:
            raise InvalidPath(f"rien à l'adresse {path}")
        return response["data"]
