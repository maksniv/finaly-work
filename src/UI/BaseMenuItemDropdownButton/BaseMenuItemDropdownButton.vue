<template>
  <button v-bind="$attrs" :class="className">{{ textMenu }}</button>
</template>

<script>
export default {
  name: 'BaseMenuItemDropdownButton',
  props: {
    className: {
      type: String,
    },
    textMenu: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.scss';
</style>
