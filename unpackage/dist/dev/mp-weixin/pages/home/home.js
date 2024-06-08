"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
const pages_notice_api_getnotices = require("../notice/api/getnotices.js");
require("../../app.js");
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
      func_list: [
        { name: "通知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "pu", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../pu/pu" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" },
        { name: "未知", imgPath: "../../static/tabBar/home_icon.png", pagePath: "../notice/notice" }
      ],
      plan: [
        "距离打工结束还有9999天\n",
        "早上好\n",
        "中午好\n",
        "晚上好\n"
      ]
    });
    const func1Click = (item) => {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    };
    const bannerclick = (index) => {
      console.log(data.articles);
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?id=" + data.articles[index].id
      });
    };
    common_vendor.onLoad(() => {
      pages_notice_api_getnotices.getarticles({ typeName: "主页" }).then((response) => {
        data.articles = response.sort((a, b) => a.id - b.id);
        for (let i = 0; i < data.articles.length; i++) {
          data.articles[i].url = "/static/home/swiper/schoolmark.jpg";
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.articles, (item, index, i0) => {
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
        c: common_vendor.f(data.plan, (item, index, i0) => {
          return {
            a: common_vendor.t(data.plan[index]),
            b: index
          };
        }),
        d: common_vendor.p({
          title: "未来倒计时",
          ["sub-title"]: "unique_words",
          thumbnail: "../../../../static/home/future_icon.png"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
