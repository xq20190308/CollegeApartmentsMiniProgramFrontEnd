"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      detail: {
        content: "Lorem",
        id: 87,
        isActive: true,
        publishTime: "1976-01-02 07:27:42",
        title: "学府属习",
        typeName: "律况平将体集题"
      }
    };
  },
  props: {},
  onLoad(options) {
    console.log(options);
    this.detail = JSON.parse(options.detail);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.detail.title),
    b: common_vendor.t($data.detail.typeName),
    c: common_vendor.t($data.detail.content)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/notice/noticedetail.vue"]]);
wx.createPage(MiniProgramPage);
