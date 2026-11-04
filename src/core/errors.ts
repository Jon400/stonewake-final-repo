/** Error codes documented at https://docs.stonewake.ai/errors, with their HTTP status. */
export const ErrorCode = {
  Unauthenticated: 'unauthenticated',
  Forbidden: 'forbidden',
  NotFound: 'not_found',
  MethodNotAllowed: 'method_not_allowed',
  ContentTooLarge: 'content_too_large',
  ValidationFailed: 'validation_failed',
  RateLimited: 'rate_limited',
  DailyQuotaExceeded: 'daily_quota_exceeded',
  InternalError: 'internal_error',
  QuotaUnavailable: 'quota_unavailable',
  ServerBusy: 'server_busy',
  ServiceUnavailable: 'service_unavailable',
} as const
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

export const ErrorStatus = {
  [ErrorCode.Unauthenticated]: 401,
  [ErrorCode.Forbidden]: 403,
  [ErrorCode.NotFound]: 404,
  [ErrorCode.MethodNotAllowed]: 405,
  [ErrorCode.ContentTooLarge]: 413,
  [ErrorCode.ValidationFailed]: 422,
  [ErrorCode.RateLimited]: 429,
  [ErrorCode.DailyQuotaExceeded]: 429,
  [ErrorCode.InternalError]: 500,
  [ErrorCode.QuotaUnavailable]: 503,
  [ErrorCode.ServerBusy]: 503,
  [ErrorCode.ServiceUnavailable]: 503,
} as const satisfies Record<ErrorCode, number>

/** Fixed error messages the API returns. */
export const ErrorMessage = {
  Unauthenticated: 'Missing or invalid credentials.',
  Forbidden: 'The credential does not allow this request.',
  NotFound: 'Resource not found.',
  ValidationFailed: 'The request failed validation.',
} as const
export type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage]
