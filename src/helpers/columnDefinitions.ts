import type { ColDef } from 'ag-grid-community'

import type { Episode } from '@/services/episodes'
import type { Location } from '@/services/locations'

export const defaultEpisodesColDef: ColDef = {
  editable: false,
  flex: 1,
  minWidth: 180,
  resizable: true
}

export const episodesColDefs: ColDef<Episode>[] = [
  { headerName: 'Episode Name', field: 'name' },
  { headerName: 'Air Date', field: 'air_date' },
  { headerName: 'Episode Number', field: 'episode' },
  {
    headerName: 'Day of Creation',
    field: 'created',
    valueFormatter: (params) => formatDate(params.value)
  }
]

export const defaultLocationsColDef: ColDef = {
  editable: false,
  flex: 1,
  minWidth: 180,
  resizable: true
}

export const locationsColDefs: ColDef<Location>[] = [
  { headerName: 'Location Name', field: 'name' },
  { headerName: 'Type', field: 'type' },
  { headerName: 'Dimension', field: 'dimension' },
  {
    headerName: 'Day of Creation',
    field: 'created',
    valueFormatter: (params) => formatDate(params.value)
  }
]

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
