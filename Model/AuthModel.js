import mongoose  from "mongoose";
const AuthSchema =new mongoose.Schema({
     fullName:{
        type:String
     },
     email:{
        type:String
     },
     phoneNumber:{
        type:Number
     },
     password:{
        type:String
     },
     role:{
        type:String,
        enum:["user","seller","admin"],
        default:"user"
     },
     tokenVersion:{
        type:Number,
         default:0
     }

},{timestamps:true})
const AuthModel = mongoose.model("users",AuthSchema)
export default AuthModel

