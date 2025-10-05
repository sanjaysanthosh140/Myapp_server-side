import { Request, Response } from "express";
import { new_user, prodList, userz_log } from "./crtl_models-/ctrl_methos";
import { verifyToken } from "./Autherization/verifyToken";
import products from "../admin_route/prodSchema/prod";
//import { getPoducts } from "./dataBaseControls/DBQuerys";
import { new_Cart } from "./cart_session/cart_control";
//import { stripcall } from "./crtl_models-/strip";
import { getWishList} from "./wishList/wishCtrl";
//import { frv_Cart } from "./cart_session/cart_control";
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const express = require("express");
const router = express.Router();
router.route("/").post(new_user);

router.route("/login").post(userz_log);

router
  .route("/oauth/google")
  .get(
    passport.authenticate("google", {
      scope:["profile", "email"],
      prompt: "consent",
    }),
  );

router.route("/oauth2/redirect/google").get(
  passport.authenticate("google", {
    successRedirect:"http://localhost:5173",
    failureRedirect:"http://localhost:5173/signup",
    session: true,
    failureMessage: true,
  })
);

router
  .route("/github/oauth")
  .get(
    passport.authenticate("github", { //
      scope: [
        "user:email",
        "read:user",
        "user:profile",
        "repo",
        "notifications",
        "gist",
      ],
      allow_signup: true,
      prompt: "consent",
      access_type: "online",
    })
  );

router.route("/oauth3/github/callback").get(
  passport.authenticate("github",{
    successRedirect:"http://localhost:5173",
    session: true,
    failureRedirect:"http://localhost:5173/signup",
    failureMessage: true,
  })
); 


// router.get("/products", async (req: Request, res: Response) => {
  // const product = await getPoducts();
  // console.log(product);
  // res.contentType("application/json");
  // res.status(200).json([product]);
// });

router.get("/checkauth",verifyToken);

router.post('/newCart',new_Cart);

//router.get('/Frv_carts',frv_cart);

//router.put('/decrement',QuantityIncrement);

//router.post('/payment',stripcall);

//router.get('/wishList/:id',WishList);
router.get('/retrive_wish/:id',getWishList);
//router.delete("/delete_wish/:id",delete_Wish);

module.exports = router;
