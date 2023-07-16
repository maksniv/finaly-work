<template>
  <div class="container">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'ContainerBlock',
};
</script>

<style lang="scss" scoped>
@import '@/modules/ContainerBlock/ContainerBlock.scss';
</style>
