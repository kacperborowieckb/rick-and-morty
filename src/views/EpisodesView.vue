<template>
  <main class="episodes-view">
    <h1 class="episodes-view__heading">Explore Rick and Morty Episodes!</h1>
    <EpisodesTable />
  </main>
</template>

<script setup lang="ts">
import EpisodesTable from '@/components/EpisodesTable.vue'
</script>

<style scoped lang="scss">
.episodes-view {
  &__heading {
    margin-bottom: $space-md;
    text-align: center;
  }
}
</style>
