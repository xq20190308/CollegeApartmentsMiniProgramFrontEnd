"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      questionnairelist: [{
        id: "",
        type: 0,
        name: "",
        descr: null,
        startTime: "",
        endTime: "",
        questionList: []
      }],
      total: 0
    };
  },
  methods: {
    getNaireslist() {
      common_vendor.index.request({
        url: "http://127.0.0.1:4523/m1/4414254-4059226-default/questionnaire/selectAll",
        method: "GET",
        data: {},
        success: (res) => {
          this.questionnairelist = res.data.data;
          console.log(this.questionnairelist);
          console.log(res.data.data);
        },
        complete: (res) => {
          console.log(res);
        }
      });
    },
    gotonaire(item) {
      common_vendor.index.navigateTo({
        url: "../questionnaire_home/questionnaire_home"
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
        c: index,
        d: common_vendor.o(($event) => $options.gotonaire(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_list/questionnaire_list.vue"]]);
wx.createPage(MiniProgramPage);
