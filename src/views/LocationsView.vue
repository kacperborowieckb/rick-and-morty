<template>
  <main class="locations-view">
    <h1 class="locations-view__heading">Explore Rick and Morty Locations!</h1>
    <Table
      :filters="locationsFilters"
      :rowData="locationsStore.locations"
      :loading="locationsStore.isFetchingLocations"
      :colDefs="locationsColDefs"
      :pages="locationsStore.pages"
      @fetchData="(searchParams) => locationsStore.fetchLocations(searchParams)"
    />
  </main>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue'
import { locationsFilters } from '@/constants'
import { locationsColDefs } from '@/helpers/columnDefinitions'
import { useLocationsStore } from '@/stores/locationsStore'

const locationsStore = useLocationsStore()
</script>

<style scoped lang="scss">
.locations-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
