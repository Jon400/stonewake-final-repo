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
