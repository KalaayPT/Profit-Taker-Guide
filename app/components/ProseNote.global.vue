<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <ProseCallout color="info" :icon="appConfig.ui.icons.info">
    <slot />
  </ProseCallout>
</template>
