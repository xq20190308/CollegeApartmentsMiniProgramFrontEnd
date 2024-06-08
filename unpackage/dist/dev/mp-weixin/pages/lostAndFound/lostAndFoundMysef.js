"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/http.js");
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
  __name: "lostAndFoundMysef",
  setup(__props) {
    const data = common_vendor.reactive({
      items: ["我丢失的", "我捡到的"],
      colors: ["#007aff", "#4cd964", "#dd524d"],
      current: 0,
      colorIndex: 0,
      activeColor: "#007aff",
      styleType: "button",
      lostandfound: [
        {
          name: "脑子",
          describes: "可恶，我的脑子呢"
        },
        {
          name: "脑子",
          describes: "可恶，我的脑子呢"
        }
      ]
    });
    const onClickItem = (e) => {
      if (data.current != e.currentIndex) {
        data.current = e.currentIndex;
      }
    };
    const add = () => {
      if (data.current === 0) {
        common_vendor.index.navigateTo({
          url: "/pages/lostAndFound/lostSubmit"
        });
      } else if (data.current === 1) {
        common_vendor.index.navigateTo({
          url: "/pages/lostAndFound/foundSubmit"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: data.current,
          values: data.items,
          ["active-color"]: data.activeColor
        }),
        c: data.current === 0
      }, data.current === 0 ? {
        d: common_vendor.f(data.lostandfound, (item, index, i0) => {
          return {
            a: common_vendor.t(item.describes),
            b: "2951d18b-1-" + i0,
            c: common_vendor.p({
              title: item.name
            }),
            d: common_vendor.o(add, index),
            e: index
          };
        })
      } : {}, {
        e: data.current === 1
      }, data.current === 1 ? {
        f: common_vendor.f(data.lostandfound, (item, index, i0) => {
          return {
            a: common_vendor.t(item.describes),
            b: "2951d18b-2-" + i0,
            c: common_vendor.p({
              title: item.name
            }),
            d: common_vendor.o(add, index),
            e: index
          };
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
