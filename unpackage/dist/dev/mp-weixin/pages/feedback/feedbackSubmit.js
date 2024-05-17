"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o(($event) => _ctx.baseFormData.name = $event),
    c: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: _ctx.baseFormData.name
    }),
    d: common_vendor.p({
      label: "姓名",
      required: true
    }),
    e: common_vendor.o(($event) => _ctx.baseFormData.age = $event),
    f: common_vendor.p({
      placeholder: "请输入年龄",
      modelValue: _ctx.baseFormData.age
    }),
    g: common_vendor.p({
      label: "年龄",
      required: true
    }),
    h: common_vendor.o(($event) => _ctx.baseFormData.sex = $event),
    i: common_vendor.p({
      localdata: _ctx.sexs,
      modelValue: _ctx.baseFormData.sex
    }),
    j: common_vendor.p({
      label: "性别",
      required: true
    }),
    k: common_vendor.o(($event) => _ctx.baseFormData.hobby = $event),
    l: common_vendor.p({
      multiple: true,
      localdata: _ctx.hobbys,
      modelValue: _ctx.baseFormData.hobby
    }),
    m: common_vendor.p({
      label: "兴趣爱好",
      required: true
    }),
    n: common_vendor.o(($event) => _ctx.baseFormData.introduction = $event),
    o: common_vendor.p({
      type: "textarea",
      placeholder: "请输入自我介绍",
      modelValue: _ctx.baseFormData.introduction
    }),
    p: common_vendor.p({
      label: "自我介绍"
    }),
    q: common_vendor.sr("baseForm", "7239b3e8-2,7239b3e8-1"),
    r: common_vendor.p({
      modelValue: _ctx.baseFormData
    }),
    s: common_vendor.p({
      title: "基本用法",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/feedbackSubmit.vue"]]);
wx.createPage(MiniProgramPage);
