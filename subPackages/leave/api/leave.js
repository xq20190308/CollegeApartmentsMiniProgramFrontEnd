import { http } from "../../../utils/http"

export const getMyPostList=(userid)=>{
	return http('/leavePosts/getByUserId?userId='+userid,'GET',{})
}
export const gotoInfo=(info)=>{
	uni.navigateTo({
		url:"../chat/chatinfo?info="+JSON.stringify({userid:info})+"&back="+false
	})
}