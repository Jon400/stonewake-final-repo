import type { Page, PageParams } from './common'

export type EntitiesListParams = PageParams

export interface EntityItem {
  id: number
  slug: string
  display_name: string
  full_name: string
  kind: string
  country: string | null
  aliases: string[]
  groups: string[]
  kind_label: string
  location_label: string | null
}

export type EntitiesListResponse = Page<EntityItem>
