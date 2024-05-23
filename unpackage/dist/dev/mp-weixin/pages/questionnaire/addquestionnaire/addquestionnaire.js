"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //传到后端的数据
      newNaire: {
        //传到问卷列表页面中的数据
        descr: null,
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
    a: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/addquestionnaire/addquestionnaire.vue"]]);
wx.createPage(MiniProgramPage);
