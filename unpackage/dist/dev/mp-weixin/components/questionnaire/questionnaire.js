"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "questionnaire",
  data() {
    return {};
  },
  props: {
    naireinfo: {
      type: Object,
      default: {
        id: "",
        type: 0,
        name: "",
        descr: null,
        startTime: "",
        endTime: "",
        questionList: []
      }
    }
  },
  methods: {},
  onLoad() {
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $props.naireinfo.name,
      type: "line",
      titleFontSize: "42rpx"
    }),
    b: common_vendor.t($props.naireinfo.descr),
    c: common_vendor.t($props.naireinfo.startTime)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/components/questionnaire/questionnaire.vue"]]);
wx.createComponent(Component);
