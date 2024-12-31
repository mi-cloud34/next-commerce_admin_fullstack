import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "@/lib/models/User";
import { connectMongoDb } from "@/lib/MongoConnect";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            throw new Error("Lütfen e-posta adresinizi girin.");
        }

        await connectMongoDb();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı." },
                { status: 404 }
            );
        }

      
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 1000 * 60 * 15; 

       
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        
        const resetLink = `${process.env.BASE_URL}/resetpassword?token=${resetToken}&email=${email}`;

        
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
            subject: "Şifre Sıfırlama Talebi",
            text: `Merhaba,\n\nŞifrenizi sıfırlamak için aşağıdaki bağlantıyı kullanabilirsiniz:\n\n${resetLink}\n\nBu bağlantı 15 dakika boyunca geçerlidir.\n\nEğer bu işlemi siz talep etmediyseniz, bu e-postayı dikkate almayınız.\n\nSaygılarımızla,\nYour App Team`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="text-align: center; color: #4CAF50;">Şifre Sıfırlama</h1>
                    <p>Merhaba,</p>
                    <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
                    <div style="text-align: center; margin: 20px;">
                        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Şifreyi Sıfırla</a>
                    </div>
                    <p>Bu bağlantı 15 dakika boyunca geçerlidir.</p>
                    <p>Eğer bu işlemi siz talep etmediyseniz, bu e-postayı dikkate almayınız.</p>
                    <p>Saygılarımızla,<br>Your App Team</p>
                </div>
            `,
        });

        return NextResponse.json({
            message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
        });
    } catch (error: any) {
        console.error("Hata:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
