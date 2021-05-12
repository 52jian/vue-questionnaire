"use strict";
exports.__esModule = true;
exports.changePwd = exports.login = void 0;
var request_1 = require("@/utils/request");
function login(data) {
    return request_1["default"].post("/admin/login?userName=" + data.userName + "&password=" + data.password);
}
exports.login = login;
function changePwd(data) {
    return request_1["default"].get("/admin/modify?newPassword=" + data.newPassword + "&oldPassword=" + data.oldPassword + "&userName=" + data.userName);
}
exports.changePwd = changePwd;
