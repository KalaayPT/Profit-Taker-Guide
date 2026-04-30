<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string;
    url?: string;
    scale?: number;
    bg?: string;
  }>(),
  {
    scale: 0.85,
    bg: "18181b",
  },
);

const parsed = computed(() => {
  if (props.id) {
    return { origin: "https://www.arsenyx.com", id: props.id.trim() };
  }

  if (props.url) {
    try {
      const u = new URL(props.url);
      const match = u.pathname.match(/\/builds\/([^/?#]+)/i);
      if (match?.[1]) return { origin: u.origin, id: match[1] };
    } catch {
      const match = props.url.match(/\/builds\/([^/?#]+)/i);
      if (match?.[1])
        return { origin: "https://www.arsenyx.com", id: match[1] };
    }
  }

  return undefined;
});

const embedUrl = computed(() => {
  if (!parsed.value) {
    return undefined;
  }

  const params = new URLSearchParams({ embed: "1" });
  if (props.scale !== 1) params.set("scale", String(props.scale));
  if (props.bg) params.set("bg", props.bg.replace(/^#/, ""));

  return `${parsed.value.origin}/builds/${parsed.value.id}?${params}`;
});
</script>

<template>
  <iframe
    v-if="embedUrl"
    :src="embedUrl"
    style="width: 100%; border: none"
    height="1"
    loading="lazy"
    class="my-6 block rounded-md"
  />

  <div v-else class="my-6 text-sm text-red-500">
    Invalid build embed. Provide <code>id</code> or <code>url</code>.
  </div>
</template>
