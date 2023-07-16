<template>
  <main class="page">
    <CreateEditTask></CreateEditTask>
    <router-view />
  </main>
</template>

<script>
import CreateEditTask from '@/modules/CreateEditTask/CreateEditTask.vue';

export default {
  name: 'CreateTaskPage',
  components: { CreateEditTask },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>
