import request from '@/utils/request'
//请求公共接口

var Common = {
  //通知接口
	getNotice(){
		return request({
		    url: '/getNotice',
		    method: 'get'
	  	});
  },
  //获取系统时间
	getSystemTime(){
		return request({
		    url: '/getSystemTime',
		    method: 'get'
	  	});
  },
  //获取用户信息
	getCustomerInfo(){
		return request({
		    url: '/getCustomerInfo',
		    method: 'get'
	  	});
  },
  getSystemInfo(){
		return request({
		    url: '/getSystemInfo',
		    method: 'get'
	  	});
	}
}

export default Common;
