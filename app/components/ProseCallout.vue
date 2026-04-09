<script setup>
import theme from "#build/ui/prose/callout";
import { computed } from "vue";
import { useAppConfig } from "#imports";
import UIcon from "#ui/components/Icon.vue";
import ULink from "#ui/components/Link.vue";
import { useComponentUI } from "#ui/composables/useComponentUI";
import { tv } from "#ui/utils/tv";

const props = defineProps({
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  icon: { type: null, required: false },
  color: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
});

defineSlots();

const appConfig = useAppConfig();
const uiProp = useComponentUI("prose.callout", props);
const ui = computed(() =>
  tv({ extend: tv(theme), ...(appConfig.ui?.prose?.callout || {}) })({
    color: props.color,
    to: !!props.to,
  }),
);
const target = computed(() =>
  props.target ||
  (!!props.to && typeof props.to === "string" && props.to.startsWith("http")
    ? "_blank"
    : undefined),
);
</script>

<template>
  <div :class="ui.base({ class: [uiProp?.base, props.class] })">
    <ULink v-if="to" v-bind="{ to, target, ...$attrs }" class="focus:outline-none" raw>
      <span class="absolute inset-0" aria-hidden="true" />
    </ULink>

    <UIcon
      v-if="!!to && target === '_blank'"
      :name="appConfig.ui.icons.external"
      :class="ui.externalIcon({ class: uiProp?.externalIcon })"
    />

    <div class="flex min-w-0 gap-2.5">
      <UIcon
        v-if="icon"
        :name="icon"
        :class="ui.icon({ class: [uiProp?.icon, 'mt-1 me-0'] })"
      />

      <div class="min-w-0 flex-1 *:first:mt-0 *:last:mb-0">
        <slot />
      </div>
    </div>
  </div>
</template>
