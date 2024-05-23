<template>
	<view class="cates">
		<view v-for="(cate,index) in cates" :class="{'cateitem':true,'cateactive':index==active,}" :key="index" @click="dircate(index)">
			{{cate.name}}
		</view>
	</view>
	<view class="qusnalist">
		<view class="qusna" v-for="(item,index) in questionnairelist" :key="index" @click="gotonaire(item)">
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
			<questionnaire :naireinfo="item"></questionnaire>
		</view>
	</view>
	<view>
		<image class = "addnaireicon" src="../../static/feedback/plus.png" @click="addnaire"></image>
	</view>
</template>

<script>
	import questionnaire from '../../../components/questionnaire/questionnaire.vue'
	export default {
		data() {
			return {
				questionnairelist:[],
				newNaire:null,
				total: 0,
				cates:[{
						id:0,
						name:"全部"
					},{
						id:1,
						name:"未完成"
					},{
						id:2,
						name:"已完成"
				}],
				active:0
			}
		},
		methods:{
			getNaireslist(cates){
				console.log("分类请求的参数",cates);
				uni.request({
					//url:'http://192.168.76.218:8080/questionnaire/selectAll',
					url:'http://127.0.0.1:4523/m1/4414254-4059226-default/questionnaire/selectAll',
					method: 'GET',
					data:{},
					success: (res)=> {
						this.questionnairelist=res.data.data;
						if(this.newNaire!=null){this.loadNewlist();}
						else{
							console.log("newList为空");
							console.log('获取到列表',this.questionnairelist);
						}
					},
					complete: (res)=>{
					}
				});
			},
			gotonaire: (item) =>{
				console.log("问卷信息",item);
				uni.navigateTo({
					url:'../questionnaire_home/questionnaire_home?questionidList='+item.questionList+
					'&id='+item.id+'&type='+item.type+'&name='+item.name+
					'&descr='+item.descr+'&startTime='+item.startTime+
					'&endTime ='+item.endTime 
				})
			},
			addnaire() {
				uni.navigateTo({
					url: '../addquestionnaire/addquestionnaire'
				});
			},
			dircate(options){
				this.active=options;
				console.log("点击事件的参数",options)
				if(options===0){this.getNaireslist();}
				else{this.getNaireslist(options);}
			},
			loadNewlist(){
				this.questionnairelist.push(this.newNaire);
				console.log("创建新问卷后的列表",this.questionnairelist);
				this.newNaire=null;
			}
		},
		onLoad(options) {
			console.log("列表参数",options);
			if(options.newNaire!=null){
				this.newNaire=JSON.parse(options.newNaire);
				console.log("组件数据",this.newNaire);
			}
			this.getNaireslist()
		},
	}
</script>
<style lang="scss">
.cates{
	display: flex;
	flex-direction: row;
	background-color: #fff;
	height: 40px;
	justify-content: space-between;
}
.cateitem{
	text-align: center;
	width: 33.33%;
	padding-top: 9px;
	padding-bottom: 9px;
	background-color: #008cff;
}
.cateactive{
	background-color: #fff;
}
.qusnalist{
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	questionnaire{
		width:100%;
	}
}
.addnaireicon {
	position: fixed;
	bottom:160rpx; 
	right: 60rpx; 
	width: 80rpx; 
	height: 80rpx; 
}

</style>

