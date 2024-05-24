"use strict";
const common_vendor = require("../../common/vendor.js");
const system_config = require("../../system.config.js");
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
    };
  },
  methods: {
    todetail(id) {
      console.log(JSON.stringify(this.articles[id]));
      common_vendor.index.navigateTo({
        url: "../notice/noticedetail?detail=" + JSON.stringify(this.articles[id])
      });
    },
    getarticles(cates) {
      console.log("分类请求的参数", cates);
      let noticeurl = system_config.sysurl.developUrl + "/notifications";
      if (cates != null) {
        noticeurl = system_config.sysurl.developUrl + "/notifications?isActive=" + (cates - 1);
      }
      common_vendor.index.request({
        url: noticeurl,
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
    },
    dircate(options) {
      this.active = options;
      console.log("点击事件的参数", options);
      if (options === 0) {
        this.getarticles();
      } else {
        this.getarticles(options);
      }
    }
  },
  onLoad(options) {
    console.log("通知列表参数", options);
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
    a: common_vendor.f($data.cates, (cate, index, i0) => {
      return {
        a: common_vendor.t(cate.name),
        b: index == $data.active ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.dircate(index), index)
      };
    }),
    b: common_vendor.f($data.catenotice, (item, index, i0) => {
      return {
        a: common_vendor.f($data.articles, (item2, index2, i1) => {
          return {
            a: common_vendor.t(item2.id),
            b: common_vendor.t(item2.title),
            c: common_vendor.t(item2.content),
            d: common_vendor.t(item2.publishTime),
            e: common_vendor.t(item2.typeName),
            f: index2,
            g: common_vendor.o(($event) => $options.todetail(index2), index2)
          };
        }),
        b: common_vendor.f($data.articles, (item2, index2, i1) => {
          return {
            a: common_vendor.t(item2.id),
            b: common_vendor.t(item2.title),
            c: common_vendor.t(item2.content),
            d: common_vendor.t(item2.publishTime),
            e: common_vendor.t(item2.typeName),
            f: index2,
            g: common_vendor.o(($event) => $options.todetail(index2), index2)
          };
        }),
        c: common_vendor.f($data.articles, (item2, index2, i1) => {
          return {
            a: common_vendor.t(item2.id),
            b: common_vendor.t(item2.title),
            c: common_vendor.t(item2.content),
            d: common_vendor.t(item2.publishTime),
            e: common_vendor.t(item2.typeName),
            f: index2,
            g: common_vendor.o(($event) => $options.todetail(index2), index2)
          };
        }),
        d: index,
        e: "27fa4ea6-0-" + i0,
        f: common_vendor.p({
          title: item,
          ["sub-title"]: "",
          type: "line"
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
