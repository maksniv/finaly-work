import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    projects: [],

    searchInputValueProject: '',

    sortByOptionProject: 'desc',
    selectedSortValueProject: 'dateCreated',
    sortOptionsValueProject: [
      { value: 'name', name: 'По названию' },
      { value: 'author', name: 'По автору' },
      { value: 'dateCreated', name: 'По дате создания' },
      { value: 'dateEdited', name: 'По дате обновления' },
    ],

    limit: '',
    totalPage: '',
  },
  getters: {
    getProjects: (state) => state.projects,
    getToken: (state) => state.token,

    getSelectedSortValueProject: (state) => state.selectedSortValueProject,
    getSortOptionsValueProject: (state) => state.sortOptionsValueProject,
    getSortByOptionProject: (state) => state.sortByOptionProject,

    getSearchInputValueProject: (state) => state.searchInputValueProject,

    getLimit: (state) => state.limit,
    getTotalPage: (state) => state.totalPage,
  },
  mutations: {
    SET_PROJECTS: (state, projects) => {
      state.projects = projects;
    },
    SET_SORT_BY_OPTION_PROJECT: (state, sortByOptionProject) => {
      state.sortByOptionProject = sortByOptionProject;
    },
    SET_SELECTED_SORT_VALUE_PROJECT: (state, selectedSortValueProject) => {
      state.selectedSortValueProject = selectedSortValueProject;
    },
    SET_SORT_OPTIONS_VALUE_PROJECT: (state, sortOptionsValueProject) => {
      state.sortOptionsValueProject = sortOptionsValueProject;
    },
    SET_SEARCH_INPUT_VALUE_PROJECT: (state, searchInputValueProject) => {
      state.searchInputValueProject = searchInputValueProject;
    },
    SET_LIMIT: (state, limit) => {
      state.limit = limit;
    },
    SET_TOTAL_PAGE: (state, totalPage) => {
      state.totalPage = totalPage;
    },
  },
  actions: {
    async projectsGetAll({ commit, getters }, request) {
      axios
        .post('http://45.12.239.156:8081/api/projects/search', request, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_PROJECTS', response.data.projects);
          commit('SET_LIMIT', response.data.limit);
          commit('SET_TOTAL_PAGE', response.data.total);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async projectCreate({ getters }, project) {
      axios
        .post('http://45.12.239.156:8081/api/projects', project, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async projectEdit({ getters }, project) {
      axios
        .put('http://45.12.239.156:8081/api/projects', project, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async projectDelete({ getters }, id) {
      axios
        .delete(`http://45.12.239.156:8081/api/projects/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async projectGetById({ getters }, id) {
      axios
        .get(`http://45.12.239.156:8081/api/projects/search/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
