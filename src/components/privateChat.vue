<template>
	<div>
		<Modal  :class="[fullscreen?'private-chat-fullmodal':'private-chat-modal']"
       :draggable="fullscreen?false:true"
        v-model="privateChatModal"
         :fullscreen="fullscreen"
          footer-hide
           width='750px'>
			<div slot="header"  class="slot_header" >
					<img :src="imgUrl+'images/avatar/'+currentUser.headimage" border="0" class="head" style="width:40px ; "  @click="showMyInfo()">
         <!-- <Button type="text"  class="slot_header_open" icon="ios-browsers-outline "  @click="fullscreenOpen()" v-show="fullscreen?false:true" ></Button>
         <Button type="text"  class="slot_header_close"  icon="ios-remove " @click="fullscreenClose()" v-show="fullscreen?true:false" ></Button> -->
			</div>
      <div slot="close">
          <Button type="text" icon="md-close " style="font-size:20px" size ="large" @click="cloceChat()"></Button>
			</div>
      <div  class="privateChatUser">

          <ul  >
            <li v-for="(item,index) in userDegree" @click.prevent="openPrivateChat(item,item.userid)" :key="(item.userid) "
            :class="[activeName == item.nickname?'active':'notactive']"
             >
									<div class="uimg">
											<img :src="imgUrl+'images/avatar/'+'kefu.png'" border="0" class="head" style="width:30px ;"  v-if="item.flag == 2">
                    <img :src="imgUrl+'images/avatar/'+item.avatar" style="width:30px ;" align="top" v-if="item.flag == 1 ||item.flag ==3">
									</div>
									<div class="unick" style="">
                    {{item.nickname}}

                </div>
                 <Badge :count="0" :overflow-count="0" >
                      <a href="#" class="demo-badge"></a>
                  </Badge>
                <!-- <div  class="closeList" style=" " @click.prevent="closeThisChat(index,item.userid)">
                    <Icon style="position:absolute; top:1px; left:1px" type="md-close" />
                </div> -->
							</li>
              <li v-if="userDegree.length==0" style="text-align:center;:hover:#fafafa">
                <h1 style="color:#aeaeae"> 暂时无私聊</h1>

              </li>
          </ul>

      </div>
      <div style="" class="message-box">
        <div class="message-header">
            {{noticeName}}
            <!-- <Button type="text"  class="settings" icon="ios-settings-outline" size ="large"  @click="settings()"  ></Button> -->
            <div style="" class="settings_line" v-if="showSettings">
              <ul>
                  <li @click="clearRecording()">清除聊天记录</li>
              </ul>
            </div>

        </div>

        <el-scrollbar id="privateChatScroll" :native="false" wrap-style="max-height:390px;" >
					<div class="message-items" style="height:388"  >
						<div class="message-item " :class="[item.userid==currentUser.userid?'mechat':'notmines']" v-for="item in messagesList"
            :id="'anchor-'+item"
            >
							<div class="avatar">
								<img :src="imgUrl+'images/avatar/'+item.avatar">

							</div>
							<div class="chat-info">
								<div class="chat-info-1" v-if="item.userid==currentUser.userid">
									<span class="chat-time">{{item.time|dateFormat('hh:mm:ss')}}</span>
									<span class="chat-name">{{item.nickname}}</span>
								</div>
								<div class="chat-info-1" v-else>
									<span class="chat-name">{{item.nickname}}</span>
									<span class="chat-time">{{item.time|dateFormat('hh:mm:ss')}}</span>
								</div>
								<div class="chat-info-2">
									<div class="chat-msg" v-if ="item.message.id == '1'" v-html="item.message.msg" >

                  </div>
                  <div class="chat-msg" v-if ="item.message.id == '0'"  v-html="item.message.msg" >

                  </div>
                  <div class="chat-msg" v-if ="item.message.id == null&& !item.message.redpacketid " v-html="item.message" >

                  </div>
                  <div class="chat-msgs" v-if ="item.message.id == null&& item.message.redpacketid" @click="openMyPrivateRed(item.fromid,item.message.remarks,item.message.redpacketid)" >
                          <div class="redbag-top">
                            <div class="f-left">
                              <img :src="imgUrl+'images/hongbao.png'"  style="margin-top: 3px; width:60px">
                            </div>
                            <div class="f-left ml10" style="color:#fff;">
                              <p>{{item.message.remarks?item.message.remarks:'恭喜发财,大吉大利！'}}</p>领取红包
                            </div>
                          </div>
                          <div class="redtitle">私聊红包</div>
                  </div>
                  	<!-- <div class="chat-msg" v-html="item.message.id?item.message.msg:item.message" >

                  </div> -->
                    <div class="message-wrap" v-if="item.type=='red' ">
                    <div class="redbag-info1">
                      <p style="color:#333;">{{item.grabnickname}} 领取了 <span style="color:red;">{{item.nickname}}</span> 的红包获得 <span style="color:red;">{{item.context.amount||item.context}}元</span></p>
                    </div>
                    <div class="clear"></div>
								</div>

							</div>
                <!-- <div class="chat-info-2" v-if="msg.mtype=='redpacket'">
                        <div class="chat-msg">
                          <div class="redbag-top" @click="GrabRedClick(msg.context.redpacketid,msg.context.remarks)">
                            <div class="f-left">
                              <img :src="imgUrl+'images/hongbao.png'"  style="margin-top: 3px; width:70px">
                            </div>
                            <div class="f-left ml10" style="color:#fff;">
                              <p>{{msg.context.remarks?msg.context.remarks:'恭喜发财,大吉大利！'}}</p>领取红包
                            </div>
                          </div>
                          <div class="redtitle">直播室红包</div>
                          </div>
								</div> -->
							</div>
						</div>
					</div>
				</el-scrollbar>




      <div >

    </div >
    <div slot="footer" class="sendClick" style="position:absolute;width:70%; bottom: 10px ;right:10px" >
        <div class="chatbtns">
            <div>
                  <!-- 表情 -->
                <Dropdown trigger="custom" :visible="visibleFaces" placement="top-start" transfer>
                <a href="javascript:void(0)" class="btn b1" title="表情" @click="EmogisOpenClick"></a>
                <DropdownMenu slot="list">
                  <Emogis @defaultEmogisChange="defaultEmogisClick" @sprayEmogisChange="sprayEmogisClick"></Emogis>
                </DropdownMenu>
              </Dropdown>
              <!-- 复制这里 -->
              <Dropdown trigger="custom" :visible="visibleFace" placement="top-start" transfer>
                <a href="javascript:void(0)" class="btn b3" title="动态表情" @click="FaceOpenClick"></a>
                <DropdownMenu slot="list">
                  <Face @defaultFaceChange="defaultFaceClick" @sprayFaceChange="sprayFaceClick"></Face>
                </DropdownMenu>
              </Dropdown>

            </div>
            <div>
              <Dropdown trigger="click" placement="top-start" transfer @on-click="FaceBarClick" style="display:none">
                <a href="javascript:void(0)" class="btn b2" title="表情条"></a>
                <DropdownMenu slot="list">
                        <DropdownItem name="[顶一个]">顶一个</DropdownItem>
                        <DropdownItem name="[赞一个]">赞一个</DropdownItem>
                        <DropdownItem name="[赞]">给力</DropdownItem>
                        <DropdownItem name="[掌声]">掌声</DropdownItem>
                        <DropdownItem name="[鲜花]">鲜花</DropdownItem>
                    </DropdownMenu>
              </Dropdown>
            </div>
            <div><a href="javascript:void(0)" class="btn b3" title="赞" @click="GoodClick" style="display:none"></a></div>
            <div><a href="javascript:void(0)" class="btn b4" title="玫瑰" @click="FlowerClick" style="display:none"></a></div>


          <div>
              <template>
                <div>
                        <vue-core-image-upload
                      :crop="false"
                      :inputOfFile="'image'"
                      :credentials="true"
                      @imagechanged="uploadyanzheng"
                      @imageuploaded="uploadImgsSuccess"
                      @errorhandle="uploadImgError"
                      :text="''"
                      :headers="{token:uploadImgsToken}"
                      :maxFileSize="2048000"
                      :inputAccept="'image/*'"
                      :extensions="'png,jpg,gif'"
                      url="http://api.9935333.com/api/upload">
                      <a href="javascript:void(0)" class="btn b5" title="上传图片"></a>
                  </vue-core-image-upload>
                </div>

            </template>
              <!-- <Upload
                accept="image/*"
                name="image"
                :max-size="1024"
                :headers="{token:uploadImgsToken}"
                :on-success="uploadImgsSuccess"
                :on-error="uploadImgError"
                :before-upload ="uploadyanzheng"
                :format="['jpg', 'jpeg', 'png', 'gif']"
                multiple action="http://api.9935333.com/api/upload">


              </Upload> -->
            </div>
        <div @click="privateRedOpen" ><img :src="imgUrl+'images/hongbao.png'"  class="btn b4" style="width:30px" title="红包"></div>
        </div>

          <div class="msssage-control" style="height:80px">
            <Editdiv @childEmit="sendClick"  v-model="messages" id="privateChat"  ></Editdiv>
            <div class="sendBtn" @click="sendClick"><Icon type="ios-send"/>发送</div>
          </div>
    </div>

    </div>


		</Modal>
	</div>
</template>
<script>
	import Constants from '@/utils/constants'
	import Util from '@/utils/util'
	import Face from '@/components/face.vue'
  import Editdiv from '@/components/editdiv.vue'
   import Emogis from '@/components/emogis.vue'
   import Emoji from '@/utils/dealemoji.js'
   import emojidatas from '@/assets/js/emojisdata.js'
  import emojidata from '@/assets/js/emojidata.js'
  import {Modal} from 'iview'
  import setChat from '@/utils/setChat'
  import setChatInfo from '@/utils/setChatInfo'
  import VueCoreImageUpload  from 'vue-core-image-upload';
	export default {
		name:"PrivateChat",
		components:{
			Face,
      Editdiv,
      Emogis,
      'vue-core-image-upload': VueCoreImageUpload,
		},
		data(){
			return {
        showSettings:false,
        fullscreen:false,
        visibleFace:false,
        visibleFaces:false,
        imgUrl:Constants.staticUrl,
        uploadImg:'',
        getPrivate:false,
        uploadImgsToken:'',
        // uploadImgSuccess
        uploadImgOverflow:'',
        activeName:'',
        privateChatModal: false,
        nickName:'',
        noticeName:'',
        pWidth:'',
        pHeight:'',
				privateUser:{
          avatar:'',
          degree:'',
          flag : '',
          nickname:'',
					userid:null,
        },
				currentUser:{},
				messages:null,
				messagesList:[

        ],
        privateChatList:[

        ],
        userDegree:[

        ],
        //用户聊天记录
        ChatList:[

        ],
        ChatInfoList:[],
      }
    },
    computed:{
			uploadImgsToken() {
        return this.$root.$store.state.token ;
      },
  	},
		watch:{
			visibleFace(value){
  				if (value) {
			        document.body.addEventListener('click', this.closeFace)
			    } else {
			        document.body.removeEventListener('click', this.closeFace)
			    }
        },
      visibleFaces(value){
  				if (value) {
			        document.body.addEventListener('click', this.closeFaces)
			    } else {
			        document.body.removeEventListener('click', this.closeFaces)
			    }
        }
		},
		mounted(){
      //获取私聊记录

      this.$root.eventHub.$on("showChatListChatEvent",fromid =>{
        //私聊点开
            let MyInfo =  this.$store.state.userInfo ;
            this.currentUser = MyInfo;
            let nowItem = this.$store.state.chatitem
            if(fromid) {
               this.openPrivateChat(nowItem,fromid)
            }
               if(this.privateChatModal==false) {
          this.privateChatModal=true;
       }
       			setTimeout(()=>{
	      			this.privateChatScrollToBottom();
            },200);
          // this.ShowFromChat(fromid);
      });

      //list
      // this.$store.commit('CHAT_LIST', []);
      // this.$store.commit('SEE_CHAT', []);
      //list
      this.uploadImgsToken = this.$store.state.token ;
			var that = this;
			this.$root.eventHub.$on("PrivateChatEvent",item=>{
        this.privateUser = item ;
        let MyInfo =  this.$store.state.userInfo ;
        this.currentUser = MyInfo;
        // this.ShowFromChat(item.fromid)
        this.openPrivateChat(item,item.userid)
        if(this.privateChatModal==false) {
          this.privateChatModal=true;
       }
        this.pushLeftMessageList(item);
      });
      //打开聊天窗口

      this.$root.eventHub.$on("OpenPrivateChatEvent",item=>{
        let that = this ;
        that.privateUser = item.privateUser;
         let MyInfo =  this.$store.state.userInfo ;
        this.currentUser = MyInfo;
        that.messagesList = [];


        if(item.data == '') {
          return
        }else {
          that.messagesList =item.data ;
        }
       if(that.privateChatModal==false) {
          that.privateChatModal=true;
       }


      });
      //接收消息事件发布

			this.$root.eventHub.$on("PrivateChatReceiveEvent",item=>{
       this.updataNowState(item);
        this.pushMyMessageList(item);
				setTimeout(()=>{
	      			this.privateChatScrollToBottom();
            },200);
      });
      this.$root.eventHub.$on("PrivateChatRedReceiveEvent",item=>{
      //如果是当前聊天则push
        let  nowId = this.$store.state.nowid
        if(nowId == item.fromid) {
             this.messagesList.push(item)
               this.pushredPackMessage(item);
          }
      this.pushMyMessageList(item);
      if(this.privateChatModal) {
        	setTimeout(()=>{
	      			this.privateChatScrollToBottom();
            },200);
      }

      });
      this.$root.eventHub.$on("PrivateChatMyRedReceiveEvent",item=>{

         let  nowId = this.$store.state.nowid
          if(nowId == item.toid ){
              this.messagesList.push(item)
          }

          		setTimeout(()=>{
	      			this.privateChatScrollToBottom();
            },200);
      });
				this.$root.eventHub.$on("PrivateChatSendCompletedEvent",item =>{
            this.FormattedMessages(item);
            setTimeout(()=>{
	      			this.privateChatScrollToBottom();
	      		},200);
            this.messages = null;
            this.$root.eventHub.$emit("clearDivEvent","privateChat");
			});
		},
		computed:{

		},
		methods:{
      uploadyanzheng(file) {
           let _this = this
           var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(theFile) {
        　　var image = new Image();
          image.src = theFile.target.result;
          image.onload = function() {
            _this.pWidth = this.width
             _this.pHeight = this.height

          };
        };

      },
      openMyPrivateRed(uid,remarks,redpacketid) {
        if(uid == this.$store.state.userInfo.userid) {
            return
        }else {

        }
       this.$parent.privateGrabRedClick(redpacketid,remarks)
      },
      privateRedOpen(){
        this.$parent.privateRedOpen(this.$store.state.nowid)
      },
      settings() {
        this.showSettings = true
      },
      showMyInfo() {
         this.$root.eventHub.$emit("showMyInfo");
      },
      //处理消息并保存
      closeThisChat(index,uId){
         this.ChatInfoList.splice(uId,1);

        this.removeChatUid(uId)
        this.userDegree.splice(index,1)

      },
       removeChatUid(item) {
            for(var i=this.ChatInfoList.length-1;i>=0;i--)
              {
              if(this.ChatInfoList[i]==item)
                {
                  this.ChatInfoList.splice(i,1);
                  }
              }
        },
      FormattedMessages(item){
              if(item.message.id == '1') { //id为1其实是图片消息
                let cut = item.message.msg
                item.message.msg = '<img src="http://' + cut + '?imageView2/2/w/220">'
              }
              else {

                let firstDeal = Emoji(item.message.msg);

               if(typeof firstDeal !== 'string') {

                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img style="width: 80px" src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  }
                }
                item.message= emojiMsg;
              }

              }


      //保存聊天列表
         if(item.toid !==this.$store.state.userInfo.userid && item.userid !== this.$store.state.userInfo.userid) {
          this.userDegree.push(item);
        }
        if(!this.$store.state.nowid){
            this.$store.commit('SAME_NOW_ID',item.toid);

            setTimeout(()=>{


              this.privateChatScrollToBottom();
               this.pushItem(item);
	      		},200);
        }else if( this.$store.state.nowid ==item.toid){
            setTimeout(()=>{
              this.privateChatScrollToBottom();
              this.pushItem(item);
	      		},200);
        }

      },
      //接收自己消息
      updataMyState(item) {
        //将自己的信息替换
        if(!this.$store.state.whomtochat) {
          this.$store.commit('WHOM_TO_CHAT',  {
          touserid:item.toid,
          tousernickname: item.toname,
          touserheadimage: item.tohead,
        });
        }else {

          this.$store.state.whomtochat =  {
          touserid:item.toid,
          tousernickname: item.toname,
          touserheadimage: item.tohead,
        }
        }
      },
      //改变当前聊天状态
      updataNowState(item) {
        this.currentUser = this.$store.state.userInfo;
        var isMe = this.$store.state.userInfo.userid

        var  nowId = this.$store.state.nowid
        if(nowId !==undefined) {
          if(!this.$store.state.newfromid) {
              this.$store.commit('SAME_FROM_ID',item.fromid);
          }else {
              this.$store.state.newfromid == item.fromid
          }
          if(item.toid ==isMe && nowId ==item.fromid) {
              this.messagesList.push(item)
          }
        }else {
          if(!this.$store.state.newfromid) {
              this.$store.commit('SAME_FROM_ID',item.fromid);
          }else {
              this.$store.state.newfromid == item.fromid
          }
        }
        if(!this.$store.state.whomtochat) {
          this.$store.commit('WHOM_TO_CHAT',  {
          touserid:item.fromid,
          tousernickname: item.fromid,
          touserheadimage: item.fromid,
        });
        }
        if(!this.$store.state.chatitem) {
          this.$store.commit('CHAT_ITEM',item);
        }else {
          this.$store.state.chatitem = item
        }
      },
      NoticeInfo(noticeName) {
        this.$Notice.info({
                    top: 0,
                    title: '你有来自'+noticeName+'的消息',
                });
      },
      ShowFromChat(fromId) {
        if(this.privateChatModal = true){
           this.messagesList = [];
           if(setChat.getData(fromId)) {
             this.messagesList = [] ;
                this.pushLishi(fromId);

           }else {
             this.messagesList = [] ;
           }
        }else if(this.privateChatModal = false ) {
          if(setChat.getData(fromId)) {
             this.messagesList = [] ;
                this.pushLishi(fromId);

           }else {
             this.messagesList = [] ;
           }
        }
         this.noticeName = this.$store.state.noticename
      },
      openPrivateChat(item,toId) {
        if(!item.nickname) {
          return
        }
        this.activeName = item.nickname
        this.overflowcount =='0';
        let obj = {
          touserid:item.userid,
          tousernickname: item.nickname,
          touserheadimage: item.avatar,
        };
        if(!this.$store.state.nowid) {
          this.$store.commit('SAME_NOW_ID', obj.touserid);
        }else {
          this.$store.state.nowid = obj.touserid
        }
        ;
        if(!this.$store.state.whomtochat) {
          this.$store.commit('WHOM_TO_CHAT', obj);
          if(setChat.getData(item.userid) == '') {
              this.messagesList = [];
            }
            else {
              this.messagesList.splice(0,this.messagesList.length);
               this.pushLishi(item.userid);
            }
        }
        else {
            this.$store.state.whomtochat = obj
             if(setChat.getData(item.userid) == '') {
              this.messagesList = [];
            }
            else {
             this.messagesList = [];
             this.pushLishi(item.userid);
            }
        }
        if(!this.$store.state.noticename){
            this.$store.commit('NOTICE_INFO_NAME',item.nickname);
            this.noticeName = item.nickname
        }else{
          this.$store.state.noticename = item.nickname;
          this.noticeName = item.nickname

        }
      },
      pushLishi(uid){
        var myLisi = setChat.getData(uid)
        myLisi.forEach(item => {
          this.messagesList.push(item)
        });
          setTimeout(()=>{

	      			this.privateChatScrollToBottom();
	      		},200);
      },
      setMyChatInfo(userId,item) {
          let maPartListTable= this.$store.state.chatList.slice();
          if(maPartListTable== undefined) {

            maPartListTable = []
            maPartListTable.push(item)
          }else {
             maPartListTable.push(item)
          }
        this.$store.state.chatList =maPartListTable ;
      },
      getMyChatInfo(myId) {
          this.userDegree = [];
           let getMyChats = this.$store.state.chatList
           this.userDegree = getMyChats
      },
      pushListInfo(item) {
        if(this.$store.state.whomtochat.userid,item) {
          setChat.setData(this.$store.state.whomtochat.userid,item);
        }

      },
      // 聊天列表
      pushMyMessageList(item) {
        //3红包聊天和2私聊消息
              if(!this.$store.state.whomtochat) {
                this.$store.commit('WHOM_TO_CHAT',  {
                touserid:item.fromid,
                tousernickname: item.fromid,
                touserheadimage: item.fromid,
              });
              }
              if(!this.$store.state.chatitem) {
                this.$store.commit('CHAT_ITEM',item);
              }else {
                this.$store.state.chatitem = item
              }
             if(!this.$store.state.newfromid){
                    this.$store.commit('SAME_FROM_ID',item.fromid);
                }else {
                  this.$store.state.newfromid = item.fromid
                }
            if(this.userDegree.length == 0) {
              if(item.fromid !==undefined) {
              this.ChatInfoList.push(item.fromid) ;
              }
               this.userDegree.push(item);
            }else if(this.ChatInfoList.indexOf(item.fromid)< 0 && this.ChatInfoList.indexOf(item.fromid) <=1){
               this.ChatInfoList.push(item.fromid) ;
                this.userDegree.push(item);
            }
      },
      pushLeftMessageList(item) {
            if(this.userDegree.length == 0) {
            if(item.userid !== undefined) {
               this.ChatInfoList.push(item.userid) ;
            }
              this.userDegree.push(item);
              //  setChatInfo.setChatInfo(item.userid);
            }
           else
            if(item.userid&&this.ChatInfoList.indexOf(item.userid)< 0 && this.ChatInfoList.indexOf(item.userid) <=1 ){
                    this.ChatInfoList.push(item.userid) ;
                    this.userDegree.push(item);

              }
      },
      pushredPackMessage(item) {
        //如果左边列表为空而且不是本人聊天聊天

        if(this.userDegree.length == 0 &&  item.toid !==this.$store.state.userInfo.userid) {
            if(item.userid !== undefined || item.toid != null) {
               this.ChatInfoList.push(item.toid) ;

            }
              this.userDegree.push(item);
        }
        else
        if( item.toid !==this.$store.state.userInfo.userid ) {
          if(item.toid&&this.ChatInfoList.indexOf(item.userid)< 0 && this.ChatInfoList.indexOf(item.userid) <=1 ){
             this.ChatInfoList.push(item.toid) ;

             this.userDegree.push(item);

          }

        }
      },
      cloceChat(){
        this.privateChatModal = false;
      },
      pushItem(item) {
         this.messagesList.push(item);
      },
        fullscreenOpen() {
        this.fullscreen=true

      },
      fullscreenClose() {
        this.fullscreen=false

      },
      	uploadImgError(err) {
				Modal.error({
					title: '错误提示',
					content: '上传失败<br>' + err
				})
			},
      uploadImgsSuccess(callbackData) {
				if(callbackData.code !== 0) {
					Modal.error({
						title: '错误提示',
						content: callbackData.msg
					});
					return false
				} else {
          //todo
        if( callbackData.url == null) {
            Modal.error({
						title: '上传图片失败,请重试',
						content: callbackData.msg
          });
          	return false
        }

          let img = callbackData.url; //+ '?imageView2/2/w/340'

          this.privateUser = this.$store.state.whomtochat;
	        this.currentUser = this.$store.state.userInfo;
					// this.imgUri = img;
					var Msg = {
						type: 'message',
						mtype: 'user',
						fromuserid:  this.currentUser.userid,
						fromnickname: this.currentUser.nickname,
						fromuserheadimage: this.currentUser.headimage,
						fromuseruserdegree: this.currentUser.userdegree,
						fromuseruserflag: this.currentUser.userflag,
						touserid:this.$store.state.whomtochat.touserid,
            tousernickname:this.$store.state.whomtochat.tousernickname,
            touserheadimage:this.$store.state.whomtochat.touserheadimage,
          };
          Msg.content = {
            id: 1,
            msg: callbackData.url,
            width:this.pWidth,
            height:this.pHeight
          }
         this.$root.sendToUser(Msg);
        }


			},
			privateChatScrollToBottom(){
        		let mbdiv = document.getElementById('privateChatScroll')
             	mbdiv.scrollTop = mbdiv.scrollHeight;
      },
      FlowerClick(){
				//插入玫瑰表情
				var flower = '<img src="'+this.imgUrl+'images/face/flower.gif" isface>';
				if(Util.isNull(this.messages)){
					this.messages =  flower;
				}else{
					this.messages +=  flower;
				}
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					messages:that.messages
				});
			},
			GoodClick(){
				var good = '<img src="'+this.imgUrl+'images/face/good.gif" isface>';
				if(Util.isNull(this.messages)){
					this.messages = good;
				}else{
					this.messages += good;
				}
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					messages:that.messages
				});
			},
			FaceBarClick(name){

				if(Util.isNull(this.messages)) {
					this.messages = ''
				}
				this.messages += name;
				this.$root.eventHub.$emit("inputDivEvent",{
					id: 'privateChat',
					messages: this.messages
				});
			},
			FaceOpenClick(){
        this.visibleFace = true;
         this.visibleFaces = false;
      },
      EmogisOpenClick(){
      this.visibleFaces = true;
      this.visibleFace = false;
			},
			closeFace(e){
				var t = e.target;
				if(t.id !== 'tab-spray' && t.id !=='tab-default'){
          this.visibleFace = false;

				}
      },
      closeFaces(e){
				var t = e.target;
				if(t.id !== 'tab-spray' && t.id !=='tab-default'){
          this.visibleFaces = false;

				}
      },
      //表情
			defaultFaceClick(val){
				var facestr = val;
				if(Util.isNull(this.messages)){
					this.messages = facestr;
				}else{
					this.messages += facestr;
				}
        this.visibleFace = false;

				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					messages:that.messages
        });
        this.sendClick();
			},
			sprayFaceClick(val){
				var facestr = val.datatxt;
				if(Util.isNull(this.messages)){
          this.messages = facestr;

				}else{
					this.messages += facestr;
				}
				this.visibleFace = false;
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:that.messages
        });

      },
      //动态表情
		  defaultEmogisClick(val){

				var facestr = val;
				if(Util.isNull(this.messages)){
					this.messages = facestr;
				}else{
					this.messages += facestr;
				}
				this.visibleFaces = false;
        var that = this;

				this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:that.messages
        });

			},
			sprayEmogisClick(val){
				var facestrs = val.datatxt;
				if(Util.isNull(this.messages)){
					this.messages = facestrs;
				}else{
					this.messages += facestrs;
				}
				this.visibleFaces = false;
        var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:messages
        });

      },
	    sendClick(){

        let that = this ;
        if(that.messages == null) {
          	that.$toast.center('不能发送空白消息，请重新输入！','center');
             return;
        }
				if(!that.$root.isSocketConnect){
					that.$Modal.error({
			            title: '错误提示',
			            content: '网络异常与服务器连接已断开。'
			        });
			        return;
        }

        if(that.messages) {
          	let text = that.messages.replace(/&nbsp;/ig,'').trim();
					  if(text.length === 0) {
						that.$toast.center('不能发送空白消息，请重新输入！','center');
						that.messages = '';
						return
					}
        }
        if(!this.$store.state.whomtochat) {
              that.$toast.center('不能发送空白消息，请重新输入！','center');
              return
        }
				if(that.messages) {
            let text = that.messages.replace(/&nbsp;/ig,'').trim();
					  if(text.length === 0) {
						that.$toast.center('不能发送空白消息，请重新输入！','center');
						that.messages = '';
						return
					}
           that.messages =that.messages
        }
        this.currentUser = this.$store.state.userInfo;
        this.privateUser = this.$store.state.whomtochat;
				var jsonMessage = {
					type:'message',
					mtype:'user',
					touserid:this.$store.state.whomtochat.touserid,
					tousernickname:this.$store.state.whomtochat.tousernickname,
					touserheadimage:this.$store.state.whomtochat.touserheadimage,
					fromuserid:this.currentUser.userid,
					fromuserheadimage:this.currentUser.headimage,
					fromuseruserflag:this.currentUser.userflag,
					fromuseruserdegree:this.currentUser.userdegree,
					fromnickname:this.currentUser.nickname,
					content:{
						id:0,
						msg:that.messages
					}
        }
        this.$root.sendToUser(jsonMessage);



      },
    },
    beforeDestroy() {
      this.$root.eventHub.$off('showChatListChatEvent',{

      })
      this.$root.eventHub.$off('PrivateChatEvent',{

      })
      this.$root.eventHub.$off('OpenPrivateChatEvent',{

      })
      this.$root.eventHub.$off('PrivateChatReceiveEvent',{

      })
      this.$root.eventHub.$off('PrivateChatSendCompletedEvent',{

      })
    }
  ,
  }

</script>
