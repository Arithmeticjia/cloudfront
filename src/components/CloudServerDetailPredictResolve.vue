<template xmlns="http://www.w3.org/1999/html">
  <el-container>
    <el-header>
      <CloudTabHead></CloudTabHead>
    </el-header>
    <el-container  style="height: 620px; border: 1px solid #eee">
      <el-aside width="200px">
        <CloudTabLeft></CloudTabLeft>
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
              <el-select v-model="hostname" placeholder="请选择" @change='handleLoadSubOptions'>
                <el-option
                  v-for="item in hostNames"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              <div id="container"></div>
              <div class="x-bar">
                <div :id="id" :option="option" style="height: 300px"></div>
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
      import navigationItem from './navigationItem'
      import store from '../store'
      import {formatDate} from '../utils/formatDate.js'
      import HighCharts from 'highcharts'
      import CloudTabLeft from "./CloudTabLeft";
      import CloudTabHead from "./CloudTabHead";
      export default {
          name: "CloudServerDetailMonitorResolve",
          components: { CloudTabHead, CloudTabLeft },
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
              timestamp: new Date('2019-09-12 22:44:04'),
              chart: null,
              metric: "cpu.0.percent.active",
              vmDetail: [],
              value: 'cpu',
              subValue: 'cpu.0.percent.active',
              algorithm: 'DA-RNN',
              pred: '',
              real: '',
              ser: [{
                name: 'CPU',
                y: 20,
                z: 92.9
              }, {
                name: 'Disk',
                y: 90,
                z: 118.7
              }, {
                name: 'Memory',
                y: 40,
                z: 124.6
              }],
              menuList: [
                {
                  "id": 1,
                  "path": "/admin ",
                  "name": "Content",
                  "nameZh": "物理机能耗预测",
                  "iconCls": "el-icon-tickets",
                  "component": "AdminIndex",
                  "parentId": 0,
                  "children": [{
                    "id": 9,
                    "path": "/admin/content/department",
                    "name": "Department",
                    "nameZh": "Host1",
                    "iconCls": null,
                    "component": "content/department",
                    "parentId": 3,
                    "children": null
                  },
                    {
                      "id": 10,
                      "path": "/admin/content/student",
                      "name": "Student",
                      "nameZh": "Host2",
                      "iconCls": null,
                      "component": "content/student",
                      "parentId": 3,
                      "children": null
                    },
                    {
                      "id": 11,
                      "path": "/admin/content/enterprise",
                      "name": "Enterprise",
                      "nameZh": "Host3",
                      "iconCls": null,
                      "component": "content/enterprise",
                      "parentId": 3,
                      "children": null
                    }
                  ]
                },
                {
                  "id": 4,
                  "path": "/admin",
                  "name": "System",
                  "nameZh": "物理机能耗分解",
                  "iconCls": "el-icon-s-tools",
                  "component": "AdminIndex",
                  "parentId": 0,
                  "children": [{
                    "id": 12,
                    "path": "/admin/system/run",
                    "name": "Run",
                    "nameZh": "虚拟机分解",
                    "iconCls": null,
                    "component": "system/run",
                    "parentId": 4,
                    "children": [{
                      "id": 9,
                      "path": "/admin/content/department",
                      "name": "Department",
                      "nameZh": "Host1",
                      "iconCls": null,
                      "component": "content/department",
                      "parentId": 3,
                      "children": null
                    },
                      {
                        "id": 10,
                        "path": "/admin/content/student",
                        "name": "Student",
                        "nameZh": "Host2",
                        "iconCls": null,
                        "component": "content/student",
                        "parentId": 3,
                        "children": [{
                          "id": 20,
                          "path": "/admin/content/student/graduateInfo",
                          "name": "graduateInfo",
                          "nameZh": "VM1",
                          "iconCls": null,
                          "component": "content/student/graduateInfo",
                          "parentId": 10,
                          "children": [{
                            "id": 20,
                            "path": "/admin/content/student/graduateInfo",
                            "name": "graduateInfo",
                            "nameZh": "Docker1",
                            "iconCls": null,
                            "component": "content/student/graduateInfo",
                            "parentId": 10,
                            "children": {}
                          }]
                        },{
                          "id": 20,
                          "path": "/admin/content/student/graduateInfo",
                          "name": "graduateInfo",
                          "nameZh": "VM2",
                          "iconCls": null,
                          "component": "content/student/graduateInfo",
                          "parentId": 10,
                          "children": null
                        }]
                      },
                      {
                        "id": 11,
                        "path": "/admin/content/enterprise",
                        "name": "Enterprise",
                        "nameZh": "Host3",
                        "iconCls": null,
                        "component": "content/enterprise",
                        "parentId": 3,
                        "children": [{
                          "id": 11,
                          "path": "/admin/content/enterprise",
                          "name": "Enterprise",
                          "nameZh": "VM4",
                          "iconCls": null,
                          "component": "content/enterprise",
                          "parentId": 3,
                          "children": null
                        }]
                      }
                    ]
                  },
                    {
                      "id": 13,
                      "path": "/admin/system/data",
                      "name": "Data",
                      "nameZh": "Docker分解",
                      "iconCls": null,
                      "component": "system/data",
                      "parentId": 4,
                      "children": null
                    },
                    {
                      "id": 14,
                      "path": "/admin/system/log",
                      "name": "Log",
                      "nameZh": "硬件分解",
                      "iconCls": null,
                      "component": "system/log",
                      "parentId": 4,
                      "children": null
                    }
                  ]
                }
              ],
              hostname: 'compute01',
              xTimestamp: this.getTimestamp(new Date('2019-09-12 22:44:04')) - 1,
              hostNames: [
                {
                  value: '选项1',
                  label: 'compute01'
                },
                {
                  value: '选项2',
                  label: 'compute02'
                },
              ],
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
                  label: 'ARIMA'
                }, {
                  value: '选项2',
                  label: 'RandomForest'
                }, {
                  value: '选项3',
                  label: 'DA-RNN'
                }, {
                  value: '选项4',
                  label: 'TCN'
                }, {
                  value: '选项5',
                  label: 'LSTM'
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
              container: {
                chart: {
                  type: 'variablepie'
                },
                title: {
                  text: '物理机能耗值实时分解'
                },
                subtitle: {
                  text: ''
                },
                tooltip: {
                  headerFormat: '',
                  animation: false,
                  pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                    '面积 (平方千米): <b>{point.y}</b><br/>' +
                    '人口密度 (每平方千米人数): <b>{point.z}</b><br/>'
                },
                loading: {
                  showDuration: 10
                },
                series: [{
                  minPointSize: 10,
                  innerSize: '20%',
                  zMin: 0,
                  name: 'countries',
                  data: []
                }]
              },
              option: {
                chart: {
               		type: 'spline',
               		marginRight: 10,
               		events: {
               				load: function () {
               						var series = this.series[0];
                          var series2 = this.series[1];
               						setInterval(function () {
                              // var x = (new Date()).getTime(),     // 当前时间 number
                              var x = new Date(_this.unixTimeToDateTime(_this.xTimestamp)).getTime();
                              var z = _this.real;
                              series2.addPoint([x, z], true, true);
                              _this.xTimestamp = _this.xTimestamp + 1;
                              var v = _this.getPredData(),           // 预测值
                                  nx = new Date(_this.unixTimeToDateTime(_this.xTimestamp)).getTime(),           // 时间戳
                                  // y = Math.random();              // 随机值
                                  y = _this.pred;
                                  // z = _this.real;
               								series.addPoint([nx, y], true, true);
                              // _this.activeLastPointToolip(chart);
                              // series2.addPoint([x, z], true, true);
               								// _this.activeLastPointToolip(chart2);
               						}, 1000);
               				}
               		}
               },
               title: {
               		text: 'Power Prediction'
               },
               xAxis: {
               		type: 'datetime',
               		tickPixelInterval: 150
               },
               yAxis: {
               		title: {
               				text: '能耗值'
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
               		name: '预测值',
               		data: (function () {
               				// 生成随机值
               				var data = [],
               						time = _this.timestamp,
               						i;
               				for (i = -19; i <= 0; i += 1) {
               						data.push({
               								x: time + i * 1000,
                              y: 3
               						});
               				}
               				return data;
               		}())
               },{
                 name: '真实值',
                 data: (function () {
                   // 生成随机值
                   var data = [],
                     time = _this.timestamp,
                     i;
                   for (i = -19; i <= 0; i += 1) {
                     data.push({
                       x: time + i * 1000,
                       y: 3
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
              id2: 2
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
            this.container.series[0].data = this.ser
            HighCharts.chart('container', this.container);
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
              })
            },
            getPredData() {
              let url = 'http://localhost:8085/yunprophet/predict/body/data/' + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname;
              let nUrl = 'http://192.168.0.218:5555/api-powerpredict/powerpredict/' + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname;
              this.$api.get(nUrl, null, r => {
                this.pred = r.data.data.pred;
                this.real = r.data.data.real;
                this.ser = [{
                  name: 'CPU',
                  y: Math.random(),
                  z: 92.9
                }, {
                  name: 'Disk',
                  y: Math.random(),
                  z: 118.7
                }, {
                  name: 'Memory',
                  y: Math.random(),
                  z: 124.6
                }];
                this.container.series[0].data = this.ser;
                HighCharts.chart('container', this.container);
                this.xTimestamp = parseInt(r.data.data.timestamp);
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
            handleLoadSubOptions(value) {
              this.loadSubOptions(value);
              HighCharts.chart(this.id, this.option).redraw();
            },
            handleSelectTimestamp() {
              this.xTimestamp = this.getTimestamp(this.timestamp);
              HighCharts.chart(this.id, this.option);
            },
            handleSelectAlgorithm(value) {
              this.algorithm = value
              // this.showCPUCharts();
              // HighCharts.chart(this.id, this.option)
              HighCharts.chart(this.id, this.option).redraw();
              // HighCharts.chart("container", this.container);
            },
            handleSelectMatrix(value) {
              this.item = this.options.find((item) => {
                return item.value === value
              })
              this.matrix = this.item.label;
            },
            formatDate(time) {
              time = time * 1000
              let date = new Date(time)
              return formatDate(date, 'yyyy-MM-dd hh:mm')
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
  #container {
    display:inline-block;
    min-width: 300px;
    max-width: 800px;
    height: 280px;
    /*margin: 1em auto;*/
    vertical-align:top;
    margin-top: 0;
  }
</style>
