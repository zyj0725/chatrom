<template>
	<div class="face-context">
		<el-tabs v-model="faceActive" tab-position="bottom" type="card">
			<el-tab-pane label="默认" name="default">
				<el-scrollbar id="faceScroll" :native="false" wrap-style="max-height:210px;">
					<Row class="face">
				        <Col span="3" v-for="(ditem,index) in realList" :key="index"  >
				        	<img style="width: 50px ;margin:5px" :src="ditem" @click="selectFace(nameList[index])" :title="nameList[index]">
              </Col>
				    </Row>
				</el-scrollbar>
			</el-tab-pane>
			<!-- <el-tab-pane label="浪小花" name="spray">
				<el-scrollbar id="sprayScroll" :native="false" wrap-style="max-height:210px;">
					<Row class="face">
						<Col span="3" v-for="(xitem,index) in faceList" :key="index" v-if="xitem.type=='spray'">
				        	<img :src="imgUrl+'images/face/spray/'+xitem.images" @click="selectFaceSpray(xitem)">
				        </Col>

					</Row>
				</el-scrollbar>
			</el-tab-pane> -->
		</el-tabs>
	</div>
</template>
<script>
	import Constants from '@/utils/constants'
	import emojiData from '@/assets/js/emojisdata.js'
	import Util from '@/utils/util'
	export default {
		name:"Face",
		data(){
			return {
        //'../../static/',
				imgUrl: Constants.staticUrl,
				faceActive:'default',
				faceList: emojiData.allEmoji,
				realList: [],
        nameList: [],
			}
		},
		watch:{

		},
		mounted(){
			for(let i in this.faceList) {
				this.nameList.push(i);
        this.realList.push(this.faceList[i]);
			}
		},
		computed:{

		},
		methods:{
			selectFace(val){
        this.$emit("defaultFaceChange", val);

			},
			selectFaceSpray(val){
        this.$emit("sprayFaceChange", val);

			}
		}
	}
</script>
