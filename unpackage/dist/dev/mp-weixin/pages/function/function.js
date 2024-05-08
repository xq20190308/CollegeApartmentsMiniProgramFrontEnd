"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //分类功能区的数据列表
      navList: [
        {
          imgPath: "../../static/function/class.png"
        },
        {
          imgPath: "../../static/function/classschedule.png"
        },
        {
          imgPath: "../../static/function/questionnaire.png"
        },
        {
          imgPath: "../../static/function/tutointeraction.png"
        }
      ]
    };
  },
  onload() {
    this.navList = [
      {
        imgPath: "../../static/function/class.png"
      },
      {
        imgPath: "../../static/function/classschedule.png"
      },
      {
        imgPath: "../../static/function/questionnaire.png"
      },
      {
        imgPath: "../../static/function/tutointeraction.png"
      }
    ];
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navList, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: i
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/function/function.vue"]]);
wx.createPage(MiniProgramPage);
