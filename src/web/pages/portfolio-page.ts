import type { Locator, Page } from '@playwright/test'
import type { ExposureStatus } from '@core'
import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class PortfolioPage extends BasePage {
  readonly path = routes.portfolio
  readonly expectedTitle = pageTitles.portfolio
  readonly expectedHeading = headings.portfolio

  readonly companyLinks: Locator
  readonly firstCompanyLink: Locator

  constructor(page: Page) {
    super(page)
    this.companyLinks = page.getByRole('main').getByRole('table').getByRole('link')
    this.firstCompanyLink = this.companyLinks.first()
  }

  /** The summary tile of one status. The tile test ids match the API status values. */
  statusTile(status: ExposureStatus): Locator {
    return this.page.getByTestId(`tile-${status}`)
  }

  /** The number shown on a status tile. */
  async getTileCount(status: ExposureStatus): Promise<number> {
    const text = await this.statusTile(status).getByText(/^\d+$/).innerText()
    return Number(text)
  }

  /** Name of the first company in the table, once the table has loaded. */
  async getFirstCompanyName(): Promise<string> {
    await this.firstCompanyLink.waitFor()
    return (await this.firstCompanyLink.innerText()).trim()
  }

  /** Opens the first company and returns its name as the table showed it. */
  async openFirstCompany(): Promise<string> {
    const name = await this.getFirstCompanyName()
    await this.firstCompanyLink.click()
    await this.page.waitForURL(/\/entities\/n\d+/)
    return name
  }
}
