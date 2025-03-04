import mongoose, { Mongoose, Types } from "mongoose";
import cart_itesm from "../../models/frvort_Cart";

export const creat_cart = async (user_id: Types.ObjectId) => {
  return new Promise(async (resolve: any, reject: any) => {
    //console.log("creat_cart", user_id);
    const cart = await cart_itesm.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user_id),
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "prodCart",
        },
      },
      {
        $unwind: "$prodCart",
      },
      {
        $group:{
          _id:"$_id",
          items:{
            $push:{
              productId:"$items.productId",
              quantity:"$items.quantity",
              productName:"$prodCart.prodName",
              productPrice:"$prodCart.prodPrice",
              productImage:"$prodCart.prodImage"
            }
          }
        }
      },
      {
        $unwind:"$items"
      }
    ]);
  //  
    if(cart){
      resolve(cart);
    }

  });
};
