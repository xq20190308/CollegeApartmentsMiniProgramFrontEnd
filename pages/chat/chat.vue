<template>
	<button @click="get">获取头像</button>
	<button @click="compress">压缩</button>
	<button @click="wstest">连接WS</button>
	<image :src="data.url"></image>
	<uni-file-picker limit="1" @select="selectUpload" file-mediatype="image" disable-preview>
		<image :src="data.url" class="avatar" />
	</uni-file-picker>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
		reactive,
		ref,
		watch
	} from "vue";
	import {
		http,
		load
	} from '@/utils/http'



	const data = reactive({
		url: '',
		file: null,
	})


	const wstest = async () => {
		console.log("点击ws")
		uni.connectSocket({
			url: "ws://localhost:8080/websocket",
			header: {},
			method: 'GET'
		})
		uni.onSocketOpen((res) => {
			console.log('WebSocket连接已打开！' + res.data);
		})
		uni.onSocketError(function(res) {
			console.log('WebSocket连接打开失败，请检查！', res);
		});
		uni.onSocketMessage((res) => {
			console.log("收到服务器内容" + res.data)
		})
		console.log("函数完成")

	}

	// // WebSocket构造函数，创建WebSocket对象
	// let ws = new WebSocket('ws://localhost:8080')

	// // 连接成功后的回调函数
	// ws.onopen = function(params) {
	// 	console.log('客户端连接成功')
	// 	// 向服务器发送消息
	// 	ws.send('hello')
	// };

	// // 从服务器接受到信息时的回调函数
	// ws.onmessage = function(e) {
	// 	console.log('收到服务器响应', e.data)
	// };

	// // 连接关闭后的回调函数
	// ws.onclose = function(evt) {
	// 	console.log("关闭客户端连接");
	// };

	// // 连接失败后的回调函数
	// ws.onerror = function(evt) {
	// 	console.log("连接失败了");
	// };


	// // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，这样服务端会抛异常。
	// window.onbeforeunload = function() {
	// 	ws.close();
	// }



	const compress = () => {
		uni.getImageInfo({
			src: data.url,
			success: function(res) {
				console.log(res);
				uni.compressImage({
					src: res.path,
					quality: 10,
					success: res1 => {
						console.log(res1)
						data.url = res1.tempFilePath
						load('/user/uploadavatar', data.url, "avatar").then(
							(res1) => {
								console.log("res1", res1);
							}
						)
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			fail: function(error) {
				console.error(error);
			}
		});
	}
	const selectUpload = (e) => {
		console.log(e);
		data.file = e.tempFilePaths[0];
	}
	const get = async () => {
		const res = await http('/user/getavatar', 'GET', {})
		data.url = res.data
		console.log(data.url);
	}
</script>

<style>
</style>