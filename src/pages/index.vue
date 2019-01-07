<template>
	<div id="home" :style="allheigth">
		<HeaderComponent></HeaderComponent>
		<LeftComponent :heigth="heigth" :numberHeigth="numberHeigth"></LeftComponent>
		<RightComponent :heigth="liveHeigth"></RightComponent>
    <PrivateChatList></PrivateChatList>
	  <!-- <div class="contxt-right">
      大家啊上看到
	  </div> -->
		<div class="contxt-central">
			<div class="tips-div">
				<div class="tips">
					<div class="title">公 告</div>
					<div class="txt">
						<div id="marquee1">
							<marquee direction="left" onmouseover="this.stop()" onmouseout="this.start()">
								<ul>
									<li>
										<span style="color:#FFFF66;" v-for="item in topNoticeList">{{item}}</span>
									</li>
								</ul>
							</marquee>
						</div>
					</div>
				</div>
				<div class="tips-right">
					<div class="btns">
						<a href="javascript:;" @click="clearMessage">
							<span class="clear">清屏</span>
						</a>
						<a href="javascript:;" @click="scrollClick">
							<span class="scroll" :class="isScroll?'':'noscroll'">滚动</span>
						</a>
					</div>
				</div>
			</div>
			<!--聊天消息内容区-->
			<div class="msg-box" :style="'height:'+msgHeigth+'px'">
				<div class="red-context">
					<div class="plugs hongbao" @click="plugsRedOpen">
						<div class="plugs-ico">
							<img :src="imgUrl+'images/hongbao.png'" style="width:50px" title="红包">
						</div>
						<div class="plugs-txt">红包</div>
					</div>
					<!-- <div class="plugs qiandao" @click="OpenRedList">
						<div class="plugs-ico">
							<img :src="imgUrl+'images/slidehongbao.png'" title="签到">
						</div>
					</div> -->
            <div class="aite "  @click="goAnchor()"  v-if="isAiTeMe && aiTeMe >0" >
                  <div class="aitewo">
                        {{aiTeMe}}
                      人@我 </div>
                </div>
				</div>

				<el-scrollbar id="messageScroll" :native="false" :wrap-style="sHeigth">
					<div id="msgcon" class="message-context">
						<div @click="getMessageHistory" class="view-more-records"><a class="more-message" page="1">查看更多消息</a></div>
						<div class="history-hr-wrap">
							<div class="history-hr"></div>
							<div class="history-hr-text">以上是历史消息</div>
						</div>
						<!--消息模块-->
						<template v-for="(msg,index) in messageList">
							<div class="message-wrap" v-if="msg.type=='red' ">
								<div class="redbag-info1">
									<p style="color:#333;">{{msg.grabnickname}} 领取了 <span style="color:red;">{{msg.nickname}}</span> 的红包获得 <span style="color:red;">{{msg.context.amount||msg.context}}元</span></p>
								</div>
								<div class="clear"></div>
							</div>
							<template v-if="msg.type=='message'">
                <!-- 系统消息 -->
								<div :id="[msg.isAiTeMeMsg?('anchor-'+msg.time):'' ]" v-if="msg.mtype === 'user'&&!switcher" class="chat-item notmine " :class="[msg.mtype=='customer'?'teacher':'',msg.mtype=='system'?'system':'',msg.mtype=='customer'?'customer':'',msg.mtype=='redpacket'?'redpacket':'']">
									<!-- 图片消息 -->

                  <div class="user-img" @dblclick="noticeTo(msg.nickname,msg.mtype)" title="双击@他">
										<div class="uimg" >
                      <img :src="imgUrl+'images/avatar/'+msg.avatar" >

                    </div>
										<div class="gimg">

										</div>
									</div>
                  <!-- 红包消息 撤回消息 -->
									<div class="chat-info">
										<div class="chat-info-1">
                     <img v-if=" msg.flag == 2" :src="imgUrl+'images/grade/kefu_logo.png'" class="grade_type" style="width:60px ;border-radius: 12px;">
                      <img v-if="msg.mtype == 'customer'" :src="imgUrl+'images/grade/kefu_logo.png'" class="grade_type" style="width:60px ;border-radius: 12px;">
                      <img v-if="msg.grade&&msg.flag == 1" :src="imgUrl+'images/grade/'+msg.grade+'.png'" class="grade_type" style="width:60px">
                      <img v-if="msg.user_degree&&msg.flag == 1" :src="imgUrl+'images/grade/'+msg.user_degree+'.png'" class="grade_type" style="width:60px">

											<span class="chat-name">{{msg.nickname}}</span>
											<span class="chat-time">{{msg.time|dateFormat('hh:mm:ss')}}</span>
										</div>
											<div class="chat-info-2" v-if="msg.mtype=='redpacket'">
											<div class="chat-msg">
												<div class="redbag-top" @click="GrabRedClick(msg.context.redpacketid,msg.context.remarks)">
													<div class="f-left">
														<img :src="imgUrl+'images/hongbao.png'" class="hongbao"  style="margin-top: 3px; width:70px" >
													</div>
													<div class="f-left ml10" style="color:#fff;">
														<p>{{msg.context.remarks?msg.context.remarks:'恭喜发财,大吉大利！'}}</p>领取红包
													</div>
												</div>
												<div class="redtitle">直播室红包</div>
												</div>
											</div>
											<div class="chat-info-2" v-if="(msg.mtype === 'customer')||(msg.mtype === 'system')">
												<div class="chat-msg" v-html="isObject(msg.context)?msg.context.msg:msg.context"   >

												</div>
											</div>
											  <div
                      @contextmenu.prevent="openMenu(msg, $event, index)"
                      class="chat-info-2" v-if="msg.mtype === 'user' ">
                        <div
													v-if="cachito === index && visible"
													style="background: rgba(0, 0, 0, .8);
													z-index: 1001;
													cursor: pointer;
													position: absolute; width: 100px; height: 40px; display: flex; border-radius: 5px;"
													class="contextmenu" >
													<template>
														<div
														@click="deleteMessage"
														style="text-align: center; width: 100px; display: flex; margin-top: 10px;" :style="'left:'+left+'px'" class="li">
															<div class="icon">
																<Icon
																style="color: #fff; font-size: 20px;"
																type="ios-undo-outline" />
															</div>
															<span
															style="color: #fff; font-size: 12px; line-height: 20px;"
															>撤回本条消息</span>
														</div>
													</template>
												</div>
												<div
													v-if="!msg.context.id" class="chat-msg"
													v-html="isObject(msg.context)?msg.context.msg:msg.context"

													>
												</div>


                        <!-- 显示隐藏图片 -->
                            <div  v-show="false">
                              <img src="../../static/images/avatar/16.gif" alt="">
                            </div>
                            	<div v-if="msg.context.id === 1" class="chat-msg"  	v-html="isObject(msg.context)?msg.context.msg:msg.context"   @click='openimage(msg.context.msg)' >
													<!-- <img :src="msg.context.msg" alt=""> -->
												      </div>


											</div>
									</div>
								</div>
                <!-- 用户消息 -->
								<div :id="[msg.isAiTeMeMsg?('anchor-'+msg.time):'' ]" v-if="msg.mtype !== 'user'" class="chat-item notmine " :class="[msg.mtype=='customer'?'teacher':'',msg.mtype=='system'?'system':'',msg.mtype=='customer'?'customer':'',msg.mtype=='redpacket'?'redpacket':'']">
									<!-- 用户图片消息 -->
                  <div class="user-img" title="双击@他" @dblclick="noticeTo(msg.nickname,msg.mtype)">
										<div class="uimg"  >
                      <img v-if="msg.flag" :src="imgUrl+'images/avatar/kefu.png'">
                      <img v-if="!msg.flag"  :src="imgUrl+'images/avatar/'+msg.avatar">

                      </div>
                      <!-- 下图标 -->
										<!-- <div class="gimg">
											<img v-if="msg.grade && msg.flag == 1" :src="imgUrl+'images/grade/'+msg.grade+'.png'" class="grade_type">
											<img v-else :src="imgUrl+'images/role/2.png'" class="kefu">
										</div> -->
									</div>

									<div class="chat-info">
										<div class="chat-info-1">
                      <!-- 客服消息区 -->
                        <img v-if="msg.flag == 2" :src="imgUrl+'images/grade/kefu_logo.png'" class="grade_type" style="width:60px ;border-radius: 12px;">
                        <img v-else src="" class="grade_type" style="width:60px">
											<span class="chat-name">{{msg.nickname}}</span>
                      <!-- <img v-if="item.flag==2" :src="imgUrl+'images/avatar/kefu.png'" border="0" class="head"> -->

                        <!-- {{msg.grade}}{{msg.flag}} -->
                    		<!-- <img v-if="msg.grade && msg.flag == 2" :src="imgUrl+'images/grade/'+msg.grade+'.png'" class="grade_type" style="width:60px"> -->
											<!-- <img  :src="imgUrl+'images/role/'+msg.avatar"  style="width:24px"> -->
											<span class="chat-time">{{msg.time|dateFormat('hh:mm:ss')}} </span>
										</div>
											<div class="chat-info-2" v-if="msg.mtype=='redpacket'">
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
											</div>
                      <!-- <div class="chat-info-2" v-if="(msg.mtype ==='manage')||(msg.mtype === 'system')">
												<div class="chat-msg" v-html="isObject(msg.context)?msg.context.msg:msg.context">
                            {{msg.context}}
												</div>
											</div> -->
											<div class="chat-info-2" v-if="(msg.mtype ==='customer')||(msg.mtype === 'system') || (msg.mtype ==='manage')">
												<div class="chat-msg"
                        v-html="isObject(msg.context)?msg.context.msg:msg.context"
                         v-if="msg.context.id !== 1 "
                          @contextmenu.prevent="openMenu(msg, $event, index)"
                         >
												</div>
                        <div
                              :style="'left:'+left+'px'"
                               v-if="cachito === index && visible && isMe"
                              style="background: rgba(0, 0, 0, .8);
                              z-index: 9999;
                              cursor: pointer;
                              position: absolute; width: 100px; height: 40px; display: flex; border-radius: 5px;"
                              class="contextmenu"  >
													<template>
														<div
														@click="deleteMessage"
														style="text-align: center; width: 100px; display: flex; margin-top: 10px;"  class="li">
															<div class="icon">
																<Icon
																style="color: #fff; font-size: 20px;"
																type="ios-undo-outline" />
															</div>
															<span
															style="color: #fff; font-size: 12px; line-height: 20px;"
															>撤回本条消息</span>
														</div>
													</template>
												</div>
                        <div class="chat-msg"
                        v-html="isObject(msg.context)?msg.context.msg:msg.context" v-if="msg.context.id == 1"
                         @click='openimage(msg.context.msg)' >
												</div>
											</div>
											<div class="chat-info-2"
                         @contextmenu.prevent="openMenu(msg, $event, index)"
                          v-if="msg.mtype === 'user'">
                          <div
                              :style="'left:'+left+'px'"
                              v-if="cachito === index && visible"
                              style="background: rgba(0, 0, 0, .8);
                              z-index: 1001;
                              cursor: pointer;
                              position: absolute; width: 100px; height: 40px; display: flex; border-radius: 5px;"
                              class="contextmenu"  >
													<template>
														<div
														@click="deleteMessage"
														style="text-align: center; width: 100px; display: flex; margin-top: 10px;"  class="li">
															<div class="icon">
																<Icon
																style="color: #fff; font-size: 20px;"
																type="ios-undo-outline" />
															</div>
															<span
															style="color: #fff; font-size: 12px; line-height: 20px;"
															>撤回本条消息</span>
														</div>
													</template>
												</div>
                        <div>{{msg.context}} </div>
                       	<div
													v-if="!msg.context.id" class="chat-msg"
													v-html="isObject(msg.context)?msg.context.msg:msg.context"
                           @click='openimage(msg.context.msg)'
													>
												</div>
												<div v-if="msg.context.id == 1" class="chat-msgs" v-html="isObject(msg.context)?msg.context.msg:msg.context"  @click='openimage(msg.context.msg)' >


												</div>
											</div>
									</div>
								</div>
							</template>

						</template>

					</div>
				</el-scrollbar>
			</div>
			<div class="message-control">
				<div class="notice">
					<div class="title">
						<font-awesome-icon icon="volume-up"/>
					</div>
					<div class="txt">
						<div class="swiper-container" id="marquee2">
							<div class="swiper-wrapper" @mouseenter="stopSwiper('notice')" @mouseleave="startSwiper('notice')">
								<div class="swiper-slide cursor" v-for="item in buttomNoticeList">
									{{item}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="servicebtns">
					<a v-for="item in customerList" class="btn" :class="[item.type=='customer'?'c1':'c2 flash1']"  :href="'http://wpa.qq.com/msgrd?v=3&uin='+item.qq+'&site=qq&menu=yes'" target="_blank" >
						<i v-if="item.type=='customer'"><font-awesome-icon icon="coffee"/></i>
						<i v-else><font-awesome-icon icon="dollar-sign"/></i>
						{{item.name}}
					</a>
				</div>
        <!-- //表情功能 -->
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
							<a href="javascript:void(0)" class="btn b6" title="动态表情" @click="FaceOpenClick"></a>
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
                      @imageuploaded="uploadImgSuccess"
                      @errorhandle="uploadImgError"
                      :text="''"
                      :headers="{token:uploadImgToken}"
                      :maxFileSize="2048000"
                      :inputAccept="'image/*'"
                      :extensions="'png,jpg,gif'"
                      url="http://api.8582333.com/api/upload">
                      <a href="javascript:void(0)" class="btn b5" title="上传图片"></a>
                  </vue-core-image-upload>
                </div>

            </template>
					</div>

					<div style="margin-left: 20px">
						<i-switch
							v-model="switcher"
							@on-change="switchUserInfo"
							size="small">
							<span style="font-size: 12px;position: absolute;left: -7px;" slot="open"></span>
							<span style="font-size: 12px;position: absolute;left: -8px;" slot="close"></span>
						</i-switch>
						<div style="float: right;margin-left: 10px" class="txt">
							只看管理员
						</div>
					</div>
				</div>
				<div class="msssage-ctl">
					<Editdiv @childEmit="sendClick" v-model="message" id="publicChat" ref="chatItem"></Editdiv>
					<div title="可直接使用Enter回车发送消息，换行使用shift+Enter" class="sendBtn" @click="sendClick"><Icon type="ios-send"/>发送</div>
				</div>
			</div>
		</div>
		<Modal class="tips-modal" :mask="false" v-model="tipsModal" footer-hide width='600px'>
			<div class="alertmsg">
				您已在直播室收听5分钟，赶紧领取会员或VIP马甲，点击下方注册会员或联系上方QQ在线客服，即刻享受更多优质服务。
			</div>
			<div class="buttons">
				<a class="reg" href="javascript:;">注册</a>
				<a class="login" href="javascript:;" @click="TipsClickLogin">登录</a>
			</div>
		</Modal>
		<Modal class="red-modal" :mask="false" v-model="redModal" footer-hide width='415px'>
			<div class="buttons">
				<div class="setred" @click="sendRedClick">发红包</div>
				<div class="myred" @click="MyRedClick(2)">我的红包</div>
			</div>
		</Modal>
		<Modal class="signin-modal" @on-cancel="closeSigninModel" v-model="signinModal" footer-hide>
			<div slot="header">
	          <span class="header-inner">{{signinTitle}}</span>
	          <span v-if="isSignin" class="ok">[已签到]</span>
	          <span class="no" v-else>[未签到]</span>
	          <span slot="close" class="close" @click="closeSigninModel"></span>
	        </div>
			<Signin :isSignin="isSignin"></Signin>
		</Modal>
		<Modal class="send-red-modal" v-model="sendRedModal" footer-hide width='347px'>
			<div class="envelopeBody">
        <div></div>
				<Form :model="formRed" label-position="right" :label-width="60">
          <div style="text-align:center; font-size:16px" v-if="isPrivateRed">发给{{PrivateRedInfo.tousernickname}}</div>
					<FormItem label="金额：">
			            <InputNumber v-model="formRed.amount" placeholder="请填写红包金额" style="width: 200px;" :min="1" :max="balance"></InputNumber> 元
			        </FormItem>
			        <FormItem label="个数：" v-if="!isPrivateRed">
			            <InputNumber v-model="formRed.count" placeholder="请填写红包个数" style="width: 200px;" :min="1" :max="100"></InputNumber> 个
			        </FormItem>
              <FormItem label="个数：" v-if="isPrivateRed">
			            <InputNumber v-model="privateCount" placeholder="请填写红包个数" style="width: 200px;" :min="1" :max="1"></InputNumber> 个
			        </FormItem>
			        <FormItem label="备注：" v-if="myFlag == '1' || myFlag == '3' " >
			        	<Input v-model="formRed.remark" type="textarea" readonly="readonly"  ref="beizhu" :autosize="{minRows: 2,maxRows: 5}" placeholder="恭喜发财,大吉大利" ></Input>
					</FormItem>
          <FormItem label="备注：" v-if="myFlag == '2' ">
			        	<Input v-model="formRed.remark" type="textarea"   ref="beizhu" :autosize="{minRows: 2,maxRows: 5}" placeholder="恭喜发财,大吉大利" ></Input>
					</FormItem>
				</Form>
				<div class="conter">
					<p class="p2">￥{{balance|toFixed(2)}}</p>
				</div>
				<div class="conter" style="margin-top: 0px;">
					<p class="p1">余额￥<span>{{balance|toFixed(2)}}</span>元</p>
				</div>
				<div class="conter">
					<Button v-if="!isPrivateRed" type="error" @click="snedRedSubmit" :loading="sendRedLoading">发红包</Button>
          <Button v-if="isPrivateRed" type="error" @click="privateRedSubmit(PrivateRedInfo.touserid)" :loading="sendRedLoading">发红包</Button>
				</div>
			</div>
		</Modal>

    <!-- 图片显示 -->
    <Modal  class="openimage1" v-model="openImage" footer-hide :width="imgSize">
        <div ref ="get" v-html='showimage'></div>
    </Modal>
		<Modal  class="grab-red-modal" v-model="grabRedModal" footer-hide width='314px' @on-cancel="closeGrabRedModal">
			<div v-if="grabIn == 1">
				<p class="p1">{{redItem.remarks?redItem.remarks:'恭喜发财,大吉大利'}}</p>
				<div class="grab-btn">
					<Button shape="circle" @click="openRedSubmit">马上抢</Button>
				</div>
			</div>
			<div v-if="grabIn == 2">
				<div class="img"><img :src="imgUrl+'images/avatar/'+redData.redpackInfo.sendeHeadImage" width="60" height="60"></div>
				<p class="p2">{{redData.redpackInfo.senderName}}</p>
				<p class="memos">手慢了，红包派完了！</p>
				<div class="minebag lookthisbag" @click="openAll">看看大家的手气&gt;&gt;</div>
			</div>
			<div v-if="grabIn == 3">
				<div class="img"><img :src="imgUrl+'images/avatar/'+redData.redpackInfo.sendeHeadImage" width="60" height="60"></div>
				<p class="p2">{{redData.redpackInfo.senderName}}</p>
				<p class="memos">恭喜您抢到<span class="s1">{{grabMoney|toFixed(2)}}</span>元红包！</p>
				<div class="minebag lookthisbag" @click="openAll">看看大家的手气&gt;&gt;</div>
			</div>
		</Modal>
		<Modal v-model="redInfoModal" footer-hide width='347px' :class="redRecordType !== 3?'red-info-modal':'red-info-modal1'">
			<div v-if="redRecordType == 1">
				<div class="img"><img :src="imgUrl+'images/avatar/'+redData.redpackInfo.sendeHeadImage" width="65" height="65"></div>
				<p class="p1">{{redData.redpackInfo.name}}</p>
				<p class="p2">{{redData.redpackInfo.remarks}}</p>
				<div class="money bagred">{{redData.redpackInfo.amount|toFixed(2)}}<span style="color:#333;font-size: 14px;">元</span></div>
				<p class="baginformation" >已领取{{redData.redpackInfo.receivedNum}}/{{redData.redpackInfo.num}}个</p>
				<!-- ，{{redData.redpackInfo.amount|toFixed(2)}}元红包已领20.00元， -->
				<div class="redlist">
					<el-scrollbar id="redRecordScroll" :native="false" wrap-style="max-height:220px;">
						<div class="list-info" v-for="item in redRecord">
							<div class="user-img">
								<img :src="imgUrl+'images/avatar/'+item.avatar" width="35" height="35">
							</div>
							<div class="list-right">
								<div class="list-right-top">
									<div class="user-name">{{item.nickname}}</div>
									<div class="user-money">{{item.money}}元</div>
								</div>
								<div class="user-time">{{item.time|dateFormat('yyyy-MM-dd hh:mm:ss')}}</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
				<div class="minebag1 lookthisbag" @click="MyRedClick(2)">查看我的钱包&gt;&gt;</div>


			</div>
       <div  v-if='redRecordType ==3' class='pagetransfer' v-cloak>
        <div>
          <img src="../assets/images/login-logo.png" alt="">
        </div>
        <div><span style="color:  #888888 ;">到账平台</span></div>
        <div class='transfer'>
          <div>
            <span style="color: #444444 ; font-family: Adobe Heiti Std R;">转账金额<em>（最低100元）</em></span>
          </div>
          <div><InputNumber v-model="alltransfervalue"  placeholder=""  :min="0" :max="myRedRecord.accountBalance" class="inputnumber" ></InputNumber>
          <hr style="border: none; border-bottom: 1px rgba(219,219,219,1) solid; position: relative; top: -23px;">
          </div>
          <div>
            <span>余额为 : <em>{{myRedRecord.accountBalance|toFixed(2)}}</em>,<button @click="alltransfer" >全部提现</button></span>
          </div>
        </div>
        <div class='confirm'>
          <div @click="confirmtransfer">确认转账</div>
        </div>
      </div>
			<div v-if="redRecordType == 2">
				<div class="img"><img :src="imgUrl+'images/avatar/'+userObj.headimage" width="65" height="65"></div>
				<div class="money bagred"><span class="s1">余额</span><span>{{myRedRecord.accountBalance|toFixed(2)}}</span><span style="color:#333;font-size:14px;">元</span></div>
				<div class="redlist myRedlist">
					<el-scrollbar id="myredRecordScroll" :native="false" wrap-style="max-height:275px;">
						<div class="list-info" v-for="item in myRedRecord.redpackList">
							<div class="user-img">
								<img :src="imgUrl+'images/avatar/'+item.senderHeadImage" width="35" height="35">
							</div>
							<div class="list-right">
								<div class="list-right-top">
									<div class="user-name">{{item.senderName}}</div>
									<div class="user-money">{{item.money}}元</div>
								</div>
								<div class="user-time">{{item.receiveTime|dateFormat('yyyy-MM-dd hh:mm:ss')}}</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
		</Modal>
		<PrivateChat></PrivateChat>
    <Notice></Notice>
	</div>
</template>

<script>
	import '@/assets/css/scrollbar.less'
	import {Modal} from 'iview'
  import HeaderComponent from '@/components/header.vue'
	import LeftComponent from '@/components/left.vue'
  import RightComponent from '@/components/right.vue'
  import PrivateChatList from '@/components/privateChatList.vue'
	import Editdiv from '@/components/editdiv.vue'
  import Face from '@/components/face.vue'
  import Emogis from '@/components/emogis.vue'
	import Signin from '@/components/signin.vue'
	import PrivateChat from '@/components/privateChat.vue'
	import Swiper from 'swiper'
	import Constants from '@/utils/constants'
	import Common from '@/api/common'
	import Util from '@/utils/util'
	import SigninApi from '@/api/signin'
	import RedEnvelope from '@/api/redenvelope'
	import Emoji from '@/utils/dealemoji.js'
  import emojidatas from '@/assets/js/emojisdata.js'
  import emojidata from '@/assets/js/emojidata.js'
  import Cancle from '@/api/canclemsg'
  import VueCoreImageUpload  from 'vue-core-image-upload';
  import Notice from '@/components/notice.vue'

	export default{
		name: 'index',
		components:{
			HeaderComponent,
			LeftComponent,
			RightComponent,
			Editdiv,
      Face,
      Emogis,
			Signin,
      PrivateChat,
      PrivateChatList,
      'vue-core-image-upload': VueCoreImageUpload,
      Notice,
		},
		data(){
			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			return {
        imgSize: '300px',
         value4: false,
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
        transferRedLoading:false,
        alltransfervalue:0.00,
        privateCount: 1 ,
        showimage:'',
        isMe:false,
        openImage:false,
        showcehui:false,
        pro:true,
        visible: false,
				delectItem: null,
				cachito: Number,
        switcher: false,
        pWidth:'',
        pHeight:'',
				imgCon: 300,
				imgUri: '',
				imgList: [],
				chatUrl:Constants.chatUrl,
				imgUrl:Constants.staticUrl,
				heigth:'height: 400px',
				numberHeigth:0,
				allheigth:'',
				liveHeigth:'',
				msgHeigth:0,
				sHeigth:'max-height: '+(scrollHeight-303)+'px;',
				isScroll:true,
				noticeSwiper:null,
				messageList:[

        ],
        aiTeMeList:[],
				message:null,
				userObj:null,
        visibleFace:false,
        visibleFaces:false,
				tipsModal:false,
        redModal:false,
        redListModal:false,
        isPrivateRed:false,
        PrivateRedInfo:{

        },
				topNoticeList:[],
				buttomNoticeList:[],
				signinModal:false,
				signinTitle:null,
				isSignin:false,
				customerList:[],
				sendRedModal:false,
				formRed:{
					amount:0,
					count:1,
					remark:'恭喜发财,大吉大利！'
				},
				balance:0.00,
				sendRedLoading:false,
				grabLoading:false,
				grabRedModal:false,
				grabIn:1,
				grabMoney:0.00,
				redItem:{
					remarks:'恭喜发财,大吉大利！'
				},
				redData:{
					redpackInfo:{}
        },
        holder:'恭喜发财,大吉大利！',
				messageId:null,
				isSendMessage:false,
        redInfoModal:false,
        ProhibitMessageModal:false,
				redRecord:[],
				myRedRecord:{
				},
				myRedLoading:false,
				redRecordType:1,
				isNumbersInfo: !false,
			}
		},

		computed:{
			uploadImgToken() {
        return this.$store.state.token
      },
  		},
  		watch:{
        visible(value) {
		      if (value) {
		        document.body.addEventListener('click', this.closeMenu)
		      } else {
				this.isPreventChat = false;
		        document.body.removeEventListener('click', this.closeMenu)
		      }
		    },
  			'$store.state.userInfo'(val){//监听用户信息事件
  				this.userObj = this.$store.state.userInfo;
  			},
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
        //用户是否登录


		},
		created() {
			this.getMessageHistory();
		},
		mounted(){
      this.myFlag = this.$store.state.userInfo.userflag;
			this.imgCon = (window.innerWidth-1000)>=0?window.innerWidth-1000:360;
			var that = this;
			this.initHeigth();
			this.resizeEvent();
			this.initSwiper();
      this.getNotice();

			this.getCustomerInfo();
			this.$nextTick(()=> {
				this.scrollToBottom();
      });

			this.$root.eventHub.$on("ReceiveMessageEvent",item=>{
		      	that.messageList.push(item);
		      	if(that.isScroll){
		      		setTimeout(()=>{
		      			that.scrollToBottom();
		      		},200);
          }
          if(item.isAiTeMeMsg == true) {
             this.pushAiTeMe(item.context.msg,item.time);
          }

      });
        this.$root.eventHub.$on("CancleMessageEvent", item => {
          for(let i=0; i<this.messageList.length; i++) {
            if(this.messageList[i].msgid === item.msgid) {
              this.messageList.splice(i, 1)
            }
          }
        })
		    //签到事件发布
		    this.$root.eventHub.$on("signinEvent",item=>{
		      that.isSignin = item;
		    });
		    //发送消息完成事件发布
		    this.$root.eventHub.$on("sendMessageCompleteEvent",item=>{
		    	that.messageId = null;
		    	that.message = null;
		    	that.isSendMessage = false;
		    	that.$root.eventHub.$emit("clearDivEvent","publicChat");
		    });
		    //签到成功发布事件
		    this.$root.eventHub.$on("signinSuccessEvent",item=>{
		    	that.message = '[<b>每日一签</b>] 连续签到 <font style="color:red">1</font> 天,今日签到获得<font style="color:red">100</font>金币';
		    	that.sendClick();
        });
        this.$root.eventHub.$on("transfermoney",item => {
          that.MyRedClick(item);
        })
		},
		methods:{
        pushAiTeMe(item,msgTime) {
            this.aiTeMeList.push(msgTime)
            this.aiTeMe += 1
            this.isAiTeMe = true ;
        },
        aiteMe(msg){
        },
        goAnchor() {
          if(this.aiTeMeList.length>0) {
             let isAiTeMeList = this.messageList
            var  aimeList = this.aiTeMeList
            var selector = aimeList[aimeList.length - 1]
            var selectors = '#anchor-'+selector
           if(selectors) {
                 var anchor = this.$el.querySelector(selectors)
                 if(anchor) {
                       document.querySelector("#messageScroll").scrollTop = anchor.offsetTop;
                 }
                   this.aiTeMeList.pop();
                    this.aiTeMe -= 1
                    this.isScroll = false
                    	setTimeout(()=>{
                        this.isScroll = true
                      },10000);

           }
          }

        },
       confirmtransfer(){
        var that=this;
				if(this.alltransfervalue < 100){
					this.$toast.center('提现金额不能小于100元！','center');
					return;
				} else if(this.alltransfervalue > this.myRedRecord.accountBalance) {
					this.$toast.center('提现金额不能大于账户余额！','center');
					return;
        }
        if(this.transferRedLoading){
					return;
				}
				this.transferRedLoading = true;
        var params = {
          amount:parseFloat(this.alltransfervalue),
        }
          RedEnvelope.transfer(params).then ( res => {
            that.redInfoModal = false;
            that.transferRedLoading = false;
				}).catch(error =>{
					 that.transferRedLoading = false;
          })
      },
      alltransfer() {
        this.alltransfervalue=this.myRedRecord.accountBalance;
      },
      noticeTo(name,type){
        if(type == 'manage' || type == 'system') {
          return
        }else if(name== this.$store.state.userInfo.nickname ) {
           return
        }
        else {
          let noticeto = '@'+name
          if(this.message == null) {
            this.message = '';
            this.message += noticeto+'&nbsp'

          }else {
             this.message += noticeto+'&nbsp'
          }
        }

      },
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
            console.log(this.width);

          };
        };

      },
       openimage(val) {
           var that = this
           var newval=val.replace(/\?.*/,'">')
              this.showimage=newval;
              this.$nextTick(()=> {
                  that.$refs.get.firstChild.onload = function () {
                  that.imgSize = that.$refs.get.firstChild.naturalWidth +50;
                  that.openImage=true ;
                  }
              });
       },

      closeMenu() {
				this.visible = false;
      },
      // 图片放大缩小
      showImgDetail() {

      },
      //撤回消息
			deleteMessage() {
				let data = {
					msgid: this.delectItem.msgid,
					type: this.delectItem.type,
					mtype: this.delectItem.mtype,
					fromuserid: this.delectItem.userid,
					fromnickname: this.delectItem.nickname,
					fromuserheadimage: this.delectItem.avatar,
					fromuseruserflag: this.delectItem.flag,
					fromuseruserdegree: this.delectItem.user_degree,
					touserid: this.delectItem.touserid,
					tousernickname: this.delectItem.tousernickname,
					touserheadimage: this.delectItem.touserheadimage,
					msgtime: this.delectItem.time,
					content: this.delectItem.context
				}
				Cancle(data).then(
					res => {

					}
				)
				this.visible = false;
			},
			openMenu(item, e, index) {
        this.cachito = index;
				this.delectItem = item;
				let tip = this.$store.state.userInfo.userflag;
				if(item.userid == this.$store.state.userInfo.userid){
					this.isMe = true;
				}else{
					this.isMe = false;
        }

        this.visible = true;

        this.selectedMenu = item;
				const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
			    this.left = e.pageX -300; // 15: margin right
           this.top = e.pageY + 15;



			},
			switchUserInfo() {
			},
			isObject(val) {
				if(typeof val === 'object') {
					return true
				} else {
					return false
				}
      },
      //获取历史消息
		  getMessageHistory() {
        let time = new Date().getTime();
        let that = this ;

				if(this.messageList.length !== 0) {
					time = this.messageList[0].msgtime?this.messageList[0].msgtime:this.messageList[0].time+''
			}
				RedEnvelope.getHistory(time).then(
					res => {

						let data = res.data.reverse();

						for(let i=0;i<data.length;i++) {
              let buf = {};
              buf.touserid = data[i].touserid,
					    buf.tousernickname = data[i].tousernickname,
					    buf.touserheadimage = data[i].touserheadimage,
							buf.msgid = data[i].msgid,
							buf.grabnickname = data[i].grabnickname;
							buf.avatar = data[i].fromuserheadimage;
							buf.context = data[i].content;
							buf.flag = data[i].fromuseruserflag;
							buf.type = data[i].type;
							buf.mtype = data[i].mtype;
							buf.nickname = data[i].fromnickname;
							buf.time = data[i].msgtime;
							buf.userid = data[i].fromuserid;
							buf.user_degree = data[i].fromuseruserdegree;
							if(data[i].type === 'message'&&(data[i].mtype === 'user')) {
								if(data[i].content.msg.length < 100) {
									let firstDeal = Emoji(data[i].content.msg);
                  	if(data[i].content.id-0 === 1) {
										data[i].content.msg = '<img src="http://' +  data[i].content.msg + '?imageView2/2/w/340">';
									}
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
                       buf.context.msg = emojiMsg;
                    }
								}
              }
							if(data[i].type === 'message'&&(data[i].mtype === 'manage')) {
								if(data[i].content.msg.length < 100) {
									let firstDeal = Emoji(data[i].content.msg);
		      	    if(data[i].content.id-0 === 1) {
										data[i].content.msg = '<img src="http://' + data[i].content.msg + '?imageView2/2/w/340">';
									}
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
                       buf.context.msg = emojiMsg;
                    }
								}
              };
              if(data[i].type === 'message'&&(data[i].mtype === 'customer')) {
								if(data[i].content.msg.length < 100) {
									let firstDeal = Emoji(data[i].content.msg);
	          if(data[i].content.id-0 === 1) {
										data[i].content.msg = '<img src="http://' +  data[i].content.msg + '?imageView2/2/w/340">';
									}
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
                       buf.context.msg = emojiMsg;
                    }
								}
							}
              this.messageList.splice(0, 0, buf);
            }

						// this.messageList.splice(0);
					}
				)
			},
			readyGetRedPackage() {
				this.grabIn = 3;
			},
			clearMessage(){
				this.messageList = [];
			},
			uploadImgOverflow(err) {
				Modal.error({
					title: '错误提示',
					content: '文件大小超过限制，请重新选择！'
				})
			},
			uploadImgError(err) {
				Modal.error({
					title: '错误提示',
					content: '上传失败<br>' + err
				})
			},
			uploadImgSuccess(callbackData) {
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

			  let img = callbackData.url ; //+ '?imageView2/2/w/340'
					// this.imgUri = img;
					let jsonMsg = {
						type: 'message',
						mtype: 'user',
						fromuserid: this.userObj.userid,
						fromnickname: this.userObj.nickname,
						fromuserheadimage: this.userObj.headimage,
						fromuseruserdegree: this.userObj.userdegree,
						fromuseruserflag: this.userObj.userflag,
						touserid: '',
						tousernickname: '',
						content: {
							id: 1,
              msg: img,
              width:this.pWidth,
              height:this.pHeight
						}
					};
					if(this.userObj.userflag == 2) {//管理员
						jsonMsg.mtype = 'customer';
          }
          if(this.message) {
						this.message += img;
					} else {
						this.message = img
          }
					this.$root.sendToAll(jsonMsg);
           this.pro =false;
				}
			},
			scrollToBottom(){
				var div = document.getElementById('messageScroll')
             	div.scrollTop = div.scrollHeight;
			},
			scrollClick(){
				if(this.isScroll){
					this.isScroll = false;
				}else{
					this.isScroll = true;
				}
			},
			initSwiper(){
				var that = this;
	    		this.noticeSwiper = new Swiper("#marquee2",{
		    		loop:true,
		    		direction:'vertical',
			        autoplay:{
			        	delay:Constants.bannerAutoplay,
			        	disableOnInteraction:false
			        }
	    		});
			},
			stopSwiper(){
				if(this.noticeSwiper)this.noticeSwiper.autoplay.stop();
			},
			startSwiper(){
				if(this.noticeSwiper)this.noticeSwiper.autoplay.start();
			},
			initHeigth(){
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		        this.heigth = 'height:'+(scrollHeight-67)+'px';
		        this.allheigth = 'height:'+scrollHeight+'px';
		        this.liveHeigth = 'height:'+(scrollHeight-107)+'px';
		        this.msgHeigth = scrollHeight-303;
		        this.numberHeigth = scrollHeight-306;
			},
			resizeEvent(){
				window.addEventListener('resize',()=>{
		            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		            this.heigth = 'height:'+(scrollHeight-67)+'px';
		            this.allheigth = 'height:'+scrollHeight+'px';
		            this.liveHeigth = 'height:'+(scrollHeight-107)+'px';
		            this.msgHeigth = scrollHeight-303;
		            this.sHeigth = 'max-height: '+(scrollHeight-303)+'px;';
		            this.numberHeigth = scrollHeight-306;
				});
			},
			uploadImg(file){
				var grade = this.$store.state.userInfo.userdegree;
				var flag = this.$store.state.userInfo.userflag;
				if(flag == 1){
					if( grade < 3){
						this.$toast.center('没有图片上传权限！','center');
						return false;
					}
				}
				return true;
			},
			sendClick(){
				if(!this.$root.isSocketConnect){
					this.$Modal.error({
			            title: '错误提示',
			            content: '网络异常与服务器连接已断开。'
			        });
			        return;
				}
				if(this.message) {
					let text = this.message.replace(/&nbsp;/ig,'').trim();
					if(text.length === 0) {
						this.$toast.center('不能发送空白消息，请重新输入！','center');
						this.message = '';
						return
					}
        }

				if(Util.isNull(this.message)){
					this.$toast.center('发送内容不能为空，请输入！','center');
					return;
				}
				if(this.message.trim())
				var grade = this.$store.state.userInfo.userdegree;
				var flag = this.$store.state.userInfo.userflag;
				if(flag == 1){
          //发言权
					if( grade === 1 || grade === 0){
						this.$toast.center('没有发言权限！','center');
						return;
          } else if( grade>1)
          {

            let Maxtxt=this.message.replace(/<[^>]+>/g,"").length ;

						if((Maxtxt>40)==true){
              this.$toast.center('发送字数过长','center');
            return;
            }
					}
				}
				if(this.isSendMessage){
					return;
				}
				this.isSendMessage = true;
				var jsonMsg = {
					type:'message',
					mtype:'user',
					fromuserid:this.userObj.userid,
					fromnickname:this.userObj.nickname,
					fromuserheadimage:this.userObj.headimage,
					fromuseruserdegree:this.userObj.userdegree,
					fromuseruserflag:this.userObj.userflag,
					touserid:'',
					tousernickname:'',
					content:{
						id: 0,
						msg:this.message
					}
        };


				if(this.userObj.userflag == 2) {//管理员
          jsonMsg.mtype = 'customer';
				}
				this.$root.sendToAll(jsonMsg);
			},
			FlowerClick(){
				//插入玫瑰表情
				var flower = '<img src="'+this.imgUrl+'images/face/flower.gif" isface>';
				if(Util.isNull(this.message)){
					this.message =  flower;
				}else{
					this.message +=  flower;
				}
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'publicChat',
					message:that.message
				});
			},
			GoodClick(){
				var good = '<img src="'+this.imgUrl+'images/face/good.gif" isface>';
				if(Util.isNull(this.message)){
					this.message = good;
				}else{
					this.message += good;
				}
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'publicChat',
					message:that.message
				});
			},
			FaceBarClick(name){

				if(Util.isNull(this.message)) {
					this.message = ''
				}
				this.message += name;
				this.$root.eventHub.$emit("inputDivEvent",{
					id: 'publicChat',
					message: this.message
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
				if(Util.isNull(this.message)){
					this.message = facestr;
				}else{
					this.message += facestr;
				}
        this.visibleFace = false;

				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'publicChat',
					message:that.message
        });
        this.sendClick();
			},
			sprayFaceClick(val){
				var facestr = val.datatxt;
				if(Util.isNull(this.message)){
					this.message = facestr;
				}else{
					this.message += facestr;
				}
				this.visibleFace = false;
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'publicChat',
					message:that.message
        });

      },
      //动态表情
		  defaultEmogisClick(val){
				var facestr = val;
				if(Util.isNull(this.message)){
					this.message = facestr;
				}else{
					this.message += facestr;
				}
				this.visibleFaces = false;
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'publicChat',
					message:that.message
        });

			},
			sprayEmogisClick(val){
				var facestrs = val.datatxt;
				if(Util.isNull(this.message)){
					this.message = facestrs;
				}else{
					this.message += facestrs;
				}
				this.visibleFaces = false;
				var that = this;
				this.$root.eventHub.$emit("inputDivEvent",{
					id:'publicChat',
					message:that.message
        });

      },
			getNotice(){
				var that = this;
				Common.getNotice().then(response =>{
					let data = response.data;
					that.topNoticeList = data.top;
					that.buttomNoticeList = data.bottom;
				}).catch(error => {

				});
			},
			TipsClickLogin(){
				this.tipsModal = false;
				this.$root.eventHub.$emit("showLoginModelEvent");
      },

			plugsRedOpen(){
				if(!Constants.isLogin){
					this.$root.eventHub.$emit("showLoginModelEvent");
				}else{
           this.isPrivateRed = false;
					this.redModal = true;
				}

      },
      privateRedOpen(privateId){
				if(!Constants.isLogin){
					this.$root.eventHub.$emit("showLoginModelEvent");
				}else{
          this.isPrivateRed = true;
          this.PrivateRedInfo = this.$store.state.whomtochat
					this.redModal = true;
				}

			},
			getSystemTime(){
				var that = this;
				Common.getSystemTime().then(response =>{
					let data = response.data;
					that.signinTitle = Util.dateFormat(data.systemtime,'yyyy年MM月dd日');
					that.signinModal = true;
					that.$root.eventHub.$emit("showSigninModelEvent",data.systemtime);
				});
			},
			checkSigin(){//查询今天是否签到
				var that = this;
				SigninApi.checkSigin().then(response =>{
					let data = response.data;
					that.isSignin = data.isqiandao == 1 ? true : false;
				});
			},
			SigninModalOpen(){
				if(!Constants.isLogin){
					this.$root.eventHub.$emit("showLoginModelEvent");
				}else{
					this.getSystemTime();
					this.checkSigin();
				}

			},
			closeSigninModel(){
				this.$root.eventHub.$emit("closeSigninModelEvent");
			},
			getCustomerInfo(){
				var that = this;
				Common.getCustomerInfo().then(response =>{
          let data = response.data;
					data.customerqq.forEach(item =>{
						var d = item.split('@');
						var obj = {
							type:'customer',
							qq:d[0],
							name:d[1]
						};
						that.customerList.push(obj);
					});
					data.agentqq.forEach(item =>{
						var d = item.split('@');
						var obj = {
							type:'agent',
							qq:d[0],
							name:d[1]
						};
						that.customerList.push(obj);
					});
				});
			},
			sendRedClick(){
				var that = this;
				RedEnvelope.getBalance().then(response =>{
					let data = response.data;
					that.balance = data.money;
					that.redModal = false;
					that.sendRedModal = true;
				}).catch(error =>{
				})
			},
			snedRedSubmit(){
				var that = this;

				if(this.formRed.amount < 5){
					this.$toast.center('红包金额不能小于5元！','center');
					return;
				} else if(this.formRed.amount > this.balance) {
					this.$toast.center('红包金额不能大于账户余额！','center');
					return;
				}
				if(this.sendRedLoading){
					return;
				}
				this.sendRedLoading = true;
				var params = {
					num:this.formRed.count,
					amout:this.formRed.amount,
					remarks:this.formRed.remark
				}
				RedEnvelope.send(params).then(response =>{
					that.sendRedLoading = false;
					that.sendRedModal = false;
				}).catch(error =>{
					that.sendRedLoading = false;
				});
      },
      privateRedSubmit(privateRedId){
				var that = this;
				if(this.formRed.amount < 5){
					this.$toast.center('红包金额不能小于5元！','center');
					return;
				} else if(this.formRed.amount > this.balance) {
					this.$toast.center('红包金额不能大于账户余额！','center');
					return;
				}
				if(this.sendRedLoading){
					return;
				}
				this.sendRedLoading = true;
				var params = {
					num:this.formRed.count,
					amout:this.formRed.amount,
          remarks:this.formRed.remark,
          receiveUserId: privateRedId,
				}
				RedEnvelope.send(params).then(response =>{
					that.sendRedLoading = false;
					that.sendRedModal = false;
				}).catch(error =>{
					that.sendRedLoading = false;
				});
			},
			openRedSubmit() {
				var that = this;
				if(this.grabLoading){
					return;
				}
				this.grabLoading = true;
				RedEnvelope.grab(this.redItem.redpacketid).then(response =>{
					let data = response.data;
					that.redData = data;
					that.grabRedModal = true;
					// if(data.status === 3){ //已抢完
					// 	that.grabIn = 2;
					// }else if(data.status === 2){//已领取
					// 	//已领取显示抢红包记录页面
					// 	that.redRecordType = 1;
					// 	that.openAll();
					// }else if(data.status === 1){


					// }
					that.grabIn = 3;
					that.grabMoney = data.receivedRedpack.money;
					that.grabLoading = false;

				})
			},
			GrabRedClick(id,remarks) {

				this.redItem.redpacketid = id;
				this.redItem.remarks = remarks;
				// this.openRedSubmit();
				RedEnvelope.getStutas({
					redpacketId: id
				}).then(
					res => {
						let status = res.data.status;
						if(status === 1) {
              this.grabRedModal = true;
              this.grabRedModal = true;
							this.grabIn = 1;
						} else if(status === 2) {
							RedEnvelope.getDetail({
								redpacketId: id
							}).then(
								res => {
									this.redData = res.data;
									this.grabRedModal = true;
                  this.redRecordType = 1;
									this.openAll();
								}
							)
						} else if(status === 3) {
              this.grabRedModal = true;
							this.grabIn = 2;
							RedEnvelope.getDetail({
								redpacketId: id
							}).then(
								res => {
									this.redData = res.data;
                  this.grabRedModal = true;

                  this.redRecordType = 1;

                  //  setTimeout(() => {
                  //     this.openAll();
                  //  }, 3000);
								}
							)
						}

					}
				).catch(
					err => {
						this.$Modal.error({
							title: '错误提示',
							content: '您尚未登录或登录已经过期，请重新登录！'
						})
					}
				)
      },
      MyRedClick(val){
				var that = this;
				if(this.myRedLoading){
					return;
				}
				this.myRedLoading = true;
				RedEnvelope.getMyRed().then(response =>{
          let data = response.data;
					that.myRedRecord = data;
					if(!data.redpackNum) {
						that.myRedRecord.redpackNum = 0;
          }
          if (val === 2 ) {
           that.redRecordType = 2;

           that.redModal = false;
           that.redInfoModal = true;
           that.myRedLoading = false;
          } else if (val === 1) {
              that.redRecordType = 1;
              that.redModal = false;
              that.redInfoModal = true;
              that.myRedLoading = false;
					  } else if(val ===3) {
              that.redRecordType = 3;
              that.redModal=false;
              that.redInfoModal =true;
              that.myRedLoading =false;
            }

				}).catch(error =>{
          that.myRedLoading =false;
				});
			},
      privateGrabRedClick(id,remarks) {

				this.redItem.redpacketid = id;
				this.redItem.remarks = remarks;
				// this.openRedSubmit();
				RedEnvelope.getStutas({
					redpacketId: id
				}).then(
					res => {
						let status = res.data.status;
						if(status === 1) {
              this.grabRedModal = true;
              this.grabRedModal = true;
							this.grabIn = 1;
						} else if(status === 2) {
							RedEnvelope.getDetail({
								redpacketId: id
							}).then(
								res => {
									this.redData = res.data;
									this.grabRedModal = true;
                  this.redRecordType = 1;
									this.openAll();
								}
							)
						} else if(status === 3) {
              this.grabRedModal = true;
							this.grabIn = 2;
							RedEnvelope.getDetail({
								redpacketId: id
							}).then(
								res => {
									this.redData = res.data;
                  this.grabRedModal = true;

                  this.redRecordType = 1;

                  //  setTimeout(() => {
                  //     this.openAll();
                  //  }, 3000);
								}
							)
						}

					}
				).catch(
					err => {
						this.$Modal.error({
							title: '错误提示',
							content: '您尚未登录或登录已经过期，请重新登录！'
						})
					}
				)
			},
			closeGrabRedModal() {
				this.grabRedModal = false;
        this.grabIn = 1;
        return
			},
      openAll(){//查看大家手气
        this.isShowRedModal = false;
				this.redRecord = [];
				this.redData.packList.forEach(item =>{
					var record = {
						avatar:item.receiverHeadImage,
						nickname:item.receiverName,
						money:item.money,
						time:item.receiveTime
					};
					this.redRecord.push(record);
				});
        this.grabRedModal = false;//关闭红包窗口
        this.redInfoModal = true;//显示红包记录窗口

				this.redRecordType = 1;//显示抢红包全部记录
			},
			// MyRedClick(val){
			// 	var that = this;
			// 	if(this.myRedLoading){
			// 		return;
			// 	}
			// 	this.myRedLoading = true;
			// 	RedEnvelope.getMyRed().then(response =>{
			// 		let data = response.data;
			// 		that.myRedRecord = data;
			// 		if(!data.redpackNum) {
			// 			that.myRedRecord.redpackNum = 0;
			// 		}
			// 		that.redRecordType = 2;
			// 		if(val === 1){
			// 			that.redModal = false;
			// 			that.redInfoModal = true;
			// 			this.myRedLoading = false;
			// 		}
			// 	}).catch(error =>{

			// 	});
			// }
    },
     beforeDestroy() {
      this.$root.eventHub.$off('ReceiveMessageEvent',{

      })
      this.$root.eventHub.$off('CancleMessageEvent',{

      })
      this.$root.eventHub.$off('signinEvent',{

      })
      this.$root.eventHub.$off('sendMessageCompleteEvent',{

      })
      this.$root.eventHub.$off('signinSuccessEvent',{

      })
    }
	}
</script>
