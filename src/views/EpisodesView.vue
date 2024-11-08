<template>
  <main class="episodes-view">
    <h1 class="episodes-view__heading">Explore Rick and Morty Episodes!</h1>
    <Table
      :filters="episodesFilters"
      :rowData="episodes"
      :loading="isFetchingEpisodes"
      :colDefs="episodesColDefs"
      :pages="pages"
      @fetchData="episodeStore.fetchEpisodes"
    />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import Table from '@/components/Table.vue'
import { episodesFilters } from '@/constants'
import { episodesColDefs } from '@/helpers/columnDefinitions'
import { useEpisodesStore } from '@/stores/episodesStore'

const episodeStore = useEpisodesStore()
const { episodes, isFetchingEpisodes, pages } = storeToRefs(episodeStore)
</script>

<style scoped lang="scss">
.episodes-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
