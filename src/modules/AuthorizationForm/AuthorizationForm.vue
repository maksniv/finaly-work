<template>
  <div class="authorization-form">
    <BaseForm>
      <template v-slot:title> Вход </template>
      <template v-slot:body>
        <form class="authorization-form__form">
          <span class="authorization-form__error">{{
            getAuthErrorMessage
          }}</span>
          <BaseFormRowItem
            :nameFormRowItem="'Логин'"
            :starShow="true"
            :className="'form-row__item-block'"
          >
            <BaseInput
              :placeholderText="'Введите текст...'"
              v-model="modelLoginData.login"
              :inputValue="modelLoginData.login"
              :presenceError="getAuthSuccess"
            ></BaseInput>
          </BaseFormRowItem>
          <BaseFormRowItem
            :nameFormRowItem="'Пароль'"
            :starShow="true"
            :className="'form-row__item-block'"
          >
            <BaseInput
              :placeholderText="'Введите текст...'"
              :typeInput="'password'"
              v-model="modelLoginData.password"
              :inputValue="modelLoginData.password"
              :presenceError="getAuthSuccess"
            ></BaseInput>
          </BaseFormRowItem>
        </form>
      </template>
      <template v-slot:footer>
        <BaseButton
          :disabled="setDisabledButtonLogin"
          :textButton="'Войти'"
          :class="'button-primary'"
          @click.native="onClick()"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthorizationForm',
  components: {
    BaseButton,
    BaseInput,
    BaseForm,
    BaseFormRowItem,
  },
  data() {
    return {
      modelLoginData: {
        login: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('authorizationModule', ['getDataToken']),
    ...mapActions('userModule', ['getDataCurrentUser']),
    onClick() {
      this.getDataToken(this.modelLoginData);
    },
  },
  computed: {
    ...mapGetters('authorizationModule', [
      'getAuthErrorMessage',
      'getAuthSuccess',
    ]),
    setDisabledButtonLogin() {
      if (
        this.modelLoginData.login === '' ||
        this.modelLoginData.password === ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    getAuthSuccess() {
      if (this.getAuthSuccess) {
        this.getDataCurrentUser();
        setTimeout(() => {
          this.$router.push({
            name: 'projects',
            params: { pageNumber: 1 },
          });
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/AuthorizationForm/AuthorizationForm.scss';
</style>
