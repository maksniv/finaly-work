<template>
  <input
    class="radio-button"
    v-bind="$attrs"
    type="checkbox"
    :name="name"
    :value="value"
    @change="$emit('input', $event.target.checked)"
  />
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    select: {
      type: Boolean,
    },
    value: {
      type: String,
    },
    name: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseRadioButton/BaseRadioButton.scss';
</style>
