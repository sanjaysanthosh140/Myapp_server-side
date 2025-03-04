import { newProd, updatePorod } from "./admin_ctrls/admin_controls";
import {deleteProduct, deletOneUser, getallProducts, getusers, update_status } from "./admin_ctrls/admin_crud";
import products from "./prodSchema/prod";
const express = require('express');
const router = express.Router();


const  multer = require('multer');
const storage =  multer.diskStorage({
    destination: (req:any,file:any,cb:any)=>{
        cb(null,'uploads/');
    },
    filename:(req:any,file:any,cb:any)=>{
        const uniqueSuffix = Date.now() + '-' +  Math.round(Math.random()*1e9);
        cb(null,file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
})
const uplaod = multer({storage:storage})

router.post('/',uplaod.single('image'),newProd);
router.get('/get_all_users',getusers);
router.delete('/delete_user/:id',deletOneUser);
router.get("/get_all_products",getallProducts);
router.delete('/delete_product/:id',deleteProduct);
router.post("/update_product",uplaod.single('image'),updatePorod)
router.put("/update_user_status/:id/",update_status)

//router.get('/get_ptod_data',get_data_to_update);
module.exports = router;