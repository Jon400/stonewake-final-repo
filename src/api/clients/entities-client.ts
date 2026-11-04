import type { ApiResponse, EntitiesListParams, EntitiesListResponse, EntityItem } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

type AuthOnly = Pick<RequestOptions, 'auth'>

export class EntitiesClient extends ApiClient {
  /** `GET /v1/entities` */
  list(
    params: EntitiesListParams = {},
    options: AuthOnly = {},
  ): Promise<ApiResponse<EntitiesListResponse>> {
    return this.doGet<EntitiesListResponse>('/entities', { ...options, query: { ...params } })
  }

  /** `GET /v1/entities/{id}`. A string id is accepted to send a deliberately invalid one. */
  get(id: number | string, options: AuthOnly = {}): Promise<ApiResponse<EntityItem>> {
    return this.doGet<EntityItem>(`/entities/${encodeURIComponent(String(id))}`, options)
  }
}
