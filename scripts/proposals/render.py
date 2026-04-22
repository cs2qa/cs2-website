"""Page-rendering functions for CS2 proposals.

Built by refactoring the Nishad proposal generator
(/Users/qasimali/ai-projects/nishad/generate_cs2_proposal_detailed.py)
into data-driven functions. Every drawing call (fonts, colors, coordinates)
is preserved verbatim from that source to guarantee visual parity with the
reference PDF at scripts/proposals/fixtures/nishad_reference.pdf.
"""
from reportlab.lib.colors import HexColor

from brand import (
    CS2_RED, DARK_INK, DEEP_INK, MID_INK, ACCENT_SOFT, LIGHT_BG,
    WARM_CREAM, MUTED, DARK_TEXT, GOLD, SUCCESS, SUCCESS_BG,
    WARN_BG, WARN_TEXT, WARN_BORDER, BORDER, SLATE, WHITE,
    LOGO_PATH,
)


# ── Shared helpers (ported verbatim from Nishad generator lines 38-112) ──

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
    c.setFillColor(BORDER)
    c.rect(40, 28, w - 80, 0.5, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(40, 16, "CS2Technologies Inc.  |  2424 Finch Ave W, Unit 14, Toronto, M9M 2E2  |  905-749-5338")
    c.drawRightString(w - 40, 16, "www.cs2technologies.ca")


def section_title(c, text, x, y, color=DARK_INK):
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x, y, text)
    c.setFillColor(CS2_RED)
    c.rect(x, y - 8, 50, 2.5, fill=1, stroke=0)
    return y - 30


def subheading(c, text, x, y):
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(x, y, text)
    return y - 14


def bullet(c, text, x, y, w_max, font="Helvetica", size=9.5, leading=13, color=DARK_TEXT):
    c.setFillColor(CS2_RED)
    c.circle(x + 2, y - 2, 2, fill=1, stroke=0)
    y2 = draw_wrapped(c, text, x + 12, y, font, size, w_max - 12, leading, color)
    return y2


# ═══════════════════════════════════════════════════════════════════════
# PAGE 1 — COVER
# Port of Nishad generator lines 118-190, with strings replaced by data
# lookups. All coordinates, fonts, and colors are preserved verbatim.
# ═══════════════════════════════════════════════════════════════════════
def page_cover(c, w, h, data):
    c.setFillColor(DARK_INK)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.rect(0, 0, 6, h, fill=1, stroke=0)
    c.rect(0, h - 4, w, 4, fill=1, stroke=0)
    c.setFillColor(HexColor("#151E30"))
    c.rect(w - 220, h - 320, 220, 320, fill=1, stroke=0)
    c.setFillColor(HexColor("#0E1626"))
    c.rect(w - 150, 0, 150, 260, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.rect(60, h - 120, 40, 4, fill=1, stroke=0)

    try:
        c.drawImage(LOGO_PATH, w - 150, h - 90, width=100, height=50,
                    mask="auto", preserveAspectRatio=True)
    except Exception:
        pass

    y = h - 200
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(60, y, data["proposal"]["title"])
    y -= 38
    c.drawString(60, y, "Detailed Proposal")

    y -= 20
    c.setFillColor(CS2_RED)
    c.rect(60, y, 90, 3, fill=1, stroke=0)

    y -= 35
    c.setFillColor(HexColor("#D1D5DB"))
    c.setFont("Helvetica", 16)
    c.drawString(60, y, f"CS2 Technologies  x  {data['client']['company']}")

    y -= 28
    c.setFillColor(HexColor("#9CA3AF"))
    c.setFont("Helvetica-Oblique", 12)
    c.drawString(60, y, data["proposal"]["subtitle"])

    # Info block
    y_info = 180
    c.setFillColor(HexColor("#1A2236"))
    c.rect(40, 60, w - 80, 140, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#2A3650"))
    c.setLineWidth(1)
    c.rect(40, 60, w - 80, 140, fill=0, stroke=1)

    c.setFillColor(HexColor("#8B96A6"))
    c.setFont("Helvetica", 9)
    c.drawString(60, y_info, "PREPARED FOR")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(60, y_info - 18, data["client"]["name"])
    c.setFillColor(HexColor("#C8D1DD"))
    c.setFont("Helvetica", 10)
    c.drawString(60, y_info - 34,
                 f"{data['client']['role']}, {data['client']['company']}")

    c.setFillColor(HexColor("#8B96A6"))
    c.setFont("Helvetica", 9)
    c.drawString(320, y_info, "DATE")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(320, y_info - 18, data["client"]["date"].strftime("%B %d, %Y"))

    c.setFillColor(HexColor("#8B96A6"))
    c.setFont("Helvetica", 9)
    c.drawString(320, y_info - 50, "CLASSIFICATION")
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(320, y_info - 66, "CONFIDENTIAL PROPOSAL")

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 2 — TABLE OF CONTENTS
# Port of Nishad generator lines 196-227. TOC is fully static (no dynamic
# data) — same 14 entries for every proposal.
# ═══════════════════════════════════════════════════════════════════════
def page_toc(c, w, h, data):
    draw_page_header(c, "TABLE OF CONTENTS", 2, w, h)
    draw_footer(c, w)

    y = h - 110
    toc = [
        ("1.  Executive Summary", 3),
        ("2.  The Situation", 4),
        ("3.  Google Ads Audit — What We Found", 5),
        ("4.  Market & Competitor Context", 6),
        ("5.  Phase 1 — Prove (Month 1)", 7),
        ("6.  Phase 2 — Retain + Scale (Months 2–3)", 8),
        ("7.  Phase 3 — Grow (Months 4–6)", 9),
        ("8.  Customer Journey", 10),
        ("9.  Example Landing Page", 11),
        ("10. ROI Math — Three Scenarios", 12),
        ("11. Investment & Engagement", 13),
        ("12. What We Need From You / Day 30", 14),
        ("13. Risks & Mitigations", 15),
        ("14. Why CS2 Technologies + FAQ", 16),
    ]
    for label, pg in toc:
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica", 12)
        c.drawString(80, y, label)
        c.setFillColor(MUTED)
        c.drawRightString(w - 80, y, f"Page {pg}")
        c.setFillColor(BORDER)
        c.rect(80, y - 4, w - 160, 0.3, fill=1, stroke=0)
        y -= 24

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 3 — EXECUTIVE SUMMARY
# Port of Nishad generator lines 233-289.
# ═══════════════════════════════════════════════════════════════════════
def page_exec_summary(c, w, h, data):
    draw_page_header(c, "EXECUTIVE SUMMARY", 3, w, h)
    draw_footer(c, w)

    y = h - 95

    # Summary block
    c.setFillColor(LIGHT_BG)
    c.roundRect(40, y - 150, w - 80, 150, 6, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(55, y - 22, "THE BUSINESS PROBLEM")
    c.setFillColor(DARK_TEXT)
    draw_wrapped(c, data["proposal"]["problem_statement"], 55, y - 42,
                 "Helvetica", 10, w - 110, 14, DARK_TEXT)
    y -= 170

    y = section_title(c, "Our Proposal — A Three-Phase Roadmap", 40, y)

    # Phase cards — exactly three, using tier-default colors.
    card_colors = [CS2_RED, ACCENT_SOFT, DEEP_INK]
    for i, phase in enumerate(data["phases"][:3]):
        color = card_colors[i] if i < len(card_colors) else DEEP_INK
        c.setFillColor(color)
        c.roundRect(40, y - 42, w - 80, 42, 4, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(52, y - 16, phase["name"])
        c.setFont("Helvetica", 9)
        c.drawString(52, y - 30, phase["duration"])
        c.drawRightString(w - 52, y - 16, phase["price"])
        c.setFont("Helvetica-Oblique", 8.5)
        note = phase.get("note") or "ad spend paid directly to platforms"
        c.drawRightString(w - 52, y - 30, note)
        y -= 52

    # Total investment badge
    y -= 6
    total = data["total_investment"]
    c.setFillColor(SUCCESS)
    c.roundRect(40, y - 48, w - 80, 48, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(
        w / 2, y - 20,
        f"6-Month Total Investment from CS2: {total['amount']}"
    )
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, y - 37, total["caveat"])

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 4 — THE SITUATION
# Port of Nishad generator lines 295-377.
# ═══════════════════════════════════════════════════════════════════════
def page_situation(c, w, h, data):
    draw_page_header(c, "THE SITUATION", 4, w, h)
    draw_footer(c, w)

    y = h - 95
    y = section_title(
        c, f"Where {data['client']['company']} Stands Today", 40, y
    )

    intro = (
        f"Two months in, a new {data['business']['industry'].lower()} needs one thing above all: "
        "consistent foot traffic. Right now, that traffic isn't showing up — "
        "and the numbers tell a specific story."
    )
    y = draw_wrapped(c, intro, 40, y, "Helvetica", 10.5, w - 80, 14, SLATE)
    y -= 16

    # Labeled context bullets: "• **Label:** value"
    for fact in data["business"]["context_bullets"]:
        label = fact["label"]
        val = fact["value"]
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 2.8, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y, label + ":")
        c.setFillColor(MID_INK)
        c.setFont("Helvetica", 10)
        c.drawString(
            60 + c.stringWidth(label + ": ", "Helvetica-Bold", 10),
            y, val,
        )
        y -= 17

    # Key metrics box (exactly four tiles)
    y -= 10
    box_h = 70
    c.setFillColor(DARK_INK)
    c.roundRect(40, y - box_h, w - 80, box_h, 6, fill=1, stroke=0)
    col_w = (w - 80) / 4
    for i, tile in enumerate(data["audit"]["metric_tiles"][:4]):
        cx = 40 + col_w * i + col_w / 2
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica-Bold", 22)
        c.drawCentredString(cx, y - 30, tile["value"])
        c.setFillColor(HexColor("#C8D1DD"))
        c.setFont("Helvetica", 8.5)
        c.drawCentredString(cx, y - 48, tile["label"])
    y -= box_h + 10

    # Optional footnote (e.g., explaining an asterisk in a tile label)
    footnote = data["audit"].get("metric_footnote")
    if footnote:
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Oblique", 8.5)
        c.drawString(40, y, footnote)
        y -= 24
    else:
        y -= 12

    # Stakes callout
    c.setFillColor(WARM_CREAM)
    c.roundRect(40, y - 80, w - 80, 80, 6, fill=1, stroke=0)
    c.setStrokeColor(WARN_BORDER)
    c.setLineWidth(1)
    c.roundRect(40, y - 80, w - 80, 80, 6, fill=0, stroke=1)
    c.setFillColor(WARN_TEXT)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(55, y - 22, "WHAT'S AT STAKE")
    c.setFont("Helvetica", 9.5)
    # Wrap stakes_text to up to three lines
    stake_lines = wrap_text(
        c, data["business"]["stakes_text"], "Helvetica", 9.5, w - 110
    )[:3]
    gy = y - 40
    for ln in stake_lines:
        c.drawString(65, gy, ln)
        gy -= 13

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 5 — GOOGLE ADS AUDIT
# Port of Nishad generator lines 383-461.
# ═══════════════════════════════════════════════════════════════════════
def page_audit(c, w, h, data):
    draw_page_header(c, "GOOGLE ADS AUDIT — WHAT WE FOUND", 5, w, h)
    draw_footer(c, w)

    y = h - 95
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(
        40, y,
        "Findings from the screenshots of your live Google Ads account (All-time view)."
    )
    y -= 22

    # "ONE GOOD SIGN" callout — two-line headline verdict from YAML.
    # Split headline_verdict into (first_line_after_label, optional_second_line)
    # by finding a sentence boundary if the text is long.
    verdict = data["audit"]["headline_verdict"]
    verdict_lines = wrap_text(c, verdict, "Helvetica", 9.5, w - 220)
    line1 = verdict_lines[0] if verdict_lines else ""
    line2 = " ".join(verdict_lines[1:]) if len(verdict_lines) > 1 else ""

    c.setFillColor(SUCCESS_BG)
    c.roundRect(40, y - 40, w - 80, 40, 6, fill=1, stroke=0)
    c.setFillColor(SUCCESS)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(55, y - 17, "ONE GOOD SIGN:")
    c.setFillColor(HexColor("#065F46"))
    c.setFont("Helvetica", 9.5)
    c.drawString(155, y - 17, line1)
    if line2:
        c.drawString(55, y - 31, line2)
    y -= 54

    # Findings — list from YAML (1–6 items)
    for finding in data["audit"]["findings"]:
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 3, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(60, y, finding["title"])
        y -= 13
        y = draw_wrapped(c, finding["detail"], 60, y,
                         "Helvetica", 9, w - 120, 12, MUTED)
        y -= 6

    # Bottom line callout
    y -= 2
    c.setFillColor(WARM_CREAM)
    c.roundRect(40, y - 60, w - 80, 60, 6, fill=1, stroke=0)
    c.setStrokeColor(WARN_BORDER)
    c.setLineWidth(1.2)
    c.roundRect(40, y - 60, w - 80, 60, 6, fill=0, stroke=1)
    c.setFillColor(WARN_TEXT)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(55, y - 20, "THE BOTTOM LINE")
    c.setFont("Helvetica", 10)
    bl_lines = [
        data["audit"]["bottom_line"],
        "The next section covers what to do about it.",
    ]
    gy = y - 38
    for ln in bl_lines:
        c.drawString(65, gy, ln)
        gy -= 13

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 6 — MARKET & COMPETITOR CONTEXT
# Port of Nishad generator lines 467-539.
# ═══════════════════════════════════════════════════════════════════════
def page_market(c, w, h, data):
    draw_page_header(c, "MARKET & COMPETITOR CONTEXT", 6, w, h)
    draw_footer(c, w)

    mc = data.get("market_context")
    y = h - 95

    if not mc:
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(40, y, "Market context not provided for this client.")
        c.showPage()
        return

    y = section_title(c, mc["section_title"], 40, y)
    y = draw_wrapped(c, mc["intro"], 40, y,
                     "Helvetica", 10.5, w - 80, 14, SLATE)
    y -= 12

    y = subheading(c, mc["competitors_heading"], 40, y)
    for comp in mc["competitors"]:
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 2.5, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y, comp["name"])
        y -= 13
        y = draw_wrapped(c, comp["description"], 60, y,
                         "Helvetica", 9, w - 120, 12, MUTED)
        y -= 6

    y -= 4
    y = subheading(c, mc["intents_heading"], 40, y)
    for intent in mc["search_intents"]:
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y, intent["name"])
        y -= 13
        y = draw_wrapped(c, intent["description"], 60, y,
                         "Helvetica", 9, w - 120, 12, MUTED)
        y -= 6

    # "WHY THIS MATTERS" callout — light-bg rounded rect
    y -= 6
    c.setFillColor(LIGHT_BG)
    c.roundRect(40, y - 60, w - 80, 60, 6, fill=1, stroke=0)
    c.setFillColor(DARK_INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(55, y - 20, mc["why_it_matters_title"])
    c.setFillColor(MID_INK)
    c.setFont("Helvetica", 9.5)
    # Wrap why_it_matters to fit inside the box (up to 3 lines)
    wim_lines = wrap_text(c, mc["why_it_matters"],
                          "Helvetica", 9.5, w - 110)[:3]
    gy = y - 37
    for ln in wim_lines:
        c.drawString(65, gy, ln)
        gy -= 12

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PHASE PAGE HELPERS — shared between pages 7, 8, 9.
# ═══════════════════════════════════════════════════════════════════════
def _draw_phase_banner(c, w, y, banner: dict, banner_color):
    """Colored banner at top of a phase page, with goal + meta line."""
    c.setFillColor(banner_color)
    c.roundRect(40, y - 32, w - 80, 32, 4, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(55, y - 13, banner["goal"])
    c.setFont("Helvetica", 9.5)
    c.drawString(55, y - 26, banner["meta"])
    return y - 50


def _draw_weekly_block(c, w, y, block: dict):
    """Title row + date right-aligned + thin divider line + deliverable items."""
    c.setFillColor(DARK_INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(40, y, block["title"])
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawRightString(w - 40, y, block["dates"])
    y -= 14
    c.setStrokeColor(BORDER)
    c.line(40, y + 4, w - 40, y + 4)
    y -= 4
    for it in block["items"]:
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica", 9)
        c.drawString(50, y, "›")
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica", 9.5)
        y2 = draw_wrapped(c, it, 62, y, "Helvetica", 9.5,
                          w - 110, 12, DARK_TEXT)
        y = y2 - 2
    return y - 8


def _draw_phase_section(c, w, y, sec: dict):
    """Section with a section_title and either named_items or plain_items."""
    y = section_title(c, sec["title"], 40, y)
    if sec.get("intro"):
        y = draw_wrapped(c, sec["intro"], 40, y,
                         "Helvetica", 10, w - 80, 13, SLATE)
        y -= 10
    for it in sec.get("named_items", []):
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 2.5, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y, it["name"])
        y -= 13
        y = draw_wrapped(c, it["description"], 60, y,
                         "Helvetica", 9, w - 120, 12, MUTED)
        y -= 5
    for it in sec.get("plain_items", []):
        y = bullet(c, it, 50, y, w - 100)
        y -= 2
    return y


def _draw_phase_outcome(c, w, y, oc: dict):
    """Green 'EXPECTED OUTCOME' callout with 2–3 lines."""
    box_h = 45 + 14 * len(oc["lines"])
    c.setFillColor(SUCCESS_BG)
    c.roundRect(40, y - box_h, w - 80, box_h, 6, fill=1, stroke=0)
    c.setFillColor(SUCCESS)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(55, y - 18, oc["title"])
    c.setFillColor(HexColor("#065F46"))
    c.setFont("Helvetica", 9.5)
    gy = y - 34
    for ln in oc["lines"]:
        c.drawString(55, gy, ln)
        gy -= 14
    return y - box_h


def _render_phase_page(c, w, h, data, phase_index: int, page_num: int,
                       header_title: str, banner_color):
    """Shared rendering for pages 7, 8, 9.

    Each phase page has a banner at the top (from phase.banner), then 0+
    weekly_blocks (Phase 1), then 0+ sections (Phase 2 & 3), then an
    optional outcome_callout (Phase 2 & 3).
    """
    draw_page_header(c, header_title, page_num, w, h)
    draw_footer(c, w)
    y = h - 95

    if phase_index >= len(data.get("phases", [])):
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(40, y, f"No data supplied for phase index {phase_index}.")
        c.showPage()
        return

    phase = data["phases"][phase_index]

    if phase.get("banner"):
        y = _draw_phase_banner(c, w, y, phase["banner"], banner_color)

    if phase.get("weekly_blocks"):
        y = section_title(c, "Weekly Deliverables", 40, y)
        for block in phase["weekly_blocks"]:
            y = _draw_weekly_block(c, w, y, block)

    for sec in phase.get("sections", []):
        y = _draw_phase_section(c, w, y, sec)
        y -= 4

    if phase.get("outcome_callout"):
        y -= 8
        _draw_phase_outcome(c, w, y, phase["outcome_callout"])

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 7 — PHASE 1 — PROVE (Month 1)
# Port of Nishad generator lines 545-611.
# ═══════════════════════════════════════════════════════════════════════
def page_phase1(c, w, h, data):
    phases = data.get("phases", [])
    header_name = phases[0]["name"].upper() if phases else "PHASE 1"
    duration = f" ({phases[0]['duration'].upper()})" if phases else ""
    _render_phase_page(c, w, h, data, phase_index=0, page_num=7,
                       header_title=f"{header_name}{duration}",
                       banner_color=CS2_RED)


# ═══════════════════════════════════════════════════════════════════════
# PAGE 8 — PHASE 2 — RETAIN + SCALE (Months 2–3)
# Port of Nishad generator lines 617-684.
# ═══════════════════════════════════════════════════════════════════════
def page_phase2(c, w, h, data):
    phases = data.get("phases", [])
    header_name = phases[1]["name"].upper() if len(phases) > 1 else "PHASE 2"
    duration = f" ({phases[1]['duration'].upper()})" if len(phases) > 1 else ""
    _render_phase_page(c, w, h, data, phase_index=1, page_num=8,
                       header_title=f"{header_name}{duration}",
                       banner_color=ACCENT_SOFT)


# ═══════════════════════════════════════════════════════════════════════
# PAGE 9 — PHASE 3 — GROW (Months 4–6)
# Port of Nishad generator lines 690-747.
# ═══════════════════════════════════════════════════════════════════════
def page_phase3(c, w, h, data):
    phases = data.get("phases", [])
    header_name = phases[2]["name"].upper() if len(phases) > 2 else "PHASE 3"
    duration = f" ({phases[2]['duration'].upper()})" if len(phases) > 2 else ""
    _render_phase_page(c, w, h, data, phase_index=2, page_num=9,
                       header_title=f"{header_name}{duration}",
                       banner_color=DEEP_INK)


# Default palette for customer journey step cards (7 distinct colors, in order).
_JOURNEY_COLORS = [
    CS2_RED,
    ACCENT_SOFT,
    HexColor("#E11D48"),
    HexColor("#9333EA"),
    HexColor("#2563EB"),
    HexColor("#0EA5A0"),
    HexColor("#15803D"),
]


# ═══════════════════════════════════════════════════════════════════════
# PAGE 10 — CUSTOMER JOURNEY
# Port of Nishad generator lines 753-792.
# ═══════════════════════════════════════════════════════════════════════
def page_journey(c, w, h, data):
    draw_page_header(c, "CUSTOMER JOURNEY", 10, w, h)
    draw_footer(c, w)

    y = h - 95
    y = section_title(c, "From Ad Click to Loyal Customer", 40, y)
    y = draw_wrapped(
        c,
        "The same person moves through these steps. Each arrow is a drop-off point we measure and optimize.",
        40, y, "Helvetica", 10, w - 80, 13, SLATE,
    )
    y -= 18

    steps = data.get("customer_journey", [])
    step_h = 56
    step_w = w - 80
    for i, step in enumerate(steps):
        color_hex = step.get("color")
        color = HexColor(color_hex) if color_hex else _JOURNEY_COLORS[i % len(_JOURNEY_COLORS)]
        c.setFillColor(color)
        c.roundRect(40, y - step_h + 6, step_w, step_h - 10, 6, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(55, y - 16, step["stage"])
        c.setFont("Helvetica", 9.5)
        c.drawString(55, y - 34, step["description"])
        y -= step_h
        if i < len(steps) - 1:
            c.setFillColor(MUTED)
            c.setFont("Helvetica-Bold", 12)
            c.drawString(w / 2 - 4, y + 2, "▼")
            y -= 14

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 11 — EXAMPLE LANDING PAGE MOCKUP
# Port of Nishad generator lines 798-900.
# ═══════════════════════════════════════════════════════════════════════
def page_landing_mockup(c, w, h, data):
    draw_page_header(c, "EXAMPLE LANDING PAGE", 11, w, h)
    draw_footer(c, w)

    y = h - 95
    y = section_title(c, "What Your Website Will Look Like", 40, y)
    y = draw_wrapped(
        c,
        "A mobile-first single page designed to convert ad clicks into offer claims. "
        "Clean, fast, one clear call-to-action. Final design adapted to your brand and photos.",
        40, y, "Helvetica", 10, w - 80, 13, SLATE,
    )
    y -= 14

    mock = data.get("landing_mockup")
    if not mock:
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(40, y, "Landing-page mockup content not provided for this client.")
        c.showPage()
        return

    # Simulated phone frame
    frame_x = 130
    frame_y_top = y
    frame_w = 240
    frame_h = 520
    c.setFillColor(DARK_INK)
    c.roundRect(frame_x - 10, frame_y_top - frame_h - 10,
                frame_w + 20, frame_h + 20, 16, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.roundRect(frame_x, frame_y_top - frame_h, frame_w, frame_h, 8, fill=1, stroke=0)

    sy = frame_y_top - 20

    # Hero band
    c.setFillColor(DARK_INK)
    c.rect(frame_x, sy - 90, frame_w, 90, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(frame_x + 12, sy - 20, mock["brand_line"])
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    hy = sy - 42
    for line in mock["headline_lines"][:2]:
        c.drawString(frame_x + 12, hy, line)
        hy -= 16
    c.setFillColor(HexColor("#C8D1DD"))
    c.setFont("Helvetica", 8.5)
    sub_y = sy - 74
    for line in mock.get("subtitle_lines", [])[:2]:
        c.drawString(frame_x + 12, sub_y, line)
        sub_y -= 10
    sy -= 100

    # CTA button
    c.setFillColor(CS2_RED)
    c.roundRect(frame_x + 18, sy - 30, frame_w - 36, 30, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(frame_x + frame_w / 2, sy - 19, mock["cta_text"])
    sy -= 44

    # Form prompt + fields
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(frame_x + 18, sy, mock["form_prompt"])
    sy -= 14
    fields = mock.get("form_fields") or [
        {"placeholder": "Your name"},
        {"placeholder": "Phone number"},
        {"placeholder": "Email"},
    ]
    for fld in fields[:3]:
        c.setFillColor(LIGHT_BG)
        c.roundRect(frame_x + 18, sy - 20, frame_w - 36, 20, 4, fill=1, stroke=0)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(frame_x + 24, sy - 14, fld["placeholder"])
        sy -= 26
    sy -= 6

    # Photo placeholders
    c.setFillColor(LIGHT_BG)
    c.roundRect(frame_x + 18, sy - 70, (frame_w - 44) / 2, 70, 6, fill=1, stroke=0)
    c.roundRect(frame_x + 18 + (frame_w - 44) / 2 + 8, sy - 70,
                (frame_w - 44) / 2, 70, 6, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 8)
    labels = mock["photo_labels"]
    c.drawCentredString(
        frame_x + 18 + (frame_w - 44) / 4, sy - 38, labels[0]
    )
    c.drawCentredString(
        frame_x + 18 + (frame_w - 44) / 2 + 8 + (frame_w - 44) / 4, sy - 38,
        labels[1],
    )
    sy -= 82

    # Section links
    c.setFillColor(DARK_INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(frame_x + 18, sy, mock["section_links"])
    sy -= 16
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(frame_x + 18, sy, mock["trust_line"])

    # Annotations (callouts to the right of the phone)
    ann_x = frame_x + frame_w + 40
    ann_y_top = frame_y_top - 30
    for ann in mock.get("annotations", []):
        ay = ann_y_top - ann["y_offset"]
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(ann_x, ay, "→")
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica", 9)
        c.drawString(ann_x + 14, ay, ann["text"])

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 12 — ROI MATH (3 SCENARIOS)
# Port of Nishad generator lines 906-996.
# Renders a detailed table when roi_page is provided; otherwise falls back
# to a simple 3-scenario template using roi_scenarios (avg_ticket × volumes).
# ═══════════════════════════════════════════════════════════════════════
def page_roi(c, w, h, data):
    draw_page_header(c, "ROI MATH — THREE SCENARIOS", 12, w, h)
    draw_footer(c, w)

    y = h - 95
    roi_page = data.get("roi_page")

    if roi_page:
        y = section_title(c, roi_page["section_title"], 40, y)
        y = draw_wrapped(c, roi_page["intro"], 40, y,
                         "Helvetica", 10, w - 80, 13, SLATE)
        y -= 12

        # Assumptions box
        assumptions = roi_page["assumptions"]
        box_h = 30 + 12 * len(assumptions)
        c.setFillColor(LIGHT_BG)
        c.roundRect(40, y - box_h, w - 80, box_h, 6, fill=1, stroke=0)
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(55, y - 18, roi_page["assumptions_title"])
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica", 9.5)
        for i, line in enumerate(assumptions):
            c.drawString(65, y - 34 - i * 12, line)
        y -= box_h + 13

        # Table heading
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(40, y, roi_page["table_heading"])
        y -= 18

        cols = roi_page["column_headers"]
        col_weights = roi_page["column_weights"]
        total_cw = sum(col_weights) or 1
        col_w = [(w - 80) * cw / total_cw for cw in col_weights]

        # Header row
        c.setFillColor(DARK_INK)
        c.rect(40, y - 22, w - 80, 22, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 9)
        cx = 40
        for i, col in enumerate(cols):
            c.drawString(cx + 6, y - 14, col)
            cx += col_w[i]
        y -= 22

        # Data rows (alternating bg)
        for i, row in enumerate(roi_page["rows"]):
            bg = LIGHT_BG if i % 2 == 0 else WHITE
            c.setFillColor(bg)
            c.rect(40, y - 22, w - 80, 22, fill=1, stroke=0)
            cx = 40
            for j, cell in enumerate(row):
                if j == 0:
                    c.setFillColor(DARK_INK)
                    c.setFont("Helvetica-Bold", 9.5)
                elif j == len(row) - 1 and cell.startswith("+"):
                    c.setFillColor(SUCCESS)
                    c.setFont("Helvetica-Bold", 9.5)
                elif j == len(row) - 1 and (cell.startswith("−") or cell.startswith("-")):
                    c.setFillColor(CS2_RED)
                    c.setFont("Helvetica-Bold", 9.5)
                else:
                    c.setFillColor(DARK_TEXT)
                    c.setFont("Helvetica", 9.5)
                c.drawString(cx + 6, y - 14, cell)
                cx += col_w[j]
            y -= 22

        # "THE BET" callout
        y -= 12
        bet_lines = roi_page["bet_lines"]
        bet_h = 30 + 14 * len(bet_lines)
        c.setFillColor(SUCCESS_BG)
        c.roundRect(40, y - bet_h, w - 80, bet_h, 6, fill=1, stroke=0)
        c.setFillColor(SUCCESS)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(55, y - 18, roi_page["bet_title"])
        c.setFillColor(HexColor("#065F46"))
        c.setFont("Helvetica", 9.5)
        gy = y - 34
        for ln in bet_lines:
            c.drawString(55, gy, ln)
            gy -= 14
    else:
        # Simple fallback: 3 scenarios from roi_scenarios
        roi = data.get("roi_scenarios", {})
        avg = roi.get("avg_ticket", 0)
        volumes = roi.get("monthly_new_customers", [0, 0, 0])
        labels = ["Conservative", "Realistic", "Aggressive"]
        y = section_title(c, "What This Could Look Like in Dollars", 40, y)
        y -= 10
        for lbl, v in zip(labels, volumes):
            monthly = v * avg
            six = monthly * 6
            c.setFillColor(DARK_INK)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(50, y, f"{lbl}: {v} new customers/mo × ${avg:.0f} = ${monthly:,.0f}/mo")
            y -= 14
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 9.5)
            c.drawString(60, y, f"6-month revenue: ${six:,.0f}")
            y -= 20

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 13 — INVESTMENT & ENGAGEMENT
# Port of Nishad generator lines 1002-1080.
# ═══════════════════════════════════════════════════════════════════════
def page_investment(c, w, h, data):
    draw_page_header(c, "INVESTMENT & ENGAGEMENT", 13, w, h)
    draw_footer(c, w)

    y = h - 95
    ip = data.get("investment_page")
    section = (ip or {}).get("section_title", "Full 6-Month Pricing")
    y = section_title(c, section, 40, y)

    # 3 phase boxes (side by side)
    phases = data.get("phases", [])[:3]
    # Defensive padding to three
    box_colors = [CS2_RED, ACCENT_SOFT, GOLD]
    box_w = (w - 100) / 3
    for i, phase in enumerate(phases):
        bx = 40 + i * (box_w + 10)
        color = box_colors[i] if i < len(box_colors) else DEEP_INK
        c.setFillColor(DARK_INK)
        c.roundRect(bx, y - 115, box_w, 115, 6, fill=1, stroke=0)
        c.setFillColor(color)
        c.rect(bx, y - 8, box_w, 8, fill=1, stroke=0)
        c.setFillColor(HexColor("#9CA3AF"))
        c.setFont("Helvetica", 9)
        c.drawCentredString(bx + box_w / 2, y - 28, phase["name"])
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica-Bold", 17)
        amount = phase["price"].replace(" one-time", "")
        c.drawCentredString(bx + box_w / 2, y - 55, amount)
        # Description: use first deliverable, or banner goal, or phase.note
        desc = (
            phase.get("banner", {}).get("goal", "").replace("Goal:  ", "")
            or (phase.get("deliverables") or [""])[0]
            or phase.get("note", "")
        )
        # Prepend duration
        desc = f"{phase['duration']} · {desc}" if desc else phase["duration"]
        c.setFillColor(HexColor("#C8D1DD"))
        c.setFont("Helvetica", 8)
        for j, ln in enumerate(wrap_text(c, desc, "Helvetica", 8, box_w - 16)):
            c.drawCentredString(bx + box_w / 2, y - 75 - j * 11, ln)
    y -= 130

    # What's included
    included_heading = (ip or {}).get("included_heading", "WHAT'S INCLUDED IN EACH PHASE")
    y = subheading(c, included_heading, 40, y)
    included_items = (ip or {}).get("included_items", [])
    for incl in included_items:
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 2, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica", 9.5)
        c.drawString(60, y, incl["item"])
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Oblique", 9)
        c.drawRightString(w - 40, y, incl["when"])
        y -= 15

    y -= 6
    ad_note = (ip or {}).get(
        "ad_spend_note",
        "Ad spend ($500–$1,500/mo typical) is your choice, paid directly to Meta / Google. CS2 does not mark it up.",
    )
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 9)
    c.drawCentredString(w / 2, y, ad_note)
    y -= 20

    # Total bar
    total = data.get("total_investment", {})
    total_heading = (ip or {}).get("total_heading", "6-Month Total CS2 Investment:")
    total_caveat = (ip or {}).get("total_caveat", total.get("caveat", ""))
    c.setFillColor(SUCCESS)
    c.roundRect(40, y - 50, w - 80, 50, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawCentredString(w / 2, y - 20, f"{total_heading} {total.get('amount', '')}")
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, y - 38, total_caveat)

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 14 — COMMITMENTS / WHAT WE NEED / DAY 30
# Port of Nishad generator lines 1086-1169.
# ═══════════════════════════════════════════════════════════════════════
def page_commitments(c, w, h, data):
    cp = data.get("commitments_page") or {}
    header = cp.get("header_title", "COMMITMENTS — BOTH WAYS")
    draw_page_header(c, header, 14, w, h)
    draw_footer(c, w)

    y = h - 95
    y = section_title(c, cp.get("section_title", "What We Each Own"), 40, y)

    col_gap = 16
    col_w = (w - 80 - col_gap) / 2

    # Left — what CS2 does
    c.setFillColor(LIGHT_BG)
    c.roundRect(40, y - 230, col_w, 230, 6, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(52, y - 20, cp.get("cs2_column_title", "WHAT CS2 DOES"))
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 9.5)
    ly = y - 40
    for ln in cp.get("cs2_items", []):
        c.drawString(56, ly, ln if ln.startswith("•") else f"• {ln}")
        ly -= 16

    # Right — what client does
    rx = 40 + col_w + col_gap
    c.setFillColor(WARM_CREAM)
    c.roundRect(rx, y - 230, col_w, 230, 6, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(rx + 12, y - 20, cp.get("client_column_title", "WHAT YOU DO"))
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 9.5)
    ly = y - 40
    for ln in cp.get("client_items", []):
        c.drawString(rx + 16, ly, ln if ln.startswith("•") else f"• {ln}")
        ly -= 16

    y -= 250

    # Phase endings section
    y = section_title(c, cp.get("phase_endings_title", "At the End of Each Phase"), 40, y)
    for pe in cp.get("phase_endings", []):
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 2.5, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y, pe["name"])
        y -= 13
        y = draw_wrapped(c, pe["description"], 60, y,
                         "Helvetica", 9, w - 120, 12, MUTED)
        y -= 5

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 15 — RISKS & MITIGATIONS
# Port of Nishad generator lines 1175-1219.
# ═══════════════════════════════════════════════════════════════════════
def page_risks(c, w, h, data):
    draw_page_header(c, "RISKS & MITIGATIONS", 15, w, h)
    draw_footer(c, w)

    y = h - 95
    y = section_title(c, "What Could Go Wrong — and How We Handle It", 40, y)
    y = draw_wrapped(
        c,
        "No honest proposal hides the risks. Here is what could go sideways — and what we do about each.",
        40, y, "Helvetica", 10, w - 80, 13, SLATE,
    )
    y -= 12

    for risk in data.get("risks", []):
        c.setFillColor(CS2_RED)
        c.circle(50, y - 2, 2.5, fill=1, stroke=0)
        c.setFillColor(DARK_INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y, risk["title"])
        y -= 13
        y = draw_wrapped(c, risk["mitigation"], 60, y,
                         "Helvetica", 9, w - 120, 12, MUTED)
        y -= 6

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# PAGE 16 — WHY CS2 + FAQ + CLOSING
# Port of Nishad generator lines 1225-1298.
# ═══════════════════════════════════════════════════════════════════════
def page_closing(c, w, h, data):
    draw_page_header(c, "WHY CS2 TECHNOLOGIES", 16, w, h)
    draw_footer(c, w)

    y = h - 95
    cp = data.get("closing_page") or {}

    # About block
    about_lines = cp.get("about_lines", [])
    about_h = 30 + 12 * max(len(about_lines), 1)
    c.setFillColor(LIGHT_BG)
    c.roundRect(40, y - about_h, w - 80, about_h, 6, fill=1, stroke=0)
    c.setFillColor(CS2_RED)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(55, y - 18, cp.get("about_title", "ABOUT CS2 TECHNOLOGIES"))
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 9.5)
    for i, ln in enumerate(about_lines):
        c.drawString(55, y - 36 - i * 12, ln)
    y -= about_h + 15

    # FAQ
    y = section_title(c, cp.get("faq_title", "FAQ"), 40, y)
    for entry in data.get("faq", []):
        c.setFillColor(CS2_RED)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40, y, "Q:")
        c.setFillColor(DARK_INK)
        c.drawString(56, y, entry["q"])
        y -= 13
        c.setFillColor(SUCCESS)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(40, y, "A:")
        c.setFillColor(MID_INK)
        c.setFont("Helvetica", 9.5)
        y = draw_wrapped(c, entry["a"], 56, y,
                         "Helvetica", 9.5, w - 100, 12, MID_INK)
        y -= 6

    y -= 6
    # Closing CTA
    quote_lines = cp.get("closing_quote_lines", [])
    quote_h = 30 + 18 * max(len(quote_lines), 1)
    c.setFillColor(CS2_RED)
    c.roundRect(40, y - quote_h, w - 80, quote_h, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-BoldOblique", 12)
    ly = y - 24
    for ln in quote_lines:
        c.drawCentredString(w / 2, ly, ln)
        ly -= 18
    y -= quote_h + 12

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, y, cp.get("closing_tagline", "Ready to start this week."))
    y -= 15
    c.setFillColor(DARK_INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(w / 2, y, cp.get("closing_contact", ""))

    c.showPage()


# ═══════════════════════════════════════════════════════════════════════
# TOP-LEVEL DISPATCHER
# ═══════════════════════════════════════════════════════════════════════
from reportlab.lib.pagesizes import A4 as _A4
from reportlab.pdfgen import canvas as _canvas


def render_proposal(data: dict, output_path: str) -> None:
    """Render a 16-page proposal PDF to output_path.

    `data` is the merged dict (client YAML + tier defaults). The caller
    (generate.py) performs the merge before invoking this function.
    """
    w, h = _A4
    c = _canvas.Canvas(output_path, pagesize=_A4)

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
    page_commitments(c, w, h, data)
    page_risks(c, w, h, data)
    page_closing(c, w, h, data)

    c.save()
