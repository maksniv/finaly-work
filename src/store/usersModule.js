import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    users: [],
    user: {
      roles: ['User'],
      description: 'Описание',
      picture: 'String',
      status: 'status',
      _id: 'id',
      name: 'ФИО',
    },

    searchInputValueUsers: '',
    sortByOptionUsers: 'desc',

    limit: '',
    totalPage: '',
  },
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,

    getToken: (state) => state.token,

    getSearchInputValueUsers: (state) => state.searchInputValueUsers,
    getSortByOptionUsers: (state) => state.sortByOptionUsers,

    getLimit: (state) => state.limit,
    getTotalPage: (state) => state.totalPage,
  },
  mutations: {
    SET_SORT_BY_OPTION_USERS: (state, sortByOptionUsers) => {
      state.sortByOptionUsers = sortByOptionUsers;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_SEARCH_INPUT_VALUE_USERS: (state, searchInputValueUsers) => {
      state.searchInputValueUsers = searchInputValueUsers;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },

    SET_LIMIT: (state, limit) => {
      state.limit = limit;
    },
    SET_TOTAL_PAGE: (state, totalPage) => {
      state.totalPage = totalPage;
    },
  },
  actions: {
    async usersGetAll({ commit, getters }, request) {
      axios
        .post('http://45.12.239.156:8081/api/users/search', request, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_USERS', response.data.users);
          commit('SET_LIMIT', response.data.limit);
          commit('SET_TOTAL_PAGE', response.data.total);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async userGetItem({ commit, getters }, request) {
      axios
        .post('http://45.12.239.156:8081/api/users/search', request, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_USER', response.data.users[0]);
          console.log(response.data.users[0]);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    async changePassword({ getters }, request) {
      axios
        .put('http://45.12.239.156:8081/api/users/password', request, {
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
    async updatePhoto({ getters }, request) {
      axios
        .put('http://45.12.239.156:8081/api/users/picture', request, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
