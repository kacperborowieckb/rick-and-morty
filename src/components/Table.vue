<template>
  <section class="table">
    <section class="table__filters-wrapper">
      <FiltersList class="table__filter" :filters="filters" />
    </section>
    <AgGridVue
      class="table__grid"
      :theme="gridTheme"
      :loading="loading"
      :defaultColDef="defaultLocationsColDef"
      :columnDefs="colDefs"
      :rowData="rowData"
      @gridReady="onGridReady"
    />
    <section class="table__pagination-wrapper">
      <Pagination
        class="table__pagination"
        :currentPage="searchParams.page"
        :totalPagesNumber="pages"
        @pageChange="(page) => setSearchParams({ page } as Partial<K>)"
      />
    </section>
  </section>
</template>

<script
  setup
  lang="ts"
  generic="T extends string | number, K extends SearchParams<T> & { page: number }, U"
>
import { AgGridVue } from 'ag-grid-vue3'
import type { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community'
import { shallowRef, watch } from 'vue'

import { useSearchParams, type SearchParams } from '@/composables/useSearchParams'
import { gridTheme } from '@/theme'
import { defaultLocationsColDef } from '@/helpers/columnDefinitions'

import type { FiltersMapArray } from './FiltersList.vue'
import FiltersList from './FiltersList.vue'
import Pagination from './Pagination.vue'

type TableProps = {
  filters: FiltersMapArray<T, K>
  rowData: U[]
  loading: boolean
  colDefs: ColDef<U, any>[]
  pages: number
}

defineProps<TableProps>()

const emit = defineEmits<{
  (e: 'fetchData', searchParams: K): void
}>()

const gridApi = shallowRef<GridApi<U> | null>(null)

const { searchParams, setSearchParams } = useSearchParams<K>()

watch(searchParams, () => emit('fetchData', searchParams.value))

function onGridReady(params: GridReadyEvent) {
  gridApi.value = params.api

  emit('fetchData', searchParams.value)
}
</script>

<style lang="scss">
.table {
  $max-width-table: 964px;
  $table-height: 488px;

  display: flex;
  flex-direction: column;
  gap: $space-xs;
  max-width: $max-width-table;
  margin: 0 auto;

  &__filters-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
  }

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
    transform: translateY(-14px);
    border-radius: 0 0 $radius $radius;
    border: $border-sm;
    background-color: $background;
  }

  &__pagination {
    margin: 0 !important;
    margin-left: auto !important;
  }

  @include respond(bp-sm) {
    &__filter {
      width: 100%;
    }
  }
}
</style>
