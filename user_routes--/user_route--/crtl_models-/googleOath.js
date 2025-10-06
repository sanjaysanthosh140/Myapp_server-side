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
const passport = require("passport");
const GooogleStatergies = require("passport-google-oauth20").Strategy;
const google_Oauth_1 = __importDefault(require("../models/google_Oauth"));
const data_hashing_1 = require("../hash_mehod--/data_hashing");
const mongoose_1 = require("mongoose");
//import { counter_mail } from "../C_ounter_Mail/Main_function";
require("dotenv").config();
//let encodeToken:null;
let result;
passport.use(new GooogleStatergies({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://myapp-server-side-rfxp.onrender.com/user_side/oauth2/redirect/google",
}, //https://myapp-server-side-pqkd.onrender.com/user_side/oauth2/redirect/google
// console.log('Client ID:', process.env.GOOGLE_CLIENT_ID),
// console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET),
function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        //    console.log(profile)
        if (profile) {
            const userIn = yield google_Oauth_1.default.findOne({
                email: profile.emails[0].value,
            });
            if (userIn) {
               // console.log('userIn',userIn)
                done(null, userIn);
            }
            else {
                const user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: profile.id,
                };
                (0, data_hashing_1.user_data_hashing)(user).then((data) => __awaiter(this, void 0, void 0, function* () {
                    //console.log(data)
                    const newAuthusers = new google_Oauth_1.default(user);
                    result = yield newAuthusers.save();
                    if (result) {
                        done(null, result);
                        //console.log("oauth2 result"result);
                    }
                    //console.log(result);
                    // encodeToken = generateToken(result._id)
                }));
            }
        }
    });
}));
passport.serializeUser((result, done) => {
    //console.log('Serializing user ID:', result._id);
    const userId = result._id.toString();
    // console.log(userId)
    done(null, userId); // Pass just the ID
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let user
        //console.log('Deserializing with ID:', id);
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return done(null, false);
        }
        const _id = new mongoose_1.Types.ObjectId(id);
        //console.log(_id)
        let user = yield google_Oauth_1.default.findById(_id);
        //user = await git_user.findById(objectId)
        //  console.log('Found user:', user);
        done(null, user);
        //console.log("user@@@@%%%&&&&_______", user);
        if (!user) {
            console.log("No user found with ID:", id);
            return done(null, false);
        }
    }
    catch (error) {
        console.error("Deserialize error:", error);
        done(error, null);
    }
}));
