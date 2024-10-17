<template>
  <Transition name="fadeIn">
    <slot />
  </Transition>
</template>

<style lang="scss">
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
