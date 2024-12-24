import mongoose, { models,model, Schema, SchemaTypes } from "mongoose";
import Category from "./Category";

const productSchema=new Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    brand:{type:String,require:true},
    inStock:{type:Number,require:true},
    status:{type:String,require:true},
    rating:{type:Number,require:true},
    colors:{type:[String],default:null,},
    categoryId: {required: true, type:mongoose.Types.ObjectId,ref:"Category" },
    imgUrls: { type: [String], minlength: 1, default: undefined },
reviews: { type: [mongoose.Types.ObjectId], ref: "Reviews", minlength: 1, default: undefined },
});
const Product=models.Product||model("Product",productSchema);
export default Product;