<template>
  <img :src="setPicture" class="avatar" />
  <!-- <img :src="`https://placehold.co/24x24?text=${this.author}`" class="avatar" /> -->
</template>

<script>
export default {
  name: 'BaseAvatar',
  props: {
    picture: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  computed: {
    setPicture() {
      return this.picture === undefined
        ? `https://placehold.co/24x24?text=${this.author}`
        : this.picture;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseAvatar/BaseAvatar.scss';
</style>
