<template>
  <main class="page">
    <CreateEditUser></CreateEditUser>
  </main>
</template>

<script>
import CreateEditUser from '@/modules/CreateEditUser/CreateEditUser.vue';

export default {
  name: 'EditUserPage',
  components: { CreateEditUser },
  data() {
    return {};
  },
};
</script>
