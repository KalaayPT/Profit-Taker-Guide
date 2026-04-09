<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <ProseCallout color="warning" :icon="appConfig.ui.icons.warning">
    <slot />
  </ProseCallout>
</template>
