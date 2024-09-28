import { http } from '@/utils/http';
import { useMentorStore } from '/subPackage1/store/study/mentor';
const MentorStore =useMentorStore()
export const getMentors =(refresh)=>{
	if(MentorStore.mentor_list.length===0||refresh){
		http('/user/findByUserLevel?userLevel='+1,'GET',{},).then((res)=>{
			console.log("导师信息表",res.data)
			MentorStore.mentor_list=res.data
		})
	}
}
export const getReviewers = (level)=>{
	return http('/user/findByUserLevel?userLevel='+level,'GET',{},)
}