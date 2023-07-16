import Vue from 'vue';
import Vuex from 'vuex';
import authorizationModule from '@/store/authorizationModule';
import userModule from '@/store/userModule';
import usersModule from '@/store/usersModule';
import projectsModule from '@/store/projectsModule';
import tasksModule from '@/store/tasksModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authorizationModule,
    userModule,
    usersModule,
    projectsModule,
    tasksModule,
  },
});
