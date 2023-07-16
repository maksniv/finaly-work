<template>
  <div class="sort-button" @click="selectSortOptionUpDown">
    <BaseButton
      v-show="valueButton === 'desc'"
      :class="'button-icon'"
      :isShowIcon="true"
      :iconHeight="'24'"
      :iconWeight="'24'"
      :iconName="'#sortUpIcon'"
      @click.native="valueButton = 'asc'"
    ></BaseButton>
    <BaseButton
      v-show="valueButton === 'asc'"
      :class="'button-icon'"
      :isShowIcon="true"
      :iconHeight="'16'"
      :iconWeight="'16'"
      :iconName="'#sortDownIcon'"
      @click.native="valueButton = 'desc'"
    ></BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';

export default {
  name: 'SortButtonUpDown',
  components: { BaseButton },
  props: {},
  data() {
    return {
      valueButton: 'desc',
    };
  },
  methods: {
    selectSortOptionUpDown() {
      this.$emit('selectOptionSortingUpDown', this.valueButton);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/SortButtonUpDown/SortButtonUpDown.scss';
</style>
