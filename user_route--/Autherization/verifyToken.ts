import { Request, NextFunction, Response } from "express";
import { Types } from "mongoose";
const jwt = require("jsonwebtoken");
interface IUser {
  userId: Types.ObjectId;
  iat: number | string;
  exp: number | string;
}
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log("call reach here");
  console.log("isAuth", req.isAuthenticated());
  console.log("oauth2 user", req.user);
  // console.log("headers", req.headers);
  // console.log("cookie", req.cookies);

  let token = await req.headers["authorization"];
  try {
    if (req.isAuthenticated()) {
      console.log("working in Oauth");
      // console.log("isAuth", req.isAuthenticated());
      // console.log("headers", req.headers);
      // console.log("cookie", req.cookies);
      // console.log("reach isAuth()",req.isAuthenticated());
      const user: any = req.user;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        isAuthenticate: true,
        user_id: user._id,
      });
    } else if (token !== "null") {
      console.log("token", token);
      //if (token) {
      jwt.verify(token, "my_secret_key", (err: Error, encode: IUser) => {
        //console.log("token", encode.userId);

        if (err) {
          console.log(err, "get error");
          res.setHeader("Content-Type", "application/json");
          return res.json({
            isAuthenticate: false,
            message: err.name,
          });
        } else {
          console.log("success");
          res.setHeader("Content-Type", "application/json");
          return res.json({
            isAuthenticate: true,
            user_id: encode.userId,
          });
        }
      });
    } else {
      console.log("oauth and token empity");
      res.setHeader("Content-Type", "application/json");
      return res.json({
        isAuthenticate: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { verifyToken };
