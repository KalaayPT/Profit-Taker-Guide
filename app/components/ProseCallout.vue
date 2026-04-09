<script>
import theme from "#build/ui/prose/callout";
</script>

<script setup>
import { computed } from "vue";
import { useAppConfig } from "#imports";
import UIcon from "#ui/components/Icon.vue";
import ULink from "#ui/components/Link.vue";
import { useComponentUI } from "#ui/composables/useComponentUI";
import { tv } from "#ui/utils/tv";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false, default: undefined },
  color: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
});

const slots = defineSlots();

const appConfig = useAppConfig();
const uiProp = useComponentUI("prose.callout", props);
const ui = computed(() =>
  tv({ extend: tv(theme), ...(appConfig.ui?.prose?.callout || {}) })({
    color: props.color,
    to: !!props.to,
  }),
);
const hasExplicitTitle = computed(() => !!props.title || !!slots.title);
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

    <UIcon v-if="icon" :name="icon" :class="ui.icon({ class: uiProp?.icon })" />
    <UIcon
      v-if="!!to && target === '_blank'"
      :name="appConfig.ui.icons.external"
      :class="ui.externalIcon({ class: uiProp?.externalIcon })"
    />

    <div v-if="title || !!slots.title" class="contents">
      <p v-if="title || !!slots.title" class="mr-1 inline font-medium">
        <slot name="title" mdc-unwrap="p">
          {{ title }}
        </slot>
      </p>
    </div>

    <div
      class="contents"
      :class="!hasExplicitTitle ? '[&>p:first-child]:inline [&>p:first-child]:mr-1 [&>p:first-child]:my-0' : ''"
    >
      <slot />
    </div>
  </div>
</template>
