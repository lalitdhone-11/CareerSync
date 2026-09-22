const userModel=require("../model/user.model.js")
const tokenBlacklistModel = require("../model/blacklist.model.js");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
 /**
  * @name registerUserController
  * @description register a new user expects username,email and password
  * @access public
  */
async function registerUserController(req,res) {
    const {username,email,password}=req.body
    if(!username ||! email || ! password){
        return res.status(400).json({
           message:"please provide username,email and password"
        })
    }
    const isUserAlredyExists=await userModel.findOne({
        $or:[{username},{email}]
    })
   if (isUserAlredyExists){
    /**isUserAlreadyExist.username==username this condition check ans message return 
     */
    return res.status(400).json({
        message:"Account alredy exist with this email address or username"
    })
   }
  const hash=await bcrypt.hash(password,10)
  const user=await userModel.create({
    username,
    email,
    password:hash
  })
  const token=jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET,{expiresIn:"1d"}
)

  res.cookie("token",token)
 
  res.status(201).json({
    message:"User register successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
  })

}

 /**
  * @name loginUserController
  * @description login a user, expects email and password in the request body
  * @access public
  */
 
 async function loginUserController(req,res) {
    const{email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid= await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }
     
     const token=jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET,{expiresIn:"1d"}
)

  res.cookie("token",token)
 
  res.status(201).json({
    message:"User loggedIn successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
  })

 }

 /**
 * @route GET /api/auth/logout
 * @description  clear token from user cookie and add token in the blacklist
 * @access public
 */

 async function logoutUsercontroller(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in details
 * @access private
 */
async function getMeController(req,res){
  const user=await userModel.findById(req.user.id)
  res.status(200).json({
    message:"User details fetched successfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
}
module.exports={registerUserController,loginUserController,logoutUsercontroller,getMeController}