"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const _sfc_main = {
  __name: "function",
  setup(__props) {
    const data = common_vendor.reactive({
      islogined: false,
      navList1: [
        { name: "课程表", imgPath: "../../static/function/class.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "教室预约", imgPath: "../../static/function/classes.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
      ],
      navList2: [
        { name: "问卷投票", imgPath: "../../static/function/questionnaire.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath: "../hygiene/showhygiene" },
        { name: "接诉即办", imgPath: "../../static/function/complaint.png", pagePath: "../feedback/feedback" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
      ],
      navList3: [
        { name: "热水系统", imgPath: "../../static/function/water.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath: "../questionnaire/questionnaire_home" },
        { name: "失物招领", imgPath: "../../static/function/find.png", pagePath: "../lostAndFound/lostAndFound" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_home" }
      ]
    });
    common_vendor.onShow(() => {
      data.islogined = utils_cache.getLocalData("token") != "";
      console.log(data.islogined);
    });
    common_vendor.onLoad(() => {
      data.navList1 = [
        { name: "课程表", imgPath: "../../static/function/class.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" },
        { name: "教室预约", imgPath: "../../static/function/classes.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" },
        { name: "导师互动", imgPath: "../../static/function/mentor.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" }
      ], data.navList2 = [
        { name: "问卷调查", imgPath: "../../static/function/questionnaire.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" },
        { name: "卫检成绩", imgPath: "../../static/function/score.png", pagePath: "../hygiene/showhygiene" },
        { name: "接诉即办", imgPath: "../../static/function/complaint.png", pagePath: "../feedback/feedback" },
        { name: "热水系统", imgPath: "../../static/function/water.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" },
        { name: "公寓用电", imgPath: "../../static/function/electricity.png", pagePath: "../lostAndFound/lostAndFound" },
        { name: "失物招领", imgPath: "../../static/function/find.png", pagePath: "../lostAndFound/lostAndFound" },
        { name: "更多", imgPath: "../../static/function/more.png", pagePath: "../questionnaire/questionnaire_list/questionnaire_list" }
      ], data.navList3 = [
        { name: "账号管理", imgPath: "../../static/function/more.png", pagePath: "../userManage/userManage" }
      ];
    });
    const Function1Click = (item) => {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    };
    const Function2Click = (item) => {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    };
    const Function3Click = (item) => {
      common_vendor.index.reLaunch({
        url: item.pagePath
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(data.navList1, (item, i, i0) => {
          return {
            a: item.imgPath,
            b: common_vendor.t(item.name),
            c: i,
            d: common_vendor.o(($event) => Function1Click(item), i)
          };
        }),
        b: common_vendor.f(data.navList2, (item, i, i0) => {
          return {
            a: item.imgPath,
            b: common_vendor.t(item.name),
            c: i,
            d: common_vendor.o(($event) => Function2Click(item), i)
          };
        }),
        c: data.islogined
      }, data.islogined ? {
        d: common_vendor.f(data.navList3, (item, i, i0) => {
          return {
            a: item.imgPath,
            b: common_vendor.t(item.name),
            c: i,
            d: common_vendor.o(($event) => Function3Click(item), i)
          };
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
