import { headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class DossiersPage extends BasePage {
  readonly path = routes.dossiers
  readonly expectedTitle = pageTitles.dossiers
  readonly expectedHeading = headings.dossiers
}
