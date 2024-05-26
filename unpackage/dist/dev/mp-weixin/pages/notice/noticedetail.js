"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
require("../../system.config.js");
const _sfc_main = {
  __name: "noticedetail",
  setup(__props) {
    const data = common_vendor.reactive({
      detail: {
        content: "Lorem",
        id: 87,
        isActive: true,
        publishTime: "1976-01-02 07:27:42",
        title: "学府属习",
        typeName: "律况平将体集题"
      }
    });
    common_vendor.onLoad((options) => {
      console.log(options);
      data.detail = JSON.parse(options.detail);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(data.detail.title),
        b: common_vendor.t(data.detail.typeName),
        c: common_vendor.t(data.detail.content)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/lenovo/Desktop/CollegeApartmentsMiniProgramFrontEnd-questionnaire/pages/notice/noticedetail.vue"]]);
wx.createPage(MiniProgramPage);
