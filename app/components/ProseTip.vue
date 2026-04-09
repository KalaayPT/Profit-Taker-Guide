<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <ProseCallout color="success" :icon="appConfig.ui.icons.tip">
    <slot />
  </ProseCallout>
</template>
