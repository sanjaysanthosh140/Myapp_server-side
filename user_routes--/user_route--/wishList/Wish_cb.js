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
exports.achive_wish = exports.creat_wish = void 0;
const mongoose_1 = require("mongoose");
const whishList_1 = __importDefault(require("../models/whishList"));
const creat_wish = (prodId, userId, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = {
            prodId: prodId,
        };
        if (!prodId || !userId) {
            return cb(new Error("prodId or userId is missing"), null);
        }
        else {
            const existlist = yield whishList_1.default.findOne({
                userId: userId,
            });
            if (existlist) {
                const findIndex = existlist.item.findIndex((p) => p.prodId.toString() === prodId.toString());
                if (findIndex !== -1) {
                    return cb(new Error("product already in wishList"), null);
                }
                else {
                    existlist.item.push(item);
                    yield existlist.save();
                }
            }
            else {
                let wishList = new whishList_1.default({
                    userId: userId,
                    item: [item],
                });
                let exist = yield wishList.save();
                exist ? console.log(exist) : console.log("wishlist not created");
                return cb(null, "wishList created!!");
            }
        }
    }
    catch (error) {
        console.log(error);
        return cb(error, null);
    }
});
exports.creat_wish = creat_wish;
const achive_wish = (userId, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(userId);
        // let id = new Types.ObjectId(userId)
        const user_wish = yield whishList_1.default.aggregate([
            {
                $match: { userId: new mongoose_1.Types.ObjectId(userId) },
            },
            {
                $unwind: "$item",
            },
            {
                $project: {
                    items: "$item.prodId",
                    _id: 0,
                },
            },
            {
                $unwind: "$items",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items",
                    foreignField: "_id",
                    as: "wishList",
                },
            },
            {
                $project: {
                    wishList: { $arrayElemAt: ["$wishList", 0] }
                }
            },
            { $unwind: "$wishList" },
        ]);
        //console.log(user_wish);
        if (user_wish) {
            return cb(null, user_wish.map(item => item.wishList));
        }
    }
    catch (error) {
        return cb(error, null);
    }
});
exports.achive_wish = achive_wish;
