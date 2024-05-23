"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      bannerList: [
        { url: "/static/home/swiper/schoolmark.jpg" },
        { url: "/static/home/swiper/schoolmark.jpg" },
        { url: "/static/home/swiper/schoolmark.jpg" },
        { url: "/static/home/swiper/schoolmark.jpg" }
      ],
      func_list: [
        { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
        { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
        { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
        { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
        { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
        { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" }
      ]
    };
  },
  methods: {
    func1Click(item) {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    }
  },
  onLoad() {
    this.func_list = [
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" },
      { name: "功能", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../myself/myself" }
    ];
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
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
    }),
    c: common_vendor.t(_ctx.plan),
    d: common_vendor.p({
      title: "未来倒计时",
      ["sub-title"]: "unique_words",
      thumbnail: "../../../../static/home/future_icon.png"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/codes/CollegeApartmentsFrontE/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
