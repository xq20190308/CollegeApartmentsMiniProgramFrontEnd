<template>
<<<<<<< HEAD
    <!-- 导航栏区域一 -->
    <view class="nav-list">
        <view class="nav-item" v-for="(item,i) in navList" :key="i">
            <image :src="item.imgPath" class = "nav-img"></image>
        </view>
        
    </view>
</template>

<script>
    export default{
        data() {
            return{
                //分类功能区的数据列表
                navList: [
									{
									    imgPath:"../../static/function/class.png"
									},
									{
									    imgPath:"../../static/function/classschedule.png"
									},
									{
									    imgPath:"../../static/function/questionnaire.png"
									},
									{
									    imgPath:"../../static/function/tutointeraction.png"
									}
								]
                }
        },
    onload() {
        //调用方法，获取数组中的数据
        this.navList = [
            {
                imgPath:"../../static/function/class.png"
            },
            {
                imgPath:"../../static/function/classschedule.png"
            },
            {
                imgPath:"../../static/function/questionnaire.png"
            },
            {
                imgPath:"../../static/function/tutointeraction.png"
            }
            
        ]
    },
    methods: {
        
        }
    }
</script>

<style>
    .nav-list{
        display:flex;
        justify-content: space-around;
        margin: 15px 0;
        }
        .nav-img{
            width:128rpx;
            height:140rpx;
        }
    
=======
	
	<view class="container">
		<view >
		<text class="nav-t">学习</text>
		</view>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList1" :key="i">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	<view >
	<text class="nav-t">事务</text>
	</view>
	<view class="container">
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList2" :key="i">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	</view>
	<view >
	<text class="nav-t">生活</text>
	</view>
	<view class="container">
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList3" :key="i">
				<image :src="item.imgPath" class="nav-img"></image>
				 <text class="func1_text">{{ item.name }}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
     
      navList1: [
				{ name: "课程表", imgPath: "../../static/function/class.png"},
				{ name: "教室预约", imgPath: "../../static/function/classes.png"},
				{ name: "导师互动", imgPath: "../../static/function/mentor.png" },
				{ name: "更多", imgPath: "../../static/function/more.png"}
			] ,
	  navList2: [
		{ name: "问卷投票", imgPath: "../../static/function/questionnaire.png"},
		     	{ name: "卫检成绩", imgPath: "../../static/function/score.png"},
		     	{ name: "接诉即办", imgPath: "../../static/function/complaint.png" },
		     	{ name: "更多", imgPath: "../../static/function/more.png"}
	  ],
		navList3:[
			{ name: "热水系统", imgPath: "../../static/function/water.png"},
			{ name: "公寓用电", imgPath: "../../static/function/electricity.png"},
			{ name: "失物招领", imgPath: "../../static/function/find.png" },
			{ name: "更多", imgPath: "../../static/function/more.png"}
		]
    }
  },
  onLoad() {
    this.navList1 = [ 
     { name: "课程表", imgPath: "../../static/function/class.png"},
     { name: "教室预约", imgPath: "../../static/function/classes.png"},
     { name: "导师互动", imgPath: "../../static/function/mentor.png" },
     { name: "更多", imgPath: "../../static/function/more.png"}
     ] ,
	 this.navList2 = [
		 { name: "问卷投票", imgPath: "../../static/function/questionnaire.png"},
		      	{ name: "卫检成绩", imgPath: "../../static/function/score.png"},
		      	{ name: "接诉即办", imgPath: "../../static/function/complaint.png" },
		      	{ name: "更多", imgPath: "../../static/function/more.png"}
	 ],
	 this.navList3 = [
		 { name: "热水系统", imgPath: "../../static/function/water.png"},
		 { name: "公寓用电", imgPath: "../../static/function/electricity.png"},
		 { name: "失物招领", imgPath: "../../static/function/find.png" },
		 { name: "更多", imgPath: "../../static/function/more.png"}
	 ]
  }
}
</script>

<style>
	.nav-list {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-around;
	    margin: 10rpx;
	    border-radius: 20rpx;
	    /* background-color: #ffffff; */
	    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
	  }
	  .nav-item {
	    border-radius: 16rpx; 
	    padding: 20rpx;
	    display: flex;
	    flex-direction: column;
	    align-items: center; 
	  	border: 0;
	  }
	  .nav-img {
	    width: 80rpx;
	    height: 80rpx;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		border-radius: 50%
	  }
	  .func1_text {
	    font-size: 28rpx;
	    color: #333333;
	    text-align: center;
		align-items: center;
		
	  }
	  .nav-t {
	      display: flex;
	      flex-wrap: wrap;
	      justify-content: space-around;
	      margin: 10rpx;
	      border-radius: 20rpx;
	      /* background-color: #ffffff; */
	      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
		  font-size: 20px;
	    }
>>>>>>> f9621ead623975911c1cfbbb373534460caa9a1a
</style>