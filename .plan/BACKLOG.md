# Backlog

Workflow and format: see [CLAUDE.md](../CLAUDE.md).

Status: `[ ]` todo, `[~]` in progress, `[x]` done

## infra

- [ ] infra/use-env-credentials: move the credentials hardcoded in the spec files to env vars, then rotate them ([plan](infra/use-env-credentials.md))
- [x] infra/untrack-generated-files: stop tracking .env, node_modules, playwright-report and test-results, and add them to .gitignore (do after infra/use-env-credentials)
- [x] infra/implement-architecture: build the src/ structure, tooling and CI from docs/ARCHITECTURE.md, and move the existing tests onto it ([plan](infra/implement-architecture.md))
- [x] infra/publish-report-to-pages: rename the CI workflow to run-tests and publish the HTML report to GitHub Pages on every run on master
- [ ] infra/lint-spec-selectors: add an ESLint rule that blocks `page.locator`, `getBy*` and `request.*` in specs, which .claude/rules/locator.md forbids but nothing enforces
- [ ] infra/align-semicolon-style: resolve the conflict between .claude/rules/code-style.md, which bans trailing semicolons, and .prettierrc.json and src/core, which use them

## test

## docs

- [x] docs/add-ai-usage-readme: add an AI usage section to README.md
- [x] docs/add-docs-to-ai-usage: list the docs/ files and the AI's part in each in the AI usage section of README.md

- [x] docs/add-project-docs: commit the docs/ folder, which is currently untracked (GLOSSARY.md goes in docs/write-glossary)
- [x] docs/write-test-plan: write docs/TEST_PLAN.md, which is currently empty
- [x] docs/add-test-status-tracker: add a .test/ folder with STATUS.md, which tracks the last execution result of each automated test
- [ ] docs/add-missing-requirements: add tracker requirements for the TC-GAP product areas in docs/TEST_PLAN.md, which have none yet
- [x] docs/write-glossary: write docs/GLOSSARY.md, which is currently empty
- [ ] docs/align-tracker-deal-terms: align the wording of DEAL-01 and DEAL-07 with the docs' financing window and stage terms
- [x] docs/add-use-env-credentials-plan: commit the expanded plan for infra/use-env-credentials, which is currently untracked
- [x] docs/add-git-workflow-rule: write .claude/rules/git-workflow.md from the workflow in CLAUDE.md
- [x] docs/align-rules-with-architecture: rewrite the naming, locator and test-data rules, copied from another project, to match docs/ARCHITECTURE.md
