<script setup lang="ts">
import { headerNavigationItems } from '~/utils/headerNavigation'
</script>

<template>
  <UNavigationMenu
    :items="headerNavigationItems"
    color="neutral"
    variant="link"
    content-orientation="vertical"
    class="hidden shrink-0 lg:flex"
  />
</template>
