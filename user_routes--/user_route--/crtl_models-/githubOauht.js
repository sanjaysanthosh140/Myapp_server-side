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
const google_Oauth_1 = __importDefault(require("../models/google_Oauth"));
const mongoose_1 = require("mongoose");
const data_hashing_1 = require("../hash_mehod--/data_hashing");
const Main_function_1 = require("../C_ounter_Mail/Main_function");
//import oauthUsers from "../models/google_Oauth";
const passport = require('passport');
const GithubStatergies = require('passport-github2');
require('dotenv').config();
passport.use(new GithubStatergies({
    clientID: process.env.Git_ClientID,
    clientSecret: process.env.Git_Client_secrets,
    callbackURL: "http://localhost:4000/user_side/oauth3/github/callback"
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('porfile', profile);
        if (profile) {
            const userIn = yield google_Oauth_1.default.findOne({
                name: profile.displayName
            });
            if (userIn) {
                console.log('userIn', userIn);
                cb(null, userIn);
            }
            else {
                console.log('profile', profile);
                const userData = {
                    name: profile.displayName,
                    email: profile.username,
                    password: profile.id
                };
                (0, data_hashing_1.user_data_hashing)(userData).then((data) => __awaiter(this, void 0, void 0, function* () {
                    const newAuthusers = new google_Oauth_1.default(data);
                    let result = yield newAuthusers.save();
                    cb(null, result);
                    (0, Main_function_1.counter_mail)(result);
                }));
            }
        }
        else {
            return cb(null, false);
        }
    });
}));
passport.serializeUser(function (result, done) {
    const userId = result._id.toString();
    console.log('serialize', userId);
    done(null, userId);
});
// 
passport.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            done(null, false);
        }
        const objectId = new mongoose_1.Types.ObjectId(id);
        //user = await oauth_user.findById(objectId)
        let user = yield google_Oauth_1.default.findById(objectId);
        console.log('deserialize', user);
        done(null, user);
    });
});
