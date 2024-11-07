<template>
  <main class="episodes-view">
    <h1 class="episodes-view__heading">Explore Rick and Morty Episodes!</h1>
    <Table :filters="episodesFilters" />
  </main>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue'
import { episodesFilters } from '@/constants'
</script>

<style scoped lang="scss">
.episodes-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
