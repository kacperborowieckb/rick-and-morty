<template>
  <main class="home">
    <div class="home__wrapper">
      <h1 class="home__heading">Explore Rick and Morty universe!</h1>
      <p class="home__desc">
        Browse and find characters, search for new episodes, explore different locations and create
        your own watch list!
      </p>
      <div class="home__action-wrapper">
        <img class="home__image home__image--rick" src="/rick.svg" alt="rick" />
        <Button class="home__action" size="xl" @click="goToCharactersPage"> Explore! </Button>
        <img class="home__image home__image--morty" src="/morty.svg" alt="morty" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import Button from '@/components/Button.vue'
import { routes } from '@/constants'

const router = useRouter()

function goToCharactersPage() {
  router.push(routes.characters)
}
</script>

<style scoped lang="scss">
.home {
  $icon-height: 96px;
  $default-delay: 100ms;
  $step-delay: 25ms;
  $fade-in-animation: fadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) backwards;

  &__wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: $space-xs;
    max-width: $max-width-text;
    text-align: center;
  }

  &__heading {
    margin-top: $space-2xl;
    font-size: $fs-2xl;
    animation: $fade-in-animation $default-delay + ($step-delay * 0);
  }

  &__desc {
    color: $muted-foreground;
    font-size: $fs-md;
    animation: $fade-in-animation $default-delay + ($step-delay * 1);
  }

  &__action-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $p-xl;
  }

  &__action {
    animation: $fade-in-animation $default-delay + ($step-delay * 2);
  }

  &__image {
    height: $icon-height;

    &--rick {
      transform: rotate(-15deg);
      animation: $fade-in-animation $default-delay + ($step-delay * 2);
    }

    &--morty {
      transform: rotate(15deg);
      animation: $fade-in-animation $default-delay + ($step-delay * 2);
    }
  }

  @include respond(bp-sm) {
    &__heading {
      margin-top: $space-md;
      font-size: $fs-xl;
    }

    &__desc {
      font-size: $fs-md;
    }

    &__action-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      row-gap: $space-lg;
    }

    &__action {
      grid-column: span 2;
    }

    &__image {
      &--rick {
        grid-row: 1;
      }

      &--morty {
        grid-row: 1;
      }
    }
  }
}
</style>
