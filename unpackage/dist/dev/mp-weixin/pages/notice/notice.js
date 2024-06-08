"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const utils_http = require("../../utils/http.js");
const utils_access = require("../../utils/access.js");
const pages_notice_api_getnotices = require("./api/getnotices.js");
if (!Array) {
  const _easycom_d_search_log2 = common_vendor.resolveComponent("d-search-log");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_d_search_log2 + _easycom_uni_section2)();
}
const _easycom_d_search_log = () => "../../uni_modules/d-search-log/components/d-search-log/d-search-log.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_d_search_log + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    const data = common_vendor.reactive({
      articles: [],
      individualarticles: [],
      catenotice: ["个人通知", "学校通知"],
      search_list: [],
      store_key: "notice_keywordlist",
      input_text: ""
    });
    const onClickDelAll = (e) => {
    };
    const onSearchName = (e) => {
      console.log(e);
      pages_notice_api_getnotices.getarticles({ keyword: e }).then((response) => {
        data.articles = response.sort((a, b) => a.id - b.id);
        console.log("response", response);
      });
    };
    const todetail = (index) => {
      console.log("index", index);
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?id=" + data.articles[index].id
      });
    };
    const deletenotice = async (index) => {
      if (utils_cache.getLocalData("noticeManage") == true) {
        common_vendor.index.showModal({
          title: "提示",
          content: "确认删除该通知吗",
          success: async (r) => {
            if (r.confirm) {
              const res = await utils_http.http("/notifications/modify", "POST", {
                id: data.articles[index].id,
                isActive: 0
              });
              pages_notice_api_getnotices.getarticles({}).then((response) => {
                data.articles = response.sort((a, b) => a.id - b.id);
                console.log("response", response);
              });
              console.log("删除的res", res);
              console.log("用户点击确定");
            } else if (r.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "你没有权限",
          icon: "error"
        });
      }
    };
    common_vendor.onShow(() => {
      pages_notice_api_getnotices.getarticles({}).then((response) => {
        data.articles = response.sort((a, b) => a.id - b.id);
      });
    });
    common_vendor.onLoad((options) => {
      console.log("通知列表", data.articles);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickDelAll),
        b: common_vendor.o(onSearchName),
        c: common_vendor.p({
          color_border: "#666666",
          color_text: "#666666",
          search_list_hot: data.search_list,
          store_key: data.store_key,
          input_text: data.input_text
        }),
        d: common_vendor.f(data.individualarticles, (item, index, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.content),
            d: common_vendor.t(item.publishTime),
            e: common_vendor.t(item.typeName),
            f: index,
            g: common_vendor.o(($event) => todetail(index), index)
          };
        }),
        e: common_vendor.p({
          title: "个人通知",
          ["sub-title"]: "",
          type: "line"
        }),
        f: common_vendor.f(data.articles, (item, index, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => todetail(index), index),
            d: common_vendor.o(($event) => deletenotice(index), index),
            e: common_vendor.t(item.content),
            f: common_vendor.t(item.publishTime),
            g: common_vendor.t(item.typeName),
            h: index
          };
        }),
        g: common_vendor.p({
          title: "学校通知",
          ["sub-title"]: "",
          type: "line"
        }),
        h: common_vendor.o(($event) => common_vendor.unref(utils_access.goto)("addnotice", "noticeManage"))
      };
    };
  }
};
wx.createPage(_sfc_main);
