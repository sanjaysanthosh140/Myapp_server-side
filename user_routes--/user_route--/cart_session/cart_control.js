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
exports.QuantityIncrement = exports.frv_cart = exports.new_Cart = void 0;
const user_models_1 = __importDefault(require("../models/user_models"));
const Cart_method_1 = require("./Cart_controls/Cart_method");
const creat_Cart_1 = require("./Cart_controls/creat_Cart");
const jwt = require("jsonwebtoken");
const new_Cart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod_id = req.params.id;
    const items = [
        {
            productId: prod_id,
            quantity: 1,
        },
    ];
    const token = req.headers.authorization;
    if (req.isAuthenticated() || token) {
        const user = req.user;
        console.log("callCaetFun", user);
        if (req.isAuthenticated() && prod_id) {
            let response = yield (0, Cart_method_1.add_to_cart)(user._id, items); //
            console.log(response);
            res.setHeader("Content-type", "application/json");
            res.status(200).json(response.message);
        }
        else if (token && prod_id) {
            jwt.verify(token, "my_secret_key", (err, tokenDecode) => __awaiter(void 0, void 0, void 0, function* () {
                if (!err) {
                    //console.log(tokenDecode);
                    const userIsValid = yield user_models_1.default.exists({
                        _id: tokenDecode.userId,
                    });
                    if (userIsValid) {
                        let response = yield (0, Cart_method_1.add_to_cart)(userIsValid, items); //
                        console.log(response);
                        res.setHeader("Content-type", "application/json");
                        res.status(200).json(response.message);
                    }
                    else {
                        console.log("user not found ---yet");
                    }
                }
                else {
                    console.log(err);
                    console.log(token);
                }
            }));
        }
    }
});
exports.new_Cart = new_Cart;
const frv_cart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (req.isAuthenticated() || token) {
            if (!req.isAuthenticated()) {
                (token === null || token === void 0 ? void 0 : token.length) !== 0
                    ? jwt.verify(token, "my_secret_key", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                        if (!err) {
                            let id = decodedToken.userId;
                            // console.log("id", id);
                            (0, creat_Cart_1.creat_cart)(id).then((data) => {
                                //console.log("jwt", data);
                                if (data) {
                                    res.setHeader("Content-Type", "application/json");
                                    res.status(200).json(data);
                                }
                            });
                        }
                        else {
                            console.log(err);
                        }
                    }))
                    : console.log("no token");
            }
            else {
                //console.log("userFrv", req.user);
                let user = req.user;
                (0, creat_Cart_1.creat_cart)(user._id).then((data) => {
                    //console.log("isAuth", data);
                    if (data) {
                        res.setHeader("Content-Type", "application/json");
                        res.status(200).json(data);
                    }
                });
            }
        }
        else {
            console.log("no users");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.frv_cart = frv_cart;
const QuantityIncrement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (req.isAuthenticated() || token) {
        let { proId, action } = req.body;
        console.log(proId, action);
        if (!req.isAuthenticated()) {
            jwt.verify(token, "my_secret_key", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                let response;
                let userID = decodedToken.userId;
                !err && decodedToken
                    ? response = yield (0, Cart_method_1.CartprodQtyaction)(userID, proId, action)
                    : console.log("jwtError", err);
                // response = await CartprodQtyaction(userID,proId,action)
                if (response) {
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).json(response);
                }
            }));
        }
        else {
            let user = req.user;
            console.log("userId", user._id);
            let response = yield (0, Cart_method_1.CartprodQtyaction)(user._id, proId, action);
            if (response) {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(response);
            }
        }
    }
});
exports.QuantityIncrement = QuantityIncrement;
