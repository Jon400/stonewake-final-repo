import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

/** An institution page. The heading is the institution name, so it varies. */
export class InstitutionPage extends BasePage {
  readonly path = routes.institutions
  readonly expectedTitle = pageTitles.institution
  readonly expectedHeading = headings.institutions

  async openById(id: string | number): Promise<void> {
    await this.goto(routes.institution(id))
  }
}
