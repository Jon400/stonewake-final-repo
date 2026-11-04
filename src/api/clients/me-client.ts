import type { ApiResponse, MeResponse } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

export class MeClient extends ApiClient {
  /** `GET /v1/me` */
  get(options: Pick<RequestOptions, 'auth'> = {}): Promise<ApiResponse<MeResponse>> {
    return this.doGet<MeResponse>('/me', options)
  }
}
