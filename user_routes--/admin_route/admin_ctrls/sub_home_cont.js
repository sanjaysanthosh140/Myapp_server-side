"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStack = exports.sub_home_content = void 0;
const sub_home_schema_1 = __importDefault(require("../home_contend_schema/sub_home_schema"));
const sub_home_content = (req, res) => {
    if (req.body && req.files) {
        const subHoe_body = req.body;
        console.log(req.files);
        console.log(req.body);
        const sub_home_conts = new sub_home_schema_1.default({
            stacks: [
                {
                    title: subHoe_body.prodTitle1,
                    description: subHoe_body.prodDesc1,
                    image: req.files[0].filename,
                },
                {
                    title: subHoe_body.prodTitle2,
                    description: subHoe_body.prodDesc2,
                    image: req.files[1].filename,
                },
                {
                    title: subHoe_body.prodTitle2,
                    description: subHoe_body.prodDesc2,
                    image: req.files[2].filename,
                },
                {
                    title: subHoe_body.prodTitle3,
                    description: subHoe_body.prodDesc3,
                    image: req.files[3].filename,
                },
            ],
        });
        sub_home_conts.save().then((data) => {
            console.log(data);
        });
    }
};
exports.sub_home_content = sub_home_content;
const getStack = (req, res) => {
    try {
        console.log(req.query.stack);
        const stackOne = req.query.stack;
        sub_home_schema_1.default.findOne({ "stacks.title": stackOne }).then((data) => {
            if (data) {
                console.log(data);
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(data);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getStack = getStack;
