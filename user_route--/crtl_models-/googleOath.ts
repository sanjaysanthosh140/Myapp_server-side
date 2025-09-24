const passport = require("passport");
const GooogleStatergies = require("passport-google-oauth20").Strategy;
import oauthUsers from "../models/google_Oauth";
import { user_data_hashing } from "../hash_mehod--/data_hashing";
import { generateToken } from "../Autherization/jwt";
import { Types } from "mongoose";
import git_user from "../models/git_Oauth";
import { counter_mail } from "../C_ounter_Mail/Main_function";
require("dotenv").config();
//let encodeToken:null;
let result: any;

passport.use(
  new GooogleStatergies(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.server_link}/user_side/oauth2/redirect/google`,
    }, //https://myapp-server-side-pqkd.onrender.com/user_side/oauth2/redirect/google
    // console.log('Client ID:', process.env.GOOGLE_CLIENT_ID),
    // console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET),
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      //    console.log(profile)

      if (profile) {
        const userIn = await oauthUsers.findOne({
          email: profile.emails[0].value,
        });
        if (userIn) {
          //console.log('userIn',userIn)
          done(null, userIn);
        } else {
          const user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id,
          };

          user_data_hashing(user).then(async (data: any) => {
            //console.log(data)
            const newAuthusers = new oauthUsers(user);
            result = await newAuthusers.save();
            done(null, result);
            counter_mail(result);
            //console.log(result);
            // encodeToken = generateToken(result._id)
          });
        }
      }
    }
  )
);

passport.serializeUser((result: any, done: any) => {
  //console.log('Serializing user ID:', result._id);
  const userId = result._id.toString();
  // console.log(userId)
  done(null, userId); // Pass just the ID
});

passport.deserializeUser(async (id: any, done: any) => {
  try {
    // let user
    //console.log('Deserializing with ID:', id);
    if (!Types.ObjectId.isValid(id)) {
      return done(null, false);
    }
    const _id = new Types.ObjectId(id);
    //console.log(_id)
    let user = await oauthUsers.findById(_id);
    //user = await git_user.findById(objectId)
    //  console.log('Found user:', user);
    done(null, user);
    //console.log("user@@@@%%%&&&&_______", user);

    if (!user) {
      console.log("No user found with ID:", id);
      return done(null, false);
    }
  } catch (error) {
    console.error("Deserialize error:", error);
    done(error, null);
  }
});
