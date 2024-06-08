"use strict";
const common_vendor = require("../common/vendor.js");
var socketTask = "";
var socketMsgQueue = {
  content: "",
  length: 0
};
var tabbarPathList = ["/pages/home/home", "/pages/function/function", "/pages/message/message", "/pages/myself/myself"];
const wsopen = () => {
  if (common_vendor.index.getStorageSync("token") != "") {
    socketTask = common_vendor.index.connectSocket({
      url: "ws://localhost:8080/websocket1",
      header: {
        Authorization: common_vendor.index.getStorageSync("token")
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
      console.log("ws receive ");
      let pages = getCurrentPages();
      if (res.data != "my心跳" && tabbarPathList.indexOf(pages[pages.length - 1].$page.fullPath) != -1) {
        socketMsgQueue.content = res.data;
        socketMsgQueue.length = socketMsgQueue.length + 1;
        common_vendor.index.setTabBarBadge({
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
const wssend = (msg) => {
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
const wsclose = () => {
  socketTask.close({
    //有待添加
    success: (res) => {
      console.log("ws closed ", res);
    }
  });
};
exports.socketMsgQueue = socketMsgQueue;
exports.wsclose = wsclose;
exports.wsopen = wsopen;
exports.wssend = wssend;
