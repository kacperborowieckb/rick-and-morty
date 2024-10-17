<template>
  <header class="nav">
    <div class="nav__logo-container">
      <RouterLink to="/">
        <img class="nav__logo" src="/logo.png" alt="rick and morty" />
      </RouterLink>
    </div>
    <nav class="nav__nav-container">
      <ul ref="navList" class="nav__nav-list">
        <li v-for="{ route, label } in navRoutes" ref="routeContainer" class="nav__nav-list-item">
          <RouterLink class="nav__link" active-class="active" :to="route">
            {{ label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { navRoutes } from '@/constants'

const navList = useTemplateRef<HTMLUListElement | null>('navList')
const routesContainers = useTemplateRef<HTMLAnchorElement[] | null>('routeContainer')

const route = useRoute()

function findActiveRouteElement() {
  return routesContainers.value?.find((container) =>
    container.querySelector('a')?.classList.contains('active')
  )
}

async function setTab() {
  await nextTick()

  const activeRouteElement = findActiveRouteElement()

  if (!activeRouteElement || !navList.value) return

  const offsetLeft = activeRouteElement.offsetLeft
  const width = activeRouteElement.offsetWidth

  navList.value.style.setProperty('--offset-left', `${offsetLeft}px`)
  navList.value.style.setProperty('--width', `${width}px`)
}

watch(route, () => setTab())
</script>

<style scoped lang="scss">
.nav {
  $nav-z-index: 10;

  position: sticky;
  z-index: $nav-z-index;
  top: $space-sm;
  display: flex;
  margin: $m-sm auto;
  padding: $p-sm $p-md;
  border: 1px solid $border;
  border-radius: $radius-lg;
  width: max-content;
  background-color: rgba($card, 0.8);
  backdrop-filter: blur(4px);

  &__logo-container {
    margin-right: $m-lg;
  }

  &__logo {
    filter: invert(100%);
  }

  &__nav-container {
    display: flex;
    align-items: center;
  }

  &__nav-list {
    position: relative;
    z-index: $nav-z-index;
    display: flex;
    gap: $space-lg;

    &::after {
      content: '';
      position: absolute;
      left: var(--offset-left);
      border-radius: $radius;
      height: 100%;
      width: var(--width);
      background: $primary;
      mix-blend-mode: color;
      pointer-events: none;
      transition: $nav-overlay-transition;
    }
  }

  &__nav-list-item {
    padding: calc($p-xs / 2) $p-xs;
  }

  &__link:not(.active):hover {
    color: $primary;
  }

  @include respond(bp-md) {
    margin: $m-sm;
    padding: $p-sm;
    width: calc(100% - ($m-sm * 2));

    &__logo-container {
      flex-shrink: 0;
      margin-right: $m-xs;
    }

    &__nav-container {
      display: block;
      overflow-x: auto;
      width: 100%;
      mask-image: $nav-scroll-mask;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__nav-list {
      justify-content: space-evenly;
      gap: $space-xs;
      margin: 0 $nav-mask-size;
    }

    &__nav-list-item {
      flex-shrink: 0;
    }
  }
}
</style>
