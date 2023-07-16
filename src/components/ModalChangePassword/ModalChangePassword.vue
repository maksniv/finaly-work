<template>
  <div class="modal-change-password">
    <BaseForm :textSize="'small'">
      <template v-slot:title> Изменение пароля </template>
      <template v-slot:body>
        <div class="modal-change-password__form">
          <BaseFormRowItem :nameFormRowItem="'Новый пароль'" :starShow="true">
            <BaseInput
              :placeholderText="'Введите пароль'"
              :typeInput="'password'"
              v-model="modelDataPassword.newPassword"
              :inputValue="modelDataPassword.newPassword"
            ></BaseInput>
          </BaseFormRowItem>
          <BaseFormRowItem>
            <BaseInput
              :placeholderText="'Повторите новый пароль'"
              :typeInput="'password'"
              v-model="modelDataPassword.repeatPassword"
              :inputValue="modelDataPassword.repeatPassword"
            ></BaseInput>
          </BaseFormRowItem>
        </div>
      </template>
      <template v-slot:footer>
        <BaseButton
          :textButton="'Отмена'"
          :class="'button-secondary'"
          @click.native="closeModal"
        ></BaseButton>
        <BaseButton
          :textButton="'Изменить пароль'"
          :class="'button-primary'"
          @click.native="changePassword"
          :disabled="checkPassword"
        ></BaseButton>
      </template>
    </BaseForm>
  </div>
</template>

<script>
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseInput from '@/UI/BaseInput/BaseInput.vue';
import BaseFormRowItem from '@/UI/BaseFormRowItem/BaseFormRowItem.vue';

export default {
  name: 'ModalChangePassword',
  components: {
    BaseButton,
    BaseInput,
    BaseForm,
    BaseFormRowItem,
  },
  props: {
    userId: {
      type: String,
    },
  },
  data() {
    return {
      modelDataPassword: {
        newPassword: '',
        modelDataPassword: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
      this.modelDataPassword.newPassword = '';
      this.modelDataPassword.repeatPassword = '';
    },
    changePassword() {
      this.$emit('changePassword', {
        _id: this.userId,
        password: this.modelDataPassword.newPassword,
      });
      this.modelDataPassword.newPassword = '';
      this.modelDataPassword.repeatPassword = '';
      this.$emit('closeModal');
    },
  },
  computed: {
    checkPassword() {
      return this.modelDataPassword.newPassword ===
        this.modelDataPassword.repeatPassword &&
        this.modelDataPassword.newPassword != '' &&
        this.modelDataPassword.repeatPassword != ''
        ? false
        : true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/ModalChangePassword/ModalChangePassword.scss';
</style>
