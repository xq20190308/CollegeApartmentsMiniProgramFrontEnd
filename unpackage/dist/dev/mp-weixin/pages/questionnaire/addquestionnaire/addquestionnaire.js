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
  __name: "addquestionnaire",
  setup(__props) {
    const data = common_vendor.reactive({
      types: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" }
      ],
      timer: null,
      //延时器，用于防抖处理
      //传到后端的数据
      newNaire: {
        //传到问卷列表页面中的数据
        /*descr: "",
        endTime: "",
        name: "",
        startTime: "",
        type: 1,
        id: "",
        questionList: “["","",""]”,*/
      },
      questionList: [
        /*{
        	content: ["", "", ""],
        	describe: "",
        	name: "",
        	type: 1,
        	id: "",
        	questionnaire: "",// 用questionnaire的id标记
        }*/
      ]
    });
    const newdata = (value) => {
      clearTimeout(data.timer);
      data.timer = setTimeout(() => {
        console.log(value);
      }, 500);
      return value;
    };
    const qnewdata = (e, qindex) => {
      clearTimeout(data.timer);
      data.timer = setTimeout(() => {
        console.log(qindex + "." + data.questionList[qindex].name);
      }, 500);
      return e.detail.value;
    };
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
      console.log("新问卷", data.newNaire);
      console.log("新问卷的问题", data.questionList);
      let list = [];
      for (let i = 0; i < data.questionList.length; i++) {
        list[i] = { ...data.questionList[i] };
        list[i].content = JSON.stringify(list[i].content);
      }
      console.log("data.questionList", data.questionList);
      await utils_http.http("/questionnaire/add", "POST", { ...data.newNaire, questionList: list });
      common_vendor.index.showToast({
        title: "创建成功"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "../questionnaire_list/questionnaire_list"
        });
      }, 2e3);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => {
          data.newNaire.type = data.types[e].value;
          console.log(data.newNaire.type);
        }),
        b: common_vendor.p({
          localdata: data.types
        }),
        c: common_vendor.p({
          title: "问卷类型（下拉选择）：",
          type: "line",
          padding: true
        }),
        d: common_vendor.o((e) => {
          data.newNaire.name = newdata(e.detail.value);
        }),
        e: common_vendor.p({
          title: "问卷名称（填写）：",
          type: "line",
          padding: true
        }),
        f: common_vendor.o((e) => {
          data.newNaire.description = newdata(e.detail.value);
        }),
        g: common_vendor.p({
          title: "问卷描述（填写）：",
          type: "line",
          padding: true
        }),
        h: common_vendor.o((e) => {
          data.newNaire.startTime = e[0];
          console.log(data.newNaire.startTime);
          data.newNaire.endTime = e[1];
          console.log(data.newNaire.endTime);
        }),
        i: common_vendor.p({
          type: "datetimerange",
          rangeSeparator: "至"
        }),
        j: common_vendor.p({
          title: "选择日期及时间：",
          type: "line",
          padding: true
        }),
        k: common_vendor.f(data.questionList, (que, qindex, i0) => {
          return common_vendor.e({
            a: common_vendor.o(() => {
              console.log(qindex);
              data.questionList = data.questionList.filter((item, index) => index !== qindex);
            }, qindex),
            b: "09980780-7-" + i0 + "," + ("09980780-6-" + i0),
            c: common_vendor.o((e) => {
              data.questionList[qindex].name = qnewdata(e, qindex);
            }, qindex),
            d: common_vendor.o((e) => {
              data.questionList[qindex].description = qnewdata(e, qindex);
            }, qindex),
            e: que.type === 1
          }, que.type === 1 ? {
            f: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: common_vendor.o((e) => {
                  data.questionList[qindex].content[index] = qnewdata(e, qindex);
                  console.log(data.questionList[qindex].content);
                }, index),
                b: common_vendor.o(() => {
                  console.log(qindex, index);
                  data.questionList[qindex].content = data.questionList[qindex].content.filter((item2, eindex) => eindex !== index);
                }, index),
                c: "09980780-8-" + i0 + "-" + i1 + "," + ("09980780-6-" + i0),
                d: index
              };
            }),
            g: common_vendor.p({
              type: "closeempty",
              size: "20"
            }),
            h: common_vendor.o(() => {
              console.log(qindex);
              data.questionList[qindex].content.push(" ");
            }, qindex),
            i: "09980780-9-" + i0 + "," + ("09980780-6-" + i0),
            j: common_vendor.p({
              type: "plusempty",
              size: "20"
            })
          } : que.type === 2 ? {
            l: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: common_vendor.o((e) => {
                  data.questionList[qindex].content[index] = qnewdata(e, qindex);
                  console.log(data.questionList[qindex].content[index]);
                }, index),
                b: common_vendor.o(() => {
                  console.log(qindex, index);
                  data.questionList[qindex].content = data.questionList[qindex].content.filter((item2, eindex) => eindex !== index);
                }, index),
                c: "09980780-10-" + i0 + "-" + i1 + "," + ("09980780-6-" + i0),
                d: index
              };
            }),
            m: common_vendor.p({
              type: "closeempty",
              size: "20"
            }),
            n: common_vendor.o(() => {
              console.log(qindex);
              data.questionList[qindex].content.push(" ");
            }, qindex),
            o: "09980780-11-" + i0 + "," + ("09980780-6-" + i0),
            p: common_vendor.p({
              type: "plusempty",
              size: "20"
            })
          } : {}, {
            k: que.type === 2,
            q: qindex,
            r: "09980780-6-" + i0,
            s: common_vendor.p({
              title: qindex + 1 + "." + questype(que.type),
              type: "line"
            })
          });
        }),
        l: common_vendor.p({
          type: "closeempty",
          size: "20"
        }),
        m: common_vendor.o((e) => add(e, 1)),
        n: common_vendor.o((e) => add(e, 2)),
        o: common_vendor.o((e) => add(e, 3)),
        p: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09980780"]]);
wx.createPage(MiniProgramPage);
