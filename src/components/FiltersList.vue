<template>
  <SearchInput
    v-for="({ ariaLabel, paramKey, placeholder, items, type }, index) in filters"
    :key="`${index}${paramKey.toString()}`"
    :class="class"
    :type="type"
    :placeholder="placeholder"
    :ariaLabel="ariaLabel"
    :items="items"
    :selectedValue="searchParams[paramKey]"
    @filterChange="(value) => $emit('filterChange', { [paramKey]: value } as Partial<K>)"
  />
</template>

<script setup lang="ts" generic="T extends string | number, K extends SearchParams<T>">
import { type SearchParams } from '@/composables/useSearchParams'

import type { SearchInputProps } from './SearchInput.vue'
import SearchInput from './SearchInput.vue'

export type FiltersMapProps<T> = Omit<SearchInputProps<T>, 'selectedValue'>

export type FiltersMapArray<T, K> = (FiltersMapProps<T> & {
  paramKey: keyof K
})[]

type FiltersListProps = { filters: FiltersMapArray<T, K>; class: string; searchParams: K }

defineProps<FiltersListProps>()
defineEmits<{
  (e: 'filterChange', value?: Partial<K>): void
}>()
</script>
