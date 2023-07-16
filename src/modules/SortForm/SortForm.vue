<template>
  <form class="sort-form" @submit.prevent>
    <div class="sort-form__wrapper-input">
      <BaseInput
        :placeholderText="'Поиск...'"
        :typeInput="'search'"
        :inputValue="searchInputValue"
        v-model.trim="searchInputValue"
      ></BaseInput>
    </div>
    <DropdownButton
      v-if="pageType === 'tasks'"
      :isShowIcon="true"
      :iconHeight="'24'"
      :iconWeight="'24'"
      :iconName="'#filterIcon'"
    >
      <BaseForm>
        <template v-slot:body>
          <div class="sort-form__filter-menu">
            <BaseFormRowItem
              :nameFormRowItem="'Статус'"
              :className="'form-row__item-block'"
            >
              <BaseSelect
                :placeholderText="'Выберете значение...'"
              ></BaseSelect>
            </BaseFormRowItem>
            <BaseFormRowItem
              :nameFormRowItem="'Автор'"
              :className="'form-row__item-block'"
            >
              <BaseSelect
                :placeholderText="'Выберете значение...'"
              ></BaseSelect>
            </BaseFormRowItem>
            <BaseFormRowItem
              :nameFormRowItem="'Исполнитель'"
              :className="'form-row__item-block'"
            >
              <BaseSelect
                :placeholderText="'Выберете значение...'"
              ></BaseSelect>
            </BaseFormRowItem>
            <div class="sort-form__input-data-wrapper">
              <div></div>
              <div></div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <BaseButton
            :textButton="'Отмена'"
            :class="'button-secondary'"
            @click.native="onClick()"
          ></BaseButton>
          <BaseButton
            :textButton="'Применить'"
            :class="'button-primary'"
            @click.native="onClick()"
          ></BaseButton>
        </template>
      </BaseForm>
    </DropdownButton>
    <div
      class="sort-form__wrapper-select"
      v-if="pageType === 'projects' || pageType === 'tasks'"
    >
      <BaseSelectWithButton
        :placeholderText="'Выберете значение...'"
        :optionSelected="selectedOption"
        :options="optionsForSelect"
        @select="selectOption"
        @selectOptionSortingUpDown="selectOptionSortingUpDown"
      ></BaseSelectWithButton>
    </div>
    <div class="sort-form__wrapper-sort-button" v-if="pageType === 'users'">
      <SortButtonUpDown
        @selectOptionSortingUpDown="selectOptionSortingUpDown"
      ></SortButtonUpDown>
    </div>

    <BaseButton
      v-if="pageType === 'projects' || pageType === 'tasks'"
      :textButton="'Добавить'"
      class="button-secondary"
      @click.native="onClickButtonAdd"
    ></BaseButton>
    <BaseButton
      v-if="pageType === 'users' && getRoleUser === 'ADMIN'"
      :textButton="'Добавить пользователя'"
      class="button-primary"
      @click.native="onClickButtonAdd"
    ></BaseButton>
  </form>
</template>

<script>
import BaseInput from '@/UI/BaseInput/BaseInput.vue';
import SortButtonUpDown from '@/components/SortButtonUpDown/SortButtonUpDown.vue';
import BaseSelectWithButton from '@/UI/BaseSelectWithButton/BaseSelectWithButton.vue';
import BaseSelect from '@/UI/BaseSelect/BaseSelect.vue';
import BaseButton from '@/UI/BaseButton/BaseButton.vue';
import DropdownButton from '@/components/DropdownButton/DropdownButton.vue';
import BaseForm from '@/UI/BaseForm/BaseForm.vue';
import BaseFormRowItem from '@/UI/BaseFormRowItem/BaseFormRowItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'SortForm',
  components: {
    BaseButton,
    BaseInput,
    BaseSelectWithButton,
    BaseSelect,
    DropdownButton,
    SortButtonUpDown,
    BaseForm,
    BaseFormRowItem,
  },
  props: {
    optionsForSelect: {
      type: Array,
      default: () => [],
    },
    selectedOption: {
      type: String,
      default: '',
    },
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchInputValue: '',
    };
  },
  computed: {
    ...mapGetters('userModule', ['getRoleUser']),
  },
  methods: {
    onClickButtonAdd() {
      this.$emit('onClickButtonAdd');
    },
    selectOption(option) {
      this.$emit('onSelectOption', option);
    },
    selectOptionSortingUpDown(option) {
      this.$emit('onSortOption', option);
    },
  },
  watch: {
    searchInputValue() {
      this.$emit('inputSearchItem', this.searchInputValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/SortForm/SortForm.scss';
</style>
