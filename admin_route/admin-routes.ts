import { newProd, updatePorod } from "./admin_ctrls/admin_controls";
import {
  deleteProduct,
  deletOneUser,
  getallProducts,
  getusers,
  update_status,
} from "./admin_ctrls/admin_crud";
import {
  delete_home_item,
  getHome_Cont,
  home_cont,
  update_home_content,
  update_home_item,
} from "./admin_ctrls/admin_home";
import { getStack, sub_home_content } from "./admin_ctrls/sub_home_cont";
import {
  allhome_cont,
  sub_main_updates_home_cont,
} from "./home_contend_schema/all_home_fetch";
//import { sub_home_content } from "./admin_ctrls/sub_home_cont";
import products from "./prodSchema/prod";
const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});
const uplaod = multer({ storage: storage });

// router.post('/',uplaod.single('image'),newProd);
router.get("/get_all_users", getusers);
router.delete("/delete_user/:id", deletOneUser);
router.get("/get_all_products", getallProducts);
router.delete("/delete_product/:id", deleteProduct);
router.post("/update_product", uplaod.single("image"), updatePorod);
router.put("/update_user_status/:id/", update_status);
router.post("/upload_home_cont", uplaod.single("image"), home_cont);
router.get("/get_home_cont", getHome_Cont);
router.get("/delete_home_cont/:id", delete_home_item);
router.get("/get_home_update/:id", update_home_item);
//router.get('/home_cont_data',_Home_content)
router.post(
  "/update_home_data",
  uplaod.single("home_Image"),
  update_home_content
);
router.post("/sub_multyImg", uplaod.array("prodImg", 4), sub_home_content);
router.get("/Get_stack", getStack);

// all home session management routes
router.get("/get_home&sub_home_cont", allhome_cont);
router.put(
  "/all_home_content_update",
  uplaod.fields([{ name: "main_img" }, { name: "sub_img" }]),
  sub_main_updates_home_cont
);
module.exports = router;
