import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email:{type:String,required:true},
        password:{type:String,required:true},
        isAdmin:{type:Boolean,default:false},
        roles:{type:[Schema.Types.ObjectId],ref:"Role",required:true}
    },
    {timestamps:true}
)

export default mongoose.model("User",UserSchema)