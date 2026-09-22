// const express=require("express")
//  const authRouter=express.Router()

const {Router}=require("express")
const authController=require("../controllers/auth.controller")
const authRouter=Router()
const authMiddleware=require("../middlewares/auth.middleware")

/** 
 * @route Post /api/auth/register
 * @description Register a new user
 * @access public
 **/

authRouter.post("/register",authController.registerUserController)

/**
 * @route Post /api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post("/login",authController.loginUserController)
/**
 * @route GET /api/auth/logout
 * @description  clear token from user cookie and add token in the blacklist
 * @access public
 */

authRouter.get("/logout",authMiddleware,authController.logoutUsercontroller)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in details
 * @access private
 */
authRouter.get("/get-me",authMiddleware,authController.getMeController)
module.exports=authRouter