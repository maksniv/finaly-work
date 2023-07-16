<template>
  <div class="page">
    <NavigationBar></NavigationBar>
    <router-view />
  </div>
</template>

<script>
import NavigationBar from '@/modules/NavigationBar/NavigationBar.vue';

export default {
  name: 'MainLayouts',
  components: { NavigationBar },
  methods: {},
  mounted() {},
  watch: {},
};
</script>
