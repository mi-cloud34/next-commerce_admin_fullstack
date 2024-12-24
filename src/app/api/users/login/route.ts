/* import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {connectMongoDb} from '../../../../lib/MongoConnect'
import  User  from "../../../../lib/models/User";


import jwt from "jsonwebtoken";


export async function POST(request: NextRequest){
    try {

        await connectMongoDb();
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
} */
// app/api/users/signup/route.ts


import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectMongoDb } from "@/lib/MongoConnect";
import User from "@/lib/models/User";


connectMongoDb();
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const { email, password} = reqBody
// Parses the request body to extract username, email, and password.

//Checks if a user with the provided email already exists. 
        const user = await User.findOne({email})

//If yes, returns a 400 response.
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

//hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
           
            email,
            password: hashedPassword
        })

// Saves the new user to the database.
        const savedUser = await newUser.save()


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}