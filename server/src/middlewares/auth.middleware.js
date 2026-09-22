const jwt =require("jsonwebtoken");
const tokenBlacklistModel = require("../model/blacklist.model");

async function authUser(req,res,next){
      const token = req.cookies.token;
     if (!token){
        return res.status(401).json({
            message:"Token not Provided"
        })
     }
     const isTokenBlacklisted=await tokenBlacklistModel.findOne({token})
     if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalide Token."
        })
     }
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalide Token."
        })
    }
}
module.exports=authUser