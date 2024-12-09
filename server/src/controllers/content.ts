import { Request, Response } from "express"
import { JWTUser } from "../utils"
import userSchema from "../models/user";
import contentSchema from "../models/content";


export const addContent = async(req:Request, res:Response):Promise<void>=>{
    try {
        const {id} = req.User as JWTUser;
        const {contentType, link, title, tags} = req.body


        const user = await userSchema.findById({_id:id})
        if(!user){
            res.status(404).json({
                msg:"User not found"
            })
            return;
        }

        const content = await contentSchema.create({contentType, link, title, tags, userId:id})
        res.status(200).json({
            msg:"content added successfully",
            content
        })
        return
        
    } catch (error) {
         res.status(500).json({
            msg:"something went wrong"
        })
    }
}

export const getAllContent = async(req:Request, res:Response)=>{
    try {

        const {id} = req.User as JWTUser;

        const user = await userSchema.findById({_id:id})
        if(!user){
            res.status(404).json({
                msg:"User not found"
            })
            return;
        }

        const content = await contentSchema.find({userId:id})
        res.status(200).json({
            msg:"contents retrived successfully",
            content
        })
        return
        
    } catch (error) {
         res.status(500).json({
            msg:"something went wrong"
        })
    }
}

export const deleteContent = async(req:Request, res:Response)=>{
    try {
        const {id} = req.User as JWTUser;
        

        const {contentId} = req.params

        const user = await userSchema.findById({_id:id})

        if(!user){
            res.status(404).json({
                msg:"User not found"
            })
            return;
        }

        const content = await contentSchema.findById({id:contentId})
        if(!content){
            res.status(400).json({
                msg:"invalid content"
            })
            return 
        }
        if(content.userId !== id){
            res.status(400).json({
                msg:"Unauthorized access"
            })
            return

        }

        await contentSchema.findByIdAndDelete({id:contentId})
        res.status(200).json({
            msg:"Content deleted successfully",
            contentId
        })
        return 
    } catch (error) {
         res.status(500).json({
            msg:"something went wrong"
        })
    }
}

export const updateContent = async(req:Request, res:Response)=>{
    try {

        const {id} = req.User as JWTUser;

        const {contentId} = req.params
        const {contentType, link, title, tags} = req.body


        const user = await userSchema.findById({_id:id})

        if(!user){
            res.status(404).json({
                msg:"User not found"
            })
            return;
        }

        const content = await contentSchema.findById({id:contentId})
        if(!content){
            res.status(400).json({
                msg:"invalid content"
            })
            return 
        }
        if(content.userId !== id){
            res.status(400).json({
                msg:"Unauthorized access"
            })
            return

        }

        const updatedContent = await contentSchema.findByIdAndUpdate({contentType, link,title,tags})

        res.status(200).json({
            msg:"content updated successfully",
            updatedContent
        })
        return
        
    } catch (error) {
         res.status(500).json({
            msg:"something went wrong"
        })
    }
}