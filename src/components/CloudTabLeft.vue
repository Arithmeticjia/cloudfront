<template>
  <el-menu>
    <navigation-item v-for="(menu,i) in menuList" :key="i" :item="menu"/>
  </el-menu>
</template>

<script>
import navigationItem from "./navigationItem";
import { mapMutations } from 'vuex';
import store from '../store'

export default {
  name: "CloudTabLeft",
  components: { navigationItem },
  data() {
    return {
      username: store.getters.userName,
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
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
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
