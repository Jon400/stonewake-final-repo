import type { Locator, Page } from '@playwright/test'
import { Sidebar } from '@web/components'

/** Shared behaviour of every dashboard page. */
export abstract class BasePage {
  /** Route of the page, relative to the app URL. */
  abstract readonly path: string
  /** Browser tab title the page should have. Specs compare it with `getTitle()`. */
  abstract readonly expectedTitle: string
  /** Text the h1 heading should have. Specs compare it with `getHeading()`. */
  abstract readonly expectedHeading: string

  readonly sidebar: Sidebar
  readonly heading: Locator

  constructor(protected readonly page: Page) {
    this.sidebar = new Sidebar(page)
    this.heading = page.getByRole('heading', { level: 1 })
  }

  async goto(path: string = this.path): Promise<void> {
    await this.page.goto(path)
  }

  /** Opens the page by its own route. */
  async open(): Promise<void> {
    await this.goto()
  }

  getTitle(): Promise<string> {
    return this.page.title()
  }

  getHeading(): Promise<string> {
    return this.heading.innerText()
  }

  /** Path and query of the current URL. */
  currentPath(): string {
    const url = new URL(this.page.url())
    return url.pathname + url.search
  }

  /** Waits until the browser is on the given path, such as /login. */
  async waitForPath(path: string): Promise<void> {
    await this.page.waitForURL((url) => url.pathname === path)
  }
}
