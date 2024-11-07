<template>
  <div class="search-input" @focusout="checkForFocus">
    <input
      ref="searchInput"
      class="search-input__input"
      type="text"
      :value="currentInputValue ?? findLabelForValue(selectedValue)"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      @focus="selectInputText"
      @input="handleInputChange"
    />
    <template v-if="type === 'dropdown'">
      <ul class="search-input__list">
        <li
          v-for="({ label, value }, index) in searchItems"
          :key="`${label}${index}`"
          class="search-input__list-item"
          :tabindex="0"
          @click="(e) => selectSearchValue(value, e)"
          @keydown.enter="selectSearchValue(value)"
        >
          {{ label }}
        </li>
      </ul>
    </template>
    <button class="search-input__reset-button" @click="clearSelectedValue">&#10005;</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

import { debounce } from '@/utils/debounce'

export type SearchInputProps = {
  type?: 'dropdown' | 'input'
  items?: { label: string; value: string }[]
  selectedValue: string
  placeholder: string
  ariaLabel: string
}

const currentInputValue = ref<string | null>(null)
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

const props = withDefaults(defineProps<SearchInputProps>(), { type: 'dropdown' })

const emit = defineEmits<{ (e: 'filterChange', value?: string): void }>()

const searchItems = computed(() => filterSearchItems())

const debouncedAction = debounce(emit)

function filterSearchItems() {
  return props.items?.filter((item) => {
    if (!currentInputValue.value) return true

    return item.label.toLowerCase().includes(currentInputValue.value?.toLowerCase())
  })
}

function checkForFocus(e: FocusEvent) {
  const hasFocusWithin = (e.currentTarget as HTMLDivElement)?.contains(
    e.relatedTarget as HTMLElement
  )

  if (!hasFocusWithin) {
    clearCurrentInputValue()
  }
}

function selectInputText() {
  searchInput.value?.select()
}

function handleInputChange() {
  currentInputValue.value = searchInput.value?.value ?? ''

  if (props.type === 'input') {
    debouncedAction('filterChange', currentInputValue.value || undefined)
  }
}

function selectSearchValue(value: string, e?: MouseEvent) {
  const eventTarget = e?.target as HTMLElement

  clearCurrentInputValue()
  emit('filterChange', value)
  eventTarget?.blur()
}

function findLabelForValue(value: string) {
  if (props.type === 'input') return value

  return props.items?.find((item) => item.value === value)?.label
}

function clearCurrentInputValue() {
  currentInputValue.value = null
}

function clearSelectedValue() {
  clearCurrentInputValue()
  emit('filterChange')
  searchInput.value?.focus()
}
</script>

<style scoped lang="scss">
.search-input {
  $search-input-max-height: 240px;
  $search-input-border: 1px solid $border;
  $search-input-border-light: 1px solid $primary;
  $search-input-border-transparent: 1px solid transparent;
  $list-open-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  position: relative;

  &__input {
    border: $search-input-border;
    border-radius: $radius-sm;
    outline: none;
    padding: $p-xs;
    background-color: $card;
    cursor: pointer;
    color: $card-foreground;
    font-size: $fs-sm;

    &:hover {
      background-color: $background;
    }
  }

  &__input {
    width: 100%;

    &::placeholder {
      color: $muted-foreground;
      text-align: center;
    }

    &:focus::placeholder {
      color: $muted-foreground;
    }

    &:focus,
    &:not(:placeholder-shown) {
      border-radius: $radius-sm $radius-sm 0 0;
      background-color: $card;
      cursor: text;
    }
  }

  &:active &__input,
  &:focus-within &__input,
  &__input:focus {
    & ~ ul {
      max-height: $search-input-max-height;
      border-color: $border;

      & li {
        opacity: 1;
      }
    }
  }

  &__list {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 0;
    overflow-y: scroll;
    list-style: none;
    border: $search-input-border-transparent;
    border-top: none;
    border-radius: 0 0 $radius-sm $radius-sm;
    background-color: $card;
    transition: $list-open-transition;

    &-item {
      overflow: hidden;
      padding: $p-xs;
      opacity: 0;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        background-color: $background;
        cursor: pointer;
      }

      &:focus {
        background-color: $background;
        outline: $search-input-border;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__reset-button {
    position: absolute;
    top: 50%;
    right: $space-xs;
    translate: 0% -50%;
    display: none;
    padding: calc($p-xs / 2);
    background-color: $card;
    border: none;
    color: $card-foreground;
    cursor: pointer;

    &:focus {
      outline: $search-input-border-light;
    }
  }

  &__input:not(:placeholder-shown) ~ &__reset-button {
    display: block;
  }
}
</style>
