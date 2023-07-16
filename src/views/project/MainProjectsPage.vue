<template>
  <main class="page">
    <SortForm
      :optionsForSelect="getSortOptionsValueProject"
      :optionSelected="getSelectedSortValueProject"
      :pageType="'projects'"
      @onClickButtonAdd="toggleModalEdit"
      @onSelectOption="saveSelectOption"
      @onSortOption="saveSortOption"
      @inputSearchItem="searchProject"
    ></SortForm>
    <ContainerBlock v-if="showListProject">
      <ProjectItem
        v-for="project in getProjects"
        :key="project._id"
        :project="project"
        :searchProjectValue="searchProjectValue"
      ></ProjectItem>
    </ContainerBlock>
    <StubElement
      v-else
      :stubText="setTextForStub"
      :showButton="setShowButtonForStub"
      @onClickAction="toggleModalEdit"
    >
    </StubElement>
    <PaginationBar
      v-if="showListProject"
      :limit="getLimit"
      :totalPage="getTotalPage"
      :activePage="this.$route.params.pageNumber"
      @pushToPage="pushToPage"
    ></PaginationBar>
    <BaseModal :showModal="showModalEditProject">
      <ModalProjectEdit
        @closeModal="toggleModalEdit"
        @createProject="projectCreate"
      ></ModalProjectEdit>
    </BaseModal>
  </main>
</template>

<script>
import ProjectItem from '@/modules/ProjectItem/ProjectItem.vue';
import StubElement from '@/modules/StubElement/StubElement.vue';
import SortForm from '@/modules/SortForm/SortForm.vue';
import ContainerBlock from '@/modules/ContainerBlock/ContainerBlock.vue';
import BaseModal from '@/UI/BaseModal/BaseModal.vue';
import ModalProjectEdit from '@/components/ModalProjectEdit/ModalProjectEdit.vue';
import PaginationBar from '@/modules/PaginationBar/PaginationBar.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProjectPage',
  components: {
    ProjectItem,
    SortForm,
    StubElement,
    ContainerBlock,
    BaseModal,
    ModalProjectEdit,
    PaginationBar,
  },
  data() {
    return {
      showModalEditProject: false,
      selectedOptionUpDown: '',
      selectedOptionValue: '',
      searchProjectValue: '',
    };
  },
  computed: {
    ...mapGetters('projectsModule', [
      'getProjects',
      'getSortOptionsValueProject', //option
      'getSelectedSortValueProject', //selectedOption
      'getSearchInputValueProject', //input
      'getLimit',
      'getTotalPage',
      'getSortByOptionProject', //sortByUpDown
    ]),
    showListProject() {
      if (this.getProjects.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    setTextForStub() {
      return this.searchProjectValue === ''
        ? 'Нет ни одного проекта'
        : 'Ни один проект не соответствует результатам поиска';
    },
    setShowButtonForStub() {
      return this.searchProjectValue === '' ? true : false;
    },
  },
  methods: {
    ...mapActions('projectsModule', ['projectsGetAll', 'projectCreate']),
    ...mapMutations('projectsModule', [
      'SET_SELECTED_SORT_VALUE_PROJECT',
      'SET_SORT_BY_OPTION_PROJECT',
    ]),
    downloadAllProject() {
      this.projectsGetAll({
        page: this.$route.params.pageNumber,
        limit: 10,
        filter: {
          name: this.searchProjectValue,
        },
        sort: {
          field: this.getSelectedSortValueProject,
          type: this.getSortByOptionProject,
        },
      });
    },

    toggleModalEdit() {
      this.showModalEditProject = !this.showModalEditProject;
    },
    pushToPage(page) {
      this.$router.push({
        name: 'projects',
        params: { pageNumber: page },
      });
    },
    saveSelectOption(option) {
      this.selectedOptionValue = option;
      this.SET_SELECTED_SORT_VALUE_PROJECT(option);
    },
    saveSortOption(option) {
      this.selectedOptionUpDown = option;
      this.SET_SORT_BY_OPTION_PROJECT(option);
    },
    searchProject(value) {
      this.searchProjectValue = value;
    },
  },
  mounted() {
    this.downloadAllProject();
  },
  watch: {
    $route() {
      this.downloadAllProject();
    },
    selectedOptionUpDown() {
      this.downloadAllProject();
    },
    selectedOptionValue() {
      this.downloadAllProject();
    },
    searchProjectValue() {
      this.downloadAllProject();
    },
  },
};
</script>
