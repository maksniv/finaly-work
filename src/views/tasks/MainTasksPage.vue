<template>
  <main class="page">
    <SortForm
      :optionsForSelect="getSortOptionsValueTask"
      :optionSelected="getSelectedSortValueTask"
      :pageType="'tasks'"
      @onClickButtonAdd="pushToEditTaskPage"
      @onSelectOption="saveSelectOption"
      @onSortOption="saveSortOption"
      @inputSearchItem="searchTasks"
    ></SortForm>
    <ContainerBlock v-if="showListTasks">
      <TaskItem
        v-for="task in getTasks"
        :key="task._id"
        :task="task"
        :searchTasksValue="searchTasksValue"
      ></TaskItem>
    </ContainerBlock>
    <StubElement
      v-else
      :stubText="setTextForStub"
      :showButton="setShowButtonForStub"
      @onClickAction="pushToEditTaskPage"
    ></StubElement>
    <PaginationBar
      v-if="showListTasks"
      :limit="getLimit"
      :totalPage="getTotalPage"
      :activePage="this.$route.params.pageNumber"
      @pushToPage="pushToPage"
    ></PaginationBar>
  </main>
</template>

<script>
import TaskItem from '@/modules/TaskItem/TaskItem.vue';
import StubElement from '@/modules/StubElement/StubElement.vue';
import SortForm from '@/modules/SortForm/SortForm.vue';
import ContainerBlock from '@/modules/ContainerBlock/ContainerBlock.vue';
import PaginationBar from '@/modules/PaginationBar/PaginationBar.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'TaskPage',
  components: {
    TaskItem,
    StubElement,
    SortForm,
    ContainerBlock,
    PaginationBar,
  },
  data() {
    return {
      selectedOptionUpDown: '',
      selectedOptionValue: '',
      searchTasksValue: '',
    };
  },
  computed: {
    ...mapGetters('tasksModule', [
      'getTasks',
      'getSortOptionsValueTask',
      'getSelectedSortValueTask',
      'getSortByOptionTask',
      'getLimit',
      'getTotalPage',
    ]),
    showListTasks() {
      if (this.getTasks.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    setTextForStub() {
      return this.searchProjectValue === ''
        ? 'Нет ни одной задачи'
        : 'Ни одна задача не соответствует результатам поиска';
    },
    setShowButtonForStub() {
      return this.searchProjectValue === '' ? true : false;
    },
  },
  methods: {
    ...mapActions('tasksModule', ['tasksGetAll']),
    ...mapMutations('tasksModule', [
      'SET_SELECTED_SORT_VALUE_TASK',
      'SET_SORT_BY_OPTION_TASK',
    ]),
    pushToEditTaskPage() {
      this.$router.push({
        name: 'createTask',
      });
    },
    pushToPage(page) {
      this.$router.push({
        name: 'mainTasks',
        params: { pageNumber: page, projectId: this.$route.params.projectId },
      });
    },
    saveSelectOption(option) {
      this.selectedOptionValue = option;
      this.SET_SELECTED_SORT_VALUE_TASK(option);
    },
    saveSortOption(option) {
      this.selectedOptionUpDown = option;
      this.SET_SORT_BY_OPTION_TASK(option);
    },
    searchTasks(value) {
      this.searchTasksValue = value;
    },
    downloadAllTask() {
      this.tasksGetAll({
        page: this.$route.params.pageNumber,
        limit: 10,
        filter: {
          name: this.searchTasksValue,
          author: this.$route.params.userId,
          projectId: this.$route.params.projectId,
        },
        sort: {
          field: this.getSelectedSortValueTask,
          type: this.getSortByOptionTask,
        },
      });
    },
  },
  mounted() {
    this.downloadAllTask();
  },
  watch: {
    $route() {
      this.downloadAllTask();
    },
    selectedOptionUpDown() {
      this.downloadAllTask();
    },
    selectedOptionValue() {
      this.downloadAllTask();
    },
    searchTasksValue() {
      this.downloadAllTask();
    },
  },
};
</script>
