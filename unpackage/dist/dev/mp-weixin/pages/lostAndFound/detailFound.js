"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.f(_ctx.showdata, (item, idex, i0) => {
      return {
        a: "9cda9cfa-2-" + i0 + "," + ("9cda9cfa-1-" + i0),
        b: "9cda9cfa-1-" + i0 + "," + ("9cda9cfa-0-" + i0),
        c: "9cda9cfa-0-" + i0,
        d: idex
      };
    }),
    b: common_vendor.p({
      ["show-switch"]: true,
      title: "自定义标题"
    }),
    c: _ctx.cover,
    d: common_vendor.p({
      title: "基础卡片",
      ["sub-title"]: "副标题",
      extra: "额外信息",
      padding: "10px 0",
      thumbnail: _ctx.avatar
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
