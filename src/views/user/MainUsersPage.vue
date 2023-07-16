<template>
  <main class="page">
    <SortForm
      :pageType="'users'"
      @onSortOption="saveSortOption"
      @inputSearchItem="searchUsers"
    ></SortForm>
    <ContainerBlock v-if="showListUsers">
      <UserItem
        v-for="user in getUsers"
        :key="user._id"
        :user="user"
        :searchUsersValue="searchUsersValue"
      ></UserItem>
    </ContainerBlock>
    <StubElement
      v-else
      :stubText="setTextForStub"
      :showButton="setShowButtonForStub"
      @onClickAction="pushToPageAddUser"
    ></StubElement>
    <PaginationBar
      v-if="showListUsers"
      :limit="getLimit"
      :totalPage="getTotalPage"
      :activePage="this.$route.params.pageNumber"
      @pushToPage="pushToPage"
    ></PaginationBar>
  </main>
</template>

<script>
import UserItem from '@/modules/UserItem/UserItem.vue';
import StubElement from '@/modules/StubElement/StubElement.vue';
import SortForm from '@/modules/SortForm/SortForm.vue';
import ContainerBlock from '@/modules/ContainerBlock/ContainerBlock.vue';
import PaginationBar from '@/modules/PaginationBar/PaginationBar.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'UsersPage',
  components: {
    StubElement,
    SortForm,
    ContainerBlock,
    UserItem,
    PaginationBar,
  },
  data() {
    return {
      selectedOptionUpDown: '',
      searchUsersValue: '',
    };
  },
  computed: {
    ...mapGetters('usersModule', [
      'getUsers',
      'getLimit',
      'getTotalPage',
      'getSortByOptionUsers',
    ]),
    setTextForStub() {
      return this.searchUsersValue === ''
        ? 'Нет ни одного пользователя'
        : 'Ни один пользователь не соответствует результатам поиска';
    },
    setShowButtonForStub() {
      return this.searchUsersValue === '' ? true : false;
    },
    showListUsers() {
      if (this.getUsers.length != 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions('usersModule', ['usersGetAll']),
    ...mapMutations('usersModule', ['SET_SORT_BY_OPTION_USERS']),

    pushToPage(page) {
      this.$router.push({
        name: 'mainUsers',
        params: { pageNumber: page },
      });
    },
    saveSortOption(option) {
      this.selectedOptionUpDown = option;
      this.SET_SORT_BY_OPTION_USERS(option);
    },
    searchUsers(value) {
      this.searchUsersValue = value;
    },
    downloadAllUsers() {
      this.usersGetAll({
        page: this.$route.params.pageNumber,
        limit: 10,
        filter: {
          name: this.searchUsersValue,
        },
        sort: this.getSortByOptionUsers,
      });
    },
    pushToPageAddUser() {
      this.$router.push({
        name: 'editUser',
      });
    },
  },
  mounted() {
    this.downloadAllUsers();
  },
  watch: {
    $route() {
      this.downloadAllUsers();
    },
    selectedOptionUpDown() {
      this.downloadAllUsers();
    },
    searchUsersValue() {
      this.downloadAllUsers();
    },
  },
};
</script>
