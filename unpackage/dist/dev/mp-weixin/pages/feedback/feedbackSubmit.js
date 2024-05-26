"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
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
      },
      onReady() {
        console.log("onReady 生命周期钩子被调用");
        this.$refs.baseForm.setRules(this.customRules);
      }
    };
  },
  methods: {
    selectUpload(e) {
      console.log(2);
      common_vendor.index.uploadFile({
        url: "http://localhost:8080/api/upload",
        //仅为示例，非真实的接口地址
        filePath: e.tempFilePaths[0],
        name: "file",
        // formData: {
        // 	'file': ''
        // },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    submit(ref) {
      console.log(this.baseFormData);
      this.$refs[ref].validate([""]).then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `校验通过`
        });
        common_vendor.index.uploadFile({
          url: "http://localhost:8080/api/upload",
          files: this.baseFormData.pictures,
          success: (res2) => {
            console.log(res2);
          }
        });
        common_vendor.index.request({
          url: "http://localhost:8080/api/suggestions",
          // 示例接口地址
          method: "POST",
          data: {
            describes: this.baseFormData.describes,
            contactobject: this.baseFormData.contactobject
            // category: this.baseFormData.category
          },
          success: (res2) => {
            console.log(res2.data);
            this.text = "request success";
            this.id = res2.id;
            common_vendor.index.navigateTo({
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
    },
    //保存和提交分别交到后端不同的地方
    save() {
      common_vendor.index.request({
        url: "http://localhost:8080/api/suggestionsDraft",
        //仅为示例，并非真实接口地址。
        method: "POST",
        data: {
          describes: this.baseFormData.describes,
          contactobject: this.baseFormData.contactobject
          // category: this.baseFormData.category
        },
        success: (res) => {
          console.log("save:", res.data);
          this.text = "request success";
          this.id = res.data.id;
          common_vendor.index.navigateTo({
            url: "/pages/feedback/feedback?id=${res.data}"
          });
        }
      });
    },
    select(e) {
      console.log("选择文件：", e);
      const files = e.tempFiles;
      files.forEach((file) => {
        this.uploadFile(file);
      });
    },
    uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);
      common_vendor.index.uploadFile({
        url: "http://localhost:8080/api/upload",
        files: formData,
        success: (res) => {
          console.log("文件上传成功", res);
        },
        fail: (err) => {
          console.log("文件上传失败", err);
        }
      });
    },
    progress(e) {
      console.log("上传进度：", e);
    }
  }
};
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.category = $event),
    b: common_vendor.p({
      multiple: true,
      localdata: $data.categories,
      modelValue: $data.baseFormData.category
    }),
    c: common_vendor.p({
      label: "投诉分类",
      ["label-width"]: "100px",
      ["label-style"]: "font-size: 14px;",
      required: true
    }),
    d: common_vendor.o(($event) => $data.baseFormData.describes = $event),
    e: common_vendor.p({
      type: "textarea",
      placeholder: "请输入您遇到的问题",
      modelValue: $data.baseFormData.describes
    }),
    f: common_vendor.p({
      label: "  问题描述",
      ["label-width"]: "100px",
      ["label-style"]: "font-size: 14px;",
      name: "describes",
      required: true
    }),
    g: common_vendor.sr("uniFilePicker", "0d147305-7,0d147305-6"),
    h: common_vendor.o($options.selectUpload),
    i: common_vendor.p({
      limit: "9",
      ["file-mediatype"]: "video,image",
      title: "最多选择9个图片",
      required: true
    }),
    j: common_vendor.p({
      title: ""
    }),
    k: common_vendor.o(($event) => $data.baseFormData.contactobject = $event),
    l: common_vendor.p({
      placeholder: "请输入手机号",
      modelValue: $data.baseFormData.contactobject
    }),
    m: common_vendor.p({
      label: "手机号",
      name: "contactobject",
      required: true
    }),
    n: common_vendor.sr("baseForm", "0d147305-1,0d147305-0"),
    o: common_vendor.p({
      rules: $data.customRules,
      modelValue: $data.baseFormData
    }),
    p: common_vendor.p({
      title: "投诉与意见",
      type: "line"
    }),
    q: common_vendor.o(($event) => $options.submit("baseForm")),
    r: common_vendor.o((...args) => $options.save && $options.save(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/feedbackSubmit.vue"]]);
wx.createPage(MiniProgramPage);
