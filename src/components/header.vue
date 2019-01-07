<template>
	<div class="header-context">
		<div class="header">
			<div class="header-left">
				<div class="logo">
					<img :src="logoUrl">
				</div>
				<div class="nav">
					<a href="/static/tools/chatroom.url" download="" class="btn active"><i><font-awesome-icon icon="desktop"/></i>保存到桌面</a>
					<a @click.prevent="addFavor()" target="_blank" class="btn"><i><font-awesome-icon :icon="['far','star']"/></i>收藏</a>
					<Poptip trigger="hover" placement="bottom-start" transfer>
						<a href="javascript:void(0)" class="btn"><i style="font-size:18px;vertical-align: middle;"><font-awesome-icon icon="mobile-alt"/></i>手机聊天室</a>
						<div slot="content">
							<div style="padding: 2px; text-align: center;">
								<img width="140px" src="/static/images/1545640392.png" >
                <img width="140px"  src="/static/images/1545640595.png" >
							</div>
               <div style="text-align: center;">
                  手机扫一扫
               </div>
						</div>
					</Poptip>
					<a class="btn" target="_blank" href="https://kjzb.com/dns"><Icon style=" font-size: 18px" type="md-cloud-circle" />防劫持教程</a>
					<!-- <a :href="chatUrl" target="_blank" class="btn txt"><i><font-awesome-icon icon="headphones"/></i>在线客服</a> -->
				</div>
			</div>
			<div class="header-right">
        <a href="javascript:void(0)" class="toggle-skins"  icon="md-text" @click="overShow">
          <Icon type="ios-notifications-outline" size="26"></Icon>
          	 <Badge :count="messagenub">

             </Badge>
           <i><font-awesome-icon icon="caret-down"/></i>
				</a>
				<a href="javascript:void(0)" class="toggle-skin" @click="skinOpen">
					<i>
						<font-awesome-icon icon="paint-brush"/></i>换肤
					<i><font-awesome-icon icon="caret-down"/></i>
				</a>
				<template v-if="loginEnd">
					<template v-if="isLogin">
						<a @click="showUserInfoCard" href="javascript:void(0)" class="userinfo">
							<img :src="imgUrl+'images/avatar/'+userInfo.headimage" class="userimg">
							{{userInfo.nickname}}<i><font-awesome-icon icon="caret-down"/></i>
						</a>
						<a href="javascript:void(0)" class="userlogout" @click="LoginOut"><i><font-awesome-icon icon="sign-out-alt"/></i>退出</a>
					</template>
					<template v-else>
						<a href="javascript:void(0)" class="userlogin"><img :src="imgUrl+'images/201709080109531642.png'" border="0" style="width:20px; height:20px;vertical-align: middle;"> 游客</a>
						<a href="javascript:void(0)" class="reg" @click="registClick">注册</a>
						<a href="javascript:void(0)"  class="login" @click="LoginClick">登录</a>
					</template>
				</template>

			</div>
		</div>
		<Modal
		width="430"
		class="info-card"
		:footer-hide="true"
		v-model="showUserInfoes">
			<div class="info-card-head">
				<img :src="imgUrl+'images/avatar/'+userInfo.headimage" alt="">
				<h1>{{userInfo.nickname?userInfo.nickname:'未设置'}}
					<p>{{userInfo.username}}</p>
					<p style="width: 300px;height: 20px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;font-size: 13px; color: #d2d2d2; text-shadow: none;-webkit-box-reflect: below 0 -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,.3));">{{userInfo.selfIntroduction?userInfo.selfIntroduction:'这人很懒，什么也没留下。'}}</p>
					<!-- <img
					class="spe-img"
					src="/static/images/lottery-logo/gold.png" alt=""> -->
					<!-- <p class="spe-p">{{userInfo.gold?userInfo.gold:0}}</p> -->
				</h1>
			</div>
		    <Tabs v-model="tabName" >
				<TabPane label="用户资料" name="name1">
					<div class="info-body">
						<ul>
              <li>
								<p>余额：</p><p style="color: #666">{{balance}}元</p><span class="zhuanzhang" @click ="transfer">转账到平台</span>
							</li>
							<li>
								<p>用户性别：</p><p style="color: #666">{{whatTheGender(userInfo.gender)}}</p>
							</li>
							<li>
								<p>登录次数：</p><p style="color: #666">{{userInfo.loginCount}}</p>
							</li>
							<li>
								<p>注册时间：</p><p style="color: #666">{{userInfo.createTime}}</p>
							</li>
							<li>
								<p>用户组：</p><p style="color: #666">{{userInfo.userFlag === 1?'普通用户注册组':'管理员用户组'}}</p>
							</li>
						</ul>
					</div>
				</TabPane>
				<TabPane label="编辑资料" name="name2">
					<div class="info-body">
						<ul>
							<li class="no-border">
								<p class="high-line">用户昵称：</p>
								<Input
								@on-change="varifyNickName"
								class="input-wid" v-model="userInfo.nickname"/>
							</li>
							<li class="no-border">
								<p class="high-line">选择性别：</p>
								<Select v-model="userInfo.gender" style="width:300px">
									<Option v-for="item in selectData" :value="item.val" :key="item.text">{{ item.text }}</Option>
								</Select>
							</li>
							<li class="no-border">
								<p class="high-line">平台账号：</p>
								<Input class="input-wid" v-model="userInfo.platformAccount" :disabled="binded" :placeholder="message" ref="bind" autocomplete="off" >
                <span slot="append" class="bangding" @click ="bind" v-if="!binded" style="">绑定</span>
                <span slot="append" class="modifystatus" v-if="binded">修改请联系客服</span>
                </Input>
							</li>
							<li class="no-border" >
								<p class="high-line">自我介绍：</p>
								<Input style="width: 300px; height: 130px;" :rows="5" v-model="userInfo.selfIntroduction" type="textarea"/>
							</li>
							<li style="border: none; justify-content: flex-end" >
								<Button
								@click="hideUserInfoCard"
								 style="margin-right: 22px;" type="default">取消</Button>
								<Button
								@click="submitNewInfo"
								style="margin-right: 42px;" type="primary">保存</Button>
							</li>
						</ul>
					</div>
				</TabPane>
				<TabPane label="修改头像" name="name3">
					<div class="info-body">
						<ul style=" position: relative;">
							<li class="no-border" style="padding-left: 30px; padding-bottom: 50px; overflow-y: auto;">
								<img
								:class="{'on-ok': userInfo.headimage === item+'.gif'}"
								v-for="(item, index) in 40"
								@click="changeAvatar(item)"
								:key="index"
								:src="imgUrl+'images/avatar/'+item+'.png'" alt="">
							</li>
								<div class="spe-bar">
									<Button
									@click="hideUserInfoCard"
									 style="margin-right: 22px;" type="default">取消</Button>
									<Button
									@click="submitNewInfo"
									style="margin-right: 42px;" type="primary">保存</Button>
								</div>
						</ul>
					</div>
				</TabPane>
				<TabPane label="修改密码" name="name4">
					<div class="info-body">
						<ul>
							<li style="border: none">
								<p style="line-height: 34px; margin-right: 26px;">旧密码：</p>
								<Input type="password" style="width: 160px;" v-model="changeUserPwd.password"/>
							</li>
							<li style="border: none">
								<p style="line-height: 34px; margin-right: 26px;">新密码：</p>
								<Input type="password" style="width: 160px;" v-model="changeUserPwd.newPassword"/>
							</li>
							<li style="border: none">
								<p class="high-line">重复新密码：</p>
								<Input type="password" style="width: 160px;" v-model="reChangeUserPwd"/>
							</li>

							<li style="border: none; margin-top: 140px; justify-content: flex-end" >
								<Button
								@click="hideUserInfoCard"
								style="margin-right: 22px;" type="default">取消</Button>
								<Button @click="submitNewPwd" style="margin-right: 42px;" type="primary">保存</Button>
							</li>
						</ul>
					</div>
				</TabPane>
			</Tabs>
		</Modal>
		<Modal style="background: #000;" v-model="showLoginModel" class="loginModal" width='400px'>
			<div class="modal-content rel">
				<div class="modal-logo">
	            	<span class="logo-span"></span>
	          	</div>
	          	<div class="rel">
		            <div class="myLine"></div>
		            <div class="txt1">账号密码登录</div>
		        </div>
		        <div class="modal-c mt40">
		        	<Form :model="loginForm">
		        		<FormItem class="username">
		        			<Input type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入会员账号">
		        				<Icon type="md-person" size="20" color="#fff" slot="prefix" />
		        			</Input>
		        		</FormItem>
		        		<FormItem>
		        			<Input type="password" v-model="loginForm.password" autoComplete="on" placeholder="请输入登录密码">
		        				<Icon type="md-lock" slot="prefix" size="20" color="#fff"/>
		        			</Input>
		        		</FormItem>
		        		<div>
			            	<OpenError :isShow="showLoginError">{{showLoginErrorTxt}}</OpenError>
			            </div>
		        		<FormItem class="mb20">
		        			<Button class="btn" style="width:100%;" type="primary" :loading="loginLoading" @click="login" :disabled="!showLoginBtn">立即登录</Button>
		        		</FormItem>
		        	</Form>
		        	<div>
	              		如您没有账户?<span class="txta" @click="goToRegist">点击注册>></span><a :href="chatUrl" class="f-right txta" target="_blank">忘记密码?</a>
	            	</div>
		        </div>
			</div>
			<div slot="footer">
				登录时有任何问题，请<a :href="chatUrl" class="txta" target="_blank">联系</a>我们24小时在线客服协助解决，本网站采用Global Trust最先进的128/256 bit SSL服务器加密机制
			</div>
		</Modal>
		<Modal
		:footer-hide="true"
		v-model="showRegistModel" class="loginModal" width='400px'>
			<div class="modal-content rel">
				<div class="modal-logo">
	            	<span class="logo-span"></span>
	          	</div>
	          	<div class="rel">
		            <div class="myLine"></div>
		            <div class="txt1">会员账号注册</div>
		        </div>
		        <div class="modal-c mt40">
		        	<Form :model="registForm">
		        		<FormItem class="username">
		        			<Input type="text"
								v-model="registForm.username"
								autoComplete="on"
								placeholder="请输入账号名称">
		        				<Icon type="md-person" size="20" color="#fff" slot="prefix" />
		        			</Input>
		        		</FormItem>
		        		<FormItem>
		        			<Input
								type="password"
								v-model="registForm.password"
								autoComplete="on"
								placeholder="请输入登录密码">
		        				<Icon type="md-lock" slot="prefix" size="20" color="#fff"/>
		        			</Input>
		        		</FormItem>
						<FormItem>
		        			<Input
								type="password"
								v-model="rePassword"
								autoComplete="on"
								placeholder="请确认登录密码">
		        				<Icon type="md-lock" slot="prefix" size="20" color="#fff"/>
		        			</Input>
		        		</FormItem>
                  	<FormItem>
		        			<Input
								type="text"
								v-model="registForm.invitationcode"
								autoComplete="on"
								placeholder="输入邀请码(必填)">
		        				<Icon type="md-mail" slot="prefix" size="20" color="#fff"/>
		        			</Input>
		        		</FormItem>
						<FormItem>
		        			<Input
								type="text"
								v-model="registForm.platAccount"
								autoComplete="on"
								placeholder="输入平台账号,以便领取红包(非必填)">
		        				<Icon type="md-mail" slot="prefix" size="20" color="#fff"/>
		        			</Input>
		        		</FormItem>


						<FormItem>
							<div style="display: flex">
								<Input
									style="width: 50%"
									type="text"
									v-model="registForm.vcode"
									autoComplete="on"
									placeholder="请输入验证码">
									<Icon type="md-phone-portrait" slot="prefix" size="20" color="#fff"/>
								</Input>
								<div @click="changeCode" class="random-code">
									<img :src="'data:img/png;base64,'+base64Img" alt="">
								</div>
							</div>
		        		</FormItem>
		        		<div>
			            	<OpenError :isShow="showLoginError">{{showLoginErrorTxt}}</OpenError>
			            </div>
		        		<FormItem class="mb20">
		        			<Button class="btn"
								style="width:100%;"
								type="primary"
								:loading="registLoading"
								@click="regist"
								:disabled="!showRegistBtn">立即注册</Button>
		        		</FormItem>
		        	</Form>
		        	<div>
	              		已经拥有账户?<span class="txta" @click="goToLogin">点击登录>></span>
	            	</div>
		        </div>
			</div>
			<!-- <div slot="footer">
				注册时有任何问题，请<a :href="chatUrl" class="txta" target="_blank">联系</a>我们24小时在线客服协助解决，本网站采用Global Trust最先进的128/256 bit SSL服务器加密机制
			</div> -->
		</Modal>
		<Modal title="背景图切换" v-model="skinModel" class="skin-model" footer-hide width='603px' style="height: 800px">
			<ul class="skin-list">
				<li @click="skinClick('skin01')">
					<img :src="imgUrl+'images/skin/img-bg1.jpg'">
				</li>
				<li @click="skinClick('skin02')">
					<img :src="imgUrl+'images/skin/img-bg2.jpg'">
				</li>
				<li @click="skinClick('skin03')">
					<img :src="imgUrl+'images/skin/img-bg3.jpg'">
				</li>
				<li @click="skinClick('skin04')">
					<img :src="imgUrl+'images/skin/img-bg4.jpg'">
				</li>
				<li @click="skinClick('skin05')">
					<img :src="imgUrl+'images/skin/img-bg5.jpg'">
				</li>
				<li @click="skinClick('skin06')">
					<img :src="imgUrl+'images/skin/img-bg6.jpg'">
				</li>
				<li @click="skinClick('skin07')">
					<img :src="imgUrl+'images/skin/img-bg7.jpg'">
				</li>
				<li @click="skinClick('skin08')">
					<img :src="imgUrl+'images/skin/img-bg8.jpg'">
				</li>
				<li @click="skinClick('skin09')">
					<img :src="imgUrl+'images/skin/img-bg9.jpg'">
				</li>
				<li @click="skinClick('skin10')">
					<img :src="imgUrl+'images/skin/img-bg10.jpg'">
				</li>
				<li @click="skinClick('skin11')">
					<img :src="imgUrl+'images/skin/img-bg11.jpg'">
				</li>
			</ul>
		</Modal>
	</div>
</template>
<script>
  import RedEnvelope from '@/api/redenvelope'
	import '@/assets/css/scrollbar.less'
	import '@/assets/css/header.less'
	import {Modal} from 'iview'
	import OpenError from '@/components/openError'
	import Constants from '@/utils/constants'
	import Util from '@/utils/util'
	import Login from '@/api/login'
	import Regist from '@/api/regist'
	import changeInfo from '@/api/userinfo';
	import Cookie from '@/utils/auth'
	import md5 from '@/utils/md5Utils'
  import resource from '@/utils/cargo'
  import setChat from '@/utils/setChat'
  import setChatInfo from '@/utils/setChatInfo'
	export default{
		name: "HeaderComponent",
		props: ['active',"level"],
		components:{
			OpenError,
		},
		data() {
			return {
        message: "",
        binded: false,
        tabName: "name1",
        balance: 0,
        isTransfer: false,
        // logoUrl  '../../static/'
				logoUrl:  resource.tctx.logoUrl,
				chatUrl: Constants.chatUrl,
				imgUrl: Constants.staticUrl,
				isLogin: false,
				showLoginModel: false,
				showRegistModel: false,
				showUserInfo: false,
        loginEnd: false,
        messagenub: 0,
				loginForm:{
					username: '',
          password: '',
         website: Constants.ipAdd,
				},
				selectData: [
					{
						text: '保密',
						val: 0
					},
					{
						text: '男',
						val: 1
					},
					{
						text: '女',
						val: 2
					}
				],
				imgIndex: '1',
				changeUserPwd: {
					password: '',
					newPassword: ''
				},
				reChangeUserPwd: '',
				registForm: {
					username: '',
					password: '',
          platformAccount: '',
          invitationcode: '',
          website: Constants.ipAdd,
					vcode: ''
				},
				base64Img: '',
				rePassword: '',
				userInfo: {},
				loginLoading: false,
				registLoading: false,
				showLoginError: false,
				showLoginErrorTxt: '',
				showRegistError: false,
				showRegistErrorTxt: '',
				skinModel: false,
			}
		},
		watch:{
    },
		mounted(){
      var that = this;
      //登录 刷新验证码
       this.$root.eventHub.$on("showMyInfo",()=> {
            this.showUserInfoCard();
		    });
      this.$root.eventHub.$on("messageComEvent",item=> {
          this.messagenubs(item);
		    });
        //监this.$root.eventHub.$on来监听showLoginModelEvent事件
			this.$root.eventHub.$on("showLoginModelEvent",item=> {
		      that.showLoginModel = true;
		    });
			this.$nextTick(()=> {
				this.getUserInfo();
      });
      setChat.clearAllData();
      setChatInfo.clearChatInfo();
		},
		computed:{
			showUserInfoes: {
				get() {
          this.showBalance();
          this.tabName = "name1";
					return this.$store.state.showInfo
				},
				set(val) {
					// console.log(val);
					this.$store.commit('SET_INFO', val);
					// this.showUserInfo = val;
				}
			},
			showLoginBtn(){
				return !!this.loginForm.username.trim()&&!!this.loginForm.password.trim()
			},
			showRegistBtn() {
				return !!(this.registForm.username.trim()&&this.registForm.password.trim()&&this.rePassword.trim())
      }
		},
		methods:{
      //收藏
       showBalance() {

      },
      // 转账到平台
      transfer() {
        if (this.isTransfer) {
          return
        }
        this.isTransfer = true;
        var that = this;
        if ( !this.binded) {
            let config = {
              title:"<span style='color:red;'>提示</span>",
              content: "你的账号未绑定平台，暂不能转账。",
              okText: "去绑定",
              onOk() {
                let set = new Promise(function(resolve,reject) {
                    that.tabName = "name2";
                    that.message = "请输入平台账号并点击右侧绑定按钮绑定";
                    resolve();
                })
                set.then(() => {
                    that.$toast.center('账号一经绑定请联系客服修改','center');
                    setTimeout(() => {
                        that.$refs.bind.focus();
                   }, 500);
                })
              }
            }
            this.$Modal.confirm(config);
            this.isTransfer = false;
        } else {
            this.$store.commit('SET_INFO', false);
            this.$root.eventHub.$emit('transfermoney',3);
            this.isTransfer = false;
        }

      },
      bind() {
          var patt =/^[a-zA-Z0-9]{6,10}$/;
          if(patt.test(this.userInfo.platformAccount))
           {
              changeInfo.subInfo({
                  platformAccount: this.userInfo.platformAccount
              }).then( res => {
                  this.$toast.center('你已经成功绑定平台账号:'+this.userInfo.platformAccount,'center');
                  this.binded = true;
                  this.userInfo.headImage = this.imgIndex;
              })
          }
      },
      messagenubs(item) {
          this.messagenub +=item
      },
			 addFavor() {
				let url = window.location.href;
				let title = document.title;
				let ua = navigator.userAgent.toLowerCase();
				if(ua.indexOf("msie 8")>-1){
					external.AddToFavoritesBar(url,title,'');//IE8
				}else{
					try {
						window.external.addFavorite(url, title);
					} catch(e) {
						try {
							window.sidebar.addPanel(title, url, "");//firefox
						} catch(e) {
							Modal.error({
								title: '错误提示',
								content: '您的浏览器不支持一键收藏，请按Ctrl+D收藏本网站'
							})
						}
					}
				}
      },
      //名字
			varifyNickName() {
				if(this.userInfo.nickname.trim().length >12) {
					this.userInfo.nickname = this.userInfo.nickname.trim().slice(0,12);
					return false
				}
      },
      //验证码
			changeCode() {
				Regist.getRegistCode().then(
					res => {
						this.base64Img = res.data;
					}
				)
			},
			goToLogin() {
				this.showLoginError = false;
				this.showLoginErrorTxt = '';
				this.showRegistModel = false;
				this.showLoginModel = true;
      },
			goToRegist() {
				this.showLoginError = false;
				this.showLoginErrorTxt = '';
				this.showRegistModel = true;
        this.showLoginModel = false;
        this.changeCode() ;
      },
      //修改密码
			submitNewPwd() {
				if(this.changeUserPwd.password.trim() === '') {
					this.$Message.error('密码输入不能为空！');
					return false
				}
				if(this.changeUserPwd.newPassword.trim() === '') {
					this.$Message.error('新密码密码输入不能为空！');
					return false
				}
				if(this.changeUserPwd.newPassword.trim().length <6) {
					this.$Message.error('新密码密码长度不能小于6位！');
					return false
				}
				if(this.reChangeUserPwd.trim() === '') {
					this.$Message.error('重复密码输入不能为空！');
					return false
				}
				if(this.changeUserPwd.newPassword.trim() !== this.reChangeUserPwd.trim()) {
					this.$Message.error('两次密码输入不一致，请检查！');
					return false
        }
        // else {
        //   this.reChangeUserPwd = md5.makeMd5(this.reChangeUserPwd)
        // }
        let updataPwd = md5.makeMd5(this.reChangeUserPwd)
				changeInfo.subPwd({
					password: md5.makeMd5(this.changeUserPwd.password),
					newPassword: updataPwd
				}).then(
					res => {
						this.$Message.success('修改成功！');
						this.showUserInfo = false;
					}
				)
      },
    //修改用户信息
			submitNewInfo() {
				let emojiReg = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/;
				for(let i in this.userInfo) {
					if(emojiReg.test(this.userInfo[i])) {
						this.$Modal.error({
							title: '温馨提示',
							content: '暂时不支持emoji表情'
						})
						return false
					}
				}
				changeInfo.subInfo({
					nickname: this.userInfo.nickname,
					selfIntroduction: this.userInfo.selfIntroduction,
					headImage: this.userInfo.headimage,
					gender: this.userInfo.gender
				}).then(
					res => {
						this.$store.commit('SET_INFO', false);
						this.userInfo.headImage = this.imgIndex;
					}
				)
      },
      //换头像
			changeAvatar(index) {
				this.userInfo.headimage = index+'.png';
      },
      //用户性别
			whatTheGender(data) {
				if(data === 0) {
					return '保密'
				} else if(data === 1) {
					return '男'
				} else {
					return '女'
				}
      },
      //显示用户信息卡 commit 承诺
			showUserInfoCard() {
        this.$store.commit('SET_INFO', true);
          RedEnvelope.getBalance().then(response =>{
          let data = response.data;
          this.balance = data.money;
				}).catch(error =>{
				})
      },
      //用户信息卡设置状态为false
			hideUserInfoCard() {
				this.$store.commit('SET_INFO', false);
      },
      //打开换肤窗口
			skinOpen(){
				this.skinModel = true;
      },
      //换肤
			skinClick(val){
				this.$root.eventHub.$emit("changeBackdropEvent",val);
				this.skinModel = false;
      },
      //登录前验证
			LoginClick(){
        this.showLoginModel = true;
        this.$emit('son_method');
      },
      //注册前验证
			registClick() {
				Regist.getRegistCode().then(
					res => {
						this.base64Img = res.data;
					}
				)
				this.showRegistModel = true;
      },
      //注册
			regist() {

				let that = this;
				if(this.loginLoading){
					return;
        }
        if(!this.registForm.username.trim()){
					this.showLoginError = true;
					this.showLoginErrorTxt = '请输入您的会员账号';
					return;
				}
				if(!this.registForm.username.trim().length >10){
					this.showLoginError = true;
					this.showLoginErrorTxt = '会员账号5-10位';
					return;
        }

				if(!this.registForm.password.trim()){
					this.showLoginError = true;
					this.showLoginErrorTxt = '请输入您的账户密码。';
					return;
				}
				if(!this.rePassword.trim()){
					this.showLoginError = true;
					this.showLoginErrorTxt = '请确认您的账户密码。';
					return;
				}
				if(!this.registForm.vcode.trim()){
					this.showLoginError = true;
					this.showLoginErrorTxt = '请输入验证码。';
					return;
				}
				if(this.registForm.password.trim().length <6 || this.registForm.password.trim().length >20){
					this.showLoginError = true;
					this.showLoginErrorTxt = '密码长度6-20位。';
					return;
				}
				if(this.registForm.password.trim() !== this.rePassword.trim()) {
					this.showLoginError = true;
					this.showLoginErrorTxt = '两次输入密码不一致，请检查。';
					return;
        }
        // else {
        //   this.registForm.password = md5.makeMd5(this.registForm.password)
        //   this.rePassword = md5.makeMd5(this.rePassword)
        // }
				this.registLoading = true;
				this.showRegistError = false;
        this.showLoginErrorTxt = '';
        let md5_registPassword = md5.makeMd5(this.registForm.password)
				Regist.registUser(
					Util.makeJson(
            {
              username: this.registForm.username,
							password: md5_registPassword,
              website:  this.registForm.website,
              platformAccount: this.registForm.platformAccount,
              invitationcode: this.registForm.invitationcode,
					    vcode:this.registForm.vcode
            }
          )
				).then(
					res => {
						let result = res.data;
						this.showRegistModel = false;
						Util.setStorage('chatUsername', this.registForm.username);
            Util.setStorage('chatPassword', md5.makeMd5(this.registForm.password));
						Login.loginUser({
							username: this.registForm.username,
              password: md5_registPassword,
              website:  this.registForm.website
						}).then(
							response => {
								let data = response.data;
                that.isLogin = Constants.isLogin = true;
                Cookie.SetExpireTime(data.expire);
                	Cookie.SetStorageToken(data.token);
								Cookie.setToken(data.token);
								if(typeof callback ==="function"){
									callback();
								}
								const userdata = {
									userid:data.user.userId,
									username: data.user.username,
									nickname: data.user.nickname,
									userflag:data.user.userFlag,
									headimage:data.user.headImage,
									userdegree:data.user.userDegree,
									gender: data.user.gender,
									loginCount: data.user.loginCount,
									createTime: data.user.createTime,
									userFlag: data.user.userFlag,
									selfIntroduction: data.user.selfIntroduction,
									gold: data.user.gold,
									platformAccount: data.user.platformAccount,
								}
								that.userInfo = userdata;
								if(that.$store){
                  that.$store.commit("SET_USER_INFO",userdata);
                  that.$store.commit("UPDATE_LOGINSTATUS",true);

								}
								that.$root.eventHub.$emit("onLiveChatEvent",that.userInfo);
							}
						)
					}
				).catch(
					err => {
						this.registLoading = false;
					}
				)
      },
      //登录
			login(callback){
				var that = this;
				if(this.loginLoading){
					return;
				}
				if(!this.loginForm.username.trim()){
					this.showLoginError = true;
					this.showLoginErrorTxt = '请输入您的会员账号';
					return;
				}
				if(!this.loginForm.password.trim()){
					this.showLoginError = true;
					this.showLoginErrorTxt = '请输入您的账户登录密码。';
					return;
        }
				this.loginLoading = true;
				this.showLoginError = false;
        this.showLoginErrorTxt = '';
        let  md5_loginPassword =md5.makeMd5(this.loginForm.password)
				Login.loginUser(
          {
            	username: this.loginForm.username,
              password: md5_loginPassword,
              website:  this.loginForm.website

          }
          ).then(response =>{
					const data = response.data;
					that.loginLoading = false;
					that.showLoginModel = false;
					that.isLogin = Constants.isLogin = true;
          this.$store.commit('SET_TOKEN', data.token);
          	Cookie.SetStorageToken(data.token);
					Cookie.setToken(data.token);
					if(typeof callback ==="function"){
    					callback();
    				}
    				const userdata = {
						userid:data.user.userId,
						username: data.user.username,
						nickname: data.user.nickname,
	    		 		userflag:data.user.userFlag,
	    		 		headimage:Util.isNull(data.user.headImage)?'default.gif':data.user.headImage,
						userdegree:data.user.userDegree,
						gender: data.user.gender,
						loginCount: data.user.loginCount,
						createTime: data.user.createTime,
						userFlag: data.user.userFlag,
						selfIntroduction: data.user.selfIntroduction,
						gold: data.user.gold,
						platformAccount: data.user.platformAccount,
					}
					that.userInfo = userdata;
    				if(that.$store){
    					that.$store.commit("SET_USER_INFO",userdata);
              that.$store.commit("SET_TOKEN",data.token);
              that.$store.commit("UPDATE_LOGINSTATUS",true);


    				}
    				that.$root.eventHub.$emit("onLiveChatEvent",that.userInfo);
    				//登录成功断开连接，重新初始化
    				// that.$root.disconnect();
    				// setTimeout(()=>{
    				// 	that.$root.InitSocket();
    				// },100);
				}).catch(error =>{
					that.loginLoading = false;
					that.showLoginError = true;
          that.showLoginErrorTxt = error.msg;


				});
      },
      //获取用户信息
			getUserInfo(){
				var that = this;
				Login.getInfo().then(response =>{
					const data = response.data;
					this.isLogin = Constants.isLogin = true;
					that.loginEnd = true;
    				const userdata = {
						userid:data.userId,
						username: data.username,
						nickname: data.nickname,
	    		 	userflag:data.userFlag,
	    		 	headimage:Util.isNull(data.headImage)?'default.gif':data.headImage,
						userdegree:data.userDegree,
						gender: data.gender,
						loginCount: data.loginCount,
						createTime: data.createTime,
						userFlag: data.userFlag,
						selfIntroduction: data.selfIntroduction,
						gold: data.gold,
						platformAccount: data.platformAccount,
					}
					that.userInfo = userdata;
					if(that.$store){
              that.$store.commit("SET_USER_INFO",userdata);
              that.$store.commit("MESSAGE_NUB",'0');
            }
          if (that.$store.state.userInfo.platformAccount !=='' && that.$store.state.userInfo.platformAccount !== undefined &&
              that.$store.state.userInfo.platformAccount !== null) {
              that.binded = true;
      }
    				that.$root.eventHub.$emit("onLiveChatEvent",this.$store.state.userInfo);
					that.$root.InitSocket();
				}).catch(error =>{
           window.location.reload();
				});

      },
      //登出
			LoginOut(){
				Login.logout().then(response =>{
        //刷新页面  把login 状态改成false
          this.$store.commit("UPDATE_LOGINSTATUS",false);
          Cookie.removeToken();
          this.$root.isSocketConnect = false;
          setTimeout(()=>{
           window.location.reload();
          },1000)

          // setTimeout(()=>{
          //    this.$router.push('/login') ;
          //
          // },1000)
				}).catch(error =>{

				});
      },
      //私聊显示隐藏
      overShow() {
        this.messagenub = 0 ;
        //打开最新消息的id
        if(this.$store.state.newfromid){
           this.$root.eventHub.$emit("showChatListChatEvent",this.$store.state.newfromid);
        }else if(this.$store.state.newfromid ==undefined) {
          this.$root.eventHub.$emit("showChatListChatEvent",'');
        }

      },
      outHide() {
        this.$root.eventHub.$emit("hideChatListEvent");
      },
    },
     beforeDestroy() {
      this.$root.eventHub.$off('showMyInfo',{

      })
      this.$root.eventHub.$off('messageComEvent',{

      })
      this.$root.eventHub.$off('showLoginModelEvent',{

      })
    }
	}
</script>

