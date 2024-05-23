"use strict";
const common_vendor = require("../common/vendor.js");
const systemconfig = require("../systemconfig.js");
const service = (url, method, data) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: systemconfig.sysurl.developUrl + url,
      method,
      data,
      header: {
        "Authorization": `${common_vendor.index.getStorageSync("token")}`
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.service = service;
