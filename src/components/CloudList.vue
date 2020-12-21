<template>
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
          <p>服务器概览</p>
          <el-col :span="12">
            <el-card :body-style="{ padding: '20px' }" class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bolder;font-size: 17px">总计</span>
                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
              </div>
              <div class="text item">
                <p><label class="vminfo">{{ total }}</label></p>
              </div>
            </el-card>
            </br>
          </el-col>
          <el-col :span="12">
            <el-card :body-style="{ padding: '20px' }" class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bolder;font-size: 17px">运行中</span>
                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
              </div>
              <div class="text item">
                <p><label class="vminfo">{{ total }}</label></p>
              </div>
            </el-card>
            </br>
          </el-col>
          <p>服务器列表</p>
          <div class="vmList" v-for="(value, key, index) in vmList" v-loading="loading">
            <el-col :span="12">
                <el-card :body-style="{ padding: '20px' }" class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bolder;font-size: 17px">{{ value.serverName }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toVmDetail('/#/cloud'+ '/' + 'server/' + value.id + '/' + value.serverId)">查看详情</el-button>
              </div>
              <div class="text item">
                <p><label class="vminfo">IP地址：</label>{{ value.serverIp }}</p>
                <p style="display: inline"><label class="vminfo">实例ID：</label>{{ value.serverId }}</p>
                <i style="float: right;" @click="toEdit(value.id)" class="el-icon-edit"></i>
                <i style="float: right;margin-right: 10px" @click="toConfirmDelete()" class="el-icon-delete"></i>
                <el-dialog
                  title="是否确认删除该实例？"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  :before-close="handleClose"
                  center>
                  <span style="text-align: center">删除后不可恢复</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toDelete(value.id)">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </el-card>
              </br>
          </el-col>
          </div>
          <el-col :span="12">
            <el-card :body-style="{ padding: '20px' }" class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bolder;font-size: 17px">新增</span>
                <el-button style="padding: 3px 0" type="text" @click="dialogFormVisible = true">点击添加</el-button>
                <el-dialog title="服务器实例信息" :visible.sync="dialogFormVisible">
                  <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="实例名称" :label-width="formLabelWidth" prop="serverName">
                      <el-input v-model="form.serverName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="镜像名称" :label-width="formLabelWidth" prop="osInfo">
                      <el-input v-model="form.osInfo" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="CPU核心数" :label-width="formLabelWidth" prop="cpuCore">
<!--                      <el-input v-model="form.cpuCore" autocomplete="off"></el-input>-->
                      <el-select v-model="form.cpuCore" placeholder="请选择CPU核心数">
                        <el-option label="1" value=1></el-option>
                        <el-option label="2" value=2></el-option>
                        <el-option label="3" value=4></el-option>
                        <el-option label="4" value=6></el-option>
                        <el-option label="5" value=8></el-option>
                        <el-option label="6" value=10></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="内存大小" :label-width="formLabelWidth" prop="memSize">
                      <el-input v-model="form.memSize" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="系统盘大小" :label-width="formLabelWidth" prop="diskSize">
                      <el-input v-model="form.diskSize" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例IP" :label-width="formLabelWidth" prop="serverIp">
                      <el-input v-model="form.serverIp" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例用户名" :label-width="formLabelWidth" prop="serverRoot">
                      <el-input v-model="form.serverRoot" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例密码" :label-width="formLabelWidth" prop="serverPassword">
                      <el-input v-model="form.serverPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例区域" :label-width="formLabelWidth" prop="location">
                      <el-select v-model="form.location" placeholder="请选择活动区域">
                        <el-option label="南京" value="南京"></el-option>
                        <el-option label="上海" value="上海"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="实例类型" :label-width="formLabelWidth" prop="serverType">
                      <el-select v-model="form.serverType" placeholder="请选择实例类型">
                        <el-option label="vm" value="vm"></el-option>
                        <el-option label="docker" value="docker"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                  </div>
                </el-dialog>

                <!--编辑弹框-->
                <el-dialog title="服务器实例信息" :visible.sync="editDialogFormVisible">
                  <el-form :model="editForm" :rules="rules" ref="editForm">
                    <el-form-item label="实例名称" :label-width="formLabelWidth" prop="serverName">
                      <el-input v-model="editForm.serverName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="镜像名称" :label-width="formLabelWidth" prop="osInfo">
                      <el-input v-model="editForm.osInfo" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="CPU核心数" :label-width="formLabelWidth" prop="cpuCore">
                      <el-select v-model="editForm.cpuCore" placeholder="请选择CPU核心数">
                        <el-option label="1" value=1></el-option>
                        <el-option label="2" value=2></el-option>
                        <el-option label="3" value=4></el-option>
                        <el-option label="4" value=6></el-option>
                        <el-option label="5" value=8></el-option>
                        <el-option label="6" value=10></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="内存大小" :label-width="formLabelWidth" prop="memSize">
                      <el-input v-model="editForm.memSize" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="系统盘大小" :label-width="formLabelWidth" prop="diskSize">
                      <el-input v-model="editForm.diskSize" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例IP" :label-width="formLabelWidth" prop="serverIp">
                      <el-input v-model="editForm.serverIp" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例用户名" :label-width="formLabelWidth" prop="serverRoot">
                      <el-input v-model="editForm.serverRoot" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例密码" :label-width="formLabelWidth" prop="serverPassword">
                      <el-input v-model="editForm.serverPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实例区域" :label-width="formLabelWidth" prop="location">
                      <el-select v-model="editForm.location" placeholder="请选择活动区域">
                        <el-option label="南京" value="南京"></el-option>
                        <el-option label="上海" value="上海"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="实例类型" :label-width="formLabelWidth" prop="serverType">
                      <el-select v-model="editForm.serverType" placeholder="请选择实例类型">
                        <el-option label="vm" value="vm"></el-option>
                        <el-option label="docker" value="docker"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editSubmitForm('editForm')">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-card>
          </el-col>
        </el-main>
<!--        <el-footer>-->

<!--        </el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import navigationItem from './navigationItem'
  import { mapMutations } from 'vuex';
  import Vuex from 'vuex'
  import axios from 'axios';
  import store from '../store'
  import moment from 'moment';
  import CloudTabHead from "./CloudTabHead";
  import CloudTabLeft from "./CloudTabLeft";
    export default {
        name: "CloudList",
        components: { CloudTabHead, CloudTabLeft },
        data() {
          return {
            loading: true,
            vmList: [],
            username: store.getters.userName,
            currentDate: new Date(),
            dialogFormVisible: false,
            centerDialogVisible: false,
            editDialogFormVisible: false,
            total: 0,
            form: {
              serverName: 'Ubuntu',
              osInfo: 'Ubuntu 16.04',
              cpuCore: 1,
              memSize: '2G',
              diskSize: '40G',
              location: '南京',
              serverType: 'vm',
              serverIp: '1.1.1.1',
              serverRoot: 'root',
              serverPassword: 'admin'
            },
            selMenuData: {},
            defaultProps: {
              children: 'aaa',
              label: 'title',
              index: 'path'
            },
            props: {
              menuList: {
                type: Array,
                default () {
                  return []
                }
              },
              props: {
                type: Object,
                default () {
                  return {
                    children: 'children',
                    label: 'label',
                    index: 'id'
                  }
                }
              }
            },
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
            editForm: {
              serverName: '',
              osInfo: 'Ubuntu 16.042',
              cpuCore: 1,
              memSize: '2G',
              diskSize: '40G',
              location: '南京',
              serverType: 'vm',
              serverIp: '1.1.1.1',
              serverRoot: 'root',
              serverPassword: 'admin'
            },
            rules: {
              serverName: [
                { required: true, message: '请输入实例名称', trigger: 'blur' },
                { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }
              ],
              osInfo: [
                { required: true, message: '请输入镜像名称', trigger: 'blur' },
                { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }
              ],
              cpuCore: [
                { required: true, message: '请输入CPU核心数', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ],
              memSize: [
                { required: true, message: '请输入内存大小', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
              ],
              diskSize: [
                { required: true, message: '请输入系统盘大小', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
              ],
              serverIP: [
                { required: true, message: '请输入实例IP', trigger: 'blur' },
                { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
              ],
              serverRoot: [
                { required: true, message: '请输入实例用户名', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
              ],
              serverPassword: [
                { required: true, message: '请输入实例密码', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 10 个字符', trigger: 'blur' },
              ],
            },
            formLabelWidth: '120px',
            idForm: {
              id: "1"
            },
          }
        },
        created() {
        },
        mounted() {
          this.showVmServer();
          this.test();
        },
        methods: {
          onGetMenu(item) {
            this.selMenuData = item
            // this.$router.push({
            // 	path: item.path,
            // 	query: {
            // 		t: new Date().getTime()
            // 	}
            // })
          },
          onMenuItemClick(item) {
            this.$emit('getmenu', item)
          },
          toConfirmDelete() {
            this.centerDialogVisible = true
          },
          toEdit(e) {
            this.editDialogFormVisible = true;
            console.log(e);
            for(var i = 0,len = this.vmList.length; i < len; i++){
              if(this.vmList[i].id === e) {
                this.editForm = this.vmList[i];
              }
            }
          },
          toDelete(e) {
            this.centerDialogVisible = false;
            this.$http.get('http://localhost:8085/yunprophet/serverapi/deleteServer',{
              params: {
                id: e
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
                this.$message({
                  type: 'success',
                  message: `删除成功!`
                });
                this.showVmServer();
              } else {
                this.$message.error('查询数据失败');
              }
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
          submitForm(formname) {
            this.$refs[formname].validate(valid => {
              if (valid) {
                this.loading = true;
                axios({
                  method:"post",
                  url:"http://localhost:8085/yunprophet/serverapi/addServer",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials:false,
                  data:this.form
                }).then((res)=>{
                  if(res.data.code === 200){
                    this.loading = false;
                    this.dialogFormVisible = false;
                    this.$message({
                      type: 'success',
                      message: `添加成功!`
                    });
                    this.showVmServer();
                  }else {
                    this.$message({
                      type: 'error',
                      message: `服务器出了点问题，请稍后重试!`
                    });
                  }
                });
              } else {
                console.log('error submit!!');
                return false
              }
            })
          },
          editSubmitForm(formname) {
            console.log(this.editForm)
            this.$refs[formname].validate(valid => {
              if (valid) {
                this.loading = true;
                axios({
                  method:"post",
                  url:"http://localhost:8085/yunprophet/serverapi/editServer",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials:false,
                  data:this.editForm
                }).then((res)=>{
                  if(res.data.code === 200){
                    this.loading = false;
                    this.editDialogFormVisible = false;
                    this.$message({
                      type: 'success',
                      message: `修改成功!`
                    });
                    this.showVmServer();
                  }else {
                    this.$message({
                      type: 'error',
                      message: `服务器出了点问题，请稍后重试!`
                    });
                  }
                });
              } else {
                console.log('error submit!!');
                return false
              }
            })
          },
          test() {
            this.loading = true;
            this.$api.get('http://127.0.0.1:8085/yunprophet/serverapi/getServerVmAll', null, r => {
              console.log(r)
            })
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
                this.total = res.data.length;
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
    width: 470px;
    font-size: 15px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    border-top: 10px solid rgba(77, 77, 77, 0.68);
  }
  .vminfo {
    /*font-weight: bolder;*/
    font-size: 14px;
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
