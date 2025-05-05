"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controls_1 = require("./admin_ctrls/admin_controls");
const admin_crud_1 = require("./admin_ctrls/admin_crud");
const admin_home_1 = require("./admin_ctrls/admin_home");
const sub_home_cont_1 = require("./admin_ctrls/sub_home_cont");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
});
const uplaod = multer({ storage: storage });
router.post('/', uplaod.single('image'), admin_controls_1.newProd);
router.get('/get_all_users', admin_crud_1.getusers);
router.delete('/delete_user/:id', admin_crud_1.deletOneUser);
router.get("/get_all_products", admin_crud_1.getallProducts);
router.delete('/delete_product/:id', admin_crud_1.deleteProduct);
router.post("/update_product", uplaod.single('image'), admin_controls_1.updatePorod);
router.put("/update_user_status/:id/", admin_crud_1.update_status);
router.post('/upload_home_cont', uplaod.single('image'), admin_home_1.home_cont);
router.get('/get_home_cont', admin_home_1.getHome_Cont);
router.get('/delete_home_cont/:id', admin_home_1.delete_home_item);
router.get('/get_home_update/:id', admin_home_1.update_home_item);
//router.get('/home_cont_data',_Home_content)
router.post('/update_home_data', uplaod.single('home_Image'), admin_home_1.update_home_content);
router.post('/sub_multyImg', uplaod.array('prodImg', 4), sub_home_cont_1.sub_home_content);
router.get('/Get_stack', sub_home_cont_1.getStack);
module.exports = router;
