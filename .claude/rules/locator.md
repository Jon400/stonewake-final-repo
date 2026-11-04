# Locators

Applies to page objects in `src/web/pages` and components in `src/web/components`. The docs call these selectors. In code, each one is a Playwright `Locator`.

- Selectors live only in page objects and components. Specs never call `page.locator`, `getBy*` or `request.*`. They get pages and clients from fixtures, as the [dependency rules](../../docs/ARCHITECTURE.md#dependency-rules) describe.
- Take selectors from the [live dashboard](https://app.stonewake.ai), not from older specs, because the product changes often.
- Priority: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTestId`. Most dashboard controls have a role and accessible name, so that is the default.
- Use `getByTestId` only where nothing above identifies the element, such as the Portfolio status tiles (`tile-red`), which have no role.
- No XPath, no CSS selectors tied to layout or styling classes, and no attributes that serve another feature, such as `data-tour`. Instead of `#app-sidebar a[data-tour="module-countries"]`, use the link's role and name inside the sidebar.
- Visible text comes from `src/web/labels`, in English, because tests run with the dashboard in English only. Page objects, components and specs import it from there, and don't write it as string literals.
- Scope a locator to its region (`this.sidebar.root.getByRole(...)`) instead of making it page-global.
- Use `exact: true` when a name is part of another. The login page has links named Terms, Terms of Service and Evaluation Terms.
- Components hold only the UI parts that pages share. Anything specific to one page stays in its page object.
