"use strict";
const common_vendor = require("../../common/vendor.js");
const system_config = require("../../system.config.js");
const _sfc_main = {
  data() {
    return {
      articles: [],
      bannerList: [],
      func_list: [
        { name: "通知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" }
      ],
      plan: ["planA", "planB"]
    };
  },
  methods: {
    func1Click(item) {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    },
    getonearticle() {
      common_vendor.index.request({
        url: system_config.sysurl.developUrl + "/notifications",
        method: "GET",
        success: (res) => {
          console.log("获得轮播图的数据", res);
          this.articles = res.data.data;
          for (let i = this.articles.length; i < 2; i++) {
            this.articles.push({
              content: "Lorem",
              id: 87,
              isActive: true,
              publishTime: "1976-01-02 07:27:42",
              title: "学府属习",
              typeName: "律况平将体集题"
            });
          }
          console.log("轮播图数据", this.articles);
          for (let i = 0; i < this.articles.length; i++) {
            this.bannerList.push({ url: "/static/home/swiper/schoolmark.jpg" });
          }
        },
        fail: (err) => {
          console.error("Fetch error:", err);
        }
      });
    },
    bannerclick(index) {
      console.log(this.articles);
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?detail=" + JSON.stringify(this.articles[index])
      });
    }
  },
  onLoad() {
    this.getonearticle();
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
        b: common_vendor.o(($event) => $options.bannerclick(index), index),
        c: common_vendor.t(this.articles[index].title),
        d: index
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
    c: common_vendor.t($data.plan),
    d: common_vendor.p({
      title: "未来倒计时",
      ["sub-title"]: "unique_words",
      thumbnail: "../../../../static/home/future_icon.png"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
