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
        describes: "初始数据",
        category: "宿舍",
        contactobject: "18765248196"
      }]
      // 初始为空数组
    });
    common_vendor.onLoad(() => {
      fetchComplaintDrafts();
    });
    const fetchComplaintDrafts = async () => {
      const res = await utils_http.http("/api/suggestions", "GET", {});
      console.log("封装后请求的结果", res.data.data);
      await data.complaintDrafts.concat(res.data);
      console.log("data.complaintDrafts", data.complaintDrafts);
      for (let i = 0; i < 3; i++) {
        data.complaintDrafts.push(
          {
            id: i,
            describes: "静态示例",
            category: "课程",
            contactobject: "18765248196"
          }
        );
      }
      console.log(data.complaintDrafts);
    };
    const onpress = () => {
      common_vendor.index.navigateTo({
        url: "../feedback/feedbackSubmit"
      });
    };
    const change = (item) => {
      console.log(item);
      common_vendor.index.navigateTo({
        url: "../feedback/DraftFeedback"
      });
    };
    const delet = (index) => {
      data.complaintDrafts.splice(index, 1);
      console.log(data.complaintDrafts);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.complaintDrafts, (item, index, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: common_vendor.t(item.describes),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.contactobject),
            e: common_vendor.o(($event) => change(item), index),
            f: common_vendor.o(($event) => delet(index), index),
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
