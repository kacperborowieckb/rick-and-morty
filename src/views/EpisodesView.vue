<template>
  <main class="episodes-view">
    <h1 class="episodes-view__heading">Explore Rick and Morty Episodes!</h1>
    <Table
      :filters="episodesFilters"
      :rowData="episodeStore.episodes"
      :loading="episodeStore.isFetchingEpisodes"
      :colDefs="episodesColDefs"
      :pages="episodeStore.pages"
      @fetchData="(searchParams) => episodeStore.fetchEpisodes(searchParams)"
    />
  </main>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue'
import { episodesFilters } from '@/constants'
import { episodesColDefs } from '@/helpers/columnDefinitions'
import { useEpisodesStore } from '@/stores/episodesStore'

const episodeStore = useEpisodesStore()
</script>

<style scoped lang="scss">
.episodes-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
