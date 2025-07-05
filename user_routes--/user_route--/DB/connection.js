"use strict";
//import { db } from "../models/user_models";
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
exports.mongo_Connection = void 0;
const mongoose = require("mongoose");
let url = process.env.db_storage;
let dbconnection;
const mongo_Connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(url).then((data) => {
            !data ? console.log("not connected") : console.log(" DB connected");
            //dbconnection = mongoose.connection;
            //console.log("db connection ", dbconnection);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.mongo_Connection = mongo_Connection;
