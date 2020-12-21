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
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
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
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="选择日期时间"
            @change='onClick'>
          </el-date-picker>
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择日期时间"
            @change='onClick'>
          </el-date-picker>
          <el-select v-model="value" placeholder="请选择" @change='handleSelect'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
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
        name: "YunMonitorServerv",
        data() {
          return {
            username: store.getters.userName,
            activeIndex: '1',
            records: [],
            arr: [],
            flag: false,
            chartData: [],
            startTime: new Date('2020-09-21 15:16:12'),
            endTime: new Date('2020-09-21 15:17:09'),
            metric: "cpu.0.percent.active",
            options: [
              {
                value: '选项1',
                label: 'cpu.0.percent.active'
              }, {
                value: '选项2',
                label: 'cpu.1.percent.active'
              }, {
                value: '选项3',
                label: 'cpu.2.percent.active'
              }, {
                value: '选项4',
                label: 'cpu.3.percent.active'
              }, {
                value: '选项5',
                label: 'cpu.4.percent.active'
              }
            ],
            value: 'cpu.0.percent.active',
            // 选中的选项
            item: {},
            idForm: {
              id: "1"
            },
            id: 'test',
            option: {
              chart: {
                zoomType: 'x'
              },
              title: {
                text: 'cpu.0.percent.active'//表头文字
              },
              subtitle: {
                text: document.ontouchstart === undefined ?
                  '鼠标拖动可以进行缩放' : '手势操作进行缩放'
              },
              xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                  millisecond: '%H:%M:%S.%L',
                  second: '%H:%M:%S',
                  minute: '%H:%M',
                  hour: '%H:%M',
                  day: '%m-%d',
                  week: '%m-%d',
                  month: '%Y-%m',
                  year: '%Y'
                }
              },
              tooltip: {
                dateTimeLabelFormats: {
                  millisecond: '%H:%M:%S.%L',
                  second: '%H:%M:%S',
                  minute: '%H:%M',
                  hour: '%H:%M',
                  day: '%Y-%m-%d',
                  week: '%m-%d',
                  month: '%Y-%m',
                  year: '%Y'
                }
              },
              yAxis: {
                title: {
                  text: '利用率'
                }
              },
              legend: {
                enabled: false
              },
              plotOptions: {
                area: {
                  fillColor: {
                    linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                    },
                    stops: [
                      [0, HighCharts.getOptions().colors[0]],
                      [1, HighCharts.Color(HighCharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                  },
                  marker: {
                    radius: 2
                  },
                  lineWidth: 1,
                  states: {
                    hover: {
                      lineWidth: 1
                    }
                  },
                  threshold: null
                }
              },
              series: [{
                type: 'area',
                name: '利用率',
                data: [

                ]
              }]
            }
          }
        },
        created() {
        },
        mounted() {
          this.showCharts();
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
          getTimestamp(time) { //把时间日期转成时间戳
             return (new Date(time)).getTime() / 1000
          },
          showCharts() {
            this.$http.get('http://localhost:8089/monitor/query/lidata-DL/'+ this.metric + '/' + this.getTimestamp(this.startTime) +'/'+this.getTimestamp(this.endTime),{
              _timeout:5000,
              onTimeout :(request) => {
                this.$message.error('请求超时');
                this.loading = false
              }
            }).then((response) => {
              var res = JSON.parse(response.bodyText);
              this.loading = false;
              var arr = res.records;
              this.metric = res.metric
              for(var i = 0;i < arr.length;i++){
                 this.chartData.push(arr[i]);
              }
              var oSeries = {
                  type: 'area',
                  name: '利用率',
                  data: this.chartData
              };
              var ooSeries = [{
                  type: 'area',
                  name: '利用率',
                  data: this.chartData
              }];
              HighCharts.chart(this.id,this.option).addSeries(oSeries);

            })
          },
          refreshCharts() {
            this.$http.get('http://localhost:8089/monitor/query/lidata-DL/'+ this.metric + '/' + this.getTimestamp(this.startTime) +'/'+this.getTimestamp(this.endTime),{
              _timeout:5000,
              onTimeout :(request) => {
                this.$message.error('请求超时');
                this.loading = false
              }
            }).then((response) => {
              var res = JSON.parse(response.bodyText);
              this.loading = false;
              var arr = res.records;
              for(var i = 0;i < arr.length;i++){
                 this.$set(this.chartData, i, arr[i])
              }
              var series = HighCharts.chart(this.id, this.option).series;
              while(series.length > 0) {
                 series[0].remove(true);
              }
              HighCharts.chart(this.id, this.option).redraw();
              this.option.title.text = this.metric;
              HighCharts.chart(this.id, this.option).series[0].update({data: this.chartData});
            })
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
          onClick() {
            this.refreshCharts()
          },
          handleSelect(value) {
            this.item = this.options.find((item) => {
               return item.value === value
             })
            this.metric = this.item.label;
            this.refreshCharts();
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
