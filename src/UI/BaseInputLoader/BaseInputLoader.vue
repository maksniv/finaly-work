<template>
  <div class="field-load">
    <input
      class="field-load__input"
      type="file"
      @drop.prevent="uploadFile($event)"
      @dragenter="darkenAreaToggle"
      @dragleave="darkenAreaToggle"
    />
    <div :class="setClassFieldLoad" v-if="!isFileUpload">
      <div class="text-wrapper__main-text">
        Перетащите файл в область или нажмите для загрузки
      </div>
      <div class="text-wrapper__sub-text">
        Расширение: bmp, gif, jpg, jpeg, png
      </div>
      <div class="text-wrapper__sub-text">
        Максимально допустимый размер: 10 Мб
      </div>
      <div class="text-wrapper__sub-text">
        Максимальное количество файлов: 1
      </div>
    </div>
    <div class="field-load__status" v-if="isFileUpload">
      <div class="field-load__status-info-wrapper">
        <div class="field-load__name-file">{{ nameFileUpload }}</div>
        <div class="field-load__info-file">
          {{ (sizeFileUpload / BYTES_IN_MB).toFixed(2) }} Mb
        </div>
      </div>
      <div class="field-load__button-wrapper">
        <BaseButton
          @click.native="deletePhoto"
          class="button-icon"
          :isShowIcon="true"
          :iconHeight="'24'"
          :iconWeight="'24'"
          :iconName="'#deletePhotoIcon'"
        >
        </BaseButton>
      </div>
    </div>
    <BaseLoader v-show="false"></BaseLoader>
    <div class="field-load__error">{{ error }}</div>
  </div>
</template>

<script>
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import BaseLoader from '@/UI/BaseLoader/BaseLoader.vue';

export default {
  name: 'BaseInputLoader',
  components: { BaseButton, BaseLoader },
  data() {
    return {
      BYTES_IN_MB: 1048576,
      isActiveZone: false,
      isFileUpload: false,
      nameFileUpload: '',
      typeFileUpload: '',
      sizeFileUpload: '',
      error: '',
    };
  },
  props: {},
  methods: {
    uploadFile(event) {
      const file = event.dataTransfer.files[0];

      this.nameFileUpload = event.dataTransfer.files[0].name;
      this.sizeFileUpload = event.dataTransfer.files[0].size;
      this.isFileUpload = true;
      this.isActiveZone = false;

      if (file.size > 10 * this.BYTES_IN_MB) {
        this.error = 'Превышен максимальный размер файла';
        return false;
      }
      if (!file.type.startsWith('image/')) {
        this.error = 'Неверный формат файла';
        return false;
      }

      this.$emit('uploadFile', file);
    },
    deletePhoto() {
      this.isActiveZone = false;
      this.isFileUpload = false;
    },
    darkenAreaToggle() {
      this.isActiveZone = !this.isActiveZone;
    },
  },
  computed: {
    setClassFieldLoad() {
      return this.isActiveZone === false
        ? 'field-load__text-wrapper'
        : 'field-load__text-wrapper overlay';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseInputLoader/BaseInputLoader.scss';
</style>
