import request from '@/utils/request'

const reg = {
  //用户注册
    registUser(data) {
        return request({
            url: '/register',
            method: 'post',
            data
        })
    },
    //获取注册码
    getRegistCode() {
        return request({
            url: '/getCode',
            method: 'get',
            // responseType: 'arraybuffer',
            // transformResponse(data) {
            //     return new Uint8Array(data)
            // }
        })
    }
}

export default reg
