<template>
  <button :class="className">
    <BaseIcon
      v-bind="$attrs"
      v-show="isShowIcon"
      :iconName="iconName"
      :iconHeight="iconHeight"
      :iconWeight="iconWeight"
    ></BaseIcon>
    {{ textButton }}
  </button>
</template>

<script>
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';
export default {
  name: 'BaseButton',
  components: { BaseIcon },
  props: {
    textButton: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    isShowIcon: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: '',
    },
    iconHeight: {
      type: String,
    },
    iconWeight: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseButton/BaseButton.scss';
</style>
