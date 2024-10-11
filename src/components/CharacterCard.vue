<template>
  <div class="character-card">
    <div class="character-card__image-wrapper">
      <img class="character-card__image" :src="image" :alt="name" />
    </div>
    <div class="character-card__desc">
      <h3 class="character-card__name">{{ name }}</h3>
      <p class="character-card__info">{{ `${gender}, ${species}` }}</p>
      <p class="character-card__info--type">Type: {{ type || 'Unknown' }}</p>
    </div>
    <div class="character-card__status" :class="`character-card__status--${status.toLowerCase()}`">
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

import type { Character } from '@/services/characters'

const props = defineProps<{ characterData: Character }>()

const { episode, gender, image, name, species, status, type } = toRefs(props.characterData)
</script>

<style scoped lang="scss">
.character-card {
  $max-card-width: 320px;
  $max-image-height: 300px;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: $space-xs;
  border: 1px solid $border;
  border-radius: $radius;
  background-color: $card;
  width: 100%;
  height: 100%;
  max-width: $max-card-width;
  overflow: hidden;
  cursor: pointer;

  &__image-wrapper {
    max-height: $max-image-height;
  }

  &__image {
    height: $max-image-height;
    width: 100%;
    object-fit: cover;
  }

  &__desc {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
    padding: $p-xs $p-sm;

    & * {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &__name {
    font-size: $fs-lg;
  }

  &__status {
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
}
</style>
