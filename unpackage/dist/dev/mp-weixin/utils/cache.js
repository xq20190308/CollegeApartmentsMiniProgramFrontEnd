"use strict";
const common_vendor = require("../common/vendor.js");
function setLocalData(key, data) {
  if (typeof data !== "object" && typeof data !== void 0) {
    common_vendor.index.setStorageSync(key, data);
  } else {
    common_vendor.index.setStorageSync(key, JSON.stringify(data));
  }
}
const getLocalData = (key) => common_vendor.index.getStorageSync(key);
exports.getLocalData = getLocalData;
exports.setLocalData = setLocalData;
