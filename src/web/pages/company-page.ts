import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

/** A company page, reached from the portfolio. The heading is the company name. */
export class CompanyPage extends BasePage {
  readonly path = routes.portfolio
  readonly expectedTitle = pageTitles.company
  readonly expectedHeading = headings.portfolio

  /** Opens a company by its node id, such as n106084. */
  async openById(id: string): Promise<void> {
    await this.goto(routes.company(id))
  }

  /** Waits until the browser is on a company page. */
  async waitForCompany(): Promise<void> {
    await this.page.waitForURL(/\/entities\/n\d+/)
  }
}
