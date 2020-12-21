<template xmlns="http://www.w3.org/1999/html">
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link :to="{path: '/yun/index' }">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link :to="{path: '/yun/list' }">服务器列表</router-link></el-menu-item>
        <el-menu-item index="3">控制台</el-menu-item>
        <el-menu-item index="4">消息中心</el-menu-item>
        <el-menu-item index="5"><router-link :to="{path: '/yun/about' }">关于我们</router-link></el-menu-item>
        <el-menu-item>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
<!--            <el-dropdown-item>登录</el-dropdown-item>-->
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container  style="height: 620px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu
          default-active="2"
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
          <p style="font-size: 21px;font-weight: bolder;display: inline">{{ vmDetail.serverName }}</p>
          <div style="font-size: 13px;color: #606266">
            <span>{{ vmDetail.serverIp }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ vmDetail.osInfo }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ vmDetail.location }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>运行中</span>
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <span class="el-dropdown-link" style="font-size: 13px;color: #606266">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>重启</el-dropdown-item>
                <el-dropdown-item>停止</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p>服务器监控</p>
          <el-row>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="monitortitle">CPU使用</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="toVmDetailMonitor('/#/yun'+ '/' + 'server/' + vmDetail.id + '/' + vmDetail.serverId + '/monitor')">查看详情</el-button>
                </div>
                <div class="text item">
                  <p><label class="cpuinfo">{{ vmDetailCurrent[0] }}</label>% / <label class="cpuinfo">{{ vmDetail.cpuCore }}</label>核</p>
                  <el-progress :percentage=Number(vmDetailCurrent[0])></el-progress>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="monitortitle">内存使用</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                </div>
                <div class="text item">
                  <p><label class="cpuinfo">{{ vmDetailCurrent[1] }}</label>GB / <label class="cpuinfo">{{ vmDetail.memSize.slice(0,-2) }}</label>GB</p>
                  <el-progress :percentage=((vmDetailCurrent[1]/vmDetail.memSize.slice(0,-2)*100))></el-progress>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="monitortitle">系统盘使用</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                </div>
                <div class="text item">
                  <p><label class="cpuinfo">{{ vmDetailCurrent[2] }}</label>GB / <label class="cpuinfo">{{ vmDetail.diskSize.slice(0,-2) }}</label>GB</p>
                  <el-progress :percentage=Number((vmDetailCurrent[2]/vmDetail.diskSize.slice(0,-2))*100)></el-progress>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <p>服务器信息</p>
            <el-card class="box-card">
              <div class="text item">
                <p style="font-size: 14px"><label class="vminfodetail">IP地址：（公）</label>{{ vmDetail.serverIp }}</p>
                <p style="font-size: 14px"><label class="vminfodetail">实例ID：</label>{{ vmDetail.serverId }}</p>
                <p style="font-size: 14px"><label class="vminfodetail">镜像信息：</label>{{ vmDetail.osInfo }}</p>
                <p style="font-size: 14px"><label class="vminfodetail">服务器类型：</label>{{ vmDetail.serverType }}</p>
                <p style="font-size: 14px"><label class="vminfodetail">CPU：</label>{{ vmDetail.cpuCore }}核</p>
                <p style="font-size: 14px"><label class="vminfodetail">内存：</label>{{ vmDetail.memSize }}</p>
                <p style="font-size: 14px"><label class="vminfodetail">系统盘：</label>{{ vmDetail.diskSize }}</p>
              </div>
            </el-card>
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
        name: "YunServerDetail",
        data() {
          return {
            activeIndex: '3',
            username: store.getters.userName,
            vmDetail: [],
            vmDetailCurrent: [],
            id: this.$route.params.id,
          }
        },
        created() {

        },
        mounted() {
          // this.username = store.getters.userName;
          this.id = this.$route.params.id;
          this.showVmServerDetail();
          this.showVmServerDetailCurrent();
        },
        methods: {
          logout() {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('Username');
            this.$router.push(
              {
                path: "/yun/login",
              }
            )
          },
          toVmDetailMonitor(url){
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
          showVmServerDetail () {
            this.$http.get('http://127.0.0.1:8085/yunprophet/serverapi/getServerVmDetail',{
              params: {
                id: this.id
              },
              _timeout: 5000,
              onTimeout :(request) => {
                this.$message.error('请求超时');
                this.loading = false
              }
            }).then((response) => {
              var res = JSON.parse(response.bodyText);
              if (res.code === 200) {
                this.loading = false;
                this.vmDetail = res.data;
              } else {
                this.$message.error('查询数据失败');
              }
            })
          },
          showVmServerDetailCurrent () {
            this.$http.get('http://127.0.0.1:8085/yunprophet/serverapi/getServerVmDetailUsed',{
              params: {id:1},
              _timeout: 5000,
              onTimeout :(request) => {
                this.$message.error('请求超时');
                this.loading = false
              }
            }).then((response) => {
              var res = JSON.parse(response.bodyText);
              if (res.code === 200) {
                this.loading = false;
                this.vmDetailCurrent = res.data;
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
    width: 350px;
    padding: 0;
    font-size: 10px;
  }
  .vminfodetail {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .cpuinfo {
    font-size: 30px;
    font-weight: bolder;
  }
  .monitortitle {
    /*font-weight: bolder;*/
    font-size: 16px;
  }
  .el-menu-header {
    float: right;
    /*margin-right: 200px;*/
    /*width: 100%;*/
    /*text-align: right;*/
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .el-dropdown-link {
    cursor: pointer;
    /*color: #409EFF;*/
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .clearfix:after {
    clear: both
  }
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
