<template>
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
    
</style>