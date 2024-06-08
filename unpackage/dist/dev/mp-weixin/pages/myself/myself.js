"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const utils_http = require("../../utils/http.js");
const utils_socket = require("../../utils/socket.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_file_picker2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "myself",
  setup(__props) {
    const data = common_vendor.reactive({
      imageStyles: {
        border: {
          radius: "50%"
        }
      },
      userInfo: {
        //默认头像
        avatarUrl: "",
        nickName: "默认",
        token: null,
        username: "",
        trueName: ""
      },
      useravatarImg: "",
      func1_List: []
    });
    const delogin = async (meg) => {
      common_vendor.index.showModal({
        title: "提示",
        content: meg,
        success: (res) => {
          if (res.confirm) {
            utils_cache.clearUserInfo();
            utils_socket.wsclose();
            data.userInfo.token = utils_cache.getLocalData("token");
            tologin("正在跳转");
          } else if (res.cancel)
            ;
        }
      });
    };
    const tologin = async (meg) => {
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
    };
    const selectUpload = async (e) => {
      console.log(e);
      await utils_http.load("/user/uploadavatar", e.tempFilePaths[0], "avatar").then(
        (res1) => {
          console.log("res1", res1);
          data.userInfo.avatarUrl = res1.data;
        }
      );
      await utils_cache.setLocalData("avatarUrl", data.userInfo.avatarUrl);
    };
    common_vendor.onShow(async () => {
      data.userInfo.avatarUrl = utils_cache.getLocalData("avatarUrl");
      console.log("头像", data.userInfo.avatarUrl);
      data.userInfo.username = utils_cache.getLocalData("username");
      data.userInfo.trueName = utils_cache.getLocalData("trueName");
      data.userInfo.token = utils_cache.getLocalData("token");
      if (data.userInfo.token === "") {
        common_vendor.index.showModal({
          title: "提示",
          content: "未登录影响功能的使用",
          success: (res) => {
            if (res.confirm) {
              tologin("正在跳转");
            } else if (res.cancel)
              ;
          }
        });
      }
    });
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.userInfo.token === ""
      }, data.userInfo.token === "" ? {
        b: common_vendor.o(($event) => tologin("正在跳转")),
        c: common_vendor.o(($event) => tologin("正在跳转"))
      } : {}, {
        d: data.userInfo.avatarUrl,
        e: common_vendor.sr("uniFilePicker", "860aaed2-0"),
        f: common_vendor.o(selectUpload),
        g: common_vendor.p({
          limit: "1",
          ["file-mediatype"]: "image",
          title: "",
          ["disable-preview"]: true,
          imageStyles: data.imageStyles,
          ["del-icon"]: false,
          required: true
        }),
        h: common_vendor.t(data.userInfo.nickName),
        i: common_vendor.p({
          showArrow: true,
          title: "姓名",
          rightText: data.userInfo.trueName
        }),
        j: common_vendor.p({
          showArrow: true,
          title: "学号",
          rightText: data.userInfo.username
        }),
        k: common_vendor.p({
          showArrow: true,
          title: "学院",
          rightText: "计算机科学与工程学院学院"
        }),
        l: common_vendor.p({
          showArrow: true,
          title: "专业",
          rightText: "软件工程"
        }),
        m: common_vendor.p({
          showArrow: true,
          title: "建言献策"
        }),
        n: common_vendor.p({
          showArrow: true,
          title: "关于"
        }),
        o: common_vendor.p({
          ["border-full"]: true
        }),
        p: common_vendor.p({
          title: "个人信息",
          type: "line"
        }),
        q: common_vendor.o(($event) => delogin("退出登录影响功能的使用"))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-860aaed2"]]);
wx.createPage(MiniProgramPage);
