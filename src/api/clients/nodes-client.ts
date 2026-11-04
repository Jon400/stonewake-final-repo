import type { ApiResponse, NodeDetailResponse } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

export class NodesClient extends ApiClient {
  /** `GET /v1/nodes/{id}`. A string id is accepted to send a deliberately invalid one. */
  get(
    id: number | string,
    options: Pick<RequestOptions, 'auth'> = {},
  ): Promise<ApiResponse<NodeDetailResponse>> {
    return this.doGet<NodeDetailResponse>(`/nodes/${encodeURIComponent(String(id))}`, options)
  }
}
