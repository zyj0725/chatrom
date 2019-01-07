import md5 from 'js-md5'
import Util from './util'
//MD5加密
const str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getRandom = function(len){
	let value = "";
	let i = str.length;

	for (var n = 0; n < len; n++){
		value += str.charAt(Math.floor(Math.random() * i));
	}
	return value;
};
const getMd5 = function() {
	var randomstr = getRandom(16);
	var md5Str = Util.getStorage('visitor');
	console.log('================>'+md5Str);
	if(!md5Str){
		md5Str = md5(randomstr).substring(0, 10).toUpperCase();
		Util.setStorage('visitor',md5Str);
	}
	return md5Str;
}

const makeMd5 = function(data) {
	return md5(data).substr(0, 16);
}
export default {
	getMd5,
	makeMd5
}
