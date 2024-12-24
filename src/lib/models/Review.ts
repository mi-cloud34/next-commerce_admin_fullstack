import mongoose, { models,model, Schema, SchemaTypes } from "mongoose";

const reviewSchema=new Schema({
    createdAt:{type:String,require:true},
    comment:{type:String,require:true},
    rating:{type:String,require:true},
    productId:{type:mongoose.Types.ObjectId,require:true,ref:"Product"},
    userId: {require:true,type:mongoose.Types.ObjectId,ref:"User"},
}
);
const Review=models.Review||model("Review",reviewSchema);
export default Review;