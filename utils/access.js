export const goto = (url,condition)=> {
	console.log("页面跳转")
	if(uni.getStorageSync(condition)==true){
		console.log(url);
		uni.navigateTo({
			url: url,
		});		
	}
	else{
		uni.showToast({
			title: "你没有权限",
			icon: "error"
		})
	}
}