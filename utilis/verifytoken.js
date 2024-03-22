import jwt from 'jsonwebtoken'
import { CreateError } from './hander.js';

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
        return next(CreateError(400,"You are Not Authorized"))
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if (err) {
            return next(CreateError(401,"Token not Valid"))
        } else {
            req.user=user
        }
        next()
    })
}

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(CreateError(400,"You are Not Authorized Admin"))
        }
    })
}

export const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin) {
            next()
        } else {
            return next(CreateError(400,"You are Not Authorized User"))
        }
    })
}