import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/layouts/MainLayouts.vue'),
    children: [
      //projects
      {
        path: '/projects/:pageNumber',
        name: 'projects',
        component: () => import('@/views/project/MainProjectsPage.vue'),
      },
      //tasks
      {
        path: '/tasks/:pageNumber/:projectId?/:userId?',
        name: 'mainTasks',
        component: () => import('@/views/tasks/MainTasksPage.vue'),
      },
      {
        path: '/tasks/createTask/:taskId?',
        name: 'createTask',
        component: () => import('@/views/tasks/CreateTaskPage.vue'),
      },
      {
        path: '/tasks/wiewTask/:taskId?',
        name: 'wiewTask',
        component: () => import('@/views/tasks/WiewTaskPage.vue'),
      },
      //users
      {
        path: '/users/:pageNumber',
        name: 'mainUsers',
        props: true,
        component: () => import('@/views/user/MainUsersPage.vue'),
      },
      {
        path: '/users/profileUser/:id?',
        name: 'profileUser',
        component: () => import('@/views/user/ProfileUserPage.vue'),
      },
      {
        path: '/users/editUser/:id?',
        name: 'editUser',
        component: () => import('@/views/user/EditUserPage.vue'),
      },
    ],
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('@/views/authorization/AuthorizationPage.vue'),
  },
  {
    path: '*',
    name: 'notFoundPage',
    component: () => import('@/views/404/NotFoundPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
