<template>
	<view>
		<uni-section title="我的草稿" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in complaintDrafts" :key="index" >
					<view style="display: flex; flex-direction: column;justify-content: center; align-items: left;" @click="change(item)">
						<view>id：{{item.id}}</view>
						<view>describe：{{item.describe}}</view>
						<view>category：{{item.category}}</view>
						<view>contactobject：{{item.contactobject}}</view>
						<view>pushtime：{{item.pushtime}}</view>
					</view>
					<button @click="delet(index)" class="deletbutton">删除</button>
				</view>
			</view>
		</uni-section>
	</view>
	<view class="container">
		
	<image class = "floating-button" src="../../static/feedback/plus.png" @click="onpress"></image>
	
	</view>
</template>

<script>
	export default {
		data() {
		    pushtime:" ";
			return {
				complaintDrafts: [{
					id: "91",
					describe: "cillum ex",
					category: "in Duis fugiat qui aute",
					contactobject: "in eu ullamco irure aliqua",
					pushtime: "2014-03-04 03:56:28"
				},] // 初始为空数组
			}
		},
		onLoad() {
			this.fetchComplaintDrafts(); // 页面加载时获取数据
		},
		onShow() {
		  // 确保路由对象已经初始化
		  if (this.$route.query) {
			  console.log(this.$route.query.pushtime)
		    this.fetchComplaintDrafts(this.$route.query.pushtime);
		  }
		},
		methods: {
			fetchComplaintDrafts(pushtime) {
				uni.request({
					url: 'http://localhost:8080/api/suggestions/pushtime', // 替换为您的服务器接口URL
					method: 'GET',
					success: (res) => {
						// let jsonString = JSON.stringify(res.data);
						this.complaintDrafts.push(res.data)
						if (res.statusCode === 200) {
							//this.complaintDrafts = res.data; // 直接使用返回的列表	
							//示例数据
							console.log(res)
							for (let i = 0; i < 10; i++) {
								this.complaintDrafts.push(
								  {
									id: i,
									describe: "cillum ex",
									category: "in Duis fugiat qui aute",
									contactobject: "in eu ullamco irure aliqua",
									pushtime: "2014-03-04 03:56:28"
								  });
							  }
							console.log(this.complaintDrafts)
						} else {
							// 处理错误情况
							console.error('Failed to fetch complaint drafts:', res);
						}
					},
					fail: (err) => {
						// 处理请求失败的情况
						console.error('Request failed:', err);
					}
				});
			},
			onpress() {
				uni.navigateTo({
					url: '../feedback/feedbackSubmit'
				});
			},
			change(item){
				console.log(item)
				uni.navigateTo({
					url: '../feedback/DraftFeedback'
				})
			},
			delet(index){
				this.complaintDrafts.splice(index, 1);
				console.log(this.complaintDrafts)
				//提交到后端
				/*uni.request({
					url:'',
					method:"",
					data:{
						id:thisid
					}
				})*/
			}
		}
	}
</script>




<style>
	.notice-list {
	}
	
	.notice-item {
		width: 89%;
		height: auto;
		border: 1px solid #e2e2e2;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		flex-shrink: 0;
		margin-top: 24rpx!important;
		margin-button: 24rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(14rpx * 2);
		line-height: calc(17rpx * 2);
		color: #333333;
		margin: auto;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		flex-direction: row;
	}

	.notice-item>text {
		display: block;
	}
	
	
	.notice-item text:nth-child(2) {
		text-indent: 2em;
		display: flex;
		padding-top: 10rpx;
	}

	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 16rpx !important;
	}
	.notice-item text:nth-child(4) {
		font-size: 16rpx !important;
	}
	
	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #999999;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(12rpx * 2);
		line-height: calc(15rpx * 2);
	}
	.floating-button {
		position: fixed;
		bottom:60rpx; 
		right: 60rpx; 
		width: 120rpx; 
		height: 120rpx; 
	/* 	box-shadow: 5rpx 5rpx 10rpx rgba(0, 0, 0, 0.5); */ /* 添加阴影样式 */
	}
	.deletbutton{
		background-color:red;
		color:white;
		width: 50px;
		height: 47px;
		border:0;
		font-size: 10px;			
	    border-radius: 30px;
		margin: 10px;
		text-align: center;
		padding-top: 10px;
	} 
</style>


