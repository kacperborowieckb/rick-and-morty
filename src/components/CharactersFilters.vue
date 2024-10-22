<template>
  <SearchInput
    v-for="({ ariaLabel, paramKey, placeholder, items, type }, index) in charactersFilters"
    :key="`${index}${paramKey}`"
    :type="type"
    :placeholder="placeholder"
    :ariaLabel="ariaLabel"
    :items="items"
    :selectedValue="searchParams[paramKey]"
    @filterChange="(value) => setSearchParams({ [paramKey]: value })"
  />

  <Button style="width: 100%" @click="setSearchParams({}, true)">
    Reset All
  </Button>
</template>

<script setup lang="ts">
import { useSearchParams } from '@/composables/useSearchParams'
import type { Character } from '@/services/characters'
import type { CharactersViewSearchParams } from '@/views/CharactersView.vue'

import SearchInput, { type SearchInputProps } from './SearchInput.vue'
import Button from './Button.vue'

const { searchParams, setSearchParams } = useSearchParams<CharactersViewSearchParams>()

const statusItems: { label: string; value: Character['status'] }[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
]

const genderItems: { label: string; value: Character['gender'] }[] = [
  { label: 'Female', value: 'female' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Male', value: 'male' },
  { label: 'Unknown', value: 'unknown' }
]

type CharactersSearchInputProps = Omit<
  SearchInputProps<string | Character['status'] | Character['gender']>,
  'selectedValue'
>

type CharactersFiltersMapArray = (CharactersSearchInputProps & {
  paramKey: keyof CharactersViewSearchParams
})[]

const charactersFilters: CharactersFiltersMapArray = [
  {
    type: 'input',
    placeholder: 'Name',
    ariaLabel: 'Search for character name',
    paramKey: 'name'
  },
  {
    placeholder: 'Status',
    ariaLabel: 'Search for character status',
    items: statusItems,
    paramKey: 'status'
  },
  {
    type: 'input',
    placeholder: 'Species',
    ariaLabel: 'Search for character species',
    paramKey: 'species'
  },
  {
    type: 'input',
    placeholder: 'Type',
    ariaLabel: 'Search for character type',
    paramKey: 'type'
  },
  {
    placeholder: 'Gender',
    ariaLabel: 'Search for gender type',
    items: genderItems,
    paramKey: 'gender'
  }
]
</script>
