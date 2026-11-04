import type { Locator, Page } from '@playwright/test'
import type { Credentials } from '@core'
import { headings, loginLabels, pageTitles, routes } from '@web/labels'
import { BasePage } from './base-page'

export class LoginPage extends BasePage {
  readonly path = routes.login
  readonly expectedTitle = pageTitles.login
  readonly expectedHeading = headings.login

  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly termsCheckbox: Locator
  readonly submitButton: Locator
  readonly termsLink: Locator
  /** The message under the form after a failed sign in. */
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput = page.getByLabel(loginLabels.email, { exact: true })
    this.passwordInput = page.getByLabel(loginLabels.password, { exact: true })
    this.termsCheckbox = page.getByRole('checkbox')
    this.submitButton = page.getByRole('button', { name: loginLabels.submit, exact: true })
    this.termsLink = page.getByRole('link', { name: loginLabels.termsLink, exact: true })
    this.errorMessage = page.getByText(loginLabels.wrongCredentials, { exact: true })
  }

  async fillCredentials(credentials: Credentials): Promise<void> {
    await this.emailInput.fill(credentials.email)
    await this.passwordInput.fill(credentials.password)
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check()
  }

  async declineTerms(): Promise<void> {
    await this.termsCheckbox.uncheck()
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  /** Fills the form, accepts the terms and submits, without waiting for the result. */
  async attemptLogin(credentials: Credentials): Promise<void> {
    await this.fillCredentials(credentials)
    await this.acceptTerms()
    await this.submit()
  }

  /** Signs in and waits for the Deal Book to load. */
  async login(credentials: Credentials): Promise<void> {
    await this.attemptLogin(credentials)
    await this.waitForPath(routes.dealBook)
    await this.sidebar.root.waitFor()
  }

  isSubmitEnabled(): Promise<boolean> {
    return this.submitButton.isEnabled()
  }

  /** Text of the error message, or null when none is shown. */
  async getErrorMessage(): Promise<string | null> {
    return (await this.errorMessage.isVisible()) ? this.errorMessage.innerText() : null
  }

  getTermsLinkHref(): Promise<string | null> {
    return this.termsLink.getAttribute('href')
  }
}
