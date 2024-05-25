"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_http = require("../../../utils/http.js");
if (!Math) {
  questionnaire();
}
const questionnaire = () => "../../../components/questionnaire/questionnaire.js";
const _sfc_main = {
  __name: "questionnaire_list",
  setup(__props) {
    const data = common_vendor.reactive({
      questionnairelist: [],
      newNaire: null,
      total: 0,
      cates: [{
        id: 0,
        name: "全部"
      }, {
        id: 1,
        name: "未完成"
      }, {
        id: 2,
        name: "已完成"
      }],
      active: 0
    });
    const getNaireslist = async (cates) => {
      console.log("分类请求的参数", cates);
      const res = await utils_http.http("/questionnaire/selectAll", "GET", {});
      console.log("封装后请求的结果", res);
      data.questionnairelist = res.data;
      if (data.newNaire != null) {
        console.log("新问卷", data.newNaire);
        loadNewlist();
      } else {
        console.log("newList为空");
        console.log("获取到列表", data.questionnairelist);
      }
    };
    const gotonaire = (item) => {
      console.log("问卷信息", item);
      common_vendor.index.navigateTo({
        url: "../questionnaire_home/questionnaire_home?questionidList=" + item.questionList + "&id=" + item.id + "&type=" + item.type + "&name=" + item.name + "&descr=" + item.descr + "&startTime=" + item.startTime + "&endTime=" + item.endTime
      });
    };
    const addnaire = () => {
      common_vendor.index.navigateTo({
        url: "../addquestionnaire/addquestionnaire"
      });
    };
    const dircate = (options) => {
      data.active = options;
      console.log("点击事件的参数", options);
      if (options === 0) {
        getNaireslist();
      } else {
        getNaireslist(options);
      }
    };
    const loadNewlist = () => {
      data.questionnairelist.push(data.newNaire);
      console.log("创建新问卷后的列表", data.questionnairelist);
      data.newNaire = null;
    };
    common_vendor.onLoad((options) => {
      console.log("列表参数", options);
      if (options.newNaire != null) {
        data.newNaire = JSON.parse(options.newNaire);
        console.log("组件数据", data.newNaire);
      } else {
        console.log("newNaire为null");
      }
      getNaireslist();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.cates, (cate, index, i0) => {
          return {
            a: common_vendor.t(cate.name),
            b: index == data.active ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => dircate(index), index)
          };
        }),
        b: common_vendor.f(data.questionnairelist, (item, index, i0) => {
          return {
            a: "6d43575e-0-" + i0,
            b: common_vendor.p({
              naireinfo: item
            }),
            c: "6d43575e-1-" + i0,
            d: common_vendor.p({
              naireinfo: item
            }),
            e: index,
            f: common_vendor.o(($event) => gotonaire(item), index)
          };
        }),
        c: common_vendor.o(addnaire)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/codes/CollegeApartmentsFrontE/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_list/questionnaire_list.vue"]]);
wx.createPage(MiniProgramPage);
