<template>
  <div class="stub">
    <span class="stub__span">{{ stubText }}</span>
    <BaseButton
      v-show="showButton"
      @click.native="onClickAction"
      :textButton="'Добавить'"
      :class="'button-primary'"
    ></BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';

export default {
  name: 'StubElement',
  components: { BaseButton },
  data() {
    return {};
  },
  props: {
    stubText: {
      type: String,
      default: '',
    },
    showButton: {
      type: Boolean,
    },
  },
  methods: {
    onClickAction() {
      this.$emit('onClickAction');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/StubElement/StubElement.scss';
</style>
