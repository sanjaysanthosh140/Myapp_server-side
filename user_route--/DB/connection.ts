const mongoose = require("mongoose");
let url =
  "mongodb+srv://sanjaykrishna038:mO1fxSmpmRsMFxbC@cluster0.aztv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const mongo_Connection = async () => {
  try {
    mongoose.connect(url).then((data: any) => {
      !data ? console.log("not connected") : console.log(" DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};
