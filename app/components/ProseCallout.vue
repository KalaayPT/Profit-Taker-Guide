<script>
import theme from "#build/ui/prose/callout";
</script>

<script setup>
import { computed } from "vue";
import { useAppConfig } from "#imports";
import UIcon from "#ui/components/Icon.vue";
import ULink from "#ui/components/Link.vue";
import { useComponentProps } from "#ui/composables/useComponentProps";
import { tv } from "#ui/utils/tv";

defineOptions({ inheritAttrs: false });

const _props = defineProps({
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
const props = useComponentProps("prose.callout", _props);
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
  <div :class="ui.base({ class: [props.ui?.base, props.class] })">
    <ULink v-if="props.to" v-bind="{ to: props.to, target, ...$attrs }" class="focus:outline-none" raw>
      <span class="absolute inset-0" aria-hidden="true" />
    </ULink>

    <UIcon v-if="props.icon" :name="props.icon" :class="ui.icon({ class: props.ui?.icon })" />
    <UIcon
      v-if="!!props.to && target === '_blank'"
      :name="appConfig.ui.icons.external"
      :class="ui.externalIcon({ class: props.ui?.externalIcon })"
    />

    <div v-if="props.title || !!slots.title" class="contents">
      <p v-if="props.title || !!slots.title" class="mr-1 inline font-medium">
        <slot name="title" mdc-unwrap="p">
          {{ props.title }}
        </slot>
      </p>
    </div>

    <div
      class="contents"
      :class="[
        '[&>p]:my-1.5 [&>ul]:my-1.5 [&>ol]:my-1.5 [&>div]:my-1.5',
        !hasExplicitTitle ? '[&>p:first-child]:inline [&>p:first-child]:mr-1 [&>p:first-child]:my-0' : '',
      ]"
    >
      <slot />
    </div>
  </div>
</template>
