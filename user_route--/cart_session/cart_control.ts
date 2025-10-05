import { Request, Response } from "express";
import cart_itesm from "../models/frvort_Cart";
import mongoose, { Types } from "mongoose";
import user_models from "../models/user_models";
import { add_to_cart } from "./Cart_controls/Cart_method";
//import { creat_cart } from "./Cart_controls/creat_Cart";
const jwt = require("jsonwebtoken");
interface tokenDecode {
  userId: Types.ObjectId;
  iat: Number;
  exp: Number;
}
export const new_Cart = async (req: Request, res: Response) => {
  // fuction start
  console.log(req.body);
  console.log("=== NEW CART REQUEST DEBUG ===");
  console.log("Cookies received:", req.headers.cookie || "NO COOKIES");
  console.log("Authorization header:", req.headers.authorization || "NO TOKEN");
  console.log("Session ID:", req.sessionID);
  console.log("User authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  console.log("Request body:", req.body);
  console.log("=== END DEBUG ===");
  //const prod_id: any = req.params.id;
  const items = [
    {
      category: req.body.toolCategory,
      toolName: req.body.toolName,
      toolId: req.body.toolId,
    },
  ];

  const token = req.headers.authorization; // extrqct token from req
  const cookie = req.headers;
  if (cookie) {
    console.log(cookie);
  }
  if (req.isAuthenticated() || token) {
    // check req is authorizer by token or Oauth2

    const user: any = req.user;
    console.log("callCaetFun", user);
    if (req.isAuthenticated() && req.body.toolCategory) {
      console.log("checking authentication in saving tools");
      // become true it goes to procegure
      let response: any = await add_to_cart(user._id, items); //
      console.log(response);
      res.setHeader("Content-type", "application/json");
      res.status(200).json(response.message);
    } else if (token && req.body.toolCategory) {
      // else token it also do procegure with token
      jwt.verify(
        token,
        "my_secret_key",
        async (err: Error, tokenDecode: tokenDecode) => {
          if (!err) {
            //console.log(tokenDecode);
            const userIsValid = await user_models.exists({
              _id: tokenDecode.userId,
            });
            if (userIsValid) {
              let response: any = await add_to_cart(userIsValid, items); //
              console.log(response);
              res.setHeader("Content-type", "application/json");
              res.status(200).json(response.message);
            } else {
              console.log("user not found ---yet");
            }
          } else {
            console.log(err);
            console.log(token);
          }
        }
      );
    }
  } else {
    console.log("both are missing , savetools");
  }
};

// export const frv_cart = async (req: Request, res: Response) => {
//   try {
//     let token = req.headers.authorization;
//     if (req.isAuthenticated() || token) {
//       if (!req.isAuthenticated()) {
//         token?.length !== 0
//           ? jwt.verify(
//               token,
//               "my_secret_key",
//               async (err: Error, decodedToken: tokenDecode) => {
//                 if (!err) {
//                   let id = decodedToken.userId;
//                   // console.log("id", id);
//                   creat_cart(id).then((data: any) => {
//                     //console.log("jwt", data);
//                     if (data) {
//                       res.setHeader("Content-Type", "application/json");
//                       res.status(200).json(data);
//                     }
//                   });
//                 } else {
//                   console.log(err);
//                 }
//               }
//             )
//           : console.log("no token");
//       } else {
//         //console.log("userFrv", req.user);
//         let user: any = req.user;
//         creat_cart(user._id).then((data: any) => {
//           //console.log("isAuth", data);
//           if (data) {
//             res.setHeader("Content-Type", "application/json");
//             res.status(200).json(data);
//           }
//         });
//       }
//     } else {
//       console.log("no users");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const QuantityIncrement = async (req: Request, res: Response) => {
//   let token = req.headers.authorization;
//   if (req.isAuthenticated() || token) {
//     let { proId, action } = req.body;
//     console.log(proId, action);
//     if (!req.isAuthenticated()) {
//       jwt.verify(
//         token,
//         "my_secret_key",
//         async (err: Error, decodedToken: tokenDecode) => {
//           let response;
//           let userID: any = decodedToken.userId;
//           !err && decodedToken
// ? (response = await CartprodQtyaction(userID, proId, action))
// : console.log("jwtError", err);
// response = await CartprodQtyaction(userID,proId,action)
// if (response) {
// res.setHeader("Content-Type", "application/json");
// res.status(200).json(response);
// }
//     }
//   );
// } else {
//   let user: any = req.user;
//   console.log("userId", user._id);
//   // let response = await CartprodQtyaction(user._id, proId, action);
// if (response) {
// res.setHeader("Content-Type", "application/json");
// res.status(200).json(response);
// }
//     }
//   }
// };
