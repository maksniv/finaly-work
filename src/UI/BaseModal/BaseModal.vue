<template>
  <div :class="setClassOverlay">
    <div :class="setClassModal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    setClassOverlay() {
      return this.showModal ? 'overlay overlay__active' : 'overlay';
    },
    setClassModal() {
      return this.showModal ? 'modal modal__active' : 'modal';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseModal/BaseModal.scss';
</style>
