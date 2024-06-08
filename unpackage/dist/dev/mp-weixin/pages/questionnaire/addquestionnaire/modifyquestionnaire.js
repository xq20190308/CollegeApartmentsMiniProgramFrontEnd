"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_http = require("../../../utils/http.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_data_select2 + _easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_icons2)();
}
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "modifyquestionnaire",
  setup(__props) {
    const data = common_vendor.reactive({
      range: [],
      types: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" }
      ],
      timer: null,
      //延时器，用于防抖处理
      //传到后端的数据
      info: {},
      questionList: []
    });
    const questype = (type, qindex) => {
      if (type === 1) {
        return "单选题";
      } else if (type === 2) {
        return "多选题";
      } else {
        return "问答题";
      }
    };
    const add = (e, option) => {
      console.log(option);
      data.questionList.push({
        type: option,
        name: "",
        description: "",
        content: ["A", "B", "C"],
        questionnaire_id: ""
      });
      console.log(data.questionList);
    };
    const submit = async () => {
      console.log("修改后的问卷", data.info);
      console.log("修改后的问卷的问题", data.questionList);
      let list = [];
      for (let i = 0; i < data.questionList.length; i++) {
        list[i] = { ...data.questionList[i] };
        list[i].content = JSON.stringify(list[i].content);
      }
      console.log("data.questionList", data.questionList);
      await utils_http.http("/questionnaire/updateQuestionnaireById/" + data.info.id, "POST", { ...data.info, questionList: list });
      common_vendor.index.showToast({
        title: "创建成功"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "../questionnaire_list/questionnaire_list"
        });
      }, 2e3);
    };
    const getquestions = async () => {
      const res = await utils_http.http("/question/selectByQuestionnaireId/" + data.info.id, "GET", {});
      data.questionList = res.data;
      for (let i = 0; i < data.questionList.length; i++) {
        data.questionList[i].content = JSON.parse(data.questionList[i].content);
      }
    };
    common_vendor.onLoad((options) => {
      data.info = JSON.parse(options.info);
      console.log(data.info);
      data.range = [data.info.startTime, data.info.endTime];
      console.log("--", data.range);
      getquestions();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => data.info.type = $event),
        b: common_vendor.p({
          localdata: data.types,
          modelValue: data.info.type
        }),
        c: common_vendor.p({
          title: "问卷类型（下拉选择）：",
          type: "line",
          padding: true
        }),
        d: data.info.name,
        e: common_vendor.o(($event) => data.info.name = $event.detail.value),
        f: common_vendor.p({
          title: "问卷名称（填写）：",
          type: "line",
          padding: true
        }),
        g: data.info.description,
        h: common_vendor.o(($event) => data.info.description = $event.detail.value),
        i: common_vendor.p({
          title: "问卷描述（填写）：",
          type: "line",
          padding: true
        }),
        j: common_vendor.o((e) => {
          data.info.startTime = e[0];
          console.log(data.info.startTime);
          data.info.endTime = e[1];
          console.log(data.info.endTime);
          console.log(data.range);
        }),
        k: common_vendor.o(($event) => data.range = $event),
        l: common_vendor.p({
          type: "datetimerange",
          rangeSeparator: "至",
          modelValue: data.range
        }),
        m: common_vendor.p({
          title: "选择日期及时间：",
          type: "line",
          ["paddindata.rangeg"]: true
        }),
        n: common_vendor.f(data.questionList, (que, qindex, i0) => {
          return common_vendor.e({
            a: common_vendor.o(() => {
              console.log(qindex);
              data.questionList = data.questionList.filter((item, index) => index !== qindex);
            }, qindex),
            b: "55bb67e1-7-" + i0 + "," + ("55bb67e1-6-" + i0),
            c: data.questionList[qindex].name,
            d: common_vendor.o(($event) => data.questionList[qindex].name = $event.detail.value, qindex),
            e: data.questionList[qindex].description,
            f: common_vendor.o(($event) => data.questionList[qindex].description = $event.detail.value, qindex),
            g: que.type === 1
          }, que.type === 1 ? {
            h: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: data.questionList[qindex].content[index],
                b: common_vendor.o(($event) => data.questionList[qindex].content[index] = $event.detail.value, index),
                c: common_vendor.o(() => {
                  console.log(qindex, index);
                  data.questionList[qindex].content = data.questionList[qindex].content.filter((item2, eindex) => eindex !== index);
                }, index),
                d: "55bb67e1-8-" + i0 + "-" + i1 + "," + ("55bb67e1-6-" + i0),
                e: index
              };
            }),
            i: common_vendor.p({
              type: "closeempty",
              size: "20"
            }),
            j: common_vendor.o(() => {
              console.log(qindex);
              data.questionList[qindex].content.push(" ");
            }, qindex),
            k: "55bb67e1-9-" + i0 + "," + ("55bb67e1-6-" + i0),
            l: common_vendor.p({
              type: "plusempty",
              size: "20"
            })
          } : que.type === 2 ? {
            n: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: data.questionList[qindex].content[index],
                b: common_vendor.o(($event) => data.questionList[qindex].content[index] = $event.detail.value, index),
                c: common_vendor.o(() => {
                  console.log(qindex, index);
                  data.questionList[qindex].content = data.questionList[qindex].content.filter((item2, eindex) => eindex !== index);
                }, index),
                d: "55bb67e1-10-" + i0 + "-" + i1 + "," + ("55bb67e1-6-" + i0),
                e: index
              };
            }),
            o: common_vendor.p({
              type: "closeempty",
              size: "20"
            }),
            p: common_vendor.o(() => {
              console.log(qindex);
              data.questionList[qindex].content.push(" ");
            }, qindex),
            q: "55bb67e1-11-" + i0 + "," + ("55bb67e1-6-" + i0),
            r: common_vendor.p({
              type: "plusempty",
              size: "20"
            })
          } : {}, {
            m: que.type === 2,
            s: qindex,
            t: "55bb67e1-6-" + i0,
            v: common_vendor.p({
              title: qindex + 1 + "." + questype(que.type),
              type: "line"
            })
          });
        }),
        o: common_vendor.p({
          type: "closeempty",
          size: "20"
        }),
        p: common_vendor.o((e) => add(e, 1)),
        q: common_vendor.o((e) => add(e, 2)),
        r: common_vendor.o((e) => add(e, 3)),
        s: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55bb67e1"]]);
wx.createPage(MiniProgramPage);
