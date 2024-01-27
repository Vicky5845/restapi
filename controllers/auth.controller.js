import User from "../model/User.js";
import bcrypt from 'bcryptjs'

export const register  =async (req,res)=>{
    try {
        const {email,password}=req.body;
        const checkExistingMail = await User.findOne({email:email});
        if (checkExistingMail) {
            return res.send("ID Already avaliabel")
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);
        const newReg = new User({email:email,password:hashpassword});
        await newReg.save();
        return res.send("REG SUCESS")
    } catch (error) {
        return res.send("REG failed")
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isMailValid = await User.findOne({email:email});
        if (!isMailValid) {
            return res.send("ID not found")
        }
        const isPasswordValid = await bcrypt.compare(password,isMailValid.password);
        if (!isPasswordValid) {
            return res.send("password not found")
        }
        return res.send("login SUCESS")
    } catch (error) {
        return res.send("login failed")
    }
}