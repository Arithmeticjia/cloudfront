import request from '@/utils/request' //引入封装好的 axios 请求

export function getvmbyid(id) {
  return request({
    url: '/yunprophet/serverapi/getServerVmDetail',
    method: 'get',
    params: {
      id
    }
  })
}
