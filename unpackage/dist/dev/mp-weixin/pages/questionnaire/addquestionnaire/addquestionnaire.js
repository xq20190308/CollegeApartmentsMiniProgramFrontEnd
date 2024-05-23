"use strict";
const common_vendor = require("../../../common/vendor.js");
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
        id: "",
        name: "",
        questionList: ["123","234","345"],
        startTime: "",
        type: 1,*/
      },
      questionList: [
        /*{
        	content: ["A", "B", "C"],
        	describe: "",
        	id: "",
        	name: "",
        	questionnaire: "",
        	type: 1,
        }*/
      ]
    };
  },
  methods: {
    typeChange(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.newNaire.type = e.detail.value;
        console.log(this.newNaire.type);
      }, 500);
    },
    nameChange(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.newNaire.name = e.detail.value;
        console.log(this.newNaire.name);
      }, 500);
    },
    descriChange(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.newNaire.descri = e.detail.value;
        console.log(this.newNaire.descri);
      }, 500);
    },
    stChange(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.newNaire.st = e.detail.value;
        console.log(this.newNaire.st);
      }, 500);
    },
    etChange(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.newNaire.et = e.detail.value;
        console.log(this.newNaire.et);
      }, 500);
    },
    qnameChange(e, qindex) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.questionList[qindex].name = e.detail.value;
        console.log(qindex + "." + this.questionList[qindex].name);
      }, 500);
    },
    qdescriChange(e, qindex) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.questionList[qindex].describe = e.detail.value;
        console.log(qindex + "." + this.questionList[qindex].describe);
      }, 500);
    },
    qcChange(e, qindex, index) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.questionList[qindex].content[index] = e.detail.value;
        console.log(qindex + "." + index + "." + this.questionList[qindex].content[index]);
      }, 500);
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
      console.log(this.newList);
      console.log(this.questionList);
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
    a: common_vendor.o((e) => $options.typeChange(e)),
    b: common_vendor.o((e) => $options.nameChange(e)),
    c: common_vendor.o((e) => $options.descriChange(e)),
    d: common_vendor.o((e) => $options.stChange(e)),
    e: common_vendor.o((e) => $options.etChange(e)),
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
        g: common_vendor.o((e) => $options.qnameChange(e, qindex), qindex),
        h: common_vendor.o((e) => $options.qdescriChange(e, qindex), qindex),
        i: que.type === 1
      }, que.type === 1 ? {
        j: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: common_vendor.o((e) => $options.qcChange(e, qindex, index), index),
            b: index
          };
        })
      } : que.type === 2 ? {
        l: common_vendor.f(que.content, (item, index, i1) => {
          return {
            a: common_vendor.o((e) => $options.qcChange(e, qindex, index), index),
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
