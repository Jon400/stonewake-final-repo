import type { ErrorCode } from '@core'

/** What a client returns: the status, the headers and the parsed body, with nothing asserted. */
export interface ApiResponse<T> {
  status: number
  /** Header names are lower case. */
  headers: Record<string, string>
  body: T
}

/** Error body of every non-2xx answer except 422: `{ error: { code, message } }`. */
export interface ApiError {
  error: { code: ErrorCode; message: string }
}

export interface ValidationDetail {
  type: string
  loc: (string | number)[]
  msg: string
}

/** Error body of a 422: the error envelope plus pydantic style details. */
export interface ValidationError {
  error: { code: ErrorCode; message: string }
  detail: ValidationDetail[]
}

/** A page of rows. Every list endpoint answers with `items`, not `data`. */
export interface Page<T> {
  items: T[]
  limit: number
  offset: number
  total: number
}

/** Query parameters of paged endpoints. A string is accepted to send deliberately invalid values. */
export interface PageParams {
  limit?: number | string
  offset?: number | string
}

export interface Identifier {
  scheme: string
  value: string
}
