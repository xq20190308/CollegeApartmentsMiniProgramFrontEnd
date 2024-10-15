<template>
	<view class="banner">

		<view><text class="underline-text1"
				@click="()=>{data.sendtodoc=data.sendtodoc?false:true}">{{data.sendtodoc?"发给教学单位":'发给宿舍'}}</text></view>
		<view style="
				border-radius: 20px;
				overflow: hidden;
				box-shadow: 0px 2px 20px rgb(0 0 0 / 5%);" class="list">
			<uni-list v-if="data.sendtodoc" border-full>
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择校区" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title="" :localdata="data.originOfDo" :border="false"
							:placeholder="'默认全选'" v-model="data.receiverOfDo.campusId"
							:map="{text:'campusName',value:'campusId'}" @change="onchangeDo" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item v-if="data.receiverOfDo.campusId" style="padding: 2px 8px;" :showArrow="false"
					title="请选择楼号" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="data.originOfDo[data.idIndexOfDo.campusIndex].buildings" :border="false"
							:placeholder="'默认全选'" v-model="data.receiverOfDo.buildingName"
							:map="{text:'buildingName',value:'buildingName'}" @change="onchangeDo"
							@nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item v-if="data.receiverOfDo.buildingName&&data.receiverOfDo.campusId"
					style="padding: 2px 8px;" :showArrow="false" title="请选择楼层" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="data.originOfDo[data.idIndexOfDo.campusIndex].buildings[data.idIndexOfDo.buildingIndex].floors"
							:border="false" :placeholder="'默认全选'" v-model="data.receiverOfDo.floorId"
							:map="{text:'floorName',value:'floorId'}" @change="onchangeDo" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item
					v-if="data.receiverOfDo.buildingName&&data.receiverOfDo.campusId&&data.receiverOfDo.floorId"
					style="padding: 2px 8px;" :showArrow="false" title="请选择宿舍" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="data.originOfDo[data.idIndexOfDo.campusIndex].buildings[data.idIndexOfDo.buildingIndex].floors[data.receiverOfDo.floorId-1].dormitorys"
							:border="false" :placeholder="'默认全选'" v-model="data.receiverOfDo.dormitoryName"
							:map="{text:'dormitoryName',value:'dormitoryName'}" @change="onchangeDo"
							@nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<!-- <uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择宿舍" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="docs"
					:border="false" :placeholder="'默认全选'" v-model="data.receiverOfDo" :map="{text:'docName',value:'docId'}"
					@change="(e)=>{console.log('data.receiverOfDo',data.receiverOfDo)}" >
					</uni-data-picker>
				</template>
			</uni-list-item> -->
			</uni-list>
			<uni-list v-else border-full>
				<!-- <uni-list-item v-for="(item,key) in data.receiver" :key="key" style="padding: 2px 8px;" :showArrow="false" :title="key" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.classes"
					:border="false" :placeholder="'请选择'+key" v-model="data.receiver[key]" :map="{text:'text',value:'value'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item> -->
				<uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择校区" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin" :border="false"
							:placeholder="'默认全选'" v-model="data.receiver.campusId"
							:map="{text:'campusName',value:'campusId'}" @change="onchange" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item v-if="data.receiver.campusId" style="padding: 2px 8px;" :showArrow="false" title="请选择年级"
					:righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="storedata.origin[data.idIndex.campusIndex].grades" :border="false"
							:placeholder="'默认全选'" v-model="data.receiver.gradeId"
							:map="{text:'gradeName',value:'gradeId'}" @change="onchange" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item v-if="data.receiver.gradeId&&data.receiver.campusId" style="padding: 2px 8px;"
					:showArrow="false" title="请选择学院" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges"
							:border="false" :placeholder="'默认全选'" v-model="data.receiver.collegeId"
							:map="{text:'collegeName',value:'collegeId'}" @change="onchange" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item v-if="data.receiver.collegeId&&data.receiver.gradeId&&data.receiver.campusId"
					style="padding: 2px 8px;" :showArrow="false" title="请选择专业" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges[data.idIndex.collegeIndex].majors"
							:border="false" :placeholder="'默认全选'" v-model="data.receiver.majorId"
							:map="{text:'majorName',value:'majorId'}" @change="onchange" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item
					v-if="data.receiver.majorId&&data.receiver.collegeId&&data.receiver.gradeId&&data.receiver.campusId"
					style="padding: 2px 8px;" :showArrow="false" title="请选择班级" :righticon="''">
					<template v-slot:footer>
						<uni-data-picker :clear-icon="true" popup-title=""
							:localdata="storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges[data.idIndex.collegeIndex].majors[data.idIndex.majorIndex].classes"
							:border="false" :placeholder="'默认全选'" v-model="data.receiver.classId"
							:map="{text:'className',value:'classId'}" @change="onchange" @nodeclick="onnodeclick"
							@popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</template>
				</uni-list-item>
				<!-- <uni-list-item style="padding: 2px 8px;" :showArrow="false" title="请选择" :righticon="''" >
				<template v-slot:footer>
					<uni-data-picker :clear-icon="true" popup-title="" :localdata="storedata.origin[grades]"
					:border="false" :placeholder="'请选择学院'" v-model="data.receiver.gradeId" :map="{text:'gradeName',value:'gradeId'}"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
					</uni-data-picker>
				</template>
			</uni-list-item> -->
			</uni-list>
		</view>
		<view class="content">
			<uni-easyinput type="textarea" :maxlength="-1" v-model="data.content" placeholder="请输入内容"
				:placeholderStyle="data.placeholderStyle"></uni-easyinput>
		</view>
		<button style="color:#ffffff;backgroundColor:#008fff;" type="primary" size="mini" @click="post">发布</button>

	</view>
</template>

<script setup>
	import '@/utils/http';
	import {
		computed,
		reactive,
		ref
	} from "vue";
	import {
		onLoad,
		onReady
	} from "@dcloudio/uni-app";
	import {
		http
	} from '@/utils/http';
	import {
		wsclose,
		wsopen,
		wssend,
		socketTask
	} from "../../utils/socket.js";
	import {
		getTimeStamp
	} from "../../utils/time.js";
	import {
		useUserStore
	} from "../../store/User.js"
	import {
		storeToRefs
	} from 'pinia'
	import {
		useDataStore
	} from '../../store/data.js';
	const picker = ref(null)
	const data = reactive({
		sendtodoc: true,
		content: "",
		placeholderStyle: "",
		idIndex: {
			campusIndex: 0,
			gradeIndex: 0,
			collegeIndex: 0,
			majorIndex: 0,
		},
		receiver: {
			campusId: "",
			gradeId: "",
			collegeId: "",
			majorId: "",
			classId: "",
		},
		originOfDo: {},
		idIndexOfDo: {
			campusIndex: 0,
			buildingIndex: 0,
		},
		receiverOfDo: {
			campusId: "",
			buildingName: "",
			floorId: "",
			dormitoryName: "",
		},
	})
	// const docs=ref([{
	// 	docName:"GA17-436",
	// 	docId:"GA17-436",
	// },{
	// 	docName:"GB14-412",
	// 	docId:"GB14-412",
	// }])
	const store = useUserStore()
	const post = async () => {
		//宿舍的全选逻辑还不对，因为后端的接口不完善
		let rece = data.sendtodoc ? data.receiverOfDo : data.receiver
		if (data.content) {
			console.log("data.content", data.content)
			if (!data.sendtodoc) {
				rece.campusId = rece.campusId ? rece.campusId : 0
				rece.gradeId = rece.gradeId ? rece.gradeId : 0
				rece.collegeId = rece.collegeId ? rece.collegeId : 0
				rece.majorId = rece.majorId ? rece.majorId : 0
				rece.classId = rece.classId ? rece.classId : 0
			} else {
				if (rece.dormitoryName == "") {
					uni.showToast({
						icon: "error",
						title: "请选择完整"
					})
					return;
				}
				rece = {
					campusId: rece.campusId,
					dormitoryName: "G" + rece.buildingName + "-" + rece.dormitoryName
				}
			}
			console.log("to:", rece)
			const res = await wssend(data.sendtodoc ? "2" : "1", data.content, rece)
			if (res == "success") {
				uni.showToast({
					icon: "success",
					title: "发布成功"
				})
				data.content = ""
			} else {
				uni.showToast({
					icon: "error",
					title: "发布失败"
				})
			}
		} else {
			uni.showToast({
				icon: "error",
				title: "内容不能为空！"
			})
		}
	}
	const onnodeclick = (e) => {
		console.log('onnodeclick', e);
		console.log(data.sendtodoc ? data.receiverOfDo : data.receiver)
	}
	const onpopupopened = (e) => {
		console.log('popupopened', e);
		console.log(data.sendtodoc ? data.receiverOfDo : data.receiver)
	}
	const onpopupclosed = (e) => {
		console.log('popupclosed', e);
		console.log(data.sendtodoc ? data.receiverOfDo : data.receiver)
	}
	const onchangeDo = (e) => {
		console.log('onchange:', e);
		console.log(data.receiverOfDo)
		data.receiverOfDo.buildingName = data.receiverOfDo.campusId ? data.receiverOfDo.buildingName : ""
		data.receiverOfDo.floorId = data.receiverOfDo.campusId && data.receiverOfDo.buildingName ? data.receiverOfDo
			.floorId : ""
		data.receiverOfDo.dormitoryName = data.receiverOfDo.floorId && data.receiverOfDo.buildingName && data
			.receiverOfDo.campusId ? data.receiverOfDo.dormitoryName : ""
		if (data.receiverOfDo.campusId) { //找到校区对应索引
			let index = data.originOfDo.findIndex(item => item.campusId === data.receiverOfDo.campusId);
			data.idIndexOfDo.campusIndex = index
			console.log("校区的索引", data.idIndexOfDo.campusIndex)
		}
		if (data.receiverOfDo.buildingName) { //找到楼号对应索引
			let index = data.originOfDo[data.idIndexOfDo.campusIndex].buildings.findIndex(item => item.buildingName ===
				data.receiverOfDo.buildingName);
			data.idIndexOfDo.buildingIndex = index
			console.log("楼号的索引", data.idIndexOfDo.buildingIndex)
		}
	}
	const onchange = (e) => {
		console.log('onchange:', e);
		console.log("receiver", data.receiver)
		data.receiver.gradeId = data.receiver.campusId ? data.receiver.gradeId : ""
		data.receiver.collegeId = data.receiver.gradeId && data.receiver.campusId ? data.receiver.collegeId : ""
		data.receiver.majorId = data.receiver.collegeId && data.receiver.gradeId && data.receiver.campusId ? data
			.receiver.majorId : ""
		data.receiver.classId = data.receiver.majorId && data.receiver.collegeId && data.receiver.gradeId && data
			.receiver.campusId ? data.receiver.classId : ""
		console.log("receiver", data.receiver)
		console.log("storedata.origin", storedata.origin)
		if (data.receiver.campusId) { //找到校区对应索引
			let index = storedata.origin.findIndex(item => item.campusId === data.receiver.campusId);
			data.idIndex.campusIndex = index
			console.log("校区的索引", data.idIndex.campusIndex)
		}
		if (data.receiver.gradeId) { //找到年级对应索引
			let index = storedata.origin[data.idIndex.campusIndex].grades.findIndex(item => item.gradeId === data
				.receiver.gradeId);
			data.idIndex.gradeIndex = index
			console.log("年级的索引", data.idIndex.gradeIndex)
		}
		if (data.receiver.collegeId) { //找到学院对应索引
			let index = storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges.findIndex(
				item => item.collegeId === data.receiver.collegeId);
			data.idIndex.collegeIndex = index
			console.log("学院的索引", data.idIndex.collegeIndex)
		}
		if (data.receiver.majorId) { //找到专业对应索引
			let index = storedata.origin[data.idIndex.campusIndex].grades[data.idIndex.gradeIndex].colleges[data
				.idIndex.collegeIndex].majors.findIndex(item => item.majorId === data.receiver.majorId);
			data.idIndex.majorIndex = index
			console.log("专业的索引", data.idIndex.majorIndex)
		}
	}
	const storedata = useDataStore()
	onLoad(async () => {
		//console.log("store.user",store.user)
		console.log("storedata.origin", storedata.origin)
		const res = await http("/dormitory-info/infos", "GET", {})
		data.originOfDo = res.data.campusInfoVOList;
		console.log("res:", data.originOfDo);
	})
</script>

<style lang="scss" scoped>
	.content {
		// width: 90%;
		// padding-left: 33rpx;
		// margin-top: 50rpx;

		::v-deep .uni-easyinput__content-textarea {
			height: 550rpx;
		}
	}

	.list {
		::v-deep .uni-easyinput {
			text-align: end;
		}

		::v-deep .text-color {
			color: #9e9a9a;
			font-family: UICTFontTextStyleBody;
			font-size: smaller;
		}
	}

	.underline-text1 {
		font-weight: 300;
		font-size: 12px;
		text-decoration: underline;
		color: #000000;
		display: flex;
		flex-direction: row-reverse;
	}

	.underline-text1:active {
		color: #0000ff;
		/* 点击时的蓝色 */
	}
</style>