//import { db } from "../models/user_models";

const mongoose = require("mongoose");
let url = process.env.db_storage;
let dbconnection:any;
export const mongo_Connection = async () => {
  try {
    await mongoose.connect(url).then((data: any) => {
      !data ? console.log("not connected") : console.log(" DB connected");
    //dbconnection = mongoose.connection;
    //console.log("db connection ", dbconnection);
    });
  } catch (error) {
    console.log(error);
  }
};

 