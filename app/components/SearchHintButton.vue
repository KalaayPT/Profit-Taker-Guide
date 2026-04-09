<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Check out the search function as well!',
})

function highlightSearch() {
  window.dispatchEvent(new CustomEvent('profit-taker:highlight-search'))
}
</script>

<template>
  <UButton
    color="neutral"
    icon="i-lucide-search"
    size="xl"
    variant="outline"
    @click="highlightSearch"
  >
    {{ label }}
  </UButton>
</template>
