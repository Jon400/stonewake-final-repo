# Stonewake Test Automation

This is the test automation project for **Stonewake**, our product. It contains API and UI tests written with [Playwright](https://playwright.dev).

- **App:** https://app.stonewake.ai
- **API:** https://api.stonewake.ai
- **Documentation:** https://docs.stonewake.ai (quickstart, API reference and OpenAPI spec)

## Getting started

### Fork this repository

Don't work in this repository directly. First, **fork** it to your own GitHub account and do all your work in your fork.

Not sure what a fork is? Read GitHub's guides:
- [About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)
- [Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

### Prerequisites

- [Node.js](https://nodejs.org) 22 or later (CI uses 22), with npm
- [Git](https://git-scm.com)
- A Stonewake account with an API key, for the credentials below
- Internet access to the app and API. The tests run against the live product.

### Set up

```
npm ci
npx playwright install chromium
cp .env.example .env
```

Then fill in `.env`. Credentials and URLs come only from these environment variables, and `.env` is git-ignored:

| Variable | What it holds |
| --- | --- |
| `STONEWAKE_APP_URL` | Dashboard URL, `https://app.stonewake.ai` |
| `STONEWAKE_API_URL` | API URL, `https://api.stonewake.ai` |
| `STONEWAKE_EMAIL` | Email of the test account |
| `STONEWAKE_PASSWORD` | Password of the test account |
| `STONEWAKE_API_KEY` | API key of the test account |

### Run the tests locally

| Command | What it does |
| --- | --- |
| `npm test` | Runs all tests, API and web |
| `npm run test:api` | Runs the `api` project only |
| `npm run test:web` | Runs the `web` project only |
| `npx playwright test tests/auth` | Runs one feature folder |
| `npx playwright test --headed` | Shows the browser for web tests |
| `npx playwright test --ui` | Opens Playwright's UI mode |

Checks that CI also runs: `npm run typecheck`, `npm run lint` and `npm run format:check`. `npm run format` fixes formatting.

After a run, open the HTML report with `npx playwright show-report artifacts/playwright-report`. Traces and screenshots of failures are in `artifacts/test-results/`.

### Run the tests on GitHub

The [Run Tests workflow](.github/workflows/run-tests.yml) runs on demand and on a daily cron (06:00 UTC). It does not run on pull requests or pushes.

One-time setup in your fork:

1. **Settings > Secrets and variables > Actions:** add the five `STONEWAKE_*` variables above as repository secrets.
2. **Settings > Pages:** set **Source** to **GitHub Actions**.

To run it: open the **Actions** tab, choose **Run Tests**, click **Run workflow**, and pick `master`.

### View the report on GitHub Pages

Every run on `master` publishes the HTML report to GitHub Pages, at `https://<your-github-user>.github.io/<repository-name>/`. For the `Jon400` fork this is https://jon400.github.io/stonewake-final-repo/. The latest run replaces the previous report.

Runs on other branches don't publish to Pages. Download their report instead, from the run's **Artifacts** section (`playwright-report`, kept for 14 days), unzip it, and open it with `npx playwright show-report <folder>`.

## Architecture

The tests cover two surfaces, the API and the web dashboard, and share one layered code base. The full description is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

```text
src/
  api/        clients (one per API resource) and models (request and response types)
  web/        pages (one per dashboard page), components (shared UI parts) and labels (UI text)
  config/     the only place that reads environment variables
  core/       enums, API error codes, exceptions and shared types
  factories/  build test input in code
  fixtures/   Playwright fixtures that hand specs ready-to-use pages and clients
  utils/      logger and other helpers
test-data/    fixed input files, such as CSVs
tests/        specs, grouped by feature, e.g. tests/countries/countries.api.spec.ts
```

How the layers fit together:

- **Specs only assert.** They get pages and clients from fixtures, and never create them or use selectors or raw requests directly.
- **Page objects and clients do the work.** Pages hold the selectors and perform actions in the dashboard. Clients call the API. Neither is allowed to call the other.
- **Layers import only downwards.** For example `web/pages` may use `web/components`, `web/labels` and `core`, but never `api`. `core` imports nothing. The allowed imports for each layer are in the [dependency rules](docs/ARCHITECTURE.md#dependency-rules).
- **One place for each thing.** UI text lives in `web/labels`, configuration in `config`, and test input in `factories` or `test-data`.
- **Two Playwright projects.** Specs ending in `.api.spec.ts` run in the `api` project, which needs no browser. Specs ending in `.web.spec.ts` run in the `web` project. A future `*.mcp.spec.ts` suffix is reserved for the MCP server.
- **Output** goes to `artifacts/`: the HTML report in `playwright-report/`, and traces and screenshots of failures in `test-results/`.

The rest of the docs: [test plan](docs/TEST_PLAN.md), [product definition and requirements tracker](docs/PRODUCT_DEFINITION.md) and [glossary](docs/GLOSSARY.md).

## AI usage

This project was built with [Claude Code](https://claude.com/claude-code), Anthropic's AI coding agent, working alongside a human who set the direction and reviewed every change.

### Prompts

The prompts given to the AI were short task requests, one per backlog task. Examples:

- "Please add to README.md the AI Usage section and mention the prompts given, the contribution of the AI and the AI flows built."
- Requests to write the project docs (test plan, architecture, product definition, glossary), the git workflow rule and the backlog.
- Requests to build the `src/` structure, tooling and CI from `docs/ARCHITECTURE.md` and to move the existing specs onto it.

> Add the exact wording of your other prompts here. Only this session's prompt is recorded above, because earlier sessions are not available to the AI.

### What the AI contributed

- Documentation: drafts of the test plan, architecture, glossary and the rule files in `.claude/rules/`.
- Test framework: the `src/` layout (clients, models, page objects, components, labels, factories, config) and the Playwright, ESLint, Prettier and TypeScript setup.
- Tests: API and UI specs under `tests/`, grouped by feature.
- Planning: the backlog and expanded plans in `.plan/`.

### Docs written with the AI

| Doc | What it holds | AI's part |
| --- | --- | --- |
| [docs/PRODUCT_DEFINITION.md](docs/PRODUCT_DEFINITION.md) | Product overview and the requirements tracker | Structured the product's requirements into the tracker. |
| [docs/TEST_PLAN.md](docs/TEST_PLAN.md) | Every test needed to cover the product, each tied to a requirement | Drafted the plan from the tracker and the OpenAPI spec. |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Layers, dependency rules, secrets and environments | Drafted it, then built `src/` from it. |
| [docs/GLOSSARY.md](docs/GLOSSARY.md) | The domain terms the code and docs use | Drafted the terms and the terms with more than one meaning. |

The human owns the decisions: scope, requirements, which tests to write, credentials, and merging pull requests. AI output is reviewed before it is committed.

### MCP usage

MCP (Model Context Protocol) appears in this project in two ways:

- **Playwright MCP, while building the tests.** The AI can drive a browser through the Playwright MCP server to read the [live dashboard](https://app.stonewake.ai), because the [locator rule](.claude/rules/locator.md) takes selectors from the live dashboard and not from older specs. Its output goes to `.playwright-mcp/`, which is git-ignored.
- **Stonewake MCP server, as a surface under test.** The product has an MCP server at `mcp.stonewake.ai` that lets AI assistants read a workspace with an API key (requirements `MCP-01` to `MCP-04`). The [test plan](docs/TEST_PLAN.md#mcp) lists five MCP tests (`TC-MCP-01` to `TC-MCP-05`), and none is automated yet. When they are, they get a `src/mcp` folder and `*.mcp.spec.ts` specs, as the [architecture](docs/ARCHITECTURE.md#future-additions) describes.

No MCP server is configured in the repository itself.

### AI flows built

These are the repeatable flows that guide the AI in this repository:

| Flow | Where | What it does |
| --- | --- | --- |
| Task workflow | `CLAUDE.md`, `.claude/rules/git-workflow.md`, `.plan/` | Each piece of work is a backlog task with its own `infra/`, `test/` or `docs/` branch, an optional expanded plan, and a pull request to `master`. |
| Code style rule | `.claude/rules/code-style.md` | No trailing semicolons. |
| Locator rule | `.claude/rules/locator.md` | Selectors only in page objects and components, in a fixed priority, with text taken from `src/web/labels`. |
| Naming rule | `.claude/rules/naming.md` | Glossary terms, file and class names, test IDs from the requirements tracker. |
| Test data rule | `.claude/rules/test-data.md` | Public data only, credentials from environment variables, tests undo their changes and stay independent. |
| Memory | Claude Code's project memory | Keeps standing preferences, such as opening pull requests only in the fork. |
