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
<!--            <el-dropdown-item>登录</el-dropdown-item>-->
            <el-dropdown-item @click.native="toLogout">退出</el-dropdown-item>
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
          <div class="x-bar">
            <div :id="id" :option="option"></div>
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
    import HighCharts from 'highcharts'
    export default {
        name: "YunMonitor",
        data() {
          return {
            userName: "",
            activeIndex: '1',
            vmList: [],
            username: this.$route.query.data,
            idForm: {
              id: "1"
            },
            id: 'test',
            option: {
              chart: {
                type: 'line'
              },
              title: {
                text: '月平均气温'//表头文字
              },
              subtitle: {
                text: '数据来源: WorldClimate.com'//表头下文字
              },
              xAxis: {//x轴显示的内容
                categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                plotbands:[{//可以显示一个方块，如果需要的话可以更改透明度和颜色
                  from:4.5,
                  to:6.5,
                  color:''}]},
              yAxis: {//y轴显示的内容
                title: {
                  text: '气温 (°C)'
                }
              },
              plotOptions: {
                line: {
                  dataLabels: {
                    enabled: true // 开启数据标签
                  },
                  enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                }
              },
              series: [{//两条数据
                name: '东京',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
              }, {
                name: '伦敦',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
              }]
            }
          }
        },
        created() {
          //
        },
        prop: {
            id: {
              type: String
            },
            option: {
              type: Object
            }
          },
        mounted() {
          HighCharts.chart(this.id,this.option)
        },
        methods: {
          ...mapMutations(['changeLogin']),
          toLogout() {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('Username');
            this.$router.push(
              {
                path: "/yun/login",
              }
            )
          },
          toLogin() {
            this.$router.push(
              {
                path: "/yun/login",
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
