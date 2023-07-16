<template>
  <div class="form">
    <h1 :class="setTextSize"><slot name="title"></slot></h1>
    <div class="form__line"></div>
    <div class="form__wrapper">
      <slot name="body"></slot>
    </div>
    <div class="form__line"></div>
    <div class="form__button-wrapper">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  props: { textSize: { type: String } },
  computed: {
    setTextSize() {
      return this.textSize === 'small'
        ? 'form__title-small'
        : 'form__title-big';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseForm/BaseForm.scss';
</style>
