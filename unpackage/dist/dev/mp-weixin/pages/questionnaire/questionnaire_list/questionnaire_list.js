"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      questionnairelist: [],
      total: 0
    };
  },
  methods: {
    getNaireslist() {
      common_vendor.index.request({
        //url:'http://192.168.76.218:8080/questionnaire/selectAll',
        url: "http://127.0.0.1:4523/m1/4414254-4059226-default/questionnaire/selectAll",
        method: "GET",
        data: {},
        success: (res) => {
          this.questionnairelist = res.data.data;
          console.log("获取到列表", this.questionnairelist);
        },
        complete: (res) => {
        }
      });
    },
    gotonaire: (item) => {
      console.log("问卷信息", item);
      common_vendor.index.navigateTo({
        url: "../questionnaire_home/questionnaire_home?questionidList=" + item.questionList + "&id=" + item.id + "&type=" + item.type + "&name=" + item.name + "&descr=" + item.descr + "&startTime=" + item.startTime + "&endTime =" + item.endTime
      });
    }
  },
  onLoad(options) {
    this.getNaireslist();
  }
};
if (!Array) {
  const _easycom_questionnaire2 = common_vendor.resolveComponent("questionnaire");
  _easycom_questionnaire2();
}
const _easycom_questionnaire = () => "../../../components/questionnaire/questionnaire.js";
if (!Math) {
  _easycom_questionnaire();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.questionnairelist, (item, index, i0) => {
      return {
        a: "5548f501-0-" + i0,
        b: common_vendor.p({
          naireinfo: item
        }),
        c: "5548f501-1-" + i0,
        d: common_vendor.p({
          naireinfo: item
        }),
        e: "5548f501-2-" + i0,
        f: common_vendor.p({
          naireinfo: item
        }),
        g: "5548f501-3-" + i0,
        h: common_vendor.p({
          naireinfo: item
        }),
        i: index,
        j: common_vendor.o(($event) => $options.gotonaire(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_list/questionnaire_list.vue"]]);
wx.createPage(MiniProgramPage);
