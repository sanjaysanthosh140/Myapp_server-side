"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const generateToken = (userId) => {
    try {
        var token = jwt.sign({ userId }, "my_secret_key", { expiresIn: "24h" });
        console.log(token);
        return token;
    }
    catch (error) {
        console.log(error);
    }
};
exports.generateToken = generateToken;
