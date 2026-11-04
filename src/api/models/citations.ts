/** Each list holds at most 100 ids. All lists are optional. */
export interface CitationResolveRequest {
  record_ids?: number[]
  event_ids?: number[]
  assessment_ids?: number[]
}

export interface PublishedField {
  path: string
  value: string
}

export interface ResolvedRecord {
  record_id: number
  connector_id: string
  register: string
  record_type: string
  external_id: string
  source_url: string
  retrieved_at: string
  as_of: string | null
  verify_status: string | null
  locator?: string | null
  notice?: string | null
  deep_link?: string | null
  published_fields?: PublishedField[]
  published_note?: string | null
}

export interface ResolvedEvent {
  event_id: number
  event_type: string
  headline: string
  occurred_at: string
  node_label: string
  record: ResolvedRecord | null
  filing_url: string | null
}

export interface ResolvedScreening {
  assessment_id: number
  screening_id: number
  category: string
  verdict: string
  reviewed_at: string | null
  screening_status: string
  completed_at: string | null
}

/** Maps are keyed by the requested id; an id that is unknown or out of scope maps to null. */
export interface CitationResolveResponse {
  records: Record<string, ResolvedRecord | null>
  events: Record<string, ResolvedEvent | null>
  assessments: Record<string, ResolvedScreening | null>
}
