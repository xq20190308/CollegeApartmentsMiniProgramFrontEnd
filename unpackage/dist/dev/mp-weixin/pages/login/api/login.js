"use strict";
const utils_request = require("../../../utils/request.js");
function login(user) {
  return utils_request.service("/user/login", "POST", user);
}
exports.login = login;
