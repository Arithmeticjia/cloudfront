<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link :to="{path: '/yun/index' }">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link :to="{path: '/yun/list' }">服务器列表</router-link></el-menu-item>
        <el-menu-item index="3">控制台</el-menu-item>
        <el-menu-item index="4">消息中心</el-menu-item>
        <el-menu-item index="5"><router-link :to="{path: '/yun/about' }">关于我们</router-link></el-menu-item>
        <el-menu-item @click="toLogin()" v-if="userName === ''">登录</el-menu-item>
        <el-menu-item>
        <el-dropdown>
          <span class="el-dropdown-link" v-if="userName !== ''">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" v-if="userName!==''">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container  style="height: 620px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>服务器列表</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="always">
                <div slot="header" class="clearfix">
                  <span>前端</span>
<!--                  <el-button style="float: right; padding: 3px 0" type="text"></el-button>-->
                </div>
                <p>技术栈：Vue.js + Element-UI</p>
                <p>开发人员：南京邮电大学-单沙嘉</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <div slot="header" class="clearfix">
                  <span>后端</span>
                  <!--                  <el-button style="float: right; padding: 3px 0" type="text"></el-button>-->
                </div>
                <p>技术栈：SpringBoot</p>
                <p>开发人员：南京邮电大学-单沙嘉</p>
              </el-card>
            </el-col>
<!--            <el-col :span="8">-->
<!--              <el-card shadow="always">-->
<!--                <div slot="header" class="clearfix">-->
<!--                  <span>算法</span>-->
<!--                  &lt;!&ndash;                  <el-button style="float: right; padding: 3px 0" type="text"></el-button>&ndash;&gt;-->
<!--                </div>-->
<!--                <p>技术栈：Pytorch</p>-->
<!--                <p>开发人员：南京邮电大学-刘炳辉</p>-->
<!--              </el-card>-->
<!--            </el-col>-->
          </el-row>
          <div class="block" style="margin-top: 250px;text-align: center">
            <span class="demonstration">请给我们打个分叭</span>
            <el-rate
              v-model="value2"
              :colors="colors">
            </el-rate>
          </div>
        </el-main>
<!--        <el-footer>-->

<!--        </el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
    import { mapMutations } from 'vuex';
    import Vuex from 'vuex' //引入 Vuex
    import store from '../store'
    export default {
        name: "CloudAbout",
        data() {
          return {
            userName: "",
            activeIndex: '5',
            vmList: [],
            username: this.$route.query.data,
            idForm: {
              id: "1"
            },
            value2: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']
          }
        },
        created() {

        },
        mounted() {
          this.showVmServer();
          this.test();
          this.userName = store.getters.userName;
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
          toVmDetail(url){
            window.open(url)
          },
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
          },
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          test() {
            this.loading = true;
            this.$store
              .dispatch("Vm", this.idForm)
              .then(response => {
                this.loading = false;
                let code = response.data.code;
                // if (code === 200) {
                //   this.$router.push({
                //     path: "/yun/server",
                //     query: { data: response.data.data.username }
                //   });
                // } else {
                //   this.$router.push({
                //     path: "/error",
                //     query: { message: response.data.message }
                //   });
                // }
              })
              .catch(() => {
                this.loading = false;
              });
          },
          showVmServer () {
            this.$http.get('http://127.0.0.1:8085/yunprophet/serverapi/getServerVmAll',{
              _timeout:5000,
              onTimeout :(request) => {
                this.$message.error('请求超时');
                this.loading = false
              }
            }).then((response) => {
              var res = JSON.parse(response.bodyText);
              if (res.code === 200) {
                this.loading = false;
                this.vmList = res.data;
              } else {
                this.$message.error('查询数据失败');
              }
            })
          }
        }
    }
</script>

<style scoped>
  .box-card {
    width: 500px;
    font-size: 15px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .vminfo {
    font-weight: bolder;
  }
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
