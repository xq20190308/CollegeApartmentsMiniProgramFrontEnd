"use strict";
const common_vendor = require("../common/vendor.js");
const utils_cache = require("./cache.js");
const developUrl = "http://localhost:8080";
const httpInterceptor = {
  invoke(options) {
    if (!options.url.startsWith("http")) {
      options.url = developUrl + options.url;
    }
    options.timeout = 1e4;
    console.log("拦截器", options);
    const token = utils_cache.getLocalData("token");
    options.header.Authorization = token;
  }
};
common_vendor.index.addInterceptor("request", httpInterceptor);
common_vendor.index.addInterceptor("uploadFile", httpInterceptor);
const load = (url, filePath, name, formData) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url,
      //仅为示例，非真实的接口地址
      filePath,
      name,
      formData,
      header: {},
      success: (uploadFileRes) => {
        console.log("--", JSON.parse(uploadFileRes.data));
        resolve(JSON.parse(uploadFileRes.data));
      },
      fail: (err) => {
        console.log("--", err);
        reject(err);
      }
    });
  });
};
const http = (url, method, data) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      header: {},
      //请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          console.log("success", res);
        } else {
          common_vendor.index.showToast({
            title: "网路请求失败",
            icon: "error"
          });
          reject(res);
        }
      },
      fail(err) {
        common_vendor.index.showToast({
          title: "网路请求失败",
          icon: "error"
        });
        reject(err);
      }
    });
  });
};
const service = (url, method, data) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      header: {
        "Authorization": `${common_vendor.index.getStorageSync("token")}`
      },
      success: (res) => {
        console.log("success", res);
        resolve(res);
      },
      fail: (err) => {
        console.log("fail", err);
        reject(err);
      },
      complete: (res) => {
        console.log("complete", res);
      }
    });
  });
};
exports.http = http;
exports.load = load;
exports.service = service;
