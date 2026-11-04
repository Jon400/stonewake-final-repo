import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class ScoringPage extends BasePage {
  readonly path = routes.scoring
  readonly expectedTitle = pageTitles.scoring
  readonly expectedHeading = headings.scoring
}
