import sysurl from "../system.config.js"

export const service = (url, method, data) => {
	return new Promise((resolve, reject) => {

		uni.request({
			url: sysurl.developUrl + url,
			method,
			data,
			header: {
				'Authorization': `${uni.getStorageSync('token')}`
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})

	})

}