import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateError } from "../utilis/error.js";
import { CreateSucess } from "../utilis/sucess.js";

export const register = async(req,res,next)=>{
    try {
      const {email,password}=req.body
      const roleCollection = await Role.find({role:"User"});
      const regUser = await User.findOne({email:email});
      if (regUser) {
        return next(CreateError(400,"ID Already Registred"))
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password,salt);
      const newReg = new User({email:email,password:hashPassword,roles:roleCollection})
      await newReg.save();
      return next(CreateSucess(200,"Registration Sucess"))
    } catch (error) {
        return next(CreateError(400,"Registration Failed"))
    }
}

export const login = async(req,res,next)=>{
    try {
        const {email,password}=req.body
      const user = await User.findOne({email:email}).populate("roles","role")
    
      if (!user) {
        return next(CreateError(400,"ID not found"))
      }
          const {roles}=user;
      const isPasswordValid = await bcrypt.compare(password,user.password);
      if (!isPasswordValid) {
        return next(CreateError(400,"Password Not Found"))
      }
      const token = jwt.sign(
        {id:user._id,roles:roles},
        process.env.JWT_SECRET
      )
      return res.cookie("gh",token,{httpOnly:true}).json({data:user})
    } catch (error) {
        return next(CreateError(400,"Login Failed"))
    }
}
