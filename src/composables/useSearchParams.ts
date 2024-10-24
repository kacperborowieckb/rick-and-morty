import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export type SearchParams = Record<string, string | number>

export const useSearchParams = <T extends SearchParams>() => {
  const route = useRoute()
  const router = useRouter()

  const searchParams = computed(() => ({ ...route.query }) as T)

  /**
   * Set the search params
   * @param params Search params that will be added/replaced. Shape of provided type T. Value will be cleared if undefined.
   * @param replace Boolean. Default to false, it will add params to the existing ones or change them to new value. If true it will overwrite all existing search params.
   */
  const setSearchParams = (params: Partial<T>, replace: boolean = false) => {
    const oldSearchParams = replace ? {} : searchParams.value

    const newSearchParams = { ...oldSearchParams, ...params }

    router.push({ query: newSearchParams })
  }

  return { searchParams, setSearchParams }
}
