import type { ExposureStatus } from '@core'
import type { Identifier, Page, PageParams } from './common'

export interface PortfolioListParams extends PageParams {
  include_inactive?: boolean | string
}

export interface SignalCitations {
  record_ids: number[]
  event_ids: number[]
  assessment_ids: number[]
}

export interface Signal {
  key: string
  label: string
  band: string | null
  value_display: string | null
  note: string | null
  state: string | null
  gap_reason: string | null
  grade: string | null
  citations: SignalCitations
}

export interface LastTransition {
  from_status: string | null
  to_status: string
  occurred_at: string
}

export interface Review {
  id: number
  disposition: string
  note: string | null
  next_review_on: string
  reviewed_at: string
}

export interface PortfolioItem {
  id: number
  team_id: string
  team_name: string | null
  node_id: number
  label: string
  register_identifier: Identifier | null
  entity_class: string | null
  desk: string | null
  active: boolean
  created_at: string
  status: ExposureStatus
  score: number | null
  /** From 0 to 1. */
  completeness: number | null
  evidence_completeness: number | null
  seen_share: number | null
  explained_share: number | null
  reachable_share: number | null
  computed_at: string | null
  top_signals: Signal[]
  last_transition: LastTransition | null
  review: Review | null
  review_overdue: boolean
  screening_id?: number | null
  screening_verdict?: string | null
  screening_confirmed?: boolean
  sanctions_name_matches_open?: number
}

export type PortfolioListResponse = Page<PortfolioItem>

export interface PortfolioSummaryResponse {
  statuses: Record<ExposureStatus, number>
  active_exposures: number
  transitions_30d: number
  status_changes_30d: number
  reviews_overdue: number
  sanctions_name_matches_open?: number
}
