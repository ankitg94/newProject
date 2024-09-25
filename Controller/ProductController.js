import cloudinary from "../Config/Clodiunary.js";
import ProductModel from "../Model/ProductModel.js";
import fs from "fs";
import mongoose from "mongoose";

export const createProduct =async(req,res)=>{
    try{
         const user =req.userId;
        const {category,name,productdetails,quantity}=req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                 message: 'At least one image is required'
            });
          }
         const imageUrl = [] 
         for(const file of req.files){
            const result =await cloudinary.uploader.upload(file.path,{
                folder:'products',
                resource_type:'image'
            })
            fs.unlinkSync(file.path)
            imageUrl.push(result.secure_url)
        } 
        const Product =await ProductModel({
            user,category,name,productdetails,quantity,images:imageUrl
        }).save()
        
        return res.status(200).send({
            success:true,
            message:"product creaetd successfully",
            Product
           
        })

    }catch(error){
            return res.status(500).send({
            success:false,
            message:"error in creating product",
            error:error.message
        })
    }
}

export const getAllProduct =async(req,res)=>{
    try{
        const allproducts =await ProductModel.find({}).populate("category","name -_id")

        return res.status(200).send({
            success:true,
            message:"all ptoduct list",
            total:allproducts.length,
            allproducts
        })
       }catch(error){
            return res.status(500).send({
            success:false,
            message:"error in creating product",
            error:error.message
        })
    }
}
export const GetSingleProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              success: false,
              message: "Invalid user ID"
            });
          }
     
        const singleProduct =await ProductModel.findById({_id:id}).populate("category","name -_id");
             return res.status(200).send({
            success:true,
            message:"here is your single data",
            singleProduct
        })  


    }catch(error){
            return res.status(400).send({
            success:false,
            message:"error in getting the product",
            error:error.message
        })
    }
}
export const sellerProduct = async(req,res)=>{
    try{
        const user = req.userId;
        const Sellerproduct =await ProductModel.find({user})
        return res.status(200).send({
            success:true,
            message:"here is your single data",
            total:sellerProduct.length,
            Sellerproduct
        })  



    }catch(error){
        return res.status(400).send({
            success:false,
            message:"error in getting the seller product"
        })
    }

}

export const updateProduct = async (req, res) => {
    try {
        const userId =req.userId
        const  id  = req.params.id; 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              success: false,
              message: "Invalid user ID"
            });
          }
     
        const { user, category, name, productdetails, quantity } = req.body;
        const existingProduct = await ProductModel.findOne({_id:id ,user:userId});

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product  or owner not found'
            });
        }
        let imageUrl = existingProduct.images;
        if (req.files && req.files.length > 0) {
            for (const oldImage of existingProduct.images) {
                const publicId = oldImage.split('/').pop().split('.')[0]; 
                await cloudinary.uploader.destroy(`products/${publicId}`);
            }
            imageUrl = []; 
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                    resource_type: 'image'
                });
                fs.unlinkSync(file.path); 
                imageUrl.push(result.secure_url); 
            }
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                user,category,name,productdetails,quantity,images: imageUrl
            },
            { new: true } 
        );

        return res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in updating product",
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const userId =req.userId
        const  id  = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              success: false,
              message: "Invalid user ID"
            });
          }
     
        const product = await ProductModel.findOne({_id:id,user:userId});
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        
        for (const imageUrl of product.images) {
            const publicId = imageUrl.split('/').pop().split('.')[0]; 
            await cloudinary.uploader.destroy(`products/${publicId}`);
        }
        await ProductModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
            return res.status(500).send({
            success: false,
            message: 'Error in deleting product',
            error: error.message
        });
    }
};


export const searchContoroller =async(req,res)=>{
    try{
        const  keyword  = req.params.keyword; 
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Keyword is required for searching'
            });
        }

        const products = await ProductModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { productdetails: { $regex: keyword, $options: 'i' } }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found matching the keyword'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Products found',
            products
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error in searching products',
            error: error.message
        });
    }
}