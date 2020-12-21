import { getvmbyid } from '@/api/getvmbyid'//引入登录 api 接口

const vmdetail = {
  actions: {
    Vm({ commit }, idInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
      return new Promise((resolve, reject) => { //封装一个 Promise
        getvmbyid(idInfo.id).then(response => { //使用 login 接口进行网络请求
          // commit(''); //提交一个 mutation，通知状态改变
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
};
export default vmdetail
