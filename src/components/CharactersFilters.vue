<template>
  <FiltersList
    :filters="charactersFilters"
    :searchParams="searchParams"
    @filterChange="setSearchParams"
  />
  <Button style="width: 100%" @click="setSearchParams({}, true)"> Reset All </Button>
</template>

<script setup lang="ts">
import { useSearchParams } from '@/composables/useSearchParams'
import type { CharactersViewSearchParams } from '@/views/CharactersView.vue'
import { charactersFilters } from '@/constants'

import Button from './Button.vue'
import FiltersList from './FiltersList.vue'

const { searchParams, setSearchParams } = useSearchParams<CharactersViewSearchParams>()
</script>
