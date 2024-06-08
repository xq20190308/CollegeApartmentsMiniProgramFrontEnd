"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const utils_http = require("../../utils/http.js");
const utils_time = require("../../utils/time.js");
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
      categoryindex: null,
      index: "",
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
        path0: [],
        //path1: [],
        path: []
        //上传图片.
        //imageValue:[]
      },
      // 表单数据
      customRules: {
        category: {
          rules: [{
            required: true,
            errorMessage: "请选择分类"
          }]
        },
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
      console.log(e);
      data.baseFormData.path0.push(e.tempFiles[0]);
      console.log("this.baseFormData.path0", data.baseFormData.path0);
    };
    const baseForm = common_vendor.ref();
    const submit = (ref) => {
      var _a;
      console.log(data.baseFormData);
      (_a = baseForm.value) == null ? void 0 : _a.validate([""]).then(async (res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `校验通过`
        });
        for (var i = 0; i < data.baseFormData.path0.length; i++) {
          await utils_http.load("http://localhost:8080/api/upload", data.baseFormData.path0[i].url, "files").then(
            (res1) => {
              console.log("res1", res1);
              data.baseFormData.path.push(res1.data);
            }
          );
        }
        console.log("this.baseFormData.path", data.baseFormData.path);
        common_vendor.index.request({
          url: "http://localhost:8080/api/suggestions",
          method: "POST",
          data: {
            describes: data.baseFormData.describes,
            contactobject: data.baseFormData.contactobject,
            category: data.baseFormData.category,
            path: JSON.stringify(data.baseFormData.path)
          },
          header: {
            Authorization: ""
          },
          success: (res2) => {
            console.log("success", res2.data);
            data.text = "request success";
            data.id = res2.id;
            common_vendor.index.navigateBack({
              url: "/pages/feedback/feedback"
            });
          },
          fail: (err) => {
            console.log("request failed", err);
          }
        });
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const save = async () => {
      console.log("++data.index", data.index);
      console.log("--", JSON.parse(utils_cache.getLocalData("feedDraft") ? utils_cache.getLocalData("feedDraft") : "[]"));
      let newlist;
      if (data.index === "") {
        console.log('data.index==" "');
        newlist = JSON.parse(utils_cache.getLocalData("feedDraft") ? utils_cache.getLocalData("feedDraft") : "[]");
      } else {
        console.log("data.index", data.index);
        newlist = JSON.parse(utils_cache.getLocalData("feedDraft") ? utils_cache.getLocalData("feedDraft") : "[]").filter((item, index) => index !== data.index);
      }
      console.log("newlist", newlist);
      await utils_cache.setLocalData("feedDraft", [
        ...newlist,
        {
          describes: data.baseFormData.describes,
          contactobject: data.baseFormData.contactobject,
          category: data.baseFormData.category,
          path: JSON.stringify(data.baseFormData.path0),
          pushtime: utils_time.getCurrentTime()
        }
      ]);
      common_vendor.index.navigateBack({
        url: "/pages/feedback/feedback"
      });
    };
    common_vendor.onShow(() => {
    });
    common_vendor.onLoad(async (options) => {
      console.log("需要获取已经草稿的内容", Number(options.index));
      if (options.index != null) {
        data.categoryindex = options.category == "课程" ? 0 : options.category == "安全" ? 1 : options.category == "其他" ? 2 : null;
        data.baseFormData.category = options.category;
        data.baseFormData.contactobject = options.contactobject;
        data.baseFormData.describes = options.describes;
        data.baseFormData.path0 = JSON.parse(options.path0);
        data.index = Number(options.index);
        console.log("data.baseFormData", data.baseFormData);
        console.log("data.categoryindex", data.categoryindex);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => {
          data.baseFormData.category = e.detail.data.text;
          console.log("--", data.baseFormData.category);
        }),
        b: common_vendor.o(($event) => data.categoryindex = $event),
        c: common_vendor.p({
          localdata: data.categories,
          modelValue: data.categoryindex
        }),
        d: common_vendor.p({
          label: "投诉分类",
          ["label-width"]: "100px",
          ["label-style"]: "font-size: 14px;",
          name: "category",
          required: true
        }),
        e: common_vendor.o(($event) => data.baseFormData.describes = $event),
        f: common_vendor.p({
          type: "textarea",
          placeholder: "请输入您遇到的问题",
          modelValue: data.baseFormData.describes
        }),
        g: common_vendor.p({
          label: "  问题描述",
          ["label-width"]: "100px",
          ["label-style"]: "font-size: 14px;",
          name: "describes",
          required: true
        }),
        h: common_vendor.sr("uniFilePicker", "0d147305-7,0d147305-6"),
        i: common_vendor.o(selectUpload),
        j: common_vendor.o((e) => {
          console.log(e);
          data.baseFormData.path0.splice(e.index, 1);
          console.log(data.baseFormData.path0);
        }),
        k: common_vendor.o(($event) => console.log(data.baseFormData.path0)),
        l: common_vendor.p({
          modelValue: data.baseFormData.path0,
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
          placeholder: "请输入手机号",
          modelValue: data.baseFormData.contactobject
        }),
        p: common_vendor.p({
          label: "手机号",
          name: "contactobject",
          required: true
        }),
        q: common_vendor.sr(baseForm, "0d147305-1,0d147305-0", {
          "k": "baseForm"
        }),
        r: common_vendor.p({
          rules: data.customRules,
          modelValue: data.baseFormData
        }),
        s: common_vendor.p({
          title: "投诉与意见",
          type: "line"
        }),
        t: common_vendor.o(($event) => submit()),
        v: common_vendor.o(save)
      };
    };
  }
};
wx.createPage(_sfc_main);
