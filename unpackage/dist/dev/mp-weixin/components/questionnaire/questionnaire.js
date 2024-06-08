"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "questionnaire",
  props: {
    naireinfo: {
      type: Object,
      default: {
        id: "",
        type: 0,
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        questionList: null
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.naireinfo.description),
        b: common_vendor.t(__props.naireinfo.id),
        c: common_vendor.t(__props.naireinfo.type),
        d: common_vendor.t(__props.naireinfo.startTime),
        e: common_vendor.t(__props.naireinfo.endTime)
      };
    };
  }
};
wx.createComponent(_sfc_main);
