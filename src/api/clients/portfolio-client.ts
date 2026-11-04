import type {
  ApiResponse,
  PortfolioListParams,
  PortfolioListResponse,
  PortfolioSummaryResponse,
} from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

type AuthOnly = Pick<RequestOptions, 'auth'>

export class PortfolioClient extends ApiClient {
  /** `GET /v1/portfolio` */
  list(
    params: PortfolioListParams = {},
    options: AuthOnly = {},
  ): Promise<ApiResponse<PortfolioListResponse>> {
    return this.doGet<PortfolioListResponse>('/portfolio', { ...options, query: { ...params } })
  }

  /** `GET /v1/portfolio/summary` */
  summary(options: AuthOnly = {}): Promise<ApiResponse<PortfolioSummaryResponse>> {
    return this.doGet<PortfolioSummaryResponse>('/portfolio/summary', options)
  }
}
