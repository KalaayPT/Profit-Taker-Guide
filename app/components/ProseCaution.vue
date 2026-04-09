<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <ProseCallout color="error" :icon="appConfig.ui.icons.caution">
    <slot />
  </ProseCallout>
</template>
