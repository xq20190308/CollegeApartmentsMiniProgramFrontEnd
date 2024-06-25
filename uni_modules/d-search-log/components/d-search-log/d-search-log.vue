<template>
	<view class="dSLComVue">
		
		<view class="dSLComVueTop">
			<view class="dSLComVueTopLeft">
				<image src="../../../../static/hygiene/search.png" class="dSLComVueTopLeftImg" style="width: 30rpx;height: 30rpx;flex: none;"></image>
				<input  class="dSLComVueTopLeftInput" v-model="search_input" type="text" :placeholder="placeholder" @blur="()=>{}" />
				<view class="dSLComVueTopLeftDel" v-if="search_input" @click="onClickDel">
					<image src="../../../../static/hygiene/del.png" class="dSLComVueTopLeftDelImg" style="width: 35rpx;height: 35rpx;flex: none;" ></image>
				</view>
			</view>
			<view class="dSLComVueTopRight">
				<view class="dSLComVueTopRightBtn" @click="onClickInput" :style="'border: 1rpx solid '+color_border+';color: '+color_text+';'">{{search_name?search_name:'搜索'}}</view>
			</view>
		</view>
		
		<view v-if="is_show_more" class="dSLComVue">
			<view class="dSLComVueTitle" >
				<text>搜索历史</text>
				<view style="width: 100rpx;height: 60rpx;display: flex;align-items: center;justify-content: flex-end;" @click="onClickDelAll">
					<image src="../../../../static/hygiene/del2.png" style="width: 30rpx;height: 30rpx;margin-right: 35rpx;"></image>
				</view>
			</view>
			
			<view v-if="search_list_old.length==0" class="mytext">暂无</view>
			<view class="dSLComVueLog" v-if="search_list_old.length>0">
				<text class="dSLComVueLogBox mytext" v-for="(item,index) in search_list_old" :key="index" @click="onClickInputValue(item)">
					{{item?item:'无'}}
				</text>
			</view>
			
			<view class="dSLComVueTitle" v-if="search_list_hot.length>0" style="margin-top: 20rpx;">
				<text>热门搜索</text>
				<view style="width: 100rpx;height: 60rpx;display: flex;align-items: center;justify-content: flex-end;" @click="onClickShowHot">
					<image :src="is_hot_show?'../../../../static/hygiene/yan_open.png':'../../../../static/hygiene/yan_close.png'" style="width: 30rpx;height: 30rpx;margin-right: 35rpx;"></image>
				</view>
			</view>
			
			<view class="dSLComVueLog" v-if="search_list_hot.length>0 && is_hot_show">
				<text class="dSLComVueLogBox mytext" v-for="(item,index) in search_list_hot" :key="index" @click="onClickInputValue(item)">
					{{item?item:'无'}}
				</text>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				search_list_old:[],
				search_input:'',
				is_hot_show:true,
			}
		},
		created() {
			this._init_search()
			
		},
		props: {
			is_show_more: {
				value: Boolean,
				default: true
			},
			search_list_old_man_num: {
				value: Number,
				default: 10
			},
			search_list_hot: {
				value: Array,
				default: []
			},
			//HM修改 定义默认搜索关键词(水印文字)
			placeholder:{
				value: String,
				default: '请输入搜索内容'
			},
			store_key:{
				value: String,
				default: 'search_list'
			},
			
			color_border:{
				value: String,
				default: ''
			},
			color_text:{
				value: String,
				default: '#30c66c'
			},
			search_name:{
				value: String,
				default: '搜索'
			},
			input_text:{
				value: String,
				default: ''
			},
		},
		watch: {
			search_list_hot(newVal) {
				if (newVal) {
					this.search_list_hot = newVal
				}
			},
			input_text(newVal) {
				if (newVal) {
					this.search_input = newVal
					// this.search_input = search_input.toLowerCase()
					
					this.saveKeyword()
				}
			},
			
		},
		methods:{
			onClickInput(){
				this.saveKeyword()
			},
			onClickInputValue(search_input) {
				if (!search_input) {
					return false;
				}
				
				this.search_input = search_input.toLowerCase()
				
				this.saveKeyword()
			},
			_init_search() {
				var that = this
				
				var store_key = that.store_key
				
				uni.getStorage({
					key: store_key,
					success: (res) => {
						var old_data = JSON.parse(res.data);
						
						that.search_list_old = old_data; //更新历史搜索
						
						
						// console.log('____________________dev')
						// console.log(that.search_list_old)
						// console.log('____________________dev')
					}
				});
			},
			saveKeyword() {
				var that = this
				
				// console.log('搜索的名称为：'+this.search_input)
				if (!this.search_input) {
					return false;
				}
				
				this.search_input = this.search_input.toLowerCase()
				
				var search_input = this.search_input
				
				var store_key = that.store_key
				uni.getStorage({
					key: store_key,
					success: (res) => {
						var old_data = JSON.parse(res.data);
						var findIndex = old_data.indexOf(search_input);
						if (findIndex == -1) {
							old_data.unshift(search_input);
						} else {
							old_data.splice(findIndex, 1);
							old_data.unshift(search_input);
						}
						//最多10个纪录
						old_data.length > that.search_list_old_man_num && old_data.pop();
						uni.setStorage({
							key: store_key,
							data: JSON.stringify(old_data)
						});
						that.search_list_old = old_data; //更新历史搜索
						// console.log('____________________dev')
						// console.log(that.search_list_old)
						// console.log('____________________dev')
					},
					fail: (e) => {
						var old_data = [search_input];
						uni.setStorage({
							key: store_key,
							data: JSON.stringify(old_data)
						});
						that.search_list_old = old_data; //更新历史搜索
						// console.log('____________________dev')
						// console.log(that.search_list_old)
						// console.log('____________________dev')
					}
				});
				//	向父级发送搜索的事件
				that.$emit('onSearchNameApi', this.search_input);
				//
			},
			onClickDel() {
				this.search_input = ''
				this.$emit('onSearchNameApi', '');
			},
			
			onClickDelAll() {
				var that = this
				console.log('---全部删除-log--')
				uni.showModal({
					title:'提示',
					content:'确定全部删除',
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync(that.store_key)
							that.search_list_old = []
							// console.log('______清除全部搜索记录______向上级发送事件')
							that.$emit('onClickDelAllApi', '');
						}
					}
				})
			},
			//
			onClickShowHot() {
				this.is_hot_show = this.is_hot_show==true?false:true
			}
		}
	}
</script>

<style lang="scss">
	.myborder {
		border: 1rpx solid #60DF9D;
		color: #30c66c;
	}
	.mytext {
		color: #8799a3;
		font-size: smaller;
	}
	.dSLComVue {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx 0;
		.dSLComVueTop {
			width: 90%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 40rpx;
			.dSLComVueTopLeft {
				flex: 1;
				height: 60rpx;
				background-color: #e8e8e8;
				border-radius: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 3%;
				// background-color: #ccc;
				border: 1rpx solid #f2f2f2;
				
				.dSLComVueTopLeftImg {
					flex: 1;
					height: 80rpx;
				}
				.dSLComVueTopLeftInput {
					flex: 1;
					height: 60rpx;
					padding: 0 20rpx;
					font-size: smaller;
				}
				
				.dSLComVueTopLeftDel {
					width: 70rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}
			.dSLComVueTopRight {
				width: 100rpx;
				margin-left: 30rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.dSLComVueTopRightBtn {
					width: 120rpx;
					height: 60rpx;
					border-radius: 30rpx;
					// color: red;
					display: flex;
					// color: #ff00ff;
					// border:1rpx solid #ff00ff;
					align-items: center;
					justify-content: center;
					font-size: smaller;
				}
			}
			
		}
		
		.dSLComVueTitle {
			width: 100%;
			height: 80rpx;
			display: flex;
			font-weight: 600;
			font-size: 26rpx;
			align-items: center;
			// background-color: #30c66c;
			align-items: center;
			justify-content: space-between;
			padding-left: 5%;
		}
		
		.dSLComVueLog {
			width: 90%;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			.dSLComVueLogBox {
				line-height: 55rpx;
				background-color: #e8e8e8;
				padding: 0rpx 30rpx;
				border-radius: 30rpx;
				flex: none;
				margin: 10rpx 25rpx 15rpx 0;
				// border: 1rpx solid #ccc
			}
			
			
		}
	}
</style>