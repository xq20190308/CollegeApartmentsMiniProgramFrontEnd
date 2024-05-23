"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
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
      ]
    };
  },
  methods: {
    todetail(id) {
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?content=" + this.articles[id].content + "&id=" + this.articles[id].id + "&isActive=" + this.articles[id].isActive + "&publishTime=" + this.articles[id].publishTime + "&title=" + this.articles[id].title + "&typeName=" + this.articles[id].typeName
      });
    },
    getarticles() {
      common_vendor.index.request({
        url: "http://127.0.0.1:4523/m1/4414254-4059226-default/notifications",
        method: "GET",
        success: (res) => {
          console.log("success", res);
          this.articles = res.data.data;
          console.log(this.articles);
        },
        fail: (err) => {
          console.error("Fetch error:", err);
        }
      });
    }
  },
  onLoad() {
    this.getarticles();
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.articles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.id),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.publishTime),
        e: common_vendor.t(item.typeName),
        f: index,
        g: common_vendor.o(($event) => $options.todetail(index), index)
      };
    }),
    b: common_vendor.f($data.articles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.id),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.publishTime),
        e: common_vendor.t(item.typeName),
        f: index,
        g: common_vendor.o(($event) => $options.todetail(index), index)
      };
    }),
    c: common_vendor.f($data.articles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.id),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.publishTime),
        e: common_vendor.t(item.typeName),
        f: index,
        g: common_vendor.o(($event) => $options.todetail(index), index)
      };
    }),
    d: common_vendor.p({
      title: "学校通知",
      ["sub-title"]: "",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
