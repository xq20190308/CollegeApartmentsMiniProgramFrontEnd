"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      complaintDrafts: [{
        id: "91",
        describe: "cillum ex",
        category: "in Duis fugiat qui aute",
        contactobject: "in eu ullamco irure aliqua",
        pushtime: "2014-03-04 03:56:28"
      }]
      // 初始为空数组
    };
  },
  onLoad() {
    this.fetchComplaintDrafts();
  },
  onShow() {
    if (this.$route.query) {
      console.log(this.$route.query.pushtime);
      this.fetchComplaintDrafts(this.$route.query.pushtime);
    }
  },
  methods: {
    fetchComplaintDrafts(pushtime) {
      common_vendor.index.request({
        url: "http://localhost:8080/api/suggestions/pushtime",
        // 替换为您的服务器接口URL
        method: "GET",
        success: (res) => {
          this.complaintDrafts.push(res.data);
          if (res.statusCode === 200) {
            console.log(res);
            for (let i = 0; i < 10; i++) {
              this.complaintDrafts.push(
                {
                  id: i,
                  describe: "cillum ex",
                  category: "in Duis fugiat qui aute",
                  contactobject: "in eu ullamco irure aliqua",
                  pushtime: "2014-03-04 03:56:28"
                }
              );
            }
            console.log(this.complaintDrafts);
          } else {
            console.error("Failed to fetch complaint drafts:", res);
          }
        },
        fail: (err) => {
          console.error("Request failed:", err);
        }
      });
    },
    onpress() {
      common_vendor.index.navigateTo({
        url: "../feedback/feedbackSubmit"
      });
    },
    change(item) {
      console.log(item);
      common_vendor.index.navigateTo({
        url: "../feedback/DraftFeedback"
      });
    },
    delet(index) {
      this.complaintDrafts.splice(index, 1);
      console.log(this.complaintDrafts);
    }
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
    a: common_vendor.f($data.complaintDrafts, (item, index, i0) => {
      return {
        a: common_vendor.t(item.id),
        b: common_vendor.t(item.describe),
        c: common_vendor.t(item.category),
        d: common_vendor.t(item.contactobject),
        e: common_vendor.t(item.pushtime),
        f: common_vendor.o(($event) => $options.change(item), index),
        g: common_vendor.o(($event) => $options.delet(index), index),
        h: index
      };
    }),
    b: common_vendor.p({
      title: "我的草稿",
      ["sub-title"]: "",
      type: "line"
    }),
    c: common_vendor.o((...args) => $options.onpress && $options.onpress(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/新建文件夹 (3)/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
