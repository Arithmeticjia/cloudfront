// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' //引入 Vuex 状态管理
import axios from 'axios'
import  VueResource  from 'vue-resource'
import Highcharts from 'highcharts';
import variablepie from 'highcharts/modules/variable-pie'
// 引用API文件
import api from './api/index.js'

// 将API方法绑定到全局
Vue.prototype.$api = api

variablepie(Highcharts)
Vue.use(VueResource)
// Vue.use(VueHighcharts, { Highcharts });
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods:{

    moreChart() {
      var options = this.getMoreOptions(this.type);

      if (this.chart) {
        this.chart.destroy();
      }
      // 初始化 Highcharts 图表
      this.chart = new Highcharts.Chart('highcharts-more', options);
    }
  }
});

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });


Vue.http.interceptors.push((request, next) => {
  let timeout;
  // 如果某个请求设置了_timeout,那么超过该时间，会终端该（abort）请求,并执行请求设置的钩子函数onTimeout方法，不会执行then方法。
  if (request._timeout) {
    timeout = setTimeout(() => {
      if(request.onTimeout) {
        request.onTimeout(request);
        request.abort()
      }
    }, request._timeout);
  }
  next((response) => {
    clearTimeout(timeout);
    return response;
  })
})
