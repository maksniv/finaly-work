<template>
  <div class="page-not-found__container">
    <div class="page-not-found__wrapper">
      <div class="page-not-found__title">Страница не найдена</div>
      <div class="page-not-found__text">
        Кажется, что страница, которую вы ищете, где-то потерялась, но не
        беспокойтесь, мы вас вернем.
      </div>
      <BaseButton
        @click.native="
          $router.push({
            name: 'projects',
            params: { pageNumber: 1 },
          })
        "
        :textButton="'Вернуться'"
        :class="'button-primary'"
      ></BaseButton>
    </div>
    <div class="page-not-found__img">
      <BaseIcon
        v-show="true"
        :iconName="'#monster404'"
        :iconHeight="'400'"
        :iconWeight="'400'"
      ></BaseIcon>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';

export default {
  name: 'PageNotFoundBlock',
  components: { BaseButton, BaseIcon },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '@/modules/PageNotFoundBlock/PageNotFoundBlock.scss';
</style>
