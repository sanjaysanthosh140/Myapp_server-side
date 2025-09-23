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
exports.achive_wish = void 0;
const mongoose_1 = require("mongoose");
const frvort_Cart_1 = __importDefault(require("../models/frvort_Cart"));
// export const creat_wish = async (
//   prodId: Types.ObjectId,
//   userId: Types.ObjectId,
//   cb: any
// ) => {
//   try {
//     const item = {
//       prodId: prodId,
//     };
//     if (!prodId || !userId) {
//       return cb(new Error("prodId or userId is missing"), null);
//     } else {
//       const existlist = await wishList_model.findOne({
//         userId: userId,
//       });
//       if (existlist) {
//         const findIndex = existlist.item.findIndex(
//           (p) => p.prodId.toString() === prodId.toString()
//         );
//         if (findIndex !== -1) {
//           return cb(new Error("product already in wishList"), null);
//         } else {
//           existlist.item.push(item);
//           await existlist.save();
//         }
//       } else {
//         let wishList = new wishList_model({
//           userId: userId,
//           item: [item],
//         });
//         let exist = await wishList.save();
//         exist ? console.log(exist) : console.log("wishlist not created");
//         return cb(null, "wishList created!!");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return cb(error, null);
//   }
// };
const achive_wish = (userId, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("fun achive", userId);
        // let id = new Types.ObjectId(userId)
        const user_wish = yield frvort_Cart_1.default.aggregate([
            {
                $match: { userId: new mongoose_1.Types.ObjectId(userId) },
            },
            {
                $unwind: "$items",
            },
            {
                $project: {
                    category: "$items.category",
                    toolId: "$items.toolId",
                    toolName: "$items.toolName",
                    _id: 0
                },
            },
            {
                $unwind: "$category",
            },
        ]);
        console.log(user_wish);
        if (user_wish) {
            return cb(null, user_wish.map((item) => item));
        }
    }
    catch (error) {
        return cb(error, null);
    }
});
exports.achive_wish = achive_wish;
