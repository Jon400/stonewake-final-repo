# Architecture

This document describes the target architecture of the Stonewake test automation project, which covers the API and the web dashboard. The repository does not fully match it yet. See [Changes needed to reach this architecture](#changes-needed-to-reach-this-architecture).

## Tech stack

| Area | Choice | Status |
| --- | --- | --- |
| Version control | Git, with GitHub for cloud hosting | In place |
| CI | GitHub Actions | In place |
| Test framework | Playwright Test | In place |
| Programming language | TypeScript | In place, no `tsconfig.json` yet |
| Runtime and package manager | Node.js 22 and npm | In place |
| Browser | Chromium | In place |
| Linting and formatting | ESLint and Prettier | Planned |

## Repository structure

```text
.github/workflows/      CI pipeline
artifacts/              Generated test output, not committed
docs/                   Project documentation
src/                    Source code of the automation infrastructure
  api/
    clients/            One client per API resource
    models/             Request and response types
  web/
    pages/              Page objects, one per dashboard page
    components/         Shared UI parts, such as the sidebar and tables
    labels/             Visible UI text, in English
  config/               Environment variables, URLs and timeouts
  core/                 Code shared across the repository
    enums.ts            Fixed values, such as roles and exposure statuses
    errors.ts           Error codes the API documents
    exceptions.ts       Custom classes the automation code throws
    models/             Types shared by the API and web layers
  factories/            Data factories that build test input
  fixtures/             Playwright fixtures, which give specs ready-to-use pages and clients
  utils/                Wrappers around libraries, and helper classes
test-data/              Static test data, stored as needed
tests/                  Test specs, grouped by feature
playwright.config.ts    Playwright configuration
.gitignore              Files git does not track, such as `node_modules/` and `artifacts/`
```

## Test layout

Specs are grouped by product feature, with API and web specs side by side. The file suffix shows which surface a spec tests.

```text
tests/
  countries/
    countries.api.spec.ts
    countries.web.spec.ts
  portfolio/
    portfolio.api.spec.ts
    portfolio.web.spec.ts
```

- Feature folders follow the areas in the [requirements tracker](PRODUCT_DEFINITION.md#requirements), such as `auth`, `deal-book` and `countries`.
- A separate Playwright project for each suffix (`api` and `web`) lets each surface run on its own, so API runs don't need a browser.

## Dependency rules

Each layer may import only from the layers listed for it.

| Layer | May import from |
| --- | --- |
| `tests` | `fixtures`, `factories`, `web/labels`, `api/models`, `core`, `test-data` |
| `fixtures` | `api`, `web`, `config`, `core`, `utils` |
| `api/clients` | `api/models`, `config`, `core`, `utils` |
| `api/models` | `core` |
| `web/pages` | `web/components`, `web/labels`, `core`, `utils` |
| `web/components` | `web/labels`, `core`, `utils` |
| `web/labels` | `core` |
| `factories` | `api/models`, `core`, `utils` |
| `config` | `core` |
| `utils` | `core` |
| `core` | Nothing |

These rules apply alongside them:

- Types used only for API requests and responses go in `api/models`. Types that both the API and web layers use go in `core/models`.
- Specs get pages and clients from fixtures, and don't create them directly.
- Specs hold the assertions. Page objects and clients perform actions and return results.
- Page objects don't call API clients. If a web test needs API setup, it happens in a fixture.
- Selectors stay inside `web/pages` and `web/components`, and never appear in specs.
- UI text comes from `web/labels`, so a wording change is fixed in one place. Tests run with the dashboard in English only.

## Test data

- `src/factories` builds input in code, for values that vary between tests.
- `test-data/` stores fixed input, such as CSV files for upload tests.
- Enter public information only: no bank figures, client data or confidential information, and no personal data beyond your own account details. This is the [product's test data rule](PRODUCT_DEFINITION.md#product-overview).

## Test sources

Tests are written from these sources:

| Source | Used for | Location |
| --- | --- | --- |
| API documentation | API clients, models and expected behaviour | [API reference](https://docs.stonewake.ai/v1) and [OpenAPI spec](https://api.stonewake.ai/openapi.json) |
| HTML and element layout | Page objects, components and selectors | [Live dashboard](https://app.stonewake.ai) |
| Requirements tracker | What to test, and its priority | [PRODUCT_DEFINITION.md](PRODUCT_DEFINITION.md) |

## Secrets and environments

Configuration comes from environment variables, and only `src/config` reads them.

| Variable | Purpose |
| --- | --- |
| `STONEWAKE_APP_URL` | Dashboard URL |
| `STONEWAKE_API_URL` | API URL |
| `STONEWAKE_EMAIL` | Test account email |
| `STONEWAKE_PASSWORD` | Test account password |
| `STONEWAKE_API_KEY` | API key |

- **Local runs:** values come from a `.env` file, which is never committed. A committed `.env.example` lists the variable names with no values.
- **CI:** values come from GitHub Secrets, which the workflow passes to the test step.

## Logging

- Logging goes to the console, through a small logger in `src/utils`, so it appears in the terminal and the CI job log.
- Log the steps that help explain a failure, such as API requests with their response status, and test data setup.
- Never log passwords, API keys or authorization headers.

## Runtime and reporting

| Setting | Value |
| --- | --- |
| Reporters | `list` for the console, and `html` for the full report |
| Traces | Kept for failed tests |
| Screenshots | Taken for failed tests |
| Workers | 2 |
| Test timeout | 30 seconds |
| CI triggers | Manual runs and a daily schedule (06:00 UTC). Not on pull requests or pushes |
| CI artifact retention | 14 days |
| CI report | Published to GitHub Pages after each run on `master` |

All generated output goes to a single `artifacts/` folder, which is not committed. CI uploads the HTML report from it, and publishes it to GitHub Pages from `master`.

```text
artifacts/
  playwright-report/    HTML report
  test-results/         Traces and screenshots
```

## Future additions

The product also has an MCP server at `mcp.stonewake.ai` (requirements MCP-01 to MCP-04), which this architecture doesn't cover yet. When MCP tests are picked up, they get their own `src/mcp` folder with clients and models, and a `*.mcp.spec.ts` suffix.

## Changes needed to reach this architecture

| Area | Current state | Target |
| --- | --- | --- |
| Source code | No `src/` or `test-data/` folder | The structure above |
| Specs | `tests/api.spec.ts` and `tests/ui.spec.ts` | Split by feature |
| Playwright config | One project, default output folders | `api` and `web` projects, output to `artifacts/` |
| TypeScript | No `tsconfig.json` | Add one |
| Linting and formatting | Not installed | Add ESLint and Prettier |
| Environment loading | Nothing loads `.env` | `src/config` loads it |
| CI secrets | The workflow passes no variables | Pass them from GitHub Secrets |
| CI report upload | Uploads `playwright-report/` | Upload from `artifacts/` |
| Committed files | `.env`, `node_modules/` and reports are tracked | Remove them from git and add them to `.gitignore` |
