import { createRouter, createWebHistory } from 'vue-router'

import CharactersView from '@/views/CharactersView.vue'
import EpisodesView from '@/views/EpisodesView.vue'
import LocationsView from '@/views/LocationsView.vue'
import WatchListView from '@/views/WatchListView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: EpisodesView
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView
    },
    {
      path: '/watch-list',
      name: 'watch-list',
      component: WatchListView
    }
  ]
})

export default router
