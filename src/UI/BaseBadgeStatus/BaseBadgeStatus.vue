<template>
  <span :class="setClassStatus">{{ setNameStatus }}</span>
</template>

<script>
import {
  TaskStatusName,
  TaskStatusClass,
  UserStatusClass,
  UserStatusName,
} from '@/common/status';
export default {
  name: 'BadgeStatus',
  props: {
    status: {
      type: String,
    },
  },
  computed: {
    setClassStatus() {
      return TaskStatusClass[this.status] || UserStatusClass[this.status];
    },
    setNameStatus() {
      return TaskStatusName[this.status] || UserStatusName[this.status];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseBadgeStatus/BaseBadgeStatus.scss';
</style>
