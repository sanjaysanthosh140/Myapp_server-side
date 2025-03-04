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
exports.delete_Wish = exports.getWishList = exports.WishList = void 0;
const Wish_cb_1 = require("./Wish_cb");
const Cb_1 = __importDefault(require("./Cb"));
const whishList_1 = __importDefault(require("../models/whishList"));
const jwt = require("jsonwebtoken");
const WishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const prodId = req.params.id;
        if (req.isAuthenticated() || token) {
            if (!req.isAuthenticated()) {
                console.log("token", token);
                jwt.verify(token, "my_secret_key", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                    !err
                        ? prodId && decodedToken.userId
                            ? yield (0, Wish_cb_1.creat_wish)(prodId, decodedToken.userId, Cb_1.default).then((cb) => {
                                console.log(cb);
                                res.setHeader("Content-type", "application/json");
                                res.json(cb);
                            })
                            : console.log("prodID or decodetoken one is missing ")
                        : console.log("err", err);
                }));
            }
            else {
                console.log("user", req.user);
                const userId = req.user;
                userId && prodId
                    ? yield (0, Wish_cb_1.creat_wish)(prodId, userId._id, Cb_1.default).then((cb) => {
                        console.log(cb);
                        res.setHeader("Content-Type", "application/json");
                        res.json(cb);
                    })
                    : console.log("userID or prodId one is  missing ", userId, prodId);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.WishList = WishList;
const getWishList = (req, res) => {
    try {
        let userID = req.user;
        const token = req.headers.authorization;
        req.isAuthenticated() || token
            ? !req.isAuthenticated()
                ? jwt.verify(token, "my_secret_key", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                    !err && decodedToken
                        ? (0, Wish_cb_1.achive_wish)(decodedToken.userId, Cb_1.default).then((cb) => {
                            console.log("cb", cb);
                            res.setHeader("Content-Type", "application/json");
                            res.json([cb]);
                        })
                        : console.log(err);
                }))
                : (userID = // ---------_--------__--
                    req.user &&
                        (0, Wish_cb_1.achive_wish)(userID.id, Cb_1.default).then((cb) => {
                            console.log("cb", cb);
                            res.setHeader("Content-Type", "application/json");
                            res.json([cb]);
                        }))
            : console.log("not found");
    }
    catch (error) {
        console.log(error);
    }
};
exports.getWishList = getWishList;
const delete_Wish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodId = req.params.id;
        const token = req.headers.authorization;
        if (req.isAuthenticated() || token) {
            if (!req.isAuthenticated()) {
                jwt.verify(token, "my_secret_key", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!err && decodedToken) {
                        const wishList = yield whishList_1.default.findOne({
                            userId: decodedToken.userId,
                        });
                        if (wishList) {
                            let prodIndex = wishList.item.findIndex((p) => p.prodId.toString() === prodId.toString());
                            if (prodIndex !== -1) {
                                wishList.item.splice(prodIndex, 1);
                                yield wishList.save();
                                res.setHeader("Content-Type", "application/json");
                                res.json({ message: "product deleted from wishlist" });
                            }
                        }
                        else {
                            res.setHeader("Content-Type", "application/json");
                            res.json({ message: "product not found in wishlist" });
                        }
                        console.log(decodedToken);
                    }
                    else {
                        console.log(err);
                    }
                }));
            }
            else {
                const userId = req.user;
                console.log(userId._id);
                const wishList = yield whishList_1.default.findOne({ userId: userId._id });
                if (wishList) {
                    let prodIndex = wishList.item.findIndex((p) => p.prodId.toString() === prodId.toString());
                    if (prodIndex !== -1) {
                        wishList.item.splice(prodIndex, 1);
                        yield wishList.save();
                        res.setHeader("Content-Type", "application/json");
                        res.json({ message: "product deleted from wishlist" });
                    }
                }
                else {
                    res.setHeader("Content-Type", "application/json");
                    res.json({ message: "product not found in wishlist" });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.delete_Wish = delete_Wish;
