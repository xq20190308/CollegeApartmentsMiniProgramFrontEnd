"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_access = require("../../../utils/access.js");
const utils_http = require("../../../utils/http.js");
const utils_time = require("../../../utils/time.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (questionnaire + _easycom_uni_section)();
}
const questionnaire = () => "../../../components/questionnaire/questionnaire.js";
const _sfc_main = {
  __name: "questionnaire_list",
  setup(__props) {
    const data = common_vendor.reactive({
      questionnairelist: [],
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
    const getNaireslist = async () => {
      const res = await utils_http.http("/questionnaire/selectAll", "GET", {});
      data.questionnairelist = res.data;
      let currentTimeStamp = utils_time.getTimeStamp(await utils_time.getCurrentTime());
      for (let i = 0; i < data.questionnairelist.length; i++) {
        data.questionnairelist[i].isEnd = utils_time.getTimeStamp(data.questionnairelist[i].endTime) > currentTimeStamp ? false : true;
      }
    };
    const gotonaire = (item) => {
      if (item.isEnd) {
        console.log("问卷已结束");
        common_vendor.index.showModal({
          title: "问卷已结束",
          icon: "error"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "../questionnaire_home/questionnaire_home?id=" + item.id + "&type=" + item.type + "&name=" + item.name + "&description=" + item.description + "&startTime=" + item.startTime + "&endTime=" + item.endTime
        });
      }
    };
    const modifynaire = (item) => {
      if (item.isEnd) {
        console.log("问卷已结束");
        common_vendor.index.showModal({
          title: "问卷已结束",
          icon: "error"
        });
      } else {
        utils_access.goto(
          "../addquestionnaire/modifyquestionnaire?info=" + JSON.stringify(item),
          "questionnaireManage"
        );
      }
    };
    const deletenaire = async (item) => {
      if (item.isEnd) {
        console.log("问卷已结束");
        common_vendor.index.showModal({
          title: "问卷已结束",
          icon: "error"
        });
      } else {
        console.log("--", item.id);
        {
          const res = await utils_http.http("/questionnaire/deleteById/" + item.id, "DELETE", {});
          console.log(res);
          getNaireslist();
        }
      }
    };
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      getNaireslist();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.questionnairelist, (item, index, i0) => {
          return {
            a: common_vendor.o((e) => {
              modifynaire(item);
            }, index),
            b: common_vendor.o((e) => {
              deletenaire(item);
            }, index),
            c: "5548f501-1-" + i0 + "," + ("5548f501-0-" + i0),
            d: common_vendor.p({
              naireinfo: item
            }),
            e: common_vendor.s(item.isEnd ? "opacity: 0.5" : ""),
            f: "5548f501-0-" + i0,
            g: common_vendor.p({
              title: item.name,
              type: "line",
              titleFontSize: "42rpx"
            }),
            h: index,
            i: common_vendor.s(item.id === 1 ? _ctx.filter : ""),
            j: common_vendor.o(($event) => gotonaire(item), index)
          };
        }),
        b: common_vendor.o(($event) => common_vendor.unref(utils_access.goto)("../addquestionnaire/addquestionnaire", "questionnaireManage"))
      };
    };
  }
};
wx.createPage(_sfc_main);
