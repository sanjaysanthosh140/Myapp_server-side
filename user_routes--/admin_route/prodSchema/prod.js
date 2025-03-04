"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const prodSchema = new mongoose_1.default.Schema({
    prodName: {
        type: String,
        required: true,
    },
    prodPrice: {
        type: Number,
        required: true,
    },
    prodDescription: {
        type: String,
        required: true,
    },
    prodImage: {
        type: String,
        required: true,
    }
});
const products = mongoose_1.default.model("products", prodSchema);
exports.default = products;
