import { Request, Response, NextFunction } from "express";

import homeContendSchema from "./home_cont";
import home_sub_content from "./sub_home_schema";
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
    const arr2 = JSON.parse(homeContents); // data form clent_after-updates  (arr2);

    const arr = Object.values(custom_data); // data _created for send to client-side display for admin session for update
    console.log("update_form-client", arr2);
    arr2.map((data: any, x: number) => {   // main_home data-text
      // arr2 first /0th position data   itrate 5 time total
      // title *1*5
      // image *1*5
      // _id   *1*5
      if (data.image && data.imagePreview) {
        custom_home_data.home_data[x].home_image = " ";
      } else {
        custom_home_data.home_data[x].home_image = data.home_img;
      }

      custom_home_data.home_data[x].home_name = data.home_name;
      custom_home_data.home_data[x].home_id = data._id;
      console.log(data);

      data.sub_home_data.map((data: any, i: any) => {  // sub-home_data-text
        console.log("-------------------------------------------");
        custom_home_data.home_data[x].sub_home_data[i].title = data.title;
        custom_home_data.home_data[x].sub_home_data[i].image = data.image;
        custom_home_data.home_data[x].sub_home_data[i].description =
          data.description;
        custom_home_data.home_data[x].sub_home_data[i]._id = data._id;
        console.log(data);
      });
    });

    console.log(home_images);
    custom_home_data.home_data.map((datas: any, i: number) => {
                                                                  //condition for adding image in home_cont
      if (
        datas.home_image.trim() == ""
        //&& home_images.main_img &&
        // home_images.main_img[i]
      ) {
        //datas.home_image = home_images.main_img[i].filename;                        main_images adding
        datas.home_image = home_images.main_img[0].filename;
        if (home_images.main_img.length !== 1) {
          home_images.main_img.splice(0, 1);   // 🚨 Remove the used file!
        }
      }

      datas.sub_home_data.map((cont: any, i: number) => {                            // sub_images adding
        if (
          typeof cont.image === "object" &&
          cont.image !== null &&
          Object.keys(cont.image).length === 0
        ) {
          cont.image = home_images.sub_img[0].filename;
          if (home_images.sub_img.length !== 1) {
            home_images.sub_img.splice(0, 1);  // 🚨 Remove the used file!
          }
          //console.log("image condition true", cont.image);
        }
      });
    });

    /// update $queryes.........[${
    // }];
    for (const item of custom_home_data.home_data) {
      // _id ,home_name,home_image
      await homeContendSchema
        .updateOne(
          {
            _id: item.home_id,
          },
          {
            $set: {
              description: item.home_name,
              home_Image: item.home_image,
            },
          }
        )
        .then((data) => {
          console.log("main_home", data);
        });
    }

    let custom_item_sub = custom_home_data.home_data;
    for (const items of custom_item_sub) {
      items.sub_home_data.map((data: any, i: any) => {
        console.log("from sub", data._id, data.title);
        home_sub_content
          .updateMany(
            { "stacks._id": data._id }, // <-- This is the filter!
            {
              $set: {
                "stacks.$[elem].title": data.title,
                "stacks.$[elem].description": data.description,
                "stacks.$[elem].image": data.image,
              },
            },
            {
              arrayFilters: [{ "elem._id": data._id }],
            }
          )
          .then((data) => {
            console.log(data);
          });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { allhome_cont, sub_main_updates_home_cont };
