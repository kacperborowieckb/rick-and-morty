<template>
  <div class="character-card-status" :class="`character-card-status--${status.toLowerCase()}`">
    {{ status }}
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/services/characters'

defineProps<{ status: Character['status'] }>()
</script>

<style scoped lang="scss">
.character-card-status {
  position: absolute;
  top: $space-sm;
  right: $space-md;
  border-radius: $radius-sm;
  padding: calc($p-xs / 2) $p-xs;

  &--alive {
    background-color: $primary;
    color: $primary-foreground;
  }

  &--dead {
    background-color: $destructive;
    color: $destructive-foreground;
  }

  &--unknown {
    background-color: $muted;
    color: $foreground;
  }
}
</style>
