import jwt from "jsonwebtoken"
import AuthModel from "../Model/AuthModel.js";
export const authMiddleware = async(req,res,next)=>{    
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(400).send({
            success:false,
            message:"no token available",
        })
    }
    const token = authHeader.split(' ')[1]
    try{
    const decoded =await jwt.verify(token,process.env.JWT_ACCESS_SECRET)
    req.userId =decoded.id
    next()
    }catch(error){
            return res.status(500).send({
            success:false,
            message:"token is invalid or expires",
            error:error.message
        })
    }
}


export const isSeller = async(req,res,next)=>{
    try{
        const userId = req.userId;
        const user =await AuthModel.findById(userId);
        if(user.role !== "seller"){
                return res.status(400).send({
                success:false,
                message:"Not the seller account"
            })
        }
        next()
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"this is not the seller account",
            error:error.message
        })

    }
}

export const isAdmin = async(req,res,next)=>{
    try{
        const userId = req.userId;
        const user =await AuthModel.findById(userId);
        if(user.role !== "admin"){
                return res.status(400).send({
                success:false,
                message:"Not the seller acc"
            })
        }
        next()
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"this is not the seller account",
            error:error.message
        })

    }
}