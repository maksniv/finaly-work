<template>
  <div :class="className">
    <span class="form-row__name">
      {{ nameFormRowItem }}
      <span class="form-row__star" v-show="starShow">*</span>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormRowItem',
  props: {
    nameFormRowItem: {
      type: String,
      default: '',
    },
    starShow: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: 'form-row__item-flex',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseFormRowItem/BaseFormRowItem.scss';
</style>
