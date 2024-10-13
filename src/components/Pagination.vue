<template>
  <section class="pagination">
    <button :disabled="isPrevDisabled" @click="action(currentPageNumber - 1)">Prev</button>
    <p>{{ `${currentPageNumber}/${allPagesCount}` }}</p>
    <button :disabled="isNextDisabled" @click="action(currentPageNumber + 1)">Next</button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PaginationProps = {
  currentPage?: number | string
  allPagesCount: number
  action: (newPage: number) => void
}

const STARTING_PAGE = 1

const props = withDefaults(defineProps<PaginationProps>(), { currentPage: STARTING_PAGE })

const currentPageNumber = computed(() => {
  const pageNumber = Number(props.currentPage)

  if (isNaN(pageNumber)) {
    return STARTING_PAGE
  }

  const isInRange = pageNumber <= props.allPagesCount && pageNumber > 0

  return isInRange ? pageNumber : STARTING_PAGE
})

const isPrevDisabled = computed(() => currentPageNumber.value === STARTING_PAGE)
const isNextDisabled = computed(() => currentPageNumber.value === props.allPagesCount)
</script>
