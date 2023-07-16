<template>
  <header>
    <nav class="navigation-bar">
      <router-link :to="{ name: 'projects', params: { pageNumber: 1 } }">
        Проекты
      </router-link>
      <router-link
        :to="{ name: 'mainTasks', params: { pageNumber: 1, userId: getId } }"
      >
        Задачи
      </router-link>
      <router-link :to="{ name: 'mainUsers', params: { pageNumber: 1 } }">
        Пользователи
      </router-link>
      <DropdownUser></DropdownUser>
    </nav>
  </header>
</template>

<script>
import DropdownUser from '@/components/DropdownUser/DropdownUser.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavigationBar',
  components: { DropdownUser },
  computed: {
    ...mapGetters('userModule', ['getId']),
  },
  methods: {
    ...mapActions('userModule', ['getDataCurrentUser']),
  },
  mounted() {
    this.getDataCurrentUser();
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/NavigationBar/NavigationBar.scss';
</style>
