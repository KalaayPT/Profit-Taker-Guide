<script setup lang="ts">
const isSearchHighlighted = ref(false)
let searchHighlightTimeout: ReturnType<typeof setTimeout> | undefined

function highlightSearch() {
  isSearchHighlighted.value = true
  clearTimeout(searchHighlightTimeout)
  searchHighlightTimeout = setTimeout(() => {
    isSearchHighlighted.value = false
  }, 1400)
}

onMounted(() => {
  window.addEventListener('profit-taker:highlight-search', highlightSearch)
})

onBeforeUnmount(() => {
  window.removeEventListener('profit-taker:highlight-search', highlightSearch)
  clearTimeout(searchHighlightTimeout)
})
</script>

<template>
  <div
    data-search-hint-target
    class="w-full min-w-0 rounded-md transition-[box-shadow,ring-color] duration-300"
    :class="isSearchHighlighted ? 'ring-2 ring-neutral-300 shadow-lg shadow-neutral-300/40 dark:ring-white/80 dark:shadow-white/20' : ''"
  >
    <UContentSearchButton
      :collapsed="false"
      class="w-full min-w-0"
      variant="soft"
      :ui="{
        leadingIcon: 'size-4 mr-1',
      }"
    />
  </div>
</template>
