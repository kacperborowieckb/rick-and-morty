<template>
  <div class="character-card" @click="openModal">
    <div class="character-card__image-wrapper">
      <img 
        class="character-card__image" 
        :src="image" 
        :alt="name" 
      />
    </div>
    <ul class="character-card__desc">
      <li>
        <h3 class="character-card__name character-card__desc-item">
          {{ name }}
        </h3>
      </li>
      <li>
        <p class="character-card__info character-card__desc-item">
          {{ `${gender}, ${species}` }}
        </p>
      </li>
      <li>
        <p class="character-card__info--type character-card__desc-item">
          Type: {{ type || 'Unknown' }}
        </p>
      </li>
    </ul>
    <CharacterCardStatus :status="status" />
  </div>
  <CharacterCardModal
    :characterData="characterData"
    :isOpen="isModalOpen"
    @closeModal="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Character } from '@/services/characters'
import CharacterCardModal from './CharacterCardModal.vue'
import CharacterCardStatus from './CharacterCardStatus.vue'

const isModalOpen = ref(false)

const props = defineProps<{ characterData: Character }>()

const { gender, image, name, species, status, type } = props.characterData

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>

<style scoped lang="scss">
.character-card {
  $max-card-width: 320px;
  $max-image-height: 300px;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: $space-xs;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: $max-card-width;
  border: $border-sm;
  border-radius: $radius;
  background-color: $card;
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
  }

  &__desc &__desc-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__name {
    font-size: $fs-lg;
  }
}
</style>
