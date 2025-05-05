import mongoose, { Types } from "mongoose";
import homeContendSchema from "../home_contend_schema/home_cont";
import { Request, Response } from "express";
interface MulterRequest extends Omit<Request, "body"> {
  file: Express.Multer.File;
  body: {
    route:string,
    description: string;
  };
}

export const home_cont = async (req: MulterRequest, res: Response) => {
  try {
    console.log("route",req.body)
    const newHome = new homeContendSchema({
      route:req.body.route,
      description: req.body.description,
      home_Image: req.file.filename,
    });
    await newHome.save().then((data) => {
      console.log("data", data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getHome_Cont = async (req: Request, res: Response) => {
  try {
    homeContendSchema.find().then((data) => {
      console.log(data);
      if (data) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const delete_home_item = (req: Request, res: Response) => {
  try {
    const id = req.params;
    console.log("id", id);
    let _id = new mongoose.Types.ObjectId(id.id);
    homeContendSchema.findByIdAndDelete({ _id: _id }).then((data) => {
      console.log(data);
      if (data) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "item deleted" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const update_home_item = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    const _id = new mongoose.Types.ObjectId(id.id);
    await homeContendSchema.findById({ _id: _id }).then((data) => {
      console.log("data", data);
      if (data) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json([data]);
      }
    });
    //console.log("id form our update function",id);
  } catch (error) {
    console.log(error);
  }
};

export const update_home_content = async (
  req: MulterRequest,
  res: Response
) => {
  try {
    const home_data: any = req.body;
    console.log("hoe_data", home_data);
    if (!req.file) {
      homeContendSchema
        .updateMany(
          {
            _id: new mongoose.Types.ObjectId(home_data.id),
          },
          {
            $set: {
              description: home_data.description,
              home_Image: home_data.home_Image,
            },
          }
        )
        .then((data) => {
          console.log(data);
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({ message: "contet updated successfully" });
        });
    } else {
      console.log("file here ", req.file);
      homeContendSchema.updateMany(
        {
          _id: new mongoose.Types.ObjectId(home_data.id),
        },
        {
          $set: {
            description: home_data.description,
            home_Image: req.file.filename,
          },
        }
      ).then((data)=>{
           console.log(data);
           res.setHeader("Content-Type", "application/json");
           res.status(200).json({message:"content updated successfully"})
      })
    }
  } catch (error) {
    console.log(error);
  }
};
