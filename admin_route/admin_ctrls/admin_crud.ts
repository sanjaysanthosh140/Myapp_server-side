import { Response, Request } from "express";
import user_models from "../../user_route--/models/user_models";
import products from "../prodSchema/prod";
import wishList_model from "../../user_route--/models/whishList";

export const getusers = async (req: Request, res: Response) => {
  try {
    const users = await user_models.aggregate([
      {
        $match: {
          isAdmin:false,
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $project: {
          name: 1,
          email: 1,
          _id: 1,

        },
      },
      {
        $sort: {
          name: 1,
        },
      },
      { $limit: 50 },

      {
        $group: {
          _id: "$_id",
          userData: { $first: "$$ROOT" },
        },
      },
      {
        $unwind: "$userData",
      },
    ]);
    if (users) {
      console.log(users,"list")
      res.setHeader("Content-type", "application/json");
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletOneUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    await user_models.findByIdAndDelete(_id).then((data: any) => {
      console.log(data.name);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ message: "user deleted", name: data.name });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getallProducts = async (req: Request, res: Response) => {
  try {
    const product = await products.aggregate([
      {
        $unwind: "$_id",
      },
      {
        $project: {
          _id: 1,
          prodName: 1,
          prodPrice: 1,
          prodDescription: 1,
          prodImage: 1,
        },
      },
      {
        $sort: {
          prodPrice: 1,
        },
      },
      {
        $limit: 30,
      },
      {
        $group: {
          _id: "$_id",
          prodData: { $first: "$$ROOT" },
        },
      },
      {
        $unwind: "$prodData",
      },
    ]);
    if (product) {
      console.log(product);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct =async (req:Request,res:Response)=>{
    try {
        const _id = req.params.id;
        await products.findByIdAndDelete(_id).then((data:any)=>{
            res.setHeader("Content-Type","application/json")
            res.status(200).json({message:"product deleted",name:data.prodName})
        })
    } catch (error) {
        console.log(error)
    }
}

export const update_status = async(req:Request,res:Response) =>{
  try {
    let id = req.params.id;
    let {status} = req.body
    await user_models.updateOne({_id:id},{
      $set:{
        isDisabled:status
      }
    }).then((data:any)=>{
      console.log(data)
      res.setHeader("Content-Type","application/json")
      res.status(200).json({message:"status updated"})
    })
  } catch (error) {
    console.log(error)
  }
}












