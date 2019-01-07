// import Cookies from 'js-cookie'
const TokenKey = 'User-Token'
const  ExpireTime = 'Expire-Time'
const domain = document.domain+TokenKey
var Cookie = {
	getToken(){
    return JSON.parse(window.sessionStorage.getItem(domain))
		// return Cookies.get(TokenKey);
	},
	setToken(token){
    window.sessionStorage.setItem(domain, JSON.stringify(token))
	},
	removeToken(){
    return window.sessionStorage.removeItem(domain);
  },
  SetStorageToken(token) {
    window.localStorage.setItem(TokenKey, JSON.stringify(token))

  },
  GetStorageToken() {
    return JSON.parse(window.localStorage.getItem(TokenKey))
  },
  RemoveStorageToken(){
    return window.localStorage.removeItem(TokenKey);
  },
  SetExpireTime(time) {
    window.localStorage.setItem(ExpireTime, JSON.stringify(time))

  },
  GetExpireTime() {
    return JSON.parse(window.localStorage.getItem(ExpireTime))
  },
  RemoveExpireTime(){
    return window.localStorage.removeItem(ExpireTime);
  },

}

export default Cookie;
