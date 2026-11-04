import type { Locator, Page } from '@playwright/test'
import { sidebarLabels, type SidebarModule } from '@web/labels'

/** The navigation sidebar that every signed-in page shows. */
export class Sidebar {
  readonly root: Locator
  readonly signOutButton: Locator
  readonly teamLabel: Locator

  constructor(page: Page) {
    this.root = page.getByRole('complementary')
    this.signOutButton = this.root.getByRole('button', { name: sidebarLabels.signOut, exact: true })
    this.teamLabel = this.root.getByText(sidebarLabels.team, { exact: true })
  }

  /** The link to one module, found by its visible name. */
  moduleLink(module: SidebarModule): Locator {
    return this.root.getByRole('navigation').getByRole('link', { name: module, exact: true })
  }

  async open(module: SidebarModule): Promise<void> {
    await this.moduleLink(module).click()
  }

  async signOut(): Promise<void> {
    await this.signOutButton.click()
  }
}
