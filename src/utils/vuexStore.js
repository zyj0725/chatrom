import Cookie from '@/utils/auth'

export default {
	state:{
    isLogin: false,
		showInfo: false,
		userInfo:{
			userid:'',
			nickname:'',
			headimage:'default.gif',
			userdegree:0,
			userflag:0
		},
		status:'',
		token:Cookie.getToken(),
		name:'',
		roles: [],
		avatar:'',
    timer: [],
    ShowprivateChatList :false,
    chatList : {},
	},
	mutations:{
    UPDATE_LOGINSTATUS(state, newStatus) {
      state.isLogin = newStatus;
    },
		SET_INFO(state, bool) {
			state.showInfo = bool
		},
		SET_TOKEN: (state, token) => {
	      state.token = token
	    },
	    SET_ROLES: (state, roles) => {
	      state.roles = roles
	    },
	    SET_NAME: (state, name) => {
	      state.name = name
	    },
	    SET_STATUS: (state, status) => {
	      state.status = status
	    },
	    SET_USER_INFO:(state, userinfo)=>{
	    	state.userInfo = userinfo
			},
			SET_TIME(state, newTime) {
				state.timer.push(newTime)
      },
      SHOWChATLIST(state, newStatus) {
        state.ShowprivateChatList = newStatus;
      },
      CHAT_LIST(state, newChatList) {
        state.chatList = newChatList;
      },
      MESSAGE_NUB(state, newMessageNub) {
        state.messageNub = newMessageNub;
      },
      IS_CHAT_LIST(state, bool) {
        state.ischatlist = bool
      },
      CLEAR_CHAT_LIST(state, newClear) {
        state.clearchatlist = newClear
      },
      SEE_CHAT(state, seechat) {
        state.seechat = seechat
      },
      WHOM_TO_CHAT(state, whomtochat) {
        state.whomtochat = whomtochat
      },
      WHOM_FROM_CHAT(state, whomfromchat) {
        state.whomfromchat = whomfromchat
      },
      SAME_FROM_ID(state, newfromid) {
        state.newfromid =newfromid
      },
      SAME_TO_ID(state, newtoid) {
        state.newtoid = newtoid
      },
      SAME_NOW_ID(state, nowid) {
        state.nowid = nowid
      },
      IS_IN_MODEL(state, ismodel) {
        state.ismodel = ismodel
      },
      NOTICE_INFO_NAME(state, newname) {
        state.noticename = newname
      },
      LOGIN_TIME(state, logintime) {
        state.logintime = logintime
      },
      CHAT_ITEM(state, chatitem) {
        state.chatitem = chatitem
      },


	},
	actions:{

	}
}
