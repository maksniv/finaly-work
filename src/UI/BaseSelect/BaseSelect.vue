<template>
  <div class="select__wrapper" v-click-outside="onClickOutside">
    <div class="select__select" @click="isOpened = !isOpened">
      {{ placeholderTextInComponent }}
      <div class="select__select-menu-container" v-show="isOpened">
        <slot></slot>
      </div>
    </div>
    <div :class="setClassDropdownIcon" @click="isOpened = !isOpened">
      <BaseIcon
        :iconName="'#downArrowIcon'"
        :iconHeight="'8'"
        :iconWeight="'14'"
      ></BaseIcon>
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';
import vClickOutside from 'v-click-outside';

export default {
  name: 'BaseSelect',
  components: { BaseIcon },
  props: {
    placeholderText: {
      type: String,
      default: '',
    },
    optionSelected: {
      type: String,
    },
  },
  data() {
    return {
      isOpened: false,
      placeholderTextInComponent: '',
    };
  },
  methods: {
    onClickOutside() {
      this.isOpened = false;
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    setClassDropdownIcon() {
      return this.isOpened
        ? 'select__icon select__icon-active'
        : 'select__icon';
    },
  },
  mounted() {
    if (this.optionSelected === '') {
      this.placeholderTextInComponent = this.placeholderText;
    } else {
      this.placeholderTextInComponent = this.optionSelected;
    }
  },
  watch: {
    optionSelected() {
      this.placeholderTextInComponent = this.optionSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseSelect/BaseSelect.scss';
</style>
