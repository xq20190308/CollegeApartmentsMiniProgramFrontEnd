"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  _component_uni_section();
}
const _sfc_main = {
  __name: "questionnaire",
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
        questionList: null
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: __props.naireinfo.name,
          type: "line",
          titleFontSize: "42rpx"
        }),
        b: common_vendor.t(__props.naireinfo.descr),
        c: common_vendor.t(__props.naireinfo.questionList),
        d: common_vendor.t(__props.naireinfo.startTime)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/components/questionnaire/questionnaire.vue"]]);
wx.createComponent(Component);
