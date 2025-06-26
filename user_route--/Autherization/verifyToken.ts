import { Request, NextFunction, Response } from "express";
import { Types } from "mongoose";
const jwt = require("jsonwebtoken");
interface IUser {
  userId: Types.ObjectId;
  iat: number | string;
  exp: number | string;
}
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log("isAuth", req.isAuthenticated());
  console.log("headers", req.headers);
  console.log("cookie", req.cookies);
  const token = await req.headers["authorization"]; 
  try {
    if (req.isAuthenticated()) {
      console.log("working in Oauth");
      // console.log("isAuth", req.isAuthenticated());
      // console.log("headers", req.headers);
      // console.log("cookie", req.cookies);
      // console.log("reach isAuth()",req.isAuthenticated());
      res.setHeader("Content-Type", "application/json");

      return res.json({
        isAuthenticate: true,
      });
    } else if (!req.isAuthenticated()) {
      if (token) {
        jwt.verify(token, "my_secret_key", (err: Error, encode: IUser) => {
          console.log(encode.userId);
          if (err) {
            res.setHeader("Content-Type", "application/json");
            return res.json({
              isAuthenticate: false,
              message: err.name,
            });
          } else {
            res.setHeader("Content-Type", "application/json");
            return res.json({
              isAuthenticate: true,
              user: req.user,
            });
          }
        }); // verifyToken end
      }
    }
  } catch (error) {
    return error;
  }
};

export { verifyToken };
