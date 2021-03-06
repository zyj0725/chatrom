//公共变量

var Constants = {
  dev: false,//true开发模式
  //站点名
  //登录过期时间
  loginExpired : '' ,
  chatId :9935333,
  ipAdd:  "9935333.com",
  httpAdd: "http://chat.",
  staticAdd: "/static/",
  emojisAdd: "/static/images/emojis/",
	staticUrl: " http://chat.8582333.com/static/",//静态资源地址
	standardImgUrl: 'http://chat.8582333.com/static/images/emojis/',
	isLogin: false,//是否登录
	chatUrl: 'https://gzzaxc219.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=938240&configID=41445&jid=1936571624&s=1',
	// chatUrl: 'https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=669578&configID=41029&jid=4578793532&s=1',
	bannerAutoplay: 3000,

	kjapi: [
    'json?code=jsk3_zxkj',
    'json?code=cqssc_zxkj',
    'json?code=bjsc_zxkj',
    'json?code=ahk3_zxkj',
    'json?code=gxk3_zxkj',
    'json?code=hubk3_zxkj',
    'json?code=gsk3_zxkj',
    'json?code=hebk3_zxkj',
    'json?code=shk3_zxkj',
    'json?code=jlk3_zxkj',
    'json?code=gzk3_zxkj',
    'json?code=bjk3_zxkj',

  ],
  // kjapi: [
	// 	'json?code=bjsc_zxkj',
	// 	'json?code=gdklsf_zxkj',
	// 	'json?code=xyft_zxkj',
	// 	'json?code=jsk3_zxkj',
	// 	'json?code=xync_zxkj',
	// 	'json?code=cqssc_zxkj',
	// 	'json?code=gd11x5_zxkj',
	// 	'json?code=jx11x5_zxkj',
	// 	'json?code=xjssc_zxkj',
	// 	'json?code=tjssc_zxkj',
	// 	'json?code=kl8_zxkj',
	// 	'json?code=pcdd_zxkj',
	// ],
	kjjlApi: [
		'/chatroom/jsonarray?code=bjsc_kjjl',
		'/chatroom/jsonarray?code=cqssc_kjjl',
	],
	faceList:[
		{images:'geili_thumb.gif',datatxt:'[给力]',type:'default'},
		{images:'wg_thumb.gif',datatxt:'[围观]',type:'default'},
		{images:'vw_thumb.gif',datatxt:'[威武]',type:'default'},
		{images:'smilea_thumb.gif',datatxt:'[呵呵]',type:'default'},
		{images:'tootha_thumb.gif',datatxt:'[嘻嘻]',type:'default'},
		{images:'laugh.gif',datatxt:'[哈哈]',type:'default'},
		{images:'tza_thumb.gif',datatxt:'[可爱]',type:'default'},
		{images:'kl_thumb.gif',datatxt:'[可怜]',type:'default'},
		{images:'kbsa_thumb.gif',datatxt:'[挖鼻屎]',type:'default'},
		{images:'cj_thumb.gif',datatxt:'[吃惊]',type:'default'},
		{images:'shamea_thumb.gif',datatxt:'[害羞]',type:'default'},
		{images:'zy_thumb.gif',datatxt:'[挤眼]',type:'default'},
		{images:'bz_thumb.gif',datatxt:'[闭嘴]',type:'default'},
		{images:'bs2_thumb.gif',datatxt:'[鄙视]',type:'default'},
		{images:'lovea_thumb.gif',datatxt:'[爱你]',type:'default'},
		{images:'sada_thumb.gif',datatxt:'[泪]',type:'default'},
		{images:'heia_thumb.gif',datatxt:'[偷笑]',type:'default'},
		{images:'qq_thumb.gif',datatxt:'[亲亲]',type:'default'},
		{images:'sb_thumb.gif',datatxt:'[生病]',type:'default'},
		{images:'mb_thumb.gif',datatxt:'[太开心]',type:'default'},
		{images:'ldln_thumb.gif',datatxt:'[懒得理你]',type:'default'},
		{images:'yhh_thumb.gif',datatxt:'[右哼哼]',type:'default'},
		{images:'zhh_thumb.gif',datatxt:'[左哼哼]',type:'default'},
		{images:'x_thumb.gif',datatxt:'[嘘]',type:'default'},
		{images:'cry.gif',datatxt:'[衰]',type:'default'},
		{images:'wq_thumb.gif',datatxt:'[委屈]',type:'default'},
		{images:'t_thumb.gif',datatxt:'[吐]',type:'default'},
		{images:'k_thumb.gif',datatxt:'[打哈欠]',type:'default'},
		{images:'bba_thumb.gif',datatxt:'[抱抱]',type:'default'},
		{images:'angrya_thumb.gif',datatxt:'[怒]',type:'default'},
		{images:'yw_thumb.gif',datatxt:'[疑问]',type:'default'},
		{images:'cza_thumb.gif',datatxt:'[馋嘴]',type:'default'},
		{images:'88_thumb.gif',datatxt:'[拜拜]',type:'default'},
		{images:'sk_thumb.gif',datatxt:'[思考]',type:'default'},
		{images:'sweata_thumb.gif',datatxt:'[汗]',type:'default'},
		{images:'sleepya_thumb.gif',datatxt:'[困]',type:'default'},
		{images:'money_thumb.gif',datatxt:'[钱]',type:'default'},
		{images:'sw_thumb.gif',datatxt:'[失望]',type:'default'},
		{images:'cool_thumb.gif',datatxt:'[酷]',type:'default'},
		{images:'hsa_thumb.gif',datatxt:'[花心]',type:'default'},
		{images:'hatea_thumb.gif',datatxt:'[哼]',type:'default'},
		{images:'gza_thumb.gif',datatxt:'[鼓掌]',type:'default'},
		{images:'dizzya_thumb.gif',datatxt:'[晕]',type:'default'},
		{images:'bs_thumb.gif',datatxt:'[悲伤]',type:'default'},
		{images:'crazya_thumb.gif',datatxt:'[抓狂]',type:'default'},
		{images:'h_thumb.gif',datatxt:'[黑线]',type:'default'},
		{images:'yx_thumb.gif',datatxt:'[阴险]',type:'default'},
		{images:'nm_thumb.gif',datatxt:'[怒骂]',type:'default'},
		{images:'hearta_thumb.gif',datatxt:'[心]',type:'default'},
		{images:'unheart.gif',datatxt:'[伤心]',type:'default'},
		{images:'44.gif',datatxt:'[示爱]',type:'default'},
		{images:'69.gif',datatxt:'[足球]',type:'default'},
		{images:'ok_thumb.gif',datatxt:'[ok]',type:'default'},
		{images:'ye_thumb.gif',datatxt:'[耶]',type:'default'},
		{images:'good_thumb.gif',datatxt:'[赞]',type:'default'},
		{images:'64.gif',datatxt:'[礼物]',type:'default'},
		{images:'lxhzhuanfa_thumb.gif',datatxt:'[转发]',type:'spray'},
		{images:'lxhwahaha_thumb.gif',datatxt:'[笑哈哈]',type:'spray'},
		{images:'lxhxixi_thumb.gif',datatxt:'[笑嘻嘻]',type:'spray'},
		{images:'lxhtouxiao_thumb.gif',datatxt:'[xh偷笑]',type:'spray'},
		{images:'lxhtongku_thumb.gif',datatxt:'[痛哭]',type:'spray'},
		{images:'lxhjuhan_thumb.gif',datatxt:'[巨汗]',type:'spray'},
		{images:'lxhkoubishi_thumb.gif',datatxt:'[抠鼻屎]',type:'spray'},
		{images:'lxhqiuguanzhu_thumb.gif',datatxt:'[求关注]',type:'spray'},
		{images:'lxhv5_thumb.gif',datatxt:'[v威武]',type:'spray'},
		{images:'lxhweiguan_thumb.gif',datatxt:'[xh围观]',type:'spray'},
		{images:'lxhholdzhu_thumb.gif',datatxt:'[hold住]',type:'spray'},
		{images:'lxhxiudada_thumb.gif',datatxt:'[羞答答]',type:'spray'},
		{images:'lxhpubuhan_thumb.gif',datatxt:'[瀑布汗]',type:'spray'},
		{images:'lxhxuyuan_thumb.gif',datatxt:'[许愿]',type:'spray'},
		{images:'lxhzhuakuang_thumb.gif',datatxt:'[xh抓狂]',type:'spray'},
		{images:'lxhhaojiong_thumb.gif',datatxt:'[好囧]',type:'spray'},
		{images:'lxhchijing_thumb.gif',datatxt:'[xh吃惊]',type:'spray'},
		{images:'lxhbiefanwo_thumb.gif',datatxt:'[别烦我]',type:'spray'},
		{images:'lxhbuhaoyisi_thumb.gif',datatxt:'[不好意思]',type:'spray'},
		{images:'lxhjiujie_thumb.gif',datatxt:'[纠结]',type:'spray'},
		{images:'lxhgeili_thumb.gif',datatxt:'[xh给力]',type:'spray'},
		{images:'lxhlike_thumb.gif',datatxt:'[喜欢]',type:'spray'},
		{images:'lxhainio_thumb.gif',datatxt:'[爱你哦]',type:'spray'},
		{images:'lxhluguo_thumb.gif',datatxt:'[路过]',type:'spray'},
		{images:'lxhbeicui_thumb.gif',datatxt:'[别催]',type:'spray'},
		{images:'lxhzaokuangzheng_thumb.gif',datatxt:'[躁狂症]',type:'spray'},
		{images:'lxhshuaishuaishou_thumb.gif',datatxt:'[甩甩手]',type:'spray'},
		{images:'lxhqiaoqiao_thumb.gif',datatxt:'[瞧瞧]',type:'spray'},
		{images:'lxhtongyi_thumb.gif',datatxt:'[同意]',type:'spray'},
		{images:'lxhheduole_thumb.gif',datatxt:'[喝多了]',type:'spray'},
		{images:'lxhlalalala_thumb.gif',datatxt:'[啦啦啦]',type:'spray'},
		{images:'lxhdaigan_thumb.gif',datatxt:'[带感]',type:'spray'},
		{images:'lxhblowakiss_thumb.gif',datatxt:'[亲一口]',type:'spray'},
		{images:'lxhxiangyixiang_thumb.gif',datatxt:'[想一想]',type:'spray'},
		{images:'lxhjiayou_thumb.gif',datatxt:'[加油]',type:'spray'},
		{images:'lxhkunsile_thumb.gif',datatxt:'[困死了]',type:'spray'},
		{images:'lxhyouyali_thumb.gif',datatxt:'[有压力]',type:'spray'},
		{images:'lxhhaobang_thumb.gif',datatxt:'[好棒]',type:'spray'},
		{images:'lxhhuxiangmobai_thumb.gif',datatxt:'[互相膜拜]',type:'spray'},
		{images:'lxhbeidian_thumb.gif',datatxt:'[被电]',type:'spray'},
		{images:'gangnamstyle_thumb.gif',datatxt:'[江南style]',type:'spray'},
		{images:'lxhniu_thumb.gif',datatxt:'[牛B]',type:'spray'},
		{images:'lxhrose_thumb.gif',datatxt:'[玫瑰]',type:'spray'},
		{images:'lxhzan_thumb.gif',datatxt:'[xh赞]',type:'spray'},
		{images:'lxhtuijian_thumb.gif',datatxt:'[推荐]',type:'spray'},
		{images:'lxhdese_thumb.gif',datatxt:'[xh得瑟]',type:'spray'},
		{images:'lxhjidong_thumb.gif',datatxt:'[xh激动]',type:'spray'},
		{images:'lxhtuxue_thumb.gif',datatxt:'[xh吐血]',type:'spray'},
		{images:'lxhjinyuanbao_thumb.gif',datatxt:'[金元宝]',type:'spray'},
		{images:'lxhjiekexun_thumb.gif',datatxt:'[杰克逊]',type:'spray'},
		{images:'lxhpaizhuan_thumb.gif',datatxt:'[拍砖]',type:'spray'},
		{images:'lxhlonely_thumb.gif',datatxt:'[没人疼]',type:'spray'},
		{images:'zouni_thumb.gif',datatxt:'[走你]',type:'spray'},
		{images:'lxhzaokuangzheng_thumb.gif',datatxt:'[xh躁狂症]',type:'spray'},
		{images:'lxhluguo_thumb.gif',datatxt:'[xh路过]',type:'spray'},
		{images:'gangnamstyle_thumb.gif',datatxt:'[江南sty]',type:'spray'}
	]
}

export default Constants;

