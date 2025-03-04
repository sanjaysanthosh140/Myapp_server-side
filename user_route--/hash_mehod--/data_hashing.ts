import { Hash } from "crypto";
import user_models from "../models/user_models";
import {Request,response,Response} from "express"
import crypto from "crypto";
export const user_data_hashing = async (data: any) => {
  return new Promise(
    async (resolve: (value: Hash) => void, reject: (reason: Error) => void) => {
      var salt = crypto.randomBytes(16);
      console.log("salt--", salt);
      try {
        crypto.pbkdf2(
          data.password,
          salt,
          310000,
          32,
          "sha256",
          (err: any, hashedPasswod: any) => {
            if (!err) {
              console.log("salt--", salt);
              data.password = hashedPasswod.toString("base64");
              data.salt = salt.toString("base64");
              resolve(data);
            } else {
              new Error("error in hashing password");
            }
          }
        );
        //methds for hash passwords
      } catch (error) {
        throw error;
      }
    }
  );
};

export const decode_user =(data: any) => {
  return new Promise(async(resolve:(value:any)=>void,reject:(value:Error)=>void)=>{
  
  const users = await user_models.find({ email: data.email });
  if(users.length !== 0){
  if (users[0].password && users[0].salt) {
    const Bsalt = Buffer.from(users[0].salt, "base64");
    console.log("-----------------|------------|------------__--------|-");
    console.log("bsalt", Bsalt);

    crypto.pbkdf2(
      data.password,
      Bsalt,
      310000,
      32,
      "sha256",
      (err: any, hashedPasswod: any) => {
        if (!err) {
          console.log("hashedPassword", hashedPasswod);
          let buffPssDb = Buffer.from(users[0].password, "base64");
          console.log("buffPssDb", buffPssDb);
          let match = crypto.timingSafeEqual(hashedPasswod, buffPssDb);
          if (match) {
            console.log("password  match");
            resolve(users[0])
            
          } else {
            console.log("password not match");  
            reject(new Error("password not match"));
          }
        } else {
          console.log(err);
        }
      }
    );
  }
}else if(users.length === 0){
    reject(new Error("user not found"))
  }
})
};
