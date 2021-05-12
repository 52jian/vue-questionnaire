"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var axios_1 = require("axios");
var user_1 = require("@/store/modules/user");
var router_1 = require("@/router");
var element_ui_1 = require("element-ui");
var storage_1 = require("@/utils/storage");
var service = axios_1["default"].create({
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // withCredentials: true // send cookies when cross-domain requests
});
// http request 拦截器
service.interceptors.request.use(function (config) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    var jwtToken = storage_1.getLocalStorage('JWT_TOKEN');
    var username = storage_1.getLocalStorage('USER_NAME');
    // if (!username) {
    //   config.headers.Authorization = `token ${jwtToken}`
    // }
    if (!username) {
        router_1["default"].replace({
            path: '/login',
            query: { redirect: router_1["default"].currentRoute.fullPath }
        });
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
// http response 拦截器
service.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                user_1.UserModule.logout();
                router_1["default"].replace({
                    path: '/login',
                    query: { redirect: router_1["default"].currentRoute.fullPath }
                });
                element_ui_1.Message.error('Token 失效，请重新登录。');
                break;
            default:
                element_ui_1.Message.error('服务器错误，请重试。');
                break;
        }
    }
    else {
        element_ui_1.Message.error('服务器错误，请重试。');
    }
    return Promise.reject(error); // 返回接口返回的错误信息
});
service.defaults.transformResponse = function (response) {
    try {
        var res = JSON.parse(response);
        if (res.code === 200) {
            return {
                success: true,
                data: res.token || res.data,
                msg: res.message || ''
            };
        }
        else {
            return {
                success: false,
                data: res.data,
                msg: res.message || res.data || ''
            };
        }
    }
    catch (e) {
        return {
            success: false,
            msg: '接口返回格式有误，请重试。'
        };
    }
};
exports["default"] = {
    // T 表示API返回的 类型声明
    get: function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return service.get(url, __assign(__assign({}, options), { params: params }));
    },
    post: function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return service.post(url, data, __assign({}, options));
    }
};
