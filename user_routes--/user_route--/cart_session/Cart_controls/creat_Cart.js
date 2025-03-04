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
exports.creat_cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const frvort_Cart_1 = __importDefault(require("../../models/frvort_Cart"));
const creat_cart = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log("creat_cart", user_id);
        const cart = yield frvort_Cart_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.default.Types.ObjectId(user_id),
                },
            },
            {
                $unwind: "$items",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "prodCart",
                },
            },
            {
                $unwind: "$prodCart",
            },
            {
                $group: {
                    _id: "$_id",
                    items: {
                        $push: {
                            productId: "$items.productId",
                            quantity: "$items.quantity",
                            productName: "$prodCart.prodName",
                            productPrice: "$prodCart.prodPrice",
                            productImage: "$prodCart.prodImage"
                        }
                    }
                }
            },
            {
                $unwind: "$items"
            }
        ]);
        //  
        if (cart) {
            resolve(cart);
        }
    }));
});
exports.creat_cart = creat_cart;
