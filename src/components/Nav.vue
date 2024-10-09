<template>
  <header>
    <div><img src="/logo.png" alt="rick and morty" /></div>
    <nav>
      <RouterLink v-for="{ route, label } in navRoutes" :to="route">{{ label }}</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { navRoutes } from '@/constants'
</script>
