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
  methods: {}
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatarUrl,
    b: common_vendor.f($data.func1_List, (item, i, i0) => {
      return {
        a: item.imgPath,
        b: common_vendor.t(item.name),
        c: i,
        d: item.navigator_url
      };
    }),
    c: common_vendor.o(() => {
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/pages/myself/myself.vue"]]);
wx.createPage(MiniProgramPage);
