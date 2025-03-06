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
const ctrl_methos_1 = require("./crtl_models-/ctrl_methos");
const verifyToken_1 = require("./Autherization/verifyToken");
const DBQuerys_1 = require("./dataBaseControls/DBQuerys");
const cart_control_1 = require("./cart_session/cart_control");
const strip_1 = require("./crtl_models-/strip");
const wishCtrl_1 = require("./wishList/wishCtrl");
//import { frv_Cart } from "./cart_session/cart_control";
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
router.route("/").post(ctrl_methos_1.new_user);
router.route("/login").post(ctrl_methos_1.userz_log);
router
    .route("/oauth/google")
    .get(passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
}));
router.route("/oauth2/redirect/google").get(passport.authenticate("google", {
    successRedirect: "http://localhost:5173/prod",
    failureRedirect: "http://localhost:5173/login",
    session: true,
    failureMessage: true,
}));
router
    .route("/github/oauth")
    .get(passport.authenticate("github", {
    scope: [
        "user:email",
        "read:user",
        "user:profile",
        "repo",
        "notifications",
        "gist",
    ],
    allow_signup: true,
    prompt: "consent",
    access_type: "online",
}));
router.route("/oauth3/github/callback/").get(passport.authenticate("github", {
    successRedirect: "http://localhost:5173/prod",
    session: true,
    failureRedirect: "http://localhost:5173/login",
    failureMessage: true,
}));
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, DBQuerys_1.getPoducts)();
    console.log(product);
    res.contentType("application/json");
    res.status(200).json([product]);
}));
router.get("/checkauth", verifyToken_1.verifyToken);
router.get('/newCart/:id', cart_control_1.new_Cart);
router.get('/Frv_carts', cart_control_1.frv_cart);
router.put('/decrement', cart_control_1.QuantityIncrement);
router.post('/payment', strip_1.stripcall);
router.get('/wishList/:id', wishCtrl_1.WishList);
router.get('/retrive_wish', wishCtrl_1.getWishList);
router.delete("/delete_wish/:id", wishCtrl_1.delete_Wish);
module.exports = router;
