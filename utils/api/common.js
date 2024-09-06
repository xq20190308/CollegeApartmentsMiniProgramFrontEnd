export const handleMessageBar = (total)=>{
	if(total){
		uni.setTabBarBadge({
			index: 2,
			text: String(total).length > 2 ? "99+" : String(total)
		});					
	}else{
		uni.removeTabBarBadge({
			index:2
		})
	}
}