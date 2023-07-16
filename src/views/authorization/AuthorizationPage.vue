<template>
  <main class="page">
    <AuthorizationForm></AuthorizationForm>
  </main>
</template>

<script>
import AuthorizationForm from '@/modules/AuthorizationForm/AuthorizationForm.vue';

export default {
  name: 'AuthorizationPage',
  components: { AuthorizationForm },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>
