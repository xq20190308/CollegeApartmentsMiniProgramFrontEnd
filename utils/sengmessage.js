import { useUserStore } from "../store/User.js"
import { storeToRefs } from 'pinia'
import { http } from "./http.js"
const store=useUserStore()
export const subscribe=async (templateId)=>{//弹窗订阅，需要点击事件触发
	console.log(templateId)
	let templateIds=[]
	templateIds.push(templateId)
	console.log(templateIds)
	await wx.requestSubscribeMessage({
	  tmplIds: templateIds,
	  success (res) {
		console.log("wx.res:",res)
		// wx.getSetting({
		// 	withSubscriptions: true,
		// 	success (success) {
		// 		console.log(success)
		// 		if(JSON.stringify(success.subscriptionsSetting).indexOf(templateId) != -1){
		// 			console.log("用户选择了“保持以上选择”")
		// 		}
		// 	}
		// })
	  },
	  fail (res) {console.log("wx.res:fail",res)},
	})
}
export const test=async ()=>{
	let templateIds=[]
	templateIds.push("yTxSWrDTgHG44_PtbLQPNKHG2TrUlH2lPSQNyAGhwH4")
await wx.requestSubscribeMessage({
  tmplIds: templateIds,
  success (res) {
	console.log("wx.res:",res)
	let access_token=""
	uni.request({//获得access_token，接口调用凭证
		url:"https://api.weixin.qq.com/cgi-bin/token",
		data:{
			grant_type:"client_credential",
			appid:"wx3b5ec6e4e336f19e",
			secret:"adb45243c65766fca8e5c94454a39ef0"
		},
		complete:async (res) => {
			await console.log("++access_token请求：",res.data.access_token)
			access_token=res.data.access_token
			console.log("store.user.openid.length：",store.user.openid.length)
			uni.request({//发推送消息，工作应该由后端完成
				url:"https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+access_token,
				method:"POST",
				data:{
					"touser": store.user.openid,
					"template_id": "yTxSWrDTgHG44_PtbLQPNKHG2TrUlH2lPSQNyAGhwH4",
					"miniprogram_state":"developer",
					"lang":"zh_CN",
					"page":"pages/home/home",
					"data": {
					  "thing5": {
						  "value": "导师姓名"
					  },
					  "thing4": {
						  "value": "备注"
					  },
					  "name1": {
						  "value": "学生姓名"
					  } ,
					  "date3": {
						  "value": "2019-10-10 14:00:00"
					  }
					}
				},
				success: (s) => {
					console.log("s:",s)
				},
				fail: (f) => {
					console.log("f:",f)
				},
			})
		}
	})
  },
  fail (res) {console.log("wx.res:fail",res)},
})
}
export const send = async(userid,templateId,data)=>{//后端发，应该前端传userid
	let datatest=JSON.parse(data)
	// console.log(datatest)
	for(let item in datatest){
		// console.log(datatest[item])
		if(datatest[item].value==''){
			uni.showToast({
				icon:'error',
				title:'请填写完整'
			})
			return
		}
	}
	if(userid==''){
		uni.showToast({
			icon:'error',
			title:'请填写完整'
		})
		return
	}
	const res=await http("/subscribe","POST",{
		userid: userid,
		templateId: templateId,
		page:"pages/home/home",
		data:data
	})
	console.log("res:",res);
	if(res.msg!="success"){
		uni.showToast({
			icon:'error',
			title:'推送失败',
		})
	}
}
export const check=async()=>{
	const res=await http("/subscribe/getTemplates","GET",{});
	console.log("模板列表",res.data)
	return res.data;
}