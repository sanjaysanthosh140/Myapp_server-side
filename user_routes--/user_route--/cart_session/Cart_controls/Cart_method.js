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
exports.add_to_cart = void 0;
const frvort_Cart_1 = __importDefault(require("../../models/frvort_Cart"));
// interface cartItems {
// userId: Types.ObjectId | String;
// items: [
// {
// productId: Types.ObjectId;
// quantity: Number;
// }
// ];
// }
// interface cartAction {
// userId: Types.ObjectId;
// prodId: mongoose.Types.ObjectId;
// action: string;
// }
const add_to_cart = (id, items) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("add_to_cart", id, items);
        let cart = yield frvort_Cart_1.default.findOne({ userId: id });
        if (cart) {
            let itemIndex = cart.items.findIndex((p) => p.toolId === items[0].toolId);
            if (itemIndex !== -1) {
                return {
                    message: "it is already added",
                };
            }
            else {
                cart.items.push(items[0]);
                cart.save();
                return {
                    message: "new item added to your cart",
                };
            }
        }
        else if (!cart) {
            const newCart = new frvort_Cart_1.default({
                userId: id,
                items: items,
            });
            newCart.save().then((data) => {
                console.log(data);
            });
            return {
                message: "congrats your cart is created",
            };
        }
    }
    catch (error) {
        return error;
    }
});
exports.add_to_cart = add_to_cart;
// export const CartprodQtyaction = async (
// userId: any,
// prodId: any,
// action: string
// ) => {
// try {
// let cart = await cart_itesm.findOne({ userId: userId });
// let product = await products.findById(prodId);
// if (cart && product) {
// let cartIndex = await cart.items.findIndex(
// (p) => p.productId.toString() === prodId.toString()
// );
// if (cartIndex !== -1) {
//const basePrice = product.prodPrice / cart.items[cartIndex].quantity;
// if (action === "increment") {
// cart.items[cartIndex].quantity++;
// product.prodPrice = basePrice * cart.items[cartIndex].quantity;
// } else if (action === "decrement") {
// if (cart.items[cartIndex].quantity === 1) {
// cart.items.splice(cartIndex, 1);
// product.prodPrice = basePrice;
// } else {
// cart.items[cartIndex].quantity--;
// product.prodPrice = basePrice * cart.items[cartIndex].quantity;
// }
// }
// await product.save();
// await cart.save();
// return {
// cart,
// updatedPrice: product.prodPrice,
// quantity: cart.items[cartIndex]?.quantity || 0
// };
//}
//}
// } catch (error) {
// console.log(error);
// throw error;
// }
//};
