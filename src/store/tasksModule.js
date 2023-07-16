import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    taskById: {},
    tasks: [],
    idCreateEditTask: {},

    searchInputValueTask: '',

    sortByOptionTask: 'desc',
    selectedSortValueTask: 'dateCreated',
    sortOptionsValueTask: [
      { value: 'name', name: 'По названию' },
      { value: 'author', name: 'По автору' },
      { value: 'status', name: 'По статусу' },
      { value: 'authorEdited', name: 'По исполнителю' },
      { value: 'dateCreated', name: 'По дате создания' },
      { value: 'dateEdited', name: 'По дате обновления' },
    ],
    limit: '',
    totalPage: '',
  },
  getters: {
    getTaskById: (state) => state.taskById,
    getIdCreateEditTask: (state) => state.idCreateEditTask,
    getTasks: (state) => state.tasks,
    getToken: (state) => state.token,

    getSelectedSortValueTask: (state) => state.selectedSortValueTask,
    getSortOptionsValueTask: (state) => state.sortOptionsValueTask,
    getSortByOptionTask: (state) => state.sortByOptionTask,

    getSearchInputValueTask: (state) => state.searchInputValueTask,

    getLimit: (state) => state.limit,
    getTotalPage: (state) => state.totalPage,
  },
  mutations: {
    SET_TASK_BY_ID: (state, task) => {
      state.task = task;
    },
    SET_ID_CREATE_EDIT_TASK: (state, idCreateEditTask) => {
      state.idCreateEditTask = idCreateEditTask;
    },
    SET_TASKS: (state, tasks) => {
      state.tasks = tasks;
    },
    SET_SELECTED_SORT_VALUE_TASK: (state, selectedSortValueTask) => {
      state.selectedSortValueTask = selectedSortValueTask;
    },
    SET_SORT_OPTIONS_VALUE_TASK: (state, sortOptionsValueTask) => {
      state.sortOptionsValueTask = sortOptionsValueTask;
    },
    SET_SORT_BY_OPTION_TASK: (state, sortByOptionTask) => {
      state.sortByOptionTask = sortByOptionTask;
    },

    SET_SEARCH_INPUT_VALUE_TASK: (state, searchInputValueTask) => {
      state.searchInputValueTask = searchInputValueTask;
    },

    SET_LIMIT: (state, limit) => {
      state.limit = limit;
    },
    SET_TOTAL_PAGE: (state, totalPage) => {
      state.totalPage = totalPage;
    },
  },
  actions: {
    async tasksGetAll({ commit, getters }, request) {
      axios
        .post('http://45.12.239.156:8081/api/tasks/search', request, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_TASKS', response.data.tasks);
          commit('SET_LIMIT', response.data.limit);
          commit('SET_TOTAL_PAGE', response.data.total);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async taskCreate({ commit, getters }, task) {
      axios
        .post('http://45.12.239.156:8081/api/tasks', task, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit('SET_ID_CREATE_EDIT_TASK', response.data._id);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async taskEdit({ commit, getters }, task) {
      axios
        .put('http://45.12.239.156:8081/api/tasks', task, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_ID_CREATE_EDIT_TASK', response.data._id);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async taskSearchById({ commit, getters }, id) {
      axios
        .get(`http://45.12.239.156:8081/api/tasks/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_TASK_BY_ID', response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async taskDelete({ getters }, id) {
      axios
        .delete(`http://45.12.239.156:8081/api/tasks/${id}`, {
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
