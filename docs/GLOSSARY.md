# Glossary

Terms used in the [requirements tracker](PRODUCT_DEFINITION.md), the [architecture](ARCHITECTURE.md) and the product itself. No banking background is assumed.

Last checked 4 November 2026 against the [Stonewake docs](https://docs.stonewake.ai/) and the [OpenAPI spec](https://api.stonewake.ai/openapi.json). The product changes often, so trust those sources if a definition here looks out of date. Tracker column values, such as Priority and Status, are defined in [How to use the tracker](PRODUCT_DEFINITION.md#how-to-use-the-tracker).

## Terms with more than one meaning

Check these first. A test can target the wrong behaviour if it uses the wrong meaning.

| Term | Meanings |
| --- | --- |
| Assessment | On the Portfolio, a company's scored credit result. In a screening, the result for one category, with a machine-drafted rationale. |
| Band | A score band is the label on a deal score, such as Strong fit. A signal band is the level one credit signal reads, set by its `amber_at` and `red_at` thresholds. |
| Check | A research check runs on the Monitoring page's schedule. A check in an EDD dossier is one cited step of the dossier. |
| Draft | A draft rubric is an edit that is not live yet. A draft verdict is a screening result no analyst has confirmed yet. |
| Entity and node | An entity is a row in the institution registry. A node is a company or person in the ownership graph. Their ids are separate, so `/v1/entities/4` and `/v1/nodes/4` are unrelated. In the dashboard, `/entities/4` opens an institution and `/entities/n106084` opens a company page. |
| Mandate | In the product, the market and sector scope a team has written down. In a deal's financing, a borrower's appointment of a bank to arrange the loan, which is the sense behind the `mandated` deal stage. |
| Model | In the tracker, an AI model, as in "no model call". In the code, a TypeScript type in `api/models` or `core/models`. |
| Monitoring | Portfolio is credit monitoring of the book. The Monitoring page is the research schedule. Stonewake Monitoring is the public news briefs. |
| Preview | Preview effect shows what a draft rubric would change. An API preview checks a book import or tender upload with `dry_run` true and writes nothing. |
| Review | A credit review is the record kept for an exposure on the Portfolio. A screening review is an analyst confirming or dismissing a verdict. |
| Rubric | The deal rubric is on the Scoring page and drives the deal score. The credit configuration at `/v1/risk-config` drives the credit status. |
| Score | A higher deal score means a better fit. A higher country risk score or credit score means more risk. |
| Stage and financing window | The financing window is the short phrase that ranks a deal, such as Early stage. The stage is the detailed state a source confirmed, such as `tender`. |
| Status | A different value set applies to each of these: [exposure](#portfolio-and-credit-reviews), [deal](#deal-book-and-scoring), [tender match](#tenders), [research check](#monitoring-and-alerts) and screening run (`queued`, `running`, `complete`, `failed`). |

## Banking basics

| Term | Definition |
| --- | --- |
| Adverse media | Negative news about a company, person or country, such as reports of bribery or litigation. |
| Commercial real estate | Lending against property used for business, such as offices and shops. |
| Country risk | The risk that conditions in a country affect a deal there. Also a role on a desk. |
| Cover | Insurance or a guarantee on a loan from an export credit agency. Cover in principle is the agency's early indication that it is willing to provide it. |
| Credit committee | The group at a bank that decides on credit. |
| Creditworthiness | How likely a borrower is to repay. Stonewake does not assess it for natural persons. |
| Deal origination | Finding and developing new lending business. Also a role on a desk. |
| Desk | A bank team that covers one business area, such as export finance. |
| Development bank or DFI | A state-backed lender that funds development projects. DFI stands for development finance institution. |
| Enhanced due diligence (EDD) | A deeper investigation of a company or person before doing business with them. |
| Export credit agency (ECA) | A government-backed body that insures or finances exports, such as UK Export Finance. |
| Export finance | Financing that helps a buyer abroad pay for exported goods or services, often with cover from an export credit agency. |
| Final investment decision (FID) | The point at which a project's owners commit to building it. |
| Multilateral | A lender owned by several countries, such as the World Bank. |
| Natural person | A human being, as opposed to a company. A sole trader's business counts as a natural person. |
| Politically exposed person (PEP) | Someone with a prominent public role, who banks check more closely. Stonewake does not replace a bank's own PEP screening. |
| Portfolio management | The desk role that tracks loans the bank has already made. |
| Project finance | Lending repaid from the income of one project, such as a power plant. |
| Reputational research | The desk role that checks whether a client or deal could harm the bank's reputation. |
| Sanctions | Legal restrictions on dealing with named people, companies or countries. |
| Sole trader | A person who runs a business without a separate company. |
| Structuring and security | The desk role that designs a loan's terms and the assets securing it. |

## Product and access

| Term | Definition |
| --- | --- |
| Admin | The highest role. Holds everything compliance can do, manages members, API keys, alerts, branding and settings, and exports the audit log. The docs also say administrator. |
| All teams | The team selector's view across every team. In the API, `team_scope.all_teams` is true only for a signed-in admin or compliance user, never for an API key. |
| Analyst | Holds everything a viewer can do. Also starts screenings, dossiers, research and monitoring, edits deals and decides screening reviews for their team. |
| Compliance | Holds everything an analyst can do, and can read every team in the workspace. |
| Dashboard | The web app at `app.stonewake.ai`. |
| Member | A user of a workspace. An admin invites, changes and removes members. |
| Module | A feature area with its own page, such as Deal Book. A team sees only the modules it holds. |
| Role | One of viewer, analyst, compliance or admin. Each holds everything of the role before it. |
| SCIM | System for Cross-domain Identity Management. Lets a bank's directory add and remove users automatically. |
| Single sign on (SSO) | Signing in through the bank's own identity provider. Stonewake uses Microsoft Entra ID over SAML 2.0, switched on per workspace. |
| Surface | A way to reach the product: dashboard, REST API, MCP server, docs or public site. |
| Team | A working group in a workspace that mirrors a desk. It has its own modules, mandate and rubric. |
| Team selector | The sidebar control that switches whose data is shown. |
| Viewer | The lowest role. Reads and downloads the team's content, but cannot start screenings or record reviews. |
| Workspace | One institution's isolated environment, with its own users, teams and audit trail. |

## Deal Book and Scoring

| Term | Definition |
| --- | --- |
| Briefing | The section of a deal page whose facts link to their citations. |
| Deal | A team's list entry for a transaction, built from researched public sources. |
| Deal Book | A team's ranked list of origination leads. |
| Deal status | The analyst workflow status of a deal: `new`, `tracking` or `dismissed`. |
| Deal summary | Three lines (`who_what`, `stage`, `why`) built by fixed rules, not a model. Each line cites the quotes behind it. |
| Dismiss | Asks for a reason and takes the deal off the book. For a workspace's own deals, it also stops that deal's research. |
| Factor | A rubric value from 0 to 1. |
| Financing window | The phrase that ranks a deal: Financing open, Early stage, Not confirmed or Financing set. The API's `window` values are `financing_open`, `early_stage`, `not_confirmed`, `financing_closed` and `cancelled`. The tracker's "open financings" and "unconfirmed" mean Financing open and Not confirmed. |
| Follow | Keeps a deal and lists it under the Following tab, newest update first. |
| Held back | Left out of the main list, with a visible count. Applies to deals that are set or cancelled, that the team's own bank already lends to, that are domestic, stale or below the value floor. |
| Muted value | A value no source quote confirms. It appears muted, with the reason on hover. |
| Preview effect | Shows the deals a draft rubric moves most, each with its score and place in the book. |
| Rubric | A team's scoring setup on the Scoring page: five parts whose weights sum to 100. See [Q-01](PRODUCT_DEFINITION.md#open-questions) for the conflict over the number of parts. |
| Save and activate | Makes a draft rubric live. The book then reorders as the preview showed. |
| Score | A deal's fit for the desk, from 0 to 100. The deal page lists every reason behind it. |
| Score band | The label on a score: Strong fit from 70, Worth a look from 45, Weak fit from 20, Not a fit below that. A deal outside the mandate never reads Strong fit. |
| Stage | The detailed state a source confirmed, shown when you point at the financing window and on the deal page. The API has 16 values, such as `tender`, `mandated`, `eca_cover` and `fid`. |
| Stale | Last activity is older than the stale window, which is 12 months by default. |
| Value floor | The minimum deal value a team sets. |
| Weight | A rubric value from 0 to 100. |

## Tenders

| Term | Definition |
| --- | --- |
| CPV code | Common Procurement Vocabulary, the EU's codes for what is being bought. A code covers every code below it, so 45000000 (construction work) covers 45233120. |
| Criterion | One condition in a tender profile. Each is judged on its own as hit, miss or unknown. |
| eForms | The EU's standard format for procurement notices. |
| Hit | The notice states a value the profile asks for, or a code below one it asks for. |
| Match | A notice where every criterion of the profile is a hit. Its status is `new`, `dismissed` or `in_deal_book`. |
| Miss | The notice states the field, and nothing it states fits. |
| Notice | A published procurement announcement. |
| NUTS region | Nomenclature of Territorial Units for Statistics, the EU's region codes. A region covers every region below it, so DE2 (Bavaria) covers DE212 (Munich). |
| Portal export | A file of notices from a tender portal, uploaded as CSV, XLSX or eForms XML. |
| TED | Tenders Electronic Daily, the EU's public source of procurement notices. |
| Tender profile | A team's description of the public tenders it looks for. It must name at least one CPV code or NUTS region. |
| Unknown | The notice does not state the field, or states only a broader code, such as the country where the profile asks for a region. |

## Countries

| Term | Definition |
| --- | --- |
| Country assessment | The four score components worth 70 points: CPI 25, governance 20, OECD 12 and adverse news 13. |
| Country brief | The PDF report you can download for a country. |
| CPI | Corruption Perceptions Index, from Transparency International. |
| EU high risk list | The European Commission's list of high-risk third countries. |
| FATF lists | The Financial Action Task Force's lists of high-risk jurisdictions and of jurisdictions under increased monitoring. |
| `gaps` | The API field that lists each component a country's score is computed without, with the reason. |
| Governance | The World Bank's Worldwide Governance Indicators. |
| ISO3 code | A three-letter country code, such as `DEU`. See [Q-05](PRODUCT_DEFINITION.md#open-questions) on letter case. |
| Jurisdiction | A country or territory with its own entry in the Countries list. |
| List standing | The three score components worth 30 points: FATF 10, EU list 5 and country sanctions 15. It counts for every country. |
| Not scored | Shown when a country's components with data carry fewer than 50 of the 100 weight points. |
| OECD category | The OECD's country risk classification, the export credit agencies' consensus on country credit risk. |
| Region | One of nine desk regions: `europe`, `turkey`, `cis_central_asia`, `gcc`, `middle_east`, `north_africa`, `sub_saharan_africa`, `asia` and `americas`. |
| Risk score | A country's risk from 0 to 100, where higher is riskier. |
| Weight points | A component's share of the 100-point country score. |

## Institutions and Network

| Term | Definition |
| --- | --- |
| Company lookup | Finds a company by name or identifier. The API route is `/v1/search`. |
| Current, All history, As of | Network views of relationships: those in force today, every one on record, or those in force on a chosen date. |
| Hop | One step up an ownership chain, from a company to its owner. |
| Institution | An entry in the registry, shown at `/entities` in the dashboard. API `kind` values include `eca`, `multilateral`, `dfi`, `development_bank`, `agency`, `bank` and `trade_press`. |
| LEI | Legal Entity Identifier, a global code for a legal entity. |
| Min ownership | A Network filter that hides shareholdings below a percentage. |
| Node | A company or person in the graph, with `node_type` of `company` or `person`. `/v1/search` hits carry node ids. |
| Ownership chain | A company's owners, walked upward hop by hop with each hop cited, at a default 25 percent threshold. It stops at an individual. |
| Person data | Data on natural persons, switched on per workspace. Where it is off, a person node answers the same 404 as an unknown id. |
| Register | An official public record of companies, such as Companies House in the UK. |
| Register identifier | An id that identifies a company in a register, such as an LEI or a register number with its country. |
| Register path | The chain of register relationships that connects two companies. |
| Register record | The entry in a register that a relationship or status stands on. |
| Relationship | A link between two companies, copied from a register record. Solid lines are current and dashed lines have ended. |

## Portfolio and credit reviews

| Term | Definition |
| --- | --- |
| Acknowledge | An analyst marks a status change as looked at. Each acknowledgement writes an audit entry. |
| Added to the book | What the first assessment of an exposure reads. It is not counted as a status change. |
| Amber | An assessed credit status. In standard corporate scoring, it starts from a score of 30. API value `amber`. |
| Book | The monitored list of companies on a team's Portfolio page. |
| Book import | Loading companies by CSV. The API only previews it, and the import is applied in the dashboard. |
| Cause | Why a status changed: the drivers, the register record and any rulebook change. It is derived from the two assessments the change compares. |
| Completeness | The weight share of applicable signals that carry a band, including bands assumed for missing data. `evidence_completeness` counts actual evidence only. |
| Credit review | The record an exposure carries from the day it joins the book: disposition, note, owner and next review date. |
| Disposition | The outcome of a credit review: Reviewed, no action (`no_action`), Watch list (`watch_list`), Intensified care (`intensified_care`) or Escalated to credit (`escalated`). The API value `added` marks the day an exposure joined the book and is never a review. |
| Driver | A signal whose change moved a status, with its band before and after and its evidence. |
| Exposure | One company on a team's book. Each has one status and its own credit review record. |
| Green | An assessed credit status, below the Amber threshold. API value `green`. |
| Next review date | When a review is due. It must fall between today and one year from today, and the review is overdue once it has passed. |
| No score yet | Assessed, but too little of what the sources can serve was observed to score the company. API value `insufficient`. |
| Not yet assessed | The exposure has no assessment yet. API value `not_assessed`. |
| Owner | The workspace member responsible for a review: an analyst or compliance member of the exposure's team, or an admin. |
| Red | An assessed credit status. In standard corporate scoring, it starts from a score of 60. API value `red`. |
| Remove from book | Takes a company off the book, with a reason. Its earlier history stays on record. |
| Reviews due | The list of overdue reviews and those due within two weeks, soonest first. |
| Signal | One input to the credit score. Each signal belongs to a family and reads a band. |
| Signal family | A group of signals that carries one weight in the score, through `family_weights`. Standard corporate scoring runs 19 signals in 8 families, from a catalog of 41 signals in 12 families. |
| Sole trader (status) | A natural person's business, by its register's own evidence. It is never scored. API value `sole_trader`. |
| Status change | A move between credit statuses. The API calls it a transition. |

## Monitoring and alerts

| Term | Definition |
| --- | --- |
| Alert | A notification, sent by email, SMS, Microsoft Teams or signed webhook. New alerts also appear under Your alerts on the Portfolio page. |
| Check status | OK, Queued, Checking, Overdue (the check is late), Paused (it does not run until resumed), Retrying or Failed (the error shows on hover). |
| Frequency | How often a research check runs: hourly, daily, every 2 days or weekly. |
| Research check | A scheduled research run on what a team follows, such as deals and companies. |
| Signed webhook | An HTTP call to the customer's system, signed so that the receiver can verify the sender. |
| Source catalog | The vetted list of official and trade sources. Only entries a workspace switches on are checked on schedule. |

## Screenings and EDD dossiers

| Term | Definition |
| --- | --- |
| `coverage_incomplete` | A screening flag that is true when planned searches failed, the run stopped before every source was checked, or no source identified the subject. |
| Dossier | The output of enhanced due diligence on a company or person, downloadable as a PDF. It runs in stages that start with register identity, global screening and the company's footprint. |
| Finding | A quote-verified item from a source. Assessments cite findings by `finding_ids`. |
| Not checked | What a sanctions list reads when it is switched off or was not checked within 48 hours. It is never treated as clear. |
| OFAC | The US Treasury's Office of Foreign Assets Control. It publishes the SDN (Specially Designated Nationals) list and the non-SDN list. |
| Person screening | A screening of a natural person. It carries no verdict, assessments, drafted summary or score. |
| Review candidate | A possible sanctions match that sets no colour or score and never counts as a match. Only an analyst's confirmation records a match. A shared name alone yields only this. |
| Sanctions comparison | The check that opens every screening result, against six official lists: EU Financial Sanctions Files, UK Sanctions List, OFAC SDN, OFAC non-SDN, Swiss SECO list and UN Security Council Consolidated List. It uses no search or model call. |
| Screening | An adverse media run over an organization or country, or a person where person data is on. It covers 9 categories over a 5-year window. |
| SECO | Switzerland's State Secretariat for Economic Affairs, which publishes the Swiss sanctions list. |
| Stated purpose | The reason a requester must give for a dossier. A person dossier always needs one. |
| Verdict | The result for one screening category: `red`, `amber`, `green` or `no_findings`. It stays a draft until an analyst confirms or dismisses it. |
| `worst_verdict` | The most severe live category verdict, or `incomplete` where every category found nothing and coverage was incomplete. It is null for a person and before completion. |

## Evidence and compliance

| Term | Definition |
| --- | --- |
| AI-assisted | Content a model helped produce. The product labels it. |
| Append-only | Records are never edited or deleted. A correction is a newer record. |
| Audit log | The record of actions on workspace data, attributed to the acting user. An admin can export it as CSV. |
| Citation | The link from a claim to its source. `POST /v1/citations/resolve` returns the evidence for a list of ids, and reads only. |
| EBA/GL/2020/06 | The European Banking Authority's guidelines on loan origination and monitoring. Part of the credit signal catalog maps to its paragraph 274. |
| EU AI Act | The EU law that regulates AI systems. Stonewake's docs state that it is not a high-risk system because it does not evaluate creditworthiness. |
| Evidence | The verified quote or provider snippet behind a claim. |
| Model call | A request to an AI model. Credit scoring and tender matching make none. |
| Provider snippet | The labelled quote shown where a source blocks crawlers, so the text could not be checked against the source itself. |
| Test data rule | Enter public information only. See the [product overview](PRODUCT_DEFINITION.md#product-overview). |
| Verified quote | A verbatim quote, checked against the text the source serves. |
| WCAG 2.1 AA | Web Content Accessibility Guidelines, the level the dashboard and docs target. |

## API and MCP

| Term | Definition |
| --- | --- |
| API key | The credential for the API and MCP server, starting `swk_live_`. It reads only the team it was issued for, is shown once and is stored hashed. |
| Bearer | The only accepted authorization scheme: `Authorization: Bearer <key>`. |
| Ceiling | A request limit. The defaults are 120 per key per minute and 50,000 per workspace per day. |
| Closed value | A parameter with a fixed list of allowed values. Closed values are case-sensitive, and a bad one returns the `literal_error` type. See [Q-05](PRODUCT_DEFINITION.md#open-questions). |
| Credential | How a request authenticated. `/v1/me` returns `api_key` or `user`. |
| `detail` | The list in a 422 response. Each entry has `type`, `loc` and `msg`, and never includes the value you sent. |
| `dry_run` | The flag on API preview routes. It is always true, and sending `false` returns 422. |
| `error` envelope | The shape of every refusal: an `error` object with a stable `code` and a fixed `message`. Tests should branch on `code`, not on the message. |
| `extra_forbidden` | The 422 type for a query parameter the endpoint does not read. |
| Fail closed | Refusing a request when a limit cannot be verified, rather than letting it through. This returns 503 `quota_unavailable`. |
| JSON-RPC | The message format MCP uses. A missing or refused key returns error `-32001`. |
| List response | The paged shape `items`, `limit`, `offset` and `total`. |
| MCP | Model Context Protocol. Lets AI assistants and agents read a workspace through `mcp.stonewake.ai`. |
| OpenAPI | The machine-readable API description at `api.stonewake.ai/openapi.json`. |
| Quota | The daily ceiling a workspace's keys share. It resets at midnight UTC, and going over it returns `daily_quota_exceeded`. |
| `RateLimit-Policy` | The response header that states the ceilings that apply. It is the authority over any number in the docs. |
| `retry_after_seconds` | The field in a traffic refusal that says how long to wait. |
| `STONEWAKE_DATA` | The markers around data in MCP tool responses, so that agents treat it as data and not as instructions. |
| `team_scope` | The `/v1/me` field that shows which teams a credential reads, through `all_teams` and `teams`. |
| Tool | A read-only function the MCP server offers, listed by `tools/list` and run by `tools/call`. See [Q-02](PRODUCT_DEFINITION.md#open-questions) on the count. |

## Test automation

| Term | Definition |
| --- | --- |
| Artifacts | Generated test output, in the `artifacts/` folder, which is not committed. |
| Client | A class in `src/api/clients` that calls one API resource. |
| Component | A shared UI part in `src/web/components`, such as the sidebar. |
| Data factory | Code in `src/factories` that builds test input. |
| Fixture | A Playwright fixture in `src/fixtures`, which gives specs ready-to-use pages and clients. |
| Label | Visible UI text, kept in `src/web/labels`, so a wording change is fixed in one place. |
| Page object | A class in `src/web/pages` that represents one dashboard page. It performs actions and returns results, and specs hold the assertions. |
| Playwright project | A named test group in `playwright.config.ts`. The target setup has `api` and `web`, so each surface can run on its own. |
| Requirements tracker | The requirements table in [PRODUCT_DEFINITION.md](PRODUCT_DEFINITION.md#requirements). |
| Selector | How a test finds an element on a page. Selectors stay inside `web/pages` and `web/components`. |
| Spec | A test file. The suffix shows the surface, as in `countries.api.spec.ts` or `countries.web.spec.ts`. |
| Test ID | A value in the tracker's Test column, such as `ui 6` or `api 9`. It is the start of a test title in `tests/ui.spec.ts` or `tests/api.spec.ts`. |
| Trace | Playwright's recording of a test run, kept for failed tests. |
| Worker | A process that runs tests in parallel. The target setup uses 2. |
