<template>
  <main class="page">
    <PageNotFoundBlock></PageNotFoundBlock>
  </main>
</template>

<script>
import PageNotFoundBlock from '@/modules/PageNotFoundBlock/PageNotFoundBlock.vue';

export default {
  name: 'NotFoundPage',
  components: { PageNotFoundBlock },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>
