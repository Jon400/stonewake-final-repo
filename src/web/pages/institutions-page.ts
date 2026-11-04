import type { Locator, Page } from '@playwright/test'
import { headings, institutionsLabels, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class InstitutionsPage extends BasePage {
  readonly path = routes.institutions
  readonly expectedTitle = pageTitles.institutions
  readonly expectedHeading = headings.institutions

  readonly searchInput: Locator
  readonly kindFilter: Locator
  readonly countryFilter: Locator
  readonly institutionLinks: Locator

  constructor(page: Page) {
    super(page)
    const main = page.getByRole('main')
    this.searchInput = main.getByRole('textbox', { name: institutionsLabels.search })
    this.kindFilter = main.getByRole('combobox', { name: institutionsLabels.kindFilter })
    this.countryFilter = main.getByRole('combobox', { name: institutionsLabels.countryFilter })
    this.institutionLinks = main.getByRole('table').getByRole('link')
  }

  /** The list link to one institution, found by part of its name such as UKEF. */
  institutionLink(name: string): Locator {
    return this.institutionLinks.filter({ hasText: name })
  }

  async search(text: string): Promise<void> {
    await this.searchInput.fill(text)
  }

  /** Opens an institution from the list and waits for its page. */
  async openInstitution(name: string): Promise<void> {
    await this.institutionLink(name).first().click()
    await this.page.waitForURL(/\/entities\/\d+$/)
  }
}
