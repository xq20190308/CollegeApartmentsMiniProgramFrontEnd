"use strict";
const common_vendor = require("../common/vendor.js");
function setLocalData(key, data) {
  if (typeof data !== "object" && typeof data !== void 0) {
    common_vendor.index.setStorageSync(key, data);
  } else {
    common_vendor.index.setStorageSync(key, JSON.stringify(data));
  }
}
const getLocalAll = () => common_vendor.index.getStorageInfo({
  success: function(res) {
    console.log(res);
  }
});
const getLocalData = (key) => common_vendor.index.getStorageSync(key);
const delLocalData = (key) => common_vendor.index.removeStorageSync(key);
const clearUserInfo = () => {
  delLocalData("token");
  delLocalData("trueName");
  delLocalData("username");
  delLocalData("accountManage");
  delLocalData("noticeManage");
  delLocalData("feedbackManage");
  delLocalData("questionnaireManage");
  delLocalData("avatarUrl");
};
const setUserInfo = (res) => {
  setLocalData("isShowLocal", true);
  setLocalData("token", res.data.data.token);
  setLocalData("trueName", res.data.data.trueName);
  setLocalData("username", res.data.data.username);
  setLocalData("accountManage", res.data.data.userPermission.accountManage);
  setLocalData("noticeManage", res.data.data.userPermission.noticeManage);
  setLocalData("feedbackManage", res.data.data.userPermission.feedbackManage);
  setLocalData("questionnaireManage", res.data.data.userPermission.questionnaireManage);
};
exports.clearUserInfo = clearUserInfo;
exports.getLocalAll = getLocalAll;
exports.getLocalData = getLocalData;
exports.setLocalData = setLocalData;
exports.setUserInfo = setUserInfo;
