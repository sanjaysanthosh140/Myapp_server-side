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
exports.sub_main_updates_home_cont = exports.allhome_cont = void 0;
const home_cont_1 = __importDefault(require("./home_cont"));
let home_custom_data_updates = {
    _id: "",
    home_name: "",
    home_img: "",
    sub_home_data: [
        {
            title: "",
            description: "",
            image: "",
            _id: "",
        },
    ],
};
let custom_data;
const allhome_cont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        home_cont_1.default
            .aggregate([
            {
                $unwind: "$_id",
            },
            {
                $project: {
                    home_name: "$description",
                    home_img: "$home_Image",
                    objects: "$description",
                },
            },
            {
                $lookup: {
                    from: "sub_home_contents",
                    localField: "objects",
                    foreignField: "stacks.title",
                    as: "newDatas",
                },
            },
            {
                $project: {
                    home_name: 1,
                    home_img: 1,
                    sub_home_data: { $arrayElemAt: ["$newDatas.stacks", 0] },
                },
            },
            {
                $unwind: "$_id",
            },
        ])
            .then((data) => {
            try {
                console.log(data);
                custom_data = data;
                if (data) {
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).json(data);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        /// progrssing
    }
    catch (error) {
        console.log(error);
    }
});
exports.allhome_cont = allhome_cont;
const sub_main_updates_home_cont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { homeContents } = req.body;
        const home_images = req.files;
        // if (home_images || homeContents) {
        // console.log(custom_data);
        const arr2 = JSON.parse(homeContents); // data form clent_after-updates  (arr2);
        //console.log("arr2",arr2);
        //console.log(arr2.length)
        // arr2.map((data:any)=>{
        // console.log(data)
        // })
        const arr = Object.values(custom_data); // data _created for send to client-side display for admin session for update
        const new_home_data = arr2.map((data, i) => {
            //__________-------------------------------------------------##############################
            // data represent inside the content of arr __-->  send to cient
            // home_custom_data_updates._id = data._id;
            // home_custom_data_updates.home_name = data.home_name;
            // home_custom_data_updates.home_img = data.home_img;
            // home_custom_data_updates.sub_home_data[i].title =
            // data.sub_home_data.title;
            // home_custom_data_updates.sub_home_data[i].description =
            // data.sub_home_data.description;
            // home_custom_data_updates.sub_home_data[i].image =
            // data.sub_home_data.image;
            // home_custom_data_updates.sub_home_data[i]._id = data.sub_home_data._id;
            //--------------------------------------------------###################################
            // console.log("send to admin",data);
        });
        // console.log("main_img",home_images.main_img[0]);
        // console.log("sub_img",home_images.sub_img[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sub_main_updates_home_cont = sub_main_updates_home_cont;
