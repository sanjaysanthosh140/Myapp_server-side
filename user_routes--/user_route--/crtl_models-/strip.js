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
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripcall = void 0;
require('dotenv').config();
const stripcall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Stripe = require("stripe");
    const stripe = new Stripe(process.env.Strip_Secret_Key);
    try {
        let clientside;
        let data = req.body;
        const amount = Number(data.amount);
        const { currency } = data;
        console.log(amount, currency);
        yield stripe.paymentIntents.create({
            amount: amount,
            currency: currency
        }).then((paymentIntent) => {
            console.log(paymentIntent.client_secret);
            clientside = paymentIntent.client_secret;
        });
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
            clientside: clientside
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.stripcall = stripcall;
