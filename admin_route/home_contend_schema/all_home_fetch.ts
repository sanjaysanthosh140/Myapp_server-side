import { Request, Response, NextFunction } from "express";

import homeContendSchema from "./home_cont";
import home_sub_content from "./sub_home_schema";
interface Multerrequest extends Omit<Request, "body"> {
  file: Express.Multer.File;
  body: {
    homeContents: [object];
  };
}
interface customupdate_data {
  _id: String|any;
  home_name: String|any;
  home_img: String|any;
  sub_home_data :[
    {
      title: String|any;
      description: String|any;
      image: String|any;
      _id: String|any;
    }
  ];
}
let home_custom_data_updates: customupdate_data = {
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
let custom_data: any;
const allhome_cont = async (req: Request, res: Response) => {
  try {
    homeContendSchema
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
      .then((data: any) => {
        try {
          console.log(data);
          custom_data = data;
          if (data) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(data);
          }
        } catch (error) {
          console.log(error);
        }
      });

    /// progrssing
  } catch (error) {
    console.log(error);
  }
};

const sub_main_updates_home_cont = async (
  req: Multerrequest,
  res: Response
) => {
  try {
    const { homeContents }: any = req.body;
    const home_images: any = req.files;
    // if (home_images || homeContents) {
    // console.log(custom_data);
    const arr2 = JSON.parse(homeContents); // data form clent_after-updates  (arr2);
    //console.log("arr2",arr2);
    //console.log(arr2.length)
    // arr2.map((data:any)=>{
    // console.log(data)
    // })
    const arr = Object.values(custom_data); // data _created for send to client-side display for admin session for update
    const new_home_data = arr2.map((data: any, i: number) => {
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
  } catch (error) {
    console.log(error);
  }
};

export { allhome_cont, sub_main_updates_home_cont };
