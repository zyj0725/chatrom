<template>
	<div id="privateChatList"  style="z-index:9999;" v-show="ShowprivateChatList">

    <Row class="header">

						<i-switch
							v-model="switchers"
							size="small"
              style="padding:0;margin:0 0 0 30px "
              >
							<span style="font-size: 12px;position: absolute;left: -7px;" slot="open"></span>
							<span style="font-size: 12px;position: absolute;left: -8px;" slot="close"></span>
						</i-switch>
							只看管理员
              <Button type="text" class="btns" style="float :right;padding:0;margin:0 30px 0 0  "  @click="CloseChat()" icon="md-close" size ="large" ></Button>
         <!-- <Button type="text" class="btns" style="float :right;padding:0;margin:0 30px 0 0 "  @click="privateChatListClose()"  icon="ios-browsers-outline " size ="large"  ></Button>
          <Button type="text" class="btns" style="float :right;padding:0;margin:0 30px 0 0  "  @click="privateChatListOpen()" icon="md-remove" size ="large" ></Button> -->

    </Row>


		<div style="height:1300px">
			<!-- <div class="OnlineUser_Find">
				<Input search placeholder="我要找人(区分大小写)" v-model="searchtxt" @on-search="search"/>
			</div> -->
			<el-scrollbar id="onlineScroll" :native="false" :wrap-style="'max-height: 800px;'" style="min-height:800px ;">
				<div class="privateChatUser" style=" ">
					<ul>
        <template v-if="isSearch &&switchers" >

							<li v-for="item in userDegree" @contextmenu.prevent="openMenu(item,$event)" @click.prevent="openPrivateChat(item,$event,item.userid)" :key="item.userid">
								<a href="javascript:;"  v-if="item.flag == 2">
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+'kefu_logo.png'" style="width:50px ;" align="top" v-if="item.flag == 2">
											<div slot="content">
													<Grade grade="customer" v-if="item.flag == 2"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+'kefu.png'" border="0" class="head" style="width:30px ;"  v-if="item.flag == 2">
									</span>
									<span class="unick">{{item.nickname}}</span>
                  <Badge :count="999" :overflow-count="overflow-count" v-if="item.neversee>0">
                      <a href="#" class="demo-badge"></a>
                  </Badge>
                  <span class="chat-time">{{item.time|dateFormat('hh:mm:ss')}}</span>

								</a>
							</li>
				</template>
				<template v-if="isSearch&&!switchers ">
              <li v-for="item in userDegree" @click.prevent="openPrivateChat(item,$event,item.userid)" :key="(item.userid)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+'kefu_logo.png'" style="width:50px ;" align="top" v-if="item.flag == 2">
                      <img :src="imgUrl+'images/grade/'+(item.degree)+'.png'" style="width:50px ;" align="top" v-if="item.flag == 1 ||item.flag ==3">
											<div slot="content">
												<Grade grade="customer" v-if="item.flag == 2"></Grade>
                        <Grade :grade="item.degree" v-if="item.flag == 1 ||item.flag ==3"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
											<img :src="imgUrl+'images/avatar/'+'kefu.png'" border="0" class="head" style="width:30px ;"  v-if="item.flag == 2">
                    <img :src="imgUrl+'images/avatar/'+item.avatar" style="width:30px ;" align="top" v-if="item.flag == 1 ||item.flag ==3">
									</span>
									<span class="unick">{{item.nickname}}</span>
                  <Badge :count="999" :overflow-count="item.neversee" v-if="item.neversee>0">
                      <a href="#" class="demo-badge"></a>
                    </Badge>
                  <span class="chat-time">{{item.time|dateFormat('hh:mm:ss')}}</span>

								</a>
							</li>
				</template>

						<!-- 自己是接收人 -->
					</ul>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>
<script>
  import '@/assets/css/privatechatlist.less'
	import Constants from '@/utils/constants'
	import Grade from '@/components/grade'
	import User from '@/api/user'
  import Util from '@/utils/util'
  import setChat from '@/utils/setChat'
  import setChatInfo from '@/utils/setChatInfo'
  import Auth from '@/utils/auth'
  import UserInfo from '@/api/userinfo'
	export default{
		components:{Grade},
		data(){
			return {
				genders: {
					1: '男',
					2: '女',
					0: '保密'
        },
        tipsNum: [],
        chatlist: [],
        lastavatar: [],
        lastnickname: [],
        lasttime: [],
        lastmsg: [],
        userInfo: {},
        userId: '',
        //'../../static/',
        switchers: false,
        times:'09-06',
        overflowcount:0,
        ShowprivateChatList: false,
				chatUrl:Constants.chatUrl,
        imgUrl:Constants.staticUrl,
        chatId:Constants.chatId,
        myChatId:'',
				tabNav:'online',
				userInfo:null,
				visible:false,
        isMe:false,
				top: 0,
      	left: 0,
      	selectedMenu:{},
      	UserCount:0,
      	searchtxt:null,
      	redRuleModal:false,
      	signinRuleModal:false,
				manageList:[

        ],
        //用户聊天记录
        ChatList:[

        ],
        //聊天列表
        ChatInfoList:[],
        privateChatList:[

        ],
				OnLineUserList:[

        ],
        privateUserList:[

        ],
				tempOnLineUserList:[],
				numbersInfo: {},
				isNumbersInfo: false,
        isPreventChat: false,
        notMeToList:{},
				userDegree: [],
				searchList: [],
        isSearch: true,
        seeChat :{},
			}
		},
		watch:{
			searchtxt(val) {
				if(val === '') {
					this.isSearch = true
				}
			},
    },



		beforeCreate(){

    },

		mounted() {
      //  this.getPrivateChatList();
      //接收自己发送的消息保存到list


		},
		computed:{
			nowFlog() {
				return this.$store.state.userInfo.userflag - 0;
			}
		},
		methods:{
      //用户下线
      //用户分组
    },


	}
</script>
