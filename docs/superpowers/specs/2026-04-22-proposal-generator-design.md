# CS2 Proposal Generator — Design Spec

**Date:** 2026-04-22
**Status:** Design approved; implementation plan to follow
**Author:** CS2 Technologies (Qasim) + Claude

## 1. Goal

Turn the one-off 1,328-line hand-coded ReportLab generator used for the Nishad proposal (`/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py`) into a reusable, data-driven tool that produces Nishad-quality proposals from a single YAML file per client — so every new prospect can receive a premium 16-page proposal in ~1–2 hours instead of a week of forked Python.

This generator is the tooling backbone for CS2 Technologies' productized service offering for Canadian SMBs (custom website + CRM + Google Ads management + hosting, tiered by business model).

## 2. Non-Goals (v1)

Explicitly out of scope for v1:

- Web form / browser UI for non-technical editors — YAML is enough for the sole author
- Multi-brand theming (e.g., VirtueNetz / SUEZ proposal style) — `generate_suez_proposal.py` stays separate
- Invoice or Service Agreement generation — separate generators already exist
- French / bilingual output
- Automatic publishing to the cs2technologies.ca website
- Client-facing "self-serve audit" — that's a downstream project that may reuse parts of this later

## 3. Service Pricing Context (informs tier defaults)

CS2's service is tiered by what the business does (not by company size):

| Tier | Target business | CS2 fee (illustrative) | What's included |
|---|---|---|---|
| **Audit** | Anyone (lead magnet) | $500–$750 one-time | Diagnostic PDF only (no site yet) |
| **Foundation — Lead Gen** | Service businesses (clinics, trades, consultants, law firms, real estate) | $4,500 + $650/mo | Custom website + CRM + lead capture + Google Ads mgmt + hosting + SSL + backups |
| **Growth — Payments & Bookings** | VR arcades, gyms, salons, courses, subscription services | $8,500 + $1,200/mo | Everything in Foundation + Stripe + booking system + automated email flows + dashboards |
| **Scale — E-Commerce** | Retail, D2C, wholesale | $15,000 + $2,250/mo | Everything above + shopping cart + inventory + HST tax logic + multi-product CRM + advanced attribution |

Ad spend is always paid direct to platforms (industry-standard transparency).
Hosting is always bundled in the monthly retainer.
Clients own their domain, content, and ad accounts.
30-day clean-export guarantee on leaving.

The generator must be able to produce a proposal aligned to any one of Foundation, Growth, or Scale (Audit is a separate, shorter document — future iteration).

## 4. Architecture — Approach A (Refactor Existing Canvas Code)

Three rendering approaches were considered:

- **A. Refactor existing ReportLab `canvas` code into data-driven functions** — chosen
- **B. Rewrite in ReportLab Platypus (like `generate_suez_proposal.py`)** — rejected: throws away ~1,300 lines of polished layout work and risks visual degradation
- **C. Jinja → HTML → WeasyPrint** — rejected: new stack, layout quirks, loses Nishad look until CSS rewritten from scratch

**Approach A is chosen because visual quality parity with the existing Nishad PDF is non-negotiable** (CS2 is selling premium; the PDF is the product artifact that proves premium). A preserves every layout decision by construction — the refactor only moves hardcoded strings into a YAML data layer, without touching the `c.setFont()` / `c.setFillColor()` / coordinate calls that determine visual output.

## 5. File Layout

```
cs2-website/
  scripts/
    proposals/
      generate.py         # CLI entry: `python generate.py clients/<slug>.yaml`
      render.py           # All ReportLab canvas rendering (refactored from Nishad)
      brand.py            # Color palette, fonts, logo path constants
      tiers.py            # Foundation / Growth / Scale defaults (phases, what-we-need, risks, faq)
      schema.py           # Pydantic model for client YAML validation
      clients/
        _template.yaml    # Annotated reference (every field, with comments)
        nishad.yaml       # Migrated from existing Nishad PDF — used as parity test
      fixtures/
        nishad_reference.pdf   # Committed copy of the existing Nishad PDF, for visual diffing
      out/                # Generated PDFs (gitignored)
      README.md           # How to write a client YAML
```

**Why flat, not nested packages:** render.py will be ~1,000–1,300 lines after refactor. Tempting to split into `pages/cover.py`, `pages/audit.py`, etc., but it's premature — the existing Nishad code interleaves shared helpers with per-page logic, and splitting adds import churn without real benefit for a solo maintainer. Revisit if render.py grows past ~1,500 lines.

**Dependencies added:** `pydantic` (schema validation), `pyyaml` (YAML parsing). ReportLab is already used by `generate_suez_proposal.py`.

## 6. CLI Contract

```bash
cd cs2-website
python scripts/proposals/generate.py scripts/proposals/clients/acme.yaml
# → scripts/proposals/out/acme_proposal.pdf
```

On schema validation error, the CLI exits with a user-friendly message listing which fields are missing or misformatted — never a Python traceback.

## 7. Data Model (YAML Schema)

Every client proposal is a single YAML file. Canonical shape:

```yaml
client:
  name: Nishad
  role: Owner
  company: Etobicoke Another World
  slug: nishad                     # used for output filename
  date: 2026-04-15

proposal:
  title: "Local Bookings System"   # appears under "Detailed Proposal" on cover
  subtitle: "A 6-month roadmap: prove acquisition, scale retention, grow the business"
  tier: foundation                 # foundation | growth | scale — drives phase/pricing defaults

business:
  description: "2-month-old VR arcade and private-party venue"
  industry: "VR arcade + birthday parties + corporate events"
  location: "Etobicoke"
  context_bullets:                 # Bullet list on "Situation" page
    - "Store age: ~2 months since opening (mid-February 2026)"
    - "Customer emails collected: 16 (the entire life of the store)"
    - "Franchise Google Ad spend (all time): ~$5,200"
    # ...

audit:                             # The bespoke crown jewel — fully dynamic per client
  headline_verdict: "Your CTR of 3.71% is above industry average. The problem is what happens after the click."
  metric_tiles:                    # Four large stat tiles on Situation page
    - { value: "16",    label: "Real customers (2 mo)" }
    - { value: "$5.2K", label: "Google ad spend" }
    - { value: "331%",  label: "Conv. rate on 1 ad (broken)" }
    - { value: "<10%",  label: "Ad's share of voice" }
  findings:                        # 3–6 bullets on Audit page
    - title: "'Conversions' in your account are not paid bookings."
      detail: "Your conversion actions are: Submit lead form, Phone call lead, Contact, Book appointment..."
    - title: "One ad shows a 331% conversion rate — the tracking is broken."
      detail: "On 'Thrilling VR gaming | Book your VR party', Cost/Conv is $0.33..."
    # up to 6 findings total
  bottom_line: "$5,200+ spent with no reliable way to know what actually produced a paid booking."

# Pricing — omit to use tier defaults; include to override per client
phases: []                         # empty → loaded from tiers.py[tier]
total_investment: null             # null → computed from phases

roi_scenarios:                     # Page 12 — three scenarios
  avg_ticket: 95
  monthly_new_customers: [10, 25, 50]   # conservative, realistic, aggressive

# Optional overrides — tier defaults fill in when left empty
customer_journey: []               # list of stage dicts
risks: []                          # list of {title, mitigation} dicts
faq: []                            # list of {q, a} dicts
why_cs2_bullets: []                # list of strings
```

Validation is handled by Pydantic models in `schema.py`. Missing required fields or type errors produce friendly CLI messages pointing at the offending field.

## 8. Dynamic vs. Fixed Content — Per Page

| # | Page | Source |
|---|---|---|
| 1 | Cover | Fully client-dynamic (name, company, role, date, proposal title, subtitle) |
| 2 | TOC | Auto-generated from sections present |
| 3 | Executive Summary | Client-dynamic problem statement; phases from tier + YAML override |
| 4 | The Situation | Fully client-dynamic (business context + metric tiles) |
| 5 | Google Ads Audit | Fully client-dynamic (findings list + headline verdict + bottom line) |
| 6 | Market & Competitor Context | Tier-driven with client override |
| 7 | Phase 1 | Tier default; YAML can override title, deliverables, outcomes |
| 8 | Phase 2 | Tier default; overridable |
| 9 | Phase 3 | Tier default; overridable |
| 10 | Customer Journey | Tier default |
| 11 | Example Landing Page | Tier default (visual mock) |
| 12 | ROI Math (Three Scenarios) | Client-dynamic inputs; templated math |
| 13 | Investment & Engagement | Tier pricing + YAML overrides |
| 14 | What We Need From You / Day 30 | Tier default |
| 15 | Risks & Mitigations | Tier default; overridable |
| 16 | Why CS2 + FAQ | Mostly fixed + tier-specific FAQ |

**Rule of thumb:** the more bespoke the page is (audit, situation, ROI), the more it lives in YAML. The more structural it is (why-CS2, risks, customer journey), the more it lives in `tiers.py`.

## 9. Tier Defaults (`tiers.py`)

Structure:

```python
FOUNDATION = {
    "phases": [
        {"name": "Phase 1 — Discover & Build", "duration": "Weeks 1–4",
         "price": "CAD $4,500 one-time", "note": "ad spend paid directly to platforms"},
        {"name": "Phase 2 — Manage & Optimize", "duration": "Months 2+",
         "price": "CAD $650/mo", "note": "hosting, Google Ads, CRM, support"},
    ],
    "total_6mo": "CAD $8,400",
    "what_we_need": [...],         # Day-30 onboarding checklist
    "risks": [...],                # Standard risks for lead-gen builds
    "faq": [...],                  # Foundation-tier FAQs
    "why_cs2_bullets": [...],
    "customer_journey": [...],
    "included_features": [         # Bulleted list for Phase 1 / Phase 2 pages
        "Custom website build (4-week delivery guarantee)",
        "Lead-capture forms + CRM sync",
        "Google Ads account setup + campaign launch",
        "Hosting on AWS/Vercel (Canadian edge)",
        "SSL certificate + automated backups",
        "Monthly performance review call",
        # ...
    ],
}
GROWTH = {...}     # Populated when first Growth client is pitched — stub only in v1
SCALE = {...}      # Stub only in v1
```

**v1 only fully populates Foundation defaults.** Growth and Scale are stubbed (minimum viable structure so the code paths work, but realistic tier content is added when the first real prospect comes in — avoids writing content we might throw away).

## 10. Rendering Module (`render.py`) Structure

Refactoring principles:

- Keep every `c.setFont()`, `c.setFillColor()`, coordinate, and drawing call from the existing Nishad generator byte-identical where it currently exists
- Extract shared patterns (draw_page_header, draw_phase_card, draw_metric_tiles, draw_section_divider, wrap_text, draw_wrapped) into module-level helpers
- Each of the 16 pages becomes a function: `draw_page_1_cover(c, data)`, `draw_page_5_audit(c, data)`, etc.
- `render.py` has one public entry point: `render_proposal(data: ProposalData, output_path: str) -> None`

No "cleanup" of layout code. The refactor is mechanical: hoist strings into YAML, wrap repeated drawing patterns into helpers, parameterize by data dict.

## 11. Quality Bar (Non-Negotiable)

The Nishad PDF (`/Users/qasimali/ai-projects/nishad/CS2_Nishad_Proposal_Detailed.pdf`) is the quality floor.

**Parity test (v1 acceptance criterion):**
> Rendering `clients/nishad.yaml` with the new generator produces a PDF visually indistinguishable from the existing Nishad PDF.

Visual equivalence means:
- Same fonts, sizes, leading, kerning
- Same colors (full CS2 palette)
- Same page layouts, margins, grid alignment
- Same hero cover, phase cards, metric tiles, section dividers
- Same 16-page order and structure
- Same logo placement, header/footer styling

Pixel-level timestamp diffs are acceptable. Structural or visual differences a human can spot are not.

**Drift prevention:**
- The existing Nishad PDF is copied into `scripts/proposals/fixtures/nishad_reference.pdf` so future regressions are always diff-able against the known-good output
- Side-by-side visual review required after each page is ported
- If quality drifts, we stop and fix — no "good enough for v1"

## 12. v1 Deliverable Checklist

1. `schema.py` — Pydantic model for client YAML, with friendly error messages on invalid input
2. `tiers.py` — Foundation defaults fully populated; Growth/Scale stubs
3. `brand.py` — CS2 color palette, font constants, logo path (extracted from Nishad generator)
4. `render.py` — 16 page-rendering functions + shared helpers, all driven by validated data dict
5. `generate.py` — CLI entry point (YAML path → PDF)
6. `clients/nishad.yaml` — Migrated from existing Nishad PDF content; reproduces it exactly
7. `clients/_template.yaml` — Annotated reference template for creating new client proposals
8. `fixtures/nishad_reference.pdf` — Copy of the existing Nishad PDF (placed in the working tree; user commits when ready)
9. `README.md` — Instructions: how to draft a new client YAML, which fields are required, how to run the generator, where output lands
10. **Parity test passed:** `python scripts/proposals/generate.py scripts/proposals/clients/nishad.yaml` produces a PDF visually indistinguishable from the reference fixture

## 13. Timeline Estimate

One focused afternoon for v1 (roughly 4–6 hours of real work):

- ~1h: extract brand constants, build Pydantic schema, build tier defaults for Foundation
- ~2–3h: mechanical refactor of render.py page-by-page (16 pages × ~10 min each, plus helpers)
- ~1h: migrate nishad.yaml, run parity test, side-by-side visual verification, fix drift
- ~30min: README + template YAML

## 14. Known Risks

| Risk | Mitigation |
|---|---|
| Visual drift from Nishad PDF during refactor | Page-by-page side-by-side review; committed reference fixture; no "cleanup" edits to layout code |
| YAML schema doesn't cover everything in Nishad PDF | Migrate Nishad data first as the schema-driving exercise; extend schema as gaps appear |
| Tier defaults get re-pitched badly when used for non-Nishad clients | Only Foundation is fully populated in v1; Growth/Scale stubbed and completed on first real use |
| Timeline slips | Scope is tightly bounded; if parity test fails at end of day, ship what's working and iterate — the existing Nishad generator still works as a backup |

## 15. Out of Scope — Deferred

- Growth / Scale tier defaults (stubbed only; populate on first real pitch)
- Web UI / form-based input
- Audit-only (stripped) proposal variant for the $500 lead-magnet audit product
- Multi-brand (VirtueNetz / SUEZ) support — separate generator stays separate
- Invoice / Service Agreement generation
- French localization
- Publishing the proposal to a client-specific URL on cs2technologies.ca

Each of these becomes its own spec + plan cycle when the business actually needs it.
