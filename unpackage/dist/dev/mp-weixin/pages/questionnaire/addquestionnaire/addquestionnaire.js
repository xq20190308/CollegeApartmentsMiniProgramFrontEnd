"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/http.js");
const _sfc_main = {
  __name: "addquestionnaire",
  setup(__props) {
    const data = common_vendor.reactive({
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
    const add = (e, option) => {
      console.log(option);
      data.questionList.push({
        content: ["A", "B", "C"],
        describe: "",
        id: "",
        name: "",
        questionnaire: "",
        type: option
      });
      console.log(data.questionList);
    };
    const submit = async () => {
      console.log("新问卷", data.newNaire);
      console.log("新问卷的问题", data.questionList);
      data.newNaire.questionList = '["一","二","三"]';
      data.newNaire.id = "this.newNaire.id";
      common_vendor.index.showToast({
        title: "创建成功"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          //返回逻辑不对
          url: "../questionnaire_list/questionnaire_list?newNaire=" + JSON.stringify(data.newNaire)
        });
      }, 2e3);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => {
          data.newNaire.type = newdata(e.detail.value);
        }),
        b: common_vendor.o((e) => {
          data.newNaire.name = newdata(e.detail.value);
        }),
        c: common_vendor.o((e) => {
          data.newNaire.descr = newdata(e.detail.value);
        }),
        d: common_vendor.o((e) => {
          data.newNaire.startTime = data.newdata(e.detail.value);
        }),
        e: common_vendor.o((e) => {
          data.newNaire.endTime = data.newdata(e.detail.value);
        }),
        f: common_vendor.f(data.questionList, (que, qindex, i0) => {
          return common_vendor.e({
            a: que.type === 1
          }, que.type === 1 ? {
            b: common_vendor.t(qindex + 1)
          } : que.type === 2 ? {
            d: common_vendor.t(qindex + 1)
          } : que.type === 3 ? {
            f: common_vendor.t(qindex + 1)
          } : {}, {
            c: que.type === 2,
            e: que.type === 3,
            g: common_vendor.o((e) => {
              data.questionList[qindex].name = qnewdata(e, qindex);
            }, qindex),
            h: common_vendor.o((e) => {
              data.questionList[qindex].describe = qnewdata(e, qindex);
            }, qindex),
            i: que.type === 1
          }, que.type === 1 ? {
            j: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: common_vendor.o((e) => {
                  data.questionList[qindex].content[index] = qnewdata(e, qindex);
                }, index),
                b: index
              };
            })
          } : que.type === 2 ? {
            l: common_vendor.f(que.content, (item, index, i1) => {
              return {
                a: common_vendor.o((e) => {
                  data.questionList[qindex].content[index] = qnewdata(e, qindex);
                }, index),
                b: index
              };
            })
          } : {}, {
            k: que.type === 2,
            m: qindex
          });
        }),
        g: common_vendor.o((e) => add(e, 1)),
        h: common_vendor.o((e) => add(e, 2)),
        i: common_vendor.o((e) => add(e, 3)),
        j: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09980780"], ["__file", "F:/codes/CollegeApartmentsFrontE/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/addquestionnaire/addquestionnaire.vue"]]);
wx.createPage(MiniProgramPage);
