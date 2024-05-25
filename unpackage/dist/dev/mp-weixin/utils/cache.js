"use strict";
const common_vendor = require("../common/vendor.js");
function setLocalData(key, data) {
  if (typeof data !== "object" && typeof data !== void 0) {
    common_vendor.index.setStorageSync(key, data);
  } else {
    common_vendor.index.setStorageSync(key, JSON.stringify(data));
  }
}
const getLocalData = (key) => {
  var _a;
  return common_vendor.index.getStorageSync(key) ? (_a = JSON.parse(common_vendor.index.getStorageSync(key))) == null ? void 0 : _a.JSON.parse(common_vendor.index.getStorageSync(key)) : null;
};
exports.getLocalData = getLocalData;
exports.setLocalData = setLocalData;
