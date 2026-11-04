import type { Locator, Page } from '@playwright/test'
import { countriesLabels, headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class CountriesPage extends BasePage {
  readonly path = routes.countries
  readonly expectedTitle = pageTitles.countries
  readonly expectedHeading = headings.countries

  readonly searchInput: Locator
  /** Links to countries in the table. Deal counts in region rows are links too, but numeric. */
  readonly countryLinks: Locator
  readonly noMatchesMessage: Locator

  constructor(page: Page) {
    super(page)
    const main = page.getByRole('main')
    this.searchInput = main.getByRole('textbox', { name: countriesLabels.search })
    this.countryLinks = main.getByRole('table').getByRole('link', { name: /^\D/ })
    this.noMatchesMessage = main.getByText(countriesLabels.noMatches, { exact: true })
  }

  /** The table link to one country, by its name such as Germany. */
  countryLink(name: string): Locator {
    return this.countryLinks.filter({ hasText: name })
  }

  async search(text: string): Promise<void> {
    await this.searchInput.fill(text)
  }

  /** Opens a country from the table, found by its name such as Germany. */
  async openCountry(name: string): Promise<void> {
    await this.countryLink(name).first().click()
    await this.page.waitForURL(/\/countries\/[A-Z]{3}$/)
  }
}
