"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        //默认头像
        avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
        nickName: "",
        token: null
      },
      useravatarImg: "",
      func1_List: []
    };
  },
  methods: {
    delogin(meg) {
      common_vendor.index.showLoading({
        title: meg,
        mask: true
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.navigateTo({
          url: "/pages/login/loginPage"
        });
      }, 1e3);
    }
  },
  onShow() {
    if (this.userInfo.token === "") {
      common_vendor.index.showModal({
        title: "提示",
        content: "未登录影响功能的使用",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            this.delogin("正在跳转");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  },
  onLoad() {
    this.userInfo.token = utils_cache.getLocalData("token");
    console.log("this.userInfo.token", this.userInfo.token);
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.token === ""
  }, $data.userInfo.token === "" ? {} : {}, {
    b: $data.userInfo.avatarUrl,
    c: common_vendor.p({
      showArrow: true,
      title: "姓名",
      rightText: "小萪"
    }),
    d: common_vendor.p({
      showArrow: true,
      title: "学号",
      rightText: "202311071111"
    }),
    e: common_vendor.p({
      showArrow: true,
      title: "学院",
      rightText: "莱文克劳学院"
    }),
    f: common_vendor.p({
      showArrow: true,
      title: "专业",
      rightText: "黑魔法"
    }),
    g: common_vendor.p({
      showArrow: true,
      title: "建言献策"
    }),
    h: common_vendor.p({
      showArrow: true,
      title: "关于"
    }),
    i: common_vendor.p({
      ["border-full"]: true
    }),
    j: common_vendor.p({
      title: "个人信息",
      type: "line"
    }),
    k: common_vendor.o(($event) => $options.delogin("正在退出"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/myself/myself.vue"]]);
wx.createPage(MiniProgramPage);
