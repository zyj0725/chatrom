
import request from '@/utils/request'
import Constants from '@/utils/constants'

//得到计时器
// const getTimer = function(index) {
//     let result = request({
//         url: Constants.kjapi[index],
//     })
//     return result
// };
const getArrayTime = function (value,num) {
    let result = request({
        url: value,
    })
    return result
}
export default getArrayTime
