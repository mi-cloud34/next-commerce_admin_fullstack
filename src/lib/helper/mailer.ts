/* import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import  User  from '../models/User';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3fd364695517df",
              pass: "7383d58fd399cf"
              //TODO: add these credentials to .env file
            }
          });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
} */
    import nodemailer from "nodemailer"
  
    import bcryptjs from "bcryptjs"
import User from "../models/User"
    
    
    export const sendEmail = async({email, emailType, userId}:any) =>{
        try {
    
            // Create a hash token based on the user's ID
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    
    // Update the user document in the database with the generated token and expiry time
            if(emailType === "VERIFY") {
                await User.findByIdAndUpdate(userId,
                    {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    },
                )
            } else if(emailType === "RESET") {
                await User.findByIdAndUpdate(userId,
                    {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    },
                )
            }
    
            // Create a nodemailer transport
                var transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                     user: "3fd364695517df",
                     pass: "7383d58fd399cf"
                    }
                  });
    
            // Compose email options
                  const mailOptions = {
                    from: '<your email id>',
                    to: email,
                    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                    html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to 
                    ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
                  }
    
            // Send the email
                  const mailresponse = await transport.sendMail(mailOptions);
                  return mailresponse
           
        } catch (error: any) {
            throw new Error(error.message);
            
        }
    }