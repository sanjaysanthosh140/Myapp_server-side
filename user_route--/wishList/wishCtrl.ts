import { Request, Response } from "express";
import { achive_wish, creat_wish } from "./Wish_cb";
import cb from "./Cb";
import wishList_model from "../models/whishList";
import { Types } from "mongoose";
const jwt = require("jsonwebtoken");
export const WishList = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const prodId: any = req.params.id;
    if (req.isAuthenticated() || token) {
      if (!req.isAuthenticated()) {
        console.log("token", token);
        jwt.verify(
          token,
          "my_secret_key",
          async (err: Error, decodedToken: any) => {
            !err
              ? prodId && decodedToken.userId
                ? await creat_wish(prodId, decodedToken.userId, cb).then(
                    (cb: any) => {
                      console.log(cb);
                      res.setHeader("Content-type", "application/json");
                      res.json(cb);
                    }
                  )
                : console.log("prodID or decodetoken one is missing ")
              : console.log("err", err);
          }
        );
      } else {
        console.log("user", req.user);
        const userId: any = req.user;
        userId && prodId
          ? await creat_wish(prodId, userId._id, cb).then((cb: any) => {
              console.log(cb);
              res.setHeader("Content-Type", "application/json");
              res.json(cb);
            })
          : console.log("userID or prodId one is  missing ", userId, prodId);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWishList = (req: Request, res: Response) => {
  try {
    let userID: any = req.user;
    const token = req.headers.authorization;
    req.isAuthenticated() || token
      ? !req.isAuthenticated()
        ? jwt.verify(
            token,
            "my_secret_key",
            async (err: Error, decodedToken: any) => {
              !err && decodedToken
                ? achive_wish(decodedToken.userId, cb).then((cb) => {
                    console.log("cb", cb);
                    res.setHeader("Content-Type", "application/json");

                    res.json([cb]);
                  })
                : console.log(err);
            }
          )
        : (userID = // ---------_--------__--
            req.user &&
            achive_wish(userID.id, cb).then((cb) => {
              console.log("cb", cb);
              res.setHeader("Content-Type", "application/json");
              res.json([cb]);
            }))
      : console.log("not found");
  } catch (error) {
    console.log(error);
  }
};

export const delete_Wish = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const token = req.headers.authorization;
    if (req.isAuthenticated() || token) {
      if (!req.isAuthenticated()) {
        jwt.verify(
          token,
          "my_secret_key",
          async (err: any, decodedToken: any) => {
            if (!err && decodedToken) {
              const wishList = await wishList_model.findOne({
                userId: decodedToken.userId,
              });
              if (wishList) {
                let prodIndex = wishList.item.findIndex(
                  (p: any) => p.prodId.toString() === prodId.toString()
                );
                if (prodIndex !== -1) {
                  wishList.item.splice(prodIndex, 1);
                  await wishList.save();
                  res.setHeader("Content-Type", "application/json");
                  res.json({ message: "product deleted from wishlist" });
                }
              } else {
                res.setHeader("Content-Type", "application/json");
                res.json({ message: "product not found in wishlist" });
              }
              console.log(decodedToken);
            } else {
              console.log(err);
            }
          }
        );
      } else {
        const userId: any = req.user;
        console.log(userId._id);
        const wishList = await wishList_model.findOne({ userId: userId._id });
        if (wishList) {
          let prodIndex = wishList.item.findIndex(
            (p: any) => p.prodId.toString() === prodId.toString()
          );
          if (prodIndex !== -1) {
            wishList.item.splice(prodIndex, 1);
            await wishList.save();
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "product deleted from wishlist" });
          }
        } else {
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "product not found in wishlist" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
