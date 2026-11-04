import type { SearchHit } from './search'

export interface NodeRecordSummary {
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
}

export interface NodeRegisterRecords {
  connector_id: string
  register: string
  records_total: number
}

export interface NodeDetailResponse extends Omit<SearchHit, 'match' | 'score'> {
  records: NodeRecordSummary[]
  records_total: number
  registers: NodeRegisterRecords[]
  branch_of_label: string | null
  merged_into?: number | null
}
