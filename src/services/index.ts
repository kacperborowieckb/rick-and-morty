import characters from '@/services/characters/index'
import episodes from '@/services/episodes/index'
import locations from '@/services/locations/index'

export const endpoints = {
  characters: '/character',
  episodes: '/episode',
  locations: '/location'
} as const

export const api = {
  characters,
  episodes,
  locations
}
