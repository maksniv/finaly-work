<template>
  <span class="item__author">
    {{ userName }}
    <slot></slot>
  </span>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BaseAuthorItem',
  props: {
    author: {
      type: String,
    },
  },
  data() {
    return {
      userName: '',
      token: '',
    };
  },

  methods: {
    async usersGetName(request) {
      axios
        .post('http://45.12.239.156:8081/api/users/search', request, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.userName = response.data.users[0].name;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.usersGetName({
      filter: {
        _id: this.author,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/UI/BaseAuthorItem/BaseAuthorItem.scss';
</style>
