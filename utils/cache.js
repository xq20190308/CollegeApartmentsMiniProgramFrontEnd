// 存数据
// 单个具名函数导出
export function setLocalData(key, data) {
	// 基本类型的存放
	if (typeof data !== 'object' && typeof data !== undefined) {
		uni.setStorageSync(key, data)
	} else {
		// 引用类型的存放
		uni.setStorageSync(key, JSON.stringify(data))
	}
}


// 取数据
export const getLocalData = key => uni.getStorageSync(key) 

// 清数据
export const delLocalData = key => uni.removeStorageSync(key)

//清所有
export const clearLocalData = key => uni.clearStorageSync()