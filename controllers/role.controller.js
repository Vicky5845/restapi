import Role from "../model/Role.js";

export const createRole = async(req,res)=>{
    try {
        const {role,age}=req.body
        const newRole = await Role({role:role,age:age});
        await newRole.save();
        return res.json("Role ok ")
    } catch (error) {
        return res.send("Role not  ok ")
    }
}

export const updateRole = async(req,res)=>{
    try {
        const updateID = req.params.id;
        const roleUpdate = await Role.findById({_id:updateID})
        if (roleUpdate) {
            const newData  = await Role.findByIdAndUpdate(updateID,{$set:req.body},{new:true});
            return res.send("Role update")
        } else {
            return res.send("Role update")
        }
    } catch (error) {
        return res.send("ISE")
    }
}

export const deleteRole = async(req,res)=>{
    try {
        const deleteID = req.params.id;
        const roledelete = await Role.findById({_id:deleteID})
        if (roledelete) {
            const newData  = await Role.findByIdAndDelete(deleteID,{$set:req.body},{new:true});
            return res.send("Role DEL")
        } else {
            return res.send("Role not Del")
        }
    } catch (error) {
        return res.send("ISE")
    }
}

export const getAll  = async(req,res)=>{
    try {
        const allRole = await Role.find({});
        return res.json(allRole)
    } catch (error) {
        return res.send("ISE")
    }
}