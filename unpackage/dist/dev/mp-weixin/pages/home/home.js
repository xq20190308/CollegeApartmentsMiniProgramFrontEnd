"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      bannerList: [
        { url: "static/swiper/swiper_school.jpg" },
        { url: "static/swiper/swiper_school.jpg" },
        { url: "static/swiper/swiper_school.jpg" },
        { url: "static/swiper/swiper_school.jpg" }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
