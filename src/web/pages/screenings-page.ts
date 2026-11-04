import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class ScreeningsPage extends BasePage {
  readonly path = routes.screenings
  readonly expectedTitle = pageTitles.screenings
  readonly expectedHeading = headings.screenings
}
