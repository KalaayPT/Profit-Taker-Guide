<script setup lang="ts">
const appConfig = useAppConfig()
const { hasLogo, headerLightUrl, headerDarkUrl, contextMenuItems } = useLogoAssets()

const title = computed(() => appConfig.header?.title || 'Profit-Taker Guide')
</script>

<template>
  <UContextMenu
    v-if="hasLogo"
    :items="contextMenuItems"
  >
    <span class="inline-flex items-center gap-2 lg:pe-2.5">
      <UColorModeImage
        :light="headerLightUrl"
        :dark="headerDarkUrl"
        :alt="appConfig.header?.logo?.alt || title"
        :class="['h-6 w-auto shrink-0', appConfig.header?.logo?.class]"
      />
      <span class="whitespace-nowrap text-base sm:text-xl">
        {{ title }}
      </span>
    </span>
  </UContextMenu>
  <span v-else>
    {{ title }}
  </span>
</template>
