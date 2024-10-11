import http from '@/services/api'
import { endpoints } from '@/services/index'

type Character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: string
  image: string
  episode: string[]
}

async function getCharacters() {
  return await http.get<Character[]>(endpoints.characters)
}

export default { getCharacters }
