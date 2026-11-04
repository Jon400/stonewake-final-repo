import { redact } from './redact'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface Logger {
  debug(message: string, meta?: unknown): void
  info(message: string, meta?: unknown): void
  warn(message: string, meta?: unknown): void
  error(message: string, meta?: unknown): void
}

function write(level: LogLevel, scope: string | undefined, message: string, meta?: unknown): void {
  const prefix = `[${level.toUpperCase()}]${scope ? ` [${scope}]` : ''}`
  const text = String(redact(message))
  const line = `${prefix} ${text}`
  const args: unknown[] = meta === undefined ? [line] : [line, redact(meta)]
  switch (level) {
    case 'error':
      console.error(...args)
      break
    case 'warn':
      console.warn(...args)
      break
    case 'debug':
      console.debug(...args)
      break
    default:
      console.log(...args)
  }
}

export function createLogger(scope?: string): Logger {
  return {
    debug: (message, meta) => write('debug', scope, message, meta),
    info: (message, meta) => write('info', scope, message, meta),
    warn: (message, meta) => write('warn', scope, message, meta),
    error: (message, meta) => write('error', scope, message, meta),
  }
}

export const logger: Logger = createLogger()

/** One-line summary of an HTTP call, e.g. `GET /portfolios -> 200`. */
export function describeRequest(method: string, url: string, status?: number): string {
  return status === undefined ? `${method} ${url}` : `${method} ${url} -> ${status}`
}
