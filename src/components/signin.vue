<template>
	<div class="signin">
		<Row class="week">
			<Col span="3">日</Col>
			<Col span="3">一</Col>
			<Col span="3">二</Col>
			<Col span="3">三</Col>
			<Col span="3">四</Col>
			<Col span="3">五</Col>
			<Col span="3">六</Col>
		</Row>
		<Row class="date">
			<Col span="3" v-for="d in dataList" :key="d.key">
				<a href="javascript:;" v-if="d.value == '-'">&nbsp</a>
				<a href="javascript:;" @click="checkIn(d.value)" :class="[d.value==date?'cuur':'',d.signin?'has':'']" v-else>{{d.value}}</a>
			</Col>
		</Row>
	</div>
</template>
<script>
	import Constants from '@/utils/constants'
	import Util from '@/utils/util'
	import SigninApi from '@/api/signin'
	export default {
		name:"Signin",
		props:['isSignin'],
		data(){
			return {
				imgUrl: Constants.staticUrl,
				dataList:[],
				currenttime:null,
				date:null,
				checkInList:[],
				isLoading:false
			}
		},
		watch:{

		},
		mounted(){
			var that = this;
			this.$root.eventHub.$on("showSigninModelEvent",item=>{
			  that.currenttime = item;
		      that.getCheckin();
		    });

		    this.$root.eventHub.$on("closeSigninModelEvent",item=>{
		    	that.dataList = [];
		    });

		},
		computed:{

		},
		methods:{
			showDate(){
				//获取当前日期
			    var oDate = new Date(this.currenttime);
			    //获取当年 年
			    var year = oDate.getFullYear();
			    //获取当前 月
			    var month = oDate.getMonth() + 1;
			    //获取日
			    var d = oDate.getDate();
			    if(d < 9){
			    	this.date = '0'+d;
			    }else{
			    	this.date = ''+d;
			    }
			    //3.1.先获得当期月 有多少天
	            var dayNum = 0;
	            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
	                dayNum = 31;
	            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
	                dayNum = 30;
	            } else if (month == 2 && this.isLeapYear(year)) {
	                dayNum = 29;
	            } else {
	                dayNum = 28;
	            }
	            //3.3获得 1号对应的是星期几
            	//3.3.1.将当月1号赋值给日期变量
	            oDate.setFullYear(year);
	            //注意 js日期的月份是从0 开始计算
	            oDate.setMonth(month - 1);
	            oDate.setDate(1);

	            //3.3.2.计算1号在第一行日期容器中的位置，依次给日期容器填充内容
	            //注意 js中 getDay方法是获取当前日期是星期几
	            var week = oDate.getDay();
	            for(var i=0;i<week;i++){
	            	var obj = {
	            		key:i,
	            		value:'-'
	            	}
	            	this.dataList.push(obj);
	            }
	            for(var i=1;i<=dayNum;i++){
	            	var obj = {
	            		key:(week-1)+i
	            	}
	            	this.checkInList.forEach(item=>{
	            		var temp = new Date(item.date);
	            		var day = temp.getDate();
	            		if(day == i){
	            			obj.signin = true;
	            		}
	            	});
	            	if(i<10){
	            		obj.value = '0'+i;
	            		this.dataList.push(obj);
	            	}else{
	            		obj.value = ''+i;
	            		this.dataList.push(obj);
	            	}

	            }
			},
			//判断是否是闰年
	     	isLeapYear(year) {
		        if (year % 100 == 0 && year % 400 == 0) {
		            return true;
		        } else if (year % 100 != 0 && year % 4 == 0) {
		            return true;
		        } else {
		            return false;
		        }
	    	},
	    	getCheckin(){
	    		//获取当前日期
			    var oDate = new Date(this.currenttime);
			    //获取当年 年
			    var year = oDate.getFullYear();
			    //获取当前 月
			    var month = oDate.getMonth() + 1;
			    if(month < 10){
			    	month = '0'+month;
			    }
			    var date = year +'-'+ month
			    var that = this;
	    		SigninApi.getCheckinList(date).then(response =>{
	    			let data = response.data;
	    			that.checkInList = data;
	    			that.showDate();
	    		}).catch(error => {

	    		});
	    	},
	    	checkIn(val){
	    		var that = this;
	    		if(this.isSignin){
	    			this.$toast.center('今日已签到。','center');
	    			return;
	    		}
	    		if(this.date !== val){
	    			this.$toast.center('只能选择今天的日期签到。','center');
	    			return;
	    		}
	    		if(this.isLoading)return;
	    		this.isLoading = true
	    		SigninApi.checkIn().then(response =>{
	    			that.$toast.center('签到成功。','center');
	    			that.isLoading = false;
	    			that.$root.eventHub.$emit("signinEvent",true);
	    			that.$root.eventHub.$emit("signinSuccessEvent");
	    		}).catch(error => {
	    			that.isLoading = false;
	    		});
	    	}
    },
     beforeDestroy() {
      this.$root.eventHub.$off('showSigninModelEvent',{

      })
      this.$root.eventHub.$off('closeSigninModelEvent',{

      })
    }

	}
</script>
