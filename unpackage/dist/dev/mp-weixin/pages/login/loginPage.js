"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_api_login = require("./api/login.js");
const utils_cache = require("../../utils/cache.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "loginPage",
  setup(__props) {
    const data = common_vendor.reactive({
      rules: {
        studentid: {
          rules: [{
            required: true,
            errorMessage: "请输入学号"
          }, {
            minLength: 12,
            maxLength: 12,
            errorMessage: "请输入12位学号"
          }]
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "请输入密码"
          }]
        }
      },
      reqdata: {
        code: "",
        studentid: "",
        password: ""
      }
    });
    let licenseDisagree = common_vendor.ref(false);
    let show = common_vendor.ref(false);
    common_vendor.ref({});
    common_vendor.ref("");
    const logCode = common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.onLoad(() => {
      console.log("--", licenseDisagree.value);
    });
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
    const changeConfirm = (e) => {
      console.log("--", licenseDisagree.value);
      licenseDisagree.value = !licenseDisagree.value;
      console.log("++", licenseDisagree.value);
    };
    const req = common_vendor.ref();
    const loginConfirm = async (ref) => {
      var _a;
      console.log(data.reqdata);
      console.log("1111", req);
      (_a = req.value) == null ? void 0 : _a.validate().then(async (res1) => {
        if (!licenseDisagree.value) {
          common_vendor.index.showToast({
            title: "请先阅读并同意协议",
            icon: "error"
          });
          return false;
        }
        req.code = await getCode();
        console.log("req: ", req);
        await pages_login_api_login.login(req).then((res) => {
          if (res.statusCode == 200) {
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
            console.log("登陆失败");
            reject("error");
          }
        }).catch((err) => {
          console.log("登陆失败");
          common_vendor.index.showToast({
            title: "" + err,
            icon: "error"
          });
        });
      }).catch((err) => {
        console.log("填写错误", err);
      });
      console.log("结束");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => data.reqdata.studentid = $event),
        b: common_vendor.p({
          placeholder: "请输入学号",
          modelValue: data.reqdata.studentid
        }),
        c: common_vendor.p({
          label: "学号",
          required: true,
          name: "studentid"
        }),
        d: common_vendor.o(($event) => data.reqdata.password = $event),
        e: common_vendor.p({
          placeholder: "请输入密码",
          modelValue: data.reqdata.password
        }),
        f: common_vendor.p({
          label: "密码",
          required: true,
          name: "password"
        }),
        g: common_vendor.sr(req, "259083a0-0", {
          "k": "req"
        }),
        h: common_vendor.p({
          rules: data.rules,
          modelValue: data.reqdata,
          ["label-position"]: "top"
        }),
        i: common_vendor.unref(licenseDisagree),
        j: common_vendor.o(changeConfirm),
        k: common_vendor.o(($event) => _ctx.showDeal1 = true),
        l: common_vendor.o(($event) => _ctx.showDeal2 = true),
        m: common_vendor.o(($event) => loginConfirm())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86187/Desktop/CollegeApartmentsMiniProgramFrontEnd/pages/login/loginPage.vue"]]);
wx.createPage(MiniProgramPage);
