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
exports.prodList = exports.userz_log = exports.new_user = void 0;
const data_hashing_1 = require("../hash_mehod--/data_hashing");
const user_models_1 = __importDefault(require("../models/user_models"));
const jwt_1 = require("../Autherization/jwt");
//import { counter_mail } from "../C_ounter_Mail/Main_function";
const new_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let exist = yield user_models_1.default.exists({ email: req.body.email });
        if (exist) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ message: 'user already exist' });
        }
        else {
            console.log(req.body);
            (0, data_hashing_1.user_data_hashing)(req.body).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(data);
                const user_info = new user_models_1.default(data);
                let newUser = yield user_info.save();
                const encodeToken = yield (0, jwt_1.generateToken)(newUser._id);
                console.log(newUser);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ data: newUser.name, token: encodeToken });
                //counter_mail(req.body)
            })).catch((error) => {
                console.log(error);
            });
        }
        //:console.log('nothing')
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
    }
});
exports.new_user = new_user;
const userz_log = (req, res) => {
    try {
        // console.log("req.body", req.body);
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: "please provide email and password",
            });
        }
        else {
            user_models_1.default.findOne({ email: req.body.email }).then((data) => {
                (data === null || data === void 0 ? void 0 : data.isDisabled) === true ? res.setHeader('Content-Type', 'application/json') &&
                    res.status(400).json({ message: 'account disabled' }) :
                    (0, data_hashing_1.decode_user)(req.body).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                        //console.log("login", data);
                        const encodeToken = yield (0, jwt_1.generateToken)(data._id);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json({
                            message: `welcome back ${data.name}`,
                            login: true,
                            token: encodeToken,
                        });
                    }))
                        .catch((error) => {
                        console.log(error);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(400).json({
                            message: error.message,
                        });
                    });
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.userz_log = userz_log;
const prodList = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('for prod fetching');
});
exports.prodList = prodList;
