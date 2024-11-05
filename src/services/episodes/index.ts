import type { SearchParams } from '@/composables/useSearchParams'
import http from '@/services/api'
import { endpoints } from '@/services/index'

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
  created: string
}

export type GetEpisodesResponseInfo = {
  count: number
  pages: number
}

export type GetEpisodesResponse = {
  info: GetEpisodesResponseInfo
  results: Episode[]
}

async function getEpisodes(searchParams?: SearchParams) {
  return await http.get<GetEpisodesResponse>(`${endpoints.episodes}`, { params: searchParams })
}

export default { getEpisodes }
