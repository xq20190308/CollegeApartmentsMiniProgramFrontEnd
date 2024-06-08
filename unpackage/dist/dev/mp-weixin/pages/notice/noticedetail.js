"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_access = require("../../utils/access.js");
require("../../utils/http.js");
const pages_notice_api_getnotices = require("./api/getnotices.js");
const _sfc_main = {
  __name: "noticedetail",
  setup(__props) {
    const data = common_vendor.reactive({
      detail: {
        id: null
      },
      types: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" }
      ],
      option: null
    });
    common_vendor.onShow(() => {
      pages_notice_api_getnotices.getarticles({ id: data.option }).then((response) => {
        data.detail = response[0];
      });
    });
    common_vendor.onLoad((options) => {
      console.log(options.id);
      data.option = options.id;
      console.log("data.option", data.option);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.detail.id != null
      }, data.detail.id != null ? {
        b: common_vendor.t(data.detail.id),
        c: common_vendor.t(data.detail.title),
        d: common_vendor.o(($event) => common_vendor.unref(utils_access.goto)("addnotice?id=" + data.detail.id, "noticeManage")),
        e: common_vendor.t(data.detail.typeName),
        f: common_vendor.t(data.detail.content)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
