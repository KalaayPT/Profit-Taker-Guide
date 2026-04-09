<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { headerNavigationItems } from '~/utils/headerNavigation'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <div class="flex flex-col gap-4">
    <UNavigationMenu
      :items="headerNavigationItems"
      orientation="vertical"
      variant="link"
      highlight
    />

    <USeparator />

    <UContentNavigation
      highlight
      variant="link"
      :navigation="navigation"
    />
  </div>
</template>
