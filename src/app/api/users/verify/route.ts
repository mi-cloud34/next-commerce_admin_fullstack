import User from "@/lib/models/User";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {  verificationCode } = reqBody;

        if (!verificationCode) {
            throw new Error("Lütfen tüm alanları doldurun.");
        }

        await connectMongoDb();

        const user = await User.findOne({ verificationCode });
        if (!user) {
            return NextResponse.json(
                { error: "Kullanıcı bulunamadı" },
                { status: 400 }
            );
        }

        if (user.verificationCode !== verificationCode) {
            return NextResponse.json(
                { error: "Geçersiz doğrulama kodu" },
                { status: 400 }
            );
        }

        user.isVerified = true;
        user.verificationCode = null; 
        await user.save();

        return NextResponse.json({
            message: "Hesap başarıyla doğrulandı.",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
