# infra/use-env-credentials

## Goal

Tests read credentials and URLs from environment variables, so no secret is written in the code.

## Current state

- `tests/api.spec.ts` hardcodes the API key in `KEY`.
- `tests/ui.spec.ts` hardcodes the login in `EMAIL` and `PASS`.
- The spec files hardcode the app and API URLs.
- `.env` already defines all five variables below, but nothing loads it.
- The CI workflow passes no secrets to the tests.

| Variable             | Replaces                |
| -------------------- | ----------------------- |
| `STONEWAKE_APP_URL`  | Hardcoded app URL       |
| `STONEWAKE_API_URL`  | Hardcoded API URL       |
| `STONEWAKE_EMAIL`    | `EMAIL` in ui.spec.ts   |
| `STONEWAKE_PASSWORD` | `PASS` in ui.spec.ts    |
| `STONEWAKE_API_KEY`  | `KEY` in api.spec.ts    |

## Steps

1. Load `.env` in `playwright.config.ts` when the file exists. CI has no `.env` once `infra/untrack-generated-files` is done, so a missing file must not be an error.
2. Fail with a clear message if a required variable is missing, rather than letting tests fail confusingly.
3. Replace the hardcoded values in both spec files.
4. Add `.env.example` with the variable names and no values.
5. Add the variables as GitHub Actions secrets, and pass them to the test step in `.github/workflows/playwright.yml`.
6. Run the tests locally and in CI.
7. Rotate the API key and password, because the old values remain in git history. Update `.env` and the GitHub secrets.

## Notes

- Secrets aren't passed to workflows triggered by pull requests from forks. The README tells people to work in forks, so each fork needs its own secrets, and the README should say so.
- Do this before `infra/untrack-generated-files`, so that `.env` stays available until the tests depend on the new setup.
- Rotating the credentials may need someone with access to the Stonewake account.

## Open question

- Should the old secrets also be removed from git history? Rotating makes them useless, and rewriting history would disrupt existing forks.
