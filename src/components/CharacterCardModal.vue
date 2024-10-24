<template>
  <Modal 
    modalContentClass="character-card-modal"
    :isOpen="isOpen"
    @closeModal="$emit('closeModal')"
  >
    <div class="character-card-modal__image-wrapper">
      <img 
        class="character-card-modal__image"
        :src="image"
        :alt="name"
      />
      <CharacterCardStatus :status="status" />
    </div>
    <ul class="character-card-modal__desc">
      <li>
        <h3 class="character-card-modal__name">
          {{ name }}
        </h3>
      </li>
      <li>
        <p class="character-card-modal__info">
          {{ `${gender}, ${species}` }}
        </p>
      </li>
      <li>
        <p class="character-card-modal__info--type">
          Type: {{ type || 'Unknown' }}
        </p>
      </li>
      <li class="character-card-modal__button-wrapper">
        <Button 
          class="character-card-modal__close-button"
          variant="outline"
          @click="$emit('closeModal')"
        >
          Close
        </Button>
      </li>
    </ul>
  </Modal>
</template>

<script setup lang="ts">
import type { Character } from '@/services/characters'
import Modal, { type ModalEmits, type ModalProps } from './Modal.vue'
import CharacterCardStatus from './CharacterCardStatus.vue'
import Button from './Button.vue'

const props = defineProps<{ characterData: Character } & ModalProps>()
defineEmits<ModalEmits>()

const { gender, image, name, species, status, type } = props.characterData
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
  }

  &__button-wrapper {
   display: flex;
   justify-content: end;
   align-items: end;
   height: 100%;
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
