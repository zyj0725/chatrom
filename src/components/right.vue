<template>
	<div class="contxt-right">
		<div class="LivePanel">
			<div class="title">
				<span class="btn" :class="[active=='bet'?'active':'']" @click="liveClick('bet')"><i><font-awesome-icon icon="download"/></i>在线投注</span>
				<span class="btn" :class="[active=='video'?'active':'']" @click="liveClick('video')"><i><font-awesome-icon icon="video"/></i>美女直播</span>
				<span class="btn" :class="[active=='alive'?'active':'']" @click="liveClick('alive')"><i><font-awesome-icon icon="font"/></i>文字开奖</span>
				<!-- <span class="btn" :class="[active=='ssc'?'active':'']" @click="liveClick('ssc')"><i><font-awesome-icon icon="trophy"/></i>时时彩直播</span>
				<span class="btn" :class="[active=='pk10'?'active':'']" @click="liveClick('pk10')"><i><font-awesome-icon icon="car"/></i>PK10直播</span> -->
			</div>
			<div class="context-live" :style="heigth">
				<div
				v-show="active === 'pk10'"
				class="right-container">
					<div

					class="live-container">
						<iframe
						width="100%"
						height="870"
						src="https://kjzb.com/static/wap/assets/dist/vendor/mobile/pk102/index.html" frameborder="0"></iframe>
					</div>
					<div class="kaijiang-container">
						<div class="kjhead-can">
							<div class="little-can">
								<p>期数</p>
							</div>
							<div style="padding: " class="little-can">
								<p>时间</p>
							</div>
							<div class="little-can">
								<ul>
									<li
									@click="bjscTab(index)"
									:class="{on: index === isOn}"
									v-for="(item, index) in title"
									:key="index">
										<span>{{item}}</span>
									</li>
								</ul>
							</div>
						</div>
						<el-scrollbar id="messageScroll1" :native="false" :wrap-style="sHeigth">
						<div class="kjbody-can">
							<div
							v-for="(item, index) in bjscData"
							:key="index"
							class="bd-can">
								<div class="little-bd-can">
									<p>{{item.periods}}</p>
								</div>
								<div class="little-bd-can">
									<p>{{timers(item.starttime, 'MM-dd hh:mm')}}</p>
								</div>
								<div class="little-bd-can">
									<ul>
										<li
										v-if="!isDz"
										v-for="(items, indexes) in item[changeBjsc]"
										:key="indexes"
										:class="[
											'pk10-bg-'+items,
											{
												'pk10-bg-4': items === '大'||items === '单',
												'pk10-bg-6': items === '小'||items === '双'
											}]">{{items}}</li>
										<li
										v-if="isDz"
										v-for="(items, indexes) in item[changeBjsc]"
										:key="indexes"
										:class="bjscData[index].dzrank[indexes] === 1?'pk10-bg-'+(indexes+1):''">{{items}}</li>
									</ul>
								</div>
							</div>
						</div>
					</el-scrollbar>
					</div>
				</div>
				<div >
				<div class="right-container">
					<div
					v-show="active === 'ssc'"
					class="live-container">
						<iframe
						v-if="isShowIframe"
						width="100%"
						height="870"
						src="https://kjzb.com/static/wap/assets/dist/vendor/mobile/cqssc/live.html" frameborder="0"></iframe>
					</div>
					<div
					v-if="active === 'ssc'"
					class="kaijiang-container">
						<div class="kjhead-can">
							<div class="little-can">
								<p>期数</p>
							</div>
							<div style="padding: " class="little-can">
								<p>时间</p>
							</div>
							<div  class="little-can">
								<p style="position: absolute; left: 55%">开奖号码</p>
							</div>
						</div>
						<el-scrollbar id="messageScroll2" :native="false" :wrap-style="sHeigth">
						<div
						class="kjbody-can">
							<div
							v-for="(item, index) in sscData"
							:key="index"
							class="bd-can">
								<div class="little-bd-can">
									<p>{{item.periods.substr(8, 3)}}</p>
								</div>
								<div class="little-bd-can">
									<p>{{timers(item.starttime, 'MM-dd hh:mm')}}</p>
								</div>
								<div style="padding-left: 18%" class="little-bd-can">
									<ul>
										<li
										v-for="(items, indexes) in item[changeSsc]"
										:key="indexes"
										class="ssc-num">{{items}}</li>
									</ul>
								</div>
							</div>
						</div>
					</el-scrollbar>
					</div>
				</div>
				<!-- <el-scrollbar id="messageScroll3" :native="false" :wrap-style="300"> -->
				<div
				v-show="active === 'alive'"
				:style="'height: '+ specialHeight + 'px; overflow-y: scroll'"
				class="right-container" >
          <div class="items-container" v-for="(item,index) in lotteryList" :key="index">
						<div class="logo-can">
							<img :src="'/static/images/lottery-logo/'+item.lottId+'.png'" alt="" v-if="item.showType === 'lottery_k3'">
              <img src="/static/images/lottery-logo/cqssc.png" alt="" v-if="item.showType === 'lottery_ssc'">
              <img src="/static/images/lottery-logo/pk10.png" alt="" v-if="item.showType === 'lottery_bjsc'">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>{{item.lottName}} </span>最新开奖<span> {{item.dqqs}} </span>期</p>
								<p> 距离下期开奖还有<span> {{item.times}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
                  v-if="item.showType === 'lottery_k3'"
									v-for="(items, index) in item.dqhm"
									:key="index"
									:class="'jsk3-bg-'+items"></li>
								</ul>
                <ul>
									<li
                  v-if="item.showType === 'lottery_ssc'"
									v-for="(items, index) in item.dqhm"
									:key="index"
									class="ssc-num">{{items}}</li>
								</ul>
                <ul>
									<li
                  v-if="item.showType === 'lottery_bjsc'"
									v-for="(items, index) in item.dqhm"
									:key="index"
									:class="'pk10-bg-'+items">{{items}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- </el-scrollbar> -->


				</div>

				<div
				style="height: 100%"
				v-show="active === 'video'"
				class="right-container">
					<embed
						src="//weblbs.yystatic.com/s/22490906/22490906/yycomscene.swf"
						quality="high" width="100%" height="100%" align="middle" allowscriptaccess="always"
						allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash"
						autostart="true">
				</div>

				<div
				style="background: #fff"
				v-show="active === 'bet'"
				class="right-container">
					<div id="ifm" >
						<iframe width="100%" height="100%" :src="betSrc" frameborder="0"></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import '@/assets/css/scrollbar.less'
	import '@/assets/css/right.less'
	import formatTime from '@/utils/formatTime'
	import KJ from '@/api/lotterytimer'
	import open from '@/api/kaijiang'
  import Constants from '@/utils/constants'
  import Common from '@/api/common'
	export default{
		props:['heigth'],
		data(){

			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			return {
        lotteryList:[],
        xqqs:[],
				isShowIframe: false,
				chatUrl:Constants.chatUrl,
				imgUrl:Constants.staticUrl,
				active:'alive',
				liveHtml:'',
				title: ['号码', '大小', '单双', '对子'],
				isOn: 0,
				isDz: false,
				sign: 0,
				bjscData: [],
				sscData: [],
				isP: [],
				changeBjsc: 'rank',
				changeSsc: 'rank',
				// times: [],
				// dqhm: [],
				// dqqs: [],
				cargo: [],
				sHeigth: 'max-height: '+(scrollHeight-403)+'px;',
        betSrc:'',
        lineUp:'',
				specialHeight: '',
			}
		},
		watch:{

		},
		mounted(){
			let ifm = document.getElementById('ifm');
			let hei = window.innerHeight;
			this.specialHeight = hei -107;
      ifm.style.height = hei - 107 +'px'
      Common.getSystemInfo(
      ).then(
        res => {
          this.lineUp = res.data.betWeb;
        }
      ).catch()
		},
		created() {
      var that =this;
			//this.initData();
			for(let i=0;i<12;i++) {
				this.isP.push(true);
      }
			this.cqssc();
      this.bjsc();
      this.$nextTick(() => {
          that.kjjsonarray();
      });
		},
		computed:{

		},
		methods:{
			timers(time, str) {
				return formatTime(new Date(time), str)
			},
			bjscTab(index = 0) {
				this.isOn = index;
				this.isDz = false;
				if(index === 0) {
					this.changeBjsc = 'rank';
				} else if(index === 1) {
					this.changeBjsc = 'dxrank';
				} else if (index === 2) {
					this.changeBjsc = 'dsrank';
				} else if(index === 3){
					this.changeBjsc = 'rank';
					this.isDz = true;
				}
			},
			bjsc() {
				open.bjsckj().then(
					res => {
						this.bjscData = res.data;

					}
				);
			},
			cqssc(index = 0) {
				open.cqssc().then(
					res => {
						this.sscData = res.data;
					}
				);
			},
			reGetData(requestApi,num) {
        var that = this;
				// if(index === 0) {
				// 	this.bjsc()
				// } else if (index === 5) {
				// 	this.cqssc()
				// }
				KJ(requestApi,num).then(
					res => {
            that.$set(that.lotteryList[num],'dqhm',res.data.dqhm);
            that.$set(that.lotteryList[num],'dqqs',res.data.dqqs);
            that.countDown({
                xqkjsj: res.data.xqkjsj,
								timestamp: res.timestamp,
                num: num,
                requestApi:requestApi,
            })
					}
				)
			},
			countDown(data) {
        var that = this;
				let localTimer = data.timestamp;
				let otherClick;
        let timer = Math.ceil((data.xqkjsj - localTimer)/1000);
				if(timer === 0||timer < 0) {
					otherClick = setTimeout(() => {
						this.reGetData(data.requestApi,data.num)
					},5000);
				} else {
					clearTimeout(otherClick);
					let min = Math.floor(timer/60);
          let scd = Math.ceil(timer%60);
					let click = setInterval(
						() => {
							scd --;
							if(((min === 0||min === '00')&&scd === 0)||min <0) {
                clearInterval(click);
                that.$set(that.lotteryList[data.num],'times','开奖中...');
								that.reGetData(data.requestApi,data.num);
							} else {
								if(scd < 0) {
									min --;
									scd = 59;
								}
								if((min+'').length === 1) {
									min = '0' + min
								}
								if((scd+'').length === 1) {
									scd = '0' + scd
                }
                that.$set(that.lotteryList[data.num],'times',min+':'+scd);
							}
						}
					,1000);
				}
			},
			// initData() {
			// 	if(this.sign === 12) {
			// 		return false
			// 	} else {
			// 		KJ(this.sign).then(
			// 			res => {
			// 				this.dqhm.push(res.data.dqhm);
      //         this.dqqs.push(res.data.dqqs);
			// 				this.countDown({
			// 					xqkjsj: res.data.xqkjsj,
			// 					timestamp: res.timestamp,
			// 					num: this.sign
			// 				})
			// 				this.sign++;
			// 				this.initData()
			// 			}
			// 		)
			// 	}
      // },
      kjjsonarray() {
        var that = this;
        open.kjjsonarray().then(res => {
          that.lotteryList=res.data;
          for (let i = 0 ; i < that.lotteryList.length ; i++) {
            let str=that.lotteryList[i].requestApi;
                str=str.replace("api/","");
            let data = {
								xqkjsj: that.lotteryList[i].xqkjsj,
								timestamp: res.timestamp,
                num: i,
                requestApi:str
							}
            that.countDown(data);
          }

        })

      },
			liveClick(item){
				this.active = item;
				if(item === 'bet'){
          var lineUp = this.lineUp
          this.betSrc =  lineUp
				}else if(item === 'video'){
					this.liveHtml = '美女直播';
				}else if(item === 'alive'){
					this.liveHtml = '文字开奖'
				}else if(item === 'ssc'){
					this.isShowIframe = true;
					this.liveHtml = '时时彩直播';
				}else if(item === 'pk10'){
					this.liveHtml = 'PK10直播';
				}
			}
		}
	}
</script>
