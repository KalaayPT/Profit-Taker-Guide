<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  url?: string
  bg?: string
  alt?: string
}>(), {
  bg: '18181b',
})

const buildId = computed(() => {
  if (props.id) {
    return props.id.trim()
  }

  if (props.url) {
    const match = props.url.match(/arsenyx\.com\/builds\/([^/?#]+)/i)
    return match?.[1]
  }

  return undefined
})

const normalizedBg = computed(() => props.bg.replace(/^#/, ''))

const buildUrl = computed(() => {
  if (!buildId.value) {
    return undefined
  }

  return `https://www.arsenyx.com/builds/${buildId.value}`
})

const screenshotUrl = computed(() => {
  if (!buildId.value) {
    return undefined
  }

  return `https://www.arsenyx.com/api/builds/${buildId.value}/screenshot?bg=${encodeURIComponent(normalizedBg.value)}`
})

const altText = computed(() => props.alt || 'Warframe build screenshot')
</script>

<template>
  <a
    v-if="buildUrl && screenshotUrl"
    :href="buildUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="my-6 block"
  >
    <img
      :src="screenshotUrl"
      :alt="altText"
      loading="lazy"
      decoding="async"
      class="w-full rounded-md border border-default"
    >
  </a>

  <div
    v-else
    class="my-6 text-sm text-red-500"
  >
    Invalid build embed. Provide <code>id</code> or <code>url</code>.
  </div>
</template>
