import request from '@/utils/request'
//引入
import Constants from '@/utils/constants'
//开奖 北京赛车
const kj = {
    bjsckj() {
        return request({
            url: Constants.kjjlApi[0],
            method: 'get'
        })
    },
    //
    cqssc() {
        return request({
            url: Constants.kjjlApi[1],
            method: 'get'
        })
    },
    kjjsonarray() {
      return request ({
          url: "/kjjsonarray",
          method: "get"
      })
    }
}

export default kj
