<template>
  <section class="episodes-table">
    <SearchInput
      class="episodes-table__filter"
      type="input"
      placeholder="Episode Name"
      ariaLabel="Search for episode name"
      :selectedValue="searchParams.name"
      @filterChange="(value) => setSearchParams({ name: value })"
    />
    <div class="episodes-table__grid-wrapper">
      <AgGridVue
        class="episodes-table__grid"
        :theme="gridTheme"
        :loading="episodesStore.isFetchingEpisodes"
        :defaultColDef="defaultEpisodesColDef"
        :columnDefs="episodesColDefs"
        :rowData="episodesStore.episodes"
        @gridReady="onGridReady"
      />
      <div class="episodes-table__pagination-wrapper">
        <Pagination
          class="episodes-table__pagination"
          :currentPage="searchParams.page"
          :totalPagesNumber="episodesStore.pages"
          @pageChange="(newPage) => setSearchParams({ page: newPage })"
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
.episodes-table {
  $table-height: 488px;
  $max-width-table: 964px;

  display: flex;
  flex-direction: column;
  gap: $space-xs;
  max-width: $max-width-table;
  margin: 0 auto;

  &__filter {
    width: max-content;
  }

  &__grid {
    margin: 0 auto;
    height: $table-height;
    width: 100%;
  }

  &__pagination-wrapper {
    display: flex;
    padding: $p-xs $p-md;
    transform: translateY(-6px);
    border-radius: 0 0 $radius $radius;
    border: $border-sm;
    background-color: $background;
  }

  &__pagination {
    margin: 0;
    margin-left: auto;
  }
}
</style>
