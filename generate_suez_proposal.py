from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus.flowables import HRFlowable
import os

# ── Colors ──
DARK_NAVY = HexColor("#0B1D3A")
ACCENT_BLUE = HexColor("#1B6EC2")
ACCENT_TEAL = HexColor("#0EA5A0")
LIGHT_BG = HexColor("#F0F4F8")
MEDIUM_GRAY = HexColor("#4A5568")
DARK_TEXT = HexColor("#1A202C")
WHITE = white
GOLD = HexColor("#D4A03C")
SUCCESS_GREEN = HexColor("#16A34A")
ROW_ALT = HexColor("#E8F0FE")
BORDER_LIGHT = HexColor("#CBD5E1")

WIDTH, HEIGHT = A4

# ── Styles ──
styles = getSampleStyleSheet()

style_cover_title = ParagraphStyle(
    'CoverTitle', parent=styles['Title'],
    fontSize=32, leading=40, textColor=WHITE,
    fontName='Helvetica-Bold', alignment=TA_LEFT,
    spaceAfter=12
)
style_cover_sub = ParagraphStyle(
    'CoverSub', parent=styles['Normal'],
    fontSize=16, leading=22, textColor=HexColor("#B0C4DE"),
    fontName='Helvetica', alignment=TA_LEFT,
    spaceAfter=6
)
style_cover_tag = ParagraphStyle(
    'CoverTag', parent=styles['Normal'],
    fontSize=12, leading=16, textColor=HexColor("#8899AA"),
    fontName='Helvetica-Oblique', alignment=TA_LEFT,
)
style_section_title = ParagraphStyle(
    'SectionTitle', parent=styles['Heading1'],
    fontSize=22, leading=28, textColor=DARK_NAVY,
    fontName='Helvetica-Bold', spaceBefore=20, spaceAfter=10,
)
style_heading2 = ParagraphStyle(
    'Heading2Custom', parent=styles['Heading2'],
    fontSize=15, leading=20, textColor=ACCENT_BLUE,
    fontName='Helvetica-Bold', spaceBefore=14, spaceAfter=6,
)
style_heading3 = ParagraphStyle(
    'Heading3Custom', parent=styles['Heading3'],
    fontSize=12, leading=16, textColor=DARK_NAVY,
    fontName='Helvetica-Bold', spaceBefore=10, spaceAfter=4,
)
style_body = ParagraphStyle(
    'BodyText2', parent=styles['Normal'],
    fontSize=10.5, leading=15, textColor=DARK_TEXT,
    fontName='Helvetica', alignment=TA_JUSTIFY,
    spaceAfter=6,
)
style_body_bold = ParagraphStyle(
    'BodyBold', parent=style_body,
    fontName='Helvetica-Bold',
)
style_bullet = ParagraphStyle(
    'BulletCustom', parent=style_body,
    leftIndent=20, bulletIndent=8,
    spaceBefore=2, spaceAfter=2,
)
style_quote = ParagraphStyle(
    'Quote', parent=style_body,
    fontSize=11, leading=16, textColor=ACCENT_BLUE,
    fontName='Helvetica-BoldOblique',
    leftIndent=20, rightIndent=20,
    spaceBefore=8, spaceAfter=8,
    borderColor=ACCENT_BLUE, borderWidth=0,
    borderPadding=0,
)
style_small = ParagraphStyle(
    'Small', parent=style_body,
    fontSize=9, leading=12, textColor=MEDIUM_GRAY,
)
style_table_header = ParagraphStyle(
    'TableHeader', parent=style_body,
    fontSize=10, textColor=WHITE, fontName='Helvetica-Bold',
    alignment=TA_LEFT,
)
style_table_cell = ParagraphStyle(
    'TableCell', parent=style_body,
    fontSize=9.5, leading=13, textColor=DARK_TEXT,
    fontName='Helvetica', spaceAfter=0,
)
style_table_cell_bold = ParagraphStyle(
    'TableCellBold', parent=style_table_cell,
    fontName='Helvetica-Bold', textColor=DARK_NAVY,
)
style_footer = ParagraphStyle(
    'Footer', parent=style_body,
    fontSize=8, textColor=MEDIUM_GRAY, alignment=TA_CENTER,
)
style_page_title = ParagraphStyle(
    'PageTitle', parent=styles['Heading1'],
    fontSize=20, leading=26, textColor=WHITE,
    fontName='Helvetica-Bold', alignment=TA_LEFT,
    spaceAfter=0,
)


def draw_cover(c, width, height):
    """Draw cover page."""
    # Full background
    c.setFillColor(DARK_NAVY)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    # Accent bar left
    c.setFillColor(ACCENT_TEAL)
    c.rect(0, 0, 6, height, fill=1, stroke=0)

    # Top accent line
    c.setFillColor(ACCENT_BLUE)
    c.rect(0, height - 4, width, 4, fill=1, stroke=0)

    # Decorative geometric elements
    c.setFillColor(HexColor("#112A4A"))
    c.rect(width - 200, height - 300, 200, 300, fill=1, stroke=0)
    c.setFillColor(HexColor("#0D2240"))
    c.rect(width - 140, 0, 140, 250, fill=1, stroke=0)

    # Small accent squares
    c.setFillColor(ACCENT_TEAL)
    c.rect(60, height - 120, 40, 4, fill=1, stroke=0)

    # Title block
    y = height - 200
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 34)
    c.drawString(60, y, "Strategic Technology")
    y -= 42
    c.drawString(60, y, "Partnership Proposal")

    # Accent line under title
    y -= 20
    c.setFillColor(ACCENT_TEAL)
    c.rect(60, y, 80, 3, fill=1, stroke=0)

    # Subtitle
    y -= 35
    c.setFillColor(HexColor("#B0C4DE"))
    c.setFont("Helvetica", 17)
    c.drawString(60, y, "VirtueNetz  x  SUEZ Saudi Arabia")

    # Tagline
    y -= 30
    c.setFillColor(HexColor("#7A8FA6"))
    c.setFont("Helvetica-Oblique", 12)
    c.drawString(60, y, "AI-Powered Water & Waste Management Solutions")

    # Info block at bottom
    y_info = 180
    c.setFillColor(HexColor("#15294A"))
    c.rect(40, 60, width - 80, 140, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#1E3A5F"))
    c.setLineWidth(1)
    c.rect(40, 60, width - 80, 140, fill=0, stroke=1)

    c.setFillColor(HexColor("#8899AA"))
    c.setFont("Helvetica", 9)
    c.drawString(60, y_info, "PREPARED FOR")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(60, y_info - 18, "Mr. Shahzad Jameel")
    c.setFillColor(HexColor("#B0C4DE"))
    c.setFont("Helvetica", 10)
    c.drawString(60, y_info - 34, "CEO & Founder, VirtueNetz")

    c.setFillColor(HexColor("#8899AA"))
    c.setFont("Helvetica", 9)
    c.drawString(320, y_info, "DATE")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(320, y_info - 18, "April 2025")

    c.setFillColor(HexColor("#8899AA"))
    c.setFont("Helvetica", 9)
    c.drawString(320, y_info - 50, "CLASSIFICATION")
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(320, y_info - 66, "CONFIDENTIAL")

    c.showPage()


def draw_page_header(c, title, page_num, width, height):
    """Draw a colored header bar on content pages."""
    c.setFillColor(DARK_NAVY)
    c.rect(0, height - 55, width, 55, fill=1, stroke=0)
    c.setFillColor(ACCENT_TEAL)
    c.rect(0, height - 58, width, 3, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, height - 38, title)
    c.setFillColor(HexColor("#7A8FA6"))
    c.setFont("Helvetica", 9)
    c.drawRightString(width - 40, height - 38, f"Page {page_num}")
    # Left accent
    c.setFillColor(ACCENT_TEAL)
    c.rect(0, 0, 4, height - 58, fill=1, stroke=0)


def draw_footer(c, width):
    c.setFillColor(BORDER_LIGHT)
    c.rect(40, 28, width - 80, 0.5, fill=1, stroke=0)
    c.setFillColor(MEDIUM_GRAY)
    c.setFont("Helvetica", 7.5)
    c.drawString(40, 16, "VirtueNetz  |  Confidential Business Proposal")
    c.drawRightString(width - 40, 16, "virtuenetz.com")


def build_pdf(output_path):
    c = canvas.Canvas(output_path, pagesize=A4)
    w, h = A4

    # ════════════════════════════════════════
    # PAGE 1: COVER
    # ════════════════════════════════════════
    draw_cover(c, w, h)

    # ════════════════════════════════════════
    # PAGE 2: THE OPPORTUNITY
    # ════════════════════════════════════════
    draw_page_header(c, "THE OPPORTUNITY", 2, w, h)
    draw_footer(c, w)

    y = h - 90

    # Executive Summary box
    c.setFillColor(LIGHT_BG)
    c.roundRect(40, y - 115, w - 80, 115, 6, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(55, y - 18, "EXECUTIVE SUMMARY")
    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 10)

    summary_lines = [
        "SUEZ, a global leader in water and waste management, operates massive infrastructure in Saudi",
        "Arabia serving 9+ million people across Jeddah, Mecca, and Taif. They are losing 30-40% of all",
        "distributed water (Non-Revenue Water) and must reduce it to 15% under Saudi Vision 2030.",
        "They need a dedicated technology partner to deploy AI, IoT, and digital solutions locally.",
        "This is a multi-million dollar, multi-year engagement opportunity for VirtueNetz."
    ]
    ty = y - 38
    for line in summary_lines:
        c.drawString(55, ty, line)
        ty -= 15

    y = y - 140

    # SUEZ in Saudi section
    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "SUEZ Saudi Arabia Operations")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 22

    contracts = [
        ("Western Cluster Contract (7 Years)",
         "Management, operation & maintenance of water/wastewater networks across Jeddah, Mecca, and Taif. Serves 9+ million people and 320,000+ customers. In consortium with AWAEL and CWC."),
        ("NRW Reduction Consultancy",
         "EUR 4.4M, 2-year contract to reduce Non-Revenue Water from 30-40% to 15% target. Uses international best practices. Directly supports Saudi National Water Strategy 2030."),
        ("SIRC Waste Partnership",
         "Strategic partnership with Saudi Investment Recycling Company (PIF-owned) to build circular economy infrastructure. Medical waste facilities planned in Riyadh, Jeddah, and Dammam."),
        ("Amaala Desalination Project",
         "Consortium with EDF and MASDAR for 37M litres/day desalination plant and 5.9M litres/day wastewater treatment for the luxury AMAALA tourism destination."),
    ]

    for title, desc in contracts:
        c.setFillColor(ACCENT_BLUE)
        c.circle(48, y - 2, 3, fill=1, stroke=0)
        c.setFillColor(DARK_NAVY)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(58, y, title)
        y -= 16
        c.setFillColor(MEDIUM_GRAY)
        c.setFont("Helvetica", 9)
        # word wrap description
        words = desc.split()
        line = ""
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 9) > w - 120:
                c.drawString(58, y, line)
                y -= 13
                line = word
            else:
                line = test
        if line:
            c.drawString(58, y, line)
            y -= 20

    # Key Numbers box
    y -= 10
    box_h = 65
    c.setFillColor(DARK_NAVY)
    c.roundRect(40, y - box_h, w - 80, box_h, 6, fill=1, stroke=0)

    col_w = (w - 80) / 4
    metrics = [
        ("9M+", "People Served"),
        ("320K+", "Customers"),
        ("40", "Countries"),
        ("$8.9B", "Annual Revenue"),
    ]
    for i, (val, label) in enumerate(metrics):
        cx = 40 + col_w * i + col_w / 2
        c.setFillColor(ACCENT_TEAL)
        c.setFont("Helvetica-Bold", 20)
        c.drawCentredString(cx, y - 28, val)
        c.setFillColor(HexColor("#B0C4DE"))
        c.setFont("Helvetica", 9)
        c.drawCentredString(cx, y - 44, label)

    c.showPage()

    # ════════════════════════════════════════
    # PAGE 3: THE TECHNOLOGY GAP
    # ════════════════════════════════════════
    draw_page_header(c, "THE TECHNOLOGY GAP", 3, w, h)
    draw_footer(c, w)

    y = h - 90

    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "What SUEZ Has Globally")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 22

    global_items = [
        ("AQUADVANCED Platform", "Digital water management across 1,500+ networks. AI-powered leak detection, digital twins, real-time monitoring. Deployed for 10+ years globally."),
        ("CoDAI Platform", "Collaborative AI/ML platform built on Microsoft Azure. Self-service ML environment for data scientists. 40+ projects hosted."),
        ("600+ Data & AI Experts", "Global digital team spread across 40 countries. Goal: double digital revenue by 2027."),
        ("ON'connect Smart Metering", "7+ million smart meters deployed worldwide using Wize IoT technology."),
        ("Autodiag AI Waste Sorting", "Camera + AI for waste stream analysis. Won 'AI for Efficiency' award at AI Summit 2025."),
    ]

    for title, desc in global_items:
        c.setFillColor(SUCCESS_GREEN)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(55, y, "+")
        c.setFillColor(DARK_NAVY)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(68, y, title)
        y -= 15
        c.setFillColor(MEDIUM_GRAY)
        c.setFont("Helvetica", 9)
        words = desc.split()
        line = ""
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 9) > w - 120:
                c.drawString(68, y, line)
                y -= 12
                line = word
            else:
                line = test
        if line:
            c.drawString(68, y, line)
            y -= 18

    # The Gap section
    y -= 10
    c.setFillColor(HexColor("#FEF3C7"))
    c.roundRect(40, y - 95, w - 80, 95, 6, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.roundRect(40, y - 95, w - 80, 95, 6, fill=0, stroke=1)

    c.setFillColor(HexColor("#92400E"))
    c.setFont("Helvetica-Bold", 12)
    c.drawString(55, y - 20, "THE GAP: Global Platforms, No Local Execution")
    c.setFont("Helvetica", 10)
    c.setFillColor(HexColor("#78350F"))

    gap_lines = [
        "Their 600 AI experts are spread across 40 countries - not dedicated to Saudi operations.",
        "Global platforms (AQUADVANCED, CoDAI) need local customization, deployment, and integration.",
        "Saudi data sovereignty laws require local/regional cloud infrastructure.",
        "Field operations across 3 cities need Arabic-first mobile tools that don't exist yet.",
    ]
    gy = y - 40
    for line in gap_lines:
        c.drawString(65, gy, line)
        gy -= 14

    y = y - 120

    # What they need
    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "What SUEZ Needs in Saudi Arabia")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 22

    needs = [
        "A dedicated technology team that works exclusively on Saudi operations",
        "AI/ML solutions for NRW reduction - their most expensive problem ($100M+ annually in lost water)",
        "Unified operations platform across Jeddah, Mecca, and Taif",
        "Arabic-first customer service and field workforce mobile applications",
        "Cloud infrastructure compliant with Saudi NCA cybersecurity requirements",
        "Integration between global platforms and local Saudi systems",
        "Technology partner for the new SIRC waste management buildout",
    ]

    for need in needs:
        c.setFillColor(ACCENT_BLUE)
        c.circle(50, y - 1, 2.5, fill=1, stroke=0)
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica", 10)
        c.drawString(62, y, need)
        y -= 17

    # Bottom callout
    y -= 15
    c.setFillColor(ACCENT_BLUE)
    c.roundRect(40, y - 40, w - 80, 40, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(w / 2, y - 17, "This is exactly where VirtueNetz steps in.")
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, y - 32, "We fill the gap between SUEZ's global digital ambition and local Saudi execution.")

    c.showPage()

    # ════════════════════════════════════════
    # PAGE 4: OUR SOLUTION
    # ════════════════════════════════════════
    draw_page_header(c, "OUR SOLUTION", 4, w, h)
    draw_footer(c, w)

    y = h - 85

    c.setFillColor(ACCENT_BLUE)
    c.setFont("Helvetica-BoldOblique", 12)
    c.drawString(40, y, '"We help SUEZ stop the bleeding, digitize operations, and save millions."')
    y -= 30

    solutions = [
        {
            "num": "01",
            "title": "AI-Powered NRW Reduction Engine",
            "subtitle": "Solve their most expensive problem",
            "points": [
                "Real-time anomaly detection across sensor data from all three cities",
                "Predictive maintenance models - fix pipes BEFORE they burst",
                "Pressure zone optimization to reduce excess pressure causing leaks",
                "Integrates with existing AQUADVANCED or runs alongside it",
            ],
            "roi": "Even 5% NRW reduction on 9M people served = tens of millions in recovered revenue. The system pays for itself in months.",
        },
        {
            "num": "02",
            "title": "Unified Operations Command Center",
            "subtitle": "One screen to run three cities",
            "points": [
                "Real-time network monitoring: pressure, flow, quality across all cities",
                "Field workforce management: GPS dispatch, mobile work orders, offline-capable",
                "Arabic/English AI chatbot for 320K+ customers (billing, outages, complaints)",
                "Automated regulatory reporting for NWC and Saudi water authorities",
            ],
            "roi": "Fewer control room staff needed, faster response times, regulatory compliance, happier customers.",
        },
        {
            "num": "03",
            "title": "Dedicated Saudi Tech Team",
            "subtitle": "Their technology arm, on the ground",
            "points": [
                "15-25 person engineering team working exclusively on SUEZ Saudi",
                "AI/ML engineers, full-stack developers, mobile devs, DevOps, QA",
                "Saudi timezone, Arabic language capability",
                "Scales up or down as projects demand",
            ],
            "roi": "3-5x cheaper than European consultancies. In-house hiring takes 6+ months. We deliver in weeks.",
        },
    ]

    for sol in solutions:
        # Number badge
        c.setFillColor(DARK_NAVY)
        c.roundRect(40, y - 22, 30, 22, 4, fill=1, stroke=0)
        c.setFillColor(ACCENT_TEAL)
        c.setFont("Helvetica-Bold", 13)
        c.drawCentredString(55, y - 16, sol["num"])

        # Title
        c.setFillColor(DARK_NAVY)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(78, y - 8, sol["title"])
        c.setFillColor(MEDIUM_GRAY)
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(78, y - 22, sol["subtitle"])
        y -= 38

        # Points
        for pt in sol["points"]:
            c.setFillColor(ACCENT_TEAL)
            c.setFont("Helvetica", 10)
            c.drawString(58, y, ">")
            c.setFillColor(DARK_TEXT)
            c.setFont("Helvetica", 9.5)
            c.drawString(72, y, pt)
            y -= 14

        # ROI box
        y -= 4
        c.setFillColor(HexColor("#ECFDF5"))
        c.roundRect(55, y - 28, w - 110, 28, 4, fill=1, stroke=0)
        c.setFillColor(SUCCESS_GREEN)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(65, y - 12, "ROI:")
        c.setFillColor(HexColor("#065F46"))
        c.setFont("Helvetica", 9)

        roi_text = sol["roi"]
        # Simple word wrap for ROI
        words = roi_text.split()
        line = ""
        rx = 92
        ry = y - 12
        first_line = True
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 9) > w - 175:
                c.drawString(rx, ry, line)
                ry -= 12
                line = word
                first_line = False
            else:
                line = test
        if line:
            c.drawString(rx, ry, line)

        y -= 45

    c.showPage()

    # ════════════════════════════════════════
    # PAGE 5: ENGAGEMENT MODEL & REVENUE
    # ════════════════════════════════════════
    draw_page_header(c, "ENGAGEMENT MODEL & REVENUE", 5, w, h)
    draw_footer(c, w)

    y = h - 90

    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Phased Engagement Roadmap")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 25

    phases = [
        {
            "phase": "PHASE 1: QUICK WIN",
            "timeline": "Weeks 1-4",
            "deliverable": "AI Customer Service Chatbot (Arabic/English) for 320K+ customers",
            "investment": "$15,000 - $25,000 setup + monthly",
            "purpose": "Prove value fast. Show SUEZ we can deliver. Build trust.",
            "color": ACCENT_TEAL,
        },
        {
            "phase": "PHASE 2: PROVE VALUE",
            "timeline": "Months 2-4",
            "deliverable": "Operations Dashboard + Field Workforce Mobile App across all 3 cities",
            "investment": "$75,000 - $150,000",
            "purpose": "Demonstrate operational impact. Embed our team into their workflow.",
            "color": ACCENT_BLUE,
        },
        {
            "phase": "PHASE 3: SCALE",
            "timeline": "Months 4-10",
            "deliverable": "AI Leak Detection & Predictive Analytics Platform for NRW Reduction",
            "investment": "$200,000 - $400,000",
            "purpose": "Attack their biggest money problem. This is where the real value is.",
            "color": HexColor("#7C3AED"),
        },
        {
            "phase": "PHASE 4: STRATEGIC PARTNER",
            "timeline": "Months 10-24+",
            "deliverable": "Full IoT Data Platform + Systems Integration + SIRC Waste Tech",
            "investment": "$500,000 - $1,000,000+",
            "purpose": "Become their indispensable technology arm in Saudi Arabia.",
            "color": GOLD,
        },
    ]

    for ph in phases:
        # Phase header bar
        c.setFillColor(ph["color"])
        c.roundRect(40, y - 20, w - 80, 20, 3, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(50, y - 14, ph["phase"])
        c.setFont("Helvetica", 9)
        c.drawRightString(w - 50, y - 14, ph["timeline"])
        y -= 28

        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(50, y, "Deliverable:")
        c.setFont("Helvetica", 9.5)
        c.drawString(115, y, ph["deliverable"])
        y -= 14

        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(50, y, "Investment:")
        c.setFillColor(SUCCESS_GREEN)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(115, y, ph["investment"])
        y -= 14

        c.setFillColor(MEDIUM_GRAY)
        c.setFont("Helvetica-Oblique", 9)
        c.drawString(50, y, ph["purpose"])
        y -= 25

    # Revenue Potential
    y -= 10
    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Revenue Potential for VirtueNetz")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 25

    # Revenue boxes
    rev_items = [
        ("Year 1", "$250K - $500K", "Phases 1-3: Chatbot + Dashboard + AI Platform"),
        ("Year 2", "$500K - $1M+", "Phase 4: Full platform + dedicated team (15-25 devs)"),
        ("Year 3+", "$1M - $2M+", "Ongoing retainer + expansion to other SUEZ regions"),
    ]

    box_w = (w - 100) / 3
    for i, (year, amount, desc) in enumerate(rev_items):
        bx = 40 + i * (box_w + 10)
        c.setFillColor(DARK_NAVY)
        c.roundRect(bx, y - 85, box_w, 85, 6, fill=1, stroke=0)

        c.setFillColor(HexColor("#7A8FA6"))
        c.setFont("Helvetica", 9)
        c.drawCentredString(bx + box_w / 2, y - 18, year)

        c.setFillColor(ACCENT_TEAL)
        c.setFont("Helvetica-Bold", 18)
        c.drawCentredString(bx + box_w / 2, y - 40, amount)

        c.setFillColor(HexColor("#B0C4DE"))
        c.setFont("Helvetica", 8)
        # Word wrap desc in box
        words = desc.split()
        line = ""
        dy = y - 58
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 8) > box_w - 16:
                c.drawCentredString(bx + box_w / 2, dy, line)
                dy -= 11
                line = word
            else:
                line = test
        if line:
            c.drawCentredString(bx + box_w / 2, dy, line)

    y -= 110

    # Total
    c.setFillColor(SUCCESS_GREEN)
    c.roundRect(40, y - 35, w - 80, 35, 6, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(w / 2, y - 14, "Total 3-Year Potential: $1.75M - $3.5M+")
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, y - 28, "Recurring revenue with expansion opportunity to SUEZ operations in 40 countries")

    c.showPage()

    # ════════════════════════════════════════
    # PAGE 6: WHY VIRTUENETZ & CLOSING
    # ════════════════════════════════════════
    draw_page_header(c, "WHY VIRTUENETZ", 6, w, h)
    draw_footer(c, w)

    y = h - 90

    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "Why SUEZ Should Choose Us")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 28

    advantages = [
        ("AI-First Engineering", "Custom LLMs, RAG systems, TensorFlow, PyTorch, LangChain, Spring AI. Not just developers - AI specialists who understand water industry data."),
        ("Proven Scale", "500+ projects delivered, 50-200 engineers available. Full-stack: AI/ML, mobile, web, cloud, DevOps, enterprise Java."),
        ("Cost Advantage", "3-5x more cost-effective than European consultancies (McKinsey, Accenture, Capgemini). Same quality, fraction of the price."),
        ("Speed to Market", "30-day start capability. Agile delivery with results in weeks, not months. No 6-month procurement cycles."),
        ("Regional Understanding", "Arabic language capability, Saudi timezone operations, understanding of Vision 2030 requirements and NCA compliance."),
        ("Enterprise Heritage", "15+ years in enterprise systems. Spring Boot microservices, J2EE, cloud-native architecture. HIPAA/SOC 2 compliance experience."),
    ]

    for title, desc in advantages:
        c.setFillColor(ACCENT_TEAL)
        c.rect(40, y + 2, 4, 12, fill=1, stroke=0)
        c.setFillColor(DARK_NAVY)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(52, y, title)
        y -= 15
        c.setFillColor(MEDIUM_GRAY)
        c.setFont("Helvetica", 9)
        words = desc.split()
        line = ""
        for word in words:
            test = line + " " + word if line else word
            if c.stringWidth(test, "Helvetica", 9) > w - 110:
                c.drawString(52, y, line)
                y -= 12
                line = word
            else:
                line = test
        if line:
            c.drawString(52, y, line)
            y -= 20

    # The Ask
    y -= 15
    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(40, y, "The Ask")
    y -= 8
    c.setFillColor(ACCENT_TEAL)
    c.rect(40, y, 50, 2.5, fill=1, stroke=0)
    y -= 22

    c.setFillColor(DARK_TEXT)
    c.setFont("Helvetica", 10.5)
    c.drawString(40, y, "Shahzad, here is what I propose we do together:")
    y -= 25

    asks = [
        "1.  Present this as a VirtueNetz offering to SUEZ in the upcoming Saudi meeting",
        "2.  Lead with the NRW reduction pitch - it's their most expensive problem ($100M+ annual loss)",
        '3.  Offer a risk-free 90-day pilot: "If we don\'t show measurable improvement, you walk away"',
        "4.  Start with the AI chatbot (4-week delivery) to build trust and embed our team",
        "5.  Scale to the full platform engagement over 12-24 months",
    ]

    for ask in asks:
        c.setFillColor(DARK_TEXT)
        c.setFont("Helvetica", 10)
        c.drawString(50, y, ask)
        y -= 17

    # Bottom CTA
    y -= 20
    c.setFillColor(ACCENT_BLUE)
    c.roundRect(40, y - 65, w - 80, 65, 8, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-BoldOblique", 12)
    c.drawCentredString(w / 2, y - 20, '"Give us 90 days and one pilot city.')
    c.drawCentredString(w / 2, y - 36, 'If we don\'t show measurable NRW reduction and operational')
    c.drawCentredString(w / 2, y - 52, 'improvement, they walk away."')

    # Contact
    y -= 85
    c.setFillColor(MEDIUM_GRAY)
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, y, "Let's discuss this week. This is a once-in-a-decade opportunity.")
    y -= 16
    c.setFillColor(DARK_NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(w / 2, y, "virtuenetz.com  |  VirtueNetz - Live to Amaze")

    c.showPage()
    c.save()


if __name__ == "__main__":
    output = os.path.expanduser("~/ai-projects/cs2technologies/cs2-website/VirtueNetz_SUEZ_Proposal.pdf")
    build_pdf(output)
    print(f"PDF generated: {output}")
