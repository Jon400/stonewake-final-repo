# Stonewake PRD: Requirements Tracker

Last checked 4 November 2026. The product changes often, so compare against the [changelog](https://docs.stonewake.ai/changelog) when a row looks wrong.

## How to use the tracker

Update the **Status** and **Test** columns as you work. Everything else describes the requirement.

| Column | Values | Meaning |
| --- | --- | --- |
| Priority | P1 | The core user journeys (find and open deals, screen a company, read company and country data, follow a company, read it all through the API and MCP), plus trust, safety and access rules, where a failure is serious |
| Priority | P2 | Core features of a module |
| Priority | P3 | Supporting features and stated limits |
| Checked | Live | Seen on the live product, at least in part (for example, the control is present). This is not a passed test |
| Checked | Spec | Stated in the OpenAPI document |
| Checked | Docs | Stated in the docs or site, not yet seen live |
| Checked | Not checked | Taken from an existing test only |
| Status | No test | Nothing covers this yet |
| Status | Has test | A test exists, result not confirmed |
| Status | Fix test | A test exists but expects something the live product does not do |
| Status | Passing, Failing, Blocked | Set these once you run the test |

Stonewake does not publish priorities, so the Priority values are a proposal. Change them as you see fit.

## Product overview

| Item | Definition |
| --- | --- |
| Product | Agentic market intelligence for banks, built for deal origination and credit monitoring |
| Problem | Deals surface in public sources before desks see them, a monitored file goes stale after signing, and a memo needs a checkable source for every claim |
| Users | Deal and credit desks at banks, in export finance, project finance and commercial real estate |
| Roles on a desk | Origination, portfolio management, country risk, reputational research, structuring and security, credit committee |
| Surfaces | Dashboard (app.stonewake.ai), REST API (api.stonewake.ai/v1), MCP server (mcp.stonewake.ai), docs (docs.stonewake.ai), public site (stonewake.ai) |
| Status | In pilot with a leading German bank; sold directly, with no online signup or public price list |
| Out of scope | Consumer credit, anything outside banks' deal and credit desks, creditworthiness of natural persons, employment or tenant screening, replacing a bank's own sanctions or PEP screening |
| Test data rule | Enter public information only: no bank figures, client data or confidential information, and no personal data beyond your own account details |
| "Monitoring" has three meanings | Portfolio is credit monitoring of the book; the Monitoring page is the research schedule; Stonewake Monitoring is the public news briefs |

## Requirements

| ID | Area | Requirement | Priority | Checked | Source | Test | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AUTH-01 | Access | Signed-out visitors to dashboard pages are redirected to the login page | P1 | Not checked | Existing test | ui 4 | Has test |
| AUTH-02 | Access | The sign in button stays disabled until the Terms of Service box is ticked | P2 | Not checked | Existing test | ui 3 | Has test |
| AUTH-03 | Access | A wrong password shows an error and the user stays on the login page | P1 | Not checked | Existing test | ui 2 | Has test |
| AUTH-04 | Access | Valid credentials open the Deal Book | P1 | Live | [At a glance][pdf] | ui 1 | Has test |
| AUTH-05 | Access | Signing out ends the session, and dashboard pages then redirect to login | P1 | Docs | [Security overview][sec] | ui 5 | Has test |
| AUTH-06 | Access | There are four roles (viewer, analyst, compliance, admin), each holding everything of the role before it | P1 | Docs | [Onboarding][onb] | None | No test |
| AUTH-07 | Access | A viewer reads and downloads the team's content but cannot start screenings or record reviews | P1 | Docs | [Onboarding][onb] | None | No test |
| AUTH-08 | Access | Compliance can read every team in the workspace | P2 | Docs | [Onboarding][onb] | None | No test |
| AUTH-09 | Access | An admin manages members, API keys, alerts, branding and settings, and exports the audit log | P2 | Live | [Onboarding][onb] | None | No test |
| AUTH-10 | Access | Single sign on (Microsoft Entra ID over SAML 2.0) and SCIM provisioning are available per workspace | P3 | Docs | [SSO][sso] | None | No test |
| NAV-01 | Navigation | Each sidebar module opens its own page: Deal Book, Tenders, Countries, Institutions, Network, Monitoring, Portfolio, Screenings, Scoring | P2 | Live | [At a glance][pdf] | ui 6 | Fix test |
| NAV-02 | Navigation | A team sees only the modules it holds, in the sidebar, downloads and the guide | P2 | Docs | [Onboarding][onb] | None | No test |
| NAV-03 | Navigation | The dashboard can be switched between English and German | P3 | Live | [Sidebar][app] | None | No test |
| NAV-04 | Navigation | The team selector switches whose data is shown, including an All teams view | P2 | Live | [At a glance][pdf] | None | No test |
| DEAL-01 | Deal Book | Deals list in priority order: open financings, then early stage, then unconfirmed, highest score first in each group | P2 | Docs | [Deal Book][deal] | None | No test |
| DEAL-02 | Deal Book | Each deal has a score from 0 to 100, and the deal page lists every reason behind it | P1 | Live | [Deal Book][deal] | None | No test |
| DEAL-03 | Deal Book | Score bands read Strong fit from 70, Worth a look from 45, Weak fit from 20, Not a fit below that | P2 | Docs | [Deal Book][deal] | None | No test |
| DEAL-04 | Deal Book | A deal outside the team's mandate never reads Strong fit, whatever its score | P2 | Docs | [Deal Book][deal] | None | No test |
| DEAL-05 | Deal Book | Set or cancelled, own-bank, domestic, stale and below-floor deals are held back, with a visible count | P2 | Docs | [Deal Book][deal] | None | No test |
| DEAL-06 | Deal Book | Search matches whole words, and no result shows an empty state | P1 | Docs | [Deal Book][deal] | ui 7 | Has test |
| DEAL-07 | Deal Book | Stage, sector and region filters narrow the book, and further filters sit behind Filters | P1 | Live | [Deal Book][deal] | None | No test |
| DEAL-08 | Deal Book | Follow adds a deal to the Following tab, and Unfollow removes it | P1 | Live | [Monitoring docs][mon] | None | No test |
| DEAL-09 | Deal Book | Dismiss asks for a reason and takes the deal off the book | P2 | Docs | [Guide][app] | None | No test |
| DEAL-10 | Deal Book | A deal page shows a Briefing whose facts link to their citations | P1 | Docs | [Guide][app] | ui 7 | Has test |
| DEAL-11 | Deal Book | A value no source quote confirms is shown muted, with the reason on hover | P1 | Docs | [Deal Book][deal] | None | No test |
| DEAL-12 | Deal Book | The book exports as an Excel workbook | P1 | Live | [At a glance][pdf] | None | No test |
| DEAL-13 | Deal Book | A deal downloads as a PDF report and a PowerPoint deck | P1 | Spec | [OpenAPI][oas] | None | No test |
| TEND-01 | Tenders | A tender profile must name at least one CPV code or NUTS region | P2 | Docs | [Tenders][tend] | None | No test |
| TEND-02 | Tenders | A notice is a match only when every criterion of the profile is a hit | P1 | Docs | [API reference][ref] | None | No test |
| TEND-03 | Tenders | Each match explains every criterion and cites its notice | P1 | Docs | [Tenders][tend] | None | No test |
| TEND-04 | Tenders | Matching uses a fixed rule, with no model | P1 | Docs | [Tenders][tend] | None | No test |
| TEND-05 | Tenders | A match is new, dismissed or in the Deal Book, and an analyst can move it | P2 | Live | [API reference][ref] | None | No test |
| TEND-06 | Tenders | A new team gets a starter profile from its desk's mandate | P3 | Docs | [Tenders][tend] | None | No test |
| TEND-07 | Tenders | Portal exports upload as CSV, XLSX or eForms XML, and the API preview writes nothing | P3 | Docs | [API reference][ref] | None | No test |
| TEND-08 | Tenders | Public notices come from TED, today from buyers in Germany | P3 | Docs | [Tenders][tend] | None | No test |
| CTRY-01 | Countries | The list covers 245 jurisdictions in 9 regions | P1 | Live | [Coverage][cov] | api 9 | Fix test |
| CTRY-02 | Countries | Risk runs from 0 to 100, where higher is riskier | P1 | Live | [Countries][ctry] | api 9 | Fix test |
| CTRY-03 | Countries | The score uses seven weights: CPI 25, governance 20, OECD 12, adverse news 13, FATF 10, EU list 5, sanctions 15 | P1 | Docs | [Countries][ctry] | None | No test |
| CTRY-04 | Countries | A country is scored only with at least 50 of 100 weight points of data, and otherwise reads Not scored | P1 | Live | [Countries][ctry] | None | No test |
| CTRY-05 | Countries | A missing component is never scored as safe, and the API names it under `gaps` | P1 | Live | [Countries][ctry] | None | No test |
| CTRY-06 | Countries | A country profile shows the weighted breakdown and data sources, each with a citation | P1 | Live | [Countries][ctry] | ui 8 | Has test |
| CTRY-07 | Countries | Search filters the list, and no result shows an empty state | P2 | Not checked | Existing test | ui 8 | Has test |
| CTRY-08 | Countries | An unknown country returns 404 in the API and Page not found in the dashboard | P2 | Live | Existing test | api 9, ui 8 | Fix test |
| CTRY-09 | Countries | The list exports as Excel, and a country downloads as a PDF brief | P3 | Live | [Countries][ctry] | None | No test |
| INST-01 | Institutions | The registry lists agencies, banks, multilaterals and exporters, with kind and country filters and search | P1 | Live | [At a glance][pdf] | ui 9, api 7 | Has test |
| NET-01 | Network | Company lookup finds a company by name or identifier | P1 | Live | [API reference][ref] | api 10 | Fix test |
| NET-02 | Network | Every relationship links to its register record, and one with no citable record does not render | P1 | Docs | [Network][net] | None | No test |
| NET-03 | Network | Solid lines show current relationships and dashed lines show ended ones | P3 | Docs | [Network][net] | None | No test |
| NET-04 | Network | Minimum ownership and Current, All history and As of views filter the graph | P2 | Docs | [Network][net] | None | No test |
| NET-05 | Network | The view finds the register path between two companies and exports relationships as CSV | P3 | Docs | [Network][net] | None | No test |
| NET-06 | Network | Ownership chains walk upward hop by hop with each hop cited, at a default 25 percent threshold | P1 | Docs | [Site llms.txt][llms] | None | No test |
| PORT-01 | Portfolio | Every exposure has one of six statuses: green, amber, red, insufficient, not_assessed, sole_trader | P1 | Live | [Credit reviews][crev] | api 6, ui 10 | Has test |
| PORT-02 | Portfolio | Status counts sum to the active exposures and match the list total | P1 | Live | Existing test | api 6 | Has test |
| PORT-03 | Portfolio | Standard corporate scoring runs 19 signals in 8 families, with Amber from 30 and Red from 60 | P2 | Live | [`/v1/risk-config`][ref] | None | No test |
| PORT-04 | Portfolio | Every status change names its cause, with the signals and the register record behind it | P1 | Docs | [Credit reviews][crev] | None | No test |
| PORT-05 | Portfolio | A first assessment reads Added to the book and is not counted as a status change | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-06 | Portfolio | An analyst acknowledges changes one at a time or all together, and each writes an audit entry | P2 | Live | [Credit reviews][crev] | None | No test |
| PORT-07 | Portfolio | A review records a disposition, a note up to 2,000 characters, an owner and a next review date | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-08 | Portfolio | The next review date must fall between today and one year from today | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-09 | Portfolio | Disposition is one of Reviewed no action, Watch list, Intensified care, Escalated to credit | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-10 | Portfolio | A joining company gets a first review due one year later, owned by the member who added it | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-11 | Portfolio | Reviews due lists overdue reviews and those due within two weeks, soonest first | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-12 | Portfolio | A company is added one at a time or by CSV, and CSV rows match by register identifier only | P1 | Live | [Portfolio][port] | None | No test |
| PORT-13 | Portfolio | A company already on the book under another record is not added twice | P2 | Docs | [Portfolio][port] | None | No test |
| PORT-14 | Portfolio | Remove from book needs a reason, and the earlier history stays on record | P2 | Docs | [Credit reviews][crev] | None | No test |
| PORT-15 | Portfolio | A row opens the company page with its signal breakdown and records | P2 | Docs | [Portfolio][port] | ui 10 | Has test |
| MON-01 | Monitoring | A check runs hourly, daily, every 2 days or weekly | P1 | Docs | [Monitoring docs][mon] | None | No test |
| MON-02 | Monitoring | A check can be paused and resumed, and a paused check does not run | P2 | Docs | [Monitoring docs][mon] | None | No test |
| MON-03 | Monitoring | Status reads OK, Queued, Checking, Overdue, Paused, Retrying or Failed, with the error on hover | P3 | Docs | [Monitoring docs][mon] | None | No test |
| SCR-01 | Screenings | A screening can be started for an organization, a country or a person | P1 | Docs | [At a glance][pdf] | None | No test |
| SCR-02 | Screenings | Adverse media covers 9 categories over a 5-year window | P2 | Docs | [Site llms.txt][llms] | None | No test |
| SCR-03 | Screenings | Verdicts for organizations and countries are drafts of Red, Amber or Green that an analyst confirms | P1 | Docs | [Site llms.txt][llms] | None | No test |
| SCR-04 | Screenings | Every result opens with a comparison against six official sanctions lists, with no search or model call | P1 | Docs | [API reference][ref] | None | No test |
| SCR-05 | Screenings | A failed search marks the result `coverage_incomplete` | P1 | Docs | [API reference][ref] | None | No test |
| SCR-06 | Screenings | Each screening downloads as a PDF report | P3 | Docs | [At a glance][pdf] | None | No test |
| SCO-01 | Scoring | The rubric has five parts whose weights sum to 100 | P2 | Live | [Deal Book][deal] | None | No test |
| SCO-02 | Scoring | A weight runs 0 to 100, a factor 0 to 1, and an out-of-range field is marked before sending | P2 | Docs | [Deal Book][deal] | None | No test |
| SCO-03 | Scoring | Preview effect shows the deals a draft moves most, before Save and activate | P2 | Live | [Deal Book][deal] | None | No test |
| SCO-04 | Scoring | Every saved version stays available, and the team can return to the built-in default | P3 | Docs | [Deal Book][deal] | None | No test |
| EDD-01 | EDD dossiers | A dossier runs in stages, each check cites its evidence, and a failed stage can be retried | P2 | Docs | [Dossiers][edd] | None | No test |
| EDD-02 | EDD dossiers | Analysts and above request a dossier, viewers only read, and a person dossier needs a stated purpose | P1 | Docs | [Dossiers][edd] | None | No test |
| ALRT-01 | Alerts | New alerts appear under Your alerts on the Portfolio page | P1 | Docs | [At a glance][pdf] | None | No test |
| ALRT-02 | Alerts | Alerts can go out by email, SMS, Microsoft Teams and signed webhook | P3 | Docs | [Docs index][index] | None | No test |
| API-01 | API | Only a Bearer key is accepted, and the `Token` scheme returns 401 | P1 | Live | [Authentication][auth] | api 2, api 4 | Fix test |
| API-02 | API | A missing or invalid key returns 401 with code `unauthenticated` | P1 | Live | [Errors][err] | api 3, api 4 | Has test |
| API-03 | API | Every refusal uses the `error` envelope with a stable code and fixed message | P1 | Live | [Errors][err] | api 3, api 8 | Has test |
| API-04 | API | Invalid input returns 422 with `validation_failed` and a `detail` list | P2 | Live | [Errors][err] | api 5, api 8 | Fix test |
| API-05 | API | An unknown query parameter returns 422 with type `extra_forbidden` | P2 | Live | [Errors][err] | None | No test |
| API-06 | API | Lists return `items`, `limit`, `offset` and `total`, with `limit` from 1 to 100 | P1 | Live | [API reference][ref] | api 5, api 7 | Fix test |
| API-07 | API | Search caps `limit` at 25 and needs a `q` of at least 2 characters | P1 | Live | [OpenAPI][oas] | api 10 | Fix test |
| API-08 | API | An unknown resource returns 404 with code `not_found` | P2 | Live | [Errors][err] | api 8 | Has test |
| API-09 | API | An unsupported method returns 405 with code `method_not_allowed` | P3 | Live | [Errors][err] | None | No test |
| API-10 | API | `/health` needs no key and returns status, app, version and environment | P2 | Live | [OpenAPI][oas] | api 1 | Fix test |
| API-11 | API | `/v1/me` returns the credential type, role and team scope | P2 | Live | [OpenAPI][oas] | api 2 | Fix test |
| API-12 | API | `/v1` has 74 endpoints, and none creates, changes or deletes workspace data | P1 | Spec | [Overview][index] | None | No test |
| API-13 | API | Responses carry rate limit headers, and `RateLimit-Policy` is the authority | P2 | Live | [Errors][err] | api 2 | Fix test |
| API-14 | API | Default ceilings are 120 per key per minute and 50,000 per workspace per day, and a workspace can agree its own | P2 | Live | [Errors][err] | None | No test |
| API-15 | API | Going over a ceiling returns 429 with `retry_after_seconds` | P2 | Docs | [Errors][err] | None | No test |
| API-16 | API | If a limit cannot be verified, the request is refused with 503 `quota_unavailable` | P1 | Docs | [Errors][err] | None | No test |
| API-17 | API | Admins create keys, a key is shown once and stored hashed, and revocation is immediate | P1 | Docs | [Site llms.txt][llms] | None | No test |
| API-18 | API | The API is off by default per workspace and enabled by arrangement | P3 | Docs | [Overview][index] | None | No test |
| MCP-01 | MCP | The endpoint lists its read-only tools without a key | P1 | Live | [MCP][mcp] | None | No test |
| MCP-02 | MCP | Every tool that reads workspace data needs a key | P1 | Docs | [MCP][mcp] | None | No test |
| MCP-03 | MCP | MCP calls count against the same key and workspace limits as the API | P2 | Docs | [MCP][mcp] | None | No test |
| MCP-04 | MCP | Tool responses fence Stonewake data between `STONEWAKE_DATA` markers | P1 | Docs | [Site llms.txt][llms] | None | No test |
| EXP-01 | Exports | Network and the audit log export as CSV | P3 | Docs | [Network][net] | None | No test |
| EVID-01 | Evidence | Every customer-visible claim shows a verified quote or a labelled provider snippet | P1 | Docs | [Site llms.txt][llms] | None | No test |
| EVID-02 | Evidence | A sanctions list that is off or not checked within 48 hours reads Not checked, never clear | P1 | Docs | [EU AI Act][ai] | None | No test |
| DEC-01 | Decisions | Credit scoring makes zero model calls | P1 | Docs | [Site llms.txt][llms] | None | No test |
| DEC-02 | Decisions | AI-assisted content is labelled in the product | P1 | Live | [Security overview][sec] | None | No test |
| DEC-03 | Decisions | Assessments, reviews and the screening ledger are append-only, and a correction is a newer record | P1 | Docs | [Credit reviews][crev] | None | No test |
| PERS-01 | Natural persons | A person is never scored, rated or ranked, and no endpoint serves a person-level score | P1 | Docs | [Security overview][sec] | None | No test |
| PERS-02 | Natural persons | A person screening carries no verdict, assessments, drafted summary or score | P1 | Docs | [API reference][ref] | None | No test |
| PERS-03 | Natural persons | Where person data is off, a person node answers the same 404 as an unknown id | P1 | Docs | [Site llms.txt][llms] | None | No test |
| PERS-04 | Natural persons | A shared name alone never counts as a sanctions match and yields only a review candidate | P1 | Docs | [EU AI Act][ai] | None | No test |
| COMP-01 | Compliance | Each institution has an isolated workspace, and a key reads only the team it was issued for | P1 | Docs | [Security overview][sec] | None | No test |
| COMP-02 | Compliance | Actions on workspace data are recorded in an audit trail, attributed to the acting user | P1 | Docs | [Security overview][sec] | None | No test |
| COMP-03 | Compliance | Data, the API and MCP run on a dedicated server in Finland | P3 | Docs | [Security overview][sec] | None | No test |
| COMP-04 | Compliance | Customer data is not used to train models | P1 | Docs | [Security overview][sec] | None | No test |
| COMP-05 | Compliance | Dashboard and docs target WCAG 2.1 AA, with known gaps published | P3 | Docs | [Accessibility][a11y] | None | No test |

## Open questions

Places where the sources disagree or the behaviour is unclear. Ask Stonewake before a test treats either side as correct.

| ID | Topic | One source says | Another says | Related | Status |
| --- | --- | --- | --- | --- | --- |
| Q-01 | Deal score parts | Homepage: six weighted components | Deal Book docs and live Scoring page: five parts | SCO-01 | Open |
| Q-02 | MCP tool count | Docs and `llms.txt`: 38 tools | Live `tools/list`: 40 tools | MCP-01 | Open |
| Q-03 | EDD Dossiers in the sidebar | Guide describes them and `/dossiers` loads | No sidebar entry for the account checked | NAV-01, EDD-01 | Open |
| Q-04 | Signals and Reports | 4 Nov changelog: sidebar entries where the workspace holds them | `/signals` loads with no sidebar entry; `/reports` answers Page not found | NAV-02 | Open |
| Q-05 | Country code letter case | Errors docs: closed values such as `deu` are refused | `GET /v1/countries/deu` returns Germany; the spec sets no case rule for this path | API-04 | Open |

[pdf]: # "Stonewake at a glance (PDF handout)"
[app]: https://app.stonewake.ai/guide
[llms]: https://stonewake.ai/llms.txt
[oas]: https://api.stonewake.ai/openapi.json
[index]: https://docs.stonewake.ai/
[ref]: https://docs.stonewake.ai/v1
[auth]: https://docs.stonewake.ai/authentication
[err]: https://docs.stonewake.ai/errors
[mcp]: https://docs.stonewake.ai/mcp
[deal]: https://docs.stonewake.ai/deal-book
[tend]: https://docs.stonewake.ai/tenders
[ctry]: https://docs.stonewake.ai/countries
[cov]: https://docs.stonewake.ai/coverage
[net]: https://docs.stonewake.ai/network
[port]: https://docs.stonewake.ai/portfolio
[crev]: https://docs.stonewake.ai/credit-reviews
[mon]: https://docs.stonewake.ai/monitoring
[edd]: https://docs.stonewake.ai/dossiers
[onb]: https://docs.stonewake.ai/enterprise-onboarding
[sso]: https://docs.stonewake.ai/sso
[sec]: https://docs.stonewake.ai/security-overview
[ai]: https://docs.stonewake.ai/ai-act
[a11y]: https://docs.stonewake.ai/accessibility
