import  mongoose from "mongoose"
interface homeContend {
    route:string
    description:String;
    home_Image : String;
}

const homeSchema = new  mongoose.Schema<homeContend>({

    route:{
     type:String,
     require:true
    },
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