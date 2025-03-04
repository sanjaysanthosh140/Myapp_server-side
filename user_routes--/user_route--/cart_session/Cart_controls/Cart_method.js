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
exports.CartprodQtyaction = exports.add_to_cart = void 0;
const frvort_Cart_1 = __importDefault(require("../../models/frvort_Cart"));
const prod_1 = __importDefault(require("../../../admin_route/prodSchema/prod"));
const add_to_cart = (id, items) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("add_to_cart", id, items);
        let cart = yield frvort_Cart_1.default.findOne({ userId: id });
        if (cart) {
            let itemIndex = cart.items.findIndex((p) => p.productId == items[0].productId);
            if (itemIndex !== -1) {
                cart.items[itemIndex] = {
                    productId: cart.items[itemIndex].productId,
                    quantity: Number(cart.items[itemIndex].quantity) + 1,
                };
                cart.save();
                return {
                    message: "cart quantity updated",
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
const CartprodQtyaction = (userId, prodId, action) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield frvort_Cart_1.default.findOne({ userId: userId });
        let product = yield prod_1.default.findById(prodId);
        if (cart && product) {
            let cartIndex = yield cart.items.findIndex((p) => p.productId.toString() === prodId.toString());
            if (cartIndex !== -1) {
                const basePrice = product.prodPrice / cart.items[cartIndex].quantity;
                if (action === "increment") {
                    cart.items[cartIndex].quantity++;
                    product.prodPrice = basePrice * cart.items[cartIndex].quantity;
                }
                else if (action === "decrement") {
                    if (cart.items[cartIndex].quantity === 1) {
                        cart.items.splice(cartIndex, 1);
                        product.prodPrice = basePrice;
                    }
                    else {
                        cart.items[cartIndex].quantity--;
                        product.prodPrice = basePrice * cart.items[cartIndex].quantity;
                    }
                }
                yield product.save();
                yield cart.save();
                return {
                    cart,
                    // updatedPrice: product.prodPrice,
                    // quantity: cart.items[cartIndex]?.quantity || 0
                };
            }
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.CartprodQtyaction = CartprodQtyaction;
