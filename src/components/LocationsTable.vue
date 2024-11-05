<template>
  <section class="locations-table">
    <div class="locations-table__filters-wrapper">
      <SearchInput
        v-for="({ ariaLabel, paramKey, placeholder, items, type }, index) in locationsFilters"
        class="locations-table__filter"
        :key="`${index}${paramKey}`"
        :type="type"
        :placeholder="placeholder"
        :ariaLabel="ariaLabel"
        :items="items"
        :selectedValue="searchParams[paramKey]"
        @filterChange="(value) => setSearchParams({ [paramKey]: value })"
      />
    </div>
    <div class="locations-table__grid-wrapper">
      <AgGridVue
        class="locations-table__grid"
        :theme="gridTheme"
        :loading="locationsStore.isFetchingLocations"
        :defaultColDef="defaultLocationsColDef"
        :columnDefs="locationsColDefs"
        :rowData="locationsStore.locations"
        @gridReady="onGridReady"
      />
      <div class="locations-table__pagination-wrapper">
        <Pagination
          class="locations-table__pagination"
          :currentPage="searchParams.page"
          :totalPagesNumber="locationsStore.pages"
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

import { useSearchParams } from '@/composables/useSearchParams'
import { gridTheme } from '@/theme'
import type { Location } from '@/services/locations'
import { defaultLocationsColDef, locationsColDefs } from '@/helpers/columnDefinitions'
import { useLocationsStore } from '@/stores/locationsStore'
import { locationsFilters } from '@/constants'

import Pagination from './Pagination.vue'
import SearchInput from './SearchInput.vue'

export type LocationsTableSearchParams = {
  page: number
  name: string
  type: string
  dimension: string
}

const gridApi = shallowRef<GridApi<Location> | null>(null)

const locationsStore = useLocationsStore()
const { searchParams, setSearchParams } = useSearchParams<LocationsTableSearchParams>()

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api

  locationsStore.fetchLocations(searchParams.value)
}

watch(searchParams, () => locationsStore.fetchLocations(searchParams.value))
</script>

<style scoped lang="scss">
.locations-table {
  $table-height: 488px;
  $max-width-table: 964px;

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
