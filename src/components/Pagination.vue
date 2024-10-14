<template>
  <section class="pagination">
    <button class="pagination__button" @click="action(STARTING_PAGE)">&#171;</button>
    <button
      class="pagination__button"
      :disabled="isPrevDisabled"
      @click="action(currentPageNumber - 1)"
    >
      &lt;
    </button>
    <input
      class="pagination__input"
      type="text"
      aria-label="select page"
      :value="currentPageNumber"
      @change="changePage"
    />
    <span>/</span>
    <p>{{ allPagesCount }}</p>
    <button
      class="pagination__button"
      :disabled="isNextDisabled"
      @click="action(currentPageNumber + 1)"
    >
      &gt;
    </button>
    <button class="pagination__button" @click="action(allPagesCount)">&#187;</button>
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

const currentPageNumber = computed(() => calculateCurrentPageNumber(props.currentPage))

const isPrevDisabled = computed(() => currentPageNumber.value === STARTING_PAGE)
const isNextDisabled = computed(() => currentPageNumber.value === props.allPagesCount)

function calculateCurrentPageNumber(pageNumberToValidate: string | number): number {
  const pageNumber = Number(pageNumberToValidate)

  if (isNaN(pageNumber)) {
    return STARTING_PAGE
  }

  const isInRange = pageNumber <= props.allPagesCount && pageNumber > 0

  return isInRange ? pageNumber : STARTING_PAGE
}

function changePage(e: Event) {
  const inputElement = e.target as HTMLInputElement

  if (!inputElement.value) return

  props.action(calculateCurrentPageNumber(inputElement.value))
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  gap: $space-xs;
  margin: 0 auto;

  &__button,
  &__input {
    border: none;
    background-color: transparent;
    color: $foreground;
    cursor: pointer;
  }

  &__button:disabled {
    color: $muted-foreground;
  }

  &__input {
    height: 100%;
    width: 2ch;
    text-align: center;
  }
}
</style>
