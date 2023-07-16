<template>
  <span class="item__time">{{ text }} {{ timeInComponent }} </span>
</template>

<script>
export default {
  name: 'BaseTimeItem',
  props: {
    time: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
      timeInComponent: this.time,
    };
  },
  computed: {},
  methods: {
    timeConverter(timeString) {
      const eventDate = Date.parse(timeString);
      const nowDate = Date.now();
      const differenceDate = nowDate - eventDate;

      if (differenceDate <= 60_000) {
        this.timeInComponent = `только что`;
      }
      if (60_000 < differenceDate && differenceDate <= 3_600_000) {
        const minutes = Math.floor(differenceDate / 60_000);
        this.timeInComponent = `${minutes} минут назад`;
      }
      if (3_600_000 < differenceDate && differenceDate <= 86_400_000) {
        const hours = Math.floor(differenceDate / 3_600_000);
        this.timeInComponent = `${hours} час назад`;
      }
      if (86_400_000 < differenceDate && differenceDate <= 2_592_000_000) {
        const days = Math.floor(differenceDate / 86_400_000);
        this.timeInComponent = `${days} дней назад`;
      }
      if (2_592_000_000 < differenceDate && differenceDate <= 31_104_000_000) {
        const months = Math.floor(differenceDate / 2_592_000_000);
        this.timeInComponent = `${months} месяцев назад`;
      }
      if (31_104_000_001 <= differenceDate) {
        const year = Math.floor(differenceDate / 31_104_000_000);
        this.timeInComponent = `${year} лет назад`;
      }
    },
  },
  mounted() {
    this.timeConverter(this.time);
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseTimeItem/BaseTimeItem.scss';
</style>
