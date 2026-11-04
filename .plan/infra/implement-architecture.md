# infra/implement-architecture

## Goal

Bring the repository to the target structure in [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md), with the existing 20 tests moved onto it.

## Build order

One agent builds each folder. Each layer is built after the layers it imports from.

1. Root config: `tsconfig.json`, `eslint.config.mjs`, Prettier, `playwright.config.ts`, `.env.example`, `.gitignore`, npm scripts.
2. `src/core`, and `.github/workflows`.
3. `src/config`, `src/utils`.
4. `src/api`, `src/web`.
5. `src/factories`, `src/fixtures`.
6. `tests`: split the specs by feature and delete `tests/api.spec.ts` and `tests/ui.spec.ts`.

## Decisions

- **One branch for the whole structure.** Each layer depends on the one before it, so separate branches could not each start from `master`.
- **`.env` loads with `process.loadEnvFile`** in `src/config`, so no `dotenv` dependency. A missing file is not an error, because CI has none.
- **Config values are read lazily** and throw a clear error when missing, so an API run doesn't need the login variables.
- **Each layer has an `index.ts`** and is imported through a path alias, such as `@core`. ESLint enforces the dependency rules on these aliases.
- **Only what the existing tests use is built.** Clients and page objects for other endpoints and pages come with the tests that need them.
- **Tests marked `Fix test` in the tracker are corrected** to the behaviour the tracker and the live product agree on. Any other failure stays failing and is reported.
- **`test-data/` stays empty** until a test needs a fixed file.

## Out of scope

- `infra/untrack-generated-files`: removing `.env`, `node_modules/` and reports from git.
- From `infra/use-env-credentials`: creating the GitHub secrets, rotating the key and password, and the README note on forks.
