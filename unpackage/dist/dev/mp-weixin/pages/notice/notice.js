"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      articles: [
        { id: "3", title: "通知", publish_time: "2024/5/20", is_active: "true" }
      ]
    };
  },
  methods: {
    todetail(id) {
      common_vendor.index.navigateTo({
        url: `../notice/noticedetail?articleId=${id}`
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
    a: common_vendor.f($data.articles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.publish_time),
        c: common_vendor.t(item.is_active),
        d: index,
        e: common_vendor.o(($event) => $options.todetail(item.id), index)
      };
    }),
    b: common_vendor.p({
      title: _ctx.学校通知,
      ["sub-title"]: "",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
