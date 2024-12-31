import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export  async function GET(request: NextRequest, res: NextResponse) {
  
   
    const body=await request.json();
    const { text, sourceLang, targetLang } =body;
    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
    }

    try {
      const response = await axios.get(
        `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
      );
      
      
      console.log("sonuç", response.data);
      
    
      return NextResponse.json({
        msg:"UpdateSuccessful",response
      },{status:200}) 
     
    } catch (error) {
      console.error('Çeviri hatası:', error);
      return NextResponse.json({ msg: "Çeviri sırasında bir hata oluştu" }, { status: 400 });
     
    }
 
}
