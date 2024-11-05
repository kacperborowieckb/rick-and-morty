<template>
  <section class="table">
    <div class="table__filters-wrapper">
      <SearchInput
        v-for="({ ariaLabel, paramKey, placeholder, items, type }, index) in locationsFilters"
        class="table__filter"
        :key="`${index}${paramKey}`"
        :type="type"
        :placeholder="placeholder"
        :ariaLabel="ariaLabel"
        :items="items"
        :selectedValue="searchParams[paramKey]"
        @filterChange="(value) => setSearchParams({ [paramKey]: value })"
      />
    </div>
    <div class="table__grid-wrapper">
      <AgGridVue
        class="table__grid"
        :theme="gridTheme"
        :loading="locationsStore.isFetchingLocations"
        :defaultColDef="defaultLocationsColDef"
        :columnDefs="locationsColDefs"
        :rowData="locationsStore.locations"
        @gridReady="onGridReady"
      />
      <div class="table__pagination-wrapper">
        <Pagination
          class="table__pagination"
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
.table {
  &__filters-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
  }

  @include respond(bp-sm) {
    &__filter {
      width: 100%;
    }
  }
}
</style>
