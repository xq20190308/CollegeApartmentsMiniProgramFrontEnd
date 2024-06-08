"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "showFeed",
  setup(__props) {
    const data = common_vendor.reactive({
      info: {}
      // category: "课程"
      // contactobject: "11111111111"
      // describes: "测试一"
      // id: 148
      // path: "["http://localhost:8080/后端/static/3d1d6938-30c8-452e-b52c-dad682ff8189.jpg"]"
      // pushtime: "2024-06-02T15:07:47"
    });
    common_vendor.onLoad((options) => {
      data.info = JSON.parse(options.info);
      data.info.path = JSON.parse(data.info.path) ? JSON.parse(data.info.path) : [];
      console.log(data.info);
    });
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(data.info.category),
        b: common_vendor.p({
          title: "类别",
          type: "line"
        }),
        c: common_vendor.t(data.info.describes),
        d: common_vendor.p({
          title: "内容",
          type: "line"
        }),
        e: common_vendor.t(data.info.pushtime),
        f: common_vendor.p({
          title: "提交时间",
          type: "line"
        }),
        g: common_vendor.t(data.info.contactobject),
        h: common_vendor.p({
          title: "联系方式",
          type: "line"
        }),
        i: common_vendor.f(data.info.path, (item, index, i0) => {
          return {
            a: item
          };
        }),
        j: common_vendor.p({
          title: "附件",
          type: "line"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
