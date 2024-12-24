/* import mongoose, { model, Schema } from "mongoose";
interface IUser extends Document {
  email: string;
  surname: string;
  hashedPassword: string;
  name: string;
  password: string;
  Image: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
}
const UserSchema = new Schema({
  name: {
    required: true,
    type: String, 
  },
  surname: { required: true, type: String},
  email: {
    required: true,
    type: String,
    unique:true
  },
  isAdmin:{type: Boolean, default: false,required: false},
  password: {
    required: true,
    type: String,
  },
  hashedPassword: {required: false, type: String},
  Image: { required:false, type: String},
  createdAt:{type: Date, default: new Date,required: false},
  updatedAt:{type: Date, default: new Date,required: false},
  emailVerified:{type:Date,required:false,} ,
 
 //emailVerified:{require:false,type:String}
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
  */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide username"],
        
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    surname: {
      type: String,
      required: [true, "Please provide email"],
      
  },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
   
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, default: null },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;