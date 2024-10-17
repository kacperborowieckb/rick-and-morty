<template>
  <Modal modalContentClass="character-card-modal" :isOpen="isOpen" :closeModal="closeModal">
    <div class="character-card-modal__image-wrapper">
      <img class="character-card-modal__image" :src="image" :alt="name" />
      <CharacterCardStatus :status="status" />
    </div>
    <div class="character-card-modal__desc">
      <h3 class="character-card-modal__name">{{ name }}</h3>
      <p class="character-card-modal__info">{{ `${gender}, ${species}` }}</p>
      <p class="character-card-modal__info--type">Type: {{ type || 'Unknown' }}</p>
      <Button variant="outline" @click="closeModal">Close</Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

import type { Character } from '@/services/characters'
import Modal, { type ModalProps } from './Modal.vue'
import CharacterCardStatus from './CharacterCardStatus.vue'
import Button from './Button.vue'

const props = defineProps<{ characterData: Character } & ModalProps>()

const { gender, image, name, species, status, type } = toRefs(props.characterData)
</script>

<style lang="scss">
.character-card-modal {
  $max-image-width: 280px;

  display: flex;
  overflow: hidden;

  &__image-wrapper {
    position: relative;
    max-width: $max-image-width;
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__desc {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
    padding: $p-sm;

    & button {
      margin-left: auto;
    }
  }

  &__name {
    font-size: $fs-lg;
  }

  &__info {
    margin-top: auto;
  }

  @include respond(bp-xs) {
    flex-direction: column;

    &__image-wrapper {
      max-width: none;
    }
  }
}
</style>
