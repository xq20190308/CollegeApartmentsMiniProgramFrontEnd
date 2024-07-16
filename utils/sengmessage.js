import { useUserStore } from "../store/User.js"
import { storeToRefs } from 'pinia'
const store=useUserStore()
export const subscribe=async ()=>{//弹窗订阅，需要点击事件触发
	wx.requestSubscribeMessage({
	  tmplIds: ['yTxSWrDTgHG44_PtbLQPNKHG2TrUlH2lPSQNyAGhwH4'],
	  success (res) {
		console.log("wx.res:",res)
		wx.getSetting({
			withSubscriptions: true,
			success (success) {
				console.log(success)
				if(JSON.stringify(success.subscriptionsSetting).indexOf('yTxSWrDTgHG44_PtbLQPNKHG2TrUlH2lPSQNyAGhwH4') != -1){
					console.log("用户选择了“保持以上选择”")
				}
			}
		})
	  },
	  fail (res) {console.log("wx.res:fail",res)},
	})
}
export const send=async ()=>{
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
	
}
export const check=()=>{
	uni.request({//获取个人模板列表，也是后端用的接口
		url:"https://api.weixin.qq.com/wxaapi/newtmpl/gettemplate?access_token="+access_token,
		success: (success) => {//2 为一次性订阅，3 为长期订阅
			console.log("success:",success)},
		fail: (fail) => {
			console.log("fail:",fail)
		},
	})
}