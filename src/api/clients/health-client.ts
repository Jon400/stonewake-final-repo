import type { ApiResponse, HealthResponse } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

export class HealthClient extends ApiClient {
  /** `GET /health`. It sits outside `/v1`, and needs no credential, so it sends none. */
  check(
    options: Pick<RequestOptions, 'auth'> = { auth: 'none' },
  ): Promise<ApiResponse<HealthResponse>> {
    return this.doGet<HealthResponse>('/health', { ...options, versioned: false })
  }
}
