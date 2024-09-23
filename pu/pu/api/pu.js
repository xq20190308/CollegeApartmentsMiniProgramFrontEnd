import {http} from '@/utils/http';
import { useLoginStore } from "../../../store/login.js";
import { usePuStore } from "@/store/pu/pu.js";
const loginInof = useLoginStore()
const puInfo = usePuStore()
export const getPuInfo = ()=>{
	http('/api/getPuInfo','POST',{
		username: loginInof.pu.username,
		password: loginInof.pu.password
	},).then((res)=>{
		//需要对code进行处理
		puInfo.myPuInfo=res.data
		console.log(puInfo.myPuInfo)
	})
}