import express from "express"
import { authMiddleware, isAdmin } from "../Middleware/middleware.js"
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "../Controller/categoryController.js"

const router =express.Router()
router.post("/create",authMiddleware,isAdmin,createCategory)
router.get("/getAll",getAllCategory)
router.get("/getSingleCat/:id",getSingleCategory)
router.put("/update/:id",authMiddleware,isAdmin,updateCategory)
router.delete("/delete/:id",authMiddleware,isAdmin,deleteCategory)
export default router