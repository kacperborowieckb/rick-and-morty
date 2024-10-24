import type { SearchParams } from '@/composables/useSearchParams'
import http from '@/services/api'
import { endpoints } from '@/services/index'

export type Character = {
  id: number
  name: string
  status: 'alive' | 'dead' | 'unknown'
  species: string
  type: string
  gender: 'female' | 'male' | 'genderless' | 'unknown'
  image: string
}

export type GetCharactersResponseInfo = {
  count: number
  pages: number
}

export type GetCharactersResponse = {
  info: GetCharactersResponseInfo
  results: Character[]
}

async function getCharacters(searchParams?: SearchParams) {
  return await http.get<GetCharactersResponse>(`${endpoints.characters}`, { params: searchParams })
}

export default { getCharacters }
