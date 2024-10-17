<template>
  <section class="pagination">
    <button class="pagination__button" @click="emit('pageChange', STARTING_PAGE)">&#171;</button>
    <button
      class="pagination__button"
      :disabled="isPrevDisabled"
      @click="emit('pageChange', currentPageNumber - 1)"
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
      @click="emit('pageChange', currentPageNumber + 1)"
    >
      &gt;
    </button>
    <button class="pagination__button" @click="emit('pageChange', allPagesCount)">&#187;</button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PaginationProps = {
  currentPage?: number | string
  allPagesCount: number
}

// is it okay to make variables like this in a component?
// i just didn't want to repeat hardcoded '1' so many times
const STARTING_PAGE = 1

const props = withDefaults(defineProps<PaginationProps>(), { currentPage: STARTING_PAGE })

const emit = defineEmits<{ (e: 'pageChange', value: number): void }>()

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

  emit('pageChange', calculateCurrentPageNumber(inputElement.value))
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
