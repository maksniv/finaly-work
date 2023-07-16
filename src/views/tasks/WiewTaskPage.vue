<template>
  <main class="page">
    Страница просмотра задачи c id: {{ id }}
    <BaseButton
      @click.native="$router.go(-1)"
      :textButton="'Вернуться к списку задач'"
      :class="'button-secondary'"
      :isShowIcon="true"
      :iconName="'#leftArrowIcon'"
      :iconHeight="'24'"
      :iconWeight="'24'"
    ></BaseButton>
  </main>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';

export default {
  name: 'WiewTaskPage',
  components: { BaseButton },
  data() {
    return {
      id: '',
    };
  },
  methods: {},
  mounted() {
    this.id = this.$route.params.taskId;
  },
  watch: {},
};
</script>
