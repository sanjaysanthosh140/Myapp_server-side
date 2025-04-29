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
exports.update_home_content = exports.update_home_item = exports.delete_home_item = exports.getHome_Cont = exports.home_cont = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const home_cont_1 = __importDefault(require("../home_contend_schema/home_cont"));
const home_cont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHome = new home_cont_1.default({
            description: req.body.description,
            home_Image: req.file.filename,
        });
        yield newHome.save().then((data) => {
            console.log("data", data);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.home_cont = home_cont;
const getHome_Cont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        home_cont_1.default.find().then((data) => {
            console.log(data);
            if (data) {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(data);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getHome_Cont = getHome_Cont;
const delete_home_item = (req, res) => {
    try {
        const id = req.params;
        console.log("id", id);
        let _id = new mongoose_1.default.Types.ObjectId(id.id);
        home_cont_1.default.findByIdAndDelete({ _id: _id }).then((data) => {
            console.log(data);
            if (data) {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "item deleted" });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.delete_home_item = delete_home_item;
const update_home_item = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params;
        const _id = new mongoose_1.default.Types.ObjectId(id.id);
        yield home_cont_1.default.findById({ _id: _id }).then((data) => {
            console.log("data", data);
            if (data) {
                res.setHeader("Content-Type", "application/json");
                res.status(200).json([data]);
            }
        });
        //console.log("id form our update function",id);
    }
    catch (error) {
        console.log(error);
    }
});
exports.update_home_item = update_home_item;
const update_home_content = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const home_data = req.body;
        console.log("hoe_data", home_data);
        if (!req.file) {
            home_cont_1.default
                .updateMany({
                _id: new mongoose_1.default.Types.ObjectId(home_data.id),
            }, {
                $set: {
                    description: home_data.description,
                    home_Image: home_data.home_Image,
                },
            })
                .then((data) => {
                console.log(data);
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "contet updated successfully" });
            });
        }
        else {
            console.log("file here ", req.file);
            home_cont_1.default.updateMany({
                _id: new mongoose_1.default.Types.ObjectId(home_data.id),
            }, {
                $set: {
                    description: home_data.description,
                    home_Image: req.file.filename,
                },
            }).then((data) => {
                console.log(data);
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({ message: "content updated successfully" });
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.update_home_content = update_home_content;
