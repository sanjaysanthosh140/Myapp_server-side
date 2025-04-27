import  mongoose from "mongoose"
interface homeContend {
    description:String;
    home_Image : String;
}

const homeSchema = new  mongoose.Schema<homeContend>({
    description:{
        type:String,
        required:true
    },
    home_Image:{
        type:String,
        required:true
    }
})

const homeContendSchema = mongoose.model<homeContend>("homeContend",homeSchema);
export default homeContendSchema;