export interface RegionInfo {
  region: string
  label: string
}

export interface CountryListItem {
  iso3: string
  name: string
  region: string
  deal_count: number
  total_value_usd: number | null
  eu_aml_listed: boolean
  fatf_status: string | null
  sanctions_status: string | null
  risk_score: number | null
  risk_reason?: string | null
}

export interface CountriesListResponse {
  regions: RegionInfo[]
  countries: CountryListItem[]
  unassigned: { deal_count: number; names: string[] }
}

export interface CountryRisk {
  /** From 0 to 100. */
  score: number
  profile_version: number | null
  computed_at: string
  gaps: { component: string; reason: string; sentences: string[] }[]
  breakdown: {
    component: string
    label: string
    weight: number
    raw: string | null
    normalized: number | null
    contribution: number | null
    missing: boolean
    part?: string | null
  }[]
}

export interface CountryDetailResponse {
  iso3: string
  /** ISO 3166 alpha 2, for example DE for Germany. */
  iso2: string
  name: string
  region: string
  region_label: string
  risk: CountryRisk | null
  indicators: Record<string, unknown>[]
  memberships: Record<string, unknown>[]
  events: Record<string, unknown>[]
  deals: Record<string, unknown>[]
  deals_total: number
  deals_held_back: number
  sources: Record<string, unknown>[]
}
