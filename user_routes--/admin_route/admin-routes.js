"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controls_1 = require("./admin_ctrls/admin_controls");
const admin_crud_1 = require("./admin_ctrls/admin_crud");
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
//router.get('/get_ptod_data',get_data_to_update);
module.exports = router;
