# Test Data

Applies to `src/factories`, `test-data/` and anything a test sends to Stonewake.

- Enter public information only: no bank figures, client data or confidential information, and no personal data beyond your own account details. This is the [product's test data rule](../../docs/PRODUCT_DEFINITION.md#product-overview).
- `src/factories` builds input in code, for values that vary between tests.
- `test-data/<feature>/` stores fixed input, such as CSV files for upload tests, and specs import it through `@test-data/*`. Add a file only when a test needs it.
- Credentials and URLs are not test data. They come from environment variables, and only `src/config` reads them. Deliberately invalid values, such as a wrong password or a malformed key, belong in a factory.
- The API can't set up data, because no `/v1` endpoint creates, changes or deletes workspace data (API-12). Tests work with what the workspace already holds.
- Find workspace data at run time, through a client or page object, instead of hard-coding its id or name, because deals and exposures change. Public reference values that don't depend on the workspace, such as the country code `DEU`, can be fixed.
- A web test that changes workspace data, such as following a deal or adding a company to the book, undoes the change in fixture teardown.
- Name anything a test creates with the run prefix `qa-<runId>-`, built by a factory, so it can be told apart from real data.
- Never change or remove workspace data that a test didn't add or change itself.
- Don't write tests that record assessments or reviews without agreeing it first. These records are append-only (DEC-03), so teardown can't undo them.
- Tests are independent: no test relies on another test's data or on execution order.
