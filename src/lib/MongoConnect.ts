import mongoose from "mongoose";

export const connectMongoDb=async()=>{
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
        
    }
    console.log("true",true);
    
    return await mongoose.connect(process.env.DATABASE_URL!)
}
