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

        const verificationCode = crypto.randomBytes(4).toString("hex");

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
            text: `Doğrulama kodunuz: ${verificationCode}`,
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
