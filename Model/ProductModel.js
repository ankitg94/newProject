import mongoose from "mongoose";
const ProductSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    name:{
        type:String
    },
    productdetails:{
       type:String
    },
    images:{
        type:[String],
        required:true
    },
    quantity:{
        type:Number
    },
    inStock:{
        type:String,
        enum:[true,false],
        default:true
    }
    
},{timestamps:true})

const ProductModel = mongoose.model("products",ProductSchema)
export default ProductModel