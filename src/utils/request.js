import axios from 'axios'
import store from './vuexStore'
import {Modal} from 'iview';
import Cookie from '@/utils/auth'
// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000, // 请求超时时间
  withCredentials: true  //指示是否跨站点访问控制请求 cookie
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  config.headers['token'] = Cookie.getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
  // debugger
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 0) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      	Modal.confirm({
            title: '确定登出',
            content: '你已被登出，可以取消继续留在该页面，或者重新登录',
            okText:'重新登录',
            onOk:()=>{
            	store.dispatch('FedLogOut').then(() => {
		            location.reload()// 为了重新实例化vue-router对象 避免bug
		          })
            }
        });
        
      }else{
        if(res.code !== 501){
          Modal.error({
            title: '错误提示',
            content: res.msg
          });
        }
      }
      return Promise.reject(res) //抛出异常
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Modal.error({
      	title: '错误提示',
      	content: error.message || error.msg
  	});
    return Promise.reject(error)
  }
);

export default service
