"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //传到后端的数据
      newNaire: {
        //传到问卷列表页面中的数据
        descr: "null",
        endTime: "2000-03-17 20:08:53",
        id: "51",
        name: "与素系办",
        questionList: ["123", "234", "345"],
        startTime: "2021-10-22 13:21:08",
        type: 87
      },
      questionList: [{
        content: ["A", "B", "C"],
        describe: "sed dolor ea mollit aute",
        id: "32",
        name: "转时决劳场候",
        questionnaire: "nisi fugiat",
        type: 8
      }]
    };
  },
  methods: {
    add(e, option) {
      console.log(option);
      this.questionList.push({
        content: ["A", "B", "C"],
        describe: "",
        id: "",
        name: "",
        questionnaire: "",
        type: option
      });
      console.log(this.questionList);
    },
    submit() {
      common_vendor.index.request({
        url: "",
        method: "POST",
        data: {},
        success: (res) => {
          common_vendor.index.showToast({
            title: "提交成功"
          });
        },
        complete: (res) => {
          common_vendor.index.showToast({
            title: "创建成功"
          });
          console.log("问卷提交", res);
          common_vendor.index.navigateTo({
            url: "../questionnaire_list/questionnaire_list?newNaire=" + JSON.stringify(this.newNaire)
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.newNaire.type),
    b: common_vendor.t($data.newNaire.name),
    c: common_vendor.t($data.newNaire.descr),
    d: common_vendor.t($data.newNaire.startTime),
    e: common_vendor.t($data.newNaire.endTime),
    f: common_vendor.o((e) => _ctx.qnameChange(e, _ctx.qindex)),
    g: common_vendor.o((e) => _ctx.qnameChange(e, _ctx.qindex)),
    h: common_vendor.o((e) => _ctx.qnameChange(e, _ctx.qindex)),
    i: common_vendor.o((e) => _ctx.qnameChange(e, _ctx.qindex)),
    j: common_vendor.o((e) => _ctx.qnameChange(e, _ctx.qindex)),
    k: common_vendor.f($data.questionList, (que, qindex, i0) => {
      return common_vendor.e({
        a: que.type === 1
      }, que.type === 1 ? {
        b: common_vendor.t(qindex + 1)
      } : que.type === 2 ? {
        d: common_vendor.t(qindex + 1)
      } : {
        e: common_vendor.t(qindex + 1)
      }, {
        c: que.type === 2,
        f: common_vendor.o((e) => _ctx.qnameChange(e, qindex), qindex),
        g: common_vendor.o((e) => _ctx.qdescriChange(e, qindex), qindex),
        h: que.type === 1
      }, que.type === 1 ? {
        i: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: common_vendor.o((e) => _ctx.qchitemChange(e, qindex), index),
            b: index
          };
        })
      } : que.type === 2 ? {
        k: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: common_vendor.o((e) => _ctx.qmulchitemChange(e, qindex), index),
            b: index
          };
        })
      } : {}, {
        j: que.type === 2,
        l: qindex
      });
    }),
    l: common_vendor.o((e) => $options.add(e, 1)),
    m: common_vendor.o((e) => $options.add(e, 2)),
    n: common_vendor.o((e) => $options.add(e, 3)),
    o: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09980780"], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/addquestionnaire/addquestionnaire.vue"]]);
wx.createPage(MiniProgramPage);
