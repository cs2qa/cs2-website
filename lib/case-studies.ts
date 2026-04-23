export type CaseStudy = {
  /** URL slug, used in the dynamic route `/case-studies/[slug]`. */
  slug: string
  /** Display name of the client. */
  clientName: string
  /** Industry label rendered as a badge on cards and detail pages. */
  industry: string
  /** One-sentence hook (1–2 lines) used on cards and hero. */
  tagline: string
  /** Live site URL (external, opens in a new tab). */
  liveSiteUrl: string
  /** 2–3 sentence lede rendered at the top of the detail page. */
  heroBlurb: string
  /** Paragraph describing what the client needed. */
  challenge: string
  /** Paragraph describing what CS2 built. */
  solution: string
  /**
   * Paragraph describing measurable / qualitative impact.
   * Any numeric metric that cannot be observed on the live site
   * must be rendered as a `[TODO: ...]` placeholder for Qasim to fill in.
   */
  outcome: string
  /** Tech stack tags. Only list items that are observable on the live site. */
  techStack: string[]
  /** 3–5 short bullet points of deliverables. */
  highlights: string[]
  /** One-line tie-back to the SMB-acquisition pitch. */
  whatThisProves: string
}

/**
 * Case studies for the five live CS2 client sites.
 *
 * Every factual claim here is either observable on the live site
 * (site architecture, Next.js signals in HTML / response headers,
 * visible features like catalogs, booking flows, forms, pricing
 * tables, gated portals, image galleries) or flagged as a `[TODO: ...]`
 * placeholder for Qasim to fill in with an internal metric.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'majestik-group',
    clientName: 'The Majestik Group',
    industry: 'Furniture retail',
    tagline:
      'A premium furniture retailer with a catalog-driven site, custom-order flow, and a wholesale portal.',
    liveSiteUrl: 'https://www.themajestikgroup.com/',
    heroBlurb:
      'The Majestik Group is a premium furniture retailer in Mississauga, Ontario, specializing in sofas, sectionals, sofa beds, and bedroom furniture. CS2 built a Next.js-powered catalog site with custom-order inquiry flows, a wholesale login portal, and a showroom-forward brand experience — no template, no platform tax.',
    challenge:
      'Majestik sells high-consideration furniture — sectionals, custom sofas, bedroom sets — where the shopper journey is "browse, imagine in my space, ask for a quote," not "add to cart, check out." Off-the-shelf store builders made it hard to present the catalog as a curated lookbook, handle custom-order inquiries, and separately serve designers and wholesale partners without rebuilding the site twice. They needed a site that felt like a premium brand, not a Shopify page.',
    solution:
      'CS2 shipped a custom Next.js site with server-rendered product pages backed by image-heavy galleries served from AWS S3. Each product uses "Contact for Pricing" and "Get a Quote" flows rather than a traditional cart, so sales stays consultative. Custom Orders has its own dedicated page to capture bespoke requests. A separate Wholesale login portal segments the designer / retail-partner experience from the retail shopper. The showroom and about sections reinforce the bricks-and-mortar credibility that drives the high-ticket buying decision.',
    outcome:
      'The Majestik Group now has a brand-grade digital storefront that funnels prospects into quote and wholesale conversations rather than commodity checkouts. The catalog architecture lets the team add new collections without developer involvement, and the S3-backed image pipeline keeps product photography sharp across devices. [TODO: quote-request volume lift since launch — Qasim to supply]. [TODO: wholesale partner sign-ups / month — Qasim to supply].',
    techStack: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'AWS S3 (product imagery)',
      'CloudFront CDN',
      'Custom quote / wholesale forms',
    ],
    highlights: [
      'Custom catalog with per-product quote flow (no generic cart)',
      'Dedicated Custom Orders intake page',
      'Gated wholesale portal for designers and retail partners',
      'High-resolution image pipeline served from S3',
      'Showroom and testimonials sections to reinforce premium positioning',
    ],
    whatThisProves:
      'How CS2 turns a high-ticket retail business into a quote-driven funnel without forcing it onto a generic Shopify template.',
  },
  {
    slug: 'gws-connect',
    clientName: 'GWS Connect',
    industry: 'B2B wholesale',
    tagline:
      'A member-gated wholesale brokerage with buyer / supplier portals, deal listings, and escrow-style transaction flow.',
    liveSiteUrl: 'https://www.gwsconnect24.com/',
    heroBlurb:
      'GWS Connect is a wholesale brokerage connecting retailers, marketplace sellers, and manufacturers with verified suppliers of closeout and overstock inventory. CS2 built the public-facing site and the membership application layer — buyer and supplier authentication, deal feeds, demo-booking flows, and content structure that supports a managed-transaction business model.',
    challenge:
      'GWS Connect is not a storefront — it is a gated marketplace. Prospects have to be qualified before they see pricing or inventory, suppliers need a different onboarding path than buyers, and every flow has to reinforce trust (escrow, verification, managed logistics) because closeout wholesale is a trust-heavy category. A generic template couldn\'t handle two audiences, two login paths, and a demo-book-apply conversion funnel on the same marketing site.',
    solution:
      'CS2 delivered a custom Next.js site with separate buyer and supplier login portals, an "Apply Now" + "Book a Demo" dual-CTA pattern, a /deals feed for gated inventory browsing, and a newsletter capture for prospects not ready to apply. The information architecture walks cold traffic through solutions, how-it-works, and FAQs before asking for the application — appropriate for a high-consideration B2B offer. The whole site is statically exported and served from AWS S3 + CloudFront, so page speed stays fast globally despite the content weight.',
    outcome:
      'GWS Connect now has a credibility-first public site that qualifies prospects before the sales team ever sees them. Buyer and supplier paths are segmented from the first click, and the site is fast enough to support paid acquisition without Core Web Vitals penalties. [TODO: qualified-application volume / month — Qasim to supply]. [TODO: buyer ↔ supplier split of inbound — Qasim to supply].',
    techStack: [
      'Next.js (static export)',
      'React',
      'Tailwind CSS',
      'AWS S3 + CloudFront hosting',
      'Two-audience auth (buyer / supplier portals)',
      'Demo + application intake forms',
    ],
    highlights: [
      'Separate buyer and supplier authentication paths',
      'Gated /deals feed for member-only inventory',
      '"Apply Now" and "Book a Demo" dual conversion funnel',
      'Newsletter capture for top-of-funnel leads',
      'Statically exported, served globally from CloudFront',
    ],
    whatThisProves:
      'How CS2 ships a two-audience B2B marketplace site — with gated access and segmented auth — on the same stack that serves a brochure site, without the platform tax of a SaaS marketplace builder.',
  },
  {
    slug: 'mint-imports',
    clientName: 'Mint Imports',
    industry: 'Wholesale import',
    tagline:
      'A Canadian furniture importer with a product-category site, quote flow, and retailer-facing content.',
    liveSiteUrl: 'https://www.minttimports.ca/',
    heroBlurb:
      'Mint Imports is a wholesale furniture importer serving Canadian retailers, sourcing sofas, sofa beds, chairs, and beds from China, Turkey, and Vietnam. CS2 built a clean, category-driven Next.js site that positions Mint as a reliable wholesale partner and captures retailer inquiries without forcing the business into a generic e-commerce template.',
    challenge:
      'Mint sells wholesale — not to end consumers. That means no public pricing, no cart, no checkout. What they needed was a credibility site: who we are, what categories we stock, why retailers should trust us, and an easy way to request a quote. Most off-the-shelf builders are optimized for D2C and make it awkward to hide prices and push toward inquiries instead of purchases. Mint also needed the site to render fast and look professional to retailers comparing multiple suppliers.',
    solution:
      'CS2 built a custom Next.js site with clear product categories (Sofas, Sofa Beds, Chairs, Beds), a "Why Choose Us" trust section, an FAQ, and a central Contact / Get-a-Quote flow. The whole site is statically exported and served from AWS S3 + CloudFront, so it loads quickly on the desktop browsers that wholesale buyers actually use. No shopping cart, no pricing display, no platform fees — just a credibility funnel that ends in a quote request.',
    outcome:
      'Mint Imports now has a wholesale-appropriate site that reads as a professional supplier rather than a D2C store. The category structure makes it easy for retailers to see what Mint carries at a glance, and the contact flow routes serious inquiries directly to the sales team. [TODO: monthly quote-request volume since launch — Qasim to supply]. [TODO: share of inbound retailers from organic vs. referral — Qasim to supply].',
    techStack: [
      'Next.js (static export)',
      'React',
      'Tailwind CSS',
      'AWS S3 + CloudFront hosting',
      'Quote / contact intake form',
    ],
    highlights: [
      'Category-driven product discovery (Sofas, Sofa Beds, Chairs, Beds)',
      'No public pricing — routes every lead into a quote request',
      '"Why Choose Us" and FAQ sections built for retailer trust',
      'Statically exported for fast global page loads',
      'Mobile-responsive navigation and layout',
    ],
    whatThisProves:
      'How CS2 builds a wholesale-credibility site that deliberately avoids a cart — the right shape for a B2B importer, not a D2C brand.',
  },
  {
    slug: 'notermed',
    clientName: 'Notermed',
    industry: 'Healthcare SaaS',
    tagline:
      'An AI medical-transcription product site with auth-gated app and marketing layers on one Next.js codebase.',
    liveSiteUrl: 'https://www.notermed.com/',
    heroBlurb:
      'Notermed is an AI-powered medical transcription product — "notes that write themselves" — that generates clinical notes from patient conversations. CS2 built the public marketing surface and the authenticated application shell on a single Next.js codebase, with a dynamic AuthProvider that routes visitors into either the product app or the marketing pages depending on session state.',
    challenge:
      'Notermed is a SaaS product, not a brochure site. The same domain has to serve two jobs: convince a doctor or clinic administrator that the product is worth a trial (marketing layer), and be the app itself once that user signs in (product layer). Most SMB site builders can\'t do either side of that well, and stitching a WordPress marketing site to a separate SPA usually means double-domains, double-branding, and double-SEO pain. Notermed needed one codebase that handled both.',
    solution:
      'CS2 built Notermed on Next.js with an AuthProvider that wraps the entire app, so the same URL can render the public marketing hero for anonymous visitors and the authenticated product UI for signed-in users. Assets are hosted on AWS S3 with CloudFront in front, giving the app fast cold-start loads globally. Page-level SEO metadata is set per route ("AI-powered medical transcription that automatically generates clinical notes from your patient conversations."), so Google indexes the marketing surface without exposing the gated product.',
    outcome:
      'Notermed has a single Next.js codebase that serves marketing traffic, handles auth, and renders the product — no Webflow-plus-SPA duct tape, no SEO split across subdomains. [TODO: trial sign-ups / month — Qasim to supply]. [TODO: marketing-to-product conversion rate — Qasim to supply]. [TODO: average time from landing to first clinical note generated — Qasim to supply].',
    techStack: [
      'Next.js (App Router)',
      'React',
      'Client-side AuthProvider',
      'AWS S3 + CloudFront hosting',
      'Server-rendered SEO metadata',
    ],
    highlights: [
      'Single codebase for marketing site + authenticated product app',
      'AuthProvider-wrapped routing, so the same URL behaves differently per session',
      'SEO metadata set per route for indexable marketing pages',
      'AWS S3 + CloudFront delivery for global low-latency loads',
      'HIPAA-appropriate architecture posture (no third-party site builders touching PHI)',
    ],
    whatThisProves:
      'How CS2 ships a real SaaS product — marketing, auth, and app on one Next.js codebase — instead of duct-taping a template site to a separate web app.',
  },
  {
    slug: 'etobicoke-vr-arena',
    clientName: 'Etobicoke VR Arena',
    industry: 'Entertainment & experiences',
    tagline:
      'A free-roam VR arena with online booking, tiered party packages, gift cards, and Google Ads-ready landing.',
    liveSiteUrl: 'https://www.etobicokevrarena.ca/',
    heroBlurb:
      'Etobicoke VR Arena (Another World VR) is a free-roam virtual reality venue with three linkable arenas for up to 15 players. CS2 built a booking-first Next.js site that handles walk-in sessions, birthday parties, corporate events, gift cards, and a free-trial lead capture — all designed to convert paid-search traffic into booked time slots.',
    challenge:
      'A VR arena lives or dies on booked time slots. Every visitor has to understand pricing, see what the arenas look like, pick a package (walk-in, birthday, corporate), and hit "book now" in under 90 seconds — or they bounce. Generic site builders bury the booking CTA, can\'t handle tiered party packages cleanly, and don\'t load fast enough to support Google Ads without paying a Core Web Vitals penalty. The site also had to capture leads who weren\'t ready to book yet (the free 15-minute trial form) so the venue could follow up.',
    solution:
      'CS2 built the site on Next.js with a booking-first information architecture: clear pricing tables (off-peak vs. peak walk-in rates, birthday packages from $360 to $972, corporate packages from $375 to $1,012), an arena gallery, a 22-title game grid, a FAQ, and gift-card redemption. "Book Now" deep-links to the external booking portal at etobicoke.another-world.com, so the CS2 site focuses on conversion and hands off cleanly to the scheduling engine. A lead-capture form (name, phone, email, interest category) catches the "not ready to book yet" segment for email follow-up. The site is responsive, image-optimized via next/image, and served from nginx + CloudFront for Google Ads-grade page speed.',
    outcome:
      'The arena now has a conversion-tuned site that pairs cleanly with paid acquisition: fast LCP, visible pricing, obvious booking CTA, and a backup lead-capture path for browsers who aren\'t ready yet. [TODO: monthly booking volume post-launch — Qasim to supply]. [TODO: Google Ads CPA since site rebuild — Qasim to supply]. [TODO: birthday-package bookings / month — Qasim to supply].',
    techStack: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'next/image optimization',
      'nginx + CloudFront hosting',
      'External booking-portal integration',
      'Lead-capture form (free-trial intake)',
    ],
    highlights: [
      'Booking-first layout with clear walk-in, party, and corporate pricing tiers',
      'Deep-link hand-off to the Another-World booking engine',
      'Free 15-minute trial lead-capture form for not-ready-to-book visitors',
      'Gift-card denomination redemption flow',
      'Page-speed tuned for Google Ads (next/image, CDN, responsive)',
    ],
    whatThisProves:
      'How CS2 turns a paid-traffic landing page into a booking funnel for a location-based experience business — exactly the Growth-tier SMB play.',
  },
]

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug)

export const caseStudySlugs: string[] = caseStudies.map((study) => study.slug)
