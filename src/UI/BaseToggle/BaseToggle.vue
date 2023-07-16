<template>
  <label class="toggle">
    <input
      v-bind="$attrs"
      type="checkbox"
      id="switch"
      class="toggle__checkbox"
      :checked="toggleValue"
      :value="'dgf'"
      @change="$emit('input', $event.target.checked)"
    />
    <span class="toggle__label" for="switch"></span>
  </label>
</template>

<script>
export default {
  name: 'BaseToggle',
  props: {
    toggleValue: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseToggle/BaseToggle.scss';
</style>
