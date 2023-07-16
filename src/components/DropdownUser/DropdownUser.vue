<template>
  <div
    :class="setClassDropdownUser"
    @click.self="isOpened = !isOpened"
    v-click-outside="onClickOutside"
  >
    <BaseAvatar></BaseAvatar>
    <div :class="setClassDropdownIcon">
      <BaseIcon
        :iconName="'#downArrowIcon'"
        :iconHeight="'8'"
        :iconWeight="'14'"
      ></BaseIcon>
    </div>
    <div class="dropdown-menu__container" v-show="isOpened">
      <BaseMenuItemDropdownButton
        @click.native="
          $router.push({
            name: 'profileUser',
            params: { id: getId },
          })
        "
        :className="'dropdown-menu__item'"
        :textMenu="'Профиль'"
      ></BaseMenuItemDropdownButton>
      <BaseMenuItemDropdownButton
        @click.native="exitFromSystem"
        :className="'dropdown-menu__item'"
        :textMenu="'Выход'"
      >
      </BaseMenuItemDropdownButton>
    </div>
  </div>
</template>

<script>
import BaseAvatar from '@/UI/BaseAvatar/BaseAvatar.vue';
import BaseIcon from '@/UI/BaseIcon/BaseIcon.vue';
import vClickOutside from 'v-click-outside';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'DropdownUser',
  components: { BaseAvatar, BaseIcon, BaseMenuItemDropdownButton },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    onClickOutside() {
      this.isOpened = false;
    },
    exitFromSystem() {
      this.$router.push({
        name: 'authorization',
      });
      localStorage.removeItem('token');
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapGetters('userModule', ['getId']),
    setClassDropdownUser() {
      return this.isOpened
        ? 'dropdown-user dropdown-user-active'
        : 'dropdown-user';
    },
    setClassDropdownIcon() {
      return this.isOpened
        ? 'dropdown__icon dropdown__icon-active'
        : 'dropdown__icon';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/DropdownUser/DropdownUser.scss';
</style>
