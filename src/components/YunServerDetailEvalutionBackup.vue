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
          <p>Power</p>
            <el-main>
              <el-date-picker
                      v-model="timestamp"
                      type="datetime"
                      placeholder="选择日期时间"
                      @change='handleSelectTimestamp'>
              </el-date-picker>
              <el-select v-model="algorithm" placeholder="请选择" @change='handleSelectAlgorithm'>
                <el-option
                  v-for="item in Algorithms"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              <el-select v-model="value" placeholder="请选择" @change='handleLoadSubOptions'>
                <el-option
                  v-for="item in Options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              <el-select v-model="subValue" placeholder="请选择" @change='handleSelectMatrix'>
                <el-option
                  v-for="item in subOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
              <p></p>
              <div class="x-bar">
                <div :id="id" :option="option"></div>
              </div>
            </el-main>
        </el-main>
<!--        <el-footer>-->

<!--        </el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
      var _this = {};
      import { mapMutations } from 'vuex';
      import Vuex from 'vuex' //引入 Vuex
      import store from '../store'
      import {formatDate} from '../utils/formatDate.js'
      import HighCharts from 'highcharts'
      export default {
          name: "YunServerDetailMonitor",
          data() {
            return {
              userName: "",
              activeIndex: '1',
              records: [],
              arr: [],
              fromTime: '',
              flag: false,
              chartData: [],
              username: this.$route.query.data,
              timestamp: new Date('2020-09-21 15:16:12'),
              chart: null,
              metric: "cpu.0.percent.active",
              vmDetail: [],
              value: 'cpu',
              subValue: 'cpu.0.percent.active',
              algorithm: 'darnn',
              res: '',
              Options: [
                {
                  value: '选项1',
                  label: 'cpu'
                }, {
                  value: '选项2',
                  label: 'disk'
                }, {
                  value: '选项3',
                  label: 'memory'
                }, {
                  value: '选项4',
                  label: 'net'
                }
              ],
              Algorithms: [
                {
                  value: '选项1',
                  label: 'arima'
                }, {
                  value: '选项2',
                  label: 'randomforest'
                }, {
                  value: '选项3',
                  label: 'darnn'
                }
              ],
              subOptions: [
                {
                  value: '选项1',
                  label: 'disk.0.percent.active'
                }, {
                  value: '选项2',
                  label: 'disk.1.percent.active'
                }, {
                  value: '选项3',
                  label: 'disk.2.percent.active'
                }, {
                  value: '选项4',
                  label: 'disk.3.percent.active'
                }, {
                  value: '选项5',
                  label: 'disk.4.percent.active'
                }
              ],
              cpuOptions: [
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
              diskOptions: [
                {
                  value: '选项1',
                  label: 'disk.0.percent.active'
                }, {
                  value: '选项2',
                  label: 'disk.1.percent.active'
                }, {
                  value: '选项3',
                  label: 'disk.2.percent.active'
                }, {
                  value: '选项4',
                  label: 'disk.3.percent.active'
                }, {
                  value: '选项5',
                  label: 'disk.4.percent.active'
                }
              ],
              memoryOptions: [
                {
                  value: '选项1',
                  label: 'mem.0.percent.active'
                }, {
                  value: '选项2',
                  label: 'mem.1.percent.active'
                }, {
                  value: '选项3',
                  label: 'mem.2.percent.active'
                }, {
                  value: '选项4',
                  label: 'mem.3.percent.active'
                }, {
                  value: '选项5',
                  label: 'mem.4.percent.active'
                }
              ],
              netOptions: [
                {
                  value: '选项1',
                  label: 'net.0.percent.active'
                }, {
                  value: '选项2',
                  label: 'net.1.percent.active'
                }, {
                  value: '选项3',
                  label: 'net.2.percent.active'
                }, {
                  value: '选项4',
                  label: 'net.3.percent.active'
                }, {
                  value: '选项5',
                  label: 'net.4.percent.active'
                }
              ],
              option: {
                chart: {
               		type: 'spline',
               		marginRight: 10,
               		events: {
               				load: function () {
               						var series = this.series[0]
               						setInterval(function () {
                              var x = (new Date()).getTime(), // 当前时间
                                  // y = Math.random();          // 随机值
                                  y = _this.getPredData();          // 随机值
                                  // console.log(y);
               								series.addPoint([x, _this.res], true, true);
               								//_this.activeLastPointToolip(this);
               						}, 1000);
               				}
               		}
               },
               title: {
               		text: 'cpu.0.percent.active'
               },
               xAxis: {
               		type: 'datetime',
               		tickPixelInterval: 150
               },
               yAxis: {
               		title: {
               				text: '利用率'
               		}
               },
               tooltip: {
               		formatter: function () {
               				return '<b>' + this.series.name + '</b><br/>' +
               						HighCharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
               						HighCharts.numberFormat(this.y, 2);
               		}
               },
               legend: {
               		enabled: false
               },
               series: [{
               		name: _this.matrix,
               		data: (function () {
               				// 生成随机值
               				var data = [],
               						time = _this.timestamp,
               						i;
               				for (i = -19; i <= 0; i += 1) {
               						data.push({
               								x: time + i * 1000,
                              y: Math.random()
               						});
               				}
               				return data;
               		}())
               }]
              },
              // 选中的选项
              item: {},
              idForm: {
                id: "1"
              },
              id: this.$route.params.id,
            }
          },
          beforeCreate:function(){
            _this = this;
          },
          created() {
            //
          },
          filters: {
            tagsFilter(data) {
              return data.toString().replace('[','');
            },
            formatDate:function(date) {
              return moment(date).format("HH:mm:ss");
            }
          },
          mounted() {
            this.showVmServerDetail();
            this.getData()
            // this.showCPUCharts();
            // HighCharts.chart(this.id, this.option)
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
            toTime(timestamp) {
              return formatDate(timestamp, 'yyyy-MM-dd hh:mm')
            },
            unixTimeToDateTime(date) {
                var date = new Date(date*1000); // 依情况进行更改 * 1
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + date.toTimeString().substr(0, 8);
            },
            showCPUCharts() {
              console.log("start")
              console.log(this.timestamp)
              console.log(this.getTimestamp(this.timestamp))
              console.log('http://localhost:8085/yunprophet/predict/body/data/' + this.getTimestamp(this.timestamp) + '/' + this.algorithm + '/' + this.subValue)
              this.$http.get('http://localhost:8085/yunprophet/predict/body/data/' + this.getTimestamp(this.timestamp) + '/' + this.algorithm + '/' + this.subValue,{
                _timeout:5000,
                onTimeout :(request) => {
                  this.$message.error('请求超时');
                  this.loading = false
                }
              }).then((response) => {
                var res = JSON.parse(response.bodyText);
                this.loading = false;
                var pred = res.data.pred;
                var real = res.data.true;
                console.log(pred, real);

              })
            },
            getPredData() {
              this.$api.get('http://localhost:8085/yunprophet/predict/body/data/' + this.getTimestamp(this.timestamp) + '/' + this.algorithm + '/' + this.subValue, null, r => {
                this.res = r.data.data.pred
              })
            },
            showDiskCharts() {
              this.$http.get('http://localhost:8089/monitor/query/lidata-DL/'+ this.metric + '/1600841946/1600928394',{
                _timeout:5000,
                onTimeout :(request) => {
                  this.$message.error('请求超时');
                  this.loading = false
                }
              }).then((response) => {
                var res = JSON.parse(response.bodyText);
                this.loading = false;
                var arr = res.records;
                this.fromTime = res.startTime;
                for(var i = 0;i < arr.length;i++){
                  this.chartData.push(arr[i]);
                }
              })
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
            toVmDetail(url){
              window.open(url)
            },
            loadSubOptions(name) {
              this.option.subValue=null;
              const subOptionName = name + "Options";
              this.subOptions=this[`${subOptionName}`];
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
            handleLoadSubOptions(value) {
              this.loadSubOptions(value);
            },
            handleSelectTimestamp(value) {
              this.timestamp = this.item.label;
            },
            handleSelectAlgorithm(value) {
              console.log("showCPU1")
              console.log(value)
              // this.algorithm = this.item.label;
              this.algorithm = value
              console.log(this.algorithm)
              console.log("showCPU2")
              this.showCPUCharts()
              HighCharts.chart(this.id, this.option)
            },
            handleSelectMatrix(value) {
              this.item = this.options.find((item) => {
                return item.value === value
              })
              this.matrix = this.item.label;
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
