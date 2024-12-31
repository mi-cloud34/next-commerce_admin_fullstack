import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectMongoDb } from "@/lib/MongoConnect";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const { token, email, password, confirmPassword } = await request.json();

        if (!token || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { error: "Lütfen tüm alanları doldurun." },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Şifreler eşleşmiyor." },
                { status: 400 }
            );
        }

        await connectMongoDb();

        const user = await User.findOne({ email, resetToken: token });

        if (!user || user.resetTokenExpiry < Date.now()) {
            return NextResponse.json(
                { error: "dont expired token" },
                { status: 400 }
            );
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

      
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

      
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Şifre Başarıyla Güncellendi",
            text: `Merhaba,\n\nŞifreniz başarıyla güncellendi. Artık yeni şifrenizle giriş yapabilirsiniz.\n\nSaygılarımızla,\nYour App Team`,
        });

        return NextResponse.json({ message: "Şifreniz başarıyla güncellendi." });
    } catch (error: any) {
        console.error("Hata:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
