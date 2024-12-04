import { NextFunction, Request, Response } from "express"
import { createJWT, JWTUser } from "../utils";
import bcrypt from "bcryptjs"
import userSchema from "../models/user";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password }: { name: string; email: string; password: string } = req.body;
        console.log("first")

        if (!name || !email || !password) {
            res.status(400).json({
                msg: "Please provide all values"
            })
            return
        }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        // if (!passwordRegex.test(password) || password.length < 8 || password.length > 20) {
        //     res.status(400).json({
        //         msg: "Password should be between 8 and 20 characters and contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number"
        //     })
        //     return
        // }

        const userExists = await userSchema.findOne({ email })
        if (userExists) {
            res.status(400).json({
                msg: "user Already Exists"
            })
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(password, salt);

        const newUser = await userSchema.create({ name, email, password:hashedPasword })
        const token = createJWT({ id: newUser.id, name: newUser.name, email: newUser.email })
        res.status(201).json({
            user: {
                name: newUser.name,
                userId: newUser.id,
                email: newUser.email,
                profile: newUser?.profile
            },
            token,
            msg: "registered successfully"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong"
        })
    }

}

export const login = async (req: Request, res: Response) => {
    try {
     
        const {  email, password }: {  email: string; password: string } = req.body;
     
        if (!email || !password) {
            res.status(400).json({
                msg: "Please provide all values"
            })
            return
        }
        const userExists = await userSchema.findOne({ email }).select('+password')
        if (!userExists) {
            res.status(400).json({
                msg: "user does not Exist"
            })
            return
        }
        console.log(userExists)
        const isCorrect = await bcrypt.compare(password, userExists.password);
        if(!isCorrect){
            res.status(400).json({
                msg:"Incorrect password"
            })
            return 
        }

        const token = createJWT({ id: userExists.id, name: userExists.name, email: userExists.email })
        res.status(200).json({
            user: {
                name: userExists.name,
                userId: userExists.id,
                email: userExists.email,
                profile: userExists?.profile
            },
            token,
            msg: "logged in successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })
    }

}

export const getUser = async(req: Request, res:Response): Promise<void> => {
    try {
        const {id} = req.User as JWTUser;

        const user = await userSchema.findById({_id:id})
        if(!user){
            res.status(404).json({
                msg:"User not found"
            })
            return;
        }
        res.status(200).json({
            msg:"success",
            user:{
                name:user.name,
                email: user.email,
                profile:user.profile
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
}

export const updateUser = async(req:Request, res:Response)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            msg:"something went wrong"
        })
    }
}

export const deleteUser = async(req:Request, res:Response)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            msg:"something went wrong"
        })
    }
}