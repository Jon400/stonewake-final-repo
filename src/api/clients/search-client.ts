import type { ApiResponse, SearchParams, SearchResponse } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

export class SearchClient extends ApiClient {
  /** `GET /v1/search`. Leave `q` out to send a request without it. */
  search(
    params: SearchParams = {},
    options: Pick<RequestOptions, 'auth'> = {},
  ): Promise<ApiResponse<SearchResponse>> {
    return this.doGet<SearchResponse>('/search', { ...options, query: { ...params } })
  }
}
