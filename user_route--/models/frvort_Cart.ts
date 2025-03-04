import mongoose, { Schema, Types } from "mongoose";
interface cartItems {
  userId: any
  items: [
    {
      
      productId: Types.ObjectId;
      quantity: number;
    }
  ];
}
const frvort_Cart = new Schema<cartItems>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items:[
    {
      productId: {
        type: Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});
const cart_itesm = mongoose.model("cart_items",frvort_Cart);
export = cart_itesm;