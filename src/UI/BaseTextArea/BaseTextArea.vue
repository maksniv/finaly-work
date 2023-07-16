<template>
  <textarea
    v-bind="$attrs"
    class="textarea"
    :placeholder="placeholderText"
    :value="textAreaValue"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: 'BaseTextArea',
  props: {
    placeholderText: {
      type: String,
      default: '',
    },
    textAreaValue: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseTextArea/BaseTextArea.scss';
</style>
