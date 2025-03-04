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
    const token = yield req.headers["authorization"];
    try {
        if (req.isAuthenticated()) {
            // console.log("reach isAuth()",req.isAuthenticated());
            res.setHeader("Content-Type", "application/json");
            // 
            return res.json({
                isAuthenticate: true,
            });
        }
        else if (!req.isAuthenticated()) {
            if (token) {
                jwt.verify(token, "my_secret_key", (err, encode) => {
                    console.log(encode.userId);
                    if (err) {
                        res.setHeader("Content-Type", "application/json");
                        return res.json({
                            isAuthenticate: false,
                            message: err.name,
                        });
                    }
                    else {
                        res.setHeader("Content-Type", "application/json");
                        return res.json({
                            isAuthenticate: true,
                            user: req.user,
                        });
                    }
                }); // verifyToken end
            }
            //console.log("not",req.isAuthenticated())
            // console.log('token',token);
        }
    }
    catch (error) {
        return error;
    }
});
exports.verifyToken = verifyToken;
