"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
const utils_access = require("../../utils/access.js");
const utils_cache = require("../../utils/cache.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const data = common_vendor.reactive({
      complaintDrafts: []
      // 初始为空数组
    });
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(async () => {
      await fetchComplaintDrafts();
      console.log("草稿箱:", data.complaintDrafts);
    });
    const lookFeed = () => {
      utils_access.goto("manageFeed", "feedbackManage");
    };
    const fetchComplaintDrafts = async () => {
      data.complaintDrafts = utils_cache.getLocalData("feedDraft") ? JSON.parse(utils_cache.getLocalData("feedDraft")) : "";
    };
    const onpress = () => {
      console.log("跳转到添加草稿，不需要携带id");
      common_vendor.index.navigateTo({
        url: "../feedback/feedbackSubmit"
      });
    };
    const change = (item, index) => {
      console.log("要修改inedx为", index, "的草稿");
      common_vendor.index.navigateTo({
        url: "../feedback/feedbackSubmit?contactobject=" + item.contactobject + "&describes=" + item.describes + "&path0=" + item.path + "&category=" + item.category + "&index=" + index
      });
    };
    const delet = (item, index) => {
      console.log("要删除id为", item.id, "的草稿");
      common_vendor.index.showModal({
        title: "提示",
        content: "确认删除该通知吗",
        success: async (r) => {
          if (r.confirm) {
            data.complaintDrafts.splice(index, 1);
            console.log("data.complaintDrafts", data.complaintDrafts);
            utils_cache.setLocalData("feedDraft", data.complaintDrafts);
            fetchComplaintDrafts();
          } else if (r.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(lookFeed),
        b: common_vendor.f(data.complaintDrafts, (item, index, i0) => {
          return {
            a: common_vendor.t(item.pushtime),
            b: common_vendor.t(item.describes),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.contactobject),
            e: common_vendor.t(item.path),
            f: common_vendor.o(($event) => change(item, index), index),
            g: common_vendor.o(($event) => delet(item, index), index),
            h: index
          };
        }),
        c: common_vendor.p({
          title: "我的草稿",
          ["sub-title"]: "",
          type: "line"
        }),
        d: common_vendor.o(onpress)
      };
    };
  }
};
wx.createPage(_sfc_main);
