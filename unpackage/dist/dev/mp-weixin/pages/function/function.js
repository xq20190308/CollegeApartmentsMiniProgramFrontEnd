"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //分类功能区的数据列表
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.func_1List, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i,
        d: common_vendor.o(($event) => _ctx.func1Click(item), i)
      };
    }),
    b: common_vendor.f(_ctx.payImgList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: i
      };
    }),
    c: common_vendor.o((...args) => _ctx.hourseRepair && _ctx.hourseRepair(...args)),
    d: common_vendor.o((...args) => _ctx.commRepair && _ctx.commRepair(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/CollegeApartmentsMiniProgramFrontEnd/pages/function/function.vue"]]);
wx.createPage(MiniProgramPage);
