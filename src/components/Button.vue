<template>
  <button 
    class="button"
    :class="buttonClasses"
    @click="onClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonProps = {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'xs' | 'md' | 'xl'
  class?: string
  disabled?: boolean
  onClick: () => void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'md',
  class: '',
  disabled: false
})

defineEmits<{
  (e: 'click'): void
}>()

const buttonClasses = computed(
  () => `${props.class} button__${props.variant} button__${props.size}`
)
</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $space-xs;
  width: max-content;
  border: none;
  border-radius: $radius-sm;
  color: $primary-foreground;
  cursor: pointer;

  &__xs {
    padding: calc($p-xs / 1.5) $p-xs;
    font-size: $fs-xs;
  }

  &__md {
    padding: $p-xs $p-sm;
    font-size: $fs-sm;
  }

  &__xl {
    padding: $p-xs $p-sm;
    font-size: $fs-md;
  }

  &__default {
    background-color: $primary;

    &:hover {
      background-color: $primary-hover;
    }

    &:active {
      background-color: $primary;
    }
  }

  &__destructive {
    background-color: $destructive;

    &:hover {
      background-color: $destructive-hover;
    }

    &:active {
      background-color: $destructive;
    }
  }

  &__outline {
    border: $border-sm;
    border-color: $primary;
    background-color: $secondary;
    color: $secondary-foreground;

    &:hover {
      background-color: $secondary-hover;
    }

    &:active {
      background-color: $secondary;
    }
  }
}
</style>
