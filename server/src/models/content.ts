import mongoose, { Schema } from "mongoose";

export enum ContentType {
    DOCUMENT = "document",
    TWEET = "tweet",
    YOUTUBE = "youtube",
    LINK = "link",
}
export interface Content {
    contentType: ContentType;
    link: string;
    title: string;
    tags: Schema.Types.ObjectId[];
    userId:Schema.Types.ObjectId
  }

const contentSchema = new mongoose.Schema<Content>({
    contentType: {
        type: String,
        enum: Object.values(ContentType), // Enforce ContentType values
        required: true,
    },
    link:{
        type: String || null,
        
    },
    title: {
        type: String,
        required: true,
        
      },
    tags:[{type: Schema.Types.ObjectId,
            ref:"tagSchema"}],
    userId:{
        type: Schema.Types.ObjectId,
        ref:"userSchema"
    },
    
    
})


export default mongoose.model<Content>("contentSchema", contentSchema)