import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { CreateError, CreateSucess } from "../utilis/hander.js";

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const roleCollection = await Role.find({ role: "User" })
        const regUser = await User.findOne({ email: email })
        if (regUser) {
            return next(CreateError(400, "ID Already Use"))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newReg = new User({ email: email, password: hashPassword, roles: roleCollection })
        await newReg.save()
        return next(CreateSucess(200, "Registration Sucessful", newReg))
    } catch (error) {
        return next(CreateError(400, "Registration Failed"))
    }
}

export const registerAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const roleCollection = await Role.find({})
        const regUser = await User.findOne({ email: email })
        if (regUser) {
            return next(CreateError(400, "ID Already Use"))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newReg = new User({ email: email, password: hashPassword, isAdmin: true, roles: roleCollection })
        await newReg.save()
        return next(CreateSucess(200, "Registration Sucessful", newReg))
    } catch (error) {
        return next(CreateError(400, "Registration Failed"))
    }
}

export const login = async (req, res, next) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).populate("roles", "role")
      if (!user) {
          return next(CreateError(400, "ID not Found"))
      }
      const { roles } = user
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if (!isPasswordValid) {
      return next(CreateError(400, "Password not found"))
     }
     const token = jwt.sign(
      {id:user.id,isAdmin:user.isAdmin,roles:roles},
      process.env.JWT
     )
     return res.cookie("access_token",token,{httpOnly:true}).json({respon:CreateSucess(200,"Login Sucess",user)})
  } catch (error) {
      return next(CreateError(400,"Login Falied"))
  }
}