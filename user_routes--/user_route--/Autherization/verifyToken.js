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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("call reach here");
    console.log("isAuth", req.isAuthenticated());
    // console.log("headers", req.headers);
    // console.log("cookie", req.cookies);
    let token = yield req.headers["authorization"];
    try {
        if (req.isAuthenticated()) {
            console.log("working in Oauth");
            // console.log("isAuth", req.isAuthenticated());
            // console.log("headers", req.headers);
            // console.log("cookie", req.cookies);
            // console.log("reach isAuth()",req.isAuthenticated());
            const user = req.user;
            res.setHeader("Content-Type", "application/json");
            return res.json({
                isAuthenticate: true,
                user_id: user._id,
            });
        }
        else if (token !== "null") {
            console.log("token", token);
            //if (token) {
            jwt.verify(token, "my_secret_key", (err, encode) => {
                //console.log("token", encode.userId);
                if (err) {
                    console.log(err, "get error");
                    res.setHeader("Content-Type", "application/json");
                    return res.json({
                        isAuthenticate: false,
                        message: err.name,
                    });
                }
                else {
                    console.log("success");
                    res.setHeader("Content-Type", "application/json");
                    return res.json({
                        isAuthenticate: true,
                        user_id: encode.userId,
                    });
                }
            });
        }
        else {
            console.log('oauth and token empity');
            res.setHeader("Content-Type", "application/json");
            return res.json({
                isAuthenticate: false,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyToken = verifyToken;
