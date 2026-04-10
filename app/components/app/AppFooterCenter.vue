<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div
    v-if="route.path === '/'"
    class="text-sm text-muted text-center"
  >
    Background: u/Illuvia
  </div>
</template>
