<template>
  <main class="page">
    <UserInfo :user="getUser" @changePassword="changePassword"></UserInfo>
  </main>
</template>

<script>
import UserInfo from '@/modules/UserInfo/UserInfo.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProfileUserPage',
  components: { UserInfo },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('usersModule', ['getUser']),
  },
  methods: {
    ...mapActions('usersModule', ['userGetItem', 'changePassword']),
  },
  mounted() {
    this.userGetItem({
      page: 1,
      limit: 10,
      filter: {
        _id: this.$route.params.id,
      },
    });
  },
  watch: {},
};
</script>
