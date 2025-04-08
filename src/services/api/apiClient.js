"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var authUtils_1 = require("../../utils/authUtils");
var API_BASE_URL = import.meta.env.VITE_SERVER_URL;
// Set up an Axios instance with default headers
var apiClient = axios_1.default.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor to include the access key in headers
apiClient.interceptors.request.use(function (config) {
    var accessKey = (0, authUtils_1.getAuthToken)();
    if (accessKey) {
        config.headers['Authorization'] = "Bearer ".concat(accessKey);
    }
    console.info('Request made with access key:', accessKey);
    return config;
});
exports.default = apiClient;
