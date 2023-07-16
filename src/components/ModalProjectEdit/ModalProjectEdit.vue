<template>
  <BaseForm>
    <template v-slot:title> {{ titleModal }} </template>
    <template v-slot:body>
      <form class="modal-form__form">
        <BaseFormRowItem
          :nameFormRowItem="'Код'"
          :starShow="true"
          :className="'form-row__item-block'"
        >
          <BaseInput
            :placeholderText="'Введите текст...'"
            :inputValue="modelDataEditProject.code"
            v-model.trim="modelDataEditProject.code"
          ></BaseInput>
        </BaseFormRowItem>
        <BaseFormRowItem
          :nameFormRowItem="'Название'"
          :starShow="true"
          :className="'form-row__item-block'"
        >
          <BaseInput
            :placeholderText="'Введите текст...'"
            :inputValue="modelDataEditProject.name"
            v-model.trim="modelDataEditProject.name"
          ></BaseInput>
        </BaseFormRowItem>
      </form>
    </template>
    <template v-slot:footer>
      <BaseButton
        :textButton="'Отмена'"
        :class="'button-secondary'"
        @click.native="closeModal"
      ></BaseButton>
      <BaseButton
        v-if="nameProject === ''"
        :textButton="'Создать проект'"
        :class="'button-primary'"
        @click.native="createProject"
      ></BaseButton>
      <BaseButton
        v-if="nameProject != ''"
        :textButton="'Сохранить'"
        :class="'button-primary'"
        @click.native="editProject"
      ></BaseButton>
    </template>
  </BaseForm>
</template>

<script>
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseInput from '@/UI/BaseInput/BaseInput.vue';
import BaseFormRowItem from '@/UI/BaseFormRowItem/BaseFormRowItem.vue';

export default {
  name: 'ModalProjectEdit',
  components: {
    BaseButton,
    BaseForm,
    BaseFormRowItem,
    BaseInput,
  },
  props: {
    nameProject: {
      type: String,
      default: '',
    },
    codeProject: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      titleModal: '',
      modelDataEditProject: {
        name: this.nameProject,
        code: this.codeProject,
      },
      idData: {
        _id: this.id,
      },
    };
  },
  computed: {},
  methods: {
    setTitle() {
      return this.nameProject === ''
        ? (this.titleModal = 'Создание проекта')
        : (this.titleModal = 'Редактирование проекта');
    },
    createProject() {
      this.$emit('createProject', this.modelDataEditProject);
      setTimeout(() => {
        this.$emit('closeModal');
        this.$router.go();
      }, 500);
    },
    editProject() {
      this.$emit('editProject', {
        ...this.idData,
        ...this.modelDataEditProject,
      });
      setTimeout(() => {
        this.$emit('closeModal');
        this.$router.go();
      }, 500);
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
  mounted() {
    this.setTitle();
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/ModalProjectEdit/ModalProjectEdit.scss';
</style>
