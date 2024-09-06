import { ref, watch, reactive } from "vue";
import { getLocalData } from "../utils/cache.js"
import { useUserStore } from "../store/User.js";
const wsUrl = "wss://william.fit:8082"
// const wsUrl = "wss://localhost:8082"
const wsInterceptor = {
	invoke(options) { //响应前的拦截
		if (!options.url.startsWith('ws')) {
			options.url = wsUrl + options.url
		}
		//添加超时请求
		options.timeout = 10000
		//console.log("拦截器", options)
		//添加请求头，还没添加呢看啥看

		//添加token
		const token = getLocalData('token');
		options.header.Authorization = token;
	},

}
uni.addInterceptor('connectSocket', wsInterceptor)
export var socketTask = "";
// export var socketMsgQueue = reactive({
//   content: "",
//   length: 0
// });
export var tabbarPathList = ["/pages/home/home", "/pages/function/function", "/pages/myself/myself"];

export const wsopen = (url) => {
	socketTask = uni.connectSocket({
		url: url,
		header: {},
		method: "GET",
		sslVerify: false,
		success: (e) => {
			console.log("ws connected ", e);
		},
		fail:(err) => {
			console.log("ws connected fail", err);
		}
	});
	socketTask.onOpen(async (res) => {
		console.log("Ws open " + res);
	});
	onMessage();
	socketTask.onError(function (res) {
		console.log("ws error " + res);
	});
	const store=useUserStore();
	socketTask.onClose(function (res) {
		console.log("ws close " + res);
		if(store.token!=""){
			uni.showToast({
				icon:"error",
				title:"服务器异常"
			})}
		// 	uni.showModal({
		// 	title:"服务器异常，请重新登陆",
		// 	success: (res) => {
		// 		if(res.confirm){
		// 			//ostore.handledelogin()
		// 		}
		// 	}
		// }
		// )}
	});
};
export const onMessage = () => {
	socketTask.onMessage(async (res) => {
		//console.log("socket.js中的onMessage");
		if (res.data != "心跳") {
			//console.log("ws receive ", res.data);
			//socketMsgQueue.content = res.data;
			//console.log("socketMsgQueue",socketMsgQueue);
			// try{
			// 	let pages = await  getCurrentPages();
			// 	if(pages[pages.length - 1]==undefined||pages[pages.length - 1].$page.fullPath != '/pages/message/message'){
			// 		socketMsgQueue.length = socketMsgQueue.length + 0;
			// 	}else{
			// 		socketMsgQueue.length=0;
			// 		console.log("**",socketMsgQueue.length);
			// 	}
			// 	if(pages[pages.length - 1]==undefined||tabbarPathList.indexOf(pages[pages.length - 1].$page.fullPath) != -1){
			// 		console.log("++")
			// 		if(socketMsgQueue.length>0){
			// 			uni.setTabBarBadge({
			// 				index: 2,
			// 				// tabIndex，tabbar的哪一项，从0开始
			// 				text: String(socketMsgQueue.length).length > 2 ? "99+" : String(socketMsgQueue.length)
			// 				// 显示的文本，超过99显示成99+
			// 			});
			// 		}
			// 	}
			// }catch(err){
			// 	console.log(err);
			// }
			handleOnMessage(res.data);
		}
	});
}
export const handleOnMessage = (msg) => {
	console.log("handleOnMessage");
	uni.$emit("onMessage", msg);
}
export const wssend = (type, msg, ids) => {
	console.log("socketTask in wssend", socketTask)
	if (getLocalData('token') != '') {
		//console.log(ids);
		return new Promise((resolve, reject) => {
			console.log(
				JSON.stringify({
					type: type,
					data: msg,
					receiver: ids,
				}))
			socketTask.send({
				data: JSON.stringify({
					type: type,
					data: msg,
					receiver: ids,
				}),
				success: (res) => {
					console.log("ws send successed ", res);
					resolve('success');
				},
				fail: (err) => {
					console.log("send fail ", err);
					reject('error');
				}
			});
		})
	} else {
		
	}
};
export const wsclose = () => {
	console.log("socketTask",socketTask);
	if(socketTask!=""){
		socketTask.close({
			//有待添加
			success: (res) => {
				console.log("ws closed ", res);
			}
		});
	}
};
