import jwt from 'jsonwebtoken'
import { JWTUser } from '../utils'
import { NextFunction, Request, Response } from 'express'


const auth = async(req:Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith("Bearer")){
         res.status(401).json({msg:"Authentication Invalid"})
         return
    }
    
    const token  = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser;
        
        req.User = {id: payload.id, name:payload.name, email:payload.email}
        
        next();
    } catch (error) {
        res.status(500).json({
            msg: "something went wrong"
        })
    }
}

export default auth