"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      complaintDrafts: [
        { describe: "问题投诉", id: 2 }
      ]
      // 初始为空数组
    };
  },
  onLoad() {
    this.fetchComplaintDrafts();
  },
  methods: {
    fetchComplaintDrafts() {
      common_vendor.index.request({
        url: "https://yourserver.com/api/complaint-drafts",
        // 替换为您的服务器接口URL
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200) {
            this.complaintDrafts = res.data;
          } else {
            console.error("Failed to fetch complaint drafts:", res);
          }
        },
        fail: (err) => {
          console.error("Request failed:", err);
        }
      });
    },
    onpress() {
      common_vendor.index.navigateTo({
        url: "../feedback/feedbackSubmit"
      });
    },
    onchange() {
      common_vendor.index.navigateTo({
        url: "../feedback/DraftFeedback"
      });
    },
    delet(thisid) {
      common_vendor.index.request({
        url: "11",
        method: "DEL",
        data: {
          id: thisid
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.complaintDrafts, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.delet(item.id), index),
        b: common_vendor.t(item.describe),
        c: index,
        d: common_vendor.o(($event) => _ctx.change(item), index)
      };
    }),
    b: common_vendor.p({
      title: _ctx.我的草稿,
      ["sub-title"]: "",
      type: "line"
    }),
    c: common_vendor.o((...args) => $options.onpress && $options.onpress(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
