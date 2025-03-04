import mongoose from "mongoose";

interface product {
  prodName: string;
  prodPrice: number|any;
  prodDescription: string;
  prodImage: string;
}

const prodSchema = new mongoose.Schema<product>({
  prodName: {
    type: String,
    required: true,
  },
  prodPrice: {
    type: Number,
    required: true,
  },
  prodDescription: {
    type: String,
    required: true,
  },
  prodImage: {
    type: String,
    required: true,
  }
});

const products = mongoose.model<product>("products",prodSchema);
export default products;