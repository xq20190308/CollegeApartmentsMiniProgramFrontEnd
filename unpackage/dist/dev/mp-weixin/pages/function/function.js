"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navList1: [
        { name: "课程表", imgPath: "../../static/function/class.png" },
        { name: "教室预约", imgPath: "../../static/function/classes.png" },
        { name: "导师互动", imgPath: "../../static/function/mentor.png" },
        { name: "更多", imgPath: "../../static/function/more.png" }
      ],
      navList2: [
        { name: "问卷投票", imgPath: "../../static/function/questionnaire.png" },
        { name: "卫检成绩", imgPath: "../../static/function/score.png" },
        { name: "接诉即办", imgPath: "../../static/function/complaint.png" },
        { name: "更多", imgPath: "../../static/function/more.png" }
      ],
      navList3: [
        { name: "热水系统", imgPath: "../../static/function/water.png" },
        { name: "公寓用电", imgPath: "../../static/function/electricity.png" },
        { name: "失物招领", imgPath: "../../static/function/find.png" },
        { name: "更多", imgPath: "../../static/function/more.png" }
      ]
    };
  },
  onLoad() {
    this.navList1 = [
      { name: "课程表", imgPath: "../../static/function/class.png" },
      { name: "教室预约", imgPath: "../../static/function/classes.png" },
      { name: "导师互动", imgPath: "../../static/function/mentor.png" },
      { name: "更多", imgPath: "../../static/function/more.png" }
    ], this.navList2 = [
      { name: "问卷投票", imgPath: "../../static/function/questionnaire.png" },
      { name: "卫检成绩", imgPath: "../../static/function/score.png" },
      { name: "接诉即办", imgPath: "../../static/function/complaint.png" },
      { name: "更多", imgPath: "../../static/function/more.png" }
    ], this.navList3 = [
      { name: "热水系统", imgPath: "../../static/function/water.png" },
      { name: "公寓用电", imgPath: "../../static/function/electricity.png" },
      { name: "失物招领", imgPath: "../../static/function/find.png" },
      { name: "更多", imgPath: "../../static/function/more.png" }
    ];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navList1, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i
      };
    }),
    b: common_vendor.f($data.navList2, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i
      };
    }),
    c: common_vendor.f($data.navList3, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/CollegeApartmentsMiniProgramFrontEnd/pages/function/function.vue"]]);
wx.createPage(MiniProgramPage);
