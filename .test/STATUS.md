# Test status

Tracks test executions, in the same way [.plan/](../.plan/BACKLOG.md) tracks tasks. Each execution has its own file in [executions/](executions/) with the full result of every test, and this file is the index: it lists the executions and holds the latest result of each test.

The requirement tracker's [Status column](../docs/PRODUCT_DEFINITION.md#how-to-use-the-tracker) says whether a requirement is covered. These files say what happened when the tests ran.

```
.test/
  STATUS.md                     index of executions and the latest result of each test
  TEMPLATE.md                   copy this for a new execution
  executions/
    execution-001.md            one file per execution
```

## Recording an execution

After every run, locally or in CI:

1. Run `npm test`, or one surface with `npx playwright test --project=api` or `--project=web`.
2. Copy [TEMPLATE.md](TEMPLATE.md) to `executions/execution-NNN.md`, using the next number, and fill it in.
3. Add a row for it to the Executions table below.
4. Update Latest result, Last execution and Notes for every test the execution ran.
5. Commit all three changes together.

Result values: Passing, Failing, Blocked, or Not run if no execution has run the test.

## Executions

| Execution | Date | Where | Command | Passed | Failed | Blocked | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| None yet | | | | | | | |

## Latest results

| Test ID | Spec | Requirements | Latest result | Last execution | Notes |
| --- | --- | --- | --- | --- | --- |
| api 1 | [health.api.spec.ts](../tests/api/health.api.spec.ts) | API-10 | Not run | | |
| api 2 | [me.api.spec.ts](../tests/api/me.api.spec.ts) | API-01, API-11, API-13 | Not run | | |
| api 3 | [auth.api.spec.ts](../tests/auth/auth.api.spec.ts) | API-02, API-03 | Not run | | |
| api 4 | [auth.api.spec.ts](../tests/auth/auth.api.spec.ts) | API-01, API-02 | Not run | | |
| api 5 | [portfolio.api.spec.ts](../tests/portfolio/portfolio.api.spec.ts) | API-04, API-06 | Not run | | |
| api 6 | [portfolio.api.spec.ts](../tests/portfolio/portfolio.api.spec.ts) | PORT-01, PORT-02 | Not run | | |
| api 7 | [institutions.api.spec.ts](../tests/institutions/institutions.api.spec.ts) | INST-01, API-06 | Not run | | |
| api 8 | [institutions.api.spec.ts](../tests/institutions/institutions.api.spec.ts) | API-03, API-04, API-08 | Not run | | |
| api 9 | [countries.api.spec.ts](../tests/countries/countries.api.spec.ts) | CTRY-01, CTRY-02, CTRY-08 | Not run | | |
| api 10 | [network.api.spec.ts](../tests/network/network.api.spec.ts) | NET-01, API-07 | Not run | | |
| ui 1 | [auth.web.spec.ts](../tests/auth/auth.web.spec.ts) | AUTH-04 | Not run | | |
| ui 2 | [auth.web.spec.ts](../tests/auth/auth.web.spec.ts) | AUTH-03 | Not run | | |
| ui 3 | [auth.web.spec.ts](../tests/auth/auth.web.spec.ts) | AUTH-02 | Not run | | |
| ui 4 | [auth.web.spec.ts](../tests/auth/auth.web.spec.ts) | AUTH-01 | Not run | | |
| ui 5 | [auth.web.spec.ts](../tests/auth/auth.web.spec.ts) | AUTH-05 | Not run | | |
| ui 6 | [navigation.web.spec.ts](../tests/navigation/navigation.web.spec.ts) | NAV-01 | Not run | | |
| ui 7 | [deal-book.web.spec.ts](../tests/deal-book/deal-book.web.spec.ts) | DEAL-06, DEAL-10 | Not run | | |
| ui 8 | [countries.web.spec.ts](../tests/countries/countries.web.spec.ts) | CTRY-06, CTRY-07, CTRY-08 | Not run | | |
| ui 9 | [institutions.web.spec.ts](../tests/institutions/institutions.web.spec.ts) | INST-01 | Not run | | |
| ui 10 | [portfolio.web.spec.ts](../tests/portfolio/portfolio.web.spec.ts) | PORT-01, PORT-15 | Not run | | |
