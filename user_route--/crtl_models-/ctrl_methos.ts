import { Request, Response } from "express";
import { decode_user, user_data_hashing } from "../hash_mehod--/data_hashing";
import user_models from "../models/user_models";
import passport from "passport";
import { generateToken } from "../Autherization/jwt";
//import { counter_mail } from "../C_ounter_Mail/Main_function";

export const new_user = async (req: Request, res: Response) => {
  try {
    let exist =  await user_models.exists({email:req.body.email})
    if(exist){
      res.setHeader('Content-Type','application/json');
      res.status(400).json({message:'user already exist'})
    }else{
      console.log(req.body);
      user_data_hashing(req.body).then(async (data: any) => {
        console.log(data);
        const user_info = new user_models(data);
        let newUser = await user_info.save();
        const encodeToken = await generateToken(newUser._id);
        console.log(newUser);
        res.setHeader('Content-Type','application/json');
        res.status(200).json({ data: newUser.name,token:encodeToken});
        //counter_mail(req.body)
      }).catch((error)=>{
        console.log(error)
      })
      
    }

    //:console.log('nothing')
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
};

export const userz_log = (req: Request, res: Response) => {
  try {
   // console.log("req.body", req.body);

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "please provide email and password",
      });
    } else {
         user_models.findOne({email:req.body.email}).then((data)=>{
         data?.isDisabled ===true ? res.setHeader('Content-Type','application/json')&&
         res.status(400).json({message:'account disabled'}) :
           decode_user(req.body).then(async(data: any) => {
             //console.log("login", data);
        const encodeToken = await generateToken(data._id);
        res.setHeader('Content-Type','application/json');
        res.status(200).json({
          message: `welcome back ${data.name}`,
          login: true,
          token: encodeToken,
        });
        
      })
      .catch((error)=>{
        console.log(error)
        res.setHeader('Content-Type','application/json');
        res.status(400).json({
          message: error.message,
        })
      })

    })

    }
  } catch (error) {
    console.log(error);
  }
  
};

export const prodList = async() =>{
   console.log('for prod fetching')
}