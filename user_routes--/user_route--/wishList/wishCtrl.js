"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishList = void 0;
const Wish_cb_1 = require("./Wish_cb");
const Cb_1 = __importDefault(require("./Cb"));
const jwt = require("jsonwebtoken");
// export const WishList = async (req: Request, res: Response) => {
//   try {
//     const token = req.headers.authorization;
//     const prodId: any = req.params.id;
//     if (req.isAuthenticated() || token) {
//       if (!req.isAuthenticated()) {
//         console.log("token", token);
//         jwt.verify(
//           token,
//           "my_secret_key",
//           async (err: Error, decodedToken: any) => {
//             !err
//               ? prodId && decodedToken.userId
//                 ? await creat_wish(prodId, decodedToken.userId, cb).then(
//                     (cb: any) => {
//                       console.log(cb);
//                       res.setHeader("Content-type", "application/json");
//                       res.json(cb);
//                     }
//                   )
//                 : console.log("prodID or decodetoken one is missing ")
//               : console.log("err", err);
//           }
//         );
//       } else {
//         console.log("user", req.user);
//         const userId: any = req.user;
//         userId && prodId
//           ? await creat_wish(prodId, userId._id, cb).then((cb: any) => {
//               console.log(cb);
//               res.setHeader("Content-Type", "application/json");
//               res.json(cb);
//             })
//           : console.log("userID or prodId one is  missing ", userId, prodId);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
const getWishList = (req, res) => {
    try {
        console.log("server1_responding", req.params.id);
        let userID = req.user;
        let ID = req.params.id;
        const token = req.headers.authorization;
        req.isAuthenticated() || ID
            ? !req.isAuthenticated()
                ? (0, Wish_cb_1.achive_wish)(ID, Cb_1.default).then((cb) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log(cb);
                    res.setHeader("Content-Type", "application/json");
                    res.json(cb);
                }))
                : (userID = // ---------_--------__--
                    req.user &&
                        (0, Wish_cb_1.achive_wish)(userID.id, Cb_1.default).then((cb) => {
                            console.log("cb", cb);
                            res.setHeader("Content-Type", "application/json");
                            res.json(cb);
                        }))
            : console.log("creat a account first");
    }
    catch (error) {
        console.log(error);
    }
};
exports.getWishList = getWishList;
// export const delete_Wish = async (req: Request, res: Response) => {
//   try {
//     const prodId = req.params.id;
//     const token = req.headers.authorization;
//     if (req.isAuthenticated() || token) {
//       if (!req.isAuthenticated()) {
//         jwt.verify(
//           token,
//           "my_secret_key",
//           async (err: any, decodedToken: any) => {
//             if (!err && decodedToken) {
//               const wishList = await wishList_model.findOne({
//                 userId: decodedToken.userId,
//               });
//               if (wishList) {
//                 let prodIndex = wishList.item.findIndex(
//                   (p: any) => p.prodId.toString() === prodId.toString()
//                 );
//                 if (prodIndex !== -1) {
//                   wishList.item.splice(prodIndex, 1);
//                   await wishList.save();
//                   res.setHeader("Content-Type", "application/json");
//                   res.json({ message: "product deleted from wishlist" });
//                 }
//               } else {
//                 res.setHeader("Content-Type", "application/json");
//                 res.json({ message: "product not found in wishlist" });
//               }
//               console.log(decodedToken);
//             } else {
//               console.log(err);
//             }
//           }
//         );
//       } else {
//         const userId: any = req.user;
//         console.log(userId._id);
//         const wishList = await wishList_model.findOne({ userId: userId._id });
//         if (wishList) {
//           let prodIndex = wishList.item.findIndex(
//             (p: any) => p.prodId.toString() === prodId.toString()
//           );
//           if (prodIndex !== -1) {
//             wishList.item.splice(prodIndex, 1);
//             await wishList.save();
//             res.setHeader("Content-Type", "application/json");
//             res.json({ message: "product deleted from wishlist" });
//           }
//         } else {
//           res.setHeader("Content-Type", "application/json");
//           res.json({ message: "product not found in wishlist" });
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
