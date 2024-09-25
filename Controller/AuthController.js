import bcrypt from "bcrypt";
import AuthModel from "../Model/AuthModel.js";
import {  validateUser } from "../Validation/JoiValidation.js"
import jwt from "jsonwebtoken"
export const RegisterController =async(req,res)=>{
    const {fullName,email,phoneNumber,password,role}=req.body
    const {error} = validateUser(req.body);
    if(error){
        return res.status(400).json({errors:error.details.map((err)=>(err.message))})
    }
    try{
     const userExist = await AuthModel.findOne({email});
     if(userExist){
        return res.status(400).send({
            success:false,
            message:"this email already register please use another one"
        })
     }
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user =await AuthModel({fullName,email,password:hashedPassword,phoneNumber,role}).save()
    return res.status(200).send({
        success:true,
        message:"user Register successfully",  
    })  
    }catch(error){
        return res.status(500).send({
        success:false,
        message:"error in register Controller"
    })
    }
}
const genrateaccessToken = (user)=>{
   return jwt.sign({id:user._id,version:user.tokenVersion},process.env.JWT_ACCESS_SECRET,{expiresIn:'3hr'})
}
const generaterefreshToken = (user)=>{
    return jwt.sign({id:user._id,version:user.tokenVersion},process.env.JWT_Refresh_SECRET,{expiresIn:'7d'})
} 
export const LoginController =async(req,res)=>{
    try{
        const {email,password}=req.body
        const user =await AuthModel.findOne({email})
     if(!user){
        return res.status(400).send({
            success:false,
            message:"user is not register"
        })
     }
     const mathchedPassword =await bcrypt.compare(password,user.password)
     if(!mathchedPassword){
        return res.status(400).send({
            success:false,
            message:"passowrd is not matching"
        })
     } 
     //token 
     const accessToken = genrateaccessToken(user)
     const refreshToken = generaterefreshToken(user)

        res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:process.env.Mode,
        sameSite:'strict'  
     })
        return res.status(200).send({
        success:true,
        message:"you are Login successfully",
        accessToken
     })
    }
    catch(error){
            return res.status(500).send({
            success:false,
            message:"error in Login Controller",
            error:error.message
        })
    }
} 
export const refreshToken = async(req,res)=>{
    const refreshToken =req.cookies.refreshToken
        if(!refreshToken){
            return res.status(400).send({
            success:false,
            mesage:"autherization required"
        })
    }
try{
  const data =await jwt.verify(refreshToken,process.env.JWT_Refresh_SECRET) 

  const userId = await AuthModel.findById(data.id)
  if(!userId || data.version !== userId.tokenVersion){
        return res.status(400).send({
        success:false,
        message:"invalid token"
    })
}
const accessToken = genrateaccessToken(userId)
return res.status(200).send({
    success:true,
    message:"access refresh token is updated",
    accessToken,
}) 
}catch(error){
        return res.status(500).send({
        success:false,
        message:"eror in refreshing token"
    })
}
} 

export const logoutController = async(req,res)=>{
try{
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:process.env.Mode,
        sameSite:'strict'  
     })
        res.status(200).send({
        success:true,
        message:"user logout successfully"
     })
 }catch(error){
        return res.status(500).send({
        success:false,
        message:"eror in loging"
    })
}
}
export const allUser =async(req,res)=>{
    try{
        const user=req.userId
        const userDetails =await AuthModel.findById(user)
       
        if(!userDetails) {
            return res.status(400).send({
                success:false,
                message:"user details not available"
            })
        }
        return res.status(200).send({
            success:true,
            message:"user all details",
            userDetails
        })



    }catch(error){
            return res.status(500).send({
            success:false,
            message:"eror in loging"
        })  
    }
}