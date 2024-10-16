<template>
  <main class="characters">
    <h1 class="characters__heading">Explore Rick and Morty Characters!</h1>
    <section class="characters__filters">
      <CharactersFilters />
    </section>
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
<<<<<<< HEAD
    <Pagination
      :currentPage="searchParams.page"
      :totalPagesNumber="pages"
      @pageChange="(newPage) => setSearchParams({ page: newPage })"
    />
=======
    <template v-if="shouldDisplayPagination">
      <Pagination
        :currentPage="searchParams.page"
        :allPagesCount="pages"
        :action="(newPage) => setSearchParams({ page: newPage })"
      />
    </template>
>>>>>>> 60aaeab (feat: accesible dropdown, filter section without DRY, debounce util, adjust error messaging at characters)
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useCharactersStore } from '@/stores/charactersStore'
import { useSearchParams } from '@/composables/useSearchParams'
import type { Character } from '@/services/characters'
import CharactersFilters from '@/components/CharactersFilters.vue'

export type CharactersViewSearchParams = { page: number } & Pick<
  Character,
  'name' | 'status' | 'species' | 'type' | 'gender'
>

const charactersStore = useCharactersStore()

const { characters, pages, isFetchingCharacters, charactersError } = storeToRefs(charactersStore)

const { searchParams, setSearchParams } = useSearchParams<CharactersViewSearchParams>()

const shouldDisplayPagination = computed(() => {
  return characters.value.length && !isFetchingCharacters.value && !charactersError.value
})

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
  $min-filter-width: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-sm;

  &__heading {
    text-align: center;
  }

  &__filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($min-filter-width, 1fr));
    justify-items: center;
    align-items: center;
    gap: $space-md;
    width: 100%;
    max-width: $max-width-container;
    padding: $p-xs;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax($max-item-width, 1fr));
    justify-items: center;
    align-items: center;
    gap: $space-lg;
    width: 100%;
    max-width: $max-width-container;
  }
}
</style>
