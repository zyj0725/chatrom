import request from '@/utils/request'
//修改用户信息
const changeInfo = {
    subInfo(data) {
        return request({
            url: '/userInfo/editUserInfo',
            method: 'post',
            data
        })
    },
    subPwd(data) {
        return request({
            url: '/userInfo/updatePassword',
            method: 'post',
            data
        })
    },
    //用户禁言
    prohibitMessage(uid) {
        return request ({
            url: '/userInfo/userProhibitMessage?userId='+uid,
            method: 'get',
        })
    }
}

export default changeInfo

