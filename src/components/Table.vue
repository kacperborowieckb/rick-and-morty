<template>
  <section class="table">
    <section class="table__filters-wrapper">
      <FiltersList class="table__filter" :filters="filters" />
    </section>
  </section>
</template>

<script setup lang="ts" generic="T extends string | number, K extends SearchParams<T>">
import { useSearchParams, type SearchParams } from '@/composables/useSearchParams'
import type { FiltersMapArray } from './FiltersList.vue'
import FiltersList from './FiltersList.vue'

type TableProps = {
  filters: FiltersMapArray<T, K>
}

const props = defineProps<TableProps>()

const { searchParams, setSearchParams } = useSearchParams<K>()
</script>

<style lang="scss">
.table {
  $max-width-table: 964px;
  $table-height: 488px;

  display: flex;
  flex-direction: column;
  gap: $space-xs;
  max-width: $max-width-table;
  margin: 0 auto;

  &__filters-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
  }

  &__filter {
    width: max-content !important;
  }

  &__grid {
    margin: 0 auto;
    height: $table-height;
    width: 100%;
  }

  &__pagination-wrapper {
    display: flex;
    padding: $p-xs $p-md;
    transform: translateY(-6px);
    border-radius: 0 0 $radius $radius;
    border: $border-sm;
    background-color: $background;
  }

  &__pagination {
    margin: 0;
    margin-left: auto;
  }

  @include respond(bp-sm) {
    &__filter {
      width: 100%;
    }
  }
}
</style>
