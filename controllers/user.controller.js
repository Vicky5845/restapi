import User from "../models/User.js";
import { CreateError, CreateSucess } from "../utilis/hander.js";

export const getAllUser = async(req,res,next)=>{
    try {
        const allUser = await User.find({});
        return next(CreateSucess(200,"All User",allUser))
    } catch (error) {
        return next(CreateError(400,"ISE"))
    }
}

export const getAllUserById = async(req,res,next)=>{
    try {
        const userID = req.params.id;
        const userById = await User.findById({_id:userID})
        return next(CreateSucess(200,"By ID",userById))
    } catch (error) {
        return next(CreateError(400,"ISE"))
    }
}

