import { defineStore } from 'pinia'

import { api } from '@/services'
import { makeSafeAction } from '@/utils/makeSafeAction'
import type { SearchParams } from '@/composables/useSearchParams'
import type { Episode, GetEpisodesResponse, GetEpisodesResponseInfo } from '@/services/episodes'

type EpisodesStoreState = GetEpisodesResponseInfo & {
  episodes: Episode[]
  isFetchingEpisodes: boolean
  episodeError: string | null
}

export const useEpisodesStore = defineStore('episodes', {
  state: (): EpisodesStoreState => ({
    count: 0,
    pages: 0,
    episodes: [],
    isFetchingEpisodes: false,
    episodeError: null
  }),
  actions: {
    async fetchEpisodes(searchParamsQuery?: SearchParams) {
      this.isFetchingEpisodes = true
      this.episodeError = null

      const { data, errorMessage, errorStatus } = await makeSafeAction<GetEpisodesResponse>({
        action: () => api.episodes.getEpisodes(searchParamsQuery)
      })

      if (errorMessage) {
        this.$reset()
        this.episodeError = errorStatus === 404 ? 'No episodes found.' : errorMessage
      }

      if (data) {
        const { count, pages } = data.data.info

        this.count = count
        this.pages = pages
        this.episodes = data.data.results
      }

      this.isFetchingEpisodes = false
    }
  }
})
