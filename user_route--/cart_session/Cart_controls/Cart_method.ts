import mongoose, { Types } from "mongoose";
import cart_itesm from "../../models/frvort_Cart";
import products from "../../../admin_route/prodSchema/prod";

interface cartItems {
  userId: Types.ObjectId | String;
  items: [
    {
      productId: Types.ObjectId;
      quantity: Number;
    }
  ];
}

interface cartAction {
  userId: Types.ObjectId;
  prodId: mongoose.Types.ObjectId;
  action: string;
}
export const add_to_cart = async (id: any, items: any) => {
  try {
    console.log("add_to_cart", id, items);
    let cart = await cart_itesm.findOne({ userId: id });
    if (cart) {
      let itemIndex = cart.items.findIndex(
        (p) => p.productId == items[0].productId
      );
      if (itemIndex !== -1) {
        cart.items[itemIndex] = {
          productId: cart.items[itemIndex].productId,
          quantity: Number(cart.items[itemIndex].quantity) + 1,
        };
        cart.save();
        return {
          message:"cart quantity updated",
        }
      } else {
        cart.items.push(items[0]);
        cart.save();
        return {
          message:"new item added to your cart",
        }
      }
    } else if (!cart) {
      const newCart = new cart_itesm({
        userId: id,
        items: items,
      });
      newCart.save().then((data) => {
        console.log(data);
      });
      return {
        message:"congrats your cart is created",
      }
    }
  } catch (error) {
    return error;
  }
};

export const CartprodQtyaction = async (
  userId: any,
  prodId: any,
  action: string
) => {
  try {
    let cart = await cart_itesm.findOne({ userId: userId });
    let product = await products.findById(prodId);

    if (cart && product) {
      let cartIndex = await cart.items.findIndex(
        (p) => p.productId.toString() === prodId.toString()
      );

      if (cartIndex !== -1) {
        const basePrice = product.prodPrice / cart.items[cartIndex].quantity;

        if (action === "increment") {
          cart.items[cartIndex].quantity++;
          product.prodPrice = basePrice * cart.items[cartIndex].quantity;
        } else if (action === "decrement") {
          if (cart.items[cartIndex].quantity === 1) {
            cart.items.splice(cartIndex, 1);
            product.prodPrice = basePrice;
          } else {
            cart.items[cartIndex].quantity--;
            product.prodPrice = basePrice * cart.items[cartIndex].quantity;
          }
        }

        await product.save();
        await cart.save();

        return {
          cart,
          // updatedPrice: product.prodPrice,
          // quantity: cart.items[cartIndex]?.quantity || 0
        };
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
