import { getLocalData,clearUserInfo } from "../utils/cache.js"
import { wsclose } from "./socket.js"
// const developUrl = 'http://192.168.39.204:82'
const developUrl = 'http://localhost:82'
//const developUrl = 'https://william.fit:8082'
const bkDevelopUrl = 'http://127.0.0.1:4523/m1/4414254-4059226-default'
const fileUrl = ''
// main 分支提交的测试数据: 
const baseUrl = ''
const httpInterceptor = {
	invoke(options) { //响应前的拦截
		if (!options.url.startsWith('http')) {
			options.url = developUrl + options.url
		//添加超时请求
		options.timeout = 1000000
		//console.log("拦截器", options.url,"  ",options)
		//添加请求头
		//添加token
		const token = getLocalData('token');
		
		options.header.Authorization = token;
		}else{
			// options.header.Authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQ4ZDFlNDkwLTE2YmItNDhkMC05ODYzLWMwODkwMTlhMmNmNiJ9.s7L0jxNTKr4PRKtxoIL4j_ZqA7sTm-olV1uZ0MgeI4FqtioSVxBM0EFoBWctXFgQ-ABAYd6YqOXhioAQaZ9d3Q"
			// options.header.Cookie = "Pycharm-a988aaf7=09264537-d521-4fa9-bcee-0145a8ddfcc2; username=admin; rememberMe=true; password=mySB+8Gzz0IM3J0Af5OsN+gNN/Fmr1zK0cFMf8ynjPn42TTq7OAcVvYxevlWKhZGTBs1UgSXS3khUhzhkRlFXA==; Admin-Token=eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQ4ZDFlNDkwLTE2YmItNDhkMC05ODYzLWMwODkwMTlhMmNmNiJ9.s7L0jxNTKr4PRKtxoIL4j_ZqA7sTm-olV1uZ0MgeI4FqtioSVxBM0EFoBWctXFgQ-ABAYd6YqOXhioAQaZ9d3Q"
		}
	},

}
//在request请求前进行拦截，调用httpInterceptor方法
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
export const load = (url, filePath, name, formData) => {
	//返回Promise 对象
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: url, //仅为示例，非真实的接口地址
			filePath: filePath,
			//传参传过去的名称
			name: name,
			//额外的参数
			formData: formData,
			header: {
				'Content-Type': 'multipart/form-data; charset=UTF-8'
			},
			success: (uploadFileRes) => {
				if (!uploadFileRes.data) {
					uni.showToast({
						title: "文件过大",
						icon: "error"
					})
					reject("文件过大")
				} else {
					resolve(JSON.parse(uploadFileRes.data))
				}
			},
			fail: (err) => {
				console.log("--", err);
				//和上面的resolve同理
				reject(err)
			}
		})
	})
}
export const http = (url, method, data) => {
	//返回Promise 对象
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {},
			//请求成功
			success(res) {
				//需对状态码进行分类处理，登录信息token
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data)
					console.log("success ",url,"  ",res)
				} else {
					if(res.statusCode==403||res.statusCode==401){
						console.log("令牌异常，res.statusCode=="+res.statusCode)
						wsclose()
						clearUserInfo()
						uni.showModal({
							title: '提示',
							content: '您未登录，是否前去登录',
							success: (res) => {
								if (res.confirm) { 
									uni.showLoading({
										title: "正在跳转",
										mask:true,
									})
									setTimeout(() => {
										uni.hideLoading();
										uni.reLaunch({
											url: "/pages/myself/myself"
										})
									}, 500)
								} else if (res.cancel) {
									uni.reLaunch({
										url: "/pages/home/home"
									})
								}
							}
						});
						//reject("令牌异常")
					}else{
						uni.showToast({
							title: "网路请求失败",
							icon: "error"
						})
						//reject("网络异常")
					}
					
				}

			},
			fail(err) {
				uni.showToast({
					title: "网路请求失败",
					icon: "error"
				})
				console.log("fail ",url,"  ",err)
				//reject(err) //需要处理请求失败的操作
			}
		})
	})
}
export const service = (url, method, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				'Authorization': `${uni.getStorageSync('token')}`
			},
			success: (res) => {
				console.log("success",url ,res)
				resolve(res)
			},
			fail: (err) => {
				console.log("fail", err)
				reject(err)
			}
		})

	})

}