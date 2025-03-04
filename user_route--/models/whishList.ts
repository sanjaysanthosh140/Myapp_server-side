import mongoose, {  Schema, Types } from "mongoose";
interface wishSchema {
  userId: any;
  item: [
    {
      prodId: Types.ObjectId;
    }
  ];
}

const wishList = new Schema<wishSchema>({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
    unique: true,
  },
  item: [
    {
      prodId: {
        type: Types.ObjectId,
        require: true,
      },
    },
  ],
});

const wishList_model =  mongoose.model("WishList",wishList)
export = wishList_model;