"""CLI entry point for the CS2 proposal generator.

Usage:
    python3 scripts/proposals/generate.py <path-to-client-yaml>

Loads a client YAML, validates it against the Pydantic schema,
merges in tier defaults for any optional fields the YAML did not
populate, and writes the rendered PDF to `out/<client.slug>_proposal.pdf`
next to this file.

On failure (missing file, invalid YAML, schema errors), prints a
friendly user-facing message (NOT a Python traceback) and exits
with a non-zero status.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import yaml
from pydantic import ValidationError

from schema import Proposal
from tiers import get_tier_defaults
import render


def _friendly_error(exc: ValidationError) -> str:
    """Render a Pydantic ValidationError as a multi-line user-friendly message."""
    lines = ["Your YAML file is invalid. Please fix the following:"]
    for err in exc.errors():
        loc = ".".join(str(p) for p in err.get("loc", ())) or "(root)"
        msg = err.get("msg", "invalid value")
        lines.append(f"  - {loc}: {msg}")
    return "\n".join(lines)


def _merge_tier_defaults(proposal: Proposal) -> dict:
    """Merge tier defaults into the proposal dict for fields the YAML left empty.

    List-typed optional fields (phases, customer_journey, risks, faq,
    why_cs2_bullets) fall back to the tier default when the YAML list
    is empty. total_investment falls back when None. Additional tier-
    sourced fields not in the Proposal schema (included_features,
    what_we_need) are always attached from the tier defaults so that
    page renderers can read them.
    """
    data = proposal.model_dump(mode="python")
    defaults = get_tier_defaults(proposal.proposal.tier)

    for key in ("phases", "customer_journey", "risks", "faq", "why_cs2_bullets"):
        if not data.get(key):
            data[key] = defaults.get(key, [])

    if data.get("total_investment") is None:
        data["total_investment"] = defaults.get("total_investment")

    data["included_features"] = defaults.get("included_features", [])
    data["what_we_need"] = defaults.get("what_we_need", [])

    return data


def main(argv=None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)

    if len(argv) != 1:
        print(
            "Usage: python3 generate.py <path-to-client-yaml>",
            file=sys.stderr,
        )
        return 2

    yaml_path = Path(argv[0])

    if not yaml_path.exists():
        print(
            f"Error: YAML file not found at {yaml_path}. "
            f"Please check the path and try again.",
            file=sys.stderr,
        )
        return 1

    try:
        with yaml_path.open("r", encoding="utf-8") as f:
            raw = yaml.safe_load(f)
    except yaml.YAMLError as e:
        print(
            f"Error: Could not parse YAML file at {yaml_path}.\n"
            f"YAML parser said: {e}",
            file=sys.stderr,
        )
        return 1

    if not isinstance(raw, dict):
        print(
            f"Error: YAML file at {yaml_path} must contain a mapping "
            f"at the top level (got {type(raw).__name__}).",
            file=sys.stderr,
        )
        return 1

    try:
        proposal = Proposal.model_validate(raw)
    except ValidationError as e:
        print(_friendly_error(e), file=sys.stderr)
        return 1

    merged = _merge_tier_defaults(proposal)

    out_dir = Path(__file__).resolve().parent / "out"
    out_dir.mkdir(parents=True, exist_ok=True)
    output_path = out_dir / f"{proposal.client.slug}_proposal.pdf"

    try:
        render.render_proposal(merged, str(output_path))
    except Exception as e:  # noqa: BLE001 — user-facing error, not a crash dump
        print(
            f"Error: Failed to render proposal PDF. Reason: {e}",
            file=sys.stderr,
        )
        return 1

    print(f"Wrote {output_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
