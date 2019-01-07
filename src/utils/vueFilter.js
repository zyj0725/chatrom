import Util from './util'
//过滤器
export default{
	filterLength(items,num){//过滤长度
		if(typeof items == 'array'){
			if(items.length>num){
				return items.slice(0,num);
			}
			return items;
		}
		return "";
	},
	dateFormat(value,fmt){//日期格式化
		return Util.dateFormat(value,fmt);
  },
  aiteMe(value, fmt){//艾特过滤
    return Util.dateFormat(value,fmt);
  },
	toFixed(value,num){//格式化number
		if(typeof value == "object"){
			return '0.00';
		}
		if(value ==''||value==undefined){
			return '0.00';
		}
		if(isNaN(value)){
			if(typeof value==='number'){
				return "0.00";
			}
			if(value.indexOf("*")!=-1){
				return value;
			}
			return "0.00";
		}
		if(value==Number.MAX_VALUE){
			return "0.00";
		}

		if(typeof value !== "number"){
			return value;
		}
		return value.toFixed(num);
	}
}
