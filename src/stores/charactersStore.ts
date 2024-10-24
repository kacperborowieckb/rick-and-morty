import { defineStore } from 'pinia'

import type {
  Character,
  GetCharactersResponse,
  GetCharactersResponseInfo
} from '@/services/characters'
import { api } from '@/services'
import { makeSafeAction } from '@/utils/makeSafeAction'
import type { SearchParams } from '@/composables/useSearchParams'

type CharactersStoreState = GetCharactersResponseInfo & {
  characters: Character[]
  isFetchingCharacters: boolean
  charactersError: string | null
}

export const useCharactersStore = defineStore('characters', {
  state: (): CharactersStoreState => ({
    count: 0,
    pages: 0,
    characters: [],
    isFetchingCharacters: false,
    charactersError: null
  }),
  actions: {
    async fetchCharacters(searchParamsQuery?: SearchParams) {
      this.isFetchingCharacters = true
      this.charactersError = null

      const { data, errorMessage, errorStatus } = await makeSafeAction<GetCharactersResponse>({
        action: () => api.characters.getCharacters(searchParamsQuery)
      })

      if (errorMessage) {
        this.$reset()
        this.charactersError = errorStatus === 404 ? 'No characters found.' : errorMessage
      }

      if (data) {
        const { count, pages } = data.data.info

        this.count = count
        this.pages = pages
        this.characters = data.data.results
      }

      this.isFetchingCharacters = false
    }
  }
})
