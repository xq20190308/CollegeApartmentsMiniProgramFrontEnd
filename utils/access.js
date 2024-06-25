import { useUserStore } from "../store/User";
export const goto = (url,condition)=> {
	const store = useUserStore()
	//console.log("页面跳转")
	console.log("判断权限",condition,store.user.userPermission[condition])
	if(store.user.userPermission[condition]==true){
		console.log(url,condition);
		if(url!=''){
			uni.navigateTo({
				url: url,
			});
		}
	}
	else{
		uni.showToast({
			title: "你没有权限",
			icon: "error"
		})
	}
}