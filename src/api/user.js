import request from '@/utils/request'

var User = {
  //获取列表
	getList(){
		return request({
		    url: '/websocket/onlineuser',
		    method: 'get'
	  	});
  },
  //获取列表信息
	getNumberInfo(data) {
		return request({
			url: '/userInfo?userId=' + data
		})
  },
  
}
export default User;
