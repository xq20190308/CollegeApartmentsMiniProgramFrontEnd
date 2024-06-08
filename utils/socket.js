export var socketTask = "";
export var socketMsgQueue = {
  content: "",
  length: 0
};
export var tabbarPathList = ["/pages/home/home", "/pages/function/function", "/pages/message/message", "/pages/myself/myself"];
export const wsopen = () => {
  if (uni.getStorageSync("token") != "") {
    socketTask = uni.connectSocket({
      url: "ws://localhost:8080/websocket1",
      header: {
        Authorization: uni.getStorageSync("token")
      },
      method: "GET",
      success: (e) => {
        console.log("ws connected ", e);
      }
    });
    socketTask.onOpen((res) => {
      console.log("Ws open " + res.data);
    });
    socketTask.onMessage(function(res) {
      console.log("ws receive ", res.data);
      let pages = getCurrentPages();
      if (res.data != "biu~biu~" && tabbarPathList.indexOf(pages[pages.length - 1].$page.fullPath) != -1) {
        socketMsgQueue.content = res.data;
        socketMsgQueue.length = socketMsgQueue.length + 1;
        uni.setTabBarBadge({
          index: 2,
          // tabIndex，tabbar的哪一项，从0开始
          text: String(socketMsgQueue.length).length > 3 ? "99+" : String(socketMsgQueue.length)
          // 显示的文本，超过99显示成99+
        });
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
