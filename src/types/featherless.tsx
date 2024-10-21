export type ModelItem = {
  id: string
  created_at: string
  updated_at: string
  name: string
  owned_by: string
  model_class: string
  favorites: number
  downloads: number
  status: string
  health: string
  avg_rating: number
  total_reviews: number
  acc_tags: string[]
  is_gated: boolean
}

export type Pagination = {
  current_page: number
  total_items: number
  total_pages: number
  per_page: number
}

export type ApiResponse = {
  items: ModelItem[]
  pagination: Pagination
}

export interface NewModelItem {
  id: string
  name: string
  created: number
  model_class: string
  owned_by: string
  context_length: number
  max_completion_tokens: number
  is_gated?: boolean
}
