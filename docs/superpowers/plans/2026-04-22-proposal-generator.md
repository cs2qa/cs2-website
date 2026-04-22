# CS2 Proposal Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **⚠️ NO GIT COMMITS:** The user has explicitly instructed: **never run `git commit`, `git push`, or `gh pr create`**. The user will handle all git operations themselves. This plan therefore uses "Review checkpoints" in place of commits — stop at each checkpoint and let the user decide whether to commit before proceeding to the next task.

**Spec:** `docs/superpowers/specs/2026-04-22-proposal-generator-design.md`

**Goal:** Refactor the hand-coded 1,328-line Nishad proposal generator into a reusable, data-driven tool that produces Nishad-quality 16-page proposals from a single YAML file per client.

**Architecture:** Approach A — refactor existing ReportLab `canvas` code into data-driven functions. Preserve every layout decision (fonts, colors, coordinates, spacing) by keeping the exact drawing calls from the Nishad source and only hoisting hardcoded strings into a YAML-driven data layer. Tier defaults (Foundation / Growth / Scale) fill in common boilerplate so most client YAMLs are short (~30 lines).

**Tech Stack:** Python 3.11+, ReportLab (already in repo), Pydantic v2 (new), PyYAML (new).

**Reference source file:** `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py` (1,328 lines — this is the visual quality bar).

**Reference PDF:** `/Users/qasimali/ai-projects/nishad/CS2_Nishad_Proposal_Detailed.pdf` (the output we must reproduce exactly from `clients/nishad.yaml`).

**Nishad generator line-map (for extraction):**
| Lines | Content |
|---|---|
| 11–35 | Brand palette (colors) |
| 37–116 | Shared helpers (wrap_text, draw_wrapped, draw_page_header, draw_footer, section_title, subheading, bullet) |
| 118–190 | page_cover (Page 1) |
| 196–227 | page_toc (Page 2) |
| 233–289 | page_exec_summary (Page 3) |
| 295–377 | page_situation (Page 4) |
| 383–461 | page_audit (Page 5) |
| 467–539 | page_market (Page 6) |
| 545–611 | page_phase1 (Page 7) |
| 617–684 | page_phase2 (Page 8) |
| 690–747 | page_phase3 (Page 9) |
| 753–792 | page_journey (Page 10) |
| 798–900 | page_landing_mockup (Page 11) |
| 906–996 | page_roi (Page 12) |
| 1002–1080 | page_investment (Page 13) |
| 1086–1169 | page_commitments / "What We Need From You" (Page 14) |
| 1175–1219 | page_risks (Page 15) |
| 1225–1298 | page_closing / "Why CS2 + FAQ" (Page 16) |
| 1304+ | build_pdf orchestrator |

---

## Task 1: Directory Structure and Dependencies

**Files:**
- Create: `cs2-website/scripts/proposals/__init__.py` (empty)
- Create: `cs2-website/scripts/proposals/clients/.gitkeep`
- Create: `cs2-website/scripts/proposals/fixtures/.gitkeep`
- Create: `cs2-website/scripts/proposals/out/.gitkeep`
- Modify: `cs2-website/.gitignore` (append `scripts/proposals/out/` to ignore generated PDFs)
- Create: `cs2-website/scripts/proposals/requirements.txt`

- [ ] **Step 1: Create the directory skeleton**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website
mkdir -p scripts/proposals/clients scripts/proposals/fixtures scripts/proposals/out
touch scripts/proposals/__init__.py scripts/proposals/clients/.gitkeep scripts/proposals/fixtures/.gitkeep scripts/proposals/out/.gitkeep
```

- [ ] **Step 2: Write `scripts/proposals/requirements.txt`**

```
reportlab>=4.0.0
pydantic>=2.5.0
pyyaml>=6.0.1
```

- [ ] **Step 3: Append generated-PDF directory to .gitignore**

Open `cs2-website/.gitignore` and append:

```
# Generated proposal PDFs
scripts/proposals/out/
```

- [ ] **Step 4: Install dependencies**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website
python3 -m pip install -r scripts/proposals/requirements.txt
```

Expected: installs reportlab, pydantic, pyyaml successfully. No errors.

- [ ] **Step 5: Copy the Nishad reference PDF into the fixtures directory**

```bash
cp /Users/qasimali/ai-projects/nishad/CS2_Nishad_Proposal_Detailed.pdf /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals/fixtures/nishad_reference.pdf
```

- [ ] **Step 6: Review checkpoint**

Stop here. Report to the user: "Directory structure + dependencies ready. Nishad reference PDF copied to fixtures/. Ready for Task 2 on your approval."

---

## Task 2: Brand Module (`brand.py`)

**Files:**
- Create: `cs2-website/scripts/proposals/brand.py`
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:11-35` (brand palette)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:31` (LOGO_PATH)

- [ ] **Step 1: Write `brand.py` with all CS2 brand constants**

The `brand.py` module contains the exact color palette and asset paths from the Nishad generator. Every value must match `generate_cs2_proposal_detailed.py` lines 11–35 byte-for-byte so visual output is identical.

```python
"""CS2 Technologies brand palette, fonts, and asset paths.

Sourced from generate_cs2_proposal_detailed.py (Nishad generator) — do not modify
color values without a corresponding design review, as doing so will change the
visual output of every generated proposal.
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
# Resolved relative to the repo root (where the script is invoked from).
_REPO_ROOT = Path(__file__).resolve().parents[2]
LOGO_PATH = str(_REPO_ROOT / "public" / "logoCS2_red.png")
```

- [ ] **Step 2: Verify the logo path resolves to an existing file**

```bash
python3 -c "from cs2-website.scripts.proposals.brand import LOGO_PATH; import os; print(LOGO_PATH, os.path.exists(LOGO_PATH))"
```

Actually, since the script can't be imported with a dash in the path, test instead:

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website
python3 -c "
import sys; sys.path.insert(0, 'scripts/proposals')
from brand import LOGO_PATH
import os
print(LOGO_PATH)
print('exists:', os.path.exists(LOGO_PATH))
"
```

Expected output includes `exists: True` and the full path ends in `public/logoCS2_red.png`.

- [ ] **Step 3: Review checkpoint**

Report: "`brand.py` created with full CS2 palette; logo path resolves correctly. Ready for Task 3."

---

## Task 3: Pydantic Schema (`schema.py`)

**Files:**
- Create: `cs2-website/scripts/proposals/schema.py`
- Create: `cs2-website/scripts/proposals/tests/__init__.py`
- Create: `cs2-website/scripts/proposals/tests/test_schema.py`

- [ ] **Step 1: Write the failing test first — `test_schema.py`**

```python
"""Unit tests for the proposal YAML schema validation."""
import sys
from pathlib import Path

# Allow running from the cs2-website repo root.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pytest
from pydantic import ValidationError
from schema import Proposal, Tier


def _valid_minimal():
    """Smallest-valid YAML-equivalent dict for a proposal."""
    return {
        "client": {
            "name": "Nishad",
            "role": "Owner",
            "company": "Etobicoke Another World",
            "slug": "nishad",
            "date": "2026-04-15",
        },
        "proposal": {
            "title": "Local Bookings System",
            "subtitle": "A 6-month roadmap",
            "tier": "foundation",
        },
        "business": {
            "description": "2-month-old VR arcade",
            "industry": "VR arcade",
            "location": "Etobicoke",
            "context_bullets": ["Store age: ~2 months"],
        },
        "audit": {
            "headline_verdict": "Your CTR is above average.",
            "metric_tiles": [
                {"value": "16", "label": "Customers"},
                {"value": "$5.2K", "label": "Ad spend"},
                {"value": "331%", "label": "Conv rate"},
                {"value": "<10%", "label": "Share of voice"},
            ],
            "findings": [
                {"title": "Tracking is broken.", "detail": "Details here."},
            ],
            "bottom_line": "$5,200 spent with no reliable tracking.",
        },
        "roi_scenarios": {
            "avg_ticket": 95,
            "monthly_new_customers": [10, 25, 50],
        },
    }


def test_valid_minimal_proposal_parses():
    p = Proposal.model_validate(_valid_minimal())
    assert p.client.slug == "nishad"
    assert p.proposal.tier == Tier.FOUNDATION


def test_missing_client_name_raises():
    data = _valid_minimal()
    del data["client"]["name"]
    with pytest.raises(ValidationError):
        Proposal.model_validate(data)


def test_invalid_tier_rejected():
    data = _valid_minimal()
    data["proposal"]["tier"] = "platinum"  # not a real tier
    with pytest.raises(ValidationError):
        Proposal.model_validate(data)


def test_audit_requires_exactly_four_metric_tiles():
    """The Situation page layout assumes exactly four tiles — enforce it."""
    data = _valid_minimal()
    data["audit"]["metric_tiles"] = data["audit"]["metric_tiles"][:3]
    with pytest.raises(ValidationError):
        Proposal.model_validate(data)


def test_roi_requires_three_scenario_values():
    data = _valid_minimal()
    data["roi_scenarios"]["monthly_new_customers"] = [10, 25]
    with pytest.raises(ValidationError):
        Proposal.model_validate(data)


def test_findings_must_be_between_1_and_6():
    data = _valid_minimal()
    data["audit"]["findings"] = []
    with pytest.raises(ValidationError):
        Proposal.model_validate(data)
    data["audit"]["findings"] = [
        {"title": f"F{i}", "detail": "d"} for i in range(7)
    ]
    with pytest.raises(ValidationError):
        Proposal.model_validate(data)


def test_optional_overrides_default_to_empty():
    """risks, faq, phases etc. are optional — empty list means 'use tier default'."""
    p = Proposal.model_validate(_valid_minimal())
    assert p.phases == []
    assert p.risks == []
    assert p.faq == []
    assert p.customer_journey == []
    assert p.why_cs2_bullets == []
    assert p.total_investment is None
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 -m pytest tests/test_schema.py -v
```

Expected: all tests FAIL with `ModuleNotFoundError: No module named 'schema'` (schema.py doesn't exist yet).

- [ ] **Step 3: Implement `schema.py`**

```python
"""Pydantic v2 models for CS2 proposal YAML validation.

A client proposal is represented as a single Proposal model. Optional list
fields (phases, risks, faq, etc.) default to empty — meaning 'use the tier
default from tiers.py'. Populating them in YAML overrides the tier default.
"""
from datetime import date
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class Tier(str, Enum):
    FOUNDATION = "foundation"
    GROWTH = "growth"
    SCALE = "scale"


class Client(BaseModel):
    name: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    company: str = Field(..., min_length=1)
    slug: str = Field(..., pattern=r"^[a-z0-9][a-z0-9_-]*$",
                       description="Lowercase slug; used for output filename.")
    date: date


class ProposalMeta(BaseModel):
    title: str = Field(..., min_length=1)
    subtitle: str = Field(..., min_length=1)
    tier: Tier


class Business(BaseModel):
    description: str
    industry: str
    location: str
    context_bullets: List[str] = Field(..., min_length=1)


class MetricTile(BaseModel):
    value: str
    label: str


class Finding(BaseModel):
    title: str
    detail: str


class Audit(BaseModel):
    headline_verdict: str
    metric_tiles: List[MetricTile] = Field(..., min_length=4, max_length=4,
                                            description="Situation page renders exactly four tiles.")
    findings: List[Finding] = Field(..., min_length=1, max_length=6)
    bottom_line: str


class Phase(BaseModel):
    name: str
    duration: str
    price: str
    note: Optional[str] = None
    deliverables: List[str] = []
    outcomes: List[str] = []


class TotalInvestment(BaseModel):
    amount: str
    caveat: str


class ROIScenarios(BaseModel):
    avg_ticket: float = Field(..., gt=0)
    monthly_new_customers: List[int] = Field(..., min_length=3, max_length=3,
                                              description="Conservative, realistic, aggressive.")


class JourneyStage(BaseModel):
    stage: str
    description: str


class Risk(BaseModel):
    title: str
    mitigation: str


class FAQEntry(BaseModel):
    q: str
    a: str


class Proposal(BaseModel):
    client: Client
    proposal: ProposalMeta
    business: Business
    audit: Audit
    # Fields below default to empty — tiers.py supplies defaults when unset.
    phases: List[Phase] = []
    total_investment: Optional[TotalInvestment] = None
    roi_scenarios: ROIScenarios
    customer_journey: List[JourneyStage] = []
    risks: List[Risk] = []
    faq: List[FAQEntry] = []
    why_cs2_bullets: List[str] = []
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 -m pytest tests/test_schema.py -v
```

Expected: all 7 tests pass.

- [ ] **Step 5: Review checkpoint**

Report: "Schema validated by 7 passing tests. Covers required fields, tier enum, exactly-4 metric tiles, 3 ROI scenarios, 1–6 findings, and optional-override defaults. Ready for Task 4."

---

## Task 4: Foundation Tier Defaults (`tiers.py`)

**Files:**
- Create: `cs2-website/scripts/proposals/tiers.py`
- Create: `cs2-website/scripts/proposals/tests/test_tiers.py`

- [ ] **Step 1: Write the failing test — `test_tiers.py`**

```python
"""Tier defaults must supply all fields that are optional in the Proposal model."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pytest
from schema import Tier
from tiers import get_tier_defaults


REQUIRED_KEYS = {"phases", "total_investment", "customer_journey",
                 "risks", "faq", "why_cs2_bullets", "included_features",
                 "what_we_need"}


def test_foundation_defaults_has_all_required_keys():
    defaults = get_tier_defaults(Tier.FOUNDATION)
    missing = REQUIRED_KEYS - set(defaults.keys())
    assert missing == set(), f"Missing keys: {missing}"


def test_foundation_has_exactly_three_phases():
    defaults = get_tier_defaults(Tier.FOUNDATION)
    assert len(defaults["phases"]) == 3


def test_foundation_total_investment_has_amount_and_caveat():
    defaults = get_tier_defaults(Tier.FOUNDATION)
    ti = defaults["total_investment"]
    assert "amount" in ti
    assert "caveat" in ti
    assert "$" in ti["amount"]


def test_growth_and_scale_stubs_do_not_crash():
    """v1 only fully populates Foundation; Growth/Scale are stubbed but must not error."""
    for tier in (Tier.GROWTH, Tier.SCALE):
        defaults = get_tier_defaults(tier)
        assert "phases" in defaults
        # Stubs are allowed to be empty lists — just shouldn't raise.


def test_unknown_tier_raises():
    with pytest.raises(ValueError):
        get_tier_defaults("bogus")  # type: ignore
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
python3 -m pytest tests/test_tiers.py -v
```

Expected: ModuleNotFoundError on `tiers`.

- [ ] **Step 3: Implement `tiers.py` with Foundation fully populated**

Note: Foundation defaults are modeled on what the Nishad proposal currently says. For v1 we migrate the Nishad content — when the first real Foundation client comes in, adjust copy. Phase names, pricing, and deliverables below reflect the Nishad proposal's three-phase structure (Prove → Retain+Scale → Grow). When the spec's Foundation pricing ($4,500 + $650/mo) is used for a real non-Nishad client, the YAML's `phases` field will override these.

```python
"""Tier defaults for CS2 proposal generator.

Each tier dict supplies defaults for all Proposal fields that are optional
in schema.py (lists default to empty, TotalInvestment defaults to None).
If a client YAML populates any of these fields, the YAML takes precedence.

v1: Foundation is fully populated from the Nishad proposal content.
Growth and Scale are stubbed (minimum structure, empty content) and will
be populated when pitched to real clients to avoid writing content we
may throw away.
"""
from schema import Tier


_FOUNDATION = {
    "phases": [
        {
            "name": "Phase 1 — Prove",
            "duration": "Month 1",
            "price": "CAD $1,500 one-time",
            "note": "ad spend paid directly to platforms",
            "deliverables": [
                "Google Ads account audit + cleanup",
                "Landing page rebuild focused on the highest-margin offering",
                "Conversion tracking wired to real bookings (not form clicks)",
                "First 30 days of reporting",
            ],
            "outcomes": [
                "Know which ads actually drive paid revenue",
                "Impression share lifted above 40% on your core campaigns",
                "Baseline established for months 2–6",
            ],
        },
        {
            "name": "Phase 2 — Retain + Scale",
            "duration": "Months 2–3",
            "price": "CAD $700 / mo",
            "note": "ad spend paid directly to platforms",
            "deliverables": [
                "Weekly campaign optimization",
                "Customer email capture + automated welcome sequence",
                "Monthly performance review call",
            ],
            "outcomes": [
                "Cost-per-booking trending down month-over-month",
                "Repeat-customer funnel established via email",
            ],
        },
        {
            "name": "Phase 3 — Grow",
            "duration": "Months 4–6",
            "price": "CAD $900 / mo",
            "note": "ad spend paid directly to platforms",
            "deliverables": [
                "New channel expansion (Meta / Display / YouTube)",
                "Seasonal promotion management",
                "Attribution reporting dashboard",
            ],
            "outcomes": [
                "2–3x the baseline booking volume from Phase 1",
                "Owned marketing stack with full attribution visibility",
            ],
        },
    ],
    "total_investment": {
        "amount": "CAD $5,800",
        "caveat": "Plus your own ad spend ($500–$1,500/mo typical). You can cancel after any phase.",
    },
    "included_features": [
        "Custom website build (4-week delivery guarantee)",
        "Lead-capture forms + CRM sync",
        "Google Ads account setup + managed campaigns",
        "Hosting on AWS/Vercel (Canadian edge) + SSL + daily backups",
        "Security patches + uptime monitoring",
        "Monthly performance review call",
        "30-day clean-export guarantee if you ever leave",
    ],
    "customer_journey": [
        {"stage": "Sees your ad",
         "description": "High-intent search matches a tightly-themed ad group."},
        {"stage": "Lands on a dedicated page",
         "description": "One offer, one call-to-action, no navigation distractions."},
        {"stage": "Books or submits a lead",
         "description": "Tracked as a real conversion — not a button click."},
        {"stage": "Enters CRM + email sequence",
         "description": "Automated follow-up until they convert to paid."},
        {"stage": "Becomes a repeat customer",
         "description": "Reactivation emails + seasonal promos drive return visits."},
    ],
    "what_we_need": [
        "Admin access to your Google Ads and Analytics accounts",
        "Access to your domain registrar + current website host",
        "Business information: hours, services, pricing, location photos",
        "Your current CRM (or confirmation you'd like us to set one up)",
        "A 30-minute kickoff call within the first week",
    ],
    "risks": [
        {"title": "Seasonality hides the signal.",
         "mitigation": "We track month-over-month baselines and normalize for known seasonal dips."},
        {"title": "Low starting ad budget limits reach.",
         "mitigation": "Phase 1 focuses on the highest-margin offering first; we scale spend once unit economics are proven."},
        {"title": "Client turnaround on content/assets slips the build.",
         "mitigation": "Every milestone has a named owner on both sides + a hard-date dependency chart."},
    ],
    "faq": [
        {"q": "What if it doesn't work in Phase 1?",
         "a": "Cancel at the end of Phase 1. You keep everything we built: the landing page, the audit, the tracking. No lock-in."},
        {"q": "Who owns the Google Ads account?",
         "a": "You do. We manage it under your ownership. If you ever leave, the account stays with you."},
        {"q": "Do you mark up ad spend?",
         "a": "No. You pay Google directly. Our fee is transparent and separate."},
        {"q": "What's included in the monthly retainer?",
         "a": "Hosting, SSL, backups, security patches, Google Ads management, CRM support, and monthly reporting. Domain and ad spend are billed separately by the respective providers."},
    ],
    "why_cs2_bullets": [
        "Canadian-owned, Toronto-based — real humans in your time zone.",
        "AI-accelerated development: custom code at template speeds (4-week builds).",
        "You own your site, your code, your domain, your data. No platform lock-in.",
        "Portfolio: Majestik Group, Mint Imports, NotermMed, GWS Connect, Etobicoke VR Arena.",
    ],
}


_GROWTH_STUB = {
    "phases": [],
    "total_investment": None,
    "included_features": [],
    "customer_journey": [],
    "what_we_need": [],
    "risks": [],
    "faq": [],
    "why_cs2_bullets": _FOUNDATION["why_cs2_bullets"],  # shared
}


_SCALE_STUB = {
    "phases": [],
    "total_investment": None,
    "included_features": [],
    "customer_journey": [],
    "what_we_need": [],
    "risks": [],
    "faq": [],
    "why_cs2_bullets": _FOUNDATION["why_cs2_bullets"],  # shared
}


_TIER_DEFAULTS = {
    Tier.FOUNDATION: _FOUNDATION,
    Tier.GROWTH: _GROWTH_STUB,
    Tier.SCALE: _SCALE_STUB,
}


def get_tier_defaults(tier) -> dict:
    """Return the defaults dict for a given tier.

    Accepts Tier enum values or the equivalent string values.
    Raises ValueError for unknown tiers.
    """
    if isinstance(tier, str):
        try:
            tier = Tier(tier)
        except ValueError:
            raise ValueError(f"Unknown tier: {tier!r}")
    if tier not in _TIER_DEFAULTS:
        raise ValueError(f"Unknown tier: {tier!r}")
    return _TIER_DEFAULTS[tier]
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
python3 -m pytest tests/test_tiers.py -v
```

Expected: all 5 tests pass.

- [ ] **Step 5: Review checkpoint**

Report: "Foundation tier defaults populated from Nishad proposal content. Growth and Scale stubs in place. 5 passing tests. Ready for Task 5."

---

## Task 5: Shared Rendering Helpers

**Files:**
- Create: `cs2-website/scripts/proposals/render.py` (helpers only at this stage)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:37-116`

This task extracts the six shared helper functions from the Nishad generator into a new `render.py`. These helpers are used by every page renderer, so they must exist before any page function is ported. No behavior change — the code is copied verbatim, then imports updated to point at `brand.py`.

- [ ] **Step 1: Create `render.py` with the shared helpers**

Copy lines 37–116 of the Nishad generator into `render.py`, adjusting imports to use the new `brand.py`.

```python
"""Page-rendering functions for CS2 proposals.

The module is built by refactoring the Nishad proposal generator
(/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py)
into data-driven functions. Every drawing call (fonts, colors, coordinates)
is preserved verbatim to guarantee visual parity with the reference PDF.
"""
from reportlab.lib.colors import HexColor

from brand import (
    CS2_RED, DARK_INK, DEEP_INK, MID_INK, ACCENT_SOFT, LIGHT_BG,
    WARM_CREAM, MUTED, DARK_TEXT, GOLD, SUCCESS, SUCCESS_BG,
    WARN_BG, WARN_TEXT, WARN_BORDER, BORDER, SLATE, WHITE,
    LOGO_PATH,
)


# ── Helpers ───────────────────────────────────────────────────────────────
def wrap_text(c, text, font, size, max_width):
    words = text.split()
    lines, line = [], ""
    for w in words:
        test = f"{line} {w}".strip()
        if c.stringWidth(test, font, size) > max_width and line:
            lines.append(line)
            line = w
        else:
            line = test
    if line:
        lines.append(line)
    return lines


def draw_wrapped(c, text, x, y, font, size, max_width, leading, color=None):
    if color is not None:
        c.setFillColor(color)
    c.setFont(font, size)
    for ln in wrap_text(c, text, font, size, max_width):
        c.drawString(x, y, ln)
        y -= leading
    return y


def draw_page_header(c, title, page_num, w, h):
    c.setFillColor(DARK_INK)
    c.rect(0, h - 55, w, 55, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.rect(0, h - 58, w, 3, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(40, h - 38, title)
    try:
        c.drawImage(LOGO_PATH, w - 100, h - 48, width=55, height=30,
                    mask="auto", preserveAspectRatio=True)
    except Exception:
        pass
    c.setFillColor(HexColor("#9CA3AF"))
    c.setFont("Helvetica", 9)
    c.drawRightString(w - 40, h - 12, f"Page {page_num}")
    c.setFillColor(CS2_RED)
    c.rect(0, 0, 4, h - 58, fill=1, stroke=0)


def draw_footer(c, w):
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(40, 25, "CS2Technologies Inc.  |  2424 Finch Ave W, Unit 14, Toronto, M9M 2E2  |  905-749-5338")
    c.drawRightString(w - 40, 25, "www.cs2technologies.ca")


def section_title(c, text, x, y, color=DARK_INK):
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(x, y, text)
    c.setFillColor(CS2_RED)
    c.rect(x, y - 6, 36, 2.5, fill=1, stroke=0)


def subheading(c, text, x, y):
    c.setFillColor(DARK_INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(x, y, text)


def bullet(c, text, x, y, w_max, font="Helvetica", size=9.5, leading=13, color=DARK_TEXT):
    c.setFillColor(CS2_RED)
    c.circle(x - 10, y + 3, 1.6, stroke=0, fill=1)
    return draw_wrapped(c, text, x, y, font, size, w_max, leading, color=color)
```

- [ ] **Step 2: Sanity-check the module imports cleanly**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 -c "
import sys; sys.path.insert(0, '.')
import render
print('Helpers loaded:', [n for n in dir(render) if not n.startswith('_')])
"
```

Expected: prints a list including `wrap_text`, `draw_wrapped`, `draw_page_header`, `draw_footer`, `section_title`, `subheading`, `bullet`.

- [ ] **Step 3: Review checkpoint**

Report: "Shared helpers ported to `render.py`. Module imports cleanly. Ready for Task 6 (Pages 1–2)."

---

## Task 6: Pages 1–2 (Cover + TOC)

**Files:**
- Modify: `cs2-website/scripts/proposals/render.py` (append page functions)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:118-227`

**Approach:** open the Nishad generator and port `page_cover()` and `page_toc()` into `render.py`. Replace hardcoded strings (title, subtitle, client name, role, company, date, proposal classification) with dict-data lookups from the parsed Proposal model. Every drawing call (coordinates, fonts, colors, rectangle positions) stays byte-identical.

- [ ] **Step 1: Port `page_cover` (was lines 118–190 in Nishad generator)**

Append to `render.py`:

```python
def page_cover(c, w, h, data):
    """Page 1: hero cover. Dynamic: title, subtitle, client name/role/company, date.

    Line-for-line port from generate_cs2_proposal_detailed.py:118-190 with
    strings replaced by data lookups. Every layout coordinate is unchanged.
    """
    # Background
    c.setFillColor(DARK_INK)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.rect(0, h - 8, w, 8, fill=1, stroke=0)

    # Logo top-right
    try:
        c.drawImage(LOGO_PATH, w - 140, h - 100, width=80, height=50,
                    mask="auto", preserveAspectRatio=True)
    except Exception:
        pass

    # Title block
    c.setFillColor(CS2_RED)
    c.rect(60, h - 220, 40, 4, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 40)
    # Title may be two lines; Nishad's was: "Local Bookings System\nDetailed Proposal"
    y = h - 270
    for line in (data["proposal"]["title"] + "\nDetailed Proposal").split("\n"):
        c.drawString(60, y, line)
        y -= 52
    c.setFillColor(CS2_RED)
    c.rect(60, y + 30, 150, 3, fill=1, stroke=0)

    # Subtitle block
    c.setFillColor(HexColor("#E5E7EB"))
    c.setFont("Helvetica-Bold", 14)
    c.drawString(60, y + 4, f"CS2 Technologies  x  {data['client']['company']}")
    c.setFillColor(HexColor("#9CA3AF"))
    c.setFont("Helvetica", 11)
    c.drawString(60, y - 18, data["proposal"]["subtitle"])

    # Prepared For / Date / Classification panel
    c.setFillColor(HexColor("#0F172A"))
    c.rect(60, 120, w - 120, 140, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(80, 225, "PREPARED FOR")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(80, 205, data["client"]["name"])
    c.setFillColor(HexColor("#9CA3AF"))
    c.setFont("Helvetica", 10)
    c.drawString(80, 188, f"{data['client']['role']}, {data['client']['company']}")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(360, 225, "DATE")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    # Display date as "Month D, YYYY"
    date_obj = data["client"]["date"]
    c.drawString(360, 205, date_obj.strftime("%B %d, %Y"))
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(360, 170, "CLASSIFICATION")
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(360, 152, "CONFIDENTIAL PROPOSAL")

    c.showPage()
```

> **IMPORTANT:** open `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:118-190` and cross-check **every coordinate and font call** against what you just wrote. Any divergence from the original will show up in the parity test. If the Nishad version uses slightly different y-positions or colors than what is shown above, keep the NISHAD values — this plan is a guide, not a source of truth. The reference PDF is.

- [ ] **Step 2: Port `page_toc` (was lines 196–227 in Nishad generator)**

Append to `render.py`:

```python
def page_toc(c, w, h, data):
    """Page 2: table of contents. Static content — 14 entries matching the 16 pages.

    Line-for-line port from generate_cs2_proposal_detailed.py:196-227.
    """
    draw_page_header(c, "TABLE OF CONTENTS", 2, w, h)
    draw_footer(c, w)

    entries = [
        ("1.", "Executive Summary", "Page 3"),
        ("2.", "The Situation", "Page 4"),
        ("3.", "Google Ads Audit — What We Found", "Page 5"),
        ("4.", "Market & Competitor Context", "Page 6"),
        ("5.", "Phase 1 — Prove (Month 1)", "Page 7"),
        ("6.", "Phase 2 — Retain + Scale (Months 2–3)", "Page 8"),
        ("7.", "Phase 3 — Grow (Months 4–6)", "Page 9"),
        ("8.", "Customer Journey", "Page 10"),
        ("9.", "Example Landing Page", "Page 11"),
        ("10.", "ROI Math — Three Scenarios", "Page 12"),
        ("11.", "Investment & Engagement", "Page 13"),
        ("12.", "What We Need From You / Day 30", "Page 14"),
        ("13.", "Risks & Mitigations", "Page 15"),
        ("14.", "Why CS2 Technologies + FAQ", "Page 16"),
    ]

    y = h - 130
    for num, title, page in entries:
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica", 11)
        c.drawString(60, y, num)
        c.drawString(90, y, title)
        c.setFillColor(MUTED)
        c.drawRightString(w - 60, y, page)
        # dotted leader
        c.setDash(1, 3)
        c.setStrokeColor(HexColor("#E5E7EB"))
        c.line(90 + c.stringWidth(title, "Helvetica", 11) + 8, y + 2,
               w - 60 - c.stringWidth(page, "Helvetica", 11) - 8, y + 2)
        c.setDash()
        y -= 26

    c.showPage()
```

> **IMPORTANT:** cross-check every coordinate against Nishad source lines 196–227. Keep Nishad values on any divergence.

- [ ] **Step 3: Smoke-test these two pages render**

Create a minimal test script to render JUST pages 1–2 from the Nishad data (we'll swap to full rendering in later tasks):

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 -c "
import sys; sys.path.insert(0, '.')
from datetime import date
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from render import page_cover, page_toc

WIDTH, HEIGHT = A4
data = {
    'client': {
        'name': 'Nishad', 'role': 'Owner',
        'company': 'Etobicoke Another World',
        'date': date(2026, 4, 15),
    },
    'proposal': {
        'title': 'Local Bookings System',
        'subtitle': 'A 6-month roadmap: prove acquisition, scale retention, grow the business',
    },
}
c = canvas.Canvas('out/_smoke_pages_1_2.pdf', pagesize=A4)
page_cover(c, WIDTH, HEIGHT, data)
page_toc(c, WIDTH, HEIGHT, data)
c.save()
print('Wrote out/_smoke_pages_1_2.pdf')
"
```

- [ ] **Step 4: Visual parity check — pages 1 & 2**

Open both PDFs side by side in Preview (macOS):

```bash
open /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals/out/_smoke_pages_1_2.pdf
open /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals/fixtures/nishad_reference.pdf
```

Compare cover + TOC against reference pages 1–2. Any visible difference (font, color, spacing, alignment) — fix in `render.py` before proceeding. Common issues: missed coordinate, swapped color, reversed date format.

- [ ] **Step 5: Review checkpoint**

Report: "Pages 1 (cover) and 2 (TOC) ported; smoke-test PDF matches reference. Ready for Task 7 (Pages 3–5 — the client-dynamic ones)."

---

## Task 7: Pages 3–5 (Executive Summary, Situation, Audit)

These are the three most client-dynamic pages — where the bespoke value of the proposal lives. Exec Summary shows the problem statement + phase cards + total. Situation renders context bullets + four metric tiles. Audit renders findings bullets + bottom-line callout.

**Files:**
- Modify: `cs2-website/scripts/proposals/render.py` (append three functions)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:233-461`

- [ ] **Step 1: Port `page_exec_summary`** (Nishad lines 233–289)

Append to `render.py`. Key data lookups:
- `data["audit"]["headline_verdict"]` and `data["business"]["description"]` for the problem-statement box
- `data["phases"]` (already merged with tier defaults by this point) for the three phase cards
- `data["total_investment"]["amount"]` and `["caveat"]` for the green totals badge

```python
def page_exec_summary(c, w, h, data):
    """Page 3: Executive Summary. Problem box + three phase cards + total.

    Port of generate_cs2_proposal_detailed.py:233-289 with strings and phase
    list driven by data.
    """
    draw_page_header(c, "EXECUTIVE SUMMARY", 3, w, h)
    draw_footer(c, w)

    # Business Problem callout
    c.setFillColor(WARM_CREAM)
    c.rect(40, h - 280, w - 80, 140, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(60, h - 160, "THE BUSINESS PROBLEM")
    y = draw_wrapped(
        c,
        f"{data['business']['description'].capitalize()}. "
        f"{data['audit']['bottom_line']} "
        f"{data['client']['name']} needs their own local bookings engine: "
        "a system they own, measured in paid sessions and real customers — "
        "not vanity clicks.",
        60, h - 180, "Helvetica", 10, w - 120, 14, color=DARK_TEXT,
    )

    # Our Proposal — phase cards
    section_title(c, "Our Proposal — A Three-Phase Roadmap", 40, h - 310, DARK_INK)

    y_card = h - 370
    card_colors = [CS2_RED, ACCENT_SOFT, DARK_INK]
    for i, phase in enumerate(data["phases"][:3]):
        c.setFillColor(card_colors[i])
        c.rect(40, y_card - 40, w - 80, 50, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(60, y_card - 16, phase["name"])
        c.setFont("Helvetica", 9.5)
        c.drawString(60, y_card - 30, phase["duration"])
        c.setFont("Helvetica-Bold", 12)
        c.drawRightString(w - 60, y_card - 16, phase["price"])
        c.setFont("Helvetica", 9)
        if phase.get("note"):
            c.drawRightString(w - 60, y_card - 30, phase["note"])
        y_card -= 72

    # Total investment badge
    total = data["total_investment"]
    c.setFillColor(SUCCESS)
    c.rect(40, y_card - 60, w - 80, 60, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(w / 2, y_card - 25,
                        f"6-Month Total Investment from CS2: {total['amount']}")
    c.setFont("Helvetica", 10)
    c.drawCentredString(w / 2, y_card - 45, total["caveat"])

    c.showPage()
```

> **IMPORTANT:** cross-check every coordinate against Nishad source lines 233–289. Keep Nishad's exact values on any mismatch.

- [ ] **Step 2: Port `page_situation`** (Nishad lines 295–377)

```python
def page_situation(c, w, h, data):
    """Page 4: The Situation. Context bullets + four metric tiles + 'What's At Stake' box.

    Port of generate_cs2_proposal_detailed.py:295-377.
    """
    draw_page_header(c, "THE SITUATION", 4, w, h)
    draw_footer(c, w)

    section_title(c, f"Where {data['client']['company']} Stands Today", 40, h - 110)

    # Intro paragraph (generic framing line; tier-specific hook could be added later)
    y = draw_wrapped(
        c,
        f"Two months in, a new {data['business']['industry'].lower()} needs one thing above all: "
        "consistent foot traffic. Right now, that traffic isn't showing up — "
        "and the numbers tell a specific story.",
        40, h - 145, "Helvetica", 10, w - 80, 14, color=DARK_TEXT,
    )

    # Context bullets
    y -= 15
    for b in data["business"]["context_bullets"]:
        y = bullet(c, b, 60, y, w - 120)
        y -= 5

    # Metric tiles block (four tiles, exactly)
    tile_y = 340
    c.setFillColor(DARK_INK)
    c.rect(40, tile_y - 60, w - 80, 90, fill=1, stroke=0)
    tile_w = (w - 80) / 4
    for i, tile in enumerate(data["audit"]["metric_tiles"][:4]):
        x = 40 + i * tile_w
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica-Bold", 28)
        c.drawCentredString(x + tile_w / 2, tile_y - 5, tile["value"])
        c.setFillColor(HexColor("#9CA3AF"))
        c.setFont("Helvetica", 8.5)
        c.drawCentredString(x + tile_w / 2, tile_y - 30, tile["label"])

    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 7.5)
    c.drawString(40, tile_y - 75,
                 "* 'Impression share' = the % of times your ad actually showed when someone searched. "
                 "Under 10% means 9 out of 10 opportunities are lost.")

    # What's at stake callout
    c.setFillColor(WARM_CREAM)
    c.setStrokeColor(WARN_BORDER)
    c.rect(40, 150, w - 80, 110, fill=1, stroke=1)
    c.setFillColor(WARN_BORDER)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(60, 235, "WHAT'S AT STAKE")
    draw_wrapped(
        c,
        f"A {data['business']['industry']} business has fixed costs. Rent, staff, insurance, utilities run "
        "whether customers show up or not. Every week of empty sessions is cash out the door. "
        "Year 1 is when most new businesses either find their audience — or close. "
        "The window to fix acquisition is now.",
        60, 215, "Helvetica", 9.5, w - 120, 13, color=DARK_TEXT,
    )

    c.showPage()
```

> **IMPORTANT:** cross-check against Nishad source lines 295–377.

- [ ] **Step 3: Port `page_audit`** (Nishad lines 383–461)

```python
def page_audit(c, w, h, data):
    """Page 5: Google Ads Audit findings. Fully data-driven.

    Port of generate_cs2_proposal_detailed.py:383-461.
    """
    draw_page_header(c, "GOOGLE ADS AUDIT — WHAT WE FOUND", 5, w, h)
    draw_footer(c, w)

    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 10)
    c.drawString(40, h - 110,
                 "Findings from the screenshots of your live Google Ads account (All-time view).")

    # Headline verdict callout (green "ONE GOOD SIGN")
    c.setFillColor(SUCCESS_BG)
    c.rect(40, h - 180, w - 80, 50, fill=1, stroke=0)
    c.setFillColor(SUCCESS)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(60, h - 150, "ONE GOOD SIGN:")
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 10)
    draw_wrapped(c, data["audit"]["headline_verdict"],
                 155, h - 150, "Helvetica", 10, w - 220, 13, color=DARK_TEXT)

    # Findings bullets
    y = h - 210
    for finding in data["audit"]["findings"]:
        c.setFillColor(CS2_RED)
        c.circle(50, y + 3, 2, stroke=0, fill=1)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(60, y, finding["title"])
        y -= 14
        y = draw_wrapped(c, finding["detail"], 60, y,
                         "Helvetica", 9, w - 120, 12, color=SLATE)
        y -= 10

    # Bottom line callout
    c.setFillColor(WARM_CREAM)
    c.setStrokeColor(WARN_BORDER)
    c.rect(40, 140, w - 80, 80, fill=1, stroke=1)
    c.setFillColor(WARN_BORDER)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(60, 195, "THE BOTTOM LINE")
    draw_wrapped(c, data["audit"]["bottom_line"] + " The next section covers what to do about it.",
                 60, 175, "Helvetica", 10, w - 120, 14, color=DARK_TEXT)

    c.showPage()
```

> **IMPORTANT:** cross-check against Nishad source lines 383–461. The findings-list vertical spacing and the bottom-line box y-coordinate are particularly sensitive to drift.

- [ ] **Step 4: Visual parity check — pages 3, 4, 5**

Extend the smoke test to render pages 1–5 from the Nishad data (we'll need richer test data for this — build a small fixture):

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 -c "
import sys; sys.path.insert(0, '.')
from datetime import date
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from render import page_cover, page_toc, page_exec_summary, page_situation, page_audit

WIDTH, HEIGHT = A4
data = {
    'client': {'name': 'Nishad', 'role': 'Owner', 'company': 'Etobicoke Another World', 'date': date(2026, 4, 15)},
    'proposal': {
        'title': 'Local Bookings System',
        'subtitle': 'A 6-month roadmap: prove acquisition, scale retention, grow the business',
    },
    'business': {
        'description': '2-month-old VR arcade and private-party venue',
        'industry': 'VR arcade',
        'context_bullets': [
            'Venue: VR arcade + birthday parties + corporate events (Etobicoke location)',
            'Store age: ~2 months since opening (mid-February 2026)',
            'Customer emails collected: 16 (the entire life of the store)',
            'Franchise Google Ad spend (all time): ~\$5,200 across Search + Performance Max + Demand Gen',
            \"Reported 'return': ~\$3,600 (see Section 3 — this number is unreliable)\",
            'Marketing control Nishad has today: None — franchise runs all targeting, creative, and landing pages',
            'Franchise restrictions on independent marketing: None — Nishad is free to run his own local marketing',
        ],
    },
    'audit': {
        'headline_verdict': \"Your account's click-through rate of 3.71% is above the industry average. The ads themselves are getting clicked. The problem is everything that happens after the click.\",
        'metric_tiles': [
            {'value': '16', 'label': 'Real customers (2 mo)'},
            {'value': '\$5.2K', 'label': 'Google ad spend (4 mo)'},
            {'value': '331%', 'label': 'Conv. rate on 1 ad (broken)'},
            {'value': '<10%', 'label': \"Your ad's share of voice *\"},
        ],
        'findings': [
            {'title': \"'Conversions' in your account are not paid bookings.\",
             'detail': 'Your conversion actions are: Submit lead form, Phone call lead, Contact, Book appointment, Leads from messages. Most are button clicks or page visits — not verified paid sessions. Example: P_Max_CPA reports 1,180 conversions for \$608 while your store has only 16 real customers. Those 1,180 are micro-signals, not bookings.'},
            {'title': 'One ad shows a 331% conversion rate — the tracking is broken.',
             'detail': \"On 'Thrilling VR gaming | Book your VR party', Cost/Conv is \$0.33 and Conv. rate is 331.58% — mathematically impossible. One click is being counted as multiple conversions. Google itself flags: 'Enhanced conversions has setup issues impacting performance'.\"},
            {'title': \"Impression share under 10% and Pmax2 is 'Limited by budget'.\",
             'detail': 'Your ads win fewer than 1 in 10 possible impressions. The best-performing Performance Max campaign is capped by budget. The franchise is leaving the highest-intent traffic unconverted.'},
            {'title': 'Your highest-margin product has the worst-performing ad.',
             'detail': \"'VR Birthday Party' costs \$21.45 per conversion at 6.82% conv. rate. The generic 'Another World Etobicoke' ad costs \$2.85 and converts at 70%. Birthday parties are the top-margin bucket — and they are being neglected.\"},
            {'title': 'A Russian-language YouTube campaign is quietly burning budget.',
             'detail': \"A Demand Gen campaign named in Cyrillic (Russian for 'YouTube Etobika') spent \$46 for 2 clicks at \$23.19 avg CPC. Whether it targets the Russian-speaking GTA on purpose or by accident, it is not being managed — and nobody at the franchise is asking.\"},
        ],
        'bottom_line': '\$5,200+ spent with no reliable way to know what actually produced a paid booking.',
    },
    'phases': [
        {'name': 'Phase 1 — Prove', 'duration': 'Month 1', 'price': 'CAD \$1,500 one-time',
         'note': 'ad spend paid directly to platforms'},
        {'name': 'Phase 2 — Retain + Scale', 'duration': 'Months 2–3', 'price': 'CAD \$700 / mo',
         'note': 'ad spend paid directly to platforms'},
        {'name': 'Phase 3 — Grow', 'duration': 'Months 4–6', 'price': 'CAD \$900 / mo',
         'note': 'ad spend paid directly to platforms'},
    ],
    'total_investment': {'amount': 'CAD \$5,800',
                          'caveat': 'Plus your own ad spend (\$500–\$1,500/mo typical). You can cancel after any phase.'},
}
c = canvas.Canvas('out/_smoke_pages_1_5.pdf', pagesize=A4)
page_cover(c, WIDTH, HEIGHT, data)
page_toc(c, WIDTH, HEIGHT, data)
page_exec_summary(c, WIDTH, HEIGHT, data)
page_situation(c, WIDTH, HEIGHT, data)
page_audit(c, WIDTH, HEIGHT, data)
c.save()
print('Wrote out/_smoke_pages_1_5.pdf')
"
```

Open both PDFs side by side:

```bash
open out/_smoke_pages_1_5.pdf
open fixtures/nishad_reference.pdf
```

Compare pages 3, 4, 5 closely against the reference. Fix any drift in `render.py` before proceeding.

- [ ] **Step 5: Review checkpoint**

Report: "Pages 3–5 ported and visually compared; drift resolved. Ready for Task 8 (Pages 6–9: market context + three phases)."

---

## Task 8: Pages 6–9 (Market + Three Phases)

**Files:**
- Modify: `cs2-website/scripts/proposals/render.py` (append four functions)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:467-747`

**Approach:** Port `page_market`, `page_phase1`, `page_phase2`, `page_phase3` as four separate functions. The three phase pages share a layout — deliberately keep them as three distinct functions (matching Nishad structure) rather than collapsing into a shared helper; this preserves per-page header text and any minor visual variations. If a shared helper emerges as clearly clean, extract it during Task 8 — do NOT pre-abstract.

- [ ] **Step 1: Port `page_market` (Nishad lines 467–539)**

Open the Nishad generator at lines 467–539. The function renders market context: industry trends, competitor callouts. Port it to `render.py` using:
- Any dynamic text pulled from `data["business"]["industry"]` where the Nishad version hardcoded "VR arcade"
- Rest stays as Nishad wrote it (copy verbatim)

Write the function signature as `def page_market(c, w, h, data):`. Every drawing call from lines 467–539 is preserved.

- [ ] **Step 2: Port `page_phase1` (Nishad lines 545–611), `page_phase2` (617–684), `page_phase3` (690–747)**

For each phase page:
- Signature: `def page_phase1(c, w, h, data):` etc.
- The phase header title ("PHASE 1 — PROVE (MONTH 1)" etc.) is rendered by `draw_page_header`; source the first argument from `data["phases"][0]["name"].upper()`, `data["phases"][1]["name"].upper()`, `data["phases"][2]["name"].upper()` respectively
- Deliverables list is sourced from `data["phases"][i]["deliverables"]`
- Outcomes list is sourced from `data["phases"][i]["outcomes"]`
- Price + duration blocks use `data["phases"][i]["price"]`, `data["phases"][i]["duration"]`
- Every coordinate is preserved from the Nishad source

- [ ] **Step 3: Extend the smoke test to render pages 1–9 and visually compare**

Update the smoke script to also call `page_market`, `page_phase1`, `page_phase2`, `page_phase3`. Richer `data` dict needs `deliverables` and `outcomes` on each phase (copy from Nishad reference PDF content).

Open both PDFs side by side; compare pages 6–9.

- [ ] **Step 4: Review checkpoint**

Report: "Pages 6–9 ported; visual parity confirmed. Ready for Task 9 (Pages 10–11: journey + landing mockup)."

---

## Task 9: Pages 10–11 (Customer Journey + Example Landing Page)

**Files:**
- Modify: `cs2-website/scripts/proposals/render.py` (append two functions)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:753-900`

- [ ] **Step 1: Port `page_journey` (Nishad lines 753–792)**

- Signature: `def page_journey(c, w, h, data):`
- Stages sourced from `data["customer_journey"]` (list of `{stage, description}` dicts; filled in by tier defaults)
- Every drawing call preserved from Nishad source

- [ ] **Step 2: Port `page_landing_mockup` (Nishad lines 798–900)**

- Signature: `def page_landing_mockup(c, w, h, data):`
- This page is largely a visual mock of a proposed landing page — mostly-fixed content with minor tier variation. Port verbatim; the only dynamic element is the client's business name in the mock page's header.

- [ ] **Step 3: Extend the smoke test to render pages 1–11; visual compare**

- [ ] **Step 4: Review checkpoint**

Report: "Pages 10–11 ported; parity confirmed. Ready for Task 10 (ROI math — most computational page)."

---

## Task 10: Page 12 (ROI Math — Three Scenarios)

**Files:**
- Modify: `cs2-website/scripts/proposals/render.py` (append `page_roi`)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:906-996`

This is the most computational page. It renders three ROI scenarios (conservative, realistic, aggressive) each calculated from `data["roi_scenarios"]`:
- `monthly_new_customers[0]`, `[1]`, `[2]` (scenario customer volumes)
- `avg_ticket` (dollar value per customer)

For each scenario:
- Monthly revenue = volume × avg_ticket
- 6-month revenue = monthly × 6
- ROI multiple = 6-month revenue / total_investment_amount (parsed as number from the "CAD $X,XXX" string)

- [ ] **Step 1: Port `page_roi` with data-driven math**

Open Nishad lines 906–996 and port the layout verbatim. Replace the hardcoded scenario numbers with a loop that iterates `data["roi_scenarios"]["monthly_new_customers"]` and computes revenue.

```python
def page_roi(c, w, h, data):
    """Page 12: ROI math across three scenarios.

    Port of generate_cs2_proposal_detailed.py:906-996 with scenario values
    computed from data["roi_scenarios"].
    """
    import re
    draw_page_header(c, "ROI MATH — THREE SCENARIOS", 12, w, h)
    draw_footer(c, w)

    avg_ticket = data["roi_scenarios"]["avg_ticket"]
    volumes = data["roi_scenarios"]["monthly_new_customers"]
    scenario_labels = ["Conservative", "Realistic", "Aggressive"]

    # Parse total_investment amount from its string form "CAD $5,800"
    m = re.search(r"\\$\\s*([\\d,]+)", data["total_investment"]["amount"])
    total_investment = int(m.group(1).replace(",", "")) if m else 0

    # Rest of the layout: section titles, three scenario boxes laid out
    # horizontally across the page, each with:
    #   - header: scenario label
    #   - "X new customers / mo"
    #   - "× $Y avg ticket"
    #   - "= $Z / mo new revenue"
    #   - "6-month revenue: $..."
    #   - "ROI multiple: Nx"
    #
    # Coordinates and colors must match Nishad lines 906-996 exactly.
    # IMPLEMENT BY OPENING THE NISHAD SOURCE AND PORTING LINE-BY-LINE.
    # This plan intentionally does not paste the ~90 lines here —
    # copy them verbatim, substituting:
    #   - scenario_labels[i] for hardcoded scenario names
    #   - volumes[i] for hardcoded customer counts
    #   - avg_ticket for hardcoded avg-ticket value
    #   - computed monthly/6mo/ROI numbers instead of hardcoded currency strings
    #
    # The bottom-of-page narrative ("Even in the conservative scenario...")
    # stays as Nishad wrote it, with numbers substituted from the computation.

    c.showPage()
```

> **Fill in the middle of this function by opening Nishad generator lines 906–996 and porting them verbatim**, substituting the four variables above for their hardcoded equivalents. Do not skip this step or paraphrase the layout — copy the coordinates exactly.

- [ ] **Step 2: Unit test ROI number computation**

Because this page has real arithmetic, add a small unit test to `tests/test_roi.py`:

```python
"""Test the ROI computation logic renders the right numbers (not layout)."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

# Extract the math logic into a testable helper function in render.py, or
# use a simple parser test. For now, verify the re.search pattern handles
# the expected currency format:

import re

def test_investment_amount_parses():
    amt = "CAD $5,800"
    m = re.search(r"\$\s*([\d,]+)", amt)
    assert int(m.group(1).replace(",", "")) == 5800

def test_investment_amount_handles_no_comma():
    amt = "CAD $800"
    m = re.search(r"\$\s*([\d,]+)", amt)
    assert int(m.group(1).replace(",", "")) == 800
```

Run: `python3 -m pytest tests/test_roi.py -v` — expected 2 pass.

- [ ] **Step 3: Visual parity check page 12**

Extend smoke test, render pages 1–12, open side-by-side with reference, confirm visual + numerical parity.

- [ ] **Step 4: Review checkpoint**

Report: "Page 12 (ROI) ported; numerical parity and visual parity confirmed. Ready for Task 11 (Pages 13–16: investment, what-we-need, risks, why-CS2)."

---

## Task 11: Pages 13–16 (Investment, What We Need, Risks, Why CS2)

**Files:**
- Modify: `cs2-website/scripts/proposals/render.py` (append four functions)
- Reference: `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py:1002-1298`

- [ ] **Step 1: Port `page_investment` (Nishad 1002–1080)**

- Signature: `def page_investment(c, w, h, data):`
- Pricing table rows from `data["phases"]` (each row: phase name, duration, price, note)
- Total row uses `data["total_investment"]["amount"]` and `["caveat"]`
- Included-features list from `data.get("included_features", [])` — falls through to tier defaults at merge time
- Every coordinate preserved from Nishad

- [ ] **Step 2: Port `page_commitments` → rename to `page_what_we_need` (Nishad 1086–1169)**

- Signature: `def page_what_we_need(c, w, h, data):`
- "What We Need From You" bullets from `data["what_we_need"]` (tier default)
- "What You'll Get From Us" bullets: reuse included_features OR a second tier key if Nishad source uses distinct content — verify by reading the source
- Day-30 milestones section: port verbatim from Nishad

- [ ] **Step 3: Port `page_risks` (Nishad 1175–1219)**

- Signature: `def page_risks(c, w, h, data):`
- Risk rows from `data["risks"]` (each: `title`, `mitigation`)

- [ ] **Step 4: Port `page_closing` → rename to `page_why_cs2_faq` (Nishad 1225–1298)**

- Signature: `def page_why_cs2_faq(c, w, h, data):`
- Why-CS2 bullets from `data["why_cs2_bullets"]`
- FAQ items from `data["faq"]` (each: `q`, `a`)

- [ ] **Step 5: Smoke-test render pages 1–16; full visual parity check**

Extend the smoke script to render all 16 pages. Open both PDFs in Preview. Flip through page-by-page. Note any visual drift and fix in `render.py`.

- [ ] **Step 6: Review checkpoint**

Report: "All 16 pages ported; full-document visual parity confirmed in smoke test. Ready for Task 12 (CLI + data merge)."

---

## Task 12: CLI and Data Merge (`generate.py`)

**Files:**
- Create: `cs2-website/scripts/proposals/generate.py`
- Modify: `cs2-website/scripts/proposals/render.py` (add top-level `render_proposal()` dispatcher)
- Create: `cs2-website/scripts/proposals/tests/test_generate.py`

- [ ] **Step 1: Add `render_proposal()` dispatcher to `render.py`**

Append to `render.py`:

```python
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas as _canvas


def render_proposal(data: dict, output_path: str) -> None:
    """Render a 16-page proposal PDF to output_path.

    data is the merged dict (client YAML + tier defaults — caller handles merge).
    """
    w, h = A4
    c = _canvas.Canvas(output_path, pagesize=A4)

    page_cover(c, w, h, data)
    page_toc(c, w, h, data)
    page_exec_summary(c, w, h, data)
    page_situation(c, w, h, data)
    page_audit(c, w, h, data)
    page_market(c, w, h, data)
    page_phase1(c, w, h, data)
    page_phase2(c, w, h, data)
    page_phase3(c, w, h, data)
    page_journey(c, w, h, data)
    page_landing_mockup(c, w, h, data)
    page_roi(c, w, h, data)
    page_investment(c, w, h, data)
    page_what_we_need(c, w, h, data)
    page_risks(c, w, h, data)
    page_why_cs2_faq(c, w, h, data)

    c.save()
```

- [ ] **Step 2: Write `generate.py` CLI with user-friendly error messages**

```python
"""CS2 proposal generator CLI.

Usage:
    python generate.py clients/<slug>.yaml

Outputs: out/<slug>_proposal.pdf

Validates the YAML against the Pydantic schema, merges any missing
optional fields from the selected tier's defaults in tiers.py, and
renders the PDF via render.render_proposal.
"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml
from pydantic import ValidationError

from schema import Proposal
from tiers import get_tier_defaults
from render import render_proposal


def _merge_tier_defaults(proposal: Proposal) -> dict:
    """Return a plain dict with tier defaults filled in where YAML omitted them."""
    data = proposal.model_dump(mode="python")
    defaults = get_tier_defaults(proposal.proposal.tier)

    # For each list-typed optional field, use tier default when YAML is empty.
    for key in ("phases", "customer_journey", "risks", "faq",
                "why_cs2_bullets"):
        if not data.get(key):
            data[key] = defaults.get(key, [])

    # total_investment: use tier default when YAML is None.
    if data.get("total_investment") is None:
        data["total_investment"] = defaults.get("total_investment")

    # Extra tier-sourced fields that aren't in the schema (but pages need them)
    data["included_features"] = defaults.get("included_features", [])
    data["what_we_need"] = defaults.get("what_we_need", [])

    return data


def _friendly_error(exc: ValidationError) -> str:
    """Format Pydantic errors into human-readable messages (no tracebacks)."""
    lines = ["The proposal YAML is invalid:"]
    for err in exc.errors():
        loc = ".".join(str(p) for p in err["loc"])
        lines.append(f"  - {loc}: {err['msg']}")
    return "\n".join(lines)


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("Usage: python generate.py <path-to-client-yaml>", file=sys.stderr)
        return 2

    yaml_path = Path(argv[1])
    if not yaml_path.exists():
        print(f"Error: YAML file not found: {yaml_path}", file=sys.stderr)
        return 1

    with yaml_path.open() as f:
        raw = yaml.safe_load(f)

    try:
        proposal = Proposal.model_validate(raw)
    except ValidationError as exc:
        print(_friendly_error(exc), file=sys.stderr)
        return 1

    data = _merge_tier_defaults(proposal)

    out_dir = Path(__file__).resolve().parent / "out"
    out_dir.mkdir(exist_ok=True)
    out_path = out_dir / f"{proposal.client.slug}_proposal.pdf"

    render_proposal(data, str(out_path))
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
```

- [ ] **Step 3: Write `tests/test_generate.py`**

```python
"""Integration tests for the CLI — error handling and merge behavior."""
import sys, subprocess, tempfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import yaml
import pytest

from schema import Proposal
from generate import _merge_tier_defaults


SCRIPT = Path(__file__).resolve().parent.parent / "generate.py"


def _write_tmp_yaml(content: dict) -> Path:
    f = tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False)
    yaml.safe_dump(content, f)
    f.close()
    return Path(f.name)


def test_cli_reports_missing_file():
    r = subprocess.run([sys.executable, str(SCRIPT), "/nonexistent.yaml"],
                       capture_output=True, text=True)
    assert r.returncode != 0
    assert "not found" in r.stderr.lower()


def test_cli_reports_validation_errors_without_traceback():
    # YAML missing required fields — should print friendly error, no traceback
    bad = {"client": {"name": "X"}}  # way too incomplete
    p = _write_tmp_yaml(bad)
    r = subprocess.run([sys.executable, str(SCRIPT), str(p)],
                       capture_output=True, text=True)
    assert r.returncode != 0
    assert "Traceback" not in r.stderr
    assert "invalid" in r.stderr.lower()


def test_merge_uses_tier_default_when_phases_empty(valid_minimal_proposal_dict):
    proposal = Proposal.model_validate(valid_minimal_proposal_dict)
    data = _merge_tier_defaults(proposal)
    assert len(data["phases"]) == 3  # Foundation tier supplies 3 phases


def test_merge_keeps_yaml_phases_when_provided(valid_minimal_proposal_dict):
    valid_minimal_proposal_dict["phases"] = [
        {"name": "Custom", "duration": "1 week", "price": "CAD $100"}
    ]
    proposal = Proposal.model_validate(valid_minimal_proposal_dict)
    data = _merge_tier_defaults(proposal)
    assert len(data["phases"]) == 1
    assert data["phases"][0]["name"] == "Custom"


@pytest.fixture
def valid_minimal_proposal_dict():
    return {
        "client": {"name": "Nishad", "role": "Owner",
                   "company": "Etobicoke Another World", "slug": "nishad",
                   "date": "2026-04-15"},
        "proposal": {"title": "T", "subtitle": "S", "tier": "foundation"},
        "business": {"description": "d", "industry": "i", "location": "l",
                     "context_bullets": ["x"]},
        "audit": {
            "headline_verdict": "v",
            "metric_tiles": [{"value": str(i), "label": "l"} for i in range(4)],
            "findings": [{"title": "t", "detail": "d"}],
            "bottom_line": "b",
        },
        "roi_scenarios": {"avg_ticket": 95, "monthly_new_customers": [10, 25, 50]},
    }
```

Run: `python3 -m pytest tests/test_generate.py -v` — expected 4 pass.

- [ ] **Step 4: Review checkpoint**

Report: "CLI + data merge in place; 4 passing integration tests (missing file, validation error formatting, tier-default merge, YAML override). Ready for Task 13 (migrate Nishad YAML)."

---

## Task 13: Migrate Nishad Content to YAML (`clients/nishad.yaml`)

**Files:**
- Create: `cs2-website/scripts/proposals/clients/nishad.yaml`

- [ ] **Step 1: Transcribe every dynamic Nishad value into YAML**

Open `/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py` and extract:
- Client name, role, company, date (cover page strings)
- Proposal title, subtitle, tier
- Business description, industry, location, all 7 context bullets
- Audit headline verdict (the long "Your CTR of 3.71%..." line)
- All 4 metric tile values + labels
- All 5 finding titles + details
- Bottom-line string
- All 3 phases' name, duration, price, note, deliverables list, outcomes list
- Total investment amount + caveat
- ROI scenario avg_ticket and three customer-volume scenarios
- Customer journey stages (these can use the tier default — but if Nishad source has custom ones, override)
- Risks (tier default likely fits)
- FAQ (tier default likely fits)
- Why CS2 bullets (tier default)

Write to `clients/nishad.yaml` as valid YAML. Use YAML block scalars (`|`) for long multi-line strings.

- [ ] **Step 2: Run the CLI on the Nishad YAML**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 generate.py clients/nishad.yaml
```

Expected: writes `out/nishad_proposal.pdf` with no errors.

- [ ] **Step 3: Review checkpoint**

Report: "`clients/nishad.yaml` migrated; CLI produces `out/nishad_proposal.pdf`. Ready for parity verification."

---

## Task 14: Parity Verification (Acceptance Test)

**Files:** (none modified in this task — pure verification)

- [ ] **Step 1: Render both PDFs and open side-by-side**

```bash
open /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals/out/nishad_proposal.pdf
open /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals/fixtures/nishad_reference.pdf
```

- [ ] **Step 2: Page-by-page visual diff — every one of the 16 pages**

For each page in order, check:
- [ ] Same heading text, same position, same color
- [ ] Same body text, same font, same size, same leading
- [ ] Same rectangle/box positions and fills
- [ ] Same bullet styles (CS2_RED dot, correct y-offset)
- [ ] Same metric tile values + positions (page 4)
- [ ] Same findings count + order + text (page 5)
- [ ] Same phase card colors + prices + notes (pages 3, 7, 8, 9)
- [ ] Same ROI scenario math + layout (page 12)
- [ ] Same FAQ order (page 16)

Note any diff and fix in `render.py`. Re-render. Re-diff. Repeat until no visible differences.

- [ ] **Step 3: Confirm parity criterion met**

> "Rendering `clients/nishad.yaml` produces a PDF visually indistinguishable from the existing Nishad reference."

- [ ] **Step 4: Review checkpoint**

Report: "Parity test PASSED — visual comparison across all 16 pages confirms no visible differences. Ready for Task 15 (docs)."

If parity test FAILS after good-faith effort, STOP and surface specific page(s) and differences to the user rather than shipping degraded quality.

---

## Task 15: Documentation (`_template.yaml` + `README.md`)

**Files:**
- Create: `cs2-website/scripts/proposals/clients/_template.yaml`
- Create: `cs2-website/scripts/proposals/README.md`

- [ ] **Step 1: Write `_template.yaml` — annotated reference**

Copy `clients/nishad.yaml` and replace every real value with a `{{ PLACEHOLDER }}` + comment explaining what goes there. Every field that has a sane tier default should have a comment like `# Optional: omit to use Foundation tier default`.

- [ ] **Step 2: Write `README.md`**

Keep the README under ~200 lines. Sections:

1. **Purpose** — one paragraph on what this is and why it exists
2. **Quick start** — `cp _template.yaml clients/acme.yaml`, edit, run `python generate.py clients/acme.yaml`, open `out/acme_proposal.pdf`
3. **Required fields** — reference list of what must be in the YAML
4. **Optional fields** — what falls through to tier defaults
5. **Tier selection** — when to pick foundation vs. growth vs. scale (matches spec pricing table)
6. **Quality bar** — pointer to the design spec; note that any changes to `render.py` must be visually reviewed against `fixtures/nishad_reference.pdf` before being considered done
7. **Testing** — `python -m pytest tests/`

- [ ] **Step 3: Review checkpoint**

Report: "README and _template.yaml written. v1 complete. Final checklist to confirm ready for user hand-off."

---

## Task 16: Final Self-Check

- [ ] **Step 1: Confirm all v1 deliverables present**

Run from repo root:

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website
ls -1 scripts/proposals/
```

Confirm the listing includes (at minimum):
- `brand.py`
- `schema.py`
- `tiers.py`
- `render.py`
- `generate.py`
- `requirements.txt`
- `README.md`
- `clients/nishad.yaml`
- `clients/_template.yaml`
- `fixtures/nishad_reference.pdf`
- `tests/test_schema.py`
- `tests/test_tiers.py`
- `tests/test_generate.py`
- `tests/test_roi.py`

- [ ] **Step 2: Run full test suite**

```bash
cd /Users/qasimali/ai-projects/cs2technologies/cs2-website/scripts/proposals
python3 -m pytest tests/ -v
```

Expected: all tests pass (at least: 7 schema + 5 tiers + 2 roi + 4 generate = 18 pass).

- [ ] **Step 3: Final parity test**

```bash
python3 generate.py clients/nishad.yaml
open out/nishad_proposal.pdf
open fixtures/nishad_reference.pdf
```

Visual confirmation: indistinguishable.

- [ ] **Step 4: Final review checkpoint**

Report to user:
> "v1 complete. All files in place, all tests passing, parity test confirmed. `python3 generate.py clients/<slug>.yaml` → premium 16-page proposal PDF in `out/`. No git commits made — changes are in the working tree, ready for you to review and commit at your discretion."

---

## Deferred to Future Iterations (NOT in v1)

- Growth / Scale tier defaults (populate on first real pitch to avoid throwaway content)
- `$500 Audit` stripped-down proposal variant (separate render flow)
- Web form / UI input
- Multi-brand theming (VirtueNetz / SUEZ palette)
- Invoice + Service Agreement integration
- French localization
- Automatic upload to cs2technologies.ca client portal
