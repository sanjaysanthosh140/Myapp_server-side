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
exports.update_status = exports.deleteProduct = exports.getallProducts = exports.deletOneUser = exports.getusers = void 0;
const user_models_1 = __importDefault(require("../../user_route--/models/user_models"));
const prod_1 = __importDefault(require("../prodSchema/prod"));
const getusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_models_1.default.aggregate([
            {
                $match: {
                    isAdmin: false,
                },
            },
            {
                $unwind: "$_id",
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    _id: 1,
                },
            },
            {
                $sort: {
                    name: 1,
                },
            },
            { $limit: 50 },
            {
                $group: {
                    _id: "$_id",
                    userData: { $first: "$$ROOT" },
                },
            },
            {
                $unwind: "$userData",
            },
        ]);
        if (users) {
            console.log(users, "list");
            res.setHeader("Content-type", "application/json");
            res.status(200).json(users);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getusers = getusers;
const deletOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        yield user_models_1.default.findByIdAndDelete(_id).then((data) => {
            console.log(data.name);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ message: "user deleted", name: data.name });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletOneUser = deletOneUser;
const getallProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prod_1.default.aggregate([
            {
                $unwind: "$_id",
            },
            {
                $project: {
                    _id: 1,
                    prodName: 1,
                    prodPrice: 1,
                    prodDescription: 1,
                    prodImage: 1,
                },
            },
            {
                $sort: {
                    prodPrice: 1,
                },
            },
            {
                $limit: 30,
            },
            {
                $group: {
                    _id: "$_id",
                    prodData: { $first: "$$ROOT" },
                },
            },
            {
                $unwind: "$prodData",
            },
        ]);
        if (product) {
            console.log(product);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(product);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getallProducts = getallProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        yield prod_1.default.findByIdAndDelete(_id).then((data) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ message: "product deleted", name: data.prodName });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
const update_status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        let { status } = req.body;
        yield user_models_1.default.updateOne({ _id: id }, {
            $set: {
                isDisabled: status
            }
        }).then((data) => {
            console.log(data);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ message: "status updated" });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.update_status = update_status;
