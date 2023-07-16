<template>
  <div class="modal-confirm-change-password">
    <BaseForm :textSize="'small'">
      <template v-slot:title> Изменение пароля </template>
      <template v-slot:body>
        <div class="modal-change-password__form">
          Вы уверены, что хотите изменить пароль?
        </div>
      </template>
      <template v-slot:footer>
        <BaseButton
          :textButton="'Отмена'"
          :class="'button-secondary'"
          @click.native="closeModal"
        ></BaseButton>
        <BaseButton
          :textButton="'Да, продолжить'"
          :class="'button-primary'"
          @click.native="continueClick"
        ></BaseButton>
      </template>
    </BaseForm>
  </div>
</template>

<script>
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';

export default {
  name: 'ModalConfirmChangePassword',
  components: {
    BaseButton,
    BaseForm,
  },
  props: {},
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    continueClick() {
      this.$emit('continueClick');
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/ModalConfirmChangePassword/ModalConfirmChangePassword.scss';
</style>
