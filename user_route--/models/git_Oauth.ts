import mongoose, {Schema} from 'mongoose';
interface GitUser{
     name:String,
     email:String,
     password:String,
     salt:String

}
const gitSchema = new Schema<GitUser>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
      }
})

const git_user =  mongoose.model('git_user',gitSchema);
export default git_user;

