import { defineStore } from 'pinia'

import type {
  Character,
  GetCharactersResponse,
  GetCharactersResponseInfo
} from '@/services/characters'
import { makeSafeAction } from '@/utils/makeSafeAction'
import { api } from '@/services'

type CharactersStoreState = GetCharactersResponseInfo & {
  characters: Character[]
  isFetchingCharacters: boolean
  charactersError: string | null
}

export const useCharactersStore = defineStore('characters', {
  state: (): CharactersStoreState => ({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
    characters: [],
    isFetchingCharacters: false,
    charactersError: null
  }),
  actions: {
    async fetchCharacters() {
      this.isFetchingCharacters = true

      const { data, errorMessage } = await makeSafeAction<GetCharactersResponse>({
        action: api.characters.getCharacters
      })

      if (errorMessage) {
        this.charactersError = errorMessage
      }

      if (data) {
        const { count, pages, next, prev } = data.data.info

        this.count = count
        this.pages = pages
        this.next = next
        this.prev = prev
        this.characters = data.data.results
      }

      this.isFetchingCharacters = false
    }
  }
})
