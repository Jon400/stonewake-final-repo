import type { Locator, Page } from '@playwright/test'
import { dealBookLabels, headings, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

/** A deal as the Deal Book lists it. */
export interface DealLink {
  /** Visible text of the link, which includes the deal name, country and sector. */
  name: string
  /** Where the link points, such as /deals/5df4ec755205. */
  href: string
}

export class DealBookPage extends BasePage {
  readonly path = routes.dealBook
  readonly expectedTitle = pageTitles.dealBook
  readonly expectedHeading = headings.dealBook

  readonly searchInput: Locator
  readonly sectorFilter: Locator
  readonly regionFilter: Locator
  readonly windowFilter: Locator
  readonly selectedTab: Locator
  readonly dealLinks: Locator
  readonly firstDealLink: Locator
  readonly noMatchesMessage: Locator

  constructor(page: Page) {
    super(page)
    const main = page.getByRole('main')
    this.searchInput = main.getByRole('textbox', { name: dealBookLabels.search })
    this.sectorFilter = main.getByRole('combobox', { name: dealBookLabels.sectorFilter })
    this.regionFilter = main.getByRole('combobox', { name: dealBookLabels.regionFilter })
    this.windowFilter = main.getByRole('combobox', { name: dealBookLabels.windowFilter })
    this.selectedTab = main.getByRole('tab', { selected: true })
    this.dealLinks = main.getByRole('table').getByRole('link')
    this.firstDealLink = this.dealLinks.first()
    this.noMatchesMessage = main.getByText(dealBookLabels.noMatches, { exact: true })
  }

  async search(text: string): Promise<void> {
    await this.searchInput.fill(text)
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear()
  }

  /** The first deal in the list, once the list has loaded. */
  async getFirstDeal(): Promise<DealLink> {
    await this.firstDealLink.waitFor()
    const href = await this.firstDealLink.getAttribute('href')
    if (href === null) throw new Error('The first deal link has no href')
    return { name: (await this.firstDealLink.innerText()).replace(/\s+/g, ' ').trim(), href }
  }

  /** Opens a deal from the list and waits for its page. */
  async openDeal(deal: DealLink): Promise<void> {
    await this.page.getByRole('main').getByRole('link', { name: deal.name, exact: true }).click()
    await this.waitForPath(deal.href)
  }
}
