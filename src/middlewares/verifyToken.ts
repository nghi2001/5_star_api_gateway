import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import axios from "axios";

export default async function verifyToken (req:Request,res:Response,next:NextFunction) {
    try {
        let status , msg;
        let token = req.cookies.token;
        if(token) {
            await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as Secret,async (err:any,decode:any) => {
                if(err) {
                    if(req.cookies.refresh_token) {
                            
                            let refresh_token = req.cookies.refresh_token;

                            let decode = (await jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as Secret) as any)
                            console.log('decode',decode);
                            
                            let newToken:any = await  axios.post(`${process.env.AUTH_SERVICE}auth/resetToken`,{
                                            refresh_token: refresh_token,
                                            user_id: decode._id
                                        }, )
                                console.log(newToken.data);
                                res.clearCookie('token');
                                res.clearCookie("refresh_token");
                                res.cookie('token',newToken.data.accessToken.toString(),{maxAge: 1000*60*60*24*30*30,httpOnly: true})
                                res.cookie('refresh_token',newToken.data.refreshToken.toString(),{maxAge: 1000*60*60*24*30,httpOnly: true});
                                
                    } else {
                        status = 401; msg = 'Forbiden'
                    }
                } else {
                    status = 200;
                }
            })
            
        } else {
            status = 401;
            msg = "Forbiden"
        }
        console.log('next');
        
        if( status != 200) {
            return res.json({
                status,
                msg
            })
        } else {
            return next()
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:500,
            msg: error
        })
    }
}