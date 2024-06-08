"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "manageFeed",
  setup(__props) {
    const data = common_vendor.reactive({
      complaintDrafts: []
      // 初始为空数组
    });
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      fetchComplaintDrafts();
    });
    const fetchComplaintDrafts = async () => {
      const res = await utils_http.http("/api/manageSuggestions", "GET", {});
      data.complaintDrafts = res;
      console.log("data.complaintDrafts", data.complaintDrafts);
    };
    const look = (item) => {
      console.log(item.id);
      common_vendor.index.navigateTo({
        url: "../feedback/showFeed?info=" + JSON.stringify(item)
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.complaintDrafts, (item, index, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: common_vendor.t(item.describes),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.contactobject),
            e: common_vendor.t(item.pushtime),
            f: common_vendor.o(($event) => look(item), index),
            g: index
          };
        }),
        b: common_vendor.p({
          title: "已提交投诉",
          ["sub-title"]: "",
          type: "line"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
