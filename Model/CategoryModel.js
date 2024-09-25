import mongoose from "mongoose";

const categoryScehma = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
   }
},{timestamps:true})
const CategoryModel = mongoose.model("categories",categoryScehma)
export default CategoryModel