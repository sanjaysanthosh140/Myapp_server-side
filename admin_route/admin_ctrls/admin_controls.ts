import products from "../prodSchema/prod";
import { Request, Response } from "express";
interface MulterRequest extends Omit<Request, "body"> {
  file: Express.Multer.File;
  body: {
    proName: string;
    price: number;
    description: string;
  };
}

export const newProd = async (req: MulterRequest, res: Response) => {
  console.log(req.body);
  console.log("update", req.file);
  console.log(req.body.proName);

  const newproduct = new products({
    prodName: req.body.proName,
    prodPrice: req.body.price,
    prodDescription: req.body.description,
    prodImage: req.file.path,
  });

  await newproduct.save().then((data) => {
    console.log(data);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  });
};

export const updatePorod = async (req: MulterRequest, res: Response) => {
  const updatedata: any = req.body;
  //console.log(req.file);
  if (!req.file) {
    await products
      .updateMany(
        {
          _id: updatedata._id,
        },
        {
          $set: {
            prodName: updatedata.prodName,
            prodPrice: updatedata.prodPrice,
            prodDescription: updatedata.prodDescription,
          },
        }
      )
      .then((data) => {
        console.log(data);
        res.setHeader("Content-Type","application/json")
        res.json(data)
      });
  } else {
    await products
      .updateMany(
        {
          _id: updatedata._id,
        },
        {
          $set: {
            prodName: updatedata.prodName,
            prodPrice: updatedata.prodPrice,
            prodDescription: updatedata.prodDescription,
            prodImage: req.file.path,
          },
        }
      )
      .then((data) => {
        console.log(data);
        res.setHeader("Content-Type","application/json")
        res.json(data)
      });
  }
};
