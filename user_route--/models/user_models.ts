import mongoose, { Schema } from "mongoose";

interface users {
  name: string;
  email: string;
  password: String;
  isAdmin: boolean;
  isDisabled: boolean|any;
  salt:String
}

const user_Schema = new Schema<users>({
  name: {
    type: String,
    required: [true, "name is requires"],
    trim: true,
    minlength: [2, "name must be atleast 2 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required "],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type:String,
    required: [true, " password is mandatory"],
    mainlength: [6, "password must be alest 6 characters mandatory"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  salt:{
    type:String,
    required:true
  }
});

const user_models = mongoose.model("user", user_Schema);
export = user_models;
