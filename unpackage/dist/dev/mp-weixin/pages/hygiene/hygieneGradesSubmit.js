"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_file_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "hygieneGradesSubmit",
  setup(__props) {
    const data = common_vendor.reactive({
      weeks: ""
    });
    const add = async () => {
      let res = await utils_http.load("/api/updateData", "", "file", {
        weeks: data.weeks
      });
      console.log("封装后交给后端的", res);
    };
    return (_ctx, _cache) => {
      return {
        a: data.weeks,
        b: common_vendor.o(($event) => data.weeks = $event.detail.value),
        c: common_vendor.o(add),
        d: common_vendor.sr("uniFilePicker", "5a8ae1d6-1,5a8ae1d6-0"),
        e: common_vendor.o(_ctx.selectUpload),
        f: common_vendor.p({
          limit: "9",
          ["file-mediatype"]: "video,image",
          title: "最多选择9个图片",
          required: true
        }),
        g: common_vendor.p({
          title: "111"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
