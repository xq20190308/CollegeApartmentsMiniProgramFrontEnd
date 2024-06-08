"use strict";
const getCurrentTime = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const getTimeStamp = (formattedTime) => {
  return Date.parse(formattedTime);
};
exports.getCurrentTime = getCurrentTime;
exports.getTimeStamp = getTimeStamp;
