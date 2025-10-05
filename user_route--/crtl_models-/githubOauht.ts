import { profile } from "console";

import oauth_user from "../models/google_Oauth";
import { Types } from "mongoose";
import { user_data_hashing } from "../hash_mehod--/data_hashing";
import { counter_mail } from "../C_ounter_Mail/Main_function";
//import oauthUsers from "../models/google_Oauth";

const passport = require('passport');
const GithubStatergies = require('passport-github2');
require('dotenv').config();

passport.use(new GithubStatergies({
    clientID:process.env.Git_ClientID,             
    clientSecret:process.env.Git_Client_secrets,
    callbackURL:"https://myapp-server-side-rfxp.onrender.com/user_side/oauth3/github/callback"
},
async function(accessToken:any,refreshToken:any,profile:any,cb:any){
    console.log('porfile',profile)
    if(profile){
        const userIn:any = await oauth_user.findOne({   
            name:profile.displayName
        })
        if(userIn){
            console.log('userIn',userIn)
            cb(null,userIn);
        }else{
            console.log('profile',profile)
            const userData = {
                name:profile.displayName,   
                email:profile.username,
                password: profile.id
            }
            user_data_hashing(userData).then(async(data:any)=>{
                
                const newAuthusers = new oauth_user(data);
                let result = await newAuthusers.save();
                 cb(null,result);
                 counter_mail(result);
            })
            
            
        }
    }
   
else{
    return cb(null,false)
}
}
))

passport.serializeUser(function(result:any,done:any){
    const userId = result._id.toString();
    console.log('serialize',userId)
    done(null,userId);

})
// 
passport.deserializeUser(async function(id:any,done:any){
    
    if(!Types.ObjectId.isValid(id)){
        done(null,false);
    }
        const objectId = new Types.ObjectId(id);
         //user = await oauth_user.findById(objectId)
        let user = await oauth_user.findById(objectId)
        console.log('deserialize',user)
         done(null,user);
    
})
