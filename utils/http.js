import sysurl from '../system.config.js';
const httpInterceptor = {
	invoke(options) { //响应前的拦截
		if (!options.url.startsWith('http')) {
			options.url = sysurl.developUrl + options.url
		}
		//添加超时请求
		options.timeout = 10000
		console.log("拦截器", options)
		//添加请求头
		
		
	},

}
uni.addInterceptor('request', httpInterceptor)

export const http = (url, method, data) => {
	//返回Promise 对象
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			//请求成功
			success(res) {
				//需对状态码进行分类处理，登录信息token
				console.log("--",res);
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data)
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
					title: "网路请求失败"
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