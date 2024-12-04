import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export type JWTUser = {
    id: mongoose.Types.ObjectId; // MongoDB ObjectId
    name: string;
    email: string;
   
  }
export const createJWT = (user:JWTUser) => {
    return jwt.sign({ id: user.id, name: user.name ,email:user.email}, process.env.JWT_SECRET as string , { expiresIn: process.env.JWT_LIFETIME })
}