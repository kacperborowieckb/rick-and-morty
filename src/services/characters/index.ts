import http from '@/services/api'
import { endpoints } from '@/services/index'

export type Character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: string
  image: string
  episode: string[]
}

export type GetCharactersResponseInfo = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type GetCharactersResponse = {
  info: GetCharactersResponseInfo
  results: Character[]
}

type GetCharactersProps = {
  paginationEndpoint?: string
  searchParams?: string
}

async function getCharacters({ paginationEndpoint, searchParams }: GetCharactersProps = {}) {
  const endpoint = paginationEndpoint || endpoints.characters

  return await http.get<GetCharactersResponse>(`${endpoint}${searchParams ?? ''}`)
}

export default { getCharacters }
