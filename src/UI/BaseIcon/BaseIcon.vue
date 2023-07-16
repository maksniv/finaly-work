<template>
  <svg :width="iconWeight" :height="iconHeight" :class="className">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import '@/assets/icons/downArrowIcon.svg';

import '@/assets/icons/sort/sortUpIcon.svg';
import '@/assets/icons/sort/sortDownIcon.svg';

import '@/assets/icons/input/searchIcon.svg';
import '@/assets/icons/input/clearIcon.svg';
import '@/assets/icons/input/eyeCloseIcon.svg';
import '@/assets/icons/input/eyeOpenIcon.svg';

import '@/assets/icons/button/deletePhotoIcon.svg';
import '@/assets/icons/button/filterIcon.svg';
import '@/assets/icons/button/leftArrowIcon.svg';
import '@/assets/icons/button/rightArrowIcon.svg';
import '@/assets/icons/button/moreIcon.svg';

import '@/assets/icons/404/monster404.svg';

export default {
  name: 'BaseIcon',
  props: {
    iconName: {
      type: String,
      default: 'moreIcon',
    },
    iconHeight: {
      type: String,
      default: '10',
    },
    iconWeight: {
      type: String,
      default: '10',
    },
    iconRadius: {
      type: String,
      default: '0',
    },
    className: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseIcon/BaseIcon.scss';
</style>
