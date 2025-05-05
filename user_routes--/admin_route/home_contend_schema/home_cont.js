"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const homeSchema = new mongoose_1.default.Schema({
    route: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    home_Image: {
        type: String,
        required: true
    }
});
const homeContendSchema = mongoose_1.default.model("homeContend", homeSchema);
exports.default = homeContendSchema;
