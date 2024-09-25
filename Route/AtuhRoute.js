import express from "express"
import { allUser, LoginController, logoutController, refreshToken, RegisterController } from "../Controller/AuthController.js"
import { authMiddleware } from "../Middleware/middleware.js"

const Route = express.Router()
Route.post("/register",RegisterController)
Route.post("/login",LoginController)
Route.post("/refreshToken",refreshToken)
Route.post("/logout",authMiddleware,logoutController)
Route.get('/userdetails',authMiddleware,allUser)
export default Route
