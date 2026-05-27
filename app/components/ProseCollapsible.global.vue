<script setup>
import theme from "#build/ui/prose/collapsible";
import { computed } from "vue";
import { useAppConfig } from "#imports";
import UCollapsible from "#ui/components/Collapsible.vue";
import UIcon from "#ui/components/Icon.vue";
import { useComponentProps } from "#ui/composables/useComponentProps";
import { useLocale } from "#ui/composables/useLocale";
import { transformUI } from "#ui/utils";
import { tv } from "#ui/utils/tv";

const _props = defineProps({
  icon: { type: null, required: false },
  name: { type: String, required: false },
  openText: { type: String, required: false },
  closeText: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
});

defineSlots();

const { t } = useLocale();
const appConfig = useAppConfig();
const props = useComponentProps("prose.collapsible", _props);
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.ui?.prose?.collapsible || {}) })());
const label = (open) =>
  props.name ||
  `${open ? props.closeText || t("prose.collapsible.closeText") : props.openText || t("prose.collapsible.openText")} ${t("prose.collapsible.name")}`;
</script>

<template>
  <UCollapsible :unmount-on-hide="false" :class="props.class" :ui="transformUI(ui, props.ui)">
    <template #default="{ open }">
      <button :class="ui.trigger({ class: props.ui?.trigger })">
        <UIcon :name="props.icon || appConfig.ui.icons.chevronDown" :class="ui.triggerIcon({ class: props.ui?.triggerIcon })" />

        <span :class="ui.triggerLabel({ class: props.ui?.triggerLabel })">
          {{ label(open) }}
        </span>
      </button>
    </template>

    <template #content>
      <slot />
    </template>
  </UCollapsible>
</template>
