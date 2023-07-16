<template>
  <div class="pagination-bar">
    <div class="pagination-bar__navigation">
      <div class="pagination-bar__button-wrapper">
        <BaseButton
          @click.native="movingClick(Number($route.params.pageNumber) - 1)"
          :disabled="setDisabledDownButton"
          :class="'button-icon'"
          :isShowIcon="true"
          :iconHeight="'24'"
          :iconWeight="'24'"
          :iconName="'#leftArrowIcon'"
        ></BaseButton>

        <div
          class="pagination-bar__button-pages"
          v-for="page in totalPage"
          :key="page"
        >
          <BaseButton
            :textButton="page.toString()"
            :class="setClassButton(page)"
            @click.native="movingClick(page)"
          ></BaseButton>
        </div>
        <BaseButton
          @click.native="movingClick(Number($route.params.pageNumber) + 1)"
          :disabled="setDisabledUpButton"
          :class="'button-icon'"
          :isShowIcon="true"
          :iconHeight="'24'"
          :iconWeight="'24'"
          :iconName="'#rightArrowIcon'"
        ></BaseButton>
      </div>
      <span class="pagination-bar__input-label">Перейти к странице</span>
      <div class="pagination-bar__input-wrapper">
        <BaseInput
          @keydown.native.enter="movingClick(modelPaginationData.pageNumber)"
          :placeholderText="''"
          v-model="modelPaginationData.pageNumber"
          :inputValue="modelPaginationData.pageNumber"
        ></BaseInput>
      </div>
    </div>
    <span class="pagination-bar__page-info"
      >{{ activePage * limit - 9 }}-{{ activePage * limit }} из
      {{ totalPage * limit }}
    </span>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseInput from '@/UI/BaseInput/BaseInput.vue';

export default {
  name: 'PaginationBar',
  components: { BaseButton, BaseInput },
  data() {
    return {
      modelPaginationData: {
        pageNumber: '',
      },
    };
  },
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: [Number, String],
      default: 1,
    },
    activePage: {
      type: [Number, String],
      default: 1,
    },
  },
  computed: {
    setDisabledDownButton() {
      if (this.activePage == 1) {
        return true;
      } else {
        return false;
      }
    },
    setDisabledUpButton() {
      if (this.activePage == this.totalPage) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    movingClick(page) {
      this.modelPaginationData.pageNumber = '';
      this.$emit('pushToPage', page);
    },
    setClassButton(page) {
      return this.activePage == page ? 'button-primary' : 'button-secondary';
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '@/modules/PaginationBar/PaginationBar.scss';
</style>
