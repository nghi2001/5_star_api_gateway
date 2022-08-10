"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const apiConfig_1 = require("../config/apiConfig");
const router = express_1.default.Router();
const authServiceProxy = (0, express_http_proxy_1.default)(`${apiConfig_1.AuthApi}`);
// console.log(AuthApi);
router.post('/auth/signin', authServiceProxy);
router.post('/auth/signup', authServiceProxy);
exports.default = router;
