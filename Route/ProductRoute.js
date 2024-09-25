import express from "express"
import upload from "../utils/multer.js"
import { createProduct, deleteProduct, getAllProduct, GetSingleProduct, searchContoroller, sellerProduct, updateProduct } from "../Controller/ProductController.js"
import { authMiddleware, isSeller } from "../Middleware/middleware.js"


const route = express.Router()
route.post("/create",authMiddleware,isSeller,upload.array('images',10),createProduct)
route.get("/getall",getAllProduct)
route.get("/getSellerProduct",authMiddleware,isSeller,sellerProduct)
route.get("/getSingle/:id",GetSingleProduct)
route.get("/searchproduct/:keyword",searchContoroller)
route.put("/update/:id",authMiddleware,isSeller,upload.array("images",10),updateProduct)
route.delete("/delete/:id",authMiddleware,isSeller,deleteProduct)




export default route