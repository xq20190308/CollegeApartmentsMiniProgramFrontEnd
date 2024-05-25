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
      ismodified: 0,
      pushtime: " ",
      complaintDrafts: [{
        id: "1",
        describe: "初始数据",
        category: "宿舍",
        contactobject: "18765248196",
        pushtime: "2014-03-04 03:56:28"
      }]
      // 初始为空数组
    });
    common_vendor.onLoad(() => {
      if (data.ismodified) {
        console.log("query", this.$route.query.pushtime);
        fetchComplaintDrafts(this.$route.query.pushtime);
        data.ismodified = 0;
      } else {
        console.log("无query");
        fetchComplaintDrafts();
      }
    });
    const fetchComplaintDrafts = async (pushtime) => {
      const res = await utils_http.http("/api/suggestions/pushtime", "GET", {});
      console.log("封装后请求的结果", res);
      data.complaintDrafts.push(res);
      console.log(res);
      for (let i = 0; i < 3; i++) {
        data.complaintDrafts.push(
          {
            id: i,
            describe: "静态示例",
            category: "课程",
            contactobject: "18765248196",
            pushtime: "2014-03-04 03:56:28"
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
            b: common_vendor.t(item.describe),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.contactobject),
            e: common_vendor.t(item.pushtime),
            f: common_vendor.o(($event) => change(item), index),
            g: common_vendor.o(($event) => delet(index), index),
            h: index
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
