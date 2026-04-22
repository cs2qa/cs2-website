# CS2 Proposal Generator

## Purpose

Generates a client-ready, multi-page CS2 Technologies sales proposal as a PDF from a single YAML file. The YAML carries the client-specific content (name, audit findings, ROI assumptions, optional landing-page mockup, etc.) and the generator layers on tier defaults from `tiers.py` (shared phases, pricing, FAQ, risk list, "Why CS2" bullets) and then renders the PDF using the reusable page builders in `render.py`. The format and visual design match the Nishad proposal (`fixtures/nishad_reference.pdf`).

## Quick start

```bash
cd scripts/proposals
cp clients/_template.yaml clients/acme.yaml
# edit clients/acme.yaml — replace every REPLACE_ME
python3 generate.py clients/acme.yaml
open out/acme_proposal.pdf
```

The output filename is `out/<client.slug>_proposal.pdf`.

## CLI usage

```bash
python3 generate.py <path-to-client-yaml>
```

- Exits 0 on success, prints `Wrote <path>`.
- Exits 1 on missing file, unparseable YAML, schema validation errors, or render errors. Errors are printed as readable messages — never Python tracebacks.
- Exits 2 on incorrect CLI argument count.

## Required fields

Every client YAML must have these top-level sections:

| Section | What goes in it |
|---|---|
| `client` | `name`, `role`, `company`, `slug` (lowercase, `^[a-z0-9][a-z0-9_-]*$`), `date` (YYYY-MM-DD) |
| `proposal` | `title`, `subtitle`, `tier` (foundation/growth/scale), `problem_statement` |
| `business` | `description`, `industry`, `location`, `context_bullets` (1+ items), `stakes_text` |
| `audit` | `headline_verdict`, `metric_tiles` (exactly 4), `findings` (1-6), `bottom_line` |
| `roi_scenarios` | `avg_ticket` (>0), `monthly_new_customers` (exactly 3 ints) |

See `schema.py` for exact field types and constraints. `clients/_template.yaml` is the annotated reference.

## Optional fields

These sections, when present, override the tier defaults from `tiers.py`. When omitted (or left empty), the tier default is used:

- `phases` — per-phase scope, pricing, weekly blocks, sections, outcome callouts
- `total_investment` — headline 6-month total + caveat
- `customer_journey` — 5-7 stage visual funnel
- `risks` — risk/mitigation pairs
- `faq` — Q/A pairs
- `why_cs2_bullets` — closing "Why CS2" bullets

These render empty-or-skipped when not provided (no tier default exists):

- `market_context` — page 6 competitor + search-intent context (page skipped if absent)
- `landing_mockup` — page 11 landing-page wireframe (page skipped if absent)
- `roi_page` — detailed ROI table (falls back to the simple `roi_scenarios` 3-column chart)
- `investment_page` — extended pricing page (skipped if absent)
- `commitments_page` — who-does-what page (skipped if absent)
- `closing_page` — about / closing quote / contact (skipped if absent)

## Tier selection

Tier drives the default phases, pricing, and fallback copy. Pick by client business model:

| Tier | Target businesses | CS2 fee |
|---|---|---|
| `foundation` | Service SMBs: clinics, trades, consultants, law firms, real estate, B2B services | $4,500 + $650/mo |
| `growth` | Bookings/subscriptions: VR arcades, gyms, salons, courses, events | $8,500 + $1,200/mo |
| `scale` | E-commerce: retail, D2C, wholesale | $15,000 + $2,250/mo |

**v1 only fully populates Foundation defaults.** Growth and Scale are stubbed in `tiers.py` with empty lists (except `why_cs2_bullets`, which is shared). If you pitch a Growth or Scale client in v1, you must populate `phases`, `total_investment`, `risks`, `faq`, and `customer_journey` directly in the client YAML — otherwise the generated PDF will have empty phase pages. The stubs will be filled in with real content the first time a real Growth/Scale client is pitched, so we don't write copy we might throw away.

## Quality bar

- **Design spec:** [`docs/superpowers/specs/2026-04-22-proposal-generator-design.md`](../../docs/superpowers/specs/2026-04-22-proposal-generator-design.md). Read before touching `render.py`.
- **Visual reference:** `fixtures/nishad_reference.pdf` is the canonical look. Any change to `render.py` must be visually diffed against it — open the newly generated Nishad PDF (`python3 generate.py clients/nishad.yaml`) side-by-side with the fixture and verify no regressions on layout, spacing, colors, or typography.
- **No content in render.py.** All copy lives in `clients/*.yaml` or `tiers.py`. `render.py` is presentation-only.

## Testing

```bash
cd scripts/proposals
python3 -m pytest tests/
```

The test suite covers:
- `test_schema.py` — Pydantic model validation (required fields, constraints)
- `test_tiers.py` — tier default shape and lookups
- `test_generate.py` — CLI end-to-end (loads YAML, merges tiers, writes PDF)
- `tests/smoke_render.py` — render helpers don't crash on minimal input

Smoke-test the template itself by running:

```bash
python3 generate.py clients/_template.yaml
```

It should produce `out/replace_me_proposal.pdf` without errors — a valid placeholder PDF suitable for visual QA only, never for sending to a client.
