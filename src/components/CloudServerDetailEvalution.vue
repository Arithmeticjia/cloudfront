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
            <el-select v-model="hostname" placeholder="请选择" @change='handleHostname'>
              <el-option
                v-for="item in hostNames"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
<!--            <div id="container"></div>-->
          </el-main>
          <div id="container-column-stacked-percent"></div>
        </el-main>
        <!--        <el-footer>-->

        <!--        </el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import CloudTabHead from "./CloudTabHead";
var _this = {};
import { mapMutations } from 'vuex';
import Vuex from 'vuex' //引入 Vuex
import store from '../store'
import {formatDate} from '../utils/formatDate.js'
import HighCharts from 'highcharts'
import CloudTabLeft from "./CloudTabLeft";
export default {
  name: "YunServerDetailEvlution",
  components: {CloudTabLeft, CloudTabHead },
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
      vmList: [],
      powerList: [],
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
          type: 'column'
        },
        title: {
          text: '物理机能耗分解图'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: '能耗值'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>' +
            '({point.percentage:.0f}%)<br/>',
          //:.0f 表示保留 0 位小数，详见教程：https://www.hcharts.cn/docs/basic-labels-string-formatting
          shared: true
        },
        plotOptions: {
          column : {
            pointWidth: 60
          }
        },
        series: [{
          name: 'Power',
          data: []
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
    HighCharts.chart('container-column-stacked-percent', this.container);
    this.getEvalData();
    HighCharts.chart('container-column-stacked-percent', this.container);
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
    getEvalData() {
      let url = 'http://localhost:8085/yunprophet/evalution/body/' + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname;
      let nUrl = 'http://192.168.0.218:5555/api-powerpredict/powerpredict/' + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname;
      this.$api.get(url, null, r => {
        this.vmList=[];
        this.powerList=[];
        for(var i in r.data.vmList){
          this.vmList.push(r.data.vmList[i].vmName);
          this.powerList.push(r.data.vmList[i].evaluatePower);
        }
        console.log(this.vmList);
        this.container.xAxis.categories = this.vmList;
        this.container.series[0].data = this.powerList;
        HighCharts.chart('container-column-stacked-percent', this.container);
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
    handleHostname(value) {
      this.hostname = value;
      this.getEvalData();
      HighCharts.chart('container-column-stacked-percent', this.container);
    },
    handleSelectTimestamp() {
      this.xTimestamp = this.getTimestamp(this.timestamp);
      HighCharts.chart('container-column-stacked-percent', this.container);
    },
    handleSelectAlgorithm(value) {
      this.algorithm = value
      HighCharts.chart('container-column-stacked-percent', this.container);
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
#container-column-stacked-percent {
  min-width:400px;
  height:400px
}
</style>
