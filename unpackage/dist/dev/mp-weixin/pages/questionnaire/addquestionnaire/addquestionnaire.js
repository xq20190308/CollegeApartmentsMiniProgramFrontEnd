"use strict";
const common_vendor = require("../../../common/vendor.js");
const system_config = require("../../../system.config.js");
const _sfc_main = {
  data() {
    return {
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
    };
  },
  methods: {
    newdata(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(value);
      }, 500);
      return value;
    },
    qnewdata(e, qindex) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(qindex + "." + this.questionList[qindex].name);
      }, 500);
      return e.detail.value;
    },
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
      console.log("新问卷", this.newNaire);
      console.log("新问卷的问题", this.questionList);
      common_vendor.index.request({
        url: system_config.sysurl.developUrl + "",
        method: "POST",
        data: {
          newNaire: this.newNaire
        },
        success: (res) => {
          this.newNaire.questionList = '["一","二","三"]';
          this.newNaire.id = "this.newNaire.id";
          common_vendor.index.showToast({
            title: "创建成功"
          });
          console.log("问卷提交", res);
          common_vendor.index.navigateTo({
            url: "../questionnaire_list/questionnaire_list?newNaire=" + JSON.stringify(this.newNaire)
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
    a: common_vendor.o((e) => {
      this.newNaire.type = $options.newdata(e.detail.value);
    }),
    b: common_vendor.o((e) => {
      this.newNaire.name = $options.newdata(e.detail.value);
    }),
    c: common_vendor.o((e) => {
      this.newNaire.descr = $options.newdata(e.detail.value);
    }),
    d: common_vendor.o((e) => {
      this.newNaire.startTime = this.newdata(e.detail.value);
    }),
    e: common_vendor.o((e) => {
      this.newNaire.endTime = this.newdata(e.detail.value);
    }),
    f: common_vendor.f($data.questionList, (que, qindex, i0) => {
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
          this.questionList[qindex].name = $options.qnewdata(e, qindex);
        }, qindex),
        h: common_vendor.o((e) => {
          this.questionList[qindex].describe = $options.qnewdata(e, qindex);
        }, qindex),
        i: que.type === 1
      }, que.type === 1 ? {
        j: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: common_vendor.o((e) => {
              this.questionList[qindex].content[index] = $options.qnewdata(e, qindex);
            }, index),
            b: index
          };
        })
      } : que.type === 2 ? {
        l: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: common_vendor.o((e) => {
              this.questionList[qindex].content[index] = $options.qnewdata(e, qindex);
            }, index),
            b: index
          };
        })
      } : {}, {
        k: que.type === 2,
        m: qindex
      });
    }),
    g: common_vendor.o((e) => $options.add(e, 1)),
    h: common_vendor.o((e) => $options.add(e, 2)),
    i: common_vendor.o((e) => $options.add(e, 3)),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09980780"], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/addquestionnaire/addquestionnaire.vue"]]);
wx.createPage(MiniProgramPage);
