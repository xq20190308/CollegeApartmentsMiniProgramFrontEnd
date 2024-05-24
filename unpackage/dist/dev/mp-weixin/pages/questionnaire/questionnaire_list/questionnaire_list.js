"use strict";
const common_vendor = require("../../../common/vendor.js");
const system_config = require("../../../system.config.js");
const _sfc_main = {
  data() {
    return {
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
    };
  },
  methods: {
    getNaireslist(cates) {
      console.log("分类请求的参数", cates);
      common_vendor.index.request({
        //url:'http://192.168.76.218:8080/questionnaire/selectAll',
        url: system_config.sysurl.developUrl + "/questionnaire/selectAll",
        method: "GET",
        data: {},
        success: (res) => {
          this.questionnairelist = res.data.data;
        },
        complete: (res) => {
          console.log(res);
          if (this.newNaire != null) {
            console.log("新问卷", this.newNaire);
            this.loadNewlist();
          } else {
            console.log("newList为空");
            console.log("获取到列表", this.questionnairelist);
          }
        }
      });
    },
    gotonaire: (item) => {
      console.log("问卷信息", item);
      common_vendor.index.navigateTo({
        url: "../questionnaire_home/questionnaire_home?questionidList=" + item.questionList + "&id=" + item.id + "&type=" + item.type + "&name=" + item.name + "&descr=" + item.descr + "&startTime=" + item.startTime + "&endTime=" + item.endTime
      });
    },
    addnaire() {
      common_vendor.index.navigateTo({
        url: "../addquestionnaire/addquestionnaire"
      });
    },
    dircate(options) {
      this.active = options;
      console.log("点击事件的参数", options);
      if (options === 0) {
        this.getNaireslist();
      } else {
        this.getNaireslist(options);
      }
    },
    loadNewlist() {
      this.questionnairelist.push(this.newNaire);
      console.log("创建新问卷后的列表", this.questionnairelist);
      this.newNaire = null;
    }
  },
  onLoad(options) {
    console.log("列表参数", options);
    if (options.newNaire != null) {
      this.newNaire = JSON.parse(options.newNaire);
      console.log("组件数据", this.newNaire);
    } else {
      console.log("newNaire为null");
    }
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
    a: common_vendor.f($data.cates, (cate, index, i0) => {
      return {
        a: common_vendor.t(cate.name),
        b: index == $data.active ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.dircate(index), index)
      };
    }),
    b: common_vendor.f($data.questionnairelist, (item, index, i0) => {
      return {
        a: "5548f501-0-" + i0,
        b: common_vendor.p({
          naireinfo: item
        }),
        c: "5548f501-1-" + i0,
        d: common_vendor.p({
          naireinfo: item
        }),
        e: index,
        f: common_vendor.o(($event) => $options.gotonaire(item), index)
      };
    }),
    c: common_vendor.o((...args) => $options.addnaire && $options.addnaire(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/questionnaire/questionnaire_list/questionnaire_list.vue"]]);
wx.createPage(MiniProgramPage);
