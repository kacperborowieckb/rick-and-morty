import characters from '@/services/characters/index'
import episodes from '@/services/episodes/index'

export const endpoints = {
  characters: '/character',
  episodes: '/episode'
} as const

export const api = {
  characters,
  episodes
}
