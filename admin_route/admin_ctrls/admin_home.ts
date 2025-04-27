import mongoose, { Types } from "mongoose";
import homeContendSchema from "../home_contend_schema/home_cont";
import { Request, Response } from "express";
interface MulterRequest extends Omit<Request, "body"> {
  file: Express.Multer.File;
  body: {
    description: string;
  };
}

export const home_cont = async (req: MulterRequest, res: Response) => {
  try {
    const newHome = new homeContendSchema({
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
