"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        //默认头像
        avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
        nickName: ""
      },
      useravatarImg: "",
      func1_List: []
    };
  },
  methods: {
    delogin() {
      common_vendor.index.showLoading({
        title: "正在退出"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/login/loginPage"
        });
      }, 2e3);
    }
  }
  // onLoad() {
  // 	this.func1_List = [{
  // 			name: "个人信息",
  // 			imgPath: "../../static/self_func1_img/MyInformation.png",
  // 			navigator_url: "../../pagesOfMyself/self_information/self_information"
  // 		},
  // 		{
  // 			name: "业主认证",
  // 			imgPath: "../../static/self_func1_img/Owner.png",
  // 			navigator_url: "../../pagesOfMyself/Owner_Certified/Owner_Certified"
  // 		},
  // 		{
  // 			name: "我的通知",
  // 			imgPath: "../../static/self_func1_img/Information.png",
  // 			navigator_url: "../../pagesOfMyself/My_notification/My_notification"
  // 		},
  // 		{
  // 			name: "维修记录",
  // 			imgPath: "../../static/self_func1_img/Maintenance.png",
  // 			navigator_url: "../../pagesOfMyself/Repair_records/Repair_records"
  // 		},
  // 		{
  // 			name: "服务政策",
  // 			imgPath: "../../static/self_func1_img/Policy.png",
  // 			navigator_url: "../../pagesOfMyself/Service_Policy/Service_Policy"
  // 		}
  // 	]
  // }
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
  return {
    a: $data.userInfo.avatarUrl,
    b: common_vendor.p({
      showArrow: true,
      title: "姓名",
      rightText: "小萪"
    }),
    c: common_vendor.p({
      showArrow: true,
      title: "学号",
      rightText: "202311071111"
    }),
    d: common_vendor.p({
      showArrow: true,
      title: "学院",
      rightText: "莱文克劳学院"
    }),
    e: common_vendor.p({
      showArrow: true,
      title: "专业",
      rightText: "黑魔法"
    }),
    f: common_vendor.p({
      showArrow: true,
      title: "建言献策"
    }),
    g: common_vendor.p({
      showArrow: true,
      title: "关于"
    }),
    h: common_vendor.p({
      ["border-full"]: true
    }),
    i: common_vendor.p({
      title: "个人信息",
      type: "line"
    }),
    j: common_vendor.o((...args) => $options.delogin && $options.delogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/myself/myself.vue"]]);
wx.createPage(MiniProgramPage);
