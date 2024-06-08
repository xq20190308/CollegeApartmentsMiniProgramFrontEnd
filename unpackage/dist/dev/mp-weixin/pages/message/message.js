"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
const utils_socket = require("../../utils/socket.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const data = common_vendor.reactive({
      message: "",
      messages: "",
      locate: "bottom"
    });
    const mywssent = async () => {
      utils_socket.wssend(data.message);
    };
    common_vendor.onShow(() => {
    });
    setInterval(() => {
      data.messages = common_vendor.ref(utils_socket.socketMsgQueue.content);
    }, 1e3);
    return (_ctx, _cache) => {
      return {
        a: data.messages,
        b: common_vendor.o(($event) => data.message = $event),
        c: common_vendor.p({
          type: "line",
          placeholder: "",
          modelValue: data.message
        }),
        d: common_vendor.o(mywssent)
      };
    };
  }
};
wx.createPage(_sfc_main);
