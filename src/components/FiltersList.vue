<template>
  <SearchInput
    v-for="({ ariaLabel, paramKey, placeholder, items, type }, index) in filters"
    :key="`${index}${paramKey.toString()}`"
    :class="class"
    :type="type"
    :placeholder="placeholder"
    :ariaLabel="ariaLabel"
    :items="items"
    :selectedValue="searchParams[paramKey]?.toString() || ''"
    @filterChange="(value) => $emit('filterChange', { [paramKey]: value })"
  />
</template>

<script setup lang="ts">
import { type SearchParams } from '@/composables/useSearchParams'

import type { SearchInputProps } from './SearchInput.vue'
import SearchInput from './SearchInput.vue'

export type FiltersMapArray<T extends SearchParams = SearchParams> = (Omit<
  SearchInputProps,
  'selectedValue'
> & {
  paramKey: keyof T
})[]

type FiltersListProps = {
  filters: FiltersMapArray
  searchParams: SearchParams
  class?: string
}

defineProps<FiltersListProps>()
defineEmits<{
  (e: 'filterChange', value: Partial<SearchParams>): void
}>()
</script>
