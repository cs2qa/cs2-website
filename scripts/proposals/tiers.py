"""Tier defaults for CS2 proposal generator.

Each tier dict supplies defaults for all Proposal fields that are optional
in schema.py (lists default to empty, TotalInvestment defaults to None).
If a client YAML populates any of these fields, the YAML takes precedence.

v1: Foundation is fully populated from the Nishad proposal content.
Growth and Scale are stubbed and will be populated when pitched to real
clients to avoid writing content we may throw away.
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
}


_GROWTH_STUB = {
    "phases": [],
    "total_investment": None,
    "customer_journey": [],
    "risks": [],
    "faq": [],
}


_SCALE_STUB = {
    "phases": [],
    "total_investment": None,
    "customer_journey": [],
    "risks": [],
    "faq": [],
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
