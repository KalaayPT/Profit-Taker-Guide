<script setup lang="ts">
import { getSocialActionLinks } from '~/utils/socialActionLinks'

const appConfig = useAppConfig()
const { forced: forcedColorMode } = useDocusColorMode()
const actionLinks = computed(() => getSocialActionLinks(appConfig.github?.url))
</script>

<template>
  <template v-if="actionLinks.length">
    <UButton
      v-for="(link, index) in actionLinks"
      :key="index"
      size="sm"
      v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
    />
  </template>

  <ClientOnly v-if="!forcedColorMode">
    <UColorModeButton />

    <template #fallback>
      <div class="h-8 w-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
    </template>
  </ClientOnly>
</template>
