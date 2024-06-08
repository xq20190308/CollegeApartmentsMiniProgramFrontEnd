"use strict";
const utils_http = require("../../../utils/http.js");
const getarticles = async (cates) => {
  let additionid = "";
  if (cates.id != null) {
    additionid = "&id=" + cates.id;
  }
  let additiontypeName = "";
  if (cates.typeName != null) {
    additiontypeName = "&typeName=" + cates.typeName;
  }
  let additionkeyword = "";
  if (cates.keyword != null) {
    additionkeyword = "&keyword=" + cates.keyword;
  }
  let noticeurl = "/notifications?isActive=1" + additionid + additiontypeName + additionkeyword;
  const res = await utils_http.http(noticeurl, "GET", {});
  let result = res.data;
  return result;
};
exports.getarticles = getarticles;
