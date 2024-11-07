import type { SearchParams } from '@/composables/useSearchParams'
import http from '@/services/api'
import { endpoints } from '@/services/index'

export type Location = {
  id: number
  name: string
  type: string
  dimension: string
  created: string
}

export type GetLocationsResponseInfo = {
  count: number
  pages: number
}

export type GetLocationsResponse = {
  info: GetLocationsResponseInfo
  results: Location[]
}

async function getLocations(params?: SearchParams) {
  return await http.get<GetLocationsResponse>(`${endpoints.locations}`, { params })
}

export default { getLocations }
