
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
export const getLocalAll = () => uni.getStorageInfo({
	success: function (res) {
		console.log(res);
	}
});
// 取数据
export const getLocalData = key => uni.getStorageSync(key) 

// 清数据
export const delLocalData = key => uni.removeStorageSync(key)

//清所有
export const clearLocalData = key => uni.clearStorageSync()

export const clearUserInfo = () => {
	delLocalData("token");
	delLocalData("trueName");
	delLocalData("username");
	delLocalData("accountManage");
	delLocalData("noticeManage");
	delLocalData("feedbackManage");
	delLocalData("questionnaireManage");
	delLocalData("avatarUrl");
}
export const setUserInfo = (res) => {
	setLocalData("isShowLocal",true)
	setLocalData("token", res.data.data.token)
	setLocalData("trueName", res.data.data.trueName);
	setLocalData("username", res.data.data.username);
	setLocalData("accountManage", res.data.data.userPermission.accountManage);
	setLocalData("noticeManage", res.data.data.userPermission.noticeManage);
	setLocalData("feedbackManage", res.data.data.userPermission.feedbackManage);
	setLocalData("questionnaireManage", res.data.data.userPermission.questionnaireManage);
}
					