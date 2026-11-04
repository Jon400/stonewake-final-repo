import type { Identifier } from './common'

export interface SearchParams {
  /** 2 to 256 characters. Omit it, or pass a short one, to provoke a 422. */
  q?: string
  /** 1 to 25, 10 by default. */
  limit?: number | string
}

export interface SearchHit {
  node_id: number
  node_type: string
  label: string
  match: string
  /** From 0 to 1. */
  score: number | null
  country_iso3: string | null
  jurisdiction: string | null
  legal_form: string | null
  legal_form_label?: string | null
  company_status: string | null
  company_status_label?: string | null
  company_status_source?: string | null
  registration_status: string | null
  stale: boolean
  branch: boolean
  identifiers: Identifier[]
  identifiers_total: number
  identifiers_truncated: boolean
}

export interface SearchResponse {
  query: string
  hits: SearchHit[]
  connected_sources: string[]
  truncated?: boolean
}
