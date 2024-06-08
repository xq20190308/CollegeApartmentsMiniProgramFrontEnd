"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_socket = require("./utils/socket.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/function/function.js";
  "./pages/message/message.js";
  "./pages/myself/myself.js";
  "./pages/login/loginPage.js";
  "./pages/pu/pu.js";
  "./pages/questionnaire/questionnaire_home/questionnaire_home.js";
  "./pages/questionnaire/questionnaire_list/questionnaire_list.js";
  "./pages/questionnaire/addquestionnaire/addquestionnaire.js";
  "./pages/questionnaire/addquestionnaire/modifyquestionnaire.js";
  "./pages/feedback/feedback.js";
  "./pages/feedback/feedbackSubmit.js";
  "./pages/feedback/manageFeed.js";
  "./pages/feedback/showFeed.js";
  "./pages/notice/notice.js";
  "./pages/notice/noticedetail.js";
  "./pages/notice/addnotice.js";
  "./pages/userManage/userManage.js";
  "./pages/lostAndFound/lostAndFound.js";
  "./pages/lostAndFound/lostSubmit.js";
  "./pages/lostAndFound/foundSubmit.js";
  "./pages/lostAndFound/detailLost.js";
  "./pages/lostAndFound/detailFound.js";
  "./pages/lostAndFound/lostAndFoundMysef.js";
  "./pages/hygiene/search.js";
  "./pages/hygiene/showhygiene.js";
  "./pages/hygiene/hygieneGradesSubmit.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    utils_socket.wsopen();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const mainFun = () => {
  console.log("mainFun");
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
mainFun();
createApp().app.mount("#app");
exports.createApp = createApp;
exports.mainFun = mainFun;
