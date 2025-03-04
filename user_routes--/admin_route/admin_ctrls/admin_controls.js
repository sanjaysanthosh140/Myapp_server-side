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
exports.updatePorod = exports.newProd = void 0;
const prod_1 = __importDefault(require("../prodSchema/prod"));
const newProd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log("update", req.file);
    console.log(req.body.proName);
    const newproduct = new prod_1.default({
        prodName: req.body.proName,
        prodPrice: req.body.price,
        prodDescription: req.body.description,
        prodImage: req.file.path,
    });
    yield newproduct.save().then((data) => {
        console.log(data);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
    });
});
exports.newProd = newProd;
const updatePorod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedata = req.body;
    //console.log(req.file);
    if (!req.file) {
        yield prod_1.default
            .updateMany({
            _id: updatedata._id,
        }, {
            $set: {
                prodName: updatedata.prodName,
                prodPrice: updatedata.prodPrice,
                prodDescription: updatedata.prodDescription,
            },
        })
            .then((data) => {
            console.log(data);
            res.setHeader("Content-Type", "application/json");
            res.json(data);
        });
    }
    else {
        yield prod_1.default
            .updateMany({
            _id: updatedata._id,
        }, {
            $set: {
                prodName: updatedata.prodName,
                prodPrice: updatedata.prodPrice,
                prodDescription: updatedata.prodDescription,
                prodImage: req.file.path,
            },
        })
            .then((data) => {
            console.log(data);
            res.setHeader("Content-Type", "application/json");
            res.json(data);
        });
    }
});
exports.updatePorod = updatePorod;
