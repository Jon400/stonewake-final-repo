# Test plan

Last checked 4 November 2026 against the [requirements tracker](PRODUCT_DEFINITION.md#requirements) and the [OpenAPI spec](https://api.stonewake.ai/openapi.json).

This plan lists the tests needed to cover the whole Stonewake product: the dashboard, the REST API, the MCP server, the docs and the public site. Each test names the requirement it covers and says whether it is automated. Terms are defined in the [glossary](GLOSSARY.md).

## How to read the plan

| Column | Value | Meaning |
| --- | --- | --- |
| Case | `TC-<area>-<number>` | The ID of the test in this plan |
| Test | | What the test checks |
| Requirements | Tracker IDs, or None | The requirements in the [tracker](PRODUCT_DEFINITION.md#requirements) that the test covers. None means the feature has no requirement yet |
| Surface | API | Calls the REST API |
| Surface | Web | Uses the dashboard, the docs or the public site in a browser |
| Surface | MCP | Calls the MCP server |
| Surface | Review | Checks documents or evidence, because a call to the product cannot show the result |
| Automated | Yes, with a Test ID | An automated test makes this check. The [Test ID](GLOSSARY.md#test-automation), such as `api 9`, is the start of its title |
| Automated | No | No automated test makes this check yet |

Automated says only whether a test exists, not whether it passes. Results belong in the tracker's Status column.

Where an automated test checks only part of a requirement, the requirement has one row for the part it checks and another row for the rest.

## Coverage summary

| Area | Tests | Automated | Not automated |
| --- | --- | --- | --- |
| Access | 15 | 5 | 10 |
| Navigation | 7 | 2 | 5 |
| Deal Book | 22 | 3 | 19 |
| Tenders | 15 | 0 | 15 |
| Countries | 16 | 6 | 10 |
| Institutions | 5 | 3 | 2 |
| Network | 12 | 1 | 11 |
| Portfolio | 30 | 5 | 25 |
| Monitoring | 5 | 0 | 5 |
| Screenings | 9 | 0 | 9 |
| Scoring | 7 | 0 | 7 |
| EDD dossiers | 5 | 0 | 5 |
| Alerts | 4 | 0 | 4 |
| API | 37 | 13 | 24 |
| MCP | 5 | 0 | 5 |
| Exports | 3 | 0 | 3 |
| Evidence | 5 | 0 | 5 |
| Decisions | 6 | 0 | 6 |
| Natural persons | 8 | 0 | 8 |
| Compliance | 8 | 0 | 8 |
| Product areas with no requirement yet | 28 | 1 | 27 |
| **Total** | **252** | **39** | **213** |

## Before running the tests

| Need | Used by |
| --- | --- |
| An account for each role: viewer, analyst, compliance and admin. The repository holds one account and one API key today | Role cases in [Access](#access), and any case that names a role |
| A workspace with two or more teams, including a team that lacks a module | `TC-NAV-04`, `TC-NAV-05`, `TC-NAV-07`, `TC-CMP-01` to `TC-CMP-03` |
| A second workspace | `TC-CMP-03` |
| One workspace with person data on and one with it off | [Natural persons](#natural-persons), `TC-SCR-02` |
| A team set aside for tests | Every case that changes data, such as following a deal or recording a review. Many records are append-only, so this data cannot be removed afterwards |
| Stonewake's help, to set up a state a test account cannot reach | `TC-AUTH-14`, `TC-AUTH-15`, `TC-API-31`, `TC-API-32`, `TC-API-37`, `TC-ALRT-03`, `TC-EVID-05` |

These rules apply to every test:

- Enter public information only: no bank figures, client data or confidential information, and no personal data beyond your own account details. This is the [product's test data rule](PRODUCT_DEFINITION.md#product-overview), and it limits person screenings to your own details.
- `/v1` only reads, so a test that changes data does so through the dashboard.
- Tests run with the dashboard in English, except `TC-NAV-06`.
- `TC-API-29` and `TC-API-30` use up the request ceilings, so they run alone and never in a normal run.

## Open questions that affect tests

Don't treat either side of these [open questions](PRODUCT_DEFINITION.md#open-questions) as correct until Stonewake answers.

| Question | Topic | Cases affected |
| --- | --- | --- |
| Q-01 | Deal score parts: five or six | `TC-SCO-01` |
| Q-02 | MCP tool count: 38 or 40 | `TC-MCP-01` |
| Q-03 | EDD Dossiers in the sidebar | `TC-NAV-03` |
| Q-04 | Signals and Reports pages | `TC-GAP-20` |
| Q-05 | Country code letter case | `TC-API-10` |

## Access

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-AUTH-01 | Signed out, `/`, `/portfolio`, `/countries/DEU` and `/entities` redirect to login | AUTH-01 | Web | Yes (ui 4) |
| TC-AUTH-02 | Signed out, every other dashboard page redirects to login, including `/tenders`, `/network`, `/monitoring`, `/screenings`, `/dossiers`, `/scoring` and `/settings` | AUTH-01 | Web | No |
| TC-AUTH-03 | Sign in stays disabled until the Terms of Service box is ticked, and is disabled again when it is unticked | AUTH-02 | Web | Yes (ui 3) |
| TC-AUTH-04 | A wrong password shows the error, and the user stays on the login page with no sidebar | AUTH-03 | Web | Yes (ui 2) |
| TC-AUTH-05 | Valid credentials open the Deal Book, with the sidebar and Sign out showing | AUTH-04 | Web | Yes (ui 1) |
| TC-AUTH-06 | Signing out returns to login, and `/portfolio` then redirects to login | AUTH-05 | Web | Yes (ui 5) |
| TC-AUTH-07 | After signing out, the old session cookie no longer opens a dashboard page, and Back shows no data | AUTH-05 | Web | No |
| TC-AUTH-08 | An analyst can do everything a viewer can, and can also start a screening and record a review | AUTH-06 | Web | No |
| TC-AUTH-09 | A viewer can read and download the team's content | AUTH-07 | Web | No |
| TC-AUTH-10 | A viewer cannot start a screening or record a review, in the dashboard or by a direct request | AUTH-07 | Web | No |
| TC-AUTH-11 | Compliance can do everything an analyst can, and can read every team in the workspace | AUTH-06, AUTH-08 | Web | No |
| TC-AUTH-12 | An admin can manage members, API keys, alerts, branding and settings, and can export the audit log | AUTH-06, AUTH-09 | Web | No |
| TC-AUTH-13 | A viewer, analyst or compliance user cannot use the admin-only actions | AUTH-09 | Web | No |
| TC-AUTH-14 | A workspace with single sign on signs in through Microsoft Entra ID over SAML 2.0 | AUTH-10 | Web | No |
| TC-AUTH-15 | SCIM adds and removes a user in a workspace that has it switched on | AUTH-10 | API | No |

## Navigation

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-NAV-01 | The sidebar opens Countries, Institutions, Portfolio, Monitoring, Screenings and Scoring, each with its own heading | NAV-01 | Web | Yes (ui 6) |
| TC-NAV-02 | The sidebar opens Deal Book, Tenders and Network, each with its own heading | NAV-01 | Web | No |
| TC-NAV-03 | The sidebar opens EDD Dossiers for a team that holds the module | NAV-01, EDD-01 | Web | Yes (ui 6) |
| TC-NAV-04 | A team without a module does not see it in the sidebar, and its page is not usable | NAV-02 | Web | No |
| TC-NAV-05 | A team without a module does not see it in downloads or the guide | NAV-02 | Web | No |
| TC-NAV-06 | The language switch changes the dashboard between English and German, and back | NAV-03 | Web | No |
| TC-NAV-07 | The team selector changes whose data shows, and All teams shows the data of every team | NAV-04 | Web | No |

## Deal Book

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-DEAL-01 | `GET /v1/deals` lists Financing open, then Early stage, then Not confirmed, highest score first in each group | DEAL-01 | API | No |
| TC-DEAL-02 | The Deal Book page shows the same order as the API | DEAL-01 | Web | No |
| TC-DEAL-03 | Every deal has a score from 0 to 100 | DEAL-02 | API | No |
| TC-DEAL-04 | A deal page lists every reason behind its score | DEAL-02 | Web | No |
| TC-DEAL-05 | Score bands change at 70, 45 and 20, with the right label on each side of each boundary | DEAL-03 | API | No |
| TC-DEAL-06 | A deal outside the team's mandate never reads Strong fit, even with a score of 70 or more | DEAL-04 | API | No |
| TC-DEAL-07 | Set, cancelled, own-bank, domestic, stale and below-floor deals are off the default list and return with `include_hidden` | DEAL-05 | API | No |
| TC-DEAL-08 | The Deal Book shows a count of held-back deals that matches the API | DEAL-05 | Web | No |
| TC-DEAL-09 | A search with no result shows No matching deals | DEAL-06 | Web | Yes (ui 7) |
| TC-DEAL-10 | Search matches whole words, so part of a word finds nothing | DEAL-06 | Web | No |
| TC-DEAL-11 | The Deal Book opens on the Deals tab, with the sector filter showing | DEAL-07 | Web | Yes (ui 7) |
| TC-DEAL-12 | The financing window, sector and region filters each narrow the book to matching deals | DEAL-07 | Web | No |
| TC-DEAL-13 | Each further filter behind Filters narrows the book | DEAL-07 | Web | No |
| TC-DEAL-14 | Follow lists a deal under the Following tab, and Unfollow removes it | DEAL-08 | Web | No |
| TC-DEAL-15 | Dismiss asks for a reason and cannot finish without one | DEAL-09 | Web | No |
| TC-DEAL-16 | A dismissed deal leaves the book, and `GET /v1/deals?status=dismissed` returns it with its reason | DEAL-09 | Web | No |
| TC-DEAL-17 | A deal opens from the book and shows its Briefing | DEAL-10 | Web | Yes (ui 7) |
| TC-DEAL-18 | Every fact in a Briefing links to a citation that opens its source | DEAL-10, EVID-01 | Web | No |
| TC-DEAL-19 | A value no source quote confirms is muted, and the reason shows on hover | DEAL-11 | Web | No |
| TC-DEAL-20 | Export downloads an Excel workbook whose rows match the book | DEAL-12 | Web | No |
| TC-DEAL-21 | A deal downloads as a valid PDF report, through `report.pdf` and `pack.pdf` | DEAL-13 | API | No |
| TC-DEAL-22 | A deal downloads as a valid PowerPoint deck, through `deck.pptx` | DEAL-13 | API | No |

## Tenders

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-TEND-01 | A profile with no CPV code and no NUTS region cannot be saved | TEND-01 | Web | No |
| TC-TEND-02 | A profile with only a CPV code, or only a NUTS region, saves | TEND-01 | Web | No |
| TC-TEND-03 | `GET /v1/tenders/matches` returns only notices where every criterion is a hit | TEND-02 | API | No |
| TC-TEND-04 | A notice with one miss or unknown criterion is not a match | TEND-02 | Web | No |
| TC-TEND-05 | A code or region below the one a profile asks for counts as a hit, such as 45233120 under 45000000 and DE212 under DE2 | TEND-02 | Web | No |
| TC-TEND-06 | Each match explains every criterion and cites its notice | TEND-03 | API | No |
| TC-TEND-07 | The audit log names no model on any row for tender matching | TEND-04 | API | No |
| TC-TEND-08 | The status filter returns matches that are `new`, `dismissed` or `in_deal_book` | TEND-05 | API | No |
| TC-TEND-09 | An analyst moves a match to each status | TEND-05 | Web | No |
| TC-TEND-10 | A new team gets a starter profile from its desk's mandate | TEND-06 | Web | No |
| TC-TEND-11 | `POST /v1/tenders/portals/upload` previews a CSV, an XLSX and an eForms XML file, and gives an outcome for each row | TEND-07 | API | No |
| TC-TEND-12 | The upload preview writes nothing, and `dry_run` set to false returns 422 | TEND-07, API-12 | API | No |
| TC-TEND-13 | A file whose header fits no portal returns `mapping_required` with its columns | TEND-07 | API | No |
| TC-TEND-14 | A portal export uploads in the dashboard, and its notices appear | TEND-07 | Web | No |
| TC-TEND-15 | Public notices cite TED, and their buyers are in Germany | TEND-08 | API | No |

## Countries

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-CTRY-01 | `GET /v1/countries` returns regions and countries, each with an ISO3 code and a name, including Germany | CTRY-01 | API | Yes (api 9) |
| TC-CTRY-02 | The list holds exactly 245 jurisdictions in the 9 regions | CTRY-01 | API | No |
| TC-CTRY-03 | Germany's profile has its codes, region and a risk score from 0 to 100 | CTRY-02 | API | Yes (api 9) |
| TC-CTRY-04 | Every scored country has a risk score from 0 to 100 | CTRY-02 | API | No |
| TC-CTRY-05 | A country with more risk indicators scores higher than one with fewer | CTRY-02 | API | No |
| TC-CTRY-06 | The breakdown has the seven components at weights CPI 25, governance 20, OECD 12, adverse news 13, FATF 10, EU list 5 and sanctions 15 | CTRY-03 | API | No |
| TC-CTRY-07 | A country with under 50 weight points of data has no score in the API and reads Not scored in the dashboard | CTRY-04 | API | No |
| TC-CTRY-08 | A country with exactly 50 weight points of data has a score | CTRY-04 | API | No |
| TC-CTRY-09 | Every missing component is named under `gaps` with its reason, and does not lower the score as if it were safe | CTRY-05 | API | No |
| TC-CTRY-10 | A country profile shows the Country risk and Data sources sections | CTRY-06 | Web | Yes (ui 8) |
| TC-CTRY-11 | The weighted breakdown shows, and each component and data source has a citation | CTRY-06, EVID-01 | Web | No |
| TC-CTRY-12 | Search filters the list, and a search with no result shows No matching countries | CTRY-07 | Web | Yes (ui 8) |
| TC-CTRY-13 | An unknown country returns 404 in the API | CTRY-08 | API | Yes (api 9) |
| TC-CTRY-14 | An unknown country shows Page not found in the dashboard | CTRY-08 | Web | Yes (ui 8) |
| TC-CTRY-15 | The list exports as an Excel workbook whose rows match the page | CTRY-09 | Web | No |
| TC-CTRY-16 | A country downloads as a valid PDF brief | CTRY-09 | Web | No |

## Institutions

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-INST-01 | `GET /v1/entities` lists institutions, and an institution's detail matches its list row | INST-01 | API | Yes (api 7) |
| TC-INST-02 | Search finds one institution, and its page opens | INST-01 | Web | Yes (ui 9) |
| TC-INST-03 | The Kind and Country filters show on the page | INST-01 | Web | Yes (ui 9) |
| TC-INST-04 | The Kind and Country filters each narrow the list to matching institutions | INST-01 | Web | No |
| TC-INST-05 | The registry holds agencies, banks, multilaterals and exporters | INST-01 | API | No |

## Network

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-NET-01 | `GET /v1/search` finds a company by name, and a search with no match returns no hits | NET-01 | API | Yes (api 10) |
| TC-NET-02 | `GET /v1/search` finds a company by an identifier, such as an LEI | NET-01 | API | No |
| TC-NET-03 | Company lookup on the Network page finds a company by name and by identifier | NET-01 | Web | No |
| TC-NET-04 | Every relationship from `GET /v1/nodes/{node_id}/network` links to its register record | NET-02 | API | No |
| TC-NET-05 | The graph draws no relationship that has no citable record | NET-02 | Web | No |
| TC-NET-06 | Current relationships have solid lines and ended ones have dashed lines | NET-03 | Web | No |
| TC-NET-07 | Min ownership hides shareholdings below the chosen percentage | NET-04 | Web | No |
| TC-NET-08 | The Current, All history and As of views each show the right relationships | NET-04 | Web | No |
| TC-NET-09 | The view finds the register path between two companies | NET-05 | Web | No |
| TC-NET-10 | Relationships export as CSV, and the rows match the graph | NET-05, EXP-01 | Web | No |
| TC-NET-11 | `GET /v1/nodes/{node_id}/ownership-chain` walks upward with each hop cited, at a default threshold of 25 percent | NET-06 | API | No |
| TC-NET-12 | The ownership chain refuses a threshold outside its range, with 422 | NET-06, API-04 | API | No |

## Portfolio

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-PORT-01 | Every exposure from `GET /v1/portfolio` has one of the six statuses | PORT-01 | API | Yes (api 5) |
| TC-PORT-02 | `GET /v1/portfolio/summary` returns a count for each of the six statuses | PORT-01 | API | Yes (api 6) |
| TC-PORT-03 | The Portfolio page shows the Red, Amber, Green, No score yet and Not yet assessed tiles | PORT-01 | Web | Yes (ui 10) |
| TC-PORT-04 | A sole trader exposure reads Sole trader and has no score | PORT-01, PERS-01 | API | No |
| TC-PORT-05 | Status counts sum to the active exposures and match the list total | PORT-02 | API | Yes (api 6) |
| TC-PORT-06 | The tiles on the page sum to the active exposures it shows | PORT-02 | Web | No |
| TC-PORT-07 | `GET /v1/risk-config` shows standard corporate scoring as 19 signals in 8 families, with Amber from 30 and Red from 60 | PORT-03 | API | No |
| TC-PORT-08 | Each assessed exposure's status agrees with its score and the Amber and Red thresholds | PORT-03 | API | No |
| TC-PORT-09 | Why the status changed names the cause, the signals and the register record | PORT-04 | Web | No |
| TC-PORT-10 | A first assessment reads Added to the book and is not in `GET /v1/portfolio/transitions` | PORT-05 | API | No |
| TC-PORT-11 | Acknowledge clears one change and writes one audit entry | PORT-06, COMP-02 | Web | No |
| TC-PORT-12 | Acknowledge all clears every change and writes an audit entry for each | PORT-06, COMP-02 | Web | No |
| TC-PORT-13 | A review saves its disposition, note, owner and next review date | PORT-07 | Web | No |
| TC-PORT-14 | A note of 2,000 characters saves, and a note of 2,001 is refused | PORT-07 | Web | No |
| TC-PORT-15 | A next review date of today or one year from today saves | PORT-08 | Web | No |
| TC-PORT-16 | A next review date of yesterday, or one year and a day from today, is refused | PORT-08 | Web | No |
| TC-PORT-17 | Disposition offers exactly Reviewed no action, Watch list, Intensified care and Escalated to credit | PORT-09 | Web | No |
| TC-PORT-18 | A joining company has a first review due one year later, owned by the member who added it | PORT-10 | Web | No |
| TC-PORT-19 | `GET /v1/portfolio/reviews-due` lists overdue reviews and those due within two weeks, soonest first | PORT-11 | API | No |
| TC-PORT-20 | Reviews due on the Portfolio page matches the API | PORT-11 | Web | No |
| TC-PORT-21 | A company is added to the book one at a time | PORT-12 | Web | No |
| TC-PORT-22 | Import book adds companies from a CSV | PORT-12 | Web | No |
| TC-PORT-23 | `POST /v1/portfolio/import` matches rows by register identifier only, so a row with only a name does not match | PORT-12 | API | No |
| TC-PORT-24 | The import preview writes nothing, and `dry_run` set to false returns 422 | PORT-12, API-12 | API | No |
| TC-PORT-25 | The import preview marks a company already on the book, or twice in a file, and does not add it again | PORT-13 | API | No |
| TC-PORT-26 | Adding a company already on the book under another record does not add it twice | PORT-13 | Web | No |
| TC-PORT-27 | Remove from book needs a reason and cannot finish without one | PORT-14 | Web | No |
| TC-PORT-28 | A removed company's earlier history stays on record, and `include_inactive` returns it | PORT-14, DEC-03 | API | No |
| TC-PORT-29 | A row opens the company page, with the company's name as its heading | PORT-15 | Web | Yes (ui 10) |
| TC-PORT-30 | The company page shows the signal breakdown and records | PORT-15 | Web | No |

## Monitoring

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-MON-01 | A check can be set to hourly, daily, every 2 days or weekly | MON-01 | Web | No |
| TC-MON-02 | A paused check reads Paused and does not run | MON-02 | Web | No |
| TC-MON-03 | A resumed check runs again | MON-02 | Web | No |
| TC-MON-04 | Each check shows one of the seven statuses, and `GET /v1/monitoring/targets` agrees | MON-03 | Web | No |
| TC-MON-05 | A failed check shows its error on hover | MON-03 | Web | No |

## Screenings

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-SCR-01 | A screening starts for an organization and for a country | SCR-01 | Web | No |
| TC-SCR-02 | A screening starts for a person, using your own account details | SCR-01 | Web | No |
| TC-SCR-03 | A result covers 9 categories over a 5-year window | SCR-02 | Web | No |
| TC-SCR-04 | An organization or country verdict reads as a draft of Red, Amber or Green until an analyst acts | SCR-03 | Web | No |
| TC-SCR-05 | An analyst confirms a draft verdict, and it then reads as confirmed | SCR-03 | Web | No |
| TC-SCR-06 | Every result opens with the comparison against the six official sanctions lists, each named | SCR-04 | Web | No |
| TC-SCR-07 | The audit log shows that the sanctions comparison made no search or model call | SCR-04 | API | No |
| TC-SCR-08 | A screening with a failed search has `coverage_incomplete` set to true | SCR-05 | API | No |
| TC-SCR-09 | A screening downloads as a valid PDF report | SCR-06 | Web | No |

## Scoring

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-SCO-01 | The rubric has five parts whose weights sum to 100 | SCO-01 | Web | No |
| TC-SCO-02 | Weights of 0 and 100, and factors of 0 and 1, are accepted | SCO-02 | Web | No |
| TC-SCO-03 | A weight or factor out of range is marked before sending | SCO-02 | Web | No |
| TC-SCO-04 | Preview effect shows the deals a draft moves most, and the live book stays unchanged | SCO-03 | Web | No |
| TC-SCO-05 | Save and activate makes the draft live, and the book reorders as the preview showed | SCO-03 | Web | No |
| TC-SCO-06 | Every saved version stays available | SCO-04 | Web | No |
| TC-SCO-07 | The team can return to the built-in default | SCO-04 | Web | No |

## EDD dossiers

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-EDD-01 | A dossier runs in stages, and each check cites its evidence | EDD-01 | Web | No |
| TC-EDD-02 | A failed stage can be retried | EDD-01 | Web | No |
| TC-EDD-03 | An analyst or higher role can request a dossier | EDD-02 | Web | No |
| TC-EDD-04 | A viewer can read a dossier but cannot request one | EDD-02 | Web | No |
| TC-EDD-05 | A person dossier cannot be requested without a stated purpose | EDD-02 | Web | No |

## Alerts

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-ALRT-01 | New alerts appear under Your alerts on the Portfolio page, and match `GET /v1/alerts/events` | ALRT-01 | Web | No |
| TC-ALRT-02 | `GET /v1/alerts/channels` names the email, SMS, Microsoft Teams and webhook channels | ALRT-02 | API | No |
| TC-ALRT-03 | An alert reaches each channel, and `GET /v1/alerts/deliveries` records it | ALRT-02 | API | No |
| TC-ALRT-04 | A webhook's signature verifies, and a changed body fails verification | ALRT-02 | API | No |

## API

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-API-01 | A valid Bearer key is accepted | API-01 | API | Yes (api 6) |
| TC-API-02 | The `Basic` scheme returns 401 | API-01 | API | Yes (api 4) |
| TC-API-03 | The `Token` scheme returns 401 | API-01 | API | No |
| TC-API-04 | A missing key returns 401 with code `unauthenticated` on five endpoints | API-02 | API | Yes (api 3) |
| TC-API-05 | An invalid key returns 401 with code `unauthenticated` | API-02 | API | Yes (api 4) |
| TC-API-06 | A missing key returns 401 on every other `/v1` endpoint in the OpenAPI spec | API-02 | API | No |
| TC-API-07 | A 401 and a 404 use the `error` envelope with a stable code and fixed message | API-03 | API | Yes (api 3, api 8) |
| TC-API-08 | A 403, 405, 429 and 503 use the `error` envelope with a stable code and fixed message | API-03 | API | No |
| TC-API-09 | A malformed path or query value returns 422 with `validation_failed` and a `detail` list | API-04 | API | Yes (api 8) |
| TC-API-10 | Closed values are refused with `literal_error`, and `GET /v1/countries/deu` behaves as Stonewake confirms | API-04 | API | No |
| TC-API-11 | A `detail` entry never includes the value sent | API-04 | API | No |
| TC-API-12 | An unknown query parameter returns 422 with type `extra_forbidden` | API-05 | API | No |
| TC-API-13 | `GET /v1/entities` returns `items`, `limit` and `total` | API-06 | API | Yes (api 7) |
| TC-API-14 | `GET /v1/portfolio` accepts a `limit` up to 100, and refuses -1, a non-number and 100000 with 422 | API-04, API-06 | API | Yes (api 5) |
| TC-API-15 | A `limit` of 0 returns 422, and a `limit` of 1 is accepted | API-06 | API | No |
| TC-API-16 | `offset` pages through a list with no gaps or repeats, and `total` stays the same | API-06 | API | No |
| TC-API-17 | Every list endpoint in the OpenAPI spec returns the list shape | API-06 | API | No |
| TC-API-18 | Search refuses a missing `q`, a `q` of one character and a `limit` over its cap, with 422 | API-07 | API | Yes (api 10) |
| TC-API-19 | Search accepts a `limit` of exactly 25 and refuses 26 | API-07 | API | No |
| TC-API-20 | An unknown entity or node returns 404, and an unknown entity returns code `not_found` | API-08 | API | Yes (api 8) |
| TC-API-21 | An unknown id returns 404 with `not_found` on every other detail endpoint | API-08 | API | No |
| TC-API-22 | An unsupported method returns 405 with code `method_not_allowed` | API-09 | API | No |
| TC-API-23 | `/health` needs no key and returns status, app, version and environment | API-10 | API | Yes (api 1) |
| TC-API-24 | `GET /v1/me` returns the credential type, role and team scope | API-11 | API | Yes (api 2) |
| TC-API-25 | The OpenAPI spec lists 74 `/v1` operations, and the only ones that are not GET are the three read-only POST routes | API-12 | API | No |
| TC-API-26 | `POST /v1/citations/resolve` leaves workspace data unchanged | API-12 | API | No |
| TC-API-27 | Responses carry the `x-ratelimit-limit` and `x-ratelimit-remaining` headers | API-13 | API | Yes (api 2) |
| TC-API-28 | Responses carry `RateLimit-Policy`, and it states the ceilings that apply | API-13, API-14 | API | No |
| TC-API-29 | The key is stopped after 120 requests in a minute, or the ceiling `RateLimit-Policy` states | API-14, API-15 | API | No |
| TC-API-30 | Going over a ceiling returns 429 with `retry_after_seconds` | API-15 | API | No |
| TC-API-31 | Stonewake confirms the default of 50,000 requests per workspace per day, and that a workspace can agree its own | API-14 | Review | No |
| TC-API-32 | When a limit cannot be verified, the request is refused with 503 `quota_unavailable` | API-16 | Review | No |
| TC-API-33 | An admin creates a key through `POST /org/api-keys`, and the secret appears only in that response | API-17 | API | No |
| TC-API-34 | A revoked key is refused on its next request, and `POST /org/api-keys/{key_id}/revoke` can repeat safely | API-17 | API | No |
| TC-API-35 | A role other than admin gets 403 from `POST /org/api-keys` | API-17 | API | No |
| TC-API-36 | The security docs confirm that keys are stored hashed | API-17 | Review | No |
| TC-API-37 | A workspace with the API not enabled cannot use a key, and enabling it allows access | API-18 | Review | No |

## MCP

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-MCP-01 | `tools/list` returns the tools without a key, and every tool is read-only | MCP-01 | MCP | No |
| TC-MCP-02 | A `tools/call` that reads workspace data with no key, or a refused key, returns error `-32001` | MCP-02 | MCP | No |
| TC-MCP-03 | A `tools/call` with a valid key returns the data | MCP-02 | MCP | No |
| TC-MCP-04 | An MCP call lowers the same remaining count the API reports for that key | MCP-03 | MCP | No |
| TC-MCP-05 | Tool responses fence Stonewake data between `STONEWAKE_DATA` markers | MCP-04 | MCP | No |

## Exports

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-EXP-01 | `GET /v1/audit-log.csv` returns the documented columns for a date range, for a key with the audit scope | EXP-01 | API | No |
| TC-EXP-02 | `GET /v1/audit-log.csv` returns 403 for a key without the audit scope | EXP-01 | API | No |
| TC-EXP-03 | An admin exports the audit log as CSV from the dashboard | EXP-01, AUTH-09 | Web | No |

## Evidence

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-EVID-01 | Claims sampled from each module show a verified quote or a labelled provider snippet | EVID-01 | Web | No |
| TC-EVID-02 | `POST /v1/citations/resolve` returns the evidence for known ids, and null for unknown ids | EVID-01 | API | No |
| TC-EVID-03 | `POST /v1/citations/resolve` refuses more than 100 ids in a family | EVID-01 | API | No |
| TC-EVID-04 | `GET /v1/sanctions/person-candidates` names the reading of each of the six lists | EVID-02 | API | No |
| TC-EVID-05 | A list that is off or not checked within 48 hours reads Not checked, never clear | EVID-02 | Review | No |

## Decisions

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-DEC-01 | The audit log names no model on any row for credit scoring | DEC-01 | API | No |
| TC-DEC-02 | The sidebar shows Research content is AI assisted | DEC-02 | Web | No |
| TC-DEC-03 | Each piece of AI-assisted content, such as a screening's drafted rationale, is labelled | DEC-02 | Web | No |
| TC-DEC-04 | A corrected review leaves the earlier one in `GET /v1/portfolio/{exposure_id}/reviews`, with the newer record on top | DEC-03 | API | No |
| TC-DEC-05 | An earlier assessment stays readable at `GET /v1/risk-assessments/{assessment_id}` after a newer one replaces it | DEC-03 | API | No |
| TC-DEC-06 | A dismissed or corrected screening keeps its earlier record in the ledger | DEC-03 | Web | No |

## Natural persons

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-PERS-01 | No response schema in the OpenAPI spec has a person-level score, rating or rank | PERS-01 | API | No |
| TC-PERS-02 | A person node returns no score, rating or rank | PERS-01 | API | No |
| TC-PERS-03 | A person screening row has no verdict, assessments, drafted summary or score | PERS-02 | API | No |
| TC-PERS-04 | A person screening page shows no verdict, assessments, drafted summary or score | PERS-02 | Web | No |
| TC-PERS-05 | Where person data is off, a person node returns the same 404 as an unknown id | PERS-03 | API | No |
| TC-PERS-06 | Where person data is off, an ownership chain stops at a person with the stated reason | PERS-03 | API | No |
| TC-PERS-07 | A shared name appears only as a review candidate, which sets no colour or score | PERS-04 | API | No |
| TC-PERS-08 | A candidate records a match only after an analyst confirms it in the dashboard | PERS-04 | Web | No |

## Compliance

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-CMP-01 | `GET /v1/me` shows that a key reads only its team, with `all_teams` false | COMP-01 | API | No |
| TC-CMP-02 | A key cannot read another team's deals, exposures or screenings | COMP-01 | API | No |
| TC-CMP-03 | A user or key in one workspace cannot read data from another workspace | COMP-01 | API | No |
| TC-CMP-04 | Actions on workspace data appear in the audit log, attributed to the acting user | COMP-02 | API | No |
| TC-CMP-05 | The API, MCP and data hosting are confirmed to run on a dedicated server in Finland | COMP-03 | Review | No |
| TC-CMP-06 | The contract and security docs confirm customer data is not used to train models | COMP-04 | Review | No |
| TC-CMP-07 | An accessibility scan of the main dashboard pages and docs finds no WCAG 2.1 AA failures beyond the published gaps | COMP-05 | Web | No |
| TC-CMP-08 | A keyboard and screen reader pass of the main dashboard pages and docs finds no failures beyond the published gaps | COMP-05 | Web | No |

## Product areas with no requirement yet

These features are in the live product, the OpenAPI spec or the [product overview](PRODUCT_DEFINITION.md#product-overview), but the tracker has no requirement for them. Each needs one before its result can count as coverage.

| Case | Test | Requirements | Surface | Automated |
| --- | --- | --- | --- | --- |
| TC-GAP-01 | The Terms of Service link on the login page points to `stonewake.ai/terms` | None | Web | Yes (ui 3) |
| TC-GAP-02 | Change password changes the password, and the old one then stops working | None | Web | No |
| TC-GAP-03 | Report an issue opens and submits | None | Web | No |
| TC-GAP-04 | How it works opens the guide at `/guide` | None | Web | No |
| TC-GAP-05 | The sort options and direction order the book, through `sort` and `direction` on `GET /v1/deals` | None | API | No |
| TC-GAP-06 | A deal's detail and screening rollup return, through `GET /v1/deals/{deal_id}` and `/screening-rollup` | None | API | No |
| TC-GAP-07 | Deal merge suggestions and the party binding queue return, through `/v1/deals/merge/suggestions` and `/v1/deals/parties/binding-queue` | None | API | No |
| TC-GAP-08 | `GET /v1/tenders/profiles`, `GET /v1/tenders/matches/{match_id}` and `GET /v1/tenders/deals/{deal_id}` return tender data for the team | None | API | No |
| TC-GAP-09 | `GET /v1/geography/summary` and `/events` agree with the deal book | None | API | No |
| TC-GAP-10 | Company data returns for a company node: `company`, `records`, `financials`, `financials/coverage`, `energy-emissions`, `events`, `sector-context`, `regional-context`, `financing`, `public-funding` and `collateral-sites` under `/v1/nodes/{node_id}` | None | API | No |
| TC-GAP-11 | `GET /v1/nodes/{node_id}`, `/risk` and `GET /v1/entities/{node_id}/risk` return a company's detail and risk | None | API | No |
| TC-GAP-12 | `GET /v1/risk-profiles` and `/{version}` return each saved credit rubric | None | API | No |
| TC-GAP-13 | `GET /v1/runs` and `/{run_id}` return research runs for the teams the caller reads | None | API | No |
| TC-GAP-14 | `GET /v1/developments` returns only findings the verifier supports | None | API | No |
| TC-GAP-15 | `GET /v1/monitoring/catalog`, `/sources` and `GET /v1/watches` return the source catalog, sources and register watches | None | API | No |
| TC-GAP-16 | `GET /v1/news/companies` and `/{node_id}` return the daily news reading for book companies | None | API | No |
| TC-GAP-17 | `GET /v1/social/companies`, `/social/companies/{node_id}`, `/social/names` and `/social/names/{target_id}` return the daily social reading | None | API | No |
| TC-GAP-18 | `GET /v1/licensed-data/facts` names each value's provider, source page and read time | None | API | No |
| TC-GAP-19 | `GET /v1/reference/datasets` lists each dataset with its licence and attribution | None | API | No |
| TC-GAP-20 | `/signals` and `/reports` behave as Stonewake confirms | None | Web | No |
| TC-GAP-21 | `GET /v1/screenings` filters by subject, and `GET /v1/screenings/{screening_id}` returns its result | None | API | No |
| TC-GAP-22 | Institution and company reports are valid files: `/v1/entities/{entity_id}/report.pdf` and `pack.pdf`, and `/v1/nodes/{node_id}/profile.pdf` and `risk-deck.pptx` | None | API | No |
| TC-GAP-23 | `GET /org/api-keys` lists keys without their secrets | None | API | No |
| TC-GAP-24 | A dossier downloads as a valid PDF | None | Web | No |
| TC-GAP-25 | The Settings page opens from the sidebar for each role | None | Web | No |
| TC-GAP-26 | The docs site's pages load, its internal links work, and it links to the OpenAPI spec | None | Web | No |
| TC-GAP-27 | The public site's pages load, including the terms page and `llms.txt` | None | Web | No |
| TC-GAP-28 | The Stonewake Monitoring public news briefs load | None | Web | No |
