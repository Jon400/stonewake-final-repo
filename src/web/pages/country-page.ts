import type { Locator, Page } from '@playwright/test'
import { headings, pageTitles, routes, sections } from '@web/labels'
import { BasePage } from './base-page'

/** A country page. The heading is the country name, so it varies. */
export class CountryPage extends BasePage {
  readonly path = routes.countries
  readonly expectedTitle = pageTitles.country
  readonly expectedHeading = headings.countries

  readonly countryRiskHeading: Locator
  readonly dataSourcesHeading: Locator

  constructor(page: Page) {
    super(page)
    this.countryRiskHeading = this.section(sections.country.countryRisk)
    this.dataSourcesHeading = this.section(sections.country.dataSources)
  }

  private section(name: string): Locator {
    return this.page.getByRole('heading', { level: 2, name, exact: true })
  }

  /** Opens the page of the country with the given ISO alpha-3 code, such as DEU. */
  async openByCode(code: string): Promise<void> {
    await this.goto(routes.country(code))
  }
}
