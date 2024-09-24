<template>
	<view class="banner">
		<view class="bar,barb">
			<uni-section type="line" title="账户绑定">
				<uni-collapse>
					<uni-collapse-item :title="account.title" v-for="(account,key) in loginInfo.loginInfos" :key="key"
						thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
						<view class="naireInfo">
							<text class="text-common">账号：</text><uni-easyinput v-model="account.username" placeholder="未绑定" disabled/>
							<text class="text-common">密码：</text><uni-easyinput type="password" v-model="account.password" placeholder="未绑定" disabled/>
							<view class="rowend">
								<button class="deletbutton" @click="account.login?loginInfo.unbind(key):loginInfo.modify(key)">{{account.login?"解绑":"绑定"}}</button>
								<!-- <button class="deletbutton" @click="loginInfo.unbind(key)">解绑</button> -->
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>			
		</view>

	</view>
</template>

<script setup>
import { useLoginStore } from "@/store/login.js";
const loginInfo = useLoginStore()
console.log(loginInfo.loginInfos)
</script>

<style>
	       
</style>
