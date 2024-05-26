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
  __name: "feedback",
  setup(__props) {
    const data = common_vendor.reactive({
      complaintDrafts: [{
        id: "1",
        describe: "初始数据",
        category: "宿舍",
        contactobject: "18765248196"
      }]
      // 初始为空数组
    });
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      fetchComplaintDrafts();
    });
    const fetchComplaintDrafts = async () => {
      const res = await utils_http.http("/api/suggestions", "POST", {});
      console.log("封装后请求的结果", res);
      data.complaintDrafts = res.data;
      console.log("data.complaintDrafts", data.complaintDrafts);
    };
    const onpress = () => {
      console.log("跳转到添加草稿，不需要携带id");
      common_vendor.index.navigateTo({
        url: "../feedback/feedbackSubmit"
      });
    };
    const change = (item) => {
      console.log("要修改id为", item.id, "的草稿");
      common_vendor.index.navigateTo({
        url: "../feedback/DraftFeedback?id=" + item.id
      });
    };
    const delet = (item, index) => {
      console.log("要删除id为", item.id, "的草稿");
      data.complaintDrafts.splice(index, 1);
      console.log(data.complaintDrafts);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.complaintDrafts, (item, index, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: common_vendor.t(item.describe),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.contactobject),
            e: common_vendor.o(($event) => change(item), index),
            f: common_vendor.o(($event) => delet(item, index), index),
            g: index
          };
        }),
        b: common_vendor.p({
          title: "我的草稿",
          ["sub-title"]: "",
          type: "line"
        }),
        c: common_vendor.o(onpress)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
