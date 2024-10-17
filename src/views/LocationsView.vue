<template>
  <main class="locations-view">
    <h1 class="locations-view__heading">Explore Rick and Morty Locations!</h1>
    <LocationsTable />
  </main>
</template>

<script setup lang="ts">
import LocationsTable from '@/components/LocationsTable.vue'
</script>

<style scoped lang="scss">
.locations-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
