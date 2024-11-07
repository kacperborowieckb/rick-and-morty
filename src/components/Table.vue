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
  </section>
</template>

<script setup lang="ts" generic="T extends string | number, K extends SearchParams<T>, U">
import { AgGridVue } from 'ag-grid-vue3'
import type { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community'
import { shallowRef, watch } from 'vue'

import { useSearchParams, type SearchParams } from '@/composables/useSearchParams'
import { gridTheme } from '@/theme'

import type { FiltersMapArray } from './FiltersList.vue'
import FiltersList from './FiltersList.vue'
import { defaultLocationsColDef } from '@/helpers/columnDefinitions'

type TableProps = {
  filters: FiltersMapArray<T, K>
  rowData: U[]
  loading: boolean
  colDefs: ColDef<U, any>[]
}

const props = defineProps<TableProps>()

const emit = defineEmits<{
  (e: 'fetchData', searchParams: K): void
}>()

const gridApi = shallowRef<GridApi<U> | null>(null)

const { searchParams, setSearchParams } = useSearchParams<K>()

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api

  emit('fetchData', searchParams.value)
}

watch(searchParams, () => emit('fetchData', searchParams.value))
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
    width: max-content !important;
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

  @include respond(bp-sm) {
    &__filter {
      width: 100%;
    }
  }
}
</style>
