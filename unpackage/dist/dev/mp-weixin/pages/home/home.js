"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      bannerList: [
        { url: "/static/swiper/schoolmark.jpg" },
        { url: "/static/swiper/schoolmark.jpg" },
        { url: "/static/swiper/schoolmark.jpg" },
        { url: "/static/swiper/schoolmark.jpg" }
      ],
      func_list: []
      // 初始化 func_list 为一个空数组
    };
  },
  onLoad() {
    this.func_list = [
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself" }
      // 其他功能项...
    ];
  },
  methods: {
    func1Click(item) {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    b: common_vendor.f($data.func_list, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i,
        d: common_vendor.o(($event) => $options.func1Click(item), i)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
