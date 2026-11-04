import type { APIRequestContext, APIResponse } from '@playwright/test'
import { API_BASE_PATH, config } from '@config'
import { createLogger, describeRequest } from '@utils'
import type { ApiResponse } from '@api/models'

const log = createLogger('api')

/**
 * How a request authenticates.
 * - omitted: `Authorization: Bearer <config.apiKey>`
 * - `'none'`: no Authorization header
 * - `{ scheme, value }`: a raw header, such as `Token <key>`, `Basic abc` or an invalid Bearer
 */
export type Auth = 'none' | { scheme: string; value: string }

export type QueryValue = string | number | boolean | undefined
export type Query = Record<string, QueryValue>

export interface RequestOptions {
  query?: Query
  auth?: Auth
}

export interface PostOptions extends RequestOptions {
  /** Sent as the JSON body. Omit it to send no body. */
  body?: unknown
}

interface InternalOptions extends PostOptions {
  /** False for routes outside `/v1`, such as `/health`. */
  versioned?: boolean
}

/** Base of every client. Performs requests and returns the result, and never asserts. */
export class ApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected doGet<T>(path: string, options: InternalOptions = {}): Promise<ApiResponse<T>> {
    return this.send<T>('GET', path, options)
  }

  protected doPost<T>(path: string, options: InternalOptions = {}): Promise<ApiResponse<T>> {
    return this.send<T>('POST', path, options)
  }

  private async send<T>(
    method: 'GET' | 'POST',
    path: string,
    options: InternalOptions,
  ): Promise<ApiResponse<T>> {
    const { query, auth, body, versioned = true } = options
    const fullPath = `${versioned ? API_BASE_PATH : ''}${path}`
    const url = `${config.apiUrl}${fullPath}`
    const params = cleanQuery(query)

    const headers: Record<string, string> = {}
    const authorization = authorizationHeader(auth)
    if (authorization !== undefined) {
      headers.Authorization = authorization
    }

    const requestOptions = {
      headers,
      ...(params ? { params } : {}),
      ...(body !== undefined ? { data: body } : {}),
    }
    const response =
      method === 'GET'
        ? await this.request.get(url, requestOptions)
        : await this.request.post(url, requestOptions)

    log.info(describeRequest(method, fullPath, response.status()))
    return {
      status: response.status(),
      headers: response.headers(),
      body: await parseBody<T>(response),
    }
  }
}

/** The key is read from config only when a request actually needs it. */
function authorizationHeader(auth: Auth | undefined): string | undefined {
  if (auth === 'none') return undefined
  if (auth === undefined) return `Bearer ${config.apiKey}`
  return `${auth.scheme} ${auth.value}`
}

function cleanQuery(
  query: Query | undefined,
): Record<string, string | number | boolean> | undefined {
  if (!query) return undefined
  const entries = Object.entries(query).filter(
    (entry): entry is [string, string | number | boolean] => entry[1] !== undefined,
  )
  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

/** Parses a JSON body. A body that is not JSON comes back as its text, typed as T. */
async function parseBody<T>(response: APIResponse): Promise<T> {
  const text = await response.text()
  try {
    return JSON.parse(text) as T
  } catch {
    return text as unknown as T
  }
}
