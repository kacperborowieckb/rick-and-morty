import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export type SearchParams = Record<string, string | number>

export const useSearchParams = <T extends SearchParams>() => {
  const route = useRoute()
  const router = useRouter()

  const searchParams = computed(() => ({ ...route.query }) as T)

  const setSearchParams = (params: Partial<T>, replace: boolean = false) => {
    const oldSearchParams = replace ? {} : searchParams.value

    const newSearchParams = { ...oldSearchParams, ...params }

    router.push({ query: newSearchParams })
  }

  return { searchParams, setSearchParams }
}
