<template>
  <Transition name="fadeIn">
    <slot />
  </Transition>
</template>

<style lang="scss">
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: $fade-in-transition;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
