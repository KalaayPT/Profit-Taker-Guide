<script setup>
import theme from "#build/ui/prose/a";
import { computed } from "vue";
import { useAppConfig } from "#imports";
import UIcon from "#ui/components/Icon.vue";
import ULink from "#ui/components/Link.vue";
import { useComponentUI } from "#ui/composables/useComponentUI";
import { tv } from "#ui/utils/tv";

const props = defineProps({
  href: { type: String, required: false },
  target: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
});

defineSlots();

const appConfig = useAppConfig();
const uiProp = useComponentUI("prose.a", props);
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.ui?.prose?.a || {}) }));
const isExternal = computed(() => props.target === "_blank" || props.href?.startsWith("http"));
const target = computed(() => props.target || (isExternal.value ? "_blank" : undefined));
</script>

<template>
  <ULink
    :href="href"
    :target="target"
    :class="ui({ class: [uiProp?.base, props.class] })"
    raw
  >
    <slot />
    <UIcon
      v-if="isExternal"
      :name="appConfig.ui.icons.external"
      class="ms-0.5 inline-block size-3 align-text-top"
    />
  </ULink>
</template>
