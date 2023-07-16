<template>
  <div class="modal-photo-edit">
    <BaseForm :textSize="'small'">
      <template v-slot:title> Редактирование фото </template>
      <template v-slot:body>
        <div class="modal-photo-edit__form">
          <BaseInputLoader @uploadFile="updatePhotoInLoader"></BaseInputLoader>
        </div>
      </template>
      <template v-slot:footer>
        <BaseButton
          :textButton="'Отмена'"
          :class="'button-secondary'"
          @click.native="closeModal"
        ></BaseButton>
        <BaseButton
          :textButton="'Сохранить изменения'"
          :class="'button-primary'"
          @click.native="sendPhoto"
        ></BaseButton>
      </template>
    </BaseForm>
  </div>
</template>

<script>
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseInputLoader from '@/UI/BaseInputLoader/BaseInputLoader.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ModalPhotoEdit',
  components: {
    BaseButton,
    BaseForm,
    BaseInputLoader,
  },
  data() {
    return {
      file: '',
    };
  },
  props: {
    userId: {
      type: String,
    },
  },
  methods: {
    ...mapActions('usersModule', ['updatePhoto']),
    closeModal() {
      this.$emit('closeModal');
    },
    sendPhoto() {
      const formData = new FormData();
      formData.append('_id', this.userId);
      formData.append('picture', this.file);

      this.updatePhoto(formData);
      this.$emit('closeModal');
    },
    updatePhotoInLoader(file) {
      this.file = file;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/ModalPhotoEdit/ModalPhotoEdit.scss';
</style>
