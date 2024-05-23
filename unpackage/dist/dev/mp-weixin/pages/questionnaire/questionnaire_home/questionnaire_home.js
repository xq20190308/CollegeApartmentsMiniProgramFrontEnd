"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      timer: null,
      //延时器，用于防抖处理
      id: "",
      type: 0,
      name: "",
      descr: null,
      startTime: "",
      endTime: "",
      questionList: [{
        id: "",
        type: 1,
        name: "",
        describe: "",
        content: "[]",
        questionnaire: ""
      }],
      questionidList: [],
      current: [],
      // 校验表单数据
      valiFormData: {
        name: "",
        id: ""
      },
      // 校验规则
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        id: {
          rules: [{
            required: true,
            errorMessage: "年龄不能为空"
          }, {
            minLength: 12,
            maxLength: 12,
            errorMessage: "请输入12位学号"
          }]
        }
      }
    };
  },
  props: {},
  methods: {
    inputChange: function(evt, qindex) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(evt);
        console.log(qindex);
        this.current[qindex] = evt.detail.value;
        console.log(this.current);
      }, 500);
    },
    checkboxChange: function(evt, qindex) {
      console.log(evt);
      console.log(qindex);
      this.current[qindex] = evt.detail.value;
      console.log(this.current);
    },
    radioChange: function(evt, qindex) {
      console.log(evt);
      console.log(qindex);
      this.current[qindex] = evt.detail.value;
      console.log(this.current);
    },
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        if (this.current.length != this.questionList.length) {
          common_vendor.index.showToast({
            title: "请检查作答",
            icon: "error"
          });
          return;
        }
        console.log("填写正确", this.current);
        console.log(this.valiFormData);
        common_vendor.index.request({
          url: "",
          method: "POST",
          data: {},
          success: (res2) => {
            common_vendor.index.showToast({
              title: "提交成功"
            });
          },
          complete: (res2) => {
          }
        });
      }).catch((err) => {
        console.log("err", err);
      });
    },
    getquestions() {
      common_vendor.index.request({
        //url:'http://127.0.0.1:4523/m1/4414254-4059226-default/question/selectById?idList='+this.questionidList,
        url: "http://localhost:8080/question/selectById?idList=" + this.questionidList,
        method: "GET",
        data: {
          idList: this.questionidList
        },
        success: (res) => {
          console.log("请求返回", res);
          this.questionList = res.data.data;
          console.log("获取到问题", this.questionList);
          for (let i = 0; i < this.questionList.length; i++) {
            this.questionList[i].content = ["A", "B", "C"];
          }
        },
        complete: (res) => {
          console.log();
        }
      });
    }
  },
  computed: {},
  onLoad(options) {
    console.log("参数列表", options);
    this.questionidList = ["20181252102", "20187874601"];
    console.log("问题列表：", this.questionidList);
    this.id = options.id;
    this.type = options.type;
    this.name = options.name;
    this.descr = options.descr;
    this.startTime = options.startTime;
    this.endTime = options.endTime;
    this.getquestions();
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
    a: common_vendor.f($data.questionList, (que, qindex, i0) => {
      return common_vendor.e({
        a: common_vendor.t(que.id),
        b: common_vendor.t(que.name),
        c: common_vendor.t(que.describe),
        d: que.type === 1
      }, que.type === 1 ? {
        e: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: index,
            b: common_vendor.t(item),
            c: index
          };
        }),
        f: common_vendor.o((e) => $options.radioChange(e, qindex), qindex)
      } : que.type === 2 ? {
        h: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: index,
            b: common_vendor.t(item),
            c: index
          };
        }),
        i: common_vendor.o((e) => $options.checkboxChange(e, qindex), qindex)
      } : {
        j: common_vendor.o((e) => $options.inputChange(e, qindex), qindex)
      }, {
        g: que.type === 2,
        k: qindex
      });
    }),
    b: common_vendor.o(($event) => $data.valiFormData.name = $event),
    c: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.valiFormData.name
    }),
    d: common_vendor.p({
      label: "姓名",
      required: true,
      name: "name"
    }),
    e: common_vendor.o(($event) => $data.valiFormData.id = $event),
    f: common_vendor.p({
      placeholder: "请输入学号",
      modelValue: $data.valiFormData.id
    }),
    g: common_vendor.p({
      label: "学号",
      required: true,
      name: "id"
    }),
    h: common_vendor.sr("valiForm", "276a9552-1,276a9552-0"),
    i: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.valiFormData,
      ["label-position"]: "top"
    }),
    j: common_vendor.o(($event) => $options.submit("valiForm")),
    k: common_vendor.p({
      title: $data.id + "." + $data.name,
      type: "line",
      titleFontSize: "42rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-276a9552"], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_home/questionnaire_home.vue"]]);
wx.createPage(MiniProgramPage);
