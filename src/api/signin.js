import request from '@/utils/request'
//登陆API
var SigninApi = {
	getCheckinList(date){
		return request({
		    url: '/sign/getCheckinList',
		    method: 'post',
		    data:{
		    	date:date
		    }
	  	});
  },
  //检查是否登陆
	checkSigin(){
		return request({
		    url: '/sign/isqiandao',
		    method: 'get'
	  	});
  },
  //签到
	checkIn(){
		return request({
		    url: '/sign/checkin',
		    method: 'get'
	  	});
  },
}

export default SigninApi;
