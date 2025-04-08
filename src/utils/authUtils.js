"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthToken = exports.isAuthenticated = exports.getAuthToken = exports.setAuthToken = void 0;
var setAuthToken = function (token) {
    localStorage.setItem('authToken', token);
};
exports.setAuthToken = setAuthToken;
var getAuthToken = function () {
    return localStorage.getItem('authToken');
};
exports.getAuthToken = getAuthToken;
var isAuthenticated = function () {
    return !!(0, exports.getAuthToken)();
};
exports.isAuthenticated = isAuthenticated;
var clearAuthToken = function () {
    localStorage.removeItem('authToken');
};
exports.clearAuthToken = clearAuthToken;
