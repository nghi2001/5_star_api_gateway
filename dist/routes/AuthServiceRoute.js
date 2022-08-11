"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const apiConfig_1 = require("../config/apiConfig");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
const authServiceProxy = (0, express_http_proxy_1.default)(`${apiConfig_1.AuthApi}`);
// console.log(AuthApi);
// router.use(verifyToken)
router.get("/user/listToken/:id", verifyToken_1.default, authServiceProxy);
router.post('/user/sigin', authServiceProxy);
router.post('/user/sigup', authServiceProxy);
router.post('/user/changepass', verifyToken_1.default, authServiceProxy);
router.post('/user/active', verifyToken_1.default, authServiceProxy);
router.post('/', verifyToken_1.default, (req, res) => {
    console.log(req.cookies);
    res.send('jjd');
    return;
});
exports.default = router;
