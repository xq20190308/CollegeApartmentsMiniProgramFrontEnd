"use strict";
const common_vendor = require("../../common/vendor.js");
const system_config = require("../../system.config.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_file_picker2 + _easycom_uni_section2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_file_picker + _easycom_uni_section + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "DraftFeedback",
  setup(__props) {
    const data = common_vendor.reactive({
      categories: [{
        text: "课程",
        value: 0
      }, {
        text: "安全",
        value: 1
      }, {
        text: "其他",
        value: 2
      }],
      // 基础表单数据
      baseFormData: {
        contactobject: "",
        describes: "",
        category: "",
        //上传图片.
        imageValue: []
      },
      // 表单数据
      alignmentFormData: {
        name: "",
        age: ""
      },
      // 分段器数据
      current: 0,
      items: ["左对齐", "顶部对齐"],
      // 校验规则
      rules: {
        contactobject: {
          rules: [{
            required: true,
            errorMessage: "联系方式不能为空"
          }]
        }
      }
    });
    const submit = () => {
      common_vendor.index.request({
        url: system_config.sysurl.developUrl + "/api/suggestions",
        //仅为示例，并非真实接口地址。
        method: "POST",
        data: {
          describes: data.baseFormData.describes,
          contactobject: data.baseFormData.contactobject,
          category: data.baseFormData.category
        },
        success: (res) => {
          console.log(res.data);
          common_vendor.index.navigateTo({
            url: "/pages/feedback/feedback"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => data.baseFormData.category = $event),
        b: common_vendor.p({
          multiple: true,
          localdata: data.categories,
          modelValue: data.baseFormData.category
        }),
        c: common_vendor.p({
          label: "投诉分类",
          ["label-width"]: "100px",
          ["label-style"]: "font-size: 14px;",
          required: true
        }),
        d: common_vendor.o(($event) => data.baseFormData.describes = $event),
        e: common_vendor.p({
          type: "textarea",
          placeholder: "请输入您遇到的问题",
          modelValue: data.baseFormData.describes
        }),
        f: common_vendor.p({
          label: "  问题描述",
          ["label-width"]: "100px",
          ["label-style"]: "font-size: 14px;",
          required: true
        }),
        g: common_vendor.p({
          limit: "9",
          title: "最多选择9张图片",
          ["file-extname"]: "png,jpg",
          required: true
        }),
        h: common_vendor.p({
          title: ""
        }),
        i: common_vendor.p({
          limit: "9",
          ["file-mediatype"]: "video",
          title: "最多选择9个视频",
          required: true
        }),
        j: common_vendor.p({
          title: ""
        }),
        k: common_vendor.o(($event) => data.baseFormData.contactobject = $event),
        l: common_vendor.p({
          placeholder: "请输入手机号",
          modelValue: data.baseFormData.contactobject
        }),
        m: common_vendor.p({
          label: "手机号",
          required: true
        }),
        n: common_vendor.sr("baseForm", "90601a64-1,90601a64-0"),
        o: common_vendor.p({
          modelValue: data.baseFormData
        }),
        p: common_vendor.p({
          title: "投诉与意见",
          type: "line"
        }),
        q: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/DraftFeedback.vue"]]);
wx.createPage(MiniProgramPage);
