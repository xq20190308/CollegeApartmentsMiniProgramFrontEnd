import {getLocalData} from "../utils/cache.js"
const wsUrl= "ws://localhost:8080"
const wsInterceptor = {
	invoke(options) { //响应前的拦截
		if (!options.url.startsWith('ws')) {
			options.url = wsUrl + options.url
		}
		//添加超时请求
		options.timeout = 10000
		console.log("拦截器", options)
		//添加请求头，还没添加呢看啥看
		
		//添加token
		const token = getLocalData('token');
		options.header.Authorization=token;
	},

}
uni.addInterceptor('connectSocket', wsInterceptor)
export var socketTask = "";
export var socketMsgQueue = {
  content: "",
  length: 0
};
let isinit=false;
export var tabbarPathList = ["/pages/home/home", "/pages/function/function", "/pages/message/message", "/pages/myself/myself"];
export const wsopen = (url) => {
  if (uni.getStorageSync("token") != "") {
    socketTask = uni.connectSocket({
      url: url,
      header: {
      },
      method: "GET",
      success: (e) => {
        console.log("ws connected ", e);
      }
    });
    socketTask.onOpen((res) => {
      console.log("Ws open " + res.data);
    });
    socketTask.onMessage(async (res) => {
		if (res.data != "biu~biu~") {
			console.log("ws receive ", res.data);
			socketMsgQueue.content = res.data;
			socketMsgQueue.length = socketMsgQueue.length + 1;
			try{
				let pages = await  getCurrentPages();
				if(pages[pages.length - 1]==undefined||tabbarPathList.indexOf(pages[pages.length - 1].$page.fullPath) != -1){
					uni.setTabBarBadge({
						index: 2,
						// tabIndex，tabbar的哪一项，从0开始
						text: String(socketMsgQueue.length).length > 3 ? "99+" : String(socketMsgQueue.length)
						// 显示的文本，超过99显示成99+
					});
				}
			}catch(err){
				console.log(err);
			}
		}
    });
    socketTask.onError(function(res) {
      console.log("ws error " + res.errMsg);
    });
    socketTask.onClose(function(res) {
      console.log("ws close " + res.reson);
    });
  } else {
    console.log("未登录");
  }
};
export const wssend = (msg) => {
  socketTask.send({
    data: msg,
    success: (res) => {
      console.log("ws send successed ", res);
    },
    fail: (err) => {
      console.log("send fail ", err);
    }
  });
};
export const wsclose = () => {
  socketTask.close({
    //有待添加
    success: (res) => {
      console.log("ws closed ", res);
    }
  });
};
