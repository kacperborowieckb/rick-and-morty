import { defineStore } from 'pinia'

import { api } from '@/services'
import { makeSafeAction } from '@/utils/makeSafeAction'
import type { SearchParams } from '@/composables/useSearchParams'
import type { GetLocationsResponse, GetLocationsResponseInfo, Location } from '@/services/locations'

type LocationsStoreState = GetLocationsResponseInfo & {
  locations: Location[]
  isFetchingLocations: boolean
  locationsError: string | null
}

export const useLocationsStore = defineStore('locations', {
  state: (): LocationsStoreState => ({
    count: 0,
    pages: 0,
    locations: [],
    isFetchingLocations: false,
    locationsError: null
  }),
  actions: {
    async fetchLocations(searchParamsQuery?: SearchParams) {
      this.isFetchingLocations = true
      this.locationsError = null

      const { data, errorMessage, errorStatus } = await makeSafeAction<GetLocationsResponse>({
        action: () => api.locations.getLocations(searchParamsQuery)
      })

      if (errorMessage) {
        this.$reset()
        this.locationsError = errorStatus === 404 ? 'No locations found.' : errorMessage
      }

      if (data) {
        const { count, pages } = data.data.info

        this.count = count
        this.pages = pages
        this.locations = data.data.results
      }

      this.isFetchingLocations = false
    }
  }
})
