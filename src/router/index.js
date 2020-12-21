import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueSpringBoot from '@/components/VueSpringBoot'
import Admin from '@/components/Admin'
import NotFound from '@/components/NotFound'
import Login from '@/components/Login'
import Success from '@/components/Success'
import CloudNew from '@/components/CloudNew'
import CloudList from '@/components/CloudList'
import CloudIndex from '@/components/CloudIndex'
import CloudServerDetail from '@/components/CloudServerDetail'
import CloudAbout from '@/components/CloudAbout'
import YunAdmin from '@/components/YunAdmin'
import YunMonitor from '@/components/YunMonitor'
import YunMonitorServer from '@/components/YunMonitorServer'
import YunMonitorServerTime from '@/components/YunMonitorServerTime'
import YunServerDetailMonitor from '@/components/YunServerDetailMonitor'
import YunServerDetailPredict from '@/components/YunServerDetailPredict'
import CloudServerDetailPredictResolve from '@/components/CloudServerDetailPredictResolve'
import CloudServerDetailEvalution from "@/components/CloudServerDetailEvalution";
import Menu from '@/components/Menu'
import YunCpu from '@/components/YunCpu'
import ElementUI from 'element-ui'
import '../assets/element-#545C64/index.css'


Vue.use(Router)
// Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'VueSpringBoot',
      component: VueSpringBoot
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/cloud/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/cloud/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cloud/test',
      name: 'CloudNew',
      component: CloudNew
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/yun/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/cloud/index',
      name: 'CloudIndex',
      component: CloudIndex
    },
    {
      path: '/cloud/list',
      name: 'CloudList',
      component: CloudList
    },
    {
      path: '/cloud/about',
      name: 'CloudAbout',
      component: CloudAbout
    },
    {
      path: '/cloud/server/:id/:serverId',
      name: 'CloudServerDetail',
      component: CloudServerDetail
    },
    {
      path: '/yun/server/:id/:serverId/monitor',
      name: 'YunServerDetailMonitor',
      component: YunServerDetailMonitor
    },
    {
      path: '/yun/server/:id/:serverId/predict',
      name: 'YunServerDetailPredict',
      component: YunServerDetailPredict
    },
    {
      path: '/cloud/server/:id/:serverId/evalution',
      name: 'YunServerDetailEvalution',
      component: CloudServerDetailEvalution
    },
    {
      path: '/cloud/server/:id/:serverId/predict/resolve',
      name: 'CloudServerDetailPredictResolve',
      component: CloudServerDetailPredictResolve
    },
    {
      path: '/yun/admin',
      name: 'YunAdmin',
      component: YunAdmin
    },
    {
      path: '/yun/monitor',
      name: 'YunMonitor',
      component: YunMonitor
    },
    {
      path: '/yun/monitor/cpu',
      name: 'YunCpu',
      component: YunCpu
    },
    {
      path: '/yun/monitor/server',
      name: 'YunMonitorServer',
      component: YunMonitorServer
    },
    {
      path: '/yun/monitor/server/time',
      name: 'YunMonitorServerTime',
      component: YunMonitorServerTime
    },
  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/cloud/login' || to.path === '/cloud/index') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
      next('/cloud/login');
    } else {
      next();
    }
  }
  if (to.matched.length === 0) {  //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/cloud/404');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();    //如果匹配到正确跳转
  }
});
export default router;
