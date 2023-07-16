<template>
  <div class="user-info">
    <div
      class="user-info__button-wrapper"
      v-show="this.$route.params.id != undefined"
    >
      <BaseButton
        @click.native="
          $router.push({
            name: 'mainUsers',
            params: { pageNumber: 1 },
          })
        "
        :textButton="'Вернуться к списку пользователей'"
        :class="'button-secondary'"
        :isShowIcon="true"
        :iconName="'#leftArrowIcon'"
        :iconHeight="'24'"
        :iconWeight="'24'"
      ></BaseButton>
    </div>
    <div class="user-info__content-wrapper">
      <BigAvatarWithButton
        :userName="user.name"
        :userPhoto="user.picture"
        :userId="user._id"
      ></BigAvatarWithButton>
      <div class="description">
        <div class="description__wrapper">
          <div class="description__name">
            {{ user.name }}
            <BaseBadgeStatus :status="user.status"></BaseBadgeStatus>
          </div>
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
              @click.native="toggleModalConfirmChangePassword"
              :className="'dropdown-menu__item'"
              :textMenu="'Изменить пароль'"
            >
            </BaseMenuItemDropdownButton>
            <BaseMenuItemDropdownButton
              @click.native="
                $router.push({
                  name: 'mainTasks',
                  params: { pageNumber: 1, userId: user._id },
                })
              "
              :className="'dropdown-menu__item'"
              :textMenu="'Просмотр задач пользователя'"
            >
            </BaseMenuItemDropdownButton>
            <BaseMenuItemDropdownButton
              v-show="user.roles[0] != 'USER'"
              @click.native="toggleModalDelete"
              :className="'dropdown-menu__item red'"
              :textMenu="'Удалить'"
            ></BaseMenuItemDropdownButton>
          </DropdownButton>
        </div>
        <div class="description__about">О себе:</div>
        <div class="description__text">
          {{ user.description }}
        </div>
      </div>
    </div>
    <BaseModal :showModal="showModalConfirmChangePassword">
      <ModalConfirmChangePassword
        @closeModal="toggleModalConfirmChangePassword"
        @continueClick="continueClick"
      ></ModalConfirmChangePassword>
    </BaseModal>
    <BaseModal :showModal="showModalChangePassword">
      <ModalChangePassword
        @closeModal="toggleModalChangePassword"
        @changePassword="changePassword"
        :userId="user._id"
      ></ModalChangePassword>
    </BaseModal>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseBadgeStatus from '@/UI/BaseBadgeStatus/BaseBadgeStatus.vue';
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue';
import ModalConfirmChangePassword from '@/components/ModalConfirmChangePassword/ModalConfirmChangePassword.vue';
import ModalChangePassword from '@/components/ModalChangePassword/ModalChangePassword.vue';
import BigAvatarWithButton from '@/components/BigAvatarWithButton/BigAvatarWithButton.vue';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';
import BaseModal from '@/UI/BaseModal/BaseModal.vue';

export default {
  name: 'UserInfo',
  components: {
    BaseBadgeStatus,
    DropdownButton,
    BaseMenuItemDropdownButton,
    BaseButton,
    BigAvatarWithButton,
    ModalConfirmChangePassword,
    ModalChangePassword,
    BaseModal,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showModalConfirmChangePassword: false,
      showModalChangePassword: false,
    };
  },
  methods: {
    toggleModalConfirmChangePassword() {
      this.showModalConfirmChangePassword =
        !this.showModalConfirmChangePassword;
    },
    toggleModalChangePassword() {
      this.showModalChangePassword = !this.showModalChangePassword;
    },
    continueClick() {
      this.toggleModalConfirmChangePassword();
      this.toggleModalChangePassword();
    },
    changePassword(newPassword) {
      this.$emit('changePassword', newPassword);
    },
  },
  computed: {
    setPicture() {
      return this.user.picture === undefined || this.user.picture === null
        ? `https://placehold.co/300x300?text=${this.user.name}`
        : this.picture;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/UserInfo/UserInfo.scss';
</style>
