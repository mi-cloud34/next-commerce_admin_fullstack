import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/lib/models/User";
import { connectMongoDb } from "@/lib/MongoConnect";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, surname, email, password } = reqBody;

        if (!name || !surname || !email || !password) {
            throw new Error("Lütfen tüm alanları doldurun.");
        }

        await connectMongoDb();

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationCode,
        });

        await newUser.save();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        await transporter.verify((error, success) => {
            if (error) {
                console.error("SMTP bağlantısı başarısız:", error);
                throw new Error("SMTP bağlantısı başarısız. Lütfen ayarları kontrol edin.");
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Hesap Doğrulama Kodu",
            text: `Hello,
          
          Thank you for signing up! Your verification code is:
          
          ${verificationCode}
          
          Enter this code on the verification page to complete your registration.
          
          This code will expire in 15 minutes for security reasons.
          
          If you didn't create an account with us, please ignore this email.
          
          Best regards,
          Your App Team`,
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Verify Your Email</h1>
              </div>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p>Hello,</p>
                <p>Thank you for signing up! Your verification code is:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">${verificationCode}</span>
                </div>
                <p>Enter this code on the verification page to complete your registration.</p>
                <p>This code will expire in 15 minutes for security reasons.</p>
                <p>If you didn't create an account with us, please ignore this email.</p>
                <p>Best regards,<br>Your App Team</p>
              </div>
              <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
                <p>This is an automated message, please do not reply to this email.</p>
              </div>
            </div>`,
          }).catch((error) => {
            console.error("E-posta gönderim hatası:", error);
            throw new Error("E-posta gönderimi başarısız oldu.");
          });
          

        return NextResponse.json({
            message: "Kayıt başarılı! Doğrulama kodu e-posta adresinize gönderildi.",
            success: true,
        });
    } catch (error: any) {
        console.error("Hata:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
