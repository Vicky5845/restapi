import Role from "../models/Role.js";
import { CreateError, CreateSucess } from "../utilis/hander.js";

export const createRole = async(req,res,next)=>{
    try {
        const {role,age}=req.body;
        const newRole = new Role({role:role,age:age})
        await newRole.save()
        return next(CreateSucess(200,"Role Created",newRole))
    } catch (error) {
        return next(CreateError(400,"Role not Created"))
    }
}

export const updateRole = async(req,res,next)=>{
    try {
        const updateID = req.params.id;
        const roleUpdate = await Role.findById({_id:updateID})
        if (roleUpdate) {
            const newData = await Role.findByIdAndUpdate(updateID,{$set:req.body},{new:true})
            return next(CreateSucess(200,"Role Updated",newData))
        } else {
            return next(CreateError(400,"Role not Updated"))
        }
    } catch (error) {
        return next(CreateError(800,"ISE"))
    }
}

export const deleteRole = async(req,res,next)=>{
    try {
        const deleteID = req.params.id;
        const roleDelete = await Role.findById({_id:deleteID})
        if (roleDelete) {
            const newData = await Role.findByIdAndDelete(deleteID,{$set:req.body},{new:true})
            return next(CreateSucess(200,"Role delete",newData))
        } else {
            return next(CreateError(400,"Role not delete"))
        }
    } catch (error) {
        return next(CreateError(800,"ISE"))
    }
}

export const getAll = async(req,res,next)=>{
    try {
       const allRoles = await Role.find({})
       return next(CreateSucess(200,"All Roles",allRoles))
    } catch (error) {
        return next(CreateError(800,"ISE"))
    }
}