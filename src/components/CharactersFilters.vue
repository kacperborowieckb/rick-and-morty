<template>
  <SearchInput
    :type="'input'"
    :placeholder="'Name'"
    :ariaLabel="'Search for character name'"
    :selectedValue="searchParams.name"
    :action="(value) => setSearchParams({ name: value })"
  />

  <SearchInput
    :placeholder="'Status'"
    :ariaLabel="'Search for character status'"
    :items="statusItems"
    :selectedValue="searchParams.status"
    :action="(value) => setSearchParams({ status: value })"
  />

  <SearchInput
    :type="'input'"
    :placeholder="'Species'"
    :ariaLabel="'Search for character specie'"
    :selectedValue="searchParams.species"
    :action="(value) => setSearchParams({ species: value })"
  />

  <SearchInput
    :type="'input'"
    :placeholder="'Type'"
    :ariaLabel="'Search for character type'"
    :selectedValue="searchParams.type"
    :action="(value) => setSearchParams({ type: value })"
  />

  <SearchInput
    :placeholder="'Gender'"
    :ariaLabel="'Search for gender type'"
    :items="genderItems"
    :selectedValue="searchParams.gender"
    :action="(value) => setSearchParams({ gender: value })"
  />

  <Button style="width: 100%" @click="setSearchParams({}, true)">Reset All</Button>
</template>

<script setup lang="ts">
import { useSearchParams } from '@/composables/useSearchParams'
import type { Character } from '@/services/characters'
import type { CharactersViewSearchParams } from '@/views/CharactersView.vue'

import SearchInput from './SearchInput.vue'
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
</script>
