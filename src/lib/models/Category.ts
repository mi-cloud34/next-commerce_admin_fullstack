import { models,model, Schema } from "mongoose";

const categorySchema=new Schema({
    name:{type:String,require:true},
    imgUrl:{type:String,require:true}
});
const Category=models.Category||model("Category",categorySchema);
export default Category;