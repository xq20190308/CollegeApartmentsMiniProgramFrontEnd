"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_file_picker2 + _easycom_uni_section2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_file_picker + _easycom_uni_section + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "lostSubmit",
  setup(__props) {
    const data = common_vendor.reactive({
      //基础表单数据
      baseFormData: {
        pickLocation: "",
        pickTime: "",
        describes: "",
        contactobject: null,
        imageValue: []
      },
      // 分段器数据
      current: 0,
      items: ["左对齐", "顶部对齐"],
      rules: {
        pickLocation: {
          rules: [{
            required: true,
            errorMessage: "捡到的地点不能为空"
          }]
        },
        pickTime: {
          rules: [{
            required: true,
            errorMessage: "捡到的时间不能为空"
          }]
        },
        describes: {
          rules: [{
            required: true,
            errorMessage: "描述内容不能为空"
          }]
        },
        contactobject: {
          rules: [
            {
              required: true,
              errorMessage: "手机号不能为空"
            }
            // ,{
            // 	minLength: 11,
            // 	maxLength: 11,
            // 	errorMessage: '请输入11位手机号'
            // },
          ]
        }
      }
    });
    const baseForm = common_vendor.ref();
    const submit = async (ref) => {
      var _a;
      (_a = baseForm.value) == null ? void 0 : _a.validate().then(async (res1) => {
        console.log("success", res1);
        const res = await utils_http.http("/api/addFound", "POST", {
          category: "lost",
          describes: data.baseFormData.describes,
          contactobject: data.baseFormData.contactobject,
          pickTime: data.baseFormData.pickTime,
          pickLocation: data.baseFormData.pickLocation
        });
        console.log("封装后请求的结果", res);
        console.log(res.data);
        common_vendor.index.navigateTo({
          url: "../../pages/lostAndFound/lostAndFoundMysef"
        });
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const selectUpload = async (e) => {
    };
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => data.baseFormData.pickLocation = $event),
        b: common_vendor.p({
          placeholder: "请输入捡到的地点",
          modelValue: data.baseFormData.pickLocation
        }),
        c: common_vendor.p({
          label: "丢失的地点",
          required: true,
          name: "pickLocation"
        }),
        d: common_vendor.o(($event) => data.baseFormData.pickTime = $event),
        e: common_vendor.p({
          placeholder: "请输入捡到的时间",
          modelValue: data.baseFormData.pickTime
        }),
        f: common_vendor.p({
          label: "丢失的时间",
          required: true,
          name: "pickTime"
        }),
        g: common_vendor.o(($event) => data.baseFormData.describes = $event),
        h: common_vendor.p({
          type: "textarea",
          placeholder: "请输入描述",
          modelValue: data.baseFormData.describes
        }),
        i: common_vendor.p({
          label: "丢失物品描述",
          name: "describes",
          required: true
        }),
        j: common_vendor.sr("uniFilePicker", "26e767fa-9,26e767fa-8"),
        k: common_vendor.o(selectUpload),
        l: common_vendor.p({
          limit: "9",
          ["file-mediatype"]: "video,image",
          title: "最多选择9个图片",
          required: true
        }),
        m: common_vendor.p({
          title: ""
        }),
        n: common_vendor.o(($event) => data.baseFormData.contactobject = $event),
        o: common_vendor.p({
          placeholder: "请输入描述",
          modelValue: data.baseFormData.contactobject
        }),
        p: common_vendor.p({
          label: "联系方式",
          name: "contactobject",
          required: true
        }),
        q: common_vendor.sr(baseForm, "26e767fa-1,26e767fa-0", {
          "k": "baseForm"
        }),
        r: common_vendor.p({
          rules: data.rules,
          modelValue: data.baseFormData
        }),
        s: common_vendor.p({
          title: "失物招领",
          type: "line"
        }),
        t: common_vendor.o(($event) => submit())
      };
    };
  }
};
wx.createPage(_sfc_main);
