"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_api_login = require("./api/login.js");
const utils_cache = require("../../utils/cache.js");
const _sfc_main = {
  __name: "loginPage",
  setup(__props) {
    let licenseDisagree = common_vendor.ref(true);
    let show = common_vendor.ref(false);
    common_vendor.ref({});
    common_vendor.ref("");
    const logCode = common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    const getCode = () => {
      return new Promise((resolve, reject2) => {
        common_vendor.index.login({
          provider: "weixin",
          success(res) {
            logCode.value = res.code;
            resolve(logCode.value);
          },
          fail(err) {
            reject2(err);
          }
        });
      });
    };
    const loginConfirm = async (userInfo, verify = false) => {
      if (licenseDisagree.value) {
        common_vendor.index.showToast({
          title: "请先阅读并同意协议",
          icon: "error"
        });
        return false;
      }
      const code = await getCode();
      let userName = null;
      console.log("userInfo:", userInfo);
      if (userInfo) {
        userName = userInfo.name;
      }
      const req = {
        code,
        name: userName,
        // neighborhoodName,
        verify
      };
      console.log("req: ", req);
      pages_login_api_login.login(req).then((res) => {
        if (res.msg == "success") {
          console.log("登陆成功");
          utils_cache.setLocalData("token", res.data.token);
          console.log("res", res.data.token);
          show.value = false;
          common_vendor.index.switchTab({
            url: "/pages/myself/myself"
          });
          common_vendor.index.showToast({
            title: "登录成功"
          });
        } else {
          console.log("登陆失败msg!=success");
          if (verify) {
            show.value = true;
            return;
          }
          reject("error");
        }
      }).catch((err) => {
        console.log("登陆失败");
        common_vendor.index.showToast({
          title: "" + err,
          icon: "error"
        });
      });
      console.log("结束");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(licenseDisagree),
        b: common_vendor.o(($event) => common_vendor.isRef(licenseDisagree) ? licenseDisagree.value = !common_vendor.unref(licenseDisagree) : licenseDisagree = !common_vendor.unref(licenseDisagree)),
        c: common_vendor.o(($event) => _ctx.showDeal1 = true),
        d: common_vendor.o(($event) => _ctx.showDeal2 = true),
        e: common_vendor.o(($event) => loginConfirm(null, true))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/codes/CollegeApartmentsFrontE/pages/login/loginPage.vue"]]);
wx.createPage(MiniProgramPage);
