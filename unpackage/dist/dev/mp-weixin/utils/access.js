"use strict";
const common_vendor = require("../common/vendor.js");
const goto = (url, condition) => {
  console.log("页面跳转");
  if (common_vendor.index.getStorageSync(condition) == true) {
    console.log(url, condition);
    if (url != "") {
      common_vendor.index.navigateTo({
        url
      });
    }
  } else {
    common_vendor.index.showToast({
      title: "你没有权限",
      icon: "error"
    });
  }
};
exports.goto = goto;
