# Naming

Applies to files, folders, classes, fixtures, test IDs and tags. The structure these names fit into is in [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).

## Domain terms

- Use the term from [docs/GLOSSARY.md](../../docs/GLOSSARY.md), never a synonym: `workspace`, never `tenant` or `org`; `dashboard`, never `frontend`.
- Add a new shared term to the glossary before using it broadly, and never introduce a second word for a concept that already has one.
- Check the glossary's [terms with more than one meaning](../../docs/GLOSSARY.md#terms-with-more-than-one-meaning), and name which one you mean: `dealScore` or `riskScore`, not `score`. `entity` and `node` are not interchangeable.
- Each surface keeps its own word. The dashboard's Institutions page is served at `/entities`, and the API resource is `/v1/entities`, so the classes are `InstitutionsPage` and `EntitiesClient`.
- Do not rename Stonewake's own identifiers: `/v1/*` routes, JSON fields (`team_scope`, `display_name`), closed values (`not_assessed`) and roles (`viewer`, `analyst`, `compliance`, `admin`) are used exactly as Stonewake serves them.

## Files and folders

Files are kebab-case and say what they hold. Keep the folder names from the architecture: the dashboard layer is `src/web`, never `src/ui`.

| Holds | Location | File | Name in code |
| --- | --- | --- | --- |
| Spec | `tests/<feature>/` | `countries.api.spec.ts`, `countries.web.spec.ts` | |
| API client | `src/api/clients/` | `countries-client.ts` | `CountriesClient` |
| API model | `src/api/models/` | `country.ts` | `Country` |
| Page object | `src/web/pages/` | `login-page.ts` | `LoginPage` |
| Component | `src/web/components/` | `sidebar.ts` | `Sidebar` |
| Labels | `src/web/labels/` | `login.ts` | `loginLabels` |
| Data factory | `src/factories/` | `credentials-factory.ts` | `buildCredentials` |
| Fixed test data | `test-data/<feature>/` | `book-import.csv` | |

- Feature folders are kebab-case and follow the areas in the [requirements tracker](../../docs/PRODUCT_DEFINITION.md#requirements): `auth`, `deal-book`, `countries`.
- The spec suffix is the surface: `api` or `web`. `mcp` is reserved for the [future MCP tests](../../docs/ARCHITECTURE.md#future-additions).
- A client is named for its API resource, and a page object for its dashboard page. `CountriesPage` is the list and `CountryPage` is one country's profile.

## Code

- Classes are PascalCase with their role as a suffix: `LoginPage`, `PortfolioClient`. Components are named for the UI part: `Sidebar`, `DataTable`.
- Fixtures are camelCase and named for what they give the spec: `loginPage`, `portfolioClient`.
- Fixed values in `src/core/enums.ts` have a singular PascalCase name and keys, and keep the served string as the value: `ExposureStatus.NotAssessed` is `'not_assessed'`.
- Classes in `src/core/exceptions.ts` end in `Error`: `ConfigError`.
- Environment variables are `STONEWAKE_<NAME>`, in upper case. The list is in the [architecture](../../docs/ARCHITECTURE.md#secrets-and-environments).

## IDs and tags

- Requirement ID: `<AREA>-NN`, as the tracker gives it (`AUTH-01`, `CTRY-08`).
- Test ID: the value in the tracker's Test column (`ui 6`, `api 9`). It starts the test title, as in `ui 6 sidebar`, and it stays the same when the test moves to another file, so the tracker stays correct.
- Tags: none are defined. The `api` and `web` Playwright projects separate the surfaces. Add a tag here, with what it means, before using it.
- Branch and task names follow [git-workflow.md](git-workflow.md).
