<template>
  <main>
    <h1>This is an characters/home view</h1>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useCharactersStore } from '@/stores/charactersStore'

const charactersStore = useCharactersStore()

onMounted(() => {
  charactersStore.fetchCharacters()
})
</script>
