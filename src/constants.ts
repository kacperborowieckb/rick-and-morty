export const API_URL = 'https://rickandmortyapi.com/api'

export const routes = {
  home: '/',
  characters: '/characters',
  episodes: '/episodes',
  locations: '/locations',
  watchList: '/watch-list'
} as const

export const navRoutes = [
  { route: routes.home, label: 'Home' },
  { route: routes.characters, label: 'Characters' },
  { route: routes.episodes, label: 'Episodes' },
  { route: routes.locations, label: 'Locations' },
  { route: routes.watchList, label: 'Watch List' }
] as const
