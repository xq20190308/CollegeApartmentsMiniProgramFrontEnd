// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return new Promise((resolve, reject) => {
	uni.request({
		url: '/dict/selectByLabel',
		data: dictType,
		method: 'POST',
		header:{},
		success: (res) => {
			console.log(res)
			resolve(res.data)
		},
		fail: (err) => {
			reject(err)
		}
	  })
	})
}