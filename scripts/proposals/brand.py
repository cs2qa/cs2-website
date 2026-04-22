"""CS2 Technologies brand palette and asset paths.

Sourced from generate_cs2_proposal_detailed.py (Nishad generator) —
color values must remain byte-identical to that source so every generated
proposal matches the Nishad visual reference.
"""
from pathlib import Path

from reportlab.lib.colors import HexColor, white


# ── CS2 Brand palette ─────────────────────────────────────────────────────
CS2_RED     = HexColor("#FF2900")
DARK_INK    = HexColor("#0B1220")
DEEP_INK    = HexColor("#111827")
MID_INK     = HexColor("#1F2937")
ACCENT_SOFT = HexColor("#FF6A3D")
LIGHT_BG    = HexColor("#F5F5F4")
WARM_CREAM  = HexColor("#FEF5F2")
MUTED       = HexColor("#6B7280")
DARK_TEXT   = HexColor("#111827")
GOLD        = HexColor("#D4A03C")
SUCCESS     = HexColor("#15803D")
SUCCESS_BG  = HexColor("#ECFDF5")
WARN_BG     = HexColor("#FEF3C7")
WARN_TEXT   = HexColor("#92400E")
WARN_BORDER = HexColor("#D97706")
BORDER      = HexColor("#D1D5DB")
SLATE       = HexColor("#475569")
WHITE       = white

# ── Asset paths ───────────────────────────────────────────────────────────
# Resolve relative to the cs2-website repo root so the generator works
# regardless of the caller's current working directory.
_REPO_ROOT = Path(__file__).resolve().parents[2]
LOGO_PATH = str(_REPO_ROOT / "public" / "logoCS2_red.png")
