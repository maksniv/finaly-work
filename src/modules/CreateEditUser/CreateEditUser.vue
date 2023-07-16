<template>
  <div class="create-edit-user">
    <BaseForm>
      <template v-slot:title>
        {{ textTitle }}
      </template>
      <template v-slot:body>
        <form class="create-edit-user__form">
          <div class="create-edit-user__form-main">
            <BaseFormRowItem :nameFormRowItem="'ФИО'" :starShow="true">
              <BaseInput
                :placeholderText="'Введите ФИО'"
                :inputValue="modelDataUser.fullName"
                v-model.trim="modelDataUser.fullName"
              ></BaseInput>
            </BaseFormRowItem>
            <BaseFormRowItem :nameFormRowItem="'Логин'" :starShow="true">
              <BaseInput
                :placeholderText="'Введите логин'"
                :inputValue="modelDataUser.login"
                v-model.trim="modelDataUser.login"
              ></BaseInput>
            </BaseFormRowItem>
            <BaseFormRowItem
              :nameFormRowItem="'Пароль'"
              :starShow="true"
              v-if="$route.params.id === undefined"
            >
              <BaseInput
                :placeholderText="'Введите пароль'"
                :inputValue="modelDataUser.password"
                v-model.trim="modelDataUser.password"
              ></BaseInput>
            </BaseFormRowItem>
            <BaseFormRowItem :nameFormRowItem="'О себе'">
              <BaseTextArea
                :placeholderText="'Введите текст...'"
                v-model="modelDataUser.about"
                :textAreaValue="modelDataUser.about"
              ></BaseTextArea
            ></BaseFormRowItem>
            <BaseFormRowItem :nameFormRowItem="'Фото'">
              <BaseInputLoader @processingUploadFile="processingUploadFile"></BaseInputLoader>
            </BaseFormRowItem>
          </div>
          <div class="create-edit-user__form-aside">
            <BaseFormRowItem :nameFormRowItem="'Активен'">
              <BaseToggle></BaseToggle>
            </BaseFormRowItem>
            <BaseFormRowItem :nameFormRowItem="'Администратор'">
              <BaseToggle></BaseToggle>
            </BaseFormRowItem>
            <BaseFormRowItem :nameFormRowItem="'Пользователь'">
              <BaseToggle></BaseToggle>
            </BaseFormRowItem>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <BaseButton
          :textButton="'Отмена'"
          :class="'button-secondary'"
        ></BaseButton>
        <BaseButton
          v-if="$route.params.id === undefined"
          :textButton="'Создать профиль'"
          :class="'button-primary'"
        ></BaseButton>
        <BaseButton
          v-if="$route.params.id != undefined"
          :textButton="'Сохранить изменения'"
          :class="'button-primary'"
          @click.native="editTask()"
          :disabled="disabledButton"
        ></BaseButton>
      </template>
    </BaseForm>
  </div>
</template>

<script>
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseInput from '@/UI/BaseInput/BaseInput.vue';
import BaseInputLoader from '@/UI/BaseInputLoader/BaseInputLoader.vue';
import BaseTextArea from '@/UI/BaseTextArea/BaseTextArea.vue';
import BaseFormRowItem from '@/UI/BaseFormRowItem/BaseFormRowItem.vue';
import BaseToggle from '@/UI/BaseToggle/BaseToggle.vue';

export default {
  name: 'CreateEditUser',
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
    BaseForm,
    BaseFormRowItem,
    BaseToggle,
    BaseInputLoader,
  },
  data() {
    return {
      textTitle: '',
      modelDataUser: {
        fullName: '',
        login: '',
        password: '',
        about: '',
      },
    };
  },
  computed: {
    disabledButton() {
      if (this.modelDataUser.fullName === '') {
        return true;
      } else return false;
    },
  },
  methods: {
    setTitleText(id) {
      if (id === undefined) {
        this.textTitle = 'Создание профиля сотрудника';
      } else {
        this.textTitle = 'Редактирование профиля';
      }
    },
    processingUploadFile(fileInstanceUpload) {
      if (fileInstanceUpload != undefined) {
        console.log(fileInstanceUpload);
      }
    },
  },
  mounted() {
    this.setTitleText(this.$route.params.id);
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '@/modules/CreateEditUser/CreateEditUser.scss';
</style>
