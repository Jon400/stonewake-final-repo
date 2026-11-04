/** Base class for errors thrown by the automation code, as opposed to test assertion failures. */
export class StonewakeAutomationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = new.target.name
  }
}

/** A required environment variable is missing or invalid. */
export class ConfigError extends StonewakeAutomationError {
  readonly variable: string

  constructor(variable: string, reason = 'is missing') {
    super(`Environment variable ${variable} ${reason}.`)
    this.variable = variable
  }
}
