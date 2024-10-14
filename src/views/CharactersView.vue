<template>
  <main class="characters">
    <h1 class="characters__heading">Explore Rick and Morty Characters!</h1>
    <section class="characters__filters">filters</section>
    <section class="characters__list">
      <p v-if="isFetchingCharacters">Loading..</p>
      <p v-else-if="charactersError">{{ charactersError }}</p>
      <CharacterCard
        v-else-if="characters.length"
        v-for="character in characters"
        :characterData="character"
        :key="character.id"
      />
      <p v-else>No characters found :c</p>
    </section>
    <Pagination
      :currentPage="searchParams.page"
      :allPagesCount="pages"
      :action="(newPage) => setSearchParams({ page: newPage })"
    />
  </main>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useCharactersStore } from '@/stores/charactersStore'
import { useSearchParams } from '@/composables/useSearchParams'
import type { Character } from '@/services/characters'

type CharactersViewSearchParams = { page: number } & Pick<
  Character,
  'name' | 'status' | 'species' | 'type' | 'gender'
>

const charactersStore = useCharactersStore()

const { characters, pages, isFetchingCharacters, charactersError } = storeToRefs(charactersStore)

const { searchParams, setSearchParams } = useSearchParams<CharactersViewSearchParams>()

watch(
  searchParams,
  () => {
    charactersStore.fetchCharacters(searchParams.value)
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.characters {
  $max-item-width: 340px;

  display: flex;
  flex-direction: column;
  gap: $space-sm;

  &__heading {
    text-align: center;
  }

  &__filters {
    margin-left: auto;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax($max-item-width, 1fr));
    justify-items: center;
    align-items: center;
    gap: $space-lg;
    max-width: $max-width-container;
  }
}
</style>
