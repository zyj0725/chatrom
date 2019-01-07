import request from '@/utils/request'

const canclemsg = function(data) {
    return request({
        url: '/msg/cancleMsgAndDeleteMsg',
        method: 'post',
        data
    })
}

export default canclemsg
