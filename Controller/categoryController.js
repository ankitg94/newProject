import mongoose from "mongoose";
import CategoryModel from "../Model/CategoryModel.js";

export const createCategory =async(req,res)=>{
    try{
        const {name} = req.body;
        const alreadyName = await CategoryModel.findOne({name}) 
        if(alreadyName){
                return res.status(400).send({
                success:true,
                message:"This Category is already available"
           })
        }

        const data = await CategoryModel({name}).save()
        return res.status(200).send({
            success:true,
            message:"category created successfully",
            data
        })
    }catch(error){
           return res.status(500).send({
            success:false,
            message:"error in creating category"
        })
    }
}

export const getAllCategory =async(req,res)=>{
    try{
        const allCategory =await CategoryModel.find({})
            return res.status(200).send({
            success:true,
            message:"here is your all Data",
            total:allCategory.length,
            allCategory
        })
    }catch(error){
            return res.status(500).send({
            success:false,
            message:"error in getting category"
        })
    }
}       
export const getSingleCategory =async(req,res)=>{
    try{
        const id =req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              success: false,
              message: "Invalid user ID"
            });
          }
      
        const SingleCategory =await CategoryModel.findById(id)
        return res.status(200).send({
            success:true,
            message:"here is your all Data",
            SingleCategory
        })
    }catch(error){
            return res.status(500).send({
            success:false,
            message:"error in getting Single category"
        })
    }
}
export const updateCategory =async(req,res)=>{
    try{
        const id =req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
              success: false,
              message: "Invalid user ID"
            });
          }
      
        const {name}=req.body;
        const updateData =await CategoryModel.findByIdAndUpdate(id,{name},{new:true})

        return res.status(200).send({
            success:true,
            message:"your category updated successfully",
            updateData
        })
    }catch(error){
            return res.status(500).send({
            success:false,
            message:"error in update category"
        })
    }
}
export const deleteCategory =async(req,res)=>{
    try{
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              success: false,
              message: "Invalid user ID"
            });
          }
        const deleteData =await CategoryModel.findByIdAndDelete(id)
            return res.status(200).send({
            success:true,
            message:"category  deleted  successfully"
        })
    }catch(error){
            return res.status(500).send({
            success:false,
            message:"error in deleting category"
        })
    }
}