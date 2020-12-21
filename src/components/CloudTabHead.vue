<template>
  <el-menu class="el-menu-header" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><router-link :to="{ path: '/cloud/index' }">首页</router-link></el-menu-item>
    <el-menu-item index="2"><router-link :to="{ path: '/cloud/list' }">服务器列表</router-link></el-menu-item>
    <el-menu-item index="3">控制台</el-menu-item>
    <el-menu-item index="4">消息中心</el-menu-item>
    <el-menu-item index="5"><router-link :to="{ path: '/cloud/about' }">关于我们</router-link></el-menu-item>
    <el-menu-item>
      <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex';
import store from '../store'

export default {
  name: "CloudTabHead",
  data() {
    return {
      username: store.getters.userName,
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    toLogin() {
      this.$router.push(
        {
          path: "/cloud/login",
        }
      )
    },
    toLogout() {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('Username');
      this.$router.push(
        {
          path: "/cloud/login",
        }
      )
    },
  }
}
</script>

<style scoped>
.el-menu-header {
  float: right;
  /*margin-right: 200px;*/
  /*width: 100%;*/
  /*text-align: right;*/
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
