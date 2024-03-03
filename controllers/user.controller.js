import User from "../models/User.js";

export const getAllUser = async(req,res)=>{
    try {
        const getAll = await User.find({})
        return res.send(getAll)
    } catch (error) {
        return res.send("ISE")
    }
}

export const getById = async(req,res)=>{
    try {
        const getID = req.params.id;
        const byID = await User.findById({_id:getID})
        return res.send(byID)
    } catch (error) {
        return res.send("ISE")
    }
}