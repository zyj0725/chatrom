import request from '@/utils/request'
//红包
var RedEnvelope = {
  //获取余额
	getBalance(){
		return request({
		    url: '/userInfo/mymoney',
		    method: 'post'
	  	});
  },
  //发红包
	send(data){
		return request({
		    url: '/redpacket/send',
		    method: 'post',
		    data
	  	});
  },
  //抢红包 用户id
	grab(id){
		return request({
		    url: '/redpacket/receive',
		    method: 'post',
		    data:{
		    	redpacketId:id
		    }
		})
  },
  //获取我的红包
	getMyRed(){
		return request({
		    url: '/redpacket/userRedpack',
		    method: 'post'
		});
  },
  //得到状态
	getStutas(data) {
		return request({
			url: '/redpacket/status',
			method: 'post',
			data
		})
  },
  //得到细节
	getDetail(data) {
		return request({
			url: '/redpacket/detail',
			method: 'post',
			data
		})
  },
  //获取历史
	getHistory(data) {
		return request({
			url: '/msg/chatroomHisMsg?timestamp='+data+'&min=10',
		})
  },
  transfer(data){
    return request({
      url:'/withdraw/apply',
      method:'post',
      data
    })
  },
}

export default RedEnvelope;
