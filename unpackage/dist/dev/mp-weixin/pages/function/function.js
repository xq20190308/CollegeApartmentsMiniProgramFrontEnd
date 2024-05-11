"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navList1: [
        { name: "课程表", imgPath: "../../static/function/class.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "教室预约", imgPath: "../../static/function/classes.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
      ],
      navList2: [
        { name: "问卷投票", imgPath: "../../static/function/questionnaire.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "接诉即办", imgPath: "../../static/function/complaint.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
      ],
      navList3: [
        { name: "热水系统", imgPath: "../../static/function/water.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "失物招领", imgPath: "../../static/function/find.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
      ]
    };
  },
  onLoad() {
    this.navList1 = [
      { name: "课程表", imgPath: "../../static/function/class.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "教室预约", imgPath: "../../static/function/classes.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
    ], this.navList2 = [
      { name: "问卷投票", imgPath: "../../static/function/questionnaire.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "接诉即办", imgPath: "../../static/function/complaint.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
    ], this.navList3 = [
      { name: "热水系统", imgPath: "../../static/function/water.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "失物招领", imgPath: "../../static/function/find.png", pagePath: "../questionnaire/questionnaire_home" },
      { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
    ];
  },
  methods: {
    Function1Click(item) {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    },
    Function2Click(item) {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    },
    Function3Click(item) {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navList1, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i,
        d: common_vendor.o(($event) => $options.Function1Click(item), i)
      };
    }),
    b: common_vendor.f($data.navList2, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i,
        d: common_vendor.o(($event) => $options.Function2Click(item), i)
      };
    }),
    c: common_vendor.f($data.navList3, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i,
        d: common_vendor.o(($event) => $options.Function3Click(item), i)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/function/function.vue"]]);
wx.createPage(MiniProgramPage);
