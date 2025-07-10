import { Request, Response, NextFunction } from "express";

import homeContendSchema from "./home_cont";
import home_sub_content from "./sub_home_schema";
import { title } from "process";
interface Multerrequest extends Omit<Request, "body"> {
  file: Express.Multer.File;
  body: {
    homeContents: [object];
  };
}

interface custom_home_variable {
  home_data: [
    {
      home_name: string;
      home_image: string;
      home_id: string;
      sub_home_data: [
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        }
      ];
    },
    {
      home_name: string;
      home_image: string;
      home_id: string;
      sub_home_data: [
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        }
      ];
    },
    {
      home_name: string;
      home_image: string;
      home_id: string;
      sub_home_data: [
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        }
      ];
    },
    {
      home_name: string;
      home_image: string;
      home_id: string;
      sub_home_data: [
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        }
      ];
    },
    {
      home_name: string;
      home_image: string;
      home_id: string;
      sub_home_data: [
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        },
        {
          title: string;
          description: string;
          image: string;
          _id: string;
        }
      ];
    }
  ];
}

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
let custom_home_data: custom_home_variable = {
  home_data: [
    {
      home_name: "",
      home_image: "",
      home_id: "",
      sub_home_data: [
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
      ],
    },
    {
      home_name: "",
      home_image: "",
      home_id: "",
      sub_home_data: [
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
      ],
    },
    {
      home_name: "",
      home_image: "",
      home_id: "",
      sub_home_data: [
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
      ],
    },
    {
      home_name: "",
      home_image: "",
      home_id: "",
      sub_home_data: [
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
      ],
    },
    {
      home_name: "",
      home_image: "",
      home_id: "",
      sub_home_data: [
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
        {
          title: "",
          description: "",
          image: "",
          _id: "",
        },
      ],
    },
  ],
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

    const arr = Object.values(custom_data); // data _created for send to client-side display for admin session for update
    console.log("after update", arr2);
    arr2.map((data: any, x: number) => {
      // arr2 first /0th position data   itrate 5 time total
      //console.log(data.home_name, "---------------__------------------");
      // title *1*5
      // image *1*5
      // _id   *1*5
      if (data.image) {
        custom_home_data.home_data[x].home_image = "";
      } else {
        custom_home_data.home_data[x].home_image = data.home_img;
      }
      custom_home_data.home_data[x].home_name = data.home_name;
      custom_home_data.home_data[x].home_id = data._id;
      data.sub_home_data.map((data: any, i: any) => {
        //console.log("sub_data", data);
        //title  *4
        custom_home_data.home_data[x].sub_home_data[i].title = data.title;
        custom_home_data.home_data[x].sub_home_data[i].image = data.image;
        custom_home_data.home_data[x].sub_home_data[i].description =
          data.description;
        custom_home_data.home_data[x].sub_home_data[i]._id = data._id;
        //description *4
        //                                                                      [{{0},{1},{2},{3},{4},{5}},
        //                                                                      {{0},
        //                                                                      {1},{2},{3},
        //                                                                      {4},{5}},{{0},
        //                                                                      {1},{2},{3},{4},{5}},
        //                                                                      {{0},
        //                                                                      {1},{2},
        //                                                                      {3},{4},{5}},
        //                                                                      {{0},{1},{2},{3},{4},{5}}]
        //_id *4
      });
    });
    //[custom_home_data].map((data: any, x: any) => {
    custom_home_data.home_data.map((datas: any, i: number) => {
      console.log("data before setup ", datas);

      if (datas.home_image.trim() === "") {
        datas.home_image = home_images.main_img[i].filename; 
      }
      console.log("-----------------------------------");
      datas.sub_home_data.map((cont: any, i: number) => {
        if (
          typeof cont.image === "object" &&
          cont.image !== null &&
          Object.keys(cont.image).length === 0
        ) {
          cont.image = home_images.sub_img[i].filename;
        }
      });

      console.log("data after setup", datas);
    });
   
   
  } catch (error) {
    console.log(error);
  }
};

export { allhome_cont, sub_main_updates_home_cont };
