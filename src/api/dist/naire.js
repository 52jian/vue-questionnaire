"use strict";
exports.__esModule = true;
exports.del = exports.changeTime = exports.submitStatistic = exports.changeStatus = exports.submit = exports.detail = exports.questions = exports.crossanalysis = exports.sourceData = exports.statis = exports.update = exports.create = exports.list = void 0;
var request_1 = require("@/utils/request");
/**
 * 问卷列表
 */
exports.list = function (query) {
    return request_1["default"].get("/naire/page?current=" + query.current + "&size=" + query.size + "&nTitle=" + query.nTitle + "&nStatus=" + query.nStatus, {});
};
/**
 * 创建问卷
 * @param data
 */
exports.create = function (data) {
    return request_1["default"].post("/naire/addOne", data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
};
/**
 * 修改问卷
 * @param data
 */
exports.update = function (data) {
    return request_1["default"].post("/naire/updateOne", data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
};
/**
 * 问卷统计
 * @param data
 */
exports.statis = function (data) {
    return request_1["default"].post("/naire/statis", data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
};
/**
 * 样本数据
 * @param data
 */
exports.sourceData = function (data) {
    return request_1["default"].get("/naire/sourcedata", data);
};
/**
 * 交叉分析
 * @param data
 */
exports.crossanalysis = function (data) {
    return request_1["default"].post("/naire/crossanalysis", data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
};
/**
 * 交叉分析
 * @param data
 */
exports.questions = function (data) {
    return request_1["default"].post("/naire/questions", data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
};
/**
 * 问卷详情
 * @param data
 */
exports.detail = function (data) {
    return request_1["default"].get("/naire/queryById", data);
};
/**
 * 提交问卷
 * @param data
 */
exports.submit = function (data) {
    return request_1["default"].post("/naire/updateOne", data, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
};
/**
 * 发布/停止发布
 * @param data
 */
exports.changeStatus = function (data) {
    return request_1["default"].get("/naire/publishNaire?nId=" + data.nId);
};
/**
 * 回收情况
 * @param data
 */
exports.submitStatistic = function (data) {
    return request_1["default"].get("/naire/submitStatis", data);
};
/**
 * 修改截止时间
 * @param data
 */
exports.changeTime = function (data) {
    return request_1["default"].post("/naire/changeTime", data);
};
/**
 * 删除问卷
 * @param data
 */
exports.del = function (data) {
    return request_1["default"].get("/naire/deleteById?nId=" + data.nId);
};
