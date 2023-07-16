<template>
  <div class="select__wrapper" v-click-outside="onClickOutside">
    <div class="select__select" @click="isOpened = !isOpened">
      {{ placeholderTextInComponent }}
      <div class="select__select-menu-container" v-show="isOpened">
        <div class="select__options">
          <div
            class="select__option"
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            @click="selectOption(option)"
          >
            {{ option.name }}
          </div>
        </div>
      </div>
      <div :class="setClassDropdownIcon">
        <BaseIcon
          :iconName="'#downArrowIcon'"
          :iconHeight="'8'"
          :iconWeight="'14'"
        ></BaseIcon>
      </div>
    </div>
    <div @click="selectSortOptionUpDown">
      <BaseButton
        v-show="valueButton === 'desc'"
        :class="'button-icon button-icon__for-select'"
        :isShowIcon="true"
        :iconHeight="'24'"
        :iconWeight="'24'"
        :iconName="'#sortUpIcon'"
        @click.native="valueButton = 'asc'"
      ></BaseButton>
      <BaseButton
        v-show="valueButton === 'asc'"
        :class="'button-icon button-icon__for-select'"
        :isShowIcon="true"
        :iconHeight="'16'"
        :iconWeight="'16'"
        :iconName="'#sortDownIcon'"
        @click.native="valueButton = 'desc'"
      ></BaseButton>
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import vClickOutside from 'v-click-outside';

export default {
  name: 'BaseSelectWithButton',
  components: { BaseIcon, BaseButton },
  props: {
    placeholderText: {
      type: String,
      default: '',
    },
    optionSelected: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpened: false,
      placeholderTextInComponent: '',
      valueButton: 'desc',
    };
  },
  methods: {
    onClickOutside() {
      this.isOpened = false;
    },
    selectOption(option) {
      this.placeholderTextInComponent = option.name;
      this.$emit('select', option.value);
    },
    selectSortOptionUpDown() {
      this.$emit('selectOptionSortingUpDown', this.valueButton);
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
    this.placeholderTextInComponent = this.placeholderText;
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseSelectWithButton/BaseSelectWithButton.scss';
</style>
