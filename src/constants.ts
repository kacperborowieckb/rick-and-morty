import type { FiltersMapArray } from './components/FiltersList.vue'
import type { LocationsTableSearchParams } from './components/LocationsTable.vue'
import type { Character } from './services/characters'
import type { CharactersViewSearchParams } from './views/CharactersView.vue'

export const API_URL = 'https://rickandmortyapi.com/api'

export const DEFAULT_DEBOUNCE_DELAY = 1000

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

// characters page filters
const statusItems: { label: string; value: Character['status'] }[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
]

const genderItems: { label: string; value: Character['gender'] }[] = [
  { label: 'Female', value: 'female' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Male', value: 'male' },
  { label: 'Unknown', value: 'unknown' }
]

type CharactersFiltersMapArray = FiltersMapArray<CharactersViewSearchParams>

export const charactersFilters: CharactersFiltersMapArray = [
  {
    type: 'input',
    placeholder: 'Name',
    ariaLabel: 'Search for character name',
    paramKey: 'name'
  },
  {
    placeholder: 'Status',
    ariaLabel: 'Search for character status',
    items: statusItems,
    paramKey: 'status'
  },
  {
    type: 'input',
    placeholder: 'Species',
    ariaLabel: 'Search for character species',
    paramKey: 'species'
  },
  {
    type: 'input',
    placeholder: 'Type',
    ariaLabel: 'Search for character type',
    paramKey: 'type'
  },
  {
    placeholder: 'Gender',
    ariaLabel: 'Search for gender type',
    items: genderItems,
    paramKey: 'gender'
  }
]

type LocationsFiltersMapArray = FiltersMapArray<LocationsTableSearchParams>

export const locationsFilters: LocationsFiltersMapArray = [
  {
    type: 'input',
    placeholder: 'Location Name',
    ariaLabel: 'Search for location name',
    paramKey: 'name'
  },
  {
    type: 'input',
    placeholder: 'Location Type',
    ariaLabel: 'Search for location type',
    paramKey: 'type'
  },
  {
    type: 'input',
    placeholder: 'Location Dimension',
    ariaLabel: 'Search for location dimension',
    paramKey: 'dimension'
  }
]

type EpisodesFiltersMapArray = FiltersMapArray<{ name: string }>

export const episodesFilters: EpisodesFiltersMapArray = [
  {
    type: 'input',
    placeholder: 'Episode Name',
    ariaLabel: 'Search for episode name',
    paramKey: 'name'
  }
]
