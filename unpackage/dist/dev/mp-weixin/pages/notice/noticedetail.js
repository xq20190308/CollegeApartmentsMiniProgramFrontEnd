"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad(options) {
    const articleId = options;
    console.log("Article ID:", options);
    common_vendor.index.request({
      url: `前面是测试接口/api/articles/${articleId}`,
      success: (res) => {
        this.articleData = res;
      },
      fail: (err) => {
        console.error("Fetch error:", err);
      }
    });
  },
  data() {
    return {
      articleData: [
        { id: "3", title: "山东科技大学运动会", content: "圆满落幕", type_name: "校级", publish_time: "2024.5.21", is_active: "true" }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.articleData.title),
    b: common_vendor.t($data.articleData.type_name),
    c: common_vendor.t($data.articleData.content)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/notice/noticedetail.vue"]]);
wx.createPage(MiniProgramPage);
