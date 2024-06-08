"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
const pages_notice_api_getnotices = require("./api/getnotices.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_data_select2 + _easycom_uni_section2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_section + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "addnotice",
  setup(__props) {
    const data = common_vendor.reactive({
      types: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" }
      ],
      timer: null,
      //延时器，用于防抖处理
      //传到后端的数据
      newNotice: {
        //传到通知列表页面中的数据
        /*content: "修改4由于天气原因，原定于下周的考试安排已变更至下下周。"
        id: 7
        isActive: true
        publishTime: "2024-05-12T21:28:59"
        title: "修改考试延期3"
        typeName: "修改紧急"*/
      },
      id: null
    });
    const submit = async () => {
      const res = await utils_http.http("/notifications/modify", "POST", {
        ...data.newNotice,
        id: data.newNotice.id
      });
      console.log(res);
      common_vendor.index.showToast({
        title: "发布成功"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack({
          url: "notice"
        });
      }, 2e3);
    };
    const newdata = (value) => {
      clearTimeout(data.timer);
      data.timer = setTimeout(() => {
        console.log(value);
      }, 500);
      return value;
    };
    common_vendor.onLoad((options) => {
      if (options.id != null) {
        data.id = options.id;
        console.log("options", options);
      }
      pages_notice_api_getnotices.getarticles({ id: data.id }).then((response) => {
        data.newNotice = response[0];
        console.log("response", response);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => {
          data.newNotice.typeName = data.types[e].text;
          console.log(data.newNotice.typeName);
        }),
        b: common_vendor.p({
          localdata: data.types
        }),
        c: common_vendor.p({
          title: "通知类型（下拉选择）：",
          type: "line",
          padding: true
        }),
        d: common_vendor.o([($event) => data.newNotice.title = $event.detail.value, (e) => {
          data.newNotice.title = newdata(e.detail.value);
        }]),
        e: data.newNotice.title,
        f: common_vendor.p({
          title: "通知标题：",
          type: "line",
          padding: true
        }),
        g: common_vendor.o((e) => {
          data.newNotice.content = e;
          console.log(data.newNotice.content);
        }),
        h: common_vendor.o(($event) => data.newNotice.content = $event),
        i: common_vendor.p({
          type: "textarea",
          autoHeight: true,
          maxlength: "-1",
          placeholder: "请输入内容",
          modelValue: data.newNotice.content
        }),
        j: common_vendor.p({
          title: "通知内容",
          subTitle: "请输入通知的内容",
          type: "line",
          padding: true
        }),
        k: common_vendor.o(submit)
      };
    };
  }
};
wx.createPage(_sfc_main);
