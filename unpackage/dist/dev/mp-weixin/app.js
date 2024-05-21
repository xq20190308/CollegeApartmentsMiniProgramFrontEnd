"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/pu/pu.js";
  "./pages/function/function.js";
  "./pages/myself/myself.js";
  "./pages/questionnaire/questionnaire.js";
  "./pages/feedback/feedback.js";
  "./pages/feedback/feedbackSubmit.js";
  "./pages/questionnaire/example_questionnarie.js";
  "./pages/notice/notice.js";
  "./pages/notice/noticedetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/lenovo/Desktop/智慧社区/CollegeApartmentsMiniProgramFrontEnd/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
