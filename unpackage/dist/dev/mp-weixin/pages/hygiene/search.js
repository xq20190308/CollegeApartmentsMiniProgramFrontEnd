"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  dSearchLog();
}
const dSearchLog = () => "../../uni_modules/d-search-log/components/d-search-log/d-search-log.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    common_vendor.reactive({
      color_border: "#ff00ff",
      search_list_hot: [],
      store_key: "search_list",
      input_text: ""
    });
    const onClickDelAll = () => {
      console.log("[父级接收事件]：删除全部搜索记录");
    };
    const onSearchName = () => {
      console.log("[父级接收事件]：点击搜索" + e);
    };
    const onpress = () => {
      console.log("教师端跳转到上传文件界面"), common_vendor.index.navigateTo({
        url: "/pages/hygiene/hygieneGradesSubmit"
      });
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickDelAll),
        b: common_vendor.o(onSearchName),
        c: common_vendor.p({
          color_border: _ctx.color_border,
          color_text: _ctx.color_border,
          search_list_hot: _ctx.search_list_hot,
          store_key: _ctx.store_key,
          input_text: _ctx.input_text
        }),
        d: common_vendor.o(onpress)
      };
    };
  }
};
wx.createPage(_sfc_main);
