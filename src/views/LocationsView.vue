<template>
  <main class="locations-view">
    <h1 class="locations-view__heading">Explore Rick and Morty Locations!</h1>
    <Table :filters="locationsFilters" />
  </main>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue'
import { locationsFilters } from '@/constants'
</script>

<style scoped lang="scss">
.locations-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
