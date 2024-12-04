import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from "validator";

export interface User {
    name: string;
    email: string;
    profile?: string;
    password: string
  }

const userSchema = new mongoose.Schema<User>({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    profile:{
        type: String || null,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value: string) => validator.isEmail(value), // Wrap the function
          message: "Please provide a valid email",
        },
      },
    password:{
        type: String,
        required: true,
        minlength:3,
        select: false
    }
    
})


export default mongoose.model<User>("userSchema", userSchema)