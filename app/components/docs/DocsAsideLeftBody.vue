<script setup lang="ts">
import { getSidebarNavigation } from '~/utils/sidebarNavigation'

const route = useRoute()
const sidebarNavigation = computed(() => getSidebarNavigation(route.path))
const contentNavigationUi = {
  linkTrailingIcon: "group-data-[state=open]:!rotate-90",
}
</script>

<template>
  <UContentNavigation
    highlight
    highlight-color="neutral"
    trailing-icon="i-lucide-chevron-right"
    variant="pill"
    class="pt-sidebar"
    :key="route.path"
    :navigation="sidebarNavigation"
    :ui="contentNavigationUi"
  />
</template>
