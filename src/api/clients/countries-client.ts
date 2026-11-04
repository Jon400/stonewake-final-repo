import type { ApiResponse, CountriesListResponse, CountryDetailResponse } from '@api/models'
import { ApiClient, type RequestOptions } from './api-client'

type AuthOnly = Pick<RequestOptions, 'auth'>

export class CountriesClient extends ApiClient {
  /** `GET /v1/countries` */
  list(options: AuthOnly = {}): Promise<ApiResponse<CountriesListResponse>> {
    return this.doGet<CountriesListResponse>('/countries', options)
  }

  /** `GET /v1/countries/{iso3}` */
  get(iso3: string, options: AuthOnly = {}): Promise<ApiResponse<CountryDetailResponse>> {
    return this.doGet<CountryDetailResponse>(`/countries/${encodeURIComponent(iso3)}`, options)
  }
}
