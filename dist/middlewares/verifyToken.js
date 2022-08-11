"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let status, msg;
            let token = req.cookies.token;
            if (token) {
                yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        if (req.cookies.refresh_token) {
                            let refresh_token = req.cookies.refresh_token;
                            let decode = yield jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
                            console.log('decode', decode);
                            let newToken = yield axios_1.default.post(`${process.env.AUTH_SERVICE}auth/resetToken`, {
                                refresh_token: refresh_token,
                                user_id: decode._id
                            });
                            console.log(newToken.data);
                            if (!newToken.data)
                                throw Error("invalid refresh Token");
                            // res.clearCookie('token');
                            // res.clearCookie("refresh_token");
                            res.cookie('token', newToken.data.toString(), { maxAge: 1000 * 60 * 60 * 24 * 30 * 30, httpOnly: true });
                            next();
                        }
                        else {
                            status = 401;
                            msg = 'Forbiden';
                        }
                    }
                    else {
                        status = 200;
                    }
                }));
            }
            else {
                status = 401;
                msg = "Forbiden";
            }
            console.log('next');
            if (status != 200) {
                return res.json({
                    status,
                    msg
                });
            }
            else {
                return next();
            }
        }
        catch (error) {
            console.log(error);
            res.clearCookie('token');
            res.clearCookie("refresh_token");
            return res.status(500).json({
                status: 500,
                msg: error
            });
        }
    });
}
exports.default = verifyToken;
