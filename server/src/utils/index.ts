import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

export type JWTUser = {
    id: Schema.Types.ObjectId; // MongoDB ObjectId
    name: string;
    email: string;
   
  }
export const createJWT = (user:JWTUser) => {
    return jwt.sign({ id: user.id, name: user.name ,email:user.email}, process.env.JWT_SECRET as string , { expiresIn: process.env.JWT_LIFETIME })
}