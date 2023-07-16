<template>
  <BaseForm>
    <template v-slot:title> Удаление </template>
    <template v-slot:body>
      <span class="modal__content">
        Вы действительно хотите
        <span class="modal__selection">удалить</span> {{ textModalDelete }} "{{
          name
        }}"?
      </span>
    </template>
    <template v-slot:footer>
      <BaseButton
        :textButton="'Отмена'"
        :class="'button-secondary'"
        @click.native="closeModal"
      ></BaseButton>
      <BaseButton
        :textButton="'Да'"
        :class="'button-primary'"
        @click.native="deleteClick"
      ></BaseButton>
    </template>
  </BaseForm>
</template>

<script>
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';

export default {
  name: 'ModalProjectDelete',
  components: {
    BaseButton,
    BaseForm,
  },
  props: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    textModalDelete: {
      type: String,
    },
  },
  methods: {
    deleteClick() {
      this.$emit('delete', this.id);
      setTimeout(() => {
        this.$emit('closeModal');
        this.$router.go();
      }, 500);
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '@/components/ModalDelete/ModalDelete.scss';
</style>
