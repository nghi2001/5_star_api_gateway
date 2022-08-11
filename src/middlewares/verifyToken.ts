import jwt from "jsonwebtoken";
import e, { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";

export default function verifyToken (req:Request,res:Response,next:NextFunction) {
    try {
        let status , msg;
        let token = req.cookies.token;
        if(token) {
            let decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as Secret);
            console.log(decode);
            next()
            
        } else {
            status = 401;
            msg = "Forbiden"
        }

        res.json({
            status,
            msg
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            msg: error
        })
    }
}