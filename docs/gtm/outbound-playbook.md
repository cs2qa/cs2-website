# CS2 Technologies — SMB Acquisition Outbound Playbook

Author: Qasim Ali (qasim.ali@cs2technologies.ca, 905-749-5338)
Business: CS2Technologies Inc., 2424 Finch Ave W, Toronto, ON, M9M 2E2 (incorporated 2023)
Last updated: 2026-04-23
Scope: cold outbound email for the SMB acquisition service — three productized tiers for Canadian SMBs.

This document is the operating manual for running outbound email prospecting. It is not a pitch deck and it is not marketing copy. It is the day-to-day reference Qasim uses when sitting down Monday morning to build a list, send email, and move prospects through the pipeline.

---

## 0. Quick summary

- Positioning: **Custom-built at template speed — AI-accelerated, 4-week delivery, no platform tax. You own the code.**
- Three tiers:
  - **Foundation — Lead Gen** — CAD $4,500 + $650/mo — service businesses
  - **Growth — Payments & Bookings** — CAD $8,500 + $1,200/mo — VR arcades, gyms, salons, courses, subscriptions
  - **Scale — E-Commerce** — CAD $15,000 + $2,250/mo — retail, D2C, wholesale
- Lead magnet: **free 30-min Google Ads + website audit** (landing page at `https://cs2technologies.ca/services/smb-acquisition`). Prospect submits a form, Qasim produces a 4-page diagnostic PDF within 2 business days, emails it back with a call CTA.
- Cadence: 4 emails over 14 days per prospect. Target: 50 qualified prospects per week.
- Top-of-funnel math (v1 assumption, adjust after 2 weeks of real data): 50 prospects/week → 100 sent emails → 3-5 audit requests → 1-2 proposals → 1 signed client.

---

## 1. Ideal Customer Profile (ICP)

"Canadian SMB" is not an ICP. The three tiers map to three concrete shapes of business. Every prospect in the tracker should match one of these shapes, or they should not be in the tracker.

### 1.1 Foundation tier — Lead Gen

- **Size:** 3-20 employees.
- **Revenue:** CAD $500K - $5M.
- **Verticals:**
  - Dental and medical clinics (GP, dental, physio, chiro, optometry)
  - HVAC, plumbing, electrical, and roofing trades
  - Boutique law firms under 10 lawyers (family, immigration, real estate law)
  - Independent real-estate brokerages and teams
  - B2B consultants and small professional-services firms (accounting, bookkeeping, immigration consulting)
- **Buying signals:**
  - Running Google Ads on branded or generic keywords with visible tracking issues (no conversion event, "Learn more" as CTA, missing phone extension)
  - Site is templated (Wix, Squarespace, GoDaddy Website Builder, WordPress + old Divi theme)
  - No lead-capture form, or a form that errors out on submit
  - Slow mobile load time (Core Web Vitals "Poor" on PageSpeed Insights)
  - Just hired an associate / opened a second location / announced on LinkedIn
- **Why they buy:** each new customer is worth 4-5 figures. They already believe in lead gen; they just can't tell if their current site is the reason the ads aren't working.

### 1.2 Growth tier — Payments & Bookings

- **Size:** 5-30 employees.
- **Revenue:** CAD $750K - $8M.
- **Verticals:**
  - VR arcades, escape rooms, axe-throwing, climbing gyms
  - Independent gyms, yoga and pilates studios, CrossFit boxes
  - Hair salons, nail salons, med-spas under 3 locations
  - Group-class businesses: dance, art, martial arts, music
  - Online course creators and cohort programs
- **Buying signals:**
  - Booking is done over Instagram DMs, phone, or via a clunky third-party like Mindbody/Acuity without branded integration
  - No online payment flow — customers pay in person or over a Square link sent manually
  - Active social presence with customer traction but a website stuck from 2019
  - Seasonal promotions they can't easily run (gift cards, memberships, class packs)
- **Why they buy:** every unbooked slot is lost revenue, and staff time spent managing bookings is time not spent delivering the service.

### 1.3 Scale tier — E-Commerce

- **Size:** 5-50 employees.
- **Revenue:** CAD $1M - $15M.
- **Verticals:**
  - Specialty retail under 5 physical locations
  - D2C brands doing $50K-$500K/mo on Shopify
  - Wholesale / B2B distributors with a consumer-facing line
  - Canadian-made goods with a cross-border expansion plan
- **Buying signals:**
  - On Shopify for 3+ years, theme looks stock, paying for 4+ apps that each add load time
  - SKU count over 200 and a search that doesn't surface products well
  - Running Meta and Google Shopping ads with high spend but flat ROAS
  - Recently raised prices or expanded SKU count and the site didn't keep up
- **Why they buy:** every 100ms of page load costs conversion. Every app tax compounds. A custom-coded front end on Shopify's commerce backend (headless where it earns its keep) is cheaper over 3 years than Shopify Plus + apps + a Shopify agency retainer.

### 1.4 Disqualifiers — do not contact

- Already using a retained mid-market or large agency (look for agency credit in the website footer, or a named agency in the LinkedIn "About" section, or a press release about the engagement)
- Enterprise: >100 employees or >$10M revenue — the buying cycle is too long, and CS2 is not priced for their procurement
- Lifestyle businesses with no ad budget and no plan to grow (hobbyist sites, community-group pages, one-person creative studios)
- Industries restricted or banned from Google Ads: firearms, CBD/THC, gambling, adult services, payday lending, crypto trading
- U.S.-only businesses — CS2's v1 offer is Canadian (HST-invoiced, CAD-priced, CASL-compliant outbound). U.S. is a later expansion.
- Anyone who unsubscribed from a prior CS2 campaign — honour opt-outs permanently, no "let's try again in 6 months"

### 1.5 Per-vertical cheat sheet

The following mini-profiles tell Qasim, at a glance, how to think about a prospect the second their name comes up. Use these when writing observations and when framing the audit call.

**Dental clinics (Foundation):**
- Typical owner: dentist-owner, sometimes with a practice manager as the gatekeeper.
- Ad spend: $1,500 - $8,000/month on Google, mostly branded and local geo-keywords.
- Common site issues: insurance-accepted logos missing, no online booking, team photos that are stock.
- Hot season: January (insurance resets), September (back-to-school checkups).
- Decision timeline: 2-4 weeks from first reply to signed proposal. Faster than average.

**Trades — HVAC / plumbing / electrical (Foundation):**
- Typical owner: operator-owner, often answering their own phone. Inbox checked once a day.
- Ad spend: $2,000 - $15,000/month, heavy on "emergency" keywords, huge seasonal spikes.
- Common site issues: no click-to-call button on mobile, slow hero video, service area unclear.
- Hot season: furnace — October/November; AC — June/July; plumbing — year-round.
- Decision timeline: 1-3 weeks once they see the audit. Trades owners decide fast or not at all.

**Law firms — boutique (Foundation):**
- Typical owner: managing partner, often delegates marketing to an associate or an outside consultant.
- Ad spend: $3,000 - $20,000/month for family/immigration; much lower for estates/wills.
- Common site issues: long bio-heavy pages with no conversion path, PDFs instead of pages, outdated LSO compliance text.
- Hot season: immigration — post-federal-policy-change spikes; family — January, September.
- Decision timeline: 4-8 weeks. Slower — multiple partners, compliance reviews.

**Independent gyms / fitness studios (Growth):**
- Typical owner: owner-operator, also coaches classes, on the floor most of the day.
- Ad spend: $500 - $4,000/month, mostly Meta not Google.
- Common site issues: class schedule is a Google Sheet embed, bookings go through Mindbody on a separate domain, no gift-card flow.
- Hot season: January (resolutions), September (back-to-routine).
- Decision timeline: 2-4 weeks. Price-sensitive — lead with ROI on booking conversion, not aesthetics.

**VR arcades / experience businesses (Growth):**
- Typical owner: owner-operator, evenings and weekends are peak hours, so email replies come Monday morning.
- Ad spend: $1,000 - $5,000/month on Meta primarily.
- Common site issues: booking widget is a third-party iframe, pricing hidden behind a "contact us", no party-package page.
- Hot season: October-December for parties, March break, summer camps.
- Decision timeline: 2-5 weeks.

**Specialty retail on Shopify (Scale):**
- Typical owner: founder, 2-3 employees plus contractors, ecom-native.
- Ad spend: $5,000 - $50,000/month across Google Shopping + Meta + TikTok.
- Common site issues: theme-based front end is fine but slow, 12+ apps, checkout extensions conflict, product discovery is poor.
- Hot season: Q4 (BFCM through December). Do not try to sell a rebuild between October 1 and January 15 — they will ghost.
- Decision timeline: 4-8 weeks. More sophisticated buyer, will ask about stack specifics.

### 1.6 Priority verticals for v1 outbound

Pick three and stay on them for the first 8 weeks. Spraying across all 15 verticals above means Qasim has to re-learn the pitch every email. Three lets the subject lines, case-study pairings, and objections become muscle memory.

1. **Dental and medical clinics in the GTA (Foundation tier).** High customer LTV, ad spend is already a line item, Notermed is the case study that lands.
2. **Independent trades — HVAC, plumbing, electrical — in the GTA (Foundation tier).** Urgency-driven buyers, mobile traffic is 70%+ of their visits, mobile-first custom builds are a genuine differentiator, and the referral network between trades is dense.
3. **Specialty retail on Shopify with weak theme execution (Scale tier).** The Mint Imports case study applies directly, and the value case (load time, conversion rate, app reduction) is quantifiable even without citing a specific CS2 performance figure.

Rationale: mid-to-high margin per customer on CS2's side, real ad spend or commerce revenue already flowing on their side, a crisp before/after story, and referral-rich networks so one won client pulls two more.

---

## 2. Prospecting — building a list of 50 per week

### 2.1 Sources

- **Google Ad Transparency Center** — `adstransparency.google.com`. Filter by region = Canada. Search industry keywords ("dental Toronto", "HVAC Mississauga", "boutique fitness GTA"). Advertisers appearing here are, by definition, spending money on Google Ads — the #1 qualifier.
- **Meta Ad Library** — `facebook.com/ads/library`. Same logic. Filter country = Canada, category = All Ads. Pull active advertisers. Bonus: you can see creative quality, which tells you how seriously they take marketing.
- **Google Business Profile / Google Maps** — manual. Top-rated (4.5+, 50+ reviews) local businesses in target verticals. Note the website. If the website is stock Wix / Squarespace / 2017 WordPress, they're a candidate.
- **LinkedIn Sales Navigator** — if the seat is active, filter: industry = target vertical; geography = Toronto/GTA/Ontario; company size = 1-50; seniority = Owner, Founder, CEO, Managing Partner. Export up to 25 per saved search per day.
- **Local business directories** — Toronto BIAs (Etobicoke, Mississauga, North York, Scarborough, Vaughan), GTA Chambers of Commerce, BBB listings for Ontario, Canadian Franchise Association for multi-location operators.
- **Industry-specific directories** — ODA (Ontario Dental Association), LSUC lawyer directory, HRAI for HVAC, ESA for electrical contractors.
- **Referrals from existing clients** — email each of the 5 portfolio clients (The Majestik Group, GWS Connect, Mint Imports, Notermed, Etobicoke VR Arena) with a specific ask: "Who are three business owners you know who are running Google Ads and could use a better site?" Specific number, specific criteria, specific industries. Broadcasts get broadcast answers; specifics get names.

### 2.2 Per-prospect qualification checklist

Before a name gets added to the tracker, all of these need to be true:

- [ ] Canadian business (HQ or primary operations in Canada)
- [ ] Currently spending on Google Ads OR Meta ads (verified via Ad Transparency Center / Ad Library within the last 30 days)
- [ ] Employee count between 3 and 30 (LinkedIn company page, or About page)
- [ ] Website looks templated, broken, or visibly out of date
- [ ] Matches one of the three v1 priority verticals
- [ ] Not using a retained mid-market agency (footer, About page, LinkedIn press)
- [ ] Owner or senior decision-maker is findable by name + email (LinkedIn + website + guess + verify)

### 2.3 Email discovery

Deliverability matters more than volume. A bad email list tanks the sending domain. Before sending:

- Find the email pattern. Most Canadian SMBs use `firstname@company.com` or `firstname.lastname@company.com`. Check a general contact (`info@`, `hello@`) — the reply-to often exposes the pattern.
- Verify every address with a single-email verifier (NeverBounce, ZeroBounce, or free alternatives) before the first send. Bounce rate above 3% will wreck the domain's reputation inside a week.
- Keep the sending volume from a single domain under ~40 cold emails per day per mailbox for the first month. Warm the mailbox with a warm-up tool (Instantly, Smartlead, lemwarm) for 2-3 weeks before ramping.
- Use a secondary domain for cold outbound (e.g., `try-cs2.ca` or `cs2tech.ca`) that forwards replies to the main inbox. Never burn the primary `cs2technologies.ca` domain on cold traffic.

### 2.4 Target conversion math (v1)

Use these as planning assumptions, not promises. Recompute from real data after 2 weeks.

- 50 qualified prospects added per week
- Each prospect gets up to 4 emails over 14 days = 100-200 email sends per week once the pipeline fills
- 3-5 audit form submissions per week (roughly 2-3% reply-to-audit rate on volume)
- 1-2 proposal-stage conversations per week
- 1 signed client every 2-4 weeks in the first 8 weeks, tightening as the pitch sharpens

---

## 3. The email sequence — 4-touch cadence over 14 days

### 3.1 Variables

Mail-merge variables available per prospect (fill these into the tracker per row so merge is a one-click job):

- `{first_name}` — the owner or decision-maker's first name
- `{company_name}` — the business name as they refer to themselves on their site
- `{their_website}` — URL, no trailing slash
- `{one_specific_observation}` — one concrete thing Qasim noticed about their Google Ads or their site, written in a single sentence, specific enough that only that business would recognize it. This is the single most important field in the merge. If the observation is generic ("your site looks dated"), pull the name from the list. No observation = no email.

### 3.2 Signature block (used on every email)

```
Qasim Ali
CS2 Technologies — Toronto, Canada
qasim.ali@cs2technologies.ca · 905-749-5338
https://cs2technologies.ca

CS2Technologies Inc., 2424 Finch Ave W, Toronto, ON M9M 2E2
Unsubscribe: reply with "unsubscribe" and I'll remove you from all future emails.
```

The physical address and the unsubscribe line are not optional — they are CASL requirements (see section 7).

### 3.3 Email 1 — Day 0 — "Specific observation"

**Subject:** Quick note on {company_name}'s Google Ads

**Body:**

Hi {first_name},

I was looking at {company_name}'s site and ads this morning and noticed {one_specific_observation}. Nothing urgent — it just stood out.

I run a small Toronto web studio called CS2 Technologies. We build custom sites for Canadian service businesses in about four weeks, and before we start any project we put together a short 4-page audit of the current site and Google Ads setup so owners can see exactly what's working and what isn't.

I'm offering that same audit, free, to a handful of Canadian businesses this month. No pitch, no commitment — you keep the PDF either way.

Would a copy be useful? Just reply with "yes" and I'll send it by end of week.

[signature block]

---

### 3.4 Email 2 — Day 3 — "Quick follow-up"

**Subject:** Re: Quick note on {company_name}'s Google Ads

**Body:**

Hi {first_name},

Following up in case my note got buried — totally understand if now isn't the time.

The offer still stands: a free 4-page audit of {company_name}'s site and Google Ads, no strings. If it's not a fit I'll go away — but a free audit costs you nothing.

If it's easier, grab a 30-minute slot directly: https://calendly.com/qasim-ali-cs2technologies

[signature block]

---

### 3.5 Email 3 — Day 7 — "One proof point"

**Subject:** How we built {case_study_reference}

**Body:**

Hi {first_name},

One more and then I'll stop.

We recently finished a project for {case_study_match} — a Canadian business in a similar space to {company_name}. Custom-coded, launched in four weeks, and they now own the code outright rather than paying a platform fee every month. You can see the live site here: {case_study_url}.

The work we'd propose for {company_name} would follow the same shape: 4-page audit first, then a fixed-scope build if (and only if) the audit surfaces enough that's worth fixing.

If that kind of work would be useful for {company_name}, happy to run the audit we mentioned. Reply "yes" and the PDF lands in your inbox by end of week — or skip the back-and-forth and book a 30-minute call here: https://calendly.com/qasim-ali-cs2technologies

[signature block]

---

**Case-study pairing guide (fill `{case_study_match}` and `{case_study_url}` per prospect):**

| Prospect vertical | Case study | URL |
|---|---|---|
| Dental / medical clinic | Notermed | `https://cs2technologies.ca/case-studies/notermed/` |
| Trades (HVAC, plumbing, electrical) | GWS Connect | `https://cs2technologies.ca/case-studies/gws-connect/` |
| Law firm / consultancy / B2B services | The Majestik Group | `https://cs2technologies.ca/case-studies/majestik-group/` |
| Experience-based (VR, arcade, studio, gym) | Etobicoke VR Arena | `https://cs2technologies.ca/case-studies/etobicoke-vr-arena/` |
| Retail / wholesale / e-commerce | Mint Imports | `https://cs2technologies.ca/case-studies/mint-imports/` |

If the vertical doesn't map cleanly, default to The Majestik Group — the service-business narrative is the most transferable.

### 3.6 Email 4 — Day 14 — "Break-up"

**Subject:** Closing the loop on {company_name}

**Body:**

Hi {first_name},

I'll stop here so I'm not cluttering your inbox. If the audit would ever be useful — next month, next quarter, whenever — the door stays open: `https://cs2technologies.ca/services/smb-acquisition`. Or grab a 30-minute slot any time: `https://calendly.com/qasim-ali-cs2technologies`.

All the best with {company_name}.

[signature block]

---

### 3.7 Reply-path decision tree

Every reply gets a human response from Qasim inside one business day. No automation on replies.

- **"Yes, send the audit" / any affirmative.**
  - Add prospect to the audit queue in the tracker (`audit_requested = Y`, `audit_delivered_date = target date`).
  - Pull their Google Ads account (ask for read-only access via `ads.google.com/home/tools/manager-accounts/`) and their site URL.
  - Run `scripts/proposals/generate_audit.py` to produce the 4-page diagnostic PDF.
  - Turnaround: 2 business days max. Email it back with a single CTA: "Want to walk through this on a 30-min call? Here's my calendar: {calendar_link}."
  - If they book the call, move to the proposal stage. If they read but don't book, follow up once after 3 business days with "Any questions on the PDF?" and nothing more.

- **"Not interested" / "please remove me" / "unsubscribe".**
  - Immediately mark the row disqualified with `disqualified_reason = opt-out`, and add the email to a permanent suppression list. Do not re-contact from any CS2 domain, ever.
  - Reply with one line: "No problem — you're off the list. Good luck with {company_name}."

- **A specific question ("what do you charge?", "how long does it take?", "what stack do you use?").**
  - Answer the question in 2-3 sentences, honestly and directly, and loop back to the audit offer.
  - Do not send a 16-page proposal to someone who asked one question. The proposal comes after the audit call.

- **"Send me more info first."**
  - This is usually a stall. Respond: "The audit IS the info — it's a 4-page PDF specific to {company_name}. Want me to send it?" If they say no again, respect it and move them to the Day-7 track.

- **"What does it cost?"**
  - Be direct — never dodge price on first ask. Response: "Three tiers depending on what the site needs to do: Foundation (lead gen sites) is $4,500 + $650/mo; Growth (bookings and payments) is $8,500 + $1,200/mo; Scale (e-commerce) is $15,000 + $2,250/mo, all CAD plus HST. The audit is free either way and tells us which tier actually fits."

- **Out-of-office autoresponder.**
  - Don't treat it as a bounce or as a reply. Pause the cadence for that prospect until the OOO end date + 2 business days.

- **Hard bounce.**
  - Mark disqualified with `disqualified_reason = bad email`. Do not retry. Do not guess another pattern after one bounce — deliverability risk is higher than the pickup rate.

---

## 4. Objection handling

Six objections cover ~90% of what Qasim will hear. Short, conversational, honest. If Qasim doesn't believe the response, the prospect won't either — rewrite it.

### 4.1 "We already have a web guy / agency."

- **What they actually mean:** they don't want to fire someone, or they don't want to re-explain their business, or they're embarrassed to admit the agency isn't working.
- **Response:** "Totally fair — I'm not suggesting you switch. The audit is useful either way: if your current team is doing the right things, you'll have proof. If there are gaps, you'll have a specific list to hand them. Either way you keep the PDF."

### 4.2 "We built our site on Shopify/Wix — it's fine."

- **What they actually mean:** they built it themselves, they're proud of it, and they don't want to be told it's bad.
- **Response:** "Shopify and Wix are fine starting points. The audit looks at conversion specifics — form flow, mobile speed, ad tracking — not platform choice. Plenty of the businesses we audit stay on Shopify; we just fix the parts that are leaking."

### 4.3 "It's too expensive / not in the budget."

- **What they actually mean:** either they genuinely can't afford it, or they haven't seen enough value to justify the number yet.
- **Response:** "Understood. The audit is free — it'll tell you whether a rebuild is even worth doing right now. If the payback isn't there, I'll say so on the call. No point pitching a build that doesn't pay for itself."

### 4.4 "We're not doing ads right now."

- **What they actually mean:** they paused ads, or never ran them, or are in a quiet season.
- **Response:** "The audit covers the site as much as the ads — most of what we find lives on the site itself (forms, mobile speed, page structure). Fixing that is what makes ads work when you turn them back on."

### 4.5 "Send me more info first."

- **What they actually mean:** they want to get off the call/email politely without saying no.
- **Response:** "The audit IS the info — 4 pages, specific to {company_name}, free. That's the most concrete thing I can send. If after reading it you'd rather not talk, I'll leave it there."

### 4.6 "Can you do it for $X?" (lowball)

- **What they actually mean:** they're testing whether the price is real, or they're comparing to a $500 Fiverr template.
- **Response:** "The tiers are fixed — Foundation starts at $4,500 and that includes the full 4-week build, hosting, and the code on your own repo. If the scope is genuinely smaller I'll flag it on the audit call, but I won't quote $X for the full tier. You'd end up with a template, and you can get those elsewhere for less than I can build them."

---

## 5. Tracking — the CSV

A companion CSV lives at `docs/gtm/prospect-tracking-template.csv` with the exact column headers below. Import to Google Sheets or Airtable; move to a real CRM (HubSpot Free, Zoho, Pipedrive) once row count crosses ~200.

**Columns:**

```
prospect_company,prospect_name,role,email,phone,website,industry,city,tier_target,source,qualification_date,disqualified_reason,email_1_sent,email_1_opened,email_1_replied,email_2_sent,email_2_opened,email_2_replied,email_3_sent,email_3_opened,email_3_replied,email_4_sent,email_4_opened,email_4_replied,audit_requested,audit_delivered_date,call_booked_date,proposal_sent_date,deal_won_lost,notes
```

**Rules of the road:**

- Fill `tier_target` with one of: `Foundation`, `Growth`, `Scale`.
- `source` is the specific channel where the prospect was found: `google_ad_transparency`, `meta_ad_library`, `linkedin_sales_nav`, `gbp_manual`, `chamber_directory`, `referral_<client>`.
- `qualification_date` is the date the prospect cleared the section 2.2 checklist (not the date you first noticed them).
- Booleans: leave blank for "not yet", `Y` for yes, `N` for "sent, 14 days elapsed, no reply".
- Dates in ISO format (YYYY-MM-DD).
- `deal_won_lost` values: `WON`, `LOST`, `OPEN`.
- `notes` is free-text — keep it short, one line, factual. Example: "wants audit before end of month, partner handles marketing".

**Weekly hygiene:** every Friday, Qasim does a 15-minute sweep: anyone in the tracker 14+ days after Email 1 with no reply gets `N` in the relevant reply columns and moves to an archive tab. Open rates and reply rates get totaled for the week — that's the only metric worth watching in v1.

---

## 6. CASL compliance (mandatory)

Canada's Anti-Spam Legislation applies to every cold email sent from or to a Canadian commercial address. Non-compliance carries real fines. Read this section as a rule, not a suggestion.

CASL requires three things in every Commercial Electronic Message (CEM):

1. **Clear sender identification.** The email must say, plainly, who is sending it and on whose behalf. Every email in the cadence uses Qasim's real name, CS2 Technologies as the company, and the physical Toronto address in the signature.
2. **Physical mailing address.** 2424 Finch Ave W, Toronto, ON, M9M 2E2 — on every email, in the signature. Not optional.
3. **Unsubscribe mechanism.** A way to opt out that works for at least 60 days after the email is sent, processed within 10 business days. The cadence uses "reply with unsubscribe and I'll remove you from all future emails." A reply-based opt-out is valid under CASL provided replies are monitored and acted on promptly; Qasim should also maintain a suppression list.

**Implied consent for B2B cold email in Canada:**

CASL allows sending to a business email address where the content is relevant to the recipient's role and the address is publicly available (published on their website, in a directory, etc.) — this is the "conspicuous publication" exception under CASL s. 10(9)(b). In practice, this means:

- Only email published business addresses. Do not harvest personal Gmail / Hotmail / Yahoo addresses.
- Keep the message relevant to the recipient's business role (emailing an owner about their business website qualifies).
- Honour opt-outs immediately and permanently.
- Keep records of when/where each prospect's email was found (use the `source` column).

**Suppression list:** maintain a simple append-only text file at `docs/gtm/suppression.txt` — one email per line — of every opt-out and every hard bounce. Run every outbound batch through it before sending. Never remove a row from this file.

If ever uncertain about a specific prospect, do not send. The regulator's penalties are individual-liability, and one-off opt-outs are cheap compared to a complaint.

---

## 7. Writing the `{one_specific_observation}` — templates and examples

The personalization variable is the single highest-leverage part of the whole cadence. A generic observation reads like a mail-merge; a specific one reads like a human. This section is a reference for what "specific enough" looks like.

**Rules for a good observation:**

- It must cite something visible on the prospect's actual site or ad. Not "your industry" — their site.
- It must be factual. Not "your site looks dated" (opinion) — "your homepage hero image is a stock photo of a dentist, not your clinic" (fact).
- It must be short — one sentence that fits in an email without breaking the flow.
- It must not be insulting. "Your site is ugly" is both insulting and unfalsifiable. "Your contact form returns a 500 error on submit" is neither.
- If two prospects could read the same observation and both nod, it is not specific enough.

**Templates by tier, with worked examples:**

Foundation tier (lead gen / service businesses):

- "Your Google Ad for {keyword} is running with sitelinks pointed at a page that 404s on mobile." — worked example: "Your Google Ad for 'Mississauga dentist' is running with sitelinks pointed at /about/team which 404s on mobile Safari."
- "The phone number in your Google Ad header doesn't match the number in your site footer." — worked example: "The phone number in your Google Ad header (905-...) doesn't match the one in your site footer (416-...)."
- "Your contact form posts to a Formspree endpoint that's returning a 422 — I tried submitting a test entry and it never reached you." — only use if you actually tested and it failed. Never fabricate.
- "Your mobile PageSpeed Insights score is 31 and the Largest Contentful Paint is sitting at 6.2 seconds." — cite the actual number you pulled from pagespeed.web.dev.

Growth tier (bookings / payments):

- "Your booking flow on {site} takes 7 clicks and requires an account before showing class times."
- "Class times on your schedule page are stored as an image, not text — Google can't index them and neither can screen readers."
- "Your gift-card purchase page redirects to a Square-hosted checkout with a different domain — the trust handoff is visible and hurts conversion."

Scale tier (e-commerce):

- "Your Shopify store is running {n} apps that each inject blocking JavaScript — first paint sits at 4.8s on mobile 4G."
- "Your product-detail pages don't have a structured-data price block, so your Google Shopping ads are being penalized."
- "Your cart drawer resets if a user changes their variant selection — I reproduced it twice in Chrome and once in Safari."

**How to source the observation in 5 minutes per prospect:**

1. Load the site on desktop and mobile. Look at the fold. Screenshot the fold. Is it their business, or is it a stock image?
2. Find the primary conversion action (call, form, book, buy). Click it. Does it work? How many clicks does it take?
3. Run the homepage through `pagespeed.web.dev`. Write down the mobile score and the LCP.
4. Search the business in Google Ad Transparency Center. Open one active ad. Read the headline and the URL. Does the landing page match the ad?
5. Pick the single sharpest thing from steps 1-4 and write it as one sentence.

If none of the above yielded anything specific enough, the prospect doesn't get an email. That is the bar.

---

## 8. Sending infrastructure

Deliverability is 80% of cold email. A well-written cadence on a burned domain is worse than a mediocre cadence on a warm one. Set this up before the first send.

- **Primary domain:** `cs2technologies.ca` — used for client work, invoicing, the landing page, and replies. Never send cold outbound from this domain.
- **Secondary domain(s) for cold outbound:** buy two lookalike domains (e.g., `cs2tech.ca`, `trycs2.ca`). Set up catch-all forwarding to `qasim.ali@cs2technologies.ca` so replies land in the main inbox. Rotate sending between the two mailboxes to spread load.
- **DNS records per sending domain:**
  - SPF record authorizing the sending provider
  - DKIM keys from the sending provider
  - DMARC record set to `p=none` initially, moving to `p=quarantine` after 30 days of clean sending
  - BIMI optional, not worth the trouble in v1
- **Mailbox warm-up:** run a warm-up tool (Instantly, Smartlead, Mailreach) on each mailbox for 14-21 days before real sending. Ramp volume slowly: day 1-7 send 10/day, day 8-14 send 20/day, day 15+ send up to 40/day per mailbox.
- **Per-mailbox daily cap:** 40 cold emails per mailbox per day, hard cap. Going higher triggers Gmail's spam filter faster than anything else.
- **Subject-line hygiene:** no ALL CAPS, no exclamation marks, no dollar signs in the subject, no "free" or "guaranteed". The templates in section 3 follow these rules — don't stray.
- **Link hygiene:** one link per email maximum. No URL shorteners (bit.ly, etc.) — spam filters flag them. Use the raw `https://cs2technologies.ca/...` URL.
- **Image hygiene:** no images in cold emails. Text only. The signature is plain text, not an HTML logo.

---

## 9. Audit delivery workflow (what happens after "yes")

When a prospect replies "yes" to the audit offer, this is what happens next. The goal is to get the PDF in their hands in 2 business days so the momentum from their reply doesn't evaporate.

- **Day 0 (reply received):** Qasim replies within 1 business day with: "Great — two things I need to pull the audit: (1) read-only access to your Google Ads account (I'll send a link request from our manager account — it takes 2 clicks to approve), (2) the URL you want audited if it's different from {their_website}. I'll have the 4-page PDF back to you within 2 business days."
- **Day 0-1:** Prospect approves Google Ads access. Qasim logs in, pulls the last 90 days of data: spend, top keywords, conversion setup, landing-page URLs, click-through rate, quality scores.
- **Day 1:** Qasim runs the site through the audit checklist: PageSpeed (mobile + desktop), Lighthouse accessibility score, conversion path click-count, form submission test, mobile viewport rendering, meta tags, schema markup, analytics install.
- **Day 1-2:** Qasim runs `scripts/proposals/generate_audit.py` with the collected data to produce the 4-page diagnostic PDF. The PDF has a fixed structure:
  - Page 1: snapshot — what the site is, what it's trying to do, top 3 issues
  - Page 2: Google Ads findings — spend vs. tracked conversions, wasted keywords, landing-page mismatches
  - Page 3: website findings — speed, mobile, conversion path, technical debt
  - Page 4: what would change with a CS2 build — tier recommendation, estimated timeline, fixed price
- **Day 2:** Qasim emails the PDF back with this body:

```
Hi {first_name},

Attached — the 4-page audit for {company_name}.

The short version: {one-line summary of the top finding}. The longer version is in the PDF.

If you want to walk through it on a 30-minute call, here's my calendar: {calendar_link}. No pressure — if the PDF is enough on its own, it's yours to keep.

Qasim
```

- **Day 5 (if no booking):** one follow-up only. "Any questions on the PDF?" — nothing more. If no reply, mark the prospect as an open audit-delivered row and check back at the 30-day mark.

---

## 10. From audit call to signed proposal

The audit call is 30 minutes, on Google Meet, booked via Qasim's calendar link. Structure:

- **Minutes 0-5:** introductions. What does the business do, who's the customer, what does a good month look like?
- **Minutes 5-20:** walk through the audit PDF page by page. Focus on the findings, not the fix. Let the prospect react. Take notes on which findings they care about — those become the anchors of the proposal.
- **Minutes 20-25:** tier recommendation. State it plainly: "Based on what we just walked through, Foundation tier is the right fit — $4,500 to build, $650/month for hosting and support, 4 weeks from kickoff." Do not soften the number. Do not hedge.
- **Minutes 25-30:** next steps. Two options: (1) send a fixed-scope proposal by end of this week, (2) they sleep on it and come back if interested. Never push for a same-call yes. Rushed signatures produce cancelled projects.

**Proposal generation:** for prospects who ask for a proposal, run `scripts/proposals/generate_proposal.py` with the tier and the notes from the call. The generator produces a 16-page fixed-scope proposal PDF. Deliver within 2 business days of the call.

**Proposal follow-up cadence:** Day 0 (send), Day 3 (one follow-up: "any questions?"), Day 7 (one follow-up: "still a fit?"), Day 14 (close the loop, same tone as Email 4). Never chase harder than this. A prospect who needed 4 follow-ups to sign a proposal will need 4 follow-ups to pay every invoice.

---

## 11. Pricing, HST, and invoicing notes for the first conversation

Canadian SMB owners expect price clarity, HST-inclusive conversation, and Canadian banking. Don't improvise any of these on a call — know the answers cold.

- **All prices quoted are CAD, excluding HST.** The proposal and invoices add 13% HST (Ontario rate — CS2 is registered with CRA). Total to the client is tier price + 13%.
- **Payment terms:** 50% on kickoff, 50% on launch. Net 15 on the kickoff invoice (which is the same day they sign). Monthly hosting and support retainer invoiced on the 1st, net 15.
- **Payment methods:** Interac e-Transfer (preferred, no fee), direct bank deposit, or Stripe card payment (3% surcharge passed through on Stripe).
- **Out of scope — itemized:** logo design, content writing beyond 8 pages, paid advertising spend, long-term SEO retainers beyond the hosting plan, custom integrations beyond 2 third-party APIs. Anything in this list is either excluded or quoted separately. Do not agree to add-ons on a call without writing them down.
- **Refunds and cancellations:** non-refundable after kickoff, because work starts immediately. Monthly retainer is cancellable with 30 days' notice. Say this on every proposal call.

---

## 12. What not to do (anti-patterns)

A list of mistakes that will burn a week of pipeline or a domain reputation. Worth rereading every Monday.

- Do not send Email 1 without a real observation. A merge field with a generic line is worse than no email — the prospect remembers the brand negatively.
- Do not send more than one case study per email. Emails 1, 2, and 4 should cite zero case studies. Only Email 3 does.
- Do not attach the audit PDF to Email 1. The audit is the reward for replying, not the opener. If the PDF is in the first email, nothing comes next.
- Do not promise timelines in a cold email. "4-week delivery" is a capability claim that goes on the landing page, not a commitment made in email 1.
- Do not quote a discount on a reply. If a prospect lowballs, hold the tier price. Discounting to close v1 deals trains every subsequent client to negotiate.
- Do not re-engage an opt-out "after a while." CASL treats a re-contact as a violation regardless of how long ago the opt-out was.
- Do not mix outbound volume with transactional email on the same domain. Client invoice replies and cold emails share a reputation — one bad week of cold outbound can bury an invoice in a client's spam folder.
- Do not A/B test subject lines in v1. Sample sizes are too small for the results to mean anything. Pick the subject lines in this doc and run them for 4 weeks before changing anything.
- Do not skip the verification step on emails. One 10% bounce day puts the sending domain in the penalty box for 2 weeks.
- Do not write "just following up" or "circling back" in any follow-up. Email 2's template opens differently for a reason.

---

## 13. Weekly operating rhythm

This is how the week runs once the playbook is in steady state. One person (Qasim) can run the whole thing in roughly 8-10 hours per week.

- **Monday morning (3 hours):** build 50 new prospects. Run them through the section 2.2 qualification checklist. Write one specific observation per prospect in the tracker. Verify emails. Fire Email 1 to all 50.
- **Tuesday through Friday (1 hour/day):** reply to any incoming responses within one business day. Book calls. Deliver any audit PDFs that are due. Run audit calls that were booked last week.
- **Thursday (30 minutes):** send Email 2 (Day-3 follow-up) to the Monday cohort from earlier in the week.
- **The following Monday (30 minutes, on top of the new 50):** send Email 3 (Day-7 proof point) to the prior week's cohort. Use the case-study pairing in section 3.5.
- **Every second Monday (30 minutes):** send Email 4 (Day-14 break-up) to the cohort from two weeks prior. Archive all non-responders to a second tab and zero out the open pipeline row.
- **Friday afternoon (30 minutes):** weekly tracker hygiene — roll up totals (prospects added, emails sent, replies, audits delivered, calls booked, proposals sent). Note the one thing that worked best this week and the one thing that was wasted effort. This two-line note is the whole retrospective.

**First 4 weeks (ramp):** don't try to hit 50 prospects/week in week 1. Ramp: week 1 = 15 prospects, week 2 = 30, week 3 = 40, week 4 = 50. The mailbox warm-up and the learning curve on writing observations both need the slower start.

**What to change after 2 weeks:** recompute the conversion math from section 1.5 against what actually happened. If reply rate is below 2%, the observations are too generic — rewrite, don't send more volume. If reply rate is fine but audit-request rate is low, the CTA in Email 1 needs rewording. If audits are being delivered but calls aren't booking, the audit PDF itself needs sharper findings.

**When to add a fourth vertical:** after one of the v1 three has produced a signed client and a case study. Not before. Width beats depth in a B2B funnel only after depth has been proven.

---

## 14. Daily 20-minute check

Outside of the Monday list-build and the Thursday follow-up batch, the rest of the week runs on a short daily pass. Same time every day — morning coffee window is ideal. The goal is zero outstanding replies by end-of-day and zero audit PDFs late.

- **Inbox first (5 min):** scan every reply. Classify: affirmative, question, objection, opt-out, OOO, bounce. Update the tracker row. Draft the reply (don't send yet).
- **Calendar next (2 min):** any audit calls today? Any proposal follow-ups due? Review the row before each meeting so nothing is cold.
- **Audit queue (5-10 min):** check who is in the audit queue with a due date of today or tomorrow. Block time to finish any PDFs due within 24 hours. Never miss the 2-business-day SLA — the reply window collapses the moment the prospect feels deprioritized.
- **Send replies (3 min):** send the drafted replies. Short, human, no templates. Each reply is 2-5 sentences.
- **One quick win (variable):** one thing per day that compounds — a LinkedIn post from a won client, a refresh of one observation template, a 5-minute call to a happy client asking for a referral name. Whichever is easiest that day.

If any step runs over, the follow-up batch on Thursday can slip. The daily sequence is the priority — replies outrank new prospects every single day.

---

## 15. Metrics that matter (and ones that don't)

Too many dashboards kill execution. These five are the only ones to track in v1.

- **Weekly prospects added.** Target: 50. Count rows added to the tracker with `qualification_date` this week.
- **Email 1 reply rate.** Target: 3-5% net of opt-outs. Below 2% means the observations are generic — rewrite, don't send more.
- **Audit requests per week.** Target: 3-5. This is the only top-of-funnel metric that really matters.
- **Audit-to-call conversion.** Target: 50%+ of audits delivered should book a call. Below that, the audit PDF is not compelling enough.
- **Call-to-proposal close rate.** Target: 50%+. Below that, the tier recommendation on the call is soft or the price is being hedged.

**Metrics to ignore in v1:** open rates (pixel-tracking is noisy and Apple Mail Privacy Protection inflates it), individual subject-line A/B tests (sample too small), bounce rate on replies (this is just normal inbox noise). Track only what drives a decision.

**One-number weekly summary:** Qasim should be able to finish every Friday with one sentence: "This week: {N} prospects, {M} replies, {X} audits delivered, {Y} calls booked, {Z} proposals out, {W} signed." If any number surprises, dig into one level of detail — not more.

---

## 16. Quick links reference

- Landing page (audit form): `https://cs2technologies.ca/services/smb-acquisition`
- Case studies index: `https://cs2technologies.ca/case-studies`
- Audit PDF generator: `scripts/proposals/generate_audit.py`
- Proposal PDF generator: `scripts/proposals/generate_proposal.py`
- Prospect tracker CSV template: `docs/gtm/prospect-tracking-template.csv`
- Suppression list (create on first use): `docs/gtm/suppression.txt`
- Qasim: qasim.ali@cs2technologies.ca · 905-749-5338
- Business: CS2Technologies Inc., 2424 Finch Ave W, Toronto, ON, M9M 2E2
