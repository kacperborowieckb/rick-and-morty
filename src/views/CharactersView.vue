<template>
  <main class="characters">
    <h1 class="characters__heading">Explore Rick and Morty Characters!</h1>
    <section class="characters__filters">filters</section>
    <section class="characters__list">
      <CharacterCard
        v-for="character in charactersStore.characters"
        :characterData="character"
        :key="character.id"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useCharactersStore } from '@/stores/charactersStore'
import CharacterCard from '@/components/CharacterCard.vue'

const charactersStore = useCharactersStore()

onMounted(() => {
  charactersStore.fetchCharacters()
})
</script>

<style scoped lang="scss">
.characters {
  $max-item-width: 340px;

  display: flex;
  flex-direction: column;
  gap: $space-sm;

  &__heading {
    text-align: center;
  }

  &__filters {
    margin-left: auto;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax($max-item-width, 1fr));
    justify-items: center;
    align-items: center;
    gap: $space-lg;
    max-width: $max-width-container;
  }
}
</style>
