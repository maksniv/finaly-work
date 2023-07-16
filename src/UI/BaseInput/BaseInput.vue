<template>
  <div class="field">
    <input
      v-bind="$attrs"
      :class="setClassInput"
      :type="showPassword ? 'text' : typeInput"
      :placeholder="placeholderText"
      :value="inputValue"
      @input="$emit('input', $event.target.value)"
    />
    <div class="field__icon-search" v-if="typeInput === 'search'">
      <BaseIcon
        :iconHeight="'24'"
        :iconWeight="'24'"
        :iconName="'#searchIcon'"
      ></BaseIcon>
    </div>
    <div
      class="field__icon-password"
      v-if="typeInput === 'password'"
      @click="toggleShowPassword"
    >
      <BaseIcon
        v-show="!showPassword"
        :iconHeight="'24'"
        :iconWeight="'24'"
        :iconName="'#eyeCloseIcon'"
      ></BaseIcon>
      <BaseIcon
        v-show="showPassword"
        :iconHeight="'24'"
        :iconWeight="'24'"
        :iconName="'#eyeOpenIcon'"
      ></BaseIcon>
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';

export default {
  name: 'BaseInput',
  components: { BaseIcon },
  data() {
    return {
      showPassword: false,
    };
  },
  props: {
    placeholderText: {
      type: String,
      default: 'Введите значение...',
    },
    inputValue: {
      type: String,
    },
    typeInput: {
      type: String,
      default: 'text',
    },
    presenceError: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
  computed: {
    setClassInput() {
      return this.presenceError
        ? 'field__input'
        : 'field__input field__input-error';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseInput/BaseInput.scss';
</style>
