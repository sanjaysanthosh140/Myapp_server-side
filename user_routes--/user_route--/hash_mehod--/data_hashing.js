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
exports.decode_user = exports.user_data_hashing = void 0;
const user_models_1 = __importDefault(require("../models/user_models"));
const crypto_1 = __importDefault(require("crypto"));
const user_data_hashing = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var salt = crypto_1.default.randomBytes(16);
        console.log("salt--", salt);
        try {
            crypto_1.default.pbkdf2(data.password, salt, 310000, 32, "sha256", (err, hashedPasswod) => {
                if (!err) {
                    console.log("salt--", salt);
                    data.password = hashedPasswod.toString("base64");
                    data.salt = salt.toString("base64");
                    resolve(data);
                }
                else {
                    new Error("error in hashing password");
                }
            });
            //methds for hash passwords
        }
        catch (error) {
            throw error;
        }
    }));
});
exports.user_data_hashing = user_data_hashing;
const decode_user = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_models_1.default.find({ email: data.email });
        if (users.length !== 0) {
            if (users[0].password && users[0].salt) {
                const Bsalt = Buffer.from(users[0].salt, "base64");
                console.log("-----------------|------------|------------__--------|-");
                console.log("bsalt", Bsalt);
                crypto_1.default.pbkdf2(data.password, Bsalt, 310000, 32, "sha256", (err, hashedPasswod) => {
                    if (!err) {
                        console.log("hashedPassword", hashedPasswod);
                        let buffPssDb = Buffer.from(users[0].password, "base64");
                        console.log("buffPssDb", buffPssDb);
                        let match = crypto_1.default.timingSafeEqual(hashedPasswod, buffPssDb);
                        if (match) {
                            console.log("password  match");
                            resolve(users[0]);
                        }
                        else {
                            console.log("password not match");
                            reject(new Error("password not match"));
                        }
                    }
                    else {
                        console.log(err);
                    }
                });
            }
        }
        else if (users.length === 0) {
            reject(new Error("user not found"));
        }
    }));
};
exports.decode_user = decode_user;
