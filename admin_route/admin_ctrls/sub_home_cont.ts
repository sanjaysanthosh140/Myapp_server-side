import { Request, Response } from "express";
import home_sub_content from "../home_contend_schema/sub_home_schema";

interface multerreq extends Omit<Request, "body"> {
  files: Express.Multer.File[];
  body: {
    sub_cont_title: string;
    sub_cont_description: string;
  };
}

export const sub_home_content = (req: multerreq, res: Response) => {
  if (req.body && req.files) {
    const subHoe_body: any = req.body;
    console.log(req.files);
    console.log(req.body);
    const sub_home_conts = new home_sub_content({
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

    sub_home_conts.save().then((data: any) => {
      console.log(data);
    });
  }
};

export const getStack = (req: Request, res: Response) => {
  try {
    console.log("___------", req.query.stack);
    const stackOne = req.query.stack;

    home_sub_content.findOne({ "stacks.title": stackOne }).then((data: any) => {
      if (data) {
        console.log(data);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
