"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const data = common_vendor.reactive({
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
    });
    const func1Click = (item) => {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    };
    const getonearticle = async () => {
      const res = await utils_http.http("/notifications", "GET", {});
      console.log("封装后请求的结果", res);
      data.articles = res.data;
      for (let i = data.articles.length; i < 2; i++) {
        data.articles.push({
          content: "Lorem",
          id: 87,
          isActive: true,
          publishTime: "1976-01-02 07:27:42",
          title: "学府属习",
          typeName: "律况平将体集题"
        });
      }
      console.log("轮播图数据", data.articles);
      for (let i = 0; i < data.articles.length; i++) {
        data.bannerList.push({ url: "/static/home/swiper/schoolmark.jpg" });
      }
    };
    const bannerclick = (index) => {
      console.log(data.articles);
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?detail=" + JSON.stringify(data.articles[index])
      });
    };
    common_vendor.onLoad(() => {
      getonearticle();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.bannerList, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.o(($event) => bannerclick(index), index),
            c: common_vendor.t(data.articles[index].title),
            d: index
          };
        }),
        b: common_vendor.f(data.func_list, (item, i, i0) => {
          return {
            a: item.imgPath,
            b: common_vendor.t(item.name),
            c: i,
            d: common_vendor.o(($event) => func1Click(item), i)
          };
        }),
        c: common_vendor.t(data.plan),
        d: common_vendor.p({
          title: "未来倒计时",
          ["sub-title"]: "unique_words",
          thumbnail: "../../../../static/home/future_icon.png"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/codes/CollegeApartmentsFrontE/CollegeApartmentsMiniProgramFrontEnd/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
