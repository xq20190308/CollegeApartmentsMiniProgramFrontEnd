"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 基础表单数据
      baseFormData: {
        contactobject: "",
        describes: "",
        category: ""
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
    };
  },
  //     export default {
  //         data() {
  //             return {
  //                 // 基础表单数据
  //                 baseFormData: {            
  //                     contactobject: '',
  //                     describes: '',
  //                     category: '',
  //                 },
  //                 // 表单数据
  //                 alignmentFormData: {
  //                     name: '',
  //                     age: '',
  //                 },
  //                 // 单选数据源
  //                 // 多选数据源
  //                 // categories: [{
  //                 //     text: '宿舍管理',
  //                 //     value: 0
  //                 // }, {
  //                 //     text: '饮水机问题',
  //                 //     value: 1
  //                 // }, {
  //                 //     text: '图书馆问题',
  //                 //     value: 2
  //                 // }, {
  //                 //     text: '足球',
  //                 //     value: 3
  //                 // }, {
  //                 //     text: '篮球',
  //                 //     value: 4
  //                 // }, {
  //                 //     text: '其他',
  //                 //     value: 5
  //                 // }],
  //                 // 分段器数据
  //                 current: 0,
  //                 items: ['左对齐', '顶部对齐'],
  //                 // 校验表单数据
  //                 valiFormData: {
  //                     name: '',
  //                     age: '',
  //                     introduction: '',
  //                 },
  //                 // 校验规则
  //                 rules: {
  //                     contactobject: {
  //                         rules: [{
  //                             required: true,
  //                             errorMessage: '联系方式不能为空'
  //                         }]
  //                     }
  //                 // 自定义表单数据
  //                 // customFormData: {
  //                 //     name: '',
  //                 //     age: '',
  //                 //     hobby: []
  //                 // },
  //                 // // 自定义表单校验规则
  //                 // customRules: {
  //                 //     category: {
  //                 //         rules: [{
  //                 //                 format: 'array'
  //                 //             },
  //                 //             {
  //                 //                 validateFunction: function(rule, value, data, callback) {
  //                 //                     if (value.length < 1) {
  //                 //                         callback('请至少勾选一个分类标签')
  //                 //                     }
  //                 //                     return true
  //                 //                 }
  //                 //             }
  //                 //         ]
  //                 //     }
  //                 // },
  //             // submit(ref) {
  //             //     this.$refs[ref].validate().then(res => {
  //             //         console.log('success', res);
  //             //         uni.showToast({
  //             //             title: `校验通过`
  //             //         })
  //             //     }).catch(err => {
  //             //         console.log('err', err);
  //             //     })
  //             // },
  //         }
  //         }
  //         },
  //     methods:{
  //         uni.request({
  //             url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
  //             method:'POST';
  //                 data: {
  //                 describes:this.baseFormData.describes;
  //                         contactobject:this.baseFormData.contactobject;
  //                         category:this.baseFormData.category;
  //             },
  //             success: (res) => {
  //                 console.log(res.data);
  //                 this.text = 'request success';
  //             }
  //         })
  //     }
  //     }
  methods: {
    submit() {
      common_vendor.index.request({
        url: "https://www.example.com/request",
        //仅为示例，并非真实接口地址。
        method: "POST",
        data: {
          describes: this.baseFormData.describes,
          contactobject: this.baseFormData.contactobject,
          category: this.baseFormData.category
        },
        success: (res) => {
          console.log(res.data);
          this.text = "request success";
          common_vendor.index.navigateTo({
            url: "/pages/feedback/feedback"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.category = $event),
    b: common_vendor.p({
      multiple: true,
      localdata: _ctx.categories,
      modelValue: $data.baseFormData.category
    }),
    c: common_vendor.p({
      label: "投诉分类",
      required: true
    }),
    d: common_vendor.o(($event) => $data.baseFormData.describes = $event),
    e: common_vendor.p({
      type: "textarea",
      placeholder: "请输入您遇到的问题",
      modelValue: $data.baseFormData.describes
    }),
    f: common_vendor.p({
      label: "问题描述"
    }),
    g: common_vendor.o(($event) => $data.baseFormData.contactobject = $event),
    h: common_vendor.p({
      placeholder: "请输入手机号",
      modelValue: $data.baseFormData.contactobject
    }),
    i: common_vendor.p({
      label: "手机号",
      required: true
    }),
    j: common_vendor.sr("baseForm", "7239b3e8-1,7239b3e8-0"),
    k: common_vendor.p({
      modelValue: $data.baseFormData
    }),
    l: common_vendor.p({
      title: "投诉与意见",
      type: "line"
    }),
    m: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/feedback/feedbackSubmit.vue"]]);
wx.createPage(MiniProgramPage);
