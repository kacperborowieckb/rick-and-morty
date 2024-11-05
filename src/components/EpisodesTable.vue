<template>
  <section class="table">
    <SearchInput
      class="table__filter"
      type="input"
      placeholder="Episode Name"
      ariaLabel="Search for episode name"
      :selectedValue="searchParams.name"
      @filterChange="(name) => setSearchParams({ name })"
    />
    <div class="table__grid-wrapper">
      <AgGridVue
        class="table__grid"
        :theme="gridTheme"
        :loading="episodesStore.isFetchingEpisodes"
        :defaultColDef="defaultEpisodesColDef"
        :columnDefs="episodesColDefs"
        :rowData="episodesStore.episodes"
        @gridReady="onGridReady"
      />
      <div class="table__pagination-wrapper">
        <Pagination
          class="table__pagination"
          :currentPage="searchParams.page"
          :totalPagesNumber="episodesStore.pages"
          @pageChange="(page) => setSearchParams({ page })"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type { GridApi, GridReadyEvent } from 'ag-grid-community'

import { useEpisodesStore } from '@/stores/episodesStore'
import { useSearchParams } from '@/composables/useSearchParams'
import { gridTheme } from '@/theme'
import type { Episode } from '@/services/episodes'
import { defaultEpisodesColDef, episodesColDefs } from '@/helpers/columnDefinitions'

import Pagination from './Pagination.vue'
import SearchInput from './SearchInput.vue'

const gridApi = shallowRef<GridApi<Episode> | null>(null)

const episodesStore = useEpisodesStore()
const { searchParams, setSearchParams } = useSearchParams<{ page: number; name: string }>()

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api

  episodesStore.fetchEpisodes(searchParams.value)
}

watch(searchParams, () => episodesStore.fetchEpisodes(searchParams.value))
</script>

<style scoped lang="scss">
.table {
  &__filter {
    width: max-content;
  }
}
</style>
