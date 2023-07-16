<template>
  <div class="create-edit-task">
    <BaseForm>
      <template v-slot:title> {{ textTitle }} </template>
      <template v-slot:body>
        <form @submit.prevent class="create-edit-task__form">
          <BaseFormRowItem :nameFormRowItem="'Название'" :starShow="true">
            <BaseInput
              :placeholderText="'Введите текст...'"
              :inputValue="modelDataCreateTask.name"
              v-model="modelDataCreateTask.name"
            ></BaseInput>
          </BaseFormRowItem>
          <BaseFormRowItem :nameFormRowItem="'Описание'">
            <BaseTextArea
              :placeholderText="'Введите текст...'"
              v-model="modelDataCreateTask.description"
              :textAreaValue="modelDataCreateTask.description"
            ></BaseTextArea
          ></BaseFormRowItem>
          <BaseFormRowItem :nameFormRowItem="'Проект'" :starShow="true">
            <BaseSelect
              :placeholderText="'Не выбран'"
              :optionSelected="selectedOptionProject"
            >
              <BaseMenuItemDropdownButton
                v-for="option in sortedUsersForSelect"
                :key="option._id"
                :value="option._id"
                @click.native="selectOptionProject(option)"
                :className="'dropdown-menu__item'"
                :textMenu="option.name"
              >
              </BaseMenuItemDropdownButton> </BaseSelect
          ></BaseFormRowItem>
          <BaseFormRowItem :nameFormRowItem="'Исполнитель'">
            <BaseSelect
              :placeholderText="'Не назначен'"
              :optionSelected="selectedOptionExecutor"
            >
              <div class="select-scroll">
                <BaseInput
                  :placeholderText="'Поиск...'"
                  :typeInput="'search'"
                  :inputValue="searchUser"
                  v-model="searchUser"
                ></BaseInput>
                <BaseMenuItemDropdownButton
                  v-for="option in getUsers"
                  :key="option._id"
                  :value="option._id"
                  @click.native="selectOptionExecutor(option)"
                  :className="'dropdown-menu__item'"
                  :textMenu="option.name"
                >
                </BaseMenuItemDropdownButton>
              </div>
            </BaseSelect>
          </BaseFormRowItem>
        </form>
      </template>
      <template v-slot:footer>
        <BaseButton
          :textButton="'Отмена'"
          :class="'button-secondary'"
          @click.native="$router.go(-1)"
        ></BaseButton>
        <BaseButton
          v-if="$route.params.taskId === undefined"
          :textButton="'Создать задачу'"
          :class="'button-primary'"
          @click.native="createTask()"
          :disabled="disabledButton"
        ></BaseButton>
        <BaseButton
          v-if="$route.params.taskId != undefined"
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
import BaseSelect from '@/UI/BaseSelect/BaseSelect.vue';
import BaseTextArea from '@/UI/BaseTextArea/BaseTextArea.vue';
import BaseFormRowItem from '@/UI/BaseFormRowItem/BaseFormRowItem.vue';
import BaseMenuItemDropdownButton from '@/UI/BaseMenuItemDropdownButton/BaseMenuItemDropdownButton.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreateEditTask',
  components: {
    BaseButton,
    BaseInput,
    BaseSelect,
    BaseTextArea,
    BaseForm,
    BaseFormRowItem,
    BaseMenuItemDropdownButton,
  },
  data() {
    return {
      textTitle: '',
      modelDataCreateTask: {
        name: '',
        description: '',
        projectId: '',
        executor: '',
      },
      selectedOptionProject: '',
      selectedOptionExecutor: '',
      searchUser: '',
    };
  },
  computed: {
    ...mapGetters('tasksModule', ['getTaskById', 'getIdCreateEditTask']),
    ...mapGetters('usersModule', ['getUsers']),
    ...mapGetters('projectsModule', ['getProjects']),
    ...mapGetters('userModule', ['getId']),

    sortedUsersForSelect() {
      return [...this.getProjects].filter(
        (project) => project.author === this.getId
      );
    },

    disabledButton() {
      if (
        this.modelDataCreateTask.name === '' ||
        this.modelDataCreateTask.description === '' ||
        this.modelDataCreateTask.projectId === ''
      ) {
        return true;
      } else return false;
    },
  },
  methods: {
    ...mapActions('tasksModule', ['taskCreate', 'taskEdit', 'taskSearchById']),
    ...mapActions('usersModule', ['usersGetAll']),
    ...mapActions('projectsModule', ['projectsGetAll']),
    createTask() {
      this.taskCreate(this.modelDataCreateTask);
      setTimeout(() => {
        this.$router.push({
          name: 'wiewTask',
          params: { taskId: this.getIdCreateEditTask },
        });
      }, 500);
    },
    editTask() {
      this.taskEdit({
        ...this.modelDataCreateTask,
        _id: this.$route.params.taskId,
      });
      setTimeout(() => {
        this.$router.push({
          name: 'wiewTask',
          params: { taskId: this.getIdCreateEditTask },
        });
      }, 500);
    },
    setText(id) {
      id === undefined
        ? (this.textTitle = 'Создание задачи')
        : (this.textTitle = 'Редактирование задачи');
    },
    searchTaskById(id) {
      id === undefined ? console.log('Нет ID') : this.taskSearchById(id);
    },
    selectOptionProject(option) {
      this.selectedOptionProject = option.name;
      this.modelDataCreateTask.projectId = option._id;
    },
    selectOptionExecutor(option) {
      this.selectedOptionExecutor = option.name;
      this.modelDataCreateTask.executor = option._id;
      this.searchUser = option.name;
    },
  },
  mounted() {
    this.setText(this.$route.params.taskId);
    this.searchTaskById(this.$route.params.taskId);
    this.projectsGetAll({
      limit: 10000,
    });
    this.usersGetAll({
      limit: 10000,
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/modules/CreateEditTask/CreateEditTask.scss';
</style>
