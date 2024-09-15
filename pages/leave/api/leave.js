import { http } from "../../../utils/http"

export const getMyPostList=(userid)=>{
	return http('/leavePosts/getByUserId?userId='+userid,'GET',{})
}