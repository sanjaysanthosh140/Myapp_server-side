import { Types } from "mongoose";
import wishList_model from "../models/whishList";
import cart_itesm from "../models/frvort_Cart";
// export const creat_wish = async (
//   prodId: Types.ObjectId,
//   userId: Types.ObjectId,
//   cb: any
// ) => {
//   try {
//     const item = {
//       prodId: prodId,
//     };
//     if (!prodId || !userId) {
//       return cb(new Error("prodId or userId is missing"), null);
//     } else {
//       const existlist = await wishList_model.findOne({
//         userId: userId,
//       });
//       if (existlist) {
//         const findIndex = existlist.item.findIndex(
//           (p) => p.prodId.toString() === prodId.toString()
//         );
//         if (findIndex !== -1) {
//           return cb(new Error("product already in wishList"), null);
//         } else {
//           existlist.item.push(item);
//           await existlist.save();
//         }
//       } else {
//         let wishList = new wishList_model({
//           userId: userId,
//           item: [item],
//         });
//         let exist = await wishList.save();
//         exist ? console.log(exist) : console.log("wishlist not created");

//         return cb(null, "wishList created!!");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return cb(error, null);
//   }
// };

export const achive_wish = async (userId: any, cb: Function) => {
  try {
    console.log("fun achive", userId);
    // let id = new Types.ObjectId(userId)
    const user_wish = await cart_itesm.aggregate([
      {
        $match: { userId: new Types.ObjectId(userId) },
      },
      {
        $unwind: "$items",
      },
      {
        $project: {
          category: "$items.category",
          toolId: "$items.toolId",
          toolName: "$items.toolName",
          _id:0
        },
      },
      {
      $unwind: "$category",
      },
    ]);
    console.log(user_wish);
    if (user_wish) {
    return cb(
    null,
    user_wish.map((item) => item)
    );
    }
  } catch (error) {
    return cb(error, null);
  }
};
