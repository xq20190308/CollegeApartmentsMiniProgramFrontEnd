import {http} from '@/utils/http'
export const update = (id,status)=>{
	console.log("update",id," ",status)
	http("/api/updateState","POST",{id:id,status:status}).then((res)=>{
		uni.showToast({
			icon:'success',
			title:res.msg
		})
		return res.msg
	})
}