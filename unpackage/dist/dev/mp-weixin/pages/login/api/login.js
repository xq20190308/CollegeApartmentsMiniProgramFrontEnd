"use strict";
const utils_http = require("../../../utils/http.js");
function login(user) {
  return utils_http.service("/user/login", "POST", user);
}
exports.login = login;
