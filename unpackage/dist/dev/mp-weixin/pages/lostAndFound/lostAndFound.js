"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_segmented_control2 + _easycom_uni_card2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "lostAndFound",
  setup(__props) {
    const data = common_vendor.reactive({
      items: ["寻物广场", "捡到的来找"],
      colors: ["#007aff", "#4cd964", "#dd524d"],
      current: 0,
      colorIndex: 0,
      activeColor: "#007aff",
      styleType: "button",
      AllItems: [
        { name: "耳机", img: "../../static/feedback/plus.png", describes: "求求你快显示出来吧，别报错谢谢" },
        { name: "耳机", img: "../../static/feedback/plus.png", describes: "求求你快显示出来吧，别报错谢谢阿巴巴巴巴巴" }
      ]
    });
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      fetchallItems();
    });
    const onClickItem = (e) => {
      if (data.current != e.currentIndex) {
        data.current = e.currentIndex;
      }
    };
    const fetchallItems = async () => {
      const res = await utils_http.http();
      console.log("封装后请求的结果", res);
      data.AllItems = res.data;
      console.log("data.allItems", data.AllItmes);
    };
    const changePage = () => {
      console.log("跳转到发布页面"), common_vendor.index.navigateTo({
        url: "../../pages/lostAndFound/lostAndFoundMysef"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: data.current,
          values: data.items,
          ["style-type"]: data.styleType,
          ["active-color"]: data.activeColor
        }),
        c: data.current === 0
      }, data.current === 0 ? {
        d: common_vendor.f(data.AllItems, (item, idex, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.describes),
            c: "5f4ad066-1-" + i0,
            d: common_vendor.p({
              title: "捡到的东西",
              ["sub-title"]: item.name,
              padding: "10px 0"
            }),
            e: idex
          };
        })
      } : {}, {
        e: data.current === 1
      }, data.current === 1 ? {
        f: common_vendor.f(data.AllItems, (item, idex, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.describes),
            c: "5f4ad066-2-" + i0,
            d: common_vendor.p({
              title: "丢失东西",
              ["sub-title"]: item.name,
              padding: "10px 0"
            }),
            e: idex
          };
        })
      } : {}, {
        g: common_vendor.o(changePage)
      });
    };
  }
};
wx.createPage(_sfc_main);
