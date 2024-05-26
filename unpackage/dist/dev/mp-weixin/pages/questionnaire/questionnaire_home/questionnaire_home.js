"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_http = require("../../../utils/http.js");
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
const _sfc_main = {
  __name: "questionnaire_home",
  setup(__props) {
    const data = common_vendor.reactive({
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
      questionidList: null,
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
    });
    const inputChange = (evt, qindex) => {
      clearTimeout(data.timer);
      data.timer = setTimeout(() => {
        console.log(evt);
        console.log(qindex);
        data.current[qindex] = evt.detail.value;
        console.log(data.current);
      }, 500);
    };
    const checkboxChange = (evt, qindex) => {
      console.log(evt);
      console.log(qindex);
      data.current[qindex] = evt.detail.value;
      console.log(data.current);
    };
    const radioChange = (evt, qindex) => {
      console.log(evt);
      console.log(qindex);
      data.current[qindex] = evt.detail.value;
      console.log(data.current);
    };
    const valiForm = common_vendor.ref();
    const submit = async (ref) => {
      var _a;
      (_a = valiForm.value) == null ? void 0 : _a.validate().then(async (res1) => {
        console.log("success", res1);
        if (data.current.length != data.questionList.length) {
          common_vendor.index.showToast({
            title: "请检查作答",
            icon: "error"
          });
          return;
        }
        console.log("填写正确", data.current);
        console.log(data.valiFormData);
        const res = await utils_http.http("/questionnaire/selectAll", "GET", {});
        console.log("封装后请求的结果", res);
        common_vendor.index.showToast({
          title: "提交成功"
        });
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const getquestions = async () => {
      const res = await utils_http.http("/question/selectById?idList=" + data.questionidList, "GET", {});
      console.log("封装后请求的结果", res);
      console.log("test", data.idList);
      data.questionList = res.data;
      console.log("获取到问题", data.questionList);
      for (let i = 0; i < data.questionList.length; i++) {
        data.questionList[i].content = ["A", "B", "C"];
      }
    };
    common_vendor.onLoad((options) => {
      console.log("参数列表", options);
      data.questionidList = ["20181252102", "20187874601"];
      console.log("问题列表：", data.questionidList);
      data.id = options.id;
      data.type = options.type;
      data.name = options.name;
      data.descr = options.descr;
      data.startTime = options.startTime;
      data.endTime = options.endTime;
      getquestions();
    });
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.questionList, (que, qindex, i0) => {
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
            f: common_vendor.o((e) => radioChange(e, qindex), qindex)
          } : que.type === 2 ? {
            h: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: index,
                b: common_vendor.t(item),
                c: index
              };
            }),
            i: common_vendor.o((e) => checkboxChange(e, qindex), qindex)
          } : {
            j: common_vendor.o((e) => inputChange(e, qindex), qindex)
          }, {
            g: que.type === 2,
            k: qindex
          });
        }),
        b: common_vendor.o(($event) => data.valiFormData.name = $event),
        c: common_vendor.p({
          placeholder: "请输入姓名",
          modelValue: data.valiFormData.name
        }),
        d: common_vendor.p({
          label: "姓名",
          required: true,
          name: "name"
        }),
        e: common_vendor.o(($event) => data.valiFormData.id = $event),
        f: common_vendor.p({
          placeholder: "请输入学号",
          modelValue: data.valiFormData.id
        }),
        g: common_vendor.p({
          label: "学号",
          required: true,
          name: "id"
        }),
        h: common_vendor.sr(valiForm, "276a9552-1,276a9552-0", {
          "k": "valiForm"
        }),
        i: common_vendor.p({
          rules: data.rules,
          modelValue: data.valiFormData,
          ["label-position"]: "top"
        }),
        j: common_vendor.o(($event) => submit()),
        k: common_vendor.p({
          title: data.id + "." + data.name,
          type: "line",
          titleFontSize: "42rpx"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-276a9552"], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_home/questionnaire_home.vue"]]);
wx.createPage(MiniProgramPage);
