import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/css/index.less'
import '@/assets/css/notification.less'
import '@/assets/css/tabs.less'
import 'swiper/dist/css/swiper.css';
import 'animate.css'
import 'vue2-toast/lib/toast.css'
import Scrollbar from './scrollbar/index.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import Toast from 'vue2-toast'
import Store from '@/utils/vuexStore'
import Util from '@/utils/util'
import VueFilter from '@/utils/vueFilter.js'
import { Notification,Tabs,TabPane} from 'element-ui';
import Stomp from 'stompjs'
import Emoji from '@/utils/dealemoji.js'
import emojidatas from '@/assets/js/emojisdata.js'
import emojidata from '@/assets/js/emojidata.js'
import Cookie from '@/utils/auth'
import setChat from '@/utils/setChat'
Vue.use(Toast,{
  duration: 2000,
  wordWrap: true
});
Vue.use(Vuex)
for(let key in VueFilter){
  Vue.filter(key,VueFilter[key]);
}
library.add(solid)
library.add(regular)
library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)
const store = new Vuex.Store(Store);
Vue.use(iview);
Vue.use(Scrollbar)
Vue.use(Tabs);
Vue.use(TabPane);
Vue.config.productionTip = false
//Vue.prototype.ChatClient = ChatClient
/* eslint-disable no-new */
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
  this.splice(index, 1);
  }
};
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  router,
  data:{
  	eventHub:new Vue(),
    stompClient:null,
    isSocketConnect:false,
    tx:null,
  },
  render: h => h(App),
  methods:{
    InitSocket(){
      var headers = {
          user_id:store.state.userInfo.userid,
          token:store.state.token,
          fromnickname:store.state.userInfo.nickname,
          user_flag:store.state.userInfo.userflag,
          head_image:store.state.userInfo.headimage,
          user_degree:store.state.userInfo.userdegree,
          client:'PC'
      }
      var that = this;
      //连接websocket后端服务器
      this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS);
      this.stompClient.debug = null
      this.stompClient.connect(headers, frame=> {
        this.isSocketConnect = true;
        //广播
        this.stompClient.subscribe('/topic/public', greeting=>{

          let news = JSON.parse(greeting.body);
          if(news.type === 'message'&&(news.mtype === 'user'||news.mtype === 'manage')) {

            if(news.content.id  == '1') { //id为1其实是图片消息

              let cut = news.content.msg;
              news.content.msg = '<img src="http://' + cut + '?imageView2/2/w/220/">'

            }else if(news.content.id !== 1) {

              let firstDeal = Emoji(news.content.msg); //['[咋新乐]']

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
                news.content.msg = emojiMsg;
              }
            }

          }
          if(news.type === 'message'&&(news.mtype === 'customer')) {
            if(news.content.id-0 === 1) { //id为1其实是图片消息
              let cut = news.content.msg;
              news.content.msg = '<img src="http://' + cut + '?imageView2/2/w/220/">'
            }else  {
              let firstDeal = Emoji(news.content.msg); //['[咋新乐]']
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
                news.content.msg = emojiMsg;
              }
            }

          }
          if(news.type == 'tokenfailure') {
            Cookie.removeToken();
            that.$Modal.error({
              title: '错误提示',
              content: newMessage.content.msg ,
              onOk() {
                window.location.reload();
              }
            })
            setTimeout(()=>{
              window.location.reload();
              Cookie.removeToken();
            },2000)

          }
          else
          if(news.type == 'disconnect') {
            let obj = {
              userid: news.content.user_id,
              grade: news.content.user_degree,
              sessionid: news.content.sessionid,
            }
            this.eventHub.$emit("DelLeftListEvent",obj);
          }else if(news.type =='onconnect'){
            let obj = {
              userid: news.content.user_id,
              nickname: news.content.nickname,
              flag: news.content.user_flag,
              grade: news.content.user_degree,
              avatar: news.content.head_image,
              sessionid: news.content.sessionid,
            }
            this.eventHub.$emit("UpdateLeftListEvent",obj);
          }

          that.receiveMessage(news);

        });
          //个人

      this.stompClient.subscribe('/user/' + store.state.userInfo.userid + '/message',function(greeting){
              if(JSON.parse(greeting.body).mtype === 'kickout') { //不可以放在用户函数内

                that.$Modal.error({
                  title: '错误提示',
                  content: '您的账号在其他地方登录，您被迫下线！',
                  onOk() {
                    window.location.reload();
                  }
                })
                Cookie.removeToken();
                  that.stompClient.disconnect();

              }
              let newMessage = JSON.parse(greeting.body);
              if(newMessage.content.msg=="请勿频繁发言，间隔时间为5秒") {
                that.$Message.config({
                  top: 400,
                });
                that.$Message.error(
                  {
                    content : newMessage.content.msg ,
                    duration : 5 ,
                    onClose() {

                    },

                  }

                  );
              }
              if(newMessage.type=="tokenfailure") {
                that.$Message.config({
                  top: 400,
                });
                that.$Message.error(
                  {
                    content : newMessage.content.msg ,
                    onClose() {
                      Cookie.removeToken();
                    },
                    onOk() {
                      Cookie.removeToken();
                      this.$router.push('/login')
                    },
                  }

                  );
                  Cookie.removeToken();
              }
              if(newMessage.content.msg=="您没发言权限，不能发送消息") {
                that.$Message.config({
                  top: 400,
                });
                that.$Message.error(
                  {
                    content : newMessage.content.msg ,
                    onClose() {
                      that.$Message.destroy()
                    }
                  }

                  );
              }
              let newMessages = JSON.parse(greeting.body);
              if(newMessages.content.msg=="您已经被管理员禁言，如有问题请联系管理员") {
                that.$Modal.confirm ({
                  draggable : true,
                  closable : true,
                  title : '请联系管理员' ,
                  content: newMessages.content.msg,
                  onCancel(){
                    that.$Modal.remove()
                  },
                  onOk() {

                  },
                })

              };

            let news = JSON.parse(greeting.body);
            if(news.type === 'message'&&(news.mtype === 'user'||news.mtype === 'customer')) {

              if(news.content.id-0 === 1) { //id为1其实是图片消息
                news.content.msg = '<img src="http://' + news.content.msg + '?imageView2/2/w/340">'
              }
              let firstDeal = Emoji(news.content.msg); //['[咋新乐]']

              if(typeof firstDeal !== 'string') {

                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?  emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img style="width: 80px" src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  }
                }
                news.content.msg = emojiMsg;
              }
            }

            that.privateReceiveMessage(news);
          });
        },error=> {
        this.isSocketConnect = false;
        this.$Modal.error({
            title: '错误提示',
            content: '网络异常与服务器连接已断开。' ,
            onOk() {
            window.location.reload();
            this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS);
            }
        });
          setTimeout(()=>{
            //断开重连
              disconnect();
              window.location.reload();
    				},0);


      });
    },
    disconnect(){//断开连接
      if(this.stompClient !== null){
        this.stompClient.disconnect();
        this.isSocketConnect = false;
      }
    },
    sendToAll(message){
      this.tx = this.stompClient.begin();
      this.stompClient.send("/sendToAll", {transaction: this.tx.id,token:store.state.token}, JSON.stringify(message));
      this.tx.commit();
      this.eventHub.$emit("sendMessageCompleteEvent");
    },
    sendToUser(message){

      this.tx = this.stompClient.begin();
      this.stompClient.send("/sendToUser", {transaction: this.tx.id,token:store.state.token}, JSON.stringify(message));
      this.tx.commit();
      var date = new Date();
      var msgItem = {
        userid:message.fromuserid,
        nickname:message.fromnickname,
        time:date,
        message:message.content,
        avatar:message.fromuserheadimage,
        flag:message.fromuseruserflag,
        degree:message.fromuseruserdegree,
        fromid : message.fromuserid,
        toid : message.touserid,
        toname: message.tousernickname,
        tohead: message.touserheadimage,
        neversee:1,
      }
      this.savemessage(msgItem.toid,msgItem);
      this.eventHub.$emit("PrivateChatSendCompletedEvent",msgItem);




    },
    savemessage(id,item) {
      setChat.setData(id,item);
            let data = {
              neversee:item.neversee
            }
          let seeChatList= this.$store.state.seechat;
          if(seeChatList== undefined ||seeChatList.length == 0 ) {
            seeChatList = {} ;
            if(seeChatList[id]==undefined) {
              seeChatList[id] =[];
              seeChatList[id].push(data);
            }
            else
            {
              seeChatList[id].neversee = seeChatList[id].neversee +1
            }

          }else {

          }
        this.$store.state.seechat = seeChatList ;


    },
    privateReceiveMessage(msg){//私聊消息处理

      if(msg.mtype ==='nopermission'){//没有发言权限通知
        that.$Modal.error({
            title: '发言提示',
            content: '您还没有发言权限！'
        });
      this.$Message.error('您还没有发言权限！');

      }else if(msg.mtype ==='tokenfailure'){//登录失效
        that.$Modal.warning({
            title: '登录提示',
            content: '您已登录超时，请重新登录！',
            onOk() {
              window.location.reload();
          }
        });


      }else if(msg.mtype ==='systemptips') {
        that.$Modal.warning({
          content: msg.content.msg,
      });
      }



      else{
          var isMe = this.$store.state.userInfo.userid ;
          var privateUser = {
            fromid:msg.fromuserid,
            nickname:msg.fromnickname,
            avatar:msg.fromuserheadimage,
            time : msg.msgtime,
            message : msg.content,
            flag:msg.fromuseruserflag,
            degree:msg.fromuseruserdegree,
            time : msg.msgtime,
            toid : msg.touserid,
            toname: msg.tousernickname,
            tohead: msg.touserheadimage,
            userid: msg.fromuserid,
            neversee:1,
        }
        //判断是否是红包消息
        if(msg.content.redpacketid == undefined || !msg.content.redpacketid) {
          //如果发送到自己

          if( msg.touserid ==isMe ) {
            this.savemessage(msg.fromuserid,privateUser);
            this.$root.eventHub.$emit("messageComEvent",1);
            this.eventHub.$emit("PrivateChatReceiveEvent",privateUser);
            //如果自己是发送人
          }
        }else if(msg.content.redpacketid){
          //如果发送到自己
            if( msg.touserid ==isMe ) {
              this.$root.eventHub.$emit("messageComEvent",1);
              this.savemessage(msg.fromuserid,privateUser);
              this.eventHub.$emit("PrivateChatRedReceiveEvent",privateUser);
              //如果自己是发送人
            }else if(  msg.fromuserid ==isMe) {
              this.savemessage(msg.touserid,privateUser);
              this.eventHub.$emit("PrivateChatMyRedReceiveEvent",privateUser);
            }
        }

        // setChat.setData(msg.fromuserid, messageObj.privateUser)


      }

    },
    receiveMessage(msg){
      if(msg.type === 'onconnect'){//连接通知
          Notification({
              message: msg.content.nickname+' 进入直播间+1',
              position: 'bottom-left',
              duration: 3000
          });
          this.eventHub.$emit("onlineEvent", msg.content);
      }else if(msg.type === 'disconnect'){//下线通知

          let sessionid =  msg.content;

        this.eventHub.$emit("disconnectEvent",sessionid);
      }else if(msg.type === 'message'){//发送消息
        if(msg.content.id == 0){
          var aiTeMeName = '@'+ this.$store.state.userInfo.nickname
          var isAiTeMeMsg =JSON.stringify(msg.content.msg.indexOf(aiTeMeName) )
        }else {
          var isAiTeMeMsg = '-1' ;
        }
        if(isAiTeMeMsg == '0') {
          isAiTeMeMsg = true
        }else {
          isAiTeMeMsg = false
        }
        var msgObj = {
            msgid: msg.msgid,
            userid:msg.fromuserid,
            nickname:msg.fromnickname,
            type:msg.type,
            mtype:msg.mtype,
            avatar:msg.fromuserheadimage,
            time:msg.msgtime,
            grade:msg.fromuseruserdegree,
            flag:msg.fromuseruserflag,
            isAiTeMeMsg: isAiTeMeMsg,
        };
        if(msg.mtype === 'user'){//普通用户发送消息
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'system'){
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'customer'){
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'redpacket'){
          msgObj.context = msg.content;
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        } else if(msg.mtype === 'canclemsg') {
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("CancleMessageEvent",msgObj);
        }else if(msg.mtype === 'manage') {
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }
      }else if(msg.type === 'red'){//抢红包消息
        var redobj = {
          nickname:msg.fromnickname,
          type:msg.type,
          grabnickname:msg.tousernickname,
          context:msg.content.amount
        };
        this.eventHub.$emit("ReceiveMessageEvent",redobj);

      }

    },
    delLeftList() {
      this.eventHub.$emit("DelLeftListEvent");
    },
  }

})
