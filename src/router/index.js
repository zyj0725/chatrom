import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Cookie from '@/utils/auth'
import Common from '@/api/common'
Vue.use(Router)
const router = new Router({
  routes: [
      {
      path: '*',
      redirect:'/home',
      },
        {
        path: '/',
        redirect:'/index',
        component: Index,
      },
      {
        path: '/index',
        name: 'index',
        component: Index,

      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      },

  ]
});

router.beforeEach((to, from, next) => {
  //游客模式 直接跳转到主页 false 登录模式 跳转到登陆页面 ture
  let mustLogin = true
  //检查Token是否有效
  Common.getSystemInfo(
  ).then(
    res => {
      if(res.data.isEffective ==0) {
        // Cookie.removeToken();
        next('/login')
      }
    }
  ).catch()
  if(mustLogin === false) {
    next('/index')
  }
  else if(mustLogin === true) {
    //如果没有userToken
    let loginState = router.app.$options.store._modules.root.state.isLogin
    var userToken = Cookie.getToken();
    if(userToken ) {
      next();
      return;
    }
    if(loginState == 1) {

      if(to.path=='/index' && userToken) {
        next()
      }
      else {
        next('/login')
      }
      next()
    }
    else if(loginState == 0 || loginState == "undefind") {
      if(to.path=='/login'){ //如果是登录页面路径，就直接next()
        next()
      }
      else { //不然就跳转到登录；
        next('/login')
      }
    }
    }
});

export default router;

