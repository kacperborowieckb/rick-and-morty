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
import type { CharactersViewSearchParams } from '@/views/CharactersView.vue'
import { charactersFilters } from '@/constants'

import SearchInput, { type SearchInputProps } from './SearchInput.vue'
import Button from './Button.vue'

const { searchParams, setSearchParams } = useSearchParams<CharactersViewSearchParams>()
</script>
