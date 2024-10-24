<template>
  <FadeInTransition>
    <Teleport to="#modals" v-if="isOpen">
      <div class="modal" @click.self="$emit('closeModal')">
        <div class="modal__content" :class="modalContentClass">
          <slot />
        </div>
      </div>
    </Teleport>
  </FadeInTransition>
</template>

<script setup lang="ts">
import FadeInTransition from './FadeInTransition.vue'

export type ModalProps = {
  isOpen: boolean
  modalContentClass?: string
}

export type ModalEmits = {
  (e: 'closeModal'): void
}

defineProps<ModalProps>()
defineEmits<ModalEmits>()
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($card, 0.4);

  &__content {
    border: $border-md;
    border-radius: $radius;
    margin: $space-md;
    background-color: $card;
  }
}
</style>
