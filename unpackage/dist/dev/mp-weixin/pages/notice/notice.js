"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    const data = common_vendor.reactive({
      articles: [
        {
          //测试数据
          content: "Lorem",
          id: 87,
          isActive: true,
          publishTime: "1976-01-02 07:27:42",
          title: "学府属习",
          typeName: "律况平将体集题"
        }
      ],
      catenotice: ["学校通知", "个人通知"],
      cates: [{
        id: 0,
        name: "全部"
      }, {
        id: 1,
        name: "未结束"
      }, {
        id: 2,
        name: "已结束"
      }],
      active: 0
    });
    const todetail = (id) => {
      console.log(JSON.stringify(data.articles[id]));
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?detail=" + JSON.stringify(data.articles[id])
      });
    };
    const getarticles = async (cates) => {
      console.log("分类请求的参数", cates);
      let noticeurl = "/notifications";
      if (cates != null) {
        noticeurl = "/notifications?isActive=" + (cates - 1);
      }
      const res = await utils_http.http(noticeurl, "GET", {});
      console.log("封装后请求的结果", res);
      data.articles = res.data;
      console.log(data.articles);
    };
    const dircate = (options) => {
      data.active = options;
      console.log("点击事件的参数", options);
      if (options === 0) {
        getarticles();
      } else {
        getarticles(options);
      }
    };
    common_vendor.onLoad((options) => {
      console.log("通知列表参数", options);
      getarticles();
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
        b: common_vendor.f(data.catenotice, (item, index, i0) => {
          return {
            a: common_vendor.f(data.articles, (item2, index2, i1) => {
              return {
                a: common_vendor.t(item2.id),
                b: common_vendor.t(item2.title),
                c: common_vendor.t(item2.content),
                d: common_vendor.t(item2.publishTime),
                e: common_vendor.t(item2.typeName),
                f: index2,
                g: common_vendor.o(($event) => todetail(index2), index2)
              };
            }),
            b: common_vendor.f(data.articles, (item2, index2, i1) => {
              return {
                a: common_vendor.t(item2.id),
                b: common_vendor.t(item2.title),
                c: common_vendor.t(item2.content),
                d: common_vendor.t(item2.publishTime),
                e: common_vendor.t(item2.typeName),
                f: index2,
                g: common_vendor.o(($event) => todetail(index2), index2)
              };
            }),
            c: common_vendor.f(data.articles, (item2, index2, i1) => {
              return {
                a: common_vendor.t(item2.id),
                b: common_vendor.t(item2.title),
                c: common_vendor.t(item2.content),
                d: common_vendor.t(item2.publishTime),
                e: common_vendor.t(item2.typeName),
                f: index2,
                g: common_vendor.o(($event) => todetail(index2), index2)
              };
            }),
            d: index,
            e: "fa319806-0-" + i0,
            f: common_vendor.p({
              title: item,
              ["sub-title"]: "",
              type: "line"
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/codes/CollegeApartmentsFrontE/CollegeApartmentsMiniProgramFrontEnd/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
