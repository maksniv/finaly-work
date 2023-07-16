import axios from 'axios';

export default {
  namespaced: true,
  state: {
    roleUser: '',
    description: '',
    picture: '',
    status: '',
    id: '',
    name: '',
    token: localStorage.getItem('token'),
  },
  getters: {
    getRoleUser: (state) => state.roleUser,
    getDescription: (state) => state.description,
    getPicture: (state) => state.picture,
    getStatus: (state) => state.status,
    getId: (state) => state.id,
    getName: (state) => state.name,
    getToken: (state) => state.token,
  },
  mutations: {
    SET_ROLE_USER: (state, roleUser) => {
      state.roleUser = roleUser;
    },
    SET_DESCRIPTION: (state, description) => {
      state.description = description;
    },
    SET_PICTURE: (state, picture) => {
      state.picture = picture;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
  },
  actions: {
    async getDataCurrentUser({ commit, getters }) {
      axios
        .get('http://45.12.239.156:8081/api/users/current', {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getters.getToken}`,
          },
        })
        .then((response) => {
          commit('SET_ROLE_USER', response.data.roles[0]);
          commit('SET_DESCRIPTION', response.data.description);
          commit('SET_PICTURE', response.data.picture);
          commit('SET_STATUS', response.data.status);
          commit('SET_ID', response.data._id);
          commit('SET_NAME', response.data.name);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
