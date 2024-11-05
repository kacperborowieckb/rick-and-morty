import type { ColDef } from 'ag-grid-community'

import type { Episode } from '@/services/episodes'

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
    valueFormatter: (params) =>
      new Date(params.value).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
  }
]
