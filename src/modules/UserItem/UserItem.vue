<template>
  <div class="user-item">
    <div class="user-item__wrapper">
      <BaseAvatar></BaseAvatar>
      <div
        v-html="highlight(user.name)"
        class="user-item__name"
        @click="
          $router.push({
            name: 'profileUser',
            params: { id: user._id },
          })
        "
      ></div>
      <BaseBadgeStatus :status="user.status"></BaseBadgeStatus>
    </div>
    <div class="user-item__wrapper-dropdown-button">
      <DropdownButton>
        <BaseMenuItemDropdownButton
          @click.native="
            $router.push({
              name: 'editUser',
              params: { id: user._id },
            })
          "
          :className="'dropdown-menu__item'"
          :textMenu="'Редактировать'"
        ></BaseMenuItemDropdownButton>
        <BaseMenuItemDropdownButton
          :className="'dropdown-menu__item red'"
          :textMenu="'Удалить'"
        >
        </BaseMenuItemDropdownButton>
      </DropdownButton>
    </div>
  </div>
</template>

<script>
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';
import BaseBadgeStatus from '@/UI/BaseBadgeStatus/BaseBadgeStatus.vue';
import BaseAvatar from '@/UI/BaseAvatar/BaseAvatar.vue';

export default {
  name: 'TaskItem',
  components: {
    DropdownButton,
    BaseAvatar,
    BaseBadgeStatus,
    BaseMenuItemDropdownButton,
  },
  props: {
    user: {
      type: Object,
    },
    searchUsersValue: {
      type: String,
    },
   
  },
  methods: {
    highlight(content) {
      if (!this.searchUsersValue) {
        return content;
      }
      return content.replace(
        new RegExp(this.searchUsersValue, 'gi'),
        (match) => {
          return '<strong>' + match + '</strong>';
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/UserItem/UserItem.scss';
</style>
