<template>
  <main class="locations-view">
    <h1 class="locations-view__heading">Explore Rick and Morty Locations!</h1>
    <Table
      :filters="locationsFilters"
      :rowData="locations"
      :loading="isFetchingLocations"
      :colDefs="locationsColDefs"
      :pages="pages"
      @fetchData="locationsStore.fetchLocations"
    />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import Table from '@/components/Table.vue'
import { locationsFilters } from '@/constants'
import { locationsColDefs } from '@/helpers/columnDefinitions'
import { useLocationsStore } from '@/stores/locationsStore'

const locationsStore = useLocationsStore()
const { locations, isFetchingLocations, pages } = storeToRefs(locationsStore)
</script>

<style scoped lang="scss">
.locations-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
