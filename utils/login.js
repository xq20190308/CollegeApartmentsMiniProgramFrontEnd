import { useLoginStore } from "../store/login.js";
const loginInof = useLoginStore()
export const tologin=()=>{
	login()
}
export const login = (route, title, url) => {
	uni.navigateTo({
		url: "../../pages/dict/dict?title="+title+"&url="+url,
	})
}