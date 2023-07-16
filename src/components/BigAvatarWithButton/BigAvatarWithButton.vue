<template>
  <div class="avatar-block__wrapper">
    <img :src="setPicture" class="avatar-block__img" />
    <div class="avatar-block__more-button">
      <DropdownButton>
        <BaseMenuItemDropdownButton
          @click.native="toggleModalPhotoEdit"
          :className="'dropdown-menu__item'"
          :textMenu="'Редактировать'"
        ></BaseMenuItemDropdownButton>
        <BaseMenuItemDropdownButton
          :disabled="this.userPhoto === undefined || this.userPhoto === null"
          :className="'dropdown-menu__item red'"
          :textMenu="'Удалить'"
        >
        </BaseMenuItemDropdownButton>
      </DropdownButton>
    </div>
    <BaseModal :showModal="showModalPhotoEdit">
      <ModalPhotoEdit
        @closeModal="toggleModalPhotoEdit"
        :userId="userId"
      ></ModalPhotoEdit>
    </BaseModal>
  </div>
</template>

<script>
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue';
import BaseModal from '@/UI/BaseModal/BaseModal.vue';
import ModalPhotoEdit from '@/components/ModalPhotoEdit/ModalPhotoEdit.vue';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';

export default {
  name: 'BigAvatarWithButton',
  components: {
    DropdownButton,
    BaseMenuItemDropdownButton,
    ModalPhotoEdit,
    BaseModal,
  },
  props: {
    userPhoto: {
      type: String,
    },
    userName: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  data() {
    return {
      showModalPhotoEdit: false,
    };
  },
  methods: {
    toggleModalPhotoEdit() {
      this.showModalPhotoEdit = !this.showModalPhotoEdit;
    },
  },
  computed: {
    setPicture() {
      console.log(this.userPhoto);
      return this.userPhoto === undefined || this.userPhoto === null
        ? `https://placehold.co/300x300?text=${this.userName}`
        : this.picture;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/BigAvatarWithButton/BigAvatarWithButton.scss';
</style>
