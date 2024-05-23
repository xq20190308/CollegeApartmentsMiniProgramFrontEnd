"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      content: "Lorem",
      id: 87,
      isActive: true,
      publishTime: "1976-01-02 07:27:42",
      title: "学府属习",
      typeName: "律况平将体集题"
    };
  },
  props: {},
  onLoad(options) {
    console.log(options);
    this.content = options.content;
    this.id = options.id;
    this.isActive = options.isActive;
    this.publishTime = options.publishTime;
    this.title = options.title;
    this.typeName = options.typeName;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: common_vendor.t($data.typeName),
    c: common_vendor.t($data.content)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/notice/noticedetail.vue"]]);
wx.createPage(MiniProgramPage);
