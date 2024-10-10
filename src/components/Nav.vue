<template>
  <header class="nav">
    <div class="nav__logo-container">
      <RouterLink to="/">
        <img 
          class="nav__logo" 
          src="/logo.png" 
          alt="rick and morty" 
        />
      </RouterLink>
    </div>
    <nav class="nav__nav-container">
      <ul ref="navList" class="nav__nav-list">
        <li 
          v-for="{ route, label } in navRoutes" 
          ref="routeContainer" 
          class="nav__nav-list-item"
        >
          <RouterLink 
            class="nav__link" 
            :to="route" 
            active-class="active"
          >
            {{ label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import { navRoutes } from '@/constants'
import { nextTick, useTemplateRef, watch } from 'vue'

const navList = useTemplateRef<HTMLUListElement | null>('navList')
const routesContainers = useTemplateRef<HTMLAnchorElement[] | null>('routeContainer')

const route = useRoute()

const findActiveRouteElement = () =>
  routesContainers.value?.find((container) =>
    container.querySelector('a')?.classList.contains('active')
  )

const setTab = async () => {
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
  position: sticky;
  top: var(--space-sm);
  display: flex;
  margin: var(--m-sm) auto;
  padding: var(--p-sm) var(--p-md);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  width: max-content;
  background-color: hsl(var(--card) / 0.4);
  backdrop-filter: blur(4px);

  &__logo-container {
    margin-right: var(--m-lg);
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
    display: flex;
    gap: var(--space-lg);

    &::after {
      content: '';
      position: absolute;
      left: var(--offset-left);
      border-radius: var(--radius);
      height: 100%;
      width: var(--width);
      background: hsl(var(--primary));
      mix-blend-mode: color;
      pointer-events: none;
      transition: 0.3s all cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  &__nav-list-item {
    padding: calc(var(--p-xs) / 2) var(--p-xs);

    &:not(:has(.active)):hover {
      color: hsl(var(--primary));
    }
  }

  @include respond(bp-sm) {
    --mask-size: 24px;

    margin: var(--m-sm) var(--m-sm);
    padding: var(--p-sm) var(--p-sm);
    width: calc(100% - (var(--m-sm) * 2));

    &__logo-container {
      flex-shrink: 0;
      margin-right: var(--m-xs);
    }

    &__nav-container {
      display: block;
      overflow-x: auto;
      mask-image: linear-gradient(
        90deg,
        transparent,
        #000 var(--mask-size),
        #000 calc(100% - var(--mask-size)),
        transparent 100%
      );

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__nav-list {
      gap: var(--space-xs);
      margin: 0 var(--mask-size);
    }

    &__nav-list-item {
      flex-shrink: 0;
    }
  }
}
</style>
