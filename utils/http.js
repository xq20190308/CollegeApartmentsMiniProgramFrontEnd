import { getLocalData } from "../utils/cache.js"
const developUrl = 'http://localhost:8080'
const bkDevelopUrl = 'http://127.0.0.1:4523/m1/4414254-4059226-default'
const fileUrl = ''
// main 分支提交的测试数据: 
const baseUrl = ''
const httpInterceptor = {
	invoke(options) { //响应前的拦截
		if (!options.url.startsWith('http')) {
			options.url = developUrl + options.url
		}
		//添加超时请求
		options.timeout = 10000
		console.log("拦截器", options)
		//添加请求头，还没添加呢看啥看

		//添加token
		const token = getLocalData('token');
		
		options.header.Authorization = token;
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
			header: {},
			success: (uploadFileRes) => {
				if (uploadFileRes.data == '') {
					uni.showToast({
						title: "文件过大",
						icon: "error"
					})
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
					console.log("success", res)
				} else {
					uni.showToast({
						title: "网路请求失败",
						icon: "error"
					})
					reject(res)
				}

			},
			fail(err) {
				uni.showToast({
					title: "网路请求失败",
					icon: "error"
				})
				reject(err) //需要处理请求失败的操作
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
				console.log("success", res)
				resolve(res)
			},
			fail: (err) => {
				console.log("fail", err)
				reject(err)
			},
			complete: (res) => {
				console.log("complete", res)
			}
		})

	})

}