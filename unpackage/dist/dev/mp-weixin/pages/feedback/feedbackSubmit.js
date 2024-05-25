"use strict";
const common_vendor = require("../../common/vendor.js");
const system_config = require("../../system.config.js");
const utils_http = require("../../utils/http.js");
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
  __name: "feedbackSubmit",
  setup(__props) {
    const data = common_vendor.reactive({
      id: null,
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
        category: [],
        pictures: []
        //上传图片.
        //imageValue:[]
      },
      // 表单数据
      customRules: {
        describes: {
          rules: [{
            required: true,
            errorMessage: "问题描述不能为空"
          }]
        },
        contactobject: {
          rules: [{
            required: true,
            errorMessage: "手机号不能为空"
          }, {
            minLength: 11,
            maxLength: 11,
            errorMessage: "请输入11位手机号"
          }]
        }
      }
    });
    const selectUpload = (e) => {
      console.log(2);
      common_vendor.index.uploadFile({
        url: system_config.sysurl.developUrl + "/api/upload",
        //仅为示例，非真实的接口地址
        filePath: e.tempFilePaths[0],
        name: "file",
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const baseForm = common_vendor.ref();
    const submit = async (ref) => {
      var _a;
      console.log(data.baseFormData);
      (_a = baseForm.value) == null ? void 0 : _a.validate([""]).then(async (res1) => {
        console.log("success", res1);
        common_vendor.index.showToast({
          title: `校验通过`
        });
        common_vendor.index.uploadFile({
          url: system_config.sysurl.developUrl + "/api/upload",
          files: data.baseFormData.pictures,
          success: (res2) => {
            console.log("uploadFile", res2);
          },
          fail: (err) => {
            console.log(err);
          }
        });
        const res = await utils_http.http("/api/suggestions", "POST", {
          describes: data.baseFormData.describes,
          contactobject: data.baseFormData.contactobject
          // category: this.baseFormData.category
        });
        console.log("封装后请求的结果", res);
        data.text = "request success";
        data.id = res.id;
        common_vendor.index.showToast({
          title: "提交成功"
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            //提交逻辑未与保存逻辑同步
            url: "/pages/feedback/feedback"
          });
        }, 2e3);
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const save = async () => {
      const res = await utils_http.http("/api/suggestionsDraft", "POST", {
        describes: data.baseFormData.describes,
        contactobject: data.baseFormData.contactobject
        // category: this.baseFormData.category
      });
      console.log("封装后请求的结果", res);
      data.text = "request success";
      data.id = res.id;
      common_vendor.index.showToast({
        title: "保存成功"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/feedback/feedback?pushtime=" + res[0] + "&ismodified=1"
        });
      }, 2e3);
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
          name: "describes",
          required: true
        }),
        g: common_vendor.sr("uniFilePicker", "29faea55-7,29faea55-6"),
        h: common_vendor.o(selectUpload),
        i: common_vendor.p({
          limit: "9",
          ["file-mediatype"]: "video,image",
          title: "最多选择9个图片",
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
          name: "contactobject",
          required: true
        }),
        n: common_vendor.sr(baseForm, "29faea55-1,29faea55-0", {
          "k": "baseForm"
        }),
        o: common_vendor.p({
          rules: data.customRules,
          modelValue: data.baseFormData
        }),
        p: common_vendor.p({
          title: "投诉与意见",
          type: "line"
        }),
        q: common_vendor.o(($event) => submit()),
        r: common_vendor.o(save)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/codes/CollegeApartmentsFrontE/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/feedbackSubmit.vue"]]);
wx.createPage(MiniProgramPage);
