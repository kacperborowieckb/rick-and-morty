<template>
  <FadeInTransition>
    <Teleport to="#modals" v-if="isOpen">
      <div class="modal" @click.self="closeModal">
        <div class="modal__content" :class="modalContentClass">
          <slot />
        </div>
      </div>
    </Teleport>
  </FadeInTransition>
</template>

<script setup lang="ts">
import { Teleport } from 'vue'
import FadeInTransition from './FadeInTransition.vue'

export type ModalProps = {
  isOpen: boolean
  closeModal: () => void
  modalContentClass?: string
}

defineProps<ModalProps>()
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($card, 0.4);

  &__content {
    border: 2px solid $border;
    border-radius: $radius;
    margin: $space-md;
    background-color: $card;
  }
}
</style>
