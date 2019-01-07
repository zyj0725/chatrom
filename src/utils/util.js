import Constants from '@/utils/constants'
//公共方法
var Util = {
	makeJson(data) {
		return JSON.stringify(data)
	},
	getStorage(key){//获取html5本地缓存
		return window.localStorage.getItem(key)
	},
	setStorage(key,data){//设置html5本地缓存
		if(typeof data === 'object'){
			data = JSON.stringify(data);
		}
		window.localStorage.setItem(key,data)
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
	isEmpty(obj){//检查对象为空
		for(var key in obj){
			return false;
		}
		return true;
	},
	isNotEmpty(obj){//检查对象不为空
		for(var key in obj){
			return true;
		}
		return false;
	},
	isNull(value){//检查字符串为空
		if(value == null || value == undefined || value =='' || value.length <= 0) {
			return true;
		}
		return false;
  },
  dateFormat(tmp, fmt){//日期格式化
		var date = null;
		if(!tmp){
			return "";
		}
		if(tmp instanceof Date){
			date = tmp;
		}else if(typeof tmp == 'string'||typeof tmp == 'number'){
			date = new Date(tmp);
		}else{
			return "";
		}
		if(date =="Invalid Date"){
			var aaa = tmp.replace(/-/g,"/");
			date = new Date(aaa);
		}
		if(/(y+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		var o ={
	        "M+" : date.getMonth()+1,                 //月份
	        "d+" : date.getDate(),                    //日
	        "h+" : date.getHours(),                   //小时
	        "m+" : date.getMinutes(),                  //分
	        "s+" : date.getSeconds(),                 //秒
	        "q+" : Math.floor((date.getMonth()+3)/3), //季度
	        "S"  : date.getMilliseconds()             //毫秒
      	};
      	for(var k in o){
      		if(new RegExp("("+ k +")").test(fmt)){
      			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      		}
      	}
      	return fmt;
  },

	reFormatDate(timer) {
		let date = new Date(timer.replace(/-/g, '/')).getTime();
		return date
	},

  getNowDate() {
    var timestamp=new Date().getTime();
    return timestamp
  },
	toFixed(val){
  		return "" != val && void 0 != val || (val = "0.00"),isNaN(val) ? "number" == typeof val ? "0.00": -1 != val.indexOf("*") ? val : "0.00": val == Number.MAX_VALUE ? "0.00": "number" != typeof val ? val: Math.floor(100 * Number(val)) / 100
  	},
	  messageFilter(val){//消息表情过滤替换
  		var regex = /\[(.+?)\]/g;// [] 中括号
  		var fs = val.msg.match(regex);//提取[]数据返回数组
  		if(Util.isNull(fs)){
  			return val;
  		}
  		var newval = val.msg;
  		for(var i=0;i < fs.length;i++){
  			let faceObj = Constants.faceList.filter(item=>{
				return item.datatxt === fs[i];
			});
			if(!Util.isNull(faceObj)){
				var img = `<img src="`+Constants.staticUrl+`images/face/`+faceObj[0].type+`/`+faceObj[0].images+`">`;
  				newval = newval.replace(fs[i],img);
			}
  		}
  		return val;
    },

    delRepeat(objArray,delname) {
      var result = [];//去重后返回的结果数组
      var temp = {};//临时对象
      //将对象数组中每一项的name值作为属性，若temp不拥有此属性时则为temp添加此属性且将其值赋为true，并将这一项push到结果数组中
      for(var i=0;i<objArray.length;i++){
          var delname = objArray[i].delname;
          if(temp[delname]){//如果temp中已经存在此属性名，则说明遇到重复项
              continue;//不继续执行接下来的代码，跳转至循环开头
          }
          temp[delname] = true;//为temp添加此属性（myname）且将其值赋为true
          result.push(objArray[i]);//将这一项复制到结果数组result中去
      }
      console.log(result);
      return result;

    },
    delImg(val){
      let imgs='';
      for (let j=0;j<val.length+1;j++){
        if(val[j]!='?'){
        imgs+=val[j];
        }
        else{
          return imgs;
        }
      }
    },

}

export default Util;
