"""Rend un gabarit Jinja2 avec les données d'un équipement, sans toucher au réseau.

    python3 templates/render.py templates/eos_base.j2 templates/data/leaf1.yml
"""

import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader, StrictUndefined


def render(template_path: str, data_path: str) -> str:
    template_file = Path(template_path)
    env = Environment(
        loader=FileSystemLoader(template_file.parent),
        trim_blocks=True,          # supprime le saut de ligne qui suit un bloc {% ... %}
        lstrip_blocks=True,        # supprime les espaces avant un bloc {% ... %}
        undefined=StrictUndefined, # une variable absente est une erreur, pas une chaîne vide
        keep_trailing_newline=True,
    )
    data = yaml.safe_load(Path(data_path).read_text(encoding="utf-8"))
    return env.get_template(template_file.name).render(**data)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    print(render(sys.argv[1], sys.argv[2]), end="")
