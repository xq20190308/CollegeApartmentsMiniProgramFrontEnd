"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: "",
      type: 0,
      name: "",
      descr: null,
      startTime: "",
      endTime: "",
      questionList: [],
      // 校验表单数据
      valiFormData: {
        name: "",
        age: "",
        introduction: ""
      },
      // 校验规则
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "年龄不能为空"
          }, {
            format: "number",
            errorMessage: "年龄只能输入数字"
          }]
        }
      },
      // 自定义表单数据
      customFormData: {
        name: "",
        age: ""
      },
      // 自定义表单校验规则
      customRules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "年龄不能为空"
          }]
        }
      }
    };
  },
  props: {},
  methods: {
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `校验通过`
        });
      }).catch((err) => {
        console.log("err", err);
      });
    }
  },
  computed: {},
  onLoad() {
  },
  onReady() {
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.customFormData.name = $event),
    b: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.customFormData.name
    }),
    c: common_vendor.p({
      label: "姓名",
      required: true,
      name: "name"
    }),
    d: common_vendor.o(($event) => $data.customFormData.age = $event),
    e: common_vendor.p({
      placeholder: "请输入学号",
      modelValue: $data.customFormData.age
    }),
    f: common_vendor.p({
      label: "学号",
      required: true,
      name: "age"
    }),
    g: common_vendor.sr("customForm", "30b3b361-1,30b3b361-0"),
    h: common_vendor.p({
      rules: $data.customRules,
      modelValue: $data.customFormData
    }),
    i: common_vendor.o(($event) => $options.submit("customForm")),
    j: common_vendor.p({
      title: "自定义校验规则",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_home/questionnaire_home.vue"]]);
wx.createPage(MiniProgramPage);
