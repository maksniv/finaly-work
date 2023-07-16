<template>
  <div
    class="dropdown-button"
    @click="isOpened = !isOpened"
    v-click-outside="onClickOutside"
  >
    <BaseButton
      :class="'button-icon'"
      :isShowIcon="true"
      :iconHeight="iconHeight"
      :iconWeight="iconWeight"
      :iconName="iconName"
    ></BaseButton>
    <div class="dropdown-menu__container" v-show="isOpened">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import vClickOutside from 'v-click-outside';

export default {
  name: 'DropdownButton',
  components: { BaseButton },
  data() {
    return {
      isOpened: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    onClickOutside() {
      this.isOpened = false;
    },
  },
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
      default: '#moreIcon',
    },
    iconHeight: {
      type: String,
      default: '14',
    },
    iconWeight: {
      type: String,
      default: '4',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/DropdownButton/DropdownButton.scss';
</style>
