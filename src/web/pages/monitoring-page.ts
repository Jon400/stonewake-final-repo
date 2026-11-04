import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class MonitoringPage extends BasePage {
  readonly path = routes.monitoring
  readonly expectedTitle = pageTitles.monitoring
  readonly expectedHeading = headings.monitoring
}
