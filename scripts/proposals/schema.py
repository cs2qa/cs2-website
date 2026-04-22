"""Pydantic v2 models for CS2 proposal YAML validation.

A client proposal is represented as a single Proposal model. Optional list
fields (phases, risks, faq, etc.) default to empty — meaning 'use the tier
default from tiers.py'. Populating them in YAML overrides the tier default.
"""
from datetime import date
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class Tier(str, Enum):
    FOUNDATION = "foundation"
    GROWTH = "growth"
    SCALE = "scale"


class Client(BaseModel):
    name: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    company: str = Field(..., min_length=1)
    slug: str = Field(
        ...,
        pattern=r"^[a-z0-9][a-z0-9_-]*$",
        description="Lowercase slug; used for output filename.",
    )
    date: date


class ProposalMeta(BaseModel):
    title: str = Field(..., min_length=1)
    subtitle: str = Field(..., min_length=1)
    tier: Tier
    problem_statement: str = Field(
        ...,
        min_length=1,
        description="The paragraph rendered in the 'THE BUSINESS PROBLEM' box on the Executive Summary page.",
    )


class ContextBullet(BaseModel):
    """A labeled fact in the 'Situation' page bullet list.

    Rendered as: **Label:** value
    """
    label: str
    value: str


class Business(BaseModel):
    description: str
    industry: str
    location: str
    context_bullets: List[ContextBullet] = Field(..., min_length=1)
    stakes_text: str = Field(
        ...,
        min_length=1,
        description="Paragraph rendered in the 'WHAT'S AT STAKE' callout on the Situation page.",
    )


class MetricTile(BaseModel):
    value: str
    label: str


class Finding(BaseModel):
    title: str
    detail: str


class Audit(BaseModel):
    headline_verdict: str
    metric_tiles: List[MetricTile] = Field(
        ...,
        min_length=4,
        max_length=4,
        description="Situation page renders exactly four tiles.",
    )
    metric_footnote: Optional[str] = Field(
        default=None,
        description="Optional footnote rendered under the metric tiles (e.g., defining an asterisk in a tile label).",
    )
    findings: List[Finding] = Field(..., min_length=1, max_length=6)
    bottom_line: str


class NamedItem(BaseModel):
    """An item with a bold name and wrapped description. Used in named sections."""
    name: str
    description: str


class WeeklyBlock(BaseModel):
    """A time-boxed chunk of deliverables on Phase 1 page."""
    title: str
    dates: str
    items: List[str] = Field(..., min_length=1)


class PhaseBanner(BaseModel):
    """The colored banner at the top of each phase page."""
    goal: str
    meta: str


class PhaseSection(BaseModel):
    """A content section inside a phase page.

    Populate either named_items (bolded-name bullets with description)
    or plain_items (simple bullets). Optional intro paragraph above the list.
    """
    title: str
    intro: Optional[str] = None
    named_items: List[NamedItem] = []
    plain_items: List[str] = []


class PhaseOutcome(BaseModel):
    """The green 'EXPECTED OUTCOME' callout at the bottom of phase pages."""
    title: str
    lines: List[str] = Field(..., min_length=1)


class Phase(BaseModel):
    name: str
    duration: str
    price: str
    note: Optional[str] = None
    deliverables: List[str] = []
    outcomes: List[str] = []
    # Page-rendering extensions (all optional — pages skip sections when empty)
    banner: Optional[PhaseBanner] = None
    weekly_blocks: List[WeeklyBlock] = []
    sections: List[PhaseSection] = []
    outcome_callout: Optional[PhaseOutcome] = None


class Competitor(BaseModel):
    name: str
    description: str


class SearchIntent(BaseModel):
    name: str
    description: str


class MarketContext(BaseModel):
    """Page 6 — Market & Competitor Context. Fully optional (page is skipped if unset)."""
    section_title: str = "Who You Are Really Competing With"
    intro: str
    competitors_heading: str = "PRIMARY COMPETITORS"
    competitors: List[Competitor]
    intents_heading: str = "THE TOP 3 SEARCH INTENTS THAT MATTER"
    search_intents: List[SearchIntent]
    why_it_matters_title: str = "WHY THIS MATTERS FOR YOU"
    why_it_matters: str


class TotalInvestment(BaseModel):
    amount: str
    caveat: str


class ROIScenarios(BaseModel):
    avg_ticket: float = Field(..., gt=0)
    monthly_new_customers: List[int] = Field(
        ...,
        min_length=3,
        max_length=3,
        description="Conservative, realistic, aggressive.",
    )


class ROIPage(BaseModel):
    """Detailed per-client ROI Math page (Page 12). Optional — the page falls back
    to a simple 3-scenario template from `roi_scenarios` when not provided."""
    section_title: str = "What This Could Look Like in Dollars"
    intro: str
    assumptions_title: str = "ASSUMPTIONS USED"
    assumptions: List[str] = Field(..., min_length=1)
    table_heading: str
    column_headers: List[str] = Field(..., min_length=2)
    column_weights: List[float] = Field(..., min_length=2)
    rows: List[List[str]] = Field(..., min_length=1)
    bet_title: str = "THE BET"
    bet_lines: List[str] = Field(..., min_length=1)


class InvestmentItem(BaseModel):
    item: str
    when: str


class InvestmentPage(BaseModel):
    """Page 13 — Investment & Engagement extras. Optional."""
    section_title: str = "Full 6-Month Pricing"
    included_heading: str = "WHAT'S INCLUDED IN EACH PHASE"
    included_items: List[InvestmentItem] = Field(..., min_length=1)
    ad_spend_note: str
    total_heading: str = "6-Month Total CS2 Investment:"
    total_caveat: str


class CommitmentsPage(BaseModel):
    """Page 14 — Commitments / What We Need / Day 30. Optional."""
    header_title: str = "COMMITMENTS — BOTH WAYS"
    section_title: str = "What We Each Own"
    cs2_column_title: str = "WHAT CS2 DOES"
    cs2_items: List[str] = Field(..., min_length=1)
    client_column_title: str = "WHAT YOU DO"
    client_items: List[str] = Field(..., min_length=1)
    phase_endings_title: str = "At the End of Each Phase"
    phase_endings: List["NamedItem"] = Field(default_factory=list)


class ClosingPage(BaseModel):
    """Page 16 — Why CS2 + FAQ + closing CTA. Optional."""
    about_title: str = "ABOUT CS2 TECHNOLOGIES"
    about_lines: List[str] = Field(..., min_length=1)
    faq_title: str = "FAQ"
    closing_quote_lines: List[str] = Field(default_factory=list)
    closing_tagline: str = "Ready to start this week."
    closing_contact: str


class JourneyStage(BaseModel):
    stage: str
    description: str
    color: Optional[str] = Field(
        default=None,
        description="Hex color (e.g. '#FF2900') for the step card. "
                    "When None, a palette default from render.py is used.",
    )


class LandingAnnotation(BaseModel):
    """A callout to the right of the phone mockup on page 11."""
    text: str
    # y_offset: distance below the top of the phone in px (matches Nishad layout)
    y_offset: int


class LandingFormField(BaseModel):
    placeholder: str


class LandingMockup(BaseModel):
    """Page 11 — mockup of the proposed landing page.

    All fields client-specific. Optional at the proposal level; the
    page is skipped if no landing_mockup is provided.
    """
    brand_line: str = Field(..., description="Small caps brand line in the hero, e.g. 'ETOBICOKE ANOTHER WORLD'.")
    headline_lines: List[str] = Field(..., min_length=1, max_length=2)
    subtitle_lines: List[str] = Field(default_factory=list, max_length=2)
    cta_text: str
    form_prompt: str = "Get your code by SMS:"
    form_fields: List[LandingFormField] = Field(default_factory=list)
    photo_labels: List[str] = Field(
        ..., min_length=2, max_length=2,
        description="Two photo-placeholder labels, e.g. '[ VR photo ]'.",
    )
    section_links: str
    trust_line: str = "★★★★★   Google Reviews   📍"
    annotations: List[LandingAnnotation] = []


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
    roi_scenarios: ROIScenarios
    # Optional — empty/None means "use tier default from tiers.py"
    phases: List[Phase] = []
    total_investment: Optional[TotalInvestment] = None
    market_context: Optional[MarketContext] = None
    landing_mockup: Optional[LandingMockup] = None
    roi_page: Optional[ROIPage] = None
    investment_page: Optional[InvestmentPage] = None
    commitments_page: Optional[CommitmentsPage] = None
    closing_page: Optional[ClosingPage] = None
    customer_journey: List[JourneyStage] = []
    risks: List[Risk] = []
    faq: List[FAQEntry] = []
    why_cs2_bullets: List[str] = []
