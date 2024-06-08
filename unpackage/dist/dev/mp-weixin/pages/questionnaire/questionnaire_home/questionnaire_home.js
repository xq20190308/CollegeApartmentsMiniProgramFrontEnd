"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_http = require("../../../utils/http.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "questionnaire_home",
  setup(__props) {
    const data = common_vendor.reactive({
      timer: null,
      //延时器，用于防抖处理
      //匿名的话questionnaire加一个isAnonymous
      isanonymous: false,
      id: "",
      type: 0,
      name: "",
      description: null,
      startTime: "",
      endTime: "",
      questionList: [
        // 	{
        // 	id: "",
        // 	type: 1,
        // 	name: "",
        // 	describe: "",
        // 	content: "[]",
        // 	questionnaire: ""
        // },
      ],
      current: [],
      // 校验表单数据
      valiFormData: {
        name: "",
        id: ""
      }
      // 校验规则
    });
    const rules = common_vendor.computed(() => {
      if (data.isanonymous == true) {
        return {
          name: {
            rules: [{
              required: true,
              errorMessage: "姓名不能为空"
            }]
          },
          id: {
            rules: [{
              required: true,
              errorMessage: "学号不能为空"
            }, {
              minLength: 12,
              maxLength: 12,
              errorMessage: "请输入12位学号"
            }]
          }
        };
      } else {
        return {};
      }
    });
    const ischeckedmul = (qindex, index) => {
      console.log("--", data.current[qindex]);
      return (data.current[qindex] ? data.current[qindex].indexOf(String(index)) : -1) != -1;
    };
    const showmyanswer = async () => {
      console.log("显示我的回答questionnaireId=", data.id);
      const res = await utils_http.http("/useranswer/getmyanswer?questionnaireId=" + data.id, "GET", {});
      if (res.msg == "您还没有填写该问卷") {
        common_vendor.index.showModal({
          title: "您还没有填写该问卷",
          icon: "error"
        });
      } else {
        data.current = JSON.parse(res.data.answer);
      }
      console.log(data.current);
    };
    const checkboxChange = (evt, qindex) => {
      data.current[qindex] = evt.detail.value;
      console.log(data.current);
    };
    const radioChange = (evt, qindex) => {
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
        await utils_http.http("/useranswer/submit", "POST", {
          answer: JSON.stringify(data.current),
          questionnaireId: data.id
        });
        clearTimeout(data.timer);
        data.timer = setTimeout(() => {
          common_vendor.index.showToast({
            title: "提交成功"
          });
        }, 300);
        common_vendor.index.navigateBack();
      }).catch((err) => {
        console.log("err", err);
      });
    };
    const getquestions = async () => {
      const res = await utils_http.http("/question/selectByQuestionnaireId/" + data.id, "GET", {});
      data.questionList = res.data;
      for (let i = 0; i < data.questionList.length; i++) {
        data.questionList[i].content = JSON.parse(data.questionList[i].content);
      }
    };
    common_vendor.onLoad(async (options) => {
      console.log("参数列表", options);
      data.id = options.id;
      data.type = options.type;
      data.name = options.name;
      data.description = options.description;
      data.startTime = options.startTime;
      data.endTime = options.endTime;
      clearTimeout(data.timer);
      data.timer = setTimeout(() => {
        getquestions();
      }, 100);
      const res = await utils_http.http("/useranswer/getmyanswer?questionnaireId=" + data.id, "GET", {});
      if (res.msg == "您还没有填写该问卷") {
        console.log("该用户没填写过此问卷");
      } else {
        common_vendor.index.showModal({
          title: "已填写过,是否显示填写情况",
          success: (res1) => {
            if (res1.confirm) {
              data.current = JSON.parse(res.data.answer);
            } else if (res1.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    });
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(showmyanswer),
        b: common_vendor.p({
          type: "arrow-up",
          size: "20"
        }),
        c: common_vendor.f(data.questionList, (que, qindex, i0) => {
          return common_vendor.e({
            a: common_vendor.t(qindex + 1),
            b: common_vendor.t(que.name),
            c: common_vendor.t(que.description),
            d: que.type === 1
          }, que.type === 1 ? {
            e: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: index,
                b: index == data.current[qindex],
                c: common_vendor.t(item),
                d: index
              };
            }),
            f: common_vendor.o((e) => radioChange(e, qindex), qindex)
          } : que.type === 2 ? {
            h: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: index,
                b: ischeckedmul(qindex, index),
                c: common_vendor.t(item),
                d: index
              };
            }),
            i: data.current[qindex],
            j: common_vendor.o((e) => checkboxChange(e, qindex), qindex)
          } : {
            k: data.current[qindex],
            l: common_vendor.o(($event) => data.current[qindex] = $event.detail.value, qindex)
          }, {
            g: que.type === 2,
            m: qindex
          });
        }),
        d: data.isanonymous,
        e: common_vendor.o((e) => {
          data.isanonymous = e.detail.value;
        }),
        f: common_vendor.o(($event) => data.valiFormData.name = $event),
        g: common_vendor.p({
          placeholder: "请输入姓名",
          modelValue: data.valiFormData.name
        }),
        h: common_vendor.p({
          label: "姓名",
          name: "name",
          required: data.isanonymous
        }),
        i: common_vendor.o(($event) => data.valiFormData.id = $event),
        j: common_vendor.p({
          placeholder: "请输入学号",
          modelValue: data.valiFormData.id
        }),
        k: common_vendor.p({
          label: "学号",
          name: "id",
          required: data.isanonymous
        }),
        l: common_vendor.sr(valiForm, "276a9552-2,276a9552-0", {
          "k": "valiForm"
        }),
        m: common_vendor.p({
          rules: rules.value,
          modelValue: data.valiFormData,
          ["label-position"]: "top"
        }),
        n: common_vendor.o(($event) => submit()),
        o: common_vendor.p({
          title: data.id + "." + data.name,
          type: "line",
          titleFontSize: "42rpx"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-276a9552"]]);
wx.createPage(MiniProgramPage);
