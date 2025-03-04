import mongoose, { Schema } from "mongoose";

interface UsersOauth {
  name: string;
  email: string;
  password: string;
  salt:string;
}
const OauhtSchema = new Schema<UsersOauth>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt:{
    type:String,
    required:true,
  }
});

const oauthUsers = mongoose.model('Oauth_Google',OauhtSchema)
export = oauthUsers