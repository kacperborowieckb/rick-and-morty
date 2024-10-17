import characters from '@/services/characters/index'

export const endpoints = {
  characters: '/character'
} as const

export const api = {
  characters
}
