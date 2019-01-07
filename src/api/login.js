import request from '@/utils/request'
var Login = {
  //传入用户登录信息
	loginUser(data){
		return request({
		    url: '/login',
		    method: 'post',
		    data
	  	});
  },
  //获取用户信息
	getInfo(){
		return request({
		    url: '/userInfo',
		    method: 'get'
		 })
  },
  //登出
	logout(){
		return request({
		    url: '/logout',
		    method: 'post'
		})
	}
}

export default Login;
