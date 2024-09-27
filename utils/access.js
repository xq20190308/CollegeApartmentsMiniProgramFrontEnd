import { useUserStore } from "/store/User";
export const goto = (url,options)=> {
	if(options){
		url=url+"?info="+JSON.stringify(options)
	}
	uni.navigateTo({
		url: url,
	});
	// const store = useUserStore()
	//console.log("页面跳转")
	// console.log("判断权限",condition,store.user.userPermission[condition])
	// if(store.user.userPermission[condition]==true){
	// 	console.log(url,condition);
	// 	if(url!=''){
			
	// 	}
	// }
	// else{
	// 	uni.showToast({
	// 		title: "你没有权限",
	// 		icon: "error"
	// 	})
	// }
}