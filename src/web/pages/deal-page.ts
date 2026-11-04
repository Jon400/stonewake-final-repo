import type { Locator, Page } from '@playwright/test'
import { headings, pageTitles, routes, sections } from '@web/labels'
import { BasePage } from './base-page'

/** A single deal. The heading is the deal name, so it varies. */
export class DealPage extends BasePage {
  readonly path = routes.dealBook
  readonly expectedTitle = pageTitles.deal
  readonly expectedHeading = headings.dealBook

  readonly briefingHeading: Locator

  constructor(page: Page) {
    super(page)
    this.briefingHeading = page.getByRole('heading', {
      level: 2,
      name: sections.deal.briefing,
      exact: true,
    })
  }

  async openById(id: string): Promise<void> {
    await this.goto(routes.deal(id))
  }
}
