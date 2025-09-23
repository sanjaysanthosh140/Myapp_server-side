import mongoose, { Schema, Types } from "mongoose";
interface cartItems {
  userId: mongoose.Schema.Types.ObjectId;
  items: [
    {
      category: string;
      toolName:string;
      toolId: Number;

    }
  ];
}
const frvort_Cart = new Schema<cartItems>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      category: {
        type: String,
        require: true,
      },
      toolName:{
       type:String,
       require:true
      },
      toolId: {
        type: Number,
        required: true,
      },
    },
  ],
});
const cart_itesm = mongoose.model("cart_items", frvort_Cart);
export = cart_itesm;
