import type { ApiResponse, CitationResolveRequest, CitationResolveResponse } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

export class CitationsClient extends ApiClient {
  /** `POST /v1/citations/resolve`. Omit `request` to send no body. */
  resolve(
    request?: CitationResolveRequest,
    options: Pick<RequestOptions, 'auth'> = {},
  ): Promise<ApiResponse<CitationResolveResponse>> {
    return this.doPost<CitationResolveResponse>('/citations/resolve', {
      ...options,
      body: request,
    })
  }
}
