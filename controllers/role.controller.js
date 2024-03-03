import Role from "../models/Role.js";
import { CreateSucess } from "../utilis/sucess.js";
import { CreateError } from "../utilis/error.js";

export const createRole = async(req,res,next)=>{
    try {
        const {role,age}=req.body;
        const newRole = new Role({role:role,age:age})
        await newRole.save();
        return next(CreateSucess(200,"ROLE Created"))
    } catch (error) {
        return next(CreateError(400,"ROLE not Created"))
    }
}

export const updateRole = async(req,res,next)=>{
    try {
        const updateID = req.params.id;
        const roleUpdate = await Role.findById({_id:updateID})
        if (roleUpdate) {
            const newData = await Role.findByIdAndUpdate(updateID,{$set:req.body},{new:true});
            return next(CreateSucess(200,"ROLE Updated"))
        } else {
            return next(CreateError(400,"ROLE not Updated"))
        }
    } catch (error) {
        return next(CreateError(500,"ISE"))
    }
}

export const deleteRole = async(req,res,next)=>{
    try {
        const deleteID = req.params.id;
        const roleDelete = await Role.findById({_id:deleteID})
        if (roleDelete) {
            const newData = await Role.findByIdAndDelete(deleteID,{$set:req.body},{new:true});
            return next(CreateSucess(200,"ROLE delete"))
        } else {
            return next(CreateError(400,"ROLE not delete"))
        }
    } catch (error) {
        return next(CreateError(500,"ISE"))
    }
}

export const getAll = async(req,res,next)=>{
    try {
        const allRole = await Role.find({});
        return res.send(allRole)
    } catch (error) {
        return next(CreateError(500,"ISE"))
    }
}